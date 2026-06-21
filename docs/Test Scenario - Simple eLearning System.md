# TEST SCENARIO - SIMPLE ELEARNING SYSTEM

| Scenario ID | Module | Test Scenario | Priority | Tool | Ghi chú |
|---|---|---|---|---|---|
| SC_SMOKE_001 | Smoke Test | Truy cập được homepage của hệ thống | High | Chrome, Edge | Xác nhận website hoạt động |
| SC_SMOKE_002 | Smoke Test | Truy cập được trang đăng nhập Admin | High | Chrome, Edge | URL `/admin` |
| SC_SMOKE_003 | Smoke Test | Truy cập được trang đăng nhập Faculty | High | Chrome, Edge | URL `/faculty` |
| SC_LOGIN_001 | Login/Logout | Admin đăng nhập thành công với tài khoản hợp lệ | High | Chrome, Edge | `admin / admin123` |
| SC_LOGIN_002 | Login/Logout | Admin đăng nhập thất bại với mật khẩu sai | High | Chrome, Edge | Negative case |
| SC_LOGIN_003 | Login/Logout | Faculty đăng nhập thành công với tài khoản hợp lệ | High | Chrome, Edge | `12345 / 12345` hoặc `gwilson@sample.com / 12345` |
| SC_LOGIN_004 | Login/Logout | Faculty logout thành công và không truy cập lại trang nội bộ sau logout | High | Chrome, Edge | Kiểm tra session |
| SC_LOGIN_005 | Login/Logout | Student đăng nhập thành công nếu có tài khoản hợp lệ | Medium | Chrome, Edge | Chỉ chạy nếu có account dùng được |
| SC_STUDENT_001 | Admin quản lý Student | Admin xem được danh sách Student | High | Chrome, Edge | Kiểm tra load danh sách |
| SC_STUDENT_002 | Admin quản lý Student | Admin thêm mới Student với dữ liệu hợp lệ | High | Chrome, Edge, PhpMyAdmin | Positive case |
| SC_STUDENT_003 | Admin quản lý Student | Admin sửa thông tin Student thành công | Medium | Chrome, Edge, PhpMyAdmin | Positive case |
| SC_STUDENT_004 | Admin quản lý Student | Admin kiểm tra validation khi thêm Student thiếu trường bắt buộc | Medium | Chrome, Edge | Negative case |
| SC_FACULTY_001 | Admin quản lý Faculty | Admin xem được danh sách Faculty | High | Chrome, Edge | Kiểm tra load danh sách |
| SC_FACULTY_002 | Admin quản lý Faculty | Admin thêm mới Faculty với dữ liệu hợp lệ | High | Chrome, Edge, PhpMyAdmin | Positive case |
| SC_FACULTY_003 | Admin quản lý Faculty | Admin kiểm tra validation khi thêm Faculty thiếu trường bắt buộc | Medium | Chrome, Edge | Negative case |
| SC_ACADEMIC_001 | Course/Subject/Class | Admin xem được danh sách Course, Subject hoặc Class | Medium | Chrome, Edge | Chỉ cần demo 1-2 màn hình đại diện |
| SC_UPLOAD_001 | Faculty upload file/tài liệu | Faculty xem được danh sách lesson | High | Chrome, Edge | Bước tiền đề cho upload |
| SC_UPLOAD_002 | Faculty upload file/tài liệu | Faculty tạo lesson và upload tài liệu hợp lệ | High | Chrome, Edge, PhpMyAdmin | Positive case |
| SC_UPLOAD_003 | Faculty upload file/tài liệu | Faculty kiểm tra trường hợp thiếu dữ liệu hoặc file upload không hợp lệ | Medium | Chrome, Edge | Negative case |
| SC_VIEW_001 | Student xem môn học/lớp học | Student xem được danh sách môn học hoặc lớp học được gán | High | Chrome, Edge | Kiểm tra dữ liệu theo tài khoản |
| SC_DOWNLOAD_001 | Student download file | Student mở lesson và tải/xem được file tài liệu | High | Chrome, Edge | Nếu có lesson hợp lệ |
| SC_SECURITY_001 | Security basic | Kiểm tra SQL Injection basic tại form login | High | Chrome, OWASP ZAP | Payload đơn giản |
| SC_SECURITY_002 | Security basic | Kiểm tra XSS basic tại form nhập liệu | Medium | Chrome, OWASP ZAP | Payload `<script>alert(1)</script>` |
| SC_SECURITY_003 | Security basic | Kiểm tra truy cập trực tiếp URL nội bộ khi chưa login hoặc sai vai trò | High | Chrome, Edge | Access control |
| SC_PERF_001 | Performance basic | Kiểm tra response time các trang chính với tải nhỏ | Medium | Apache JMeter | Chạy trên homepage/admin/faculty |
| SC_AUTO_001 | Automation smoke test | Tự động mở homepage và đăng nhập Admin thành công | Medium | Selenium | Smoke automation tối giản |
