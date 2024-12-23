# @alanlu-dev/web-kit

<p>
 <a href="https://github.com/alanlu-dev/web-kit/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/alanlu-dev/web-kit/ci.yml?branch=main" alt="Build Status"></a>
 <a href="https://github.com/alanlu-dev/web-kit/blob/main/LICENSE"><img src="https://img.shields.io/github/license/alanlu-dev/web-kit?style=flat" alt="License"></a>
</p>

## 環境建置

在專案中，選擇適合的工具能夠提高代碼品質、開發效率以及團隊合作。以下是一系列可供選擇的工具，您可以根據專案需求和個人偏好進行選擇和配置。

### 開發工具

* [Visual Studio Code](https://code.visualstudio.com): 由微軟開發的跨平台代碼編輯器，擁有豐富的擴展生態系統和強大的功能。

### 包管理工具

* [pnpm](https://pnpm.io): 一個快速、節省空間的包管理器，類似於 npm 和 Yarn，但共享依賴以節省空間。
* [nvm](https://github.com/nvm-sh/nvm): Node.js 版本管理工具，用於管理多個 Node.js 版本，並在不同專案中切換版本。

### 代碼風格和格式化

* [EditorConfig](https://editorconfig.org): 跨編輯器和 IDE 的一致性代碼編寫風格工具。
* [Prettier](https://prettier.io): 自動美化代碼，確保代碼風格的一致性和可讀性。
* [ESLint](https://eslint.org): JavaScript 和 TypeScript 的靜態代碼分析工具，用於檢查代碼中的錯誤和實施一致的代碼風格。
* [Stylelint](https://stylelint.io): CSS 和 SCSS/Less 的靜態代碼分析工具，用於檢查樣式表中的錯誤和一致性。
* [Markdownlint](https://github.com/DavidAnson/markdownlint): Markdown 文件的風格和語法的工具。
* [husky](https://typicode.github.io/husky): Git 鉤子工具，用於在 Git 操作觸發前執行指定的代碼。
* [lint-staged](https://github.com/lint-staged/lint-staged): 在 Git 暫存區上運行 lint 工具的工具，通常與 husky 一起使用。
* [commitlint](https://commitlint.js.org): 檢查提交消息是否符合指定格式的工具，通常與 Conventional Commits 一起使用。
* [CSpell](https://cspell.org/): 拼寫檢查工具，用於檢查代碼和文本文件中的拼寫錯誤。

### 版本控制

* [Conventional Commits](https://www.conventionalcommits.org): 一種標準化的提交消息格式，用於生成一致的提交消息，以便自動化版本控制和發布。
* [czg](https://cz-git.qbb.sh/zh/cli): 用於生成符合 Conventional Commits 的提交消息的交互式命令行工具。
* [changeset](https://github.com/changesets/changesets): 一個用於管理 monorepo 中發布版本的工具。Changeset 允許您將多個包的變更集中管理，並生成一致的發布版本，以確保版本管理的一致性和可追溯性。

### 建構工具

* [Vite](https://vitejs.dev): 現代化的前端開發工具和建構工具，提供快速的開發體驗和優化的生產環境。
* [unbuild](https://github.com/unjs/unbuild): 構建和打包 JavaScript 和 TypeScript 項目的工具，提供零配置的構建和打包功能。
* [Turborepo](https://turbo.build/repo): 管理多個 monorepo 專案的開發者工具，提供統一的開發體驗和依賴管理。

### 測試工具

* [Vitest](https://vitest.dev): Vite 的測試工具，專注於提供簡單且快速的測試環境，基於 Jest 框架。
* [Playwright](https://playwright.dev): 一個用於自動化測試 Web 應用程序的工具，支持多種瀏覽器和平台。

### JavaScript

* [TypeScript](https://www.typescriptlang.org): 靜態類型的 JavaScript 語言，提供更強大的開發工具和代碼檢查。

### Style

* [SCSS](https://sass-lang.com):  CSS 預處理器，添加了變量、嵌套、Mixin 等功能以提高代碼可重用性和維護性。
* [PostCSS](https://postcss.org): 轉換 CSS 的工具，可以自動添加瀏覽器前綴、優化代碼等。
* [Tailwind CSS](https://tailwindcss.com): 一個功能強大的 CSS 框架，提供了大量的樣式工具和組件，用於快速構建現代化的網站。
* [Master CSS](https://master.co): CSS 語言和框架，用於快速構建現代和高性能的網站。

---

### Packages

#### `tooling`

這個資料夾包含所有的開發工具配置，這些配置幫助我們維護代碼質量，確保代碼符合規範並且自動化檢查和格式化代碼。主要內容包括：

* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/tooling/commitlint-config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/commitlint-config%2A&style=flat" alt="Version"></a>：Shareable commitlint configuration for [Conventional Commits](https://www.conventionalcommits.org).
* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/tooling/eslint-config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/eslint-config&style=flat" alt="Version"></a>：Shareable ESLint configuration.
* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/tooling/lint-staged-config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/lint-staged-config%2A&style=flat" alt="Version"></a>：Shareable lint-staged configuration.
* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/tooling/markdownlint-config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/markdownlint-config%2A&style=flat" alt="Version"></a>：Shareable markdownlint configuration.
* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/tooling/prettier-config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/prettier-config%2A&style=flat" alt="Version"></a>：Shareable prettier configuration.
* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/tooling/stylelint-config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/stylelint-config%2A&style=flat" alt="Version"></a>：Shareable stylelint configuration.
* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/tooling/tsconfig/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/tsconfig%2A&style=flat" alt="Version"></a>：Shareable TypeScript configuration.

#### `versions`

這個資料夾包含版本管理和發佈流程的配置，確保專案版本的一致性。

* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/versions/changeset/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/changeset%2A&style=flat" alt="Version"></a>：Automatically generate changeset by [Conventional Commits](https://www.conventionalcommits.org).
* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/versions/release-it-config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/release-it-config%2A&style=flat" alt="Version"></a>：A release-it configuration for monorepo.

#### `types`

這個資料夾包含所有與 TypeScript 類型相關的檔案，用來確保代碼的型別安全。

* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/types/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/types%2A&style=flat" alt="Version"></a>：Shareable TypeScript types.

#### `utils`

這個資料夾包含通用的輔助函式或工具，這些函式通常會在多個地方重用，幫助我們處理一些常見的邏輯，如數據處理、驗證等。

* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/utils/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/utils%2A&style=flat" alt="Version"></a>：A collection of utility functions.

#### `tests`

這個資料夾包含專案的測試配置。所有的測試框架和測試工具設定都集中在這裡。

* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/tests/playwright/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/playwright%2A&style=flat" alt="Version"></a>：A playwright configuration for monorepo.

#### `styles`

這個資料夾包含專案的樣式配置。你可以在這裡找到所有的樣式相關設定，確保專案的一致視覺風格。

* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/styles/mastercss/config/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/mastercss-config%2A&style=flat" alt="Version"></a>：Shareable Master CSS configuration.
* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/styles/mastercss/helpers/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/mastercss-helpers%2A&style=flat" alt="Version"></a>：A collection of utility functions for Master CSS.
* <a href="https://github.com/alanlu-dev/web-kit/blob/main/packages/styles/scss/CHANGELOG.md"><img src="https://img.shields.io/github/v/release/alanlu-dev/web-kit?filter=@alanlu-dev/scss%2A&style=flat" alt="Version"></a>：Shareable SCSS configuration.
