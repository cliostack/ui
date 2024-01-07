import fs from "fs/promises";
import { absoluteToDist } from "./path";

export const getVersion = async () => {
  const packageJson = await fs.readFile(absoluteToDist("..", "package.json"), "utf-8");
  const { version } = JSON.parse(packageJson);
  if (!version) throw new Error("No version found in package.json");
  return version;
};
