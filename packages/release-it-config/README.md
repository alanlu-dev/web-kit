
# @alanlu-dev/release-it-config

<p>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/release-it-config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/release-it-config%2A&style=flat" alt="Version"></a>
 <a href="https://www.npmjs.com/package/@alanlu-dev/release-it-config"><img src="https://img.shields.io/npm/dm/@alanlu-dev/release-it-config" alt="Downloads"></a>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alanlu-dev/web-kit?style=flat" alt="License"></a>
</p>

A release-it configuration for monorepo.

## Installation

```bash
pnpm add -wD @alanlu-dev/release-it-config
```

## Usage

Create a `.release-it.cjs` file in the root of your project:

```js
module.exports = require('@alanlu-dev/release-it-config')
```

Add the following scripts to the `package.json` of the package:

```json
{
  "scripts": {
    "release": "release-it --ci"
  }
}
```

Add the following scripts to the `package.json` in the root directory:

```json
{
  "scripts": {
    "release": "turbo release --concurrency=1"
  }
}
```

## CI/CD

You can use the following GitHub Actions workflow to automate the release process:

```yaml
name: Release & Publish
on:
  workflow_dispatch:
  push:
    branches: main

permissions: {}
jobs:
  release:
    name: Release
    permissions:
      contents: write # to create release (changesets/action)
    timeout-minutes: 20
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install pnpm
        uses: pnpm/action-setup@v3

      - name: Use Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Setup turbo cache
        uses: actions/cache@v4.0.2
        with:
          path: .turbo
          key: turbo-${{ github.ref_name }}-${{ github.sha }}
          restore-keys: |
            turbo-${{ github.ref_name }}-
            turbo-main-

      - name: Install deps
        if: steps.node-cache.outputs.cache-hit != 'true'
        run: pnpm install --prefer-offline --frozen-lockfile

      - name: Build
        run: pnpm run build

      - name: Setup git user
        run: |
          git config user.name "$GIT_USER_NAME"
          git config user.email "$GIT_USER_EMAIL"
        env:
          GIT_USER_NAME: ${{ vars.GIT_USER_NAME }}
          GIT_USER_EMAIL: ${{ vars.GIT_USER_EMAIL }}

      - name: Setup npm auth
        run: echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > ~/.npmrc
        env:
          NPM_TOKEN: ${{ secrets.MY_GITHUB_TOKEN }}

      - name: Setup ssh key
        uses: shimataro/ssh-key-action@v2.7.0
        with:
          key: ${{ secrets.SSH_KEY }}
          known_hosts: github.com

      - name: Run Release
        run: pnpm release --cache-dir=.turbo
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
