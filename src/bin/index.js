#!/usr/bin/env node
import { Command } from "commander";
import { Chalk } from "chalk";
import { Spinner } from "cli-spinner";
import { getConfig } from "./utils/config.js";
import { getVersion } from "./utils/getVersion.js";
import { questions } from "./questions/questions.js";
async function main() {
  const program = new Command();
  const chalk = new Chalk();
  const config = getConfig();

  program.name("ClioX UI").description("ClioX UI CLI").version(getVersion());
  program
    .command("add")
    .description("Adds a new component")
    .argument("<name>", "Name of the component")
    .action(async (name) => {
      console.log(chalk.green(""));

      const env = await questions.ask.env();

      const spinner = new Spinner(chalk.green("%s Adding a new component"));
      spinner.setSpinnerString("⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏");
      spinner.start();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      spinner.stop(true);
      console.log("hey", env, name);
    });

  await program.parseAsync(process.argv);
}

main();
