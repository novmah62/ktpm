# PHỤ LỤC THAM KHẢO: HƯỚNG DẪN DEMO AUTOMATION TESTING BẰNG PLAYWRIGHT - SIMPLE ELEARNING SYSTEM

## 1. Mục tiêu

Tài liệu này hướng dẫn demo `Automation Testing` tối giản cho website `Simple eLearning System` tại:

- Homepage: `http://localhost:8088`
- Admin: `http://localhost:8088/admin`

Phạm vi đủ để làm báo cáo:

1. Tạo test mở homepage
2. Tạo test admin login
3. Tạo test logout nếu thao tác dễ
4. Chạy test
5. Lấy screenshot hoặc report làm evidence

Thông tin đăng nhập:

- Username: `admin`
- Password: `admin123`

Lưu ý: đây là tài liệu hướng dẫn dùng cho phần demo automation hiện tại của nhóm. Công cụ automation được dùng để trình bày là `Playwright`.

## 1.1. Thư mục lưu ảnh evidence

Nên tạo thư mục:

```text
evidence/
  automation/
```

Tạo nhanh:

```bash
mkdir -p evidence/automation
```

Tên file gợi ý:

- `AUTO_HOME_001.png`
- `AUTO_ADMIN_LOGIN_001.png`
- `AUTO_ADMIN_LOGOUT_001.png`
- `AUTO_RUN_001.png`
- `AUTO_REPORT_001.png`

Đường dẫn dùng trong tài liệu:

- `evidence/automation/AUTO_HOME_001.png`
- `evidence/automation/AUTO_ADMIN_LOGIN_001.png`

## 1.2. Cách chụp evidence

Nên chụp 3 loại ảnh:

1. Ảnh kết quả trên browser:
   - homepage đã mở thành công
   - admin dashboard sau login
   - trang login sau logout nếu có
2. Ảnh terminal:
   - lệnh chạy test
   - số test pass/fail
3. Ảnh report:
   - HTML report hoặc danh sách test result

Nguyên tắc chụp:

- Ảnh browser phải thấy URL hoặc giao diện rõ ràng
- Ảnh terminal phải thấy lệnh và kết quả pass
- Ảnh report phải thấy tên test case

Không cần chụp quá nhiều. Chỉ cần:

- 1 ảnh homepage
- 1 ảnh login thành công
- 1 ảnh terminal/report

## 2. Tạo thư mục test riêng

Trong root project, tạo thư mục riêng cho automation:

```bash
mkdir -p tests-playwright
cd tests-playwright
```

Thư mục này tách riêng khỏi source PHP, tiện cho demo và không ảnh hưởng app chính.

## 3. Cài Playwright

## 3.1. Kiểm tra Node.js

Chạy:

```bash
node -v
npm -v
```

Nếu đã có Node.js thì tiếp tục.

## 3.2. Khởi tạo project test

Trong thư mục `tests-playwright`, chạy:

```bash
npm init -y
npm install -D @playwright/test
npx playwright install
```

Nếu muốn cài browser dependencies trên Ubuntu:

```bash
npx playwright install-deps
```

## 3.3. Cấu trúc thư mục gợi ý

Sau khi chuẩn bị, bạn có thể dùng cấu trúc:

```text
tests-playwright/
  package.json
  playwright.config.js
  tests/
    homepage.spec.js
    admin-login.spec.js
    admin-logout.spec.js
  screenshots/
```

## 4. Tạo file cấu hình Playwright

Tạo file `playwright.config.js`:

```js
// tests-playwright/playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:8088',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'off',
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
});
```

## 5. Test 1: Mở homepage

Tạo file `tests/homepage.spec.js`:

```js
// tests-playwright/tests/homepage.spec.js
const { test, expect } = require('@playwright/test');

test('open homepage successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('http://localhost:8088/');
  await page.screenshot({ path: 'evidence/automation/AUTO_HOME_001.png', fullPage: true });
});
```

### Giải thích ngắn

- `page.goto('/')` dùng `baseURL` từ config
- `screenshot` để lấy evidence
- Test này rất dễ pass và nên luôn có trong báo cáo

## 6. Test 2: Admin login

Từ source hiện tại, form admin có:

- input `name="username"`
- input `name="password"`
- button text `Sign In`

Tạo file `tests/admin-login.spec.js`:

```js
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
```

### Nếu selector không chạy đúng

Bạn có thể thay bằng một trong các cách sau:

```js
await page.locator('input[name="username"]').fill('admin');
await page.locator('input[name="password"]').fill('admin123');
```

Hoặc:

```js
await page.getByPlaceholder('Username').fill('admin');
await page.getByPlaceholder('Password').fill('admin123');
```

Hoặc:

```js
await page.getByRole('button', { name: 'Sign In' }).click();
```

## 7. Test 3: Admin logout

Chức năng logout trong app cũ có thể thay đổi nhẹ theo menu, nên test này là tùy chọn. Làm nếu bạn thao tác được bằng selector.

Tạo file `tests/admin-logout.spec.js`:

```js
// tests-playwright/tests/admin-logout.spec.js
const { test, expect } = require('@playwright/test');

test('admin logout successfully', async ({ page }) => {
  await page.goto('/admin');

  await page.locator('input[name="username"]').fill('admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.getByRole('button', { name: /sign in/i }).click();

  await page.waitForLoadState('networkidle');

  // Tùy giao diện thực tế, có thể cần click tên user hoặc menu avatar trước
  const logoutLink = page.locator('a[href*="Login.php?f=logout"]').first();
  await expect(logoutLink).toBeVisible();
  await logoutLink.click();

  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/\/admin\/login\.php|\/admin\/?$/);

  await page.screenshot({ path: 'evidence/automation/AUTO_ADMIN_LOGOUT_001.png', fullPage: true });
});
```

### Nếu logout selector chưa đúng

Mở DevTools trên trình duyệt và inspect nút logout, hoặc tìm bằng text:

```js
await page.getByText(/logout|sign out/i).click();
```

Nếu app dùng menu người dùng:

```js
await page.getByText(/admin|user/i).click();
await page.getByText(/logout|sign out/i).click();
```

## 8. Cách inspect selector nếu chưa chắc

Nếu code trên không chạy ngay, có 3 cách nhanh:

### Cách 1: Dùng DevTools của Chrome

1. Mở `http://localhost:8088/admin`
2. Nhấn `F12`
3. Chọn icon inspect
4. Click vào ô username/password hoặc nút login
5. Xem:
   - `name`
   - `id`
   - `placeholder`
   - text của button

### Cách 2: Dùng Playwright codegen

Chạy:

```bash
npx playwright codegen http://localhost:8088/admin
```

Sau đó:

1. Tự tay login trên browser mà Playwright mở ra
2. Tool sẽ sinh code selector tương ứng

Đây là cách nhanh nhất nếu selector trong app hơi khó.

### Cách 3: Ưu tiên selector dễ bảo trì

Thứ tự ưu tiên:

1. `getByRole`
2. `getByPlaceholder`
3. `locator('input[name="..."]')`
4. `getByText`

Ví dụ:

```js
await page.getByPlaceholder('Username').fill('admin');
await page.getByPlaceholder('Password').fill('admin123');
await page.getByRole('button', { name: /sign in/i }).click();
```

## 9. Lệnh chạy test

Trong thư mục `tests-playwright`, chạy:

### Chạy toàn bộ test

```bash
npx playwright test
```

### Chạy riêng test homepage

```bash
npx playwright test tests/homepage.spec.js
```

### Chạy riêng test admin login

```bash
npx playwright test tests/admin-login.spec.js
```

### Chạy có mở browser dễ quan sát

```bash
npx playwright test --headed
```

### Chạy 1 worker để output dễ đọc

```bash
npx playwright test --workers=1
```

## 10. Xuất report và evidence

## 10.1. HTML report

Sau khi chạy test:

```bash
npx playwright show-report
```

Report sẽ nằm trong:

- `tests-playwright/playwright-report/`

Bạn có thể chụp:

- màn hình report tổng
- danh sách test pass/fail

## 10.2. Screenshot evidence

Các test ở trên đã chủ động lưu screenshot:

- `evidence/automation/AUTO_HOME_001.png`
- `evidence/automation/AUTO_ADMIN_LOGIN_001.png`
- `evidence/automation/AUTO_ADMIN_LOGOUT_001.png`

Nên chụp thêm:

- terminal sau khi chạy test thành công
- HTML report sau khi mở bằng `show-report`

Tên file gợi ý cho báo cáo:

- `evidence/automation/AUTO_RUN_001.png`
- `evidence/automation/AUTO_REPORT_001.png`

## 11. Gợi ý chạy thực tế nhanh nhất

Nếu muốn demo nhanh để pass báo cáo:

1. Chạy test homepage
2. Chạy test admin login
3. Nếu logout chạy ổn thì thêm logout

Như vậy là đủ có:

- automation smoke test
- login automation
- evidence bằng screenshot và report

## 12. Bảng Automation Result để đưa vào báo cáo

Bạn có thể dùng bảng sau:

| Automation Case ID | Script Name | Module | Tool | Expected Result | Actual Result | Status | Evidence | Note |
|---|---|---|---|---|---|---|---|---|
| AUTO_001 | `homepage.spec.js` | Homepage | Playwright | Mở homepage thành công | Điền sau khi chạy |  | evidence/automation/AUTO_HOME_001.png | Smoke automation |
| AUTO_002 | `admin-login.spec.js` | Admin Login | Playwright | Đăng nhập Admin thành công | Điền sau khi chạy |  | evidence/automation/AUTO_ADMIN_LOGIN_001.png | Case chính của demo |
| AUTO_003 | `admin-logout.spec.js` | Admin Logout | Playwright | Logout thành công và quay về trang login | Điền sau khi chạy |  | evidence/automation/AUTO_ADMIN_LOGOUT_001.png | Chạy nếu selector ổn định |

## 13. Mẫu nhận xét ngắn cho báo cáo

Bạn có thể ghi:

- `Nhóm sử dụng Playwright để tự động hóa một số luồng cơ bản của hệ thống.`
- `Các script được xây dựng cho các chức năng đơn giản như mở homepage, đăng nhập Admin và đăng xuất.`
- `Kết quả chạy test cho thấy các luồng smoke automation hoạt động ổn định trên môi trường local.`

Nếu logout chưa ổn:

- `Trong phạm vi demo, nhóm ưu tiên tự động hóa homepage và admin login; các luồng nâng cao hơn như logout có thể tiếp tục hoàn thiện sau.`

## 14. Kết luận

Để đủ phần `Automation Testing` trong báo cáo, bạn chỉ cần:

1. Cài Playwright trong thư mục riêng
2. Tạo 2 script chắc chắn chạy được:
   - homepage
   - admin login
3. Chạy test
4. Chụp terminal, screenshot và report

Như vậy là đủ tối giản, có code cụ thể, có evidence và đủ chuyên nghiệp cho báo cáo môn học.
