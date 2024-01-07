import { Command } from "commander";
import ora from "ora";
import fs from "fs/promises";
import path from "path";
import { questions } from "../questions/questions";
import { getConfig } from "../utils/config";
import { DOMComponentCategorySchema, DOMComponentSchema, UIMap } from "../ui/UIMap";
import { cwdAbsolute } from "@/utils/path";

export const add = new Command()
    .name("add")
    .description("Adds a new component")
    .argument("<name>", "Name of the component")
    .action(async (name: string) => {
        const config = await getConfig()

        const [category, component] = name.split("/")
        const parsedCategory = DOMComponentCategorySchema.safeParse(category)
        if (!parsedCategory.success) {
            console.error(parsedCategory.error.issues[0].message)
            process.exit(1)
        }
        const parsedComponent = DOMComponentSchema.safeParse(component)
        if (!parsedComponent.success) {
            console.error(parsedComponent.error.issues[0].message)
            process.exit(1)
        }

        const env = await questions.ask.env();
        const spinner = ora(`Adding component, Env: ${env}`).start();

        const componentPath = UIMap[env][parsedCategory.data][parsedComponent.data]
        const componentJsx = await fs.readFile(componentPath, "utf-8");
        const { name: componentName, ext: componentExt } = path.parse(componentPath);

        await fs.writeFile(cwdAbsolute(config.paths.core, 'ui', `${componentName}${componentExt}`), componentJsx);
        spinner.stop();
    });