import { Command } from "commander";
import fs from "fs/promises";
import { resolveLib } from "@/utils/path";
import path, { join } from "path";
import ora from "ora";
import { z } from "zod";
import { getPackageManager } from "@/utils/packageManager";
import { execa } from "execa";
import prompts from "prompts";

const tsconfigSchema = z.object({
    compilerOptions: z.object({
        baseUrl: z.string(),
        paths: z.object({
            '@/*': z.array(z.string())
        })
    })
});

export const init = new Command()
    .name("init")
    .description("Initialize a new project")
    .action(async () => {
        const configSpinner = ora('Checking for tsconfig.json');
        const initSpinner = ora('Initializing project');
        const errorSpinner = ora('Something went wrong. Please consider opening an issue at https://github.com/cliostack/cliox/issues')
        try {
            configSpinner.start();
            // Check for tsconfig.json
            const tsconfig = await fs.readFile('tsconfig.json', 'utf-8').catch(() => {
                configSpinner.fail('tsconfig.json not found');
                return process.exit(1);
            });
            const tsconfigJson = JSON.parse(tsconfig);
            const tsconfigResult = tsconfigSchema.safeParse(tsconfigJson);
            if (!tsconfigResult.success) {
                configSpinner.fail('Invalid tsconfig.json')
                return process.exit(1);
            }
            configSpinner.succeed('Found a valid tsconfig.json');

            // Obtain import path from tsconfig.json
            const paths = tsconfigResult.data.compilerOptions.paths;
            const baseUrl = tsconfigResult.data.compilerOptions.baseUrl;
            const srcPath = path.parse(paths['@/*'][0]).dir;
            const importPath = path.posix.join(baseUrl, srcPath);

            // Ask for core folder
            const coreFolder = await prompts({
                type: 'text',
                name: 'coreFolder',
                message: 'Core folder name',
                initial: 'core'
            }).then(res => res.coreFolder);

            initSpinner.start();

            // Create folders
            const corePath = path.posix.join(importPath, coreFolder);
            const libPath = path.posix.join(importPath, 'lib');
            const doesCoreExist = await fs.stat(corePath).catch(() => false);
            const doesLibExist = await fs.stat(libPath).catch(() => false);
            if (!doesCoreExist) await fs.mkdir(corePath, { recursive: true }).catch(() => {
                initSpinner.fail('Failed to create core folder');
                return process.exit(1);
            });
            if (!doesLibExist) await fs.mkdir(libPath).catch(() => {
                initSpinner.fail('Failed to create lib folder');
                return process.exit(1);
            });

            // Create config file
            const configOptions = {
                imports: importPath,
                paths: {
                    core: corePath,
                    lib: libPath
                }
            }
            await fs.writeFile('cliox.config.json', JSON.stringify(configOptions, null, 2), 'utf-8').catch(() => {
                initSpinner.fail('Failed to write cliox.config.json');
                return process.exit(1);
            })

            // fill lib folder
            const cn = await fs.readFile(resolveLib('cn.ts'), 'utf-8').catch(() => {
                initSpinner.fail('Failed to read cn.ts');
                return process.exit(1);
            });

            await fs.writeFile(join(libPath, 'cn.ts'), cn, 'utf-8').catch(() => {
                initSpinner.fail('Failed to write cn.ts');
                return process.exit(1);
            });

            // Install deps
            initSpinner.text = 'Installing dependencies';
            const packageManager = await getPackageManager(process.cwd())
            const deps = ['clsx', 'tailwind-merge']
            const installCommand = packageManager === 'npm' ? 'install' : 'add';
            await execa(packageManager, [installCommand, ...deps], {
                cwd: process.cwd(),
            })
            initSpinner.succeed('Initialized project');
        } catch (error) {
            configSpinner.clear()
            initSpinner.clear()
            errorSpinner.fail('Something went wrong. Please consider opening an issue at https://github.com/cliostack/cliox/issues')
            console.error(error)
            process.exit(1);
        }
    });