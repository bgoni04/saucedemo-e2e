import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  reporter: [
    ['list'],
    [
      'playwright-qase-reporter',
      {
        mode: 'testops',
        debug: false,
        testops: {
          api: {
            token: 'dadf6b36e11b22f730655ee6c843cddc963bdb2b7b48c327a0fe287da00c1190',
          },
          project: 'SEE',
          run: {
            complete: true,
          },
        },
      },
    ],
  ],
  use: {
    baseURL: 'https://sem6-espina-bifida.vercel.app',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
