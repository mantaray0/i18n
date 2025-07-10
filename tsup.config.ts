import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.tsx'],
    format: ['cjs', 'esm'],
    esbuildOptions(options: any) {
        options.banner = {
            js: '"use client"'
        };
    },
    dts: true,
    minify: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ['react']
});
