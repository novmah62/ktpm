const { test, expect } = require('@playwright/test');

test('admin logout successfully', async ({ page }) => {
  await page.goto('/admin');

  await page.locator('input[name="username"]').fill('admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.getByRole('button', { name: /sign in/i }).click();

  await page.waitForLoadState('networkidle');

  // Cách chắc nhất với source này: gọi trực tiếp endpoint logout
  await page.goto('/classes/Login.php?f=logout');

  await page.waitForLoadState('networkidle');

  // Sau logout, vào lại /admin phải thấy form login
  await page.goto('/admin');
  await expect(page.locator('input[name="username"]')).toBeVisible();

  await page.screenshot({
    path: 'evidence/automation/AUTO_ADMIN_LOGOUT_001.png',
    fullPage: true
  });
});
