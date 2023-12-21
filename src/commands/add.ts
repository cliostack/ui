import { Command } from "commander";
import ora from "ora";
import fs from "fs/promises";
import { questions } from "../questions/questions";
import path from "path";

export const add = new Command()
    .name("add")
    .description("Adds a new component")
    .argument("<name>", "Name of the component")
    .action(async (name) => {
        const env = await questions.ask.env();
        const spinner = ora(`Adding component, Env: ${env}`).start();
        const comp = await fs.readFile(path.join(__dirname, "..", "src", "ui", "Layout", "Test.tsx"), "utf-8");
        await fs.writeFile(path.join(process.cwd(), "src", "core", "Layout", "Test.tsx"), comp);
        spinner.stop();
    });