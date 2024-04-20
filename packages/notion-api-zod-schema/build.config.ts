import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  // If entries is not provided, will be automatically inferred from package.json
  entries: [
    { input: 'src/index.ts', outDir: 'dist', format: 'esm' },
    { input: 'src/index.ts', outDir: 'dist', format: 'cjs', ext: 'cjs', declaration: false },
  ],
  declaration: true, // Generates .d.ts declaration file
  rollup: {
    emitCJS: true,
  },
  failOnWarn: false,
})
