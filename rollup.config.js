import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

const banner = "'use client';";

export default [
  // ESM and CJS builds
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'esm',
        banner,
        sourcemap: true
      },
      {
        file: 'dist/index.js',
        format: 'cjs',
        banner,
        sourcemap: true
      }
    ],
    external: ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false
      })
    ]
  },
  // Type declarations
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm'
    },
    external: ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    plugins: [dts()]
  }
];
