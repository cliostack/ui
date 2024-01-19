import fs from "fs/promises";
import { z } from "zod";
import { cwdAbsolute } from "./path";

const configFileSchema = z.object({
  imports: z.string(),
  paths: z.object({
    core: z.string(),
    lib: z.string(),
  }),
});

export const getConfig = async () => {
  try {
    const configFile = await fs.readFile(cwdAbsolute("cliox.config.json"), "utf-8");
    const config = JSON.parse(configFile);
    const configParsed = configFileSchema.parse(config);
    return configParsed;
  } catch (error) {
    throw new Error("Invalid config file");
  }
};
