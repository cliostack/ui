import { Command } from "commander";
import ora from "ora";
import fs from "fs/promises";
import path from "path";
import { questions } from "../questions/questions";
import { getConfig } from "../utils/config";
import { DOMComponentCategorySchema, DOMComponentSchema, UIMap } from "../ui/UIMap";

export const add = new Command()
    .name("add")
    .description("Adds a new component")
    .argument("<name>", "Name of the component")
    .action(async (name: string) => {
        // const config = await getConfig()

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
        const comp = await fs.readFile(componentPath, "utf-8");
        await fs.writeFile(path.join(process.cwd(), "src", "core", "Layout", "Test.tsx"), comp);
        spinner.stop();
    });