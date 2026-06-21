# HƯỚNG DẪN DEMO SECURITY TESTING - SIMPLE ELEARNING SYSTEM

## 1. Mục tiêu

Tài liệu này hướng dẫn kiểm thử bảo mật ở mức tối giản cho website `Simple eLearning System` chạy local tại:

- `http://localhost:8088`

Mục tiêu là lấy bằng chứng để đưa vào báo cáo môn học, không nhằm pentest chuyên sâu. Phạm vi gồm:

1. Test `SQL Injection` ở form login
2. Test `XSS` ở form nhập liệu
3. Test `Direct URL Access` khi chưa login hoặc sai vai trò
4. Dùng `OWASP ZAP` quét cơ bản nếu có thể bằng Docker

## 2. Chuẩn bị

### 2.1. Môi trường

- Website chạy tại `http://localhost:8088`
- Admin: `http://localhost:8088/admin`
- Faculty: `http://localhost:8088/faculty`
- Student: `http://localhost:8088/student`
- Trình duyệt: `Chrome`
- Công cụ tùy chọn: `OWASP ZAP`

### 2.2. Thư mục lưu bằng chứng

Nên tạo và lưu ảnh theo cấu trúc sau tại thư mục gốc project:

```text
evidence/
  security/
```

Ví dụ đường dẫn thực tế:

- `evidence/security/SEC_SQLI_001.png`
- `evidence/security/SEC_XSS_001.png`
- `evidence/security/SEC_URL_001.png`
- `evidence/security/SEC_ZAP_001.png`

Nếu chưa có thư mục, tạo trước:

```bash
mkdir -p evidence/security
```

### 2.3. Quy tắc đặt tên ảnh

Nên đặt tên file theo mẫu:

- `SEC_<LOAI>_<SO_THU_TU>.png`

Ví dụ:

- `SEC_SQLI_001.png`
- `SEC_XSS_001.png`
- `SEC_URL_001.png`
- `SEC_ZAP_001.png`

Nếu có nhiều ảnh cho một bài test:

- `SEC_SQLI_001_STEP1.png`
- `SEC_SQLI_001_RESULT.png`

### 2.4. Cách chụp ảnh evidence

Nguyên tắc chụp:

1. Chụp rõ toàn bộ cửa sổ trình duyệt hoặc cửa sổ công cụ
2. Trên ảnh phải nhìn thấy:
   - URL hoặc tên trang nếu có
   - payload nhập vào nếu đang test input
   - kết quả sau khi submit
3. Với ZAP, ảnh nên thấy:
   - tab `Alerts`
   - mức độ cảnh báo
   - target hoặc request liên quan
4. Không cần chụp quá nhiều; mỗi bài test chỉ cần 1-2 ảnh đại diện

Cách chụp thực tế:

- Trên Ubuntu: dùng `Print Screen` hoặc `Shift + Print Screen`
- Nếu dùng công cụ chụp màn hình mặc định, chọn vùng chứa:
  - thanh địa chỉ
  - form/payload
  - kết quả hiển thị

Sau khi chụp:

1. Đổi tên file đúng quy tắc
2. Di chuyển file vào `evidence/security/`
3. Dùng đúng tên đó trong báo cáo hoặc bảng evidence

## 3. Test SQL Injection ở login form

### 3.1. Mục tiêu
Kiểm tra form login có cho phép bypass đăng nhập bằng payload SQL Injection cơ bản hay không.

### 3.2. Vị trí test

Có thể test tại:

- `http://localhost:8088/admin`
- `http://localhost:8088/faculty`
- `http://localhost:8088/student`

Ưu tiên test trước ở `Admin` và `Faculty`.

### 3.3. Payload đề xuất

Thử lần lượt các payload đơn giản sau tại ô username hoặc password:

1. `' OR '1'='1`
2. `' OR 1=1 -- `
3. `admin' -- `
4. `' OR 'a'='a`
5. `"' OR '1'='1`

Nếu form có 2 ô, có thể nhập:

- Username: `' OR '1'='1`
- Password: `' OR '1'='1`

Hoặc:

- Username: `admin' -- `
- Password: `abc`

### 3.4. Các bước thực hiện

1. Mở trang login Admin.
2. Nhập một payload vào trường username.
3. Nhập một payload hoặc giá trị bất kỳ vào trường password.
4. Click nút đăng nhập.
5. Quan sát hệ thống:
   - Có đăng nhập được hay không
   - Có hiện lỗi SQL/PHP warning/stack trace hay không
   - Có hiện thông báo sai tài khoản bình thường hay không
6. Chụp screenshot kết quả.
7. Lặp lại với 1-2 payload khác nếu cần.

### 3.5. Expected Result

- Không đăng nhập bypass được
- Không hiển thị lỗi SQL
- Không lộ câu query, stack trace hoặc thông tin nhạy cảm
- Hệ thống chỉ báo đăng nhập thất bại hoặc thông báo tương đương

### 3.6. Actual Result mẫu để điền

- `Payload không bypass được đăng nhập, hệ thống từ chối truy cập và không hiển thị lỗi SQL ra giao diện.`

Hoặc nếu có lỗi:

- `Hệ thống không đăng nhập thành công nhưng hiển thị thông báo lỗi kỹ thuật/warning trên giao diện.`

### 3.7. Evidence cần chụp

- Form login trước khi submit payload
- Kết quả sau khi submit payload

Tên file gợi ý:

- `evidence/security/SEC_SQLI_001.png`

## 4. Test XSS ở form nhập liệu

### 4.1. Mục tiêu
Kiểm tra các ô nhập liệu có render script nguy hiểm ra giao diện hay không.

### 4.2. Vị trí test gợi ý

Chọn một form nhập liệu trong Admin, ví dụ:

- Thêm `Student`
- Thêm `Faculty`
- Thêm `Course`
- Thêm `Subject`

Ưu tiên trường text như:

- Họ tên
- Tên môn học
- Mã môn học
- Course name

### 4.3. Payload đề xuất

Thử một trong các payload sau:

1. `<script>alert(1)</script>`
2. `"><script>alert(1)</script>`
3. `<img src=x onerror=alert(1)>`
4. `<svg/onload=alert(1)>`

Nên dùng trước payload đơn giản:

- `<script>alert(1)</script>`

### 4.4. Các bước thực hiện

1. Đăng nhập Admin.
2. Mở form thêm Student, Faculty hoặc Course.
3. Nhập payload XSS vào một trường text.
4. Điền các trường còn lại nếu cần để form cho submit.
5. Lưu dữ liệu.
6. Quan sát:
   - Có popup `alert(1)` xuất hiện hay không
   - Dữ liệu có bị encode hay hiển thị thô hay không
   - Có lỗi giao diện hay lỗi hệ thống không
7. Nếu dữ liệu được lưu, mở lại trang danh sách hoặc trang chi tiết để xem payload có bị thực thi khi render lại không.
8. Chụp screenshot.

### 4.5. Expected Result

- Payload không được thực thi
- Không xuất hiện popup `alert`
- Hệ thống encode hoặc chặn dữ liệu nguy hiểm
- Không làm vỡ giao diện

### 4.6. Actual Result mẫu để điền

- `Payload không được thực thi, không xuất hiện popup alert, dữ liệu được hiển thị như text thông thường hoặc bị từ chối lưu.`

Hoặc nếu có lỗi:

- `Payload được lưu và khi mở lại danh sách/trang chi tiết thì script bị thực thi.`

### 4.7. Evidence cần chụp

- Form trước khi submit payload
- Kết quả sau khi lưu
- Trang danh sách/chi tiết sau khi render dữ liệu

Tên file gợi ý:

- `evidence/security/SEC_XSS_001.png`

## 5. Test Direct URL Access khi chưa login

### 5.1. Mục tiêu
Kiểm tra người dùng chưa đăng nhập hoặc đăng nhập sai vai trò có truy cập trực tiếp vào trang nội bộ hay không.

### 5.2. URL gợi ý để test

Thử một số URL nội bộ như:

- `http://localhost:8088/admin/index.php`
- `http://localhost:8088/admin/?page=students`
- `http://localhost:8088/admin/?page=faculty`
- `http://localhost:8088/faculty/index.php`
- `http://localhost:8088/faculty/?page=lesson`
- `http://localhost:8088/student/index.php`
- `http://localhost:8088/student/?page=subject`

### 5.3. Các bước thực hiện

#### Trường hợp 1: Chưa đăng nhập

1. Mở tab ẩn danh.
2. Paste trực tiếp một URL nội bộ Admin hoặc Faculty.
3. Quan sát hệ thống có redirect về login không.
4. Chụp screenshot.

#### Trường hợp 2: Đăng nhập sai vai trò

1. Đăng nhập bằng Faculty.
2. Truy cập trực tiếp URL Admin như `http://localhost:8088/admin/?page=students`.
3. Quan sát có bị chặn hoặc redirect không.
4. Chụp screenshot.

### 5.4. Expected Result

- Người dùng chưa đăng nhập bị chuyển về trang login
- Người dùng sai vai trò không truy cập được trang nội bộ của role khác
- Không nhìn thấy dữ liệu protected

### 5.5. Actual Result mẫu để điền

- `Hệ thống redirect người dùng chưa đăng nhập về trang login và chặn truy cập sai vai trò.`

Hoặc nếu có lỗi:

- `Người dùng có thể mở trực tiếp một số URL nội bộ mà không cần đăng nhập hoặc khi đăng nhập sai vai trò.`

### 5.6. Evidence cần chụp

- URL nhập trực tiếp trên trình duyệt
- Kết quả redirect hoặc màn hình bị chặn

Tên file gợi ý:

- `evidence/security/SEC_URL_001.png`

## 6. Dùng OWASP ZAP scan cơ bản bằng Docker

### 6.1. Mục tiêu
Quét bảo mật cơ bản để lấy thêm bằng chứng cho báo cáo, chủ yếu ở mức:

- Missing security headers
- X-Frame-Options
- Content Security Policy
- Cookie flags
- Các cảnh báo passive scan phổ biến

### 6.2. Cách đơn giản nhất

Nếu máy có Docker, có thể chạy OWASP ZAP container.

Ví dụ:

```bash
docker run -u zap -p 8081:8080 -i ghcr.io/zaproxy/zaproxy:stable zap-webswing.sh
```

Sau đó:

1. Mở trình duyệt truy cập `http://localhost:8081`
2. Vào giao diện ZAP
3. Chọn Manual Explore hoặc dùng browser duyệt website local `http://localhost:8088`
4. Mở lần lượt:
   - Trang chủ
   - Admin login
   - Faculty login
   - Một số trang nội bộ nếu đã đăng nhập
5. Quay lại ZAP xem tab `Alerts`
6. Chụp lại các cảnh báo tiêu biểu

### 6.3. Nếu ZAP trong container không truy cập được localhost

Do website chạy local, có thể cần dùng hostname đặc biệt:

- `http://host.docker.internal:8088`

Nếu trên Linux không dùng được ngay, có thể chạy container với host network:

```bash
docker run --network host -i ghcr.io/zaproxy/zaproxy:stable zap-webswing.sh
```

Sau đó truy cập giao diện theo cấu hình phù hợp trên máy.

Nếu cách này phức tạp, bạn có thể bỏ phần scan chủ động và chỉ ghi:

- `OWASP ZAP được dùng để passive scan cơ bản trên môi trường local`

### 6.4. Expected Result

- ZAP ghi nhận được traffic của website
- Có thể xuất hiện một số cảnh báo mức Low/Medium liên quan header hoặc cấu hình
- Không cần chứng minh có lỗ hổng nghiêm trọng

### 6.5. Actual Result mẫu để điền

- `OWASP ZAP ghi nhận được traffic khi duyệt website local và phát hiện một số cảnh báo bảo mật cơ bản như thiếu security headers hoặc cấu hình header chưa chặt.`

### 6.6. Evidence cần chụp

- Màn hình ZAP đang quét hoặc đang ghi nhận request
- Tab `Alerts`
- Một alert tiêu biểu

Tên file gợi ý:

- `evidence/security/SEC_ZAP_001.png`
- `evidence/security/SEC_ZAP_002.png`

## 7. Mẫu Security Findings

Bảng dưới đây có thể dùng trực tiếp trong báo cáo.

| Security Case ID | Target | Payload/Input | Tool | Expected Result | Actual Result | Risk Level | Status | Evidence | Recommendation |
|---|---|---|---|---|---|---|---|---|---|
| SEC_FIND_001 | Admin Login `http://localhost:8088/admin` | `' OR '1'='1` | Chrome | Không bypass đăng nhập, không lộ lỗi SQL | Điền sau khi thực hiện | High |  | evidence/security/SEC_SQLI_001.png | Dùng prepared statement, ẩn lỗi kỹ thuật khỏi giao diện |
| SEC_FIND_002 | Form thêm Student/Faculty/Course | `<script>alert(1)</script>` | Chrome | Payload không được thực thi | Điền sau khi thực hiện | Medium |  | evidence/security/SEC_XSS_001.png | Encode output, validate input phía server |
| SEC_FIND_003 | URL nội bộ Admin/Faculty/Student | Truy cập trực tiếp URL | Chrome | Bị chặn hoặc redirect về login | Điền sau khi thực hiện | High |  | evidence/security/SEC_URL_001.png | Kiểm tra session và role ở mọi trang nội bộ |
| SEC_FIND_004 | Website local `http://localhost:8088` | Passive scan | OWASP ZAP | Chỉ có ít hoặc không có cảnh báo bảo mật cơ bản | Điền sau khi thực hiện | Low/Medium |  | evidence/security/SEC_ZAP_001.png | Bổ sung security headers và rà soát cấu hình response |

## 8. Cách viết kết quả vào báo cáo

Bạn có thể ghi ngắn gọn như sau:

- `Kiểm thử SQL Injection basic tại form login cho thấy hệ thống không cho phép bypass đăng nhập với các payload đơn giản.`
- `Kiểm thử XSS basic tại form nhập liệu được thực hiện nhằm kiểm tra khả năng xử lý dữ liệu đầu vào không an toàn.`
- `Kiểm thử Direct URL Access cho thấy hệ thống đã/chưa chặn truy cập trái phép vào các trang nội bộ.`
- `OWASP ZAP được sử dụng để quét bảo mật cơ bản và ghi nhận các cảnh báo cấu hình nếu có.`

## 9. Kết luận

Với bài demo báo cáo, bạn chỉ cần hoàn thành 4 hạng mục sau là đủ:

1. 1 bài test `SQL Injection`
2. 1 bài test `XSS`
3. 1 bài test `Direct URL Access`
4. 1 ảnh `OWASP ZAP Alerts` nếu chạy được

Như vậy là đã có phần `Security Testing` tối giản nhưng vẫn đủ bằng chứng và đủ nội dung để trình bày trong báo cáo.
