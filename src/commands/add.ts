import { Command } from "commander";
import ora from "ora";
import fs from "fs/promises";
import path, { join } from "path";
import { getConfig } from "../utils/config";
import { LibrarySchema } from "@/library/schema";
import { LibraryMap } from "@/library/map";

export const add = new Command()
  .name("add")
  .description("Adds a new component")
  .argument("<name>", "Name of the component")
  .action(async (name: string) => {
    const configSpinner = ora("Validating your command").start();
    try {
      const config = await getConfig();
      const [env, space, component] = name.split("/");

      const envResult = LibrarySchema.Environment.safeParse(env);
      if (!envResult.success) {
        configSpinner.fail(envResult.error.issues[0].message);
        process.exit(1);
      }

      // Make sure the user has provided a valid space
      const spaceResult = LibrarySchema.Space.safeParse(space);
      if (!spaceResult.success) {
        configSpinner.fail(spaceResult.error.issues[0].message);
        process.exit(1);
      }

      // Make sure the user has provided a valid component
      const componentResult = LibrarySchema.Component.safeParse(component);
      if (!componentResult.success) {
        configSpinner.fail(componentResult.error.issues[0].message);
        process.exit(1);
      }

      configSpinner.succeed("Found a valid cliox.config.json");

      const spinner = ora(`Adding component, Env: ${env}`).start();

      const targetFolderPath = join(config.paths.ui, spaceResult.data);
      const categoryFolderExists = await fs.stat(targetFolderPath).catch(() => false);
      if (!categoryFolderExists) await fs.mkdir(targetFolderPath, { recursive: true });

      const componentPath = LibraryMap[envResult.data][spaceResult.data][componentResult.data];
      const componentJsx = await fs.readFile(componentPath, "utf-8");

      const { name: componentName, ext: componentExt } = path.parse(componentPath);

      const targetComponentPath = join(targetFolderPath, `${componentName}${componentExt}`);
      const doesFileExists = await fs.stat(targetComponentPath).catch(() => false);
      if (doesFileExists) {
        spinner.fail(`File ${componentName}${componentExt} already exists. Skipping...`);
        process.exit(1);
      }
      await fs.writeFile(targetComponentPath, componentJsx);
      spinner.succeed(`Added ${componentName}${componentExt}`);
    } catch (error) {
      console.error(error);
      configSpinner.fail(
        "Something went wrong. Please consider opening an issue at https://github.com/cliostack/cliox/issues"
      );
      process.exit(1);
    }
  });
