import { Command } from "commander";
import ora from "ora";
import fs from "fs/promises";
import path, { join } from "path";
import { questions } from "../questions/questions";
import { getConfig } from "../utils/config";
import { DOMComponentCategorySchema, DOMComponentSchema, UIMap } from "../ui/UIMap";

export const add = new Command()
    .name("add")
    .description("Adds a new component")
    .argument("<name>", "Name of the component")
    .action(async (name: string) => {
        const configSpinner = ora("Checking for cliox.config.json").start();
        try {
            const config = await getConfig()
            const [category, component] = name.split("/")
            const parsedCategory = DOMComponentCategorySchema.safeParse(category)
            if (!parsedCategory.success) {
                configSpinner.fail(parsedCategory.error.issues[0].message)
                process.exit(1)
            }
            const parsedComponent = DOMComponentSchema.safeParse(component)
            if (!parsedComponent.success) {
                configSpinner.fail(parsedComponent.error.issues[0].message)
                process.exit(1)
            }
            configSpinner.succeed("Found a valid cliox.config.json");

            const env = await questions.ask.env();
            const spinner = ora(`Adding component, Env: ${env}`).start();

            const categoryFolderPath = join(config.paths.core, parsedCategory.data);
            const categoryFolderExists = await fs.stat(categoryFolderPath).catch(() => false);
            if (!categoryFolderExists) await fs.mkdir(categoryFolderPath);

            const internalComponentPath = UIMap[env][parsedCategory.data][parsedComponent.data]
            const componentJsx = await fs.readFile(internalComponentPath, "utf-8");
            const { name: componentName, ext: componentExt } = path.parse(internalComponentPath);

            const componentPath = join(categoryFolderPath, `${componentName}${componentExt}`);
            const doesComponentExist = await fs.stat(componentPath).catch(() => false);
            if (doesComponentExist) {
                spinner.fail(`Component ${componentName} already exists`);
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