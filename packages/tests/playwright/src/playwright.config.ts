import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * 參考 https://playwright.tw/docs/test-configuration 進行設定。
 */
export default defineConfig({
  /* 指定測試檔案所在的目錄 */
  testDir: './tests',

  /* 是否完全平行執行測試中的所有測試 */
  fullyParallel: true,

  /* 在 CI 上若有任何 test.only，則讓測試失敗 */
  forbidOnly: !!process.env.CI,

  /* 全部測試的最大執行時間（毫秒），0 代表無限制 */
  globalTimeout: 0,

  /* 為每個測試設定超時時間（毫秒），預設為 30 秒 */
  timeout: 30 * 1000,

  /* 在 CI 上重試失敗的測試次數 */
  retries: process.env.CI ? 2 : 0,

  /* 在 CI 上關閉平行執行，否則使用默認的平行工作者數量 */
  workers: process.env.CI ? 1 : undefined,

  /* 設定測試的 grep 過濾條件，只執行名稱符合的測試 */
  // grep: /@smoke/, // 可接受 RegExp 或 RegExp[]

  /* 設定反向 grep 過濾條件，排除名稱符合的測試 */
  // grepInvert: /@manual/, // 可接受 RegExp 或 RegExp[]

  /* 是否忽略快照測試 */
  ignoreSnapshots: false,

  /* 設定每個測試重複執行的次數 */
  repeatEach: 1,

  /* 設定最大允許的測試失敗次數，超過則停止測試。設為 0 則禁用此功能 */
  maxFailures: 0,

  /* 設定測試輸出的目錄 */
  outputDir: 'test-results',

  /* 設定是否保留測試輸出 */
  preserveOutput: 'always', // 可選值: 'always' | 'never' | 'failures-only'

  /* 設定慢測試的報告條件 */
  reportSlowTests: {
    max: 5, // 報告的慢測試文件最大數量，設為 0 則報告所有超過閾值的測試
    threshold: 15_000, // 測試時間超過多少毫秒視為慢測試，預設為 15 秒
  },

  /* 設定報告器 */
  reporter: 'html', // 可選值: 'list' | 'dot' | 'line' | 'github' | 'json' | 'junit' | 'null' | 'html' 或 [ [ 'reporter-name', { options } ] ]

  /* 設定是否靜默模式，隱藏測試執行的輸出 */
  quiet: false,

  /* 指定全域的 setup 檔案 */
  // globalSetup: require.resolve('./global-setup'),

  /* 指定全域的 teardown 檔案 */
  // globalTeardown: require.resolve('./global-teardown'),

  /* 設定測試的 metadata，會直接放入測試報告中 */
  metadata: {
    platform: process.platform,
    // 可以放入任意的 key-value 資料
  },

  /* 設定名稱，在報告中顯示 */
  name: '我的測試套件',

  /* 共享給所有專案的設定 */
  use: {
    /* 基底的 URL，在測試中可以使用相對路徑，例如 `await page.goto('/')` */
    // baseURL: 'http://127.0.0.1:3000',

    /* 在第一次重試時收集 trace */
    trace: 'on-first-retry', // 可選值: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry'

    /* 瀏覽器設定 */
    browserName: 'chromium', // 可選值: 'chromium' | 'firefox' | 'webkit'

    /* 是否忽略 HTTPS 錯誤 */
    ignoreHTTPSErrors: true,

    /* 預設的視窗大小 */
    viewport: { width: 1280, height: 720 },

    /* 是否錄製影片 */
    video: 'off', // 可選值: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry'

    /* 是否錄製執行過程的螢幕截圖 */
    screenshot: 'only-on-failure', // 可選值: 'off' | 'on' | 'only-on-failure'

    /* 地理位置設定 */
    // geolocation: { longitude: 12.492507, latitude: 41.889938 },

    /* 設定瀏覽器的預設語言 */
    locale: 'zh-TW',

    /* 設定時區 */
    timezoneId: 'Asia/Taipei',

    /* 設定 HTTP 請求的額外標頭 */
    extraHTTPHeaders: {
      'Accept-Language': 'zh-TW',
    },

    /* 是否啟用 JavaScript */
    javaScriptEnabled: true,

    /* 是否啟用觸控事件 */
    hasTouch: false,

    /* 設定使用者代理字串 */
    // userAgent: 'MyUserAgent',

    /* 是否自動接受下載 */
    acceptDownloads: true,
  },

  /* 配置測試專案 */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* 執行本地開發伺服器，在測試前啟動 */
  // webServer: [
  //   {
  //     command: 'npm run start',
  //     url: 'http://127.0.0.1:3000',
  //     timeout: 120 * 1000,
  //     reuseExistingServer: !process.env.CI,
  //     // ignoreHTTPSErrors: false,
  //     // cwd: '.', // 指定命令的執行目錄，預設為配置檔案所在的目錄
  //     // env: {
  //     //   NODE_ENV: 'test',
  //     // },
  //     // stdout: 'pipe', // 可選值: 'pipe' | 'ignore'
  //     // stderr: 'pipe', // 可選值: 'pipe' | 'ignore'
  //     // port: 3000, // 可以指定 port 或 url
  //   },
  //   {
  //     command: 'npm run backend',
  //     url: 'http://127.0.0.1:3333',
  //     timeout: 120 * 1000,
  //     reuseExistingServer: !process.env.CI,
  //     // ignoreHTTPSErrors: false,
  //     // cwd: '.', // 指定命令的執行目錄，預設為配置檔案所在的目錄
  //     // env: {
  //     //   NODE_ENV: 'test',
  //     // },
  //     // stdout: 'pipe', // 可選值: 'pipe' | 'ignore'
  //     // stderr: 'pipe', // 可選值: 'pipe' | 'ignore'
  //     // port: 3000, // 可以指定 port 或 url
  //   }
  // ],

  /* Playwright 編譯器配置 */
  // build: {
  //   external: ['**/*bundle.js'], // 排除編譯的路徑，使用 glob patterns
  // },

  /* 設定要忽略的測試檔案 */
  // testIgnore: '**/test-assets/**', // 可接受 string | RegExp | (string | RegExp)[]

  /* 設定要匹配的測試檔案 */
  // testMatch: /.*\.spec\.ts/, // 可接受 string | RegExp | (string | RegExp)[]

  /* 已棄用的選項 */
  // snapshotDir: './snapshots', // 請改用 snapshotPathTemplate

  /* 設定快照的路徑模板 */
  // snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}{ext}',

  /* 是否尊重 .gitignore 文件，在搜尋測試檔案時忽略其中的項目 */
  respectGitIgnore: true,

  /* 設定快照的更新策略 */
  updateSnapshots: 'missing', // 可選值: 'all' | 'none' | 'missing'

  /* 設定 shard，用於拆分測試 */
  shard: process.env.CI ? { total: 2, current: 1 } : undefined,
  // total: 總共的 shard 數量
  // current: 當前要執行的 shard，從 1 開始

  /* 設定 expect 的配置 */
  expect: {
    timeout: 5000, // 預設的 expect 超時時間（毫秒）

    toMatchSnapshot: {
      threshold: 0.2, // 允許的顏色差異閾值，介於 0（嚴格）到 1（寬鬆）
      maxDiffPixels: 10, // 最大允許的像素差異數量
      maxDiffPixelRatio: 0.1, // 最大允許的像素差異比例，介於 0 到 1
    },

    toHaveScreenshot: {
      animations: 'disabled', // 可選值: 'allow' | 'disabled'
      caret: 'hide', // 可選值: 'hide' | 'initial'
      // maxDiffPixels: 10, // 最大允許的像素差異數量
      // maxDiffPixelRatio: 0.1, // 最大允許的像素差異比例，介於 0 到 1
      scale: 'css', // 可選值: 'css' | 'device'
      // stylePath: ['./styles.css'], // 要注入的樣式表路徑
      threshold: 0.2, // 允許的顏色差異閾值
    },

    toPass: {
      timeout: 5000, // toPass 方法的超時時間（毫秒）
      intervals: [100, 250, 500, 1000], // toPass 方法的探測間隔（毫秒）
    },
  },
})
