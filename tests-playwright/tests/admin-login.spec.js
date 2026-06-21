// tests-playwright/tests/admin-login.spec.js
const { test, expect } = require('@playwright/test');

test('admin login successfully', async ({ page }) => {
  await page.goto('/admin');

  await page.locator('input[name="username"]').fill('admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.getByRole('button', { name: /sign in/i }).click();

  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/\/admin\/?/);
  await expect(page.locator('body')).toContainText(/home|dashboard|academic|department|course/i);

  await page.screenshot({ path: 'evidence/automation/AUTO_ADMIN_LOGIN_001.png', fullPage: true });
});