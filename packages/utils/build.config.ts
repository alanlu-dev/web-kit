import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  // If entries is not provided, will be automatically inferred from package.json
  entries: [
    'src/index.ts',
    { input: 'src/obj/index.ts', outDir: 'dist/obj', format: 'esm' },
    { input: 'src/obj/index.ts', outDir: 'dist/obj', format: 'cjs', ext: 'cjs', declaration: false },
    { input: 'src/string/index.ts', outDir: 'dist/string', format: 'esm' },
    { input: 'src/string/index.ts', outDir: 'dist/string', format: 'cjs', ext: 'cjs', declaration: false },
    { input: 'src/time/index.ts', outDir: 'dist/time', format: 'esm' },
    { input: 'src/time/index.ts', outDir: 'dist/time', format: 'cjs', ext: 'cjs', declaration: false },
    { input: 'src/validator/index.ts', outDir: 'dist/validator', format: 'esm' },
    { input: 'src/validator/index.ts', outDir: 'dist/validator', format: 'cjs', ext: 'cjs', declaration: false },
  ],
  declaration: true, // Generates .d.ts declaration file
  rollup: {
    emitCJS: true,
  },
  externals: [],
})
