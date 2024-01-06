import path from 'path'
import { UIEnvironment } from '../questions/questions'
import { z } from 'zod'

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
            vstack: path.join(__dirname, 'src', 'ui', 'DOM', 'Layout', 'VStack.tsx'),
            hstack: path.join(__dirname, 'src', 'ui', 'DOM', 'Layout', 'HStack.tsx'),
            view: path.join(__dirname, 'src', 'ui', 'DOM', 'Layout', 'View.tsx'),
        }
    }
}