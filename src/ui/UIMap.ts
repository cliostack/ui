import { UIEnvironment } from '../questions/questions'
import { z } from 'zod'
import { resolveUI } from '../utils/path';

export const DOMComponentSchema = z.literal('vstack').or(z.literal('hstack')).or(z.literal('view'));
export const DOMComponentCategorySchema = z.literal('layout')

export type DOMComponentCategory = z.infer<typeof DOMComponentCategorySchema>
export type DOMComponent = z.infer<typeof DOMComponentSchema>

type DOMComponentsMap = Record<DOMComponent, string>
type DOMComponentCategoryMap = Record<DOMComponentCategory, DOMComponentsMap>
export type UIMap = Record<UIEnvironment, DOMComponentCategoryMap>

export const UIMap: UIMap = {
    dom: {
        layout: {
            vstack: resolveUI('DOM/Layout/VStack.tsx'),
            hstack: resolveUI('DOM/Layout/HStack.tsx'),
            view: resolveUI('DOM/Layout/View.tsx'),
        }
    }
}