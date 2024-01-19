import { z } from 'zod'
import chalk from 'chalk'
import { XConstants } from './x.constants';

export const XSchema = {
    Environment: z.enum(XConstants.Environments, {
        errorMap: (_, ctx) => {
            return {
                message: `Invalid environment ${chalk.red(ctx.data)}. Available environments are: ${chalk.green(XConstants.Environments.join(', '))}`
            }
        }
    }),
    DOM: {
        Space: z.enum(XConstants.DOM.Spaces, {
            errorMap: (_, ctx) => {
                return {
                    message: `Invalid space ${chalk.red(ctx.data)}. Available spaces are: ${chalk.green(XConstants.DOM.Spaces.join(', '))}`
                }
            }
        }),
        Category: z.enum(XConstants.DOM.Categories, {
            errorMap: (_, ctx) => {
                return {
                    message: `Invalid category ${chalk.red(ctx.data)}. Available categories are: ${chalk.green(XConstants.DOM.Categories.join(', '))}`
                }
            }
        }),
        Component: z.enum(XConstants.DOM.Modules, {
            errorMap: (_, ctx) => {
                return {
                    message: `Invalid module ${chalk.red(ctx.data)}. Available modules are: ${chalk.green(XConstants.DOM.Modules.join(', '))}`
                }
            }
        })
    }
}

export type XEnvironment = z.infer<typeof XSchema.Environment>
export type XDOMModule = z.infer<typeof XSchema.DOM.Component>
export type XDOMCategory = z.infer<typeof XSchema.DOM.Category>
export type XDOMSpace = z.infer<typeof XSchema.DOM.Space>

export type XDOMModuleRecord = Record<XDOMModule, string>
export type XDOMCategoryRecord = Record<XDOMCategory, XDOMModuleRecord>
export type XDOMSpaceRecord = Record<XDOMSpace, XDOMCategoryRecord>

export type XRecord = Record<XEnvironment, XDOMSpaceRecord>