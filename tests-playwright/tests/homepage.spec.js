// tests-playwright/tests/homepage.spec.js
const { test, expect } = require('@playwright/test');

test('open homepage successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('http://localhost:8088/');
  await page.screenshot({ path: 'evidence/automation/AUTO_HOME_001.png', fullPage: true });
});