import { join } from "path";

export const absolute = (path) => {
  if (path.startsWith("/")) {
    return path;
  }
  return join(process.cwd(), path);
};
