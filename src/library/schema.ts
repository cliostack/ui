import { z } from "zod";
import chalk from "chalk";
import { Environments, Modules, Spaces } from "./map";

export const LibrarySchema = {
  Environment: z.enum(Environments, {
    errorMap: (_, ctx) => {
      return {
        message: `Invalid environment ${chalk.red(ctx.data)}. Available environments are: ${chalk.green(
          Environments.join(", ")
        )}`,
      };
    },
  }),
  Space: z.enum(Spaces, {
    errorMap: (_, ctx) => {
      return {
        message: `Invalid space ${chalk.red(ctx.data)}. Available spaces are: ${chalk.green(Spaces.join(", "))}`,
      };
    },
  }),

  Component: z.enum(Modules, {
    errorMap: (_, ctx) => {
      return {
        message: `Invalid module ${chalk.red(ctx.data)}. Available modules are: ${chalk.green(Modules.join(", "))}`,
      };
    },
  }),
};

export type Environment = z.infer<typeof LibrarySchema.Environment>;
export type Module = z.infer<typeof LibrarySchema.Component>;
export type Space = z.infer<typeof LibrarySchema.Space>;
