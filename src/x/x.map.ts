import { resolveUI } from "@/utils/path";
import { XRecord } from "./x.schema";

export const XMap: XRecord = {
    dom: {
        ui: {
            layout: {
                vstack: resolveUI('DOM/Layout/VStack.tsx'),
                hstack: resolveUI('DOM/Layout/HStack.tsx'),
                view: resolveUI('DOM/Layout/View.tsx'),
            }
        }
    }
}