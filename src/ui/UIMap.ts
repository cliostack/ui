import { z } from 'zod'
import { resolveUI } from '../utils/path';
import chalk from 'chalk'

export enum UIEnvironment {
    ReactDOM = "dom",
}

const DOMComponents = ['vstack', 'hstack', 'view'] as const;
export const DOMComponentSchema = z.enum(DOMComponents, {
    errorMap: (_, ctx) => {
        return {
            message: `Invalid component ${chalk.red(ctx.data)}. Available components are: ${chalk.green(DOMComponents.join(', '))}`
        }
    }
});

const DOMComponentCategories = ['layout'] as const;
export const DOMComponentCategorySchema = z.enum(DOMComponentCategories, {
    errorMap: (_, ctx) => {
        return {
            message: `Invalid component category ${chalk.red(ctx.data)}. Available component categories are: ${chalk.green(DOMComponentCategories.join(', '))}`
        }
    }
});

export type DOMComponent = z.infer<typeof DOMComponentSchema>
export type DOMComponentCategory = z.infer<typeof DOMComponentCategorySchema>

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