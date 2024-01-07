import { Command } from "commander";
import fs from "fs/promises";
import { absolute, cwdAbsolute, resolveLib } from "@/utils/path";
import path from "path";
import prompts from "prompts";

export const init = new Command()
    .name("init")
    .description("Initialize a new project")
    .action(async () => {
        const tsconfig = await fs.readFile(cwdAbsolute('tsconfig.json'), 'utf-8');
        const tsconfigJSON = JSON.parse(tsconfig);
        const compilerOptions = tsconfigJSON.compilerOptions;
        if (!compilerOptions) throw new Error('No compiler options found in tsconfig.json');
        const baseUrl = compilerOptions.baseUrl;
        const paths = compilerOptions.paths;

        if (!baseUrl) throw new Error('No baseUrl found in tsconfig.json');
        if (!paths) throw new Error('No paths found in tsconfig.json');
        if (!paths['@/*']) throw new Error('No @/* path found in tsconfig.json');

        const srcPath = path.parse(paths['@/*'][0]).dir;
        const importPath = path.posix.join(baseUrl, srcPath);


        let coreFolder = 'core';
        let libFolder = 'lib';
        const doesCoreExist = await fs.stat(cwdAbsolute(importPath, coreFolder)).catch(() => false);
        const doesLibExist = await fs.stat(cwdAbsolute(importPath, libFolder)).catch(() => false);

        if (!doesCoreExist) await fs.mkdir(cwdAbsolute(importPath, coreFolder));
        if (!doesLibExist) await fs.mkdir(cwdAbsolute(importPath, libFolder));

        const configOptions = {
            imports: importPath,
            paths: {
                core: path.posix.join(importPath, coreFolder),
                lib: path.posix.join(importPath, libFolder)
            }
        }
        await fs.writeFile(cwdAbsolute('cliox.config.json'), JSON.stringify(configOptions, null, 2), 'utf-8');

        const cn = await fs.readFile(resolveLib('cn.ts'), 'utf-8').catch(() => false as const);
        if (!cn) throw new Error('Something went wrong while reading cn.ts');

        await fs.writeFile(cwdAbsolute(importPath, libFolder, 'cn.ts'), cn, 'utf-8');


    });