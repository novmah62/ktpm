# LÝ THUYẾT CÁC LOẠI KIỂM THỬ VÀ CÔNG CỤ - SIMPLE ELEARNING SYSTEM

## 1. Mục đích

Tài liệu này giải thích ngắn gọn các loại kiểm thử đang xuất hiện trong bộ tài liệu của đề tài `Simple eLearning System`, kèm theo công cụ liên quan và cách áp dụng thực tế. Mục tiêu là giúp hiểu đúng trước khi bắt đầu thực nghiệm.

Phạm vi giải thích gồm:

- Smoke Test
- Functional Test
- Security Test
- Performance Test
- Automation Test
- Bug Report
- Test Summary Report

## 2. Tổng quan

Trong đề tài này, kiểm thử không nhằm đạt mức QA chuyên nghiệp như dự án thực tế, mà hướng tới:

- Kiểm tra các chức năng chính có hoạt động hay không
- Ghi nhận một số lỗi tiêu biểu
- Có bằng chứng minh họa
- Có đủ các nhóm kiểm thử cơ bản để hoàn thiện báo cáo

Vì vậy, mỗi loại kiểm thử trong bộ tài liệu đều được chọn theo hướng:

- Dễ làm
- Dễ chụp evidence
- Dễ giải thích khi thuyết trình

## 3. Smoke Test

### 3.1. Smoke Test là gì

Smoke Test là kiểm thử nhanh các chức năng sống còn của hệ thống để xác nhận rằng website còn chạy được trước khi kiểm thử sâu hơn.

Hiểu đơn giản:

- Nếu Smoke Test fail, chưa nên làm các test phức tạp khác
- Nếu Smoke Test pass, có thể tiếp tục kiểm thử chi tiết

### 3.2. Smoke Test dùng để làm gì trong đề tài này

Đối với website eLearning, Smoke Test dùng để kiểm tra nhanh:

- Website có mở được không
- Trang login có mở được không
- Admin có đăng nhập được không
- Faculty có đăng nhập được không
- Có vào được một số trang chính hay không

### 3.3. Công cụ liên quan

- `Google Chrome`
- `Microsoft Edge`

### 3.4. Vì sao dùng công cụ này

- Đây là công cụ đơn giản nhất để mở trực tiếp website
- Dễ thao tác
- Dễ chụp màn hình
- Có trong báo cáo nhóm 7

## 4. Functional Test

### 4.1. Functional Test là gì

Functional Test là kiểm thử chức năng. Mục tiêu là kiểm tra hệ thống có thực hiện đúng nghiệp vụ mong muốn hay không.

Ví dụ:

- Admin đăng nhập thành công
- Admin xem được danh sách Student
- Faculty upload được lesson
- Student tải được tài liệu

### 4.2. Functional Test trong đề tài này gồm gì

Các nhóm chức năng chính:

- Login/Logout
- Admin quản lý Student
- Admin quản lý Faculty
- Course/Subject/Class
- Upload lesson/tài liệu
- Student xem môn học
- Student download tài liệu

### 4.3. Functional Test có positive và negative case là gì

#### Positive case
Là trường hợp nhập đúng, làm đúng và hệ thống phải chạy đúng.

Ví dụ:

- Nhập đúng tài khoản Admin thì login thành công
- Nhập đủ thông tin Student thì lưu thành công

#### Negative case
Là trường hợp nhập sai, thiếu hoặc bất thường để xem hệ thống xử lý như thế nào.

Ví dụ:

- Nhập sai mật khẩu thì không được login
- Bỏ trống trường bắt buộc thì không được lưu

### 4.4. Công cụ liên quan

- `Google Chrome`
- `Microsoft Edge`
- `PhpMyAdmin`
- `Microsoft Excel`

### 4.5. Vai trò của từng công cụ

#### Chrome / Edge
Dùng để thao tác trực tiếp trên giao diện web.

#### PhpMyAdmin
Dùng để kiểm tra dữ liệu có được lưu xuống database hay không sau khi thêm/sửa.

#### Excel
Dùng để ghi test case, actual result, status, bug ID và evidence.

## 5. Security Test

### 5.1. Security Test là gì

Security Test là kiểm thử bảo mật. Mục tiêu là xem hệ thống có điểm yếu cơ bản nào liên quan đến:

- đầu vào dữ liệu
- phân quyền truy cập
- cấu hình phản hồi

Trong đề tài này chỉ làm ở mức cơ bản, không phải pentest chuyên sâu.

### 5.2. Security Test trong đề tài này gồm gì

Các bài test chính:

1. `SQL Injection` ở login form
2. `XSS` ở form nhập liệu
3. `Direct URL Access` khi chưa login hoặc sai vai trò
4. `OWASP ZAP passive scan`

### 5.3. Giải thích từng bài test

#### SQL Injection
Kiểm tra xem người dùng có thể chèn payload SQL vào form login để bypass xác thực hay không.

Ví dụ payload:

- `' OR '1'='1`

Nếu hệ thống an toàn:

- không login được
- không lộ lỗi SQL

#### XSS
Kiểm tra xem hệ thống có cho phép script độc hại chạy trên trình duyệt hay không.

Ví dụ payload:

- `<script>alert(1)</script>`

Nếu hệ thống an toàn:

- không bật popup
- payload không được thực thi

#### Direct URL Access
Kiểm tra người dùng chưa login hoặc sai quyền có thể mở trực tiếp URL nội bộ hay không.

Ví dụ:

- Student cố truy cập trang Admin
- Người chưa login mở trực tiếp URL quản trị

Nếu hệ thống an toàn:

- bị redirect
- hoặc bị chặn truy cập

#### OWASP ZAP
Là công cụ hỗ trợ quét bảo mật cơ bản. Thường dùng để phát hiện:

- thiếu security headers
- cấu hình chưa chặt
- cảnh báo đầu vào hoặc session

### 5.4. Công cụ liên quan

- `Google Chrome`
- `OWASP ZAP`

### 5.5. Vì sao dùng công cụ này

#### Chrome
Dùng để nhập payload thủ công và quan sát kết quả trực tiếp.

#### OWASP ZAP
Là công cụ phổ biến, miễn phí, dễ dùng để quét bảo mật cơ bản và phù hợp với báo cáo sinh viên.

## 6. Performance Test

### 6.1. Performance Test là gì

Performance Test là kiểm thử hiệu năng. Mục tiêu là đánh giá website phản hồi như thế nào khi có nhiều request trong một thời gian ngắn.

Trong đề tài này chỉ test tải nhỏ trên môi trường local.

### 6.2. Kiểm tra những gì

Các chỉ số chính:

- `Requests per second` hoặc `Throughput`
- `Time per request` hoặc `Average response time`
- `Failed requests` hoặc `Error %`

Hiểu đơn giản:

- tốc độ xử lý bao nhiêu request
- mỗi request mất bao lâu
- có request nào lỗi không

### 6.3. Vì sao chỉ test tải nhỏ

Vì mục tiêu của đề tài là demo và báo cáo, không phải kiểm thử production.

Do đó:

- 100-500 request là đủ
- concurrency 10-20 là đủ
- chỉ cần test homepage, admin page, faculty page

### 6.4. Công cụ liên quan

- `Apache JMeter`

### 6.5. Vì sao dùng JMeter

- Có giao diện trực quan
- Dễ chụp ảnh minh chứng
- Là công cụ phổ biến cho kiểm thử hiệu năng
- Trùng với báo cáo nhóm 7

## 7. Automation Test

### 7.1. Automation Test là gì

Automation Test là kiểm thử tự động. Thay vì tester thao tác tay trên trình duyệt, công cụ sẽ tự mở browser và tự chạy các bước đã được viết sẵn.

### 7.2. Automation Test trong đề tài này dùng để làm gì

Vì phạm vi đề tài nhỏ, automation chỉ cần để chứng minh:

- nhóm có áp dụng kiểm thử tự động
- có thể tự động hóa một vài luồng cơ bản

Ví dụ:

- mở homepage
- login Admin
- logout

### 7.3. Công cụ liên quan

- `Selenium`

### 7.4. Vì sao dùng Selenium

- Là công cụ kiểm thử tự động web phổ biến
- Phù hợp với bài toán login, click button, mở trang
- Dễ giải thích trong báo cáo và khi thuyết trình
- Có trong báo cáo nhóm 7

## 8. Bug Report

### 8.1. Bug Report là gì

Bug Report là tài liệu ghi nhận lỗi phát hiện trong quá trình kiểm thử.

Mỗi bug thường gồm:

- mã bug
- test case liên quan
- bước tái hiện
- kết quả mong đợi
- kết quả thực tế
- mức độ nghiêm trọng
- ảnh minh chứng

### 8.2. Tại sao phải có Bug Report

Vì nếu chỉ nói “hệ thống có lỗi” thì không đủ thuyết phục. Bug Report giúp:

- mô tả lỗi rõ ràng
- có bằng chứng
- dễ đưa vào báo cáo
- dễ trình bày khi thuyết trình

### 8.3. Công cụ liên quan

- `Microsoft Excel`
- ảnh evidence trong thư mục `evidence/bugs/`

## 9. Test Summary Report

### 9.1. Test Summary Report là gì

Đây là tài liệu tổng kết cuối cùng của đợt kiểm thử.

Nó thường trả lời các câu hỏi:

- đã test bao nhiêu case
- pass bao nhiêu
- fail bao nhiêu
- có bao nhiêu bug
- chất lượng hệ thống ở mức nào

### 9.2. Vai trò trong báo cáo

Đây là phần rất quan trọng vì nó giúp kết luận cả quá trình kiểm thử.

Giảng viên thường nhìn phần này để đánh giá:

- nhóm có tổng hợp kết quả không
- có nhìn ra vấn đề của hệ thống không
- có đề xuất cải thiện không

### 9.3. Công cụ liên quan

- `Microsoft Excel`
- hoặc file tổng hợp viết tay trong `docs`

## 10. Mối liên hệ giữa các tài liệu

Các tài liệu trong `docs` liên kết với nhau theo thứ tự:

1. `Test Plan`
   - xác định phạm vi, công cụ, môi trường
2. `Test Scenario`
   - xác định các tình huống cần test
3. `Test Case`
   - chi tiết hóa các bước kiểm thử
4. `Bug Report`
   - ghi nhận lỗi phát hiện được
5. `Security / Performance / Automation`
   - mô tả cách thực hiện từng loại kiểm thử
6. `Test Summary Report`
   - tổng kết kết quả cuối cùng

Hiểu đơn giản:

- `Test Plan` trả lời: sẽ test cái gì
- `Test Case` trả lời: test bằng cách nào
- `Bug Report` trả lời: phát hiện lỗi gì
- `Summary` trả lời: kết quả cuối cùng ra sao

## 11. Nên bắt đầu làm thực nghiệm từ đâu

Thứ tự hợp lý nhất là:

1. `Smoke Test`
2. `Functional Test`
3. `Ghi Bug Report`
4. `Security Test`
5. `Performance Test`
6. `Automation Test`
7. `Cập nhật Summary`

Lý do:

- Smoke giúp xác nhận hệ thống còn chạy
- Functional là phần chính, dễ lấy nhiều evidence
- Bug phát hiện trong lúc functional thì ghi luôn
- Security/Performance/Automation chỉ cần làm tối giản sau

## 12. Kết luận

Trong bộ tài liệu này, các loại kiểm thử được chọn theo hướng tối giản nhưng vẫn đủ cấu trúc của một báo cáo kiểm thử website. Nếu nắm được:

- từng loại test là gì
- mục tiêu của từng loại
- công cụ dùng để làm gì

thì việc thực nghiệm sẽ dễ hơn rất nhiều và bạn cũng sẽ tự tin hơn khi thuyết trình.
