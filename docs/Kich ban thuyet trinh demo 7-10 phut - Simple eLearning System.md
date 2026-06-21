# KỊCH BẢN THUYẾT TRÌNH DEMO 7-10 PHÚT - SIMPLE ELEARNING SYSTEM

## 1. Mục tiêu

Kịch bản này dùng để trình bày demo báo cáo kiểm thử website `Simple eLearning System` trong khoảng `7-10 phút`, theo hướng ngắn gọn, dễ nói và đủ nội dung để trả lời giảng viên.

## 2. Chuẩn bị trước khi demo

### Các màn hình/tab nên mở sẵn

1. Website homepage: `http://localhost:8088`
2. Admin login: `http://localhost:8088/admin`
3. File `Test Plan`
4. File `Test Case`
5. File `Bug Report`
6. File `Security Testing` hoặc ảnh `OWASP ZAP`
7. File `Performance Testing` hoặc kết quả `JMeter`
8. Ảnh hoặc kết quả `Selenium`

### Thứ tự tab gợi ý

1. Homepage
2. Admin login
3. Trang Admin sau login
4. File Test Case
5. File Bug Report
6. Security evidence
7. Performance evidence
8. Automation evidence

## 3. Kịch bản lời thoại theo flow demo

## 3.1. Giới thiệu hệ thống eLearning

### Màn hình cần mở

- Homepage hoặc file Test Plan

### Lời thoại gợi ý

"Nhóm em thực hiện kiểm thử cho website `Simple eLearning System`, là một hệ thống học trực tuyến đơn giản viết bằng PHP và MySQL. Hệ thống có các vai trò chính gồm Admin, Faculty và Student. Trong phạm vi môn học, nhóm tập trung kiểm thử các chức năng chính như đăng nhập, quản lý người dùng, quản lý bài giảng và một số kiểm thử cơ bản về bảo mật, hiệu năng và tự động hóa."

## 3.2. Giới thiệu môi trường Docker

### Màn hình cần mở

- Có thể mở terminal với `docker ps` hoặc trình bày từ file Test Plan

### Lời thoại gợi ý

"Hệ thống được dựng local bằng Docker Compose trên Ubuntu. Web sử dụng PHP 7.4 kết hợp Apache, database là MariaDB, và nhóm dùng thêm PhpMyAdmin để kiểm tra dữ liệu. Việc chạy bằng Docker giúp môi trường ổn định, dễ khởi động lại và thuận tiện cho quá trình kiểm thử."

Nếu muốn mở terminal:

```bash
docker ps
```

Nói ngắn:

"Đây là các container đang chạy phục vụ cho website local của nhóm."

## 3.3. Mở homepage

### Màn hình cần mở

- `http://localhost:8088`

### Lời thoại gợi ý

"Đầu tiên, nhóm kiểm tra smoke test cơ bản là website có truy cập được hay không. Đây là homepage của hệ thống eLearning đang chạy local."

## 3.4. Login Admin

### Màn hình cần mở

- `http://localhost:8088/admin`

### Lời thoại gợi ý

"Tiếp theo, em demo luồng đăng nhập Admin, đây là một trong các luồng chức năng chính và cũng là cơ sở để kiểm thử tiếp các module quản trị."

Thực hiện:

- nhập `admin`
- nhập `admin123`
- click `Sign In`

Sau khi login:

"Hệ thống đăng nhập thành công và chuyển vào trang quản trị."

## 3.5. Thực hiện một testcase chức năng

### Màn hình cần mở

- Trang Admin, ví dụ danh sách Student hoặc Faculty

### Lời thoại gợi ý

"Ví dụ với kiểm thử chức năng, nhóm chọn một test case cơ bản là Admin xem danh sách Student hoặc Faculty. Mục tiêu là kiểm tra hệ thống tải được danh sách dữ liệu, không lỗi giao diện và hiển thị đúng thông tin cần thiết."

Thao tác:

- vào danh sách Student hoặc Faculty

Nói:

"Ở đây nhóm xác nhận được chức năng hoạt động, từ đó đánh dấu Pass cho test case tương ứng."

## 3.6. Mở bảng Test Case

### Màn hình cần mở

- File `Test Case - Simple eLearning System.md`

### Lời thoại gợi ý

"Đây là bảng test case mà nhóm xây dựng theo format tương tự tài liệu mẫu Magento. Nhóm giữ phạm vi ở mức vừa đủ cho demo báo cáo, gồm tổng cộng 30 test case, bao phủ smoke test, login, quản lý Student, Faculty, upload/download, security, performance và automation."

Có thể chỉ nhanh vào:

- `Test Case ID`
- `Module`
- `Expected Result`
- `Status`

## 3.7. Trình bày một Bug Report

### Màn hình cần mở

- File `Bug Report - Simple eLearning System.md`

### Lời thoại gợi ý

"Trong quá trình kiểm thử, nhóm ghi nhận một số lỗi và đưa vào bug report. Ví dụ ở đây là lỗi liên quan validate form hoặc rủi ro truy cập trực tiếp URL khi chưa đăng nhập. Nhóm mô tả bug theo các trường như mức độ nghiêm trọng, bước tái hiện, kết quả mong đợi, kết quả thực tế và bằng chứng minh họa."

Nếu cần chọn 1 bug để nói:

"Ví dụ bug này cho thấy hệ thống chưa kiểm tra đầy đủ quyền truy cập hoặc chưa validate chặt dữ liệu đầu vào. Đây là loại lỗi mức cơ bản nhưng cần được cải thiện để tăng độ ổn định của hệ thống."

## 3.8. Demo Security payload hoặc kết quả OWASP ZAP

### Màn hình cần mở

- Trang login Admin hoặc Faculty
- hoặc ảnh / file Security Testing
- hoặc ảnh OWASP ZAP

### Lời thoại gợi ý

"Về phần security testing, nhóm chỉ thực hiện ở mức cơ bản để phù hợp phạm vi môn học. Ví dụ ở đây là kiểm tra SQL Injection basic tại form login bằng payload đơn giản như `' OR '1'='1`."

Nếu demo trực tiếp:

- nhập payload vào login
- submit

Nói:

"Mục tiêu của bài test này là kiểm tra xem hệ thống có bị bypass đăng nhập hoặc lộ lỗi SQL ra giao diện hay không."

Nếu dùng OWASP ZAP:

"Ngoài ra nhóm có dùng OWASP ZAP để quét cơ bản và ghi nhận một số cảnh báo mức cơ bản như thiếu security headers hoặc cấu hình chưa chặt."

## 3.9. Demo Performance bằng JMeter result

### Màn hình cần mở

- Ảnh `JMeter Summary Report`
- hoặc bảng kết quả JMeter

### Lời thoại gợi ý

"Về kiểm thử hiệu năng, nhóm thực hiện ở mức tối giản trên môi trường local với tải nhỏ. Công cụ sử dụng là Apache JMeter. Các chỉ số chính nhóm lấy gồm số request trên giây, thời gian phản hồi trung bình và số request lỗi."

Nếu mở ảnh JMeter:

"Kết quả cho thấy website phản hồi ở mức chấp nhận được đối với mục tiêu demo môn học, chưa ghi nhận lỗi nghiêm trọng trong bài test tải nhỏ."

## 3.10. Demo Automation bằng Selenium result

### Màn hình cần mở

- terminal chạy Selenium test
- screenshot kết quả chạy test
- hoặc ảnh kết quả automation

### Lời thoại gợi ý

"Về automation testing, nhóm dùng Selenium để tự động hóa một số smoke test cơ bản như mở homepage, đăng nhập Admin và logout nếu thao tác ổn định. Việc dùng automation trong báo cáo giúp nhóm chứng minh có áp dụng kiểm thử tự động, dù phạm vi còn đơn giản."

Nếu mở report:

"Đây là kết quả chạy test tự động của nhóm. Các case cơ bản chạy được trên môi trường local."

## 3.11. Kết luận

### Màn hình cần mở

- File `Test Summary Report`

### Lời thoại gợi ý

"Tổng kết lại, nhóm đã xây dựng test plan, test case, bug report và thực hiện kiểm thử ở 4 hướng chính là functional, security, performance và automation. Kết quả cho thấy hệ thống đáp ứng được phần lớn chức năng cơ bản, tuy nhiên vẫn còn một số lỗi và điểm cần cải thiện về validate, phân quyền và bảo mật cơ bản."

"Trong phạm vi môn học, nhóm đánh giá hệ thống đạt mức đủ để demo và báo cáo, đồng thời nhóm cũng đề xuất các hướng cải thiện cho các phiên bản sau."

## 4. Câu trả lời khi giảng viên hỏi

## 4.1. Câu hỏi: "Cơ sở nào sinh testcase?"

### Trả lời ngắn gọn

"Nhóm sinh test case dựa trên 3 cơ sở chính: thứ nhất là các chức năng thực tế của hệ thống eLearning như login, quản lý Student, Faculty, lesson; thứ hai là luồng sử dụng của từng vai trò Admin, Faculty, Student; và thứ ba là tham khảo cấu trúc tài liệu mẫu Magento để tổ chức test case theo hướng đầy đủ nhưng gọn cho báo cáo."

### Trả lời dài hơn nếu cần

"Ngoài ra nhóm còn dựa vào giao diện thực tế, các form nhập liệu, yêu cầu chức năng cơ bản và các rủi ro thường gặp của web PHP/MySQL cũ như lỗi validate, phân quyền, upload file và xử lý input. Vì mục tiêu là demo báo cáo nên nhóm ưu tiên các test case có tính đại diện thay vì cố phủ quá rộng."

## 4.2. Câu hỏi: "Vì sao chọn công cụ này?"

### Với OWASP ZAP

"Nhóm chọn OWASP ZAP vì đây là công cụ phổ biến, miễn phí, phù hợp cho kiểm thử bảo mật cơ bản và đủ để quét nhanh các vấn đề như header, access control hoặc input ở mức demo."

### Với JMeter

"Nhóm chọn JMeter vì đây là công cụ phổ biến để kiểm thử hiệu năng, có giao diện trực quan và dễ chụp bằng chứng cho báo cáo."

### Với Selenium

"Nhóm chọn Selenium vì đây là công cụ kiểm thử tự động phổ biến, phù hợp với kiểm thử giao diện web và cũng là công cụ quen thuộc, dễ trình bày trong báo cáo môn học."

## 5. Mẹo trình bày để không bị rối

1. Không vừa nói vừa tìm file quá lâu, nên mở sẵn tab
2. Chỉ demo 1 testcase chức năng tiêu biểu, không thao tác quá nhiều
3. Security, Performance, Automation nên ưu tiên mở kết quả/evidence thay vì chạy live toàn bộ
4. Nếu live demo lỗi, chuyển ngay sang file test case, bug report hoặc screenshot evidence
5. Phần trả lời giảng viên nên ngắn, rõ và bám đúng phạm vi môn học

## 6. Kết thúc ngắn gọn

Câu chốt gợi ý:

"Phần trình bày của nhóm đến đây là hết. Nhóm đã tập trung xây dựng quy trình kiểm thử tối giản nhưng đầy đủ các phần chính để phù hợp với mục tiêu báo cáo môn học. Nhóm xin cảm ơn cô và các bạn đã lắng nghe."
