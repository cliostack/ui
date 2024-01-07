import { join } from "path";
import { fileURLToPath } from "url";

export const absolute = (...path: string[]) => {
  return fileURLToPath(join(import.meta.url, '..', '..', ...path))
};

export const cwdAbsolute = (...path: string[]) => {
  return join(process.cwd(), ...path);
}

export const resolveUI = (...path: string[]) => {
  return absolute(join('src', 'ui', ...path));
}


export const resolveLib = (...path: string[]) => {
  return absolute(join('src', 'lib', ...path));
}