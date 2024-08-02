import { resolveUI } from "@/utils/path";

export const Environments = ["dom"] as const;
export const Spaces = ["layout"] as const;
export const Modules = ["vstack", "hstack", "view"] as const;

export const LibraryMap = {
  dom: {
    layout: {
      vstack: resolveUI("DOM/Layout/VStack.tsx"),
      hstack: resolveUI("DOM/Layout/HStack.tsx"),
      view: resolveUI("DOM/Layout/View.tsx"),
    },
  },
};
