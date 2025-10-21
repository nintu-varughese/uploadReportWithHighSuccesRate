import { defineConfig, devices, ReporterDescription } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

/**
 * Load environment variables from .env file
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Allure Reporter configuration
 */
const reporters: ReporterDescription[] = [
  ['list'],
  ['html', { open: 'never' }],
  [
    'allure-playwright',
    {
      outputFolder: 'artifacts/allure-results',
      detail: false,
      suiteTitle: false,
      useCucumberStepReporter: false,
      useStepsForHooks: false,
      screenshots: 'on',
      videos: 'on',
    },
  ],
];

/**
 * Playwright Test Configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: reporters,

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'on',
    headless:true,

    // Record videos for all tests
    video: 'on',
    contextOptions: {
      recordVideo: {
        dir: 'videos/', // videos saved here
        size: { width: 1280, height: 720 },
      },
    },

    viewport: { width: 1280, height: 720 },
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
  },

  projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
  {
    name: 'msedge',  // Edge browser mapped to msedge in your workflow
    use: {
      ...devices['Desktop Edge'],
      channel: 'msedge',
    },
  },
],

});
