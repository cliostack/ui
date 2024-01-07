import { defineConfig } from "tsup"
import { copy } from 'esbuild-plugin-copy';

export default defineConfig({
    clean: true,
    dts: true,
    entry: ["src/index.ts"],
    format: ["esm"],
    sourcemap: true,
    minify: true,
    esbuildPlugins: [
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: 'src/ui/**/*',
                to: 'dist/src/ui'
            },
            watch: true
        }),
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: 'src/lib/**/*',
                to: 'dist/src/lib'
            },
            watch: true
        })
    ],
    target: "esnext",
    outDir: "dist",
    outExtension() {
        return {
            js: `.js`,
        }
    },
})