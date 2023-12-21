import fs from "fs/promises";
import { absolute } from "./path";

export const getVersion = async () => {
  const packageJson = await fs.readFile(absolute("package.json"), "utf-8");
  const { version } = JSON.parse(packageJson);
  if (!version) throw new Error("No version found in package.json");
  return version;
};
