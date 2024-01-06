import fs from "fs/promises";
import { absolute } from "./path";
import { z } from "zod";

const configFileSchema = z.object({
  src: z.string(),
});

export const getConfig = async () => {
  const configFile = await fs.readFile(absolute("cliox.json"), "utf-8");
  try {
    const config = JSON.parse(configFile);
    const configParsed = configFileSchema.parse(config);
    return configParsed;
  } catch (error) {
    throw new Error("Invalid config file");
  }
};
