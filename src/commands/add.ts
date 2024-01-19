import { Command } from "commander";
import ora from "ora";
import fs from "fs/promises";
import path, { join } from "path";
import { questions } from "../questions/questions";
import { getConfig } from "../utils/config";
import { XSchema } from "@/x/x.schema";
import { XMap } from "@/x/x.map";

export const add = new Command()
    .name("add")
    .description("Adds a new component")
    .argument("<name>", "Name of the component")
    .action(async (name: string) => {
        const configSpinner = ora("Validating your command").start();
        try {
            const config = await getConfig()
            const [space, category, component] = name.split("/")

            // Make sure the user has provided a valid space
            const spaceResult = XSchema.DOM.Space.safeParse(space)
            if (!spaceResult.success) {
                configSpinner.fail(spaceResult.error.issues[0].message)
                process.exit(1)
            }

            // Make sure the user has provided a valid category
            const categoryResult = XSchema.DOM.Category.safeParse(category)
            if (!categoryResult.success) {
                configSpinner.fail(categoryResult.error.issues[0].message)
                process.exit(1)
            }

            // Make sure the user has provided a valid component
            const componentResult = XSchema.DOM.Component.safeParse(component)
            if (!componentResult.success) {
                configSpinner.fail(componentResult.error.issues[0].message)
                process.exit(1)
            }
            configSpinner.succeed("Found a valid cliox.config.json");

            const env = await questions.ask.env();
            const spinner = ora(`Adding component, Env: ${env}`).start();

            const targetFolderPath = join(config.paths.core, spaceResult.data, categoryResult.data);
            const categoryFolderExists = await fs.stat(targetFolderPath).catch(() => false);
            if (!categoryFolderExists) await fs.mkdir(targetFolderPath, { recursive: true });

            const internalComponentPath = XMap[env][spaceResult.data][categoryResult.data][componentResult.data];
            const componentJsx = await fs.readFile(internalComponentPath, "utf-8")

            const { name: componentName, ext: componentExt } = path.parse(internalComponentPath);

            const componentPath = join(targetFolderPath, `${componentName}${componentExt}`);
            const doesComponentExist = await fs.stat(componentPath).catch(() => false);
            if (doesComponentExist) {
                spinner.fail(`File ${componentName}${componentExt} already exists. Skipping...`);
                process.exit(1);
            }
            await fs.writeFile(componentPath, componentJsx);
            spinner.succeed(`Added ${componentName} to core`);
        } catch (error) {
            console.error(error)
            configSpinner.fail("Something went wrong. Please consider opening an issue at https://github.com/cliostack/cliox/issues");
            process.exit(1);
        }

    });