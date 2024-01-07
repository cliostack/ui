import { join } from "path";
import { fileURLToPath } from "url";

export const absoluteToDist = (...path: string[]) => {
  return fileURLToPath(join(import.meta.url, '..', ...path))
};

export const cwdAbsolute = (...path: string[]) => {
  return join(process.cwd(), ...path);
}

export const resolveUI = (...path: string[]) => {
  return absoluteToDist(join('src', 'ui', ...path));
}


export const resolveLib = (...path: string[]) => {
  return absoluteToDist(join('src', 'lib', ...path));
}