
# @alanlu-dev/playwright-config

<p>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/playwright-config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/playwright-config%2A&style=flat" alt="Version"></a>
 <a href="https://www.npmjs.com/package/@alanlu-dev/playwright-config"><img src="https://img.shields.io/npm/dm/@alanlu-dev/playwright-config" alt="Downloads"></a>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alanlu-dev/web-kit?style=flat" alt="License"></a>
</p>

A playwright configuration for monorepo.

## Installation

```bash
pnpm add -wD @alanlu-dev/playwright-config

# install supported browsers
npx playwright install
```

## Usage

Create a `playwright.config.ts` file in the root of your project:

```js
import config from '@alanlu-dev/playwright-config'

export default config
```

Add the following scripts to the `package.json` of the package:

```json
{
  "scripts": {
    "e2e-test": "playwright test",
  }
}
```

Add the following scripts to the `package.json` in the root directory:

```json
{
  "scripts": {
     "e2e-test": "turbo run e2e-test",
  }
}
```

## CI/CD

You can use the following GitHub Actions workflow to automate the testing process:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm install -g pnpm && pnpm install
    - name: Install Playwright Browsers
      run: pnpm exec playwright install --with-deps
    - name: Run Playwright tests
      run: pnpm exec playwright test
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30

```
