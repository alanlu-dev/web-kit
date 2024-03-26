module.exports = {
  apps: [
    {
      name: 'nuxt-demo',
      script: './.output/server/index.mjs',
      exec_mode: 'cluster',
      instances: 'max',
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['**/.nuxt/**', '**/node_modules/**', '**/.output/**', '**/.turbo/**'],
      time: true,
      merge_logs: true,
      autorestart: true,
      node_args: '-r dotenv/config',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        NUXT_PUBLIC_SITE_URL: 'https://qlmpw695-80.asse.devtunnels.ms',
        NUXT_PUBLIC_GTAG_ID: 'G-XXXXXXXXXX',
        NUXT_PUBLIC_GTM_ID: 'GTM-XXXXXXXX',
      },
    },
  ],
}
