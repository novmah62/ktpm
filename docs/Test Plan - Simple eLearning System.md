# KẾ HOẠCH KIỂM THỬ WEBSITE SIMPLE ELEARNING SYSTEM

## 1. Giới thiệu

### 1.1. Tên sản phẩm
Website học trực tuyến `Simple eLearning System`.

Phiên bản kiểm thử:

- URL local: `http://localhost:8088`
- Admin: `http://localhost:8088/admin`
- Faculty: `http://localhost:8088/faculty`
- Student: `http://localhost:8088/student`
- Môi trường: `Docker Compose trên Ubuntu`
- Web server: `PHP 7.4 + Apache`
- Database: `MariaDB`
- PhpMyAdmin: `http://localhost:8089`

### 1.2. Mục tiêu của sản phẩm
Website được xây dựng nhằm mô phỏng một hệ thống học trực tuyến đơn giản với các chức năng chính:

- Đăng nhập cho các vai trò Admin, Faculty, Student
- Quản lý giảng viên, sinh viên, môn học, lớp học
- Gán giảng viên cho lớp học và môn học
- Quản lý bài giảng
- Cho phép sinh viên xem môn học và bài học
- Quản lý phân quyền truy cập theo vai trò

### 1.3. Mục tiêu kiểm thử
Mục tiêu của kế hoạch kiểm thử là:

- Xác định các chức năng chính cần kiểm thử trên website eLearning
- Đánh giá khả năng hoạt động đúng của các luồng nghiệp vụ cơ bản
- Phát hiện lỗi chức năng, lỗi phân quyền, lỗi nhập liệu và lỗi giao diện cơ bản
- Thực hiện kiểm thử bảo mật, hiệu năng và tự động hóa ở mức tối thiểu
- Thu thập bằng chứng kiểm thử phục vụ báo cáo môn học

## 2. Phạm vi kiểm thử

### 2.1. Chức năng thực hiện kiểm thử

| Module | Chức năng kiểm thử |
|---|---|
| Trang truy cập hệ thống | Kiểm tra mở được website và các trang đăng nhập |
| Admin Login | Đăng nhập, đăng xuất, kiểm tra sai tài khoản/mật khẩu |
| Faculty Login | Đăng nhập, đăng xuất |
| Student Login | Đăng nhập, đăng xuất nếu có tài khoản sử dụng được |
| Phân quyền | Kiểm tra truy cập đúng vai trò Admin, Faculty, Student |
| Admin - Faculty | Xem danh sách, thêm/sửa thông tin giảng viên ở mức cơ bản |
| Admin - Student | Xem danh sách, thêm/sửa thông tin sinh viên ở mức cơ bản |
| Admin - Course/Subject/Class | Xem danh sách và thao tác cơ bản nếu hệ thống hoạt động ổn định |
| Faculty - Class | Xem lớp học được phân công |
| Faculty - Lesson | Xem danh sách bài giảng, xem chi tiết, thêm bài giảng nếu thao tác được |
| Student - Subject | Xem danh sách môn học |
| Student - Lesson | Xem danh sách bài học, xem nội dung bài học |
| Database | Kiểm tra dữ liệu sau thao tác thêm/sửa bằng PhpMyAdmin |
| Security cơ bản | Kiểm tra input login, XSS cơ bản, session, access control |
| Performance cơ bản | Kiểm tra thời gian phản hồi một số trang chính |

### 2.2. Chức năng không thực hiện kiểm thử
Do giới hạn thời gian và mục tiêu demo, các nội dung sau không kiểm thử sâu:

- Toàn bộ CRUD của tất cả module
- Quên mật khẩu hoặc email thật
- API chuyên sâu
- Unit test/source code toàn hệ thống
- Kiểm thử bảo mật chuyên sâu kiểu penetration testing
- Kiểm thử hiệu năng ở quy mô production
- Kiểm thử tải lớn, stress test, endurance test

## 3. Yêu cầu kiểm thử

### 3.1. Yêu cầu chức năng

| Mã yêu cầu | Nội dung |
|---|---|
| FR-01 | Người dùng có thể truy cập website local |
| FR-02 | Admin có thể đăng nhập và đăng xuất |
| FR-03 | Faculty có thể đăng nhập và đăng xuất |
| FR-04 | Student có thể đăng nhập và đăng xuất nếu có tài khoản hợp lệ |
| FR-05 | Hệ thống chặn truy cập sai quyền giữa Admin, Faculty, Student |
| FR-06 | Admin có thể xem danh sách Faculty |
| FR-07 | Admin có thể xem danh sách Student |
| FR-08 | Admin có thể xem danh sách Course, Subject, Class |
| FR-09 | Faculty có thể xem lớp học được phân công |
| FR-10 | Faculty có thể xem danh sách bài giảng |
| FR-11 | Faculty có thể xem chi tiết bài giảng |
| FR-12 | Student có thể xem danh sách môn học |
| FR-13 | Student có thể xem danh sách bài học |
| FR-14 | Dữ liệu sau thao tác thêm/sửa được lưu vào database nếu thao tác thành công |

### 3.2. Yêu cầu phi chức năng

| Mã yêu cầu | Nội dung |
|---|---|
| NFR-01 | Website hiển thị đúng trên Chrome và Microsoft Edge |
| NFR-02 | Các trang chính phản hồi ổn định trong môi trường local |
| NFR-03 | Hệ thống không để lộ lỗi SQL hoặc stack trace khi nhập sai dữ liệu thông thường |
| NFR-04 | Các trang quản trị yêu cầu xác thực trước khi truy cập |
| NFR-05 | Session bị hủy đúng sau khi logout |
| NFR-06 | Dữ liệu hiển thị và dữ liệu trong database nhất quán ở mức cơ bản |
| NFR-07 | Hệ thống xử lý được tải nhỏ phục vụ demo môn học |

## 4. Chiến lược kiểm thử

### 4.1. Phương pháp kiểm thử

| Phương pháp | Cách áp dụng |
|---|---|
| Kiểm thử hộp đen | Kiểm thử dựa trên chức năng và giao diện nhìn thấy |
| Kiểm thử thủ công | Tester thao tác trực tiếp trên trình duyệt và ghi kết quả |
| Kiểm thử tự động cơ bản | Tự động hóa một số luồng đăng nhập và mở trang chức năng |
| Kiểm thử bảo mật cơ bản | Dùng payload đơn giản và quét OWASP ZAP mức cơ bản |
| Kiểm thử hiệu năng cơ bản | Dùng JMeter test tải nhỏ trên môi trường local |

### 4.2. Mức độ kiểm thử

| Mức kiểm thử | Áp dụng trong dự án |
|---|---|
| Smoke Test | Kiểm tra nhanh các luồng sống còn trước khi test chi tiết |
| System Test | Kiểm thử các chức năng chính của website |
| Security Test | Kiểm thử bảo mật ở mức cơ bản |
| Performance Test | Kiểm thử hiệu năng ở mức tối thiểu |
| Automation Test | Tự động hóa một số luồng tiêu biểu |

## 5. Công cụ kiểm thử

| STT | Mục đích | Công cụ | Ghi chú |
|---|---|---|---|
| 1 | Quản lý test case | Microsoft Excel | Ghi test case, kết quả, trạng thái |
| 2 | Kiểm thử thủ công | Google Chrome, Microsoft Edge | Thao tác trực tiếp trên website |
| 4 | Kiểm thử bảo mật | OWASP ZAP | Passive scan hoặc manual explore |
| 5 | Kiểm thử hiệu năng | Apache JMeter | Test tải nhỏ |
| 6 | Kiểm thử tự động | Playwright | Chạy 2-3 luồng cơ bản |
| 7 | Kiểm tra dữ liệu | PhpMyAdmin | Kiểm tra dữ liệu DB sau thao tác |
| 8 | Ghi bug | Microsoft Excel | Bug report và findings |

## 6. Môi trường kiểm thử

| Thành phần | Giá trị |
|---|---|
| Hệ điều hành | Ubuntu |
| Hình thức triển khai | Docker Compose |
| Web server | Apache |
| Ngôn ngữ backend | PHP 7.4 |
| Database | MariaDB |
| Trình duyệt kiểm thử chính | Google Chrome, Microsoft Edge |
| Website URL | `http://localhost:8088` |
| Admin URL | `http://localhost:8088/admin` |
| Faculty URL | `http://localhost:8088/faculty` |
| Student URL | `http://localhost:8088/student` |
| PhpMyAdmin | `http://localhost:8089` |

## 7. Dữ liệu test

Dữ liệu test sử dụng trong quá trình demo bao gồm:

- Tài khoản Admin hợp lệ
- Tài khoản Faculty hợp lệ
- Tài khoản sai mật khẩu để test negative case
- Một số dữ liệu sẵn có về Faculty, Student, Course, Subject, Class, Lesson
- Dữ liệu nhập tay khi test thêm/sửa cơ bản
- Payload đơn giản cho security test như SQL Injection basic và XSS basic

## 8. Tài khoản test

| Vai trò | Tài khoản | Mật khẩu | Ghi chú |
|---|---|---|---|
| Admin | `admin` | `admin123` | Dùng cho module quản trị |
| Faculty | `12345` hoặc `gwilson@sample.com` | `12345` | Dùng cho module giảng viên |
| Student | Sẽ dùng tài khoản có sẵn trong database nếu truy cập được | Theo dữ liệu hệ thống | Chỉ test nếu tài khoản hoạt động |

## 9. Phân công thực hiện

Để phù hợp mục tiêu báo cáo môn học, việc phân công có thể thực hiện tối giản như sau:

| Hạng mục | Người phụ trách |
|---|---|
| Chuẩn bị môi trường, tài khoản | Nhóm kiểm thử |
| Viết test case functional | Nhóm kiểm thử |
| Chạy manual test | Nhóm kiểm thử |
| Chạy security basic | Nhóm kiểm thử |
| Chạy performance basic | Nhóm kiểm thử |
| Chạy automation basic | Nhóm kiểm thử |
| Tổng hợp bug, evidence, báo cáo | Nhóm kiểm thử |

Nếu cần trình bày theo cá nhân, có thể thay cột "Người phụ trách" bằng tên từng thành viên trong nhóm.

## 10. Entry criteria

Hoạt động kiểm thử được bắt đầu khi đáp ứng các điều kiện sau:

- Docker Compose chạy thành công
- Website truy cập được tại `http://localhost:8088`
- Admin và Faculty login hoạt động
- Database và PhpMyAdmin truy cập được
- Có sẵn dữ liệu mẫu cơ bản để thao tác
- File Excel test case đã được chuẩn bị

## 11. Exit criteria

Hoạt động kiểm thử được xem là hoàn thành khi:

- Smoke test đã được chạy xong
- Các test case trong phạm vi tối thiểu đã được thực hiện
- Kết quả Pass/Fail đã được ghi nhận
- Bug hoặc security finding đã được tổng hợp nếu có
- Evidence chính đã được chụp đầy đủ
- Có summary phục vụ phần báo cáo cuối

## 12. Risk

Các rủi ro chính của kế hoạch kiểm thử:

| Rủi ro | Ảnh hưởng | Hướng xử lý |
|---|---|---|
| Một số module local hoạt động không ổn định | Không test được toàn bộ phạm vi | Thu hẹp phạm vi vào các module hoạt động tốt |
| Không có tài khoản Student dùng được ngay | Thiếu test cho vai trò Student | Ưu tiên Admin và Faculty, chỉ test Student nếu khả dụng |
| Dữ liệu mẫu không đầy đủ | Khó test một số luồng | Dùng dữ liệu có sẵn hoặc thêm dữ liệu tối thiểu |
| Thiếu thời gian | Không hoàn thành toàn bộ case | Ưu tiên smoke, functional chính, security/performance/automation tối thiểu |
| Công cụ automation hoặc ZAP/JMeter cấu hình lâu | Chậm tiến độ | Chỉ chạy demo nhỏ, không mở rộng quá sâu |

## 13. Deliverables

Các đầu ra cần bàn giao của quá trình kiểm thử gồm:

- Tài liệu Test Plan
- Danh sách test case
- Bảng kết quả kiểm thử
- Bug report
- Security findings
- Kết quả performance test cơ bản
- Kết quả automation test cơ bản
- Bộ ảnh evidence minh họa
- Phần summary kết quả để đưa vào báo cáo

## 14. Smoke test

Trước khi kiểm thử chi tiết, thực hiện các ca smoke test sau:

1. Mở được website tại `http://localhost:8088`
2. Mở được trang Admin login
3. Đăng nhập Admin thành công với `admin / admin123`
4. Đăng xuất Admin thành công
5. Mở được trang Faculty login
6. Đăng nhập Faculty thành công với `12345 / 12345` hoặc `gwilson@sample.com / 12345`
7. Faculty mở được trang class hoặc lesson
8. Truy cập trực tiếp URL Admin/Faculty/Student sai vai trò bị chặn hoặc redirect đúng

Nếu smoke test phát hiện lỗi nghiêm trọng, nhóm sẽ ưu tiên kiểm thử trên các module còn hoạt động ổn định để đảm bảo hoàn thành báo cáo đúng thời gian.

## 15. Kết luận phạm vi demo

Để phù hợp mục tiêu pass báo cáo, kế hoạch kiểm thử sẽ tập trung vào:

- Chức năng chính của 3 vai trò
- Phân quyền truy cập
- Một số thao tác quản trị cơ bản
- Security test mức cơ bản
- Performance test mức cơ bản
- Automation test mức cơ bản

Phạm vi này đủ ngắn gọn, bám cấu trúc tài liệu mẫu Magento, đồng thời phù hợp với điều kiện thực hiện demo trong thời gian ngắn.
