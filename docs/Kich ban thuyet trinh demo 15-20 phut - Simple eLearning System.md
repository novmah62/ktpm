# KỊCH BẢN THUYẾT TRÌNH DEMO 15-20 PHÚT - SIMPLE ELEARNING SYSTEM

## 1. Mục tiêu

Kịch bản này dùng để trình bày demo báo cáo kiểm thử website `Simple eLearning System` trong khoảng `15-20 phút`, theo hướng rõ ràng, đủ chiều sâu và vẫn thuận tiện để trả lời giảng viên.

## 2. Chuẩn bị trước khi demo

### Các màn hình/tab nên mở sẵn

1. Website homepage: `http://localhost:8088`
2. Admin login: `http://localhost:8088/admin`
3. File `Test Plan`
4. File `Test Case`
5. File `Bug Report`
6. File `Security Testing` hoặc ảnh `OWASP ZAP`
7. File `Performance Testing` hoặc kết quả `JMeter`
8. Ảnh hoặc kết quả `Playwright`

### Dữ liệu và công cụ nên kiểm tra trước

1. `docker compose up -d` đã chạy thành công
2. Website truy cập được tại `http://localhost:8088`
3. Admin login dùng được với `admin / admin123`
4. Ảnh evidence trong `evidence/` mở được rõ ràng
5. Nếu demo automation live thì kiểm tra trước lệnh `npx playwright test`

### Thứ tự tab gợi ý

1. Homepage
2. Admin login
3. Trang Admin sau login
4. File Test Case
5. File Bug Report
6. Security evidence
7. Performance evidence
8. Automation evidence

## 2.1. Phân bổ thời gian gợi ý

1. Giới thiệu đề tài và phạm vi: `2 phút`
2. Môi trường kiểm thử và cách dựng hệ thống: `2 phút`
3. Demo homepage và login Admin: `2 phút`
4. Demo một testcase chức năng tiêu biểu: `2 phút`
5. Trình bày Test Scenario và Test Case: `3 phút`
6. Trình bày Bug Report và giải thích lỗi tiêu biểu: `2 phút`
7. Trình bày Security testing: `2 phút`
8. Trình bày Performance testing: `2 phút`
9. Trình bày Automation testing: `2 phút`
10. Kết luận và trả lời câu hỏi: `1-3 phút`

## 3. Kịch bản lời thoại theo flow demo

## 3.1. Giới thiệu hệ thống eLearning

### Màn hình cần mở

- Homepage hoặc file Test Plan

### Lời thoại gợi ý

"Nhóm em thực hiện kiểm thử cho website `Simple eLearning System`, là một hệ thống học trực tuyến đơn giản viết bằng PHP và MySQL. Hệ thống có các vai trò chính gồm Admin, Faculty và Student. Trong phạm vi môn học, nhóm tập trung kiểm thử các chức năng chính như đăng nhập, quản lý người dùng, quản lý bài giảng và một số kiểm thử cơ bản về bảo mật, hiệu năng và tự động hóa."

Nói thêm nếu muốn kéo dài phần mở đầu:

"Mục tiêu của nhóm không phải đánh giá hệ thống ở mức production, mà là xây dựng được một quy trình kiểm thử tương đối đầy đủ trên môi trường local. Vì vậy nhóm ưu tiên các luồng có tính đại diện, dễ tái hiện và có đủ bằng chứng minh họa."

"Bài làm của nhóm thiên về kiểm thử hộp đen, tức là kiểm tra đầu vào và đầu ra của hệ thống, kết hợp quan sát giao diện, phản hồi và dữ liệu hiển thị để đánh giá chất lượng."

## 3.2. Giới thiệu môi trường Docker

### Màn hình cần mở

- Có thể mở terminal với `docker ps` hoặc trình bày từ file Test Plan

### Lời thoại gợi ý

"Hệ thống được dựng local bằng Docker Compose trên Ubuntu. Web sử dụng PHP 7.4 kết hợp Apache, database là MariaDB, và nhóm dùng thêm PhpMyAdmin để kiểm tra dữ liệu. Việc chạy bằng Docker giúp môi trường ổn định, dễ khởi động lại và thuận tiện cho quá trình kiểm thử."

Có thể nói thêm:

"Với cách triển khai này, nhóm hạn chế được việc lệch môi trường giữa các thành viên. Khi cần reset hoặc chạy lại demo, chỉ cần dựng lại container thay vì cài thủ công từng thành phần."

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

Nói thêm:

"Ở bước smoke test, mục tiêu là xác nhận các luồng sống còn của hệ thống vẫn hoạt động trước khi đi vào test chi tiết hơn. Nếu ngay từ bước này website không truy cập được thì các bài test phía sau sẽ không còn ý nghĩa."

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

Nói thêm:

"Sau khi đăng nhập thành công, nhóm có thể tiếp tục kiểm thử các module như Student, Faculty, Course, Subject, Class hoặc các chức năng quản lý dữ liệu khác."

## 3.5. Thực hiện một testcase chức năng

### Màn hình cần mở

- Trang Admin, ví dụ danh sách Student hoặc Faculty

### Lời thoại gợi ý

"Ví dụ với kiểm thử chức năng, nhóm chọn một test case cơ bản là Admin xem danh sách Student hoặc Faculty. Mục tiêu là kiểm tra hệ thống tải được danh sách dữ liệu, không lỗi giao diện và hiển thị đúng thông tin cần thiết."

Thao tác:

- vào danh sách Student hoặc Faculty

Nói:

"Ở đây nhóm xác nhận được chức năng hoạt động, từ đó đánh dấu Pass cho test case tương ứng."

Nếu muốn nói kỹ hơn:

"Với test case chức năng, ngoài việc kiểm tra trang có mở được hay không, nhóm còn quan sát xem bảng dữ liệu có bị vỡ layout, có cột bị thiếu hoặc có lỗi PHP hiển thị ra giao diện hay không."

## 3.6. Mở bảng Test Scenario

### Màn hình cần mở

- File `Test Scenario - Simple eLearning System.md`

### Lời thoại gợi ý

"Trước khi viết test case chi tiết, nhóm xây dựng test scenario để xác định các luồng kiểm thử chính của hệ thống. Scenario giúp nhóm bao quát phạm vi trước, sau đó mới tách thành từng test case cụ thể."

"Ví dụ ở đây có các nhóm scenario như smoke test, login/logout, quản lý Student, quản lý Faculty, upload/download, security basic, performance basic và automation smoke test."

"Cách làm này giúp nhóm tránh viết test case rời rạc và bảo đảm mỗi nhóm chức năng đều có ít nhất một scenario đại diện."

## 3.7. Mở bảng Test Case

### Màn hình cần mở

- File `Test Case - Simple eLearning System.md`

### Lời thoại gợi ý

"Đây là bảng test case mà nhóm xây dựng để cụ thể hóa các scenario ở trên. Tổng cộng nhóm có `30` test case, bao phủ smoke test, login, quản lý Student, Faculty, upload/download, security, performance và automation."

"Trong từng test case, nhóm mô tả pre-condition, test data, test steps, expected result, actual result, status, bug liên quan và evidence. Với cách trình bày này, người xem có thể theo dõi lại quá trình kiểm thử tương đối rõ ràng."

Có thể chỉ nhanh vào:

- `Test Case ID`
- `Module`
- `Test Steps`
- `Expected Result`
- `Status`

Nếu giảng viên hỏi vì sao có 30 test case:

"Nhóm ưu tiên số lượng vừa phải nhưng có tính đại diện, thay vì mở rộng quá nhiều case nhưng không có thời gian chạy và thu thập evidence đầy đủ."

## 3.8. Trình bày một Bug Report

### Màn hình cần mở

- File `Bug Report - Simple eLearning System.md`

### Lời thoại gợi ý

"Trong quá trình kiểm thử, nhóm ghi nhận các lỗi hoặc rủi ro và đưa vào bug report. Ví dụ ở đây là lỗi liên quan validate form, upload file hoặc rủi ro truy cập trực tiếp URL khi chưa đăng nhập. Nhóm mô tả bug theo các trường như mức độ nghiêm trọng, bước tái hiện, kết quả mong đợi, kết quả thực tế và bằng chứng minh họa."

Nếu cần chọn 1 bug để nói:

"Ví dụ bug này cho thấy hệ thống chưa kiểm tra đầy đủ quyền truy cập hoặc chưa validate chặt dữ liệu đầu vào. Đây là loại lỗi mức cơ bản nhưng cần được cải thiện vì nó ảnh hưởng trực tiếp đến độ ổn định và độ an toàn của hệ thống."

Nếu chọn `BUG_004`:

"Bug này liên quan đến access control. Nếu người dùng chưa đăng nhập hoặc đăng nhập sai vai trò mà vẫn truy cập được URL nội bộ, thì đây là rủi ro bảo mật rõ ràng vì hệ thống chưa chặn truy cập đúng cách."

## 3.9. Demo Security payload hoặc kết quả OWASP ZAP

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

Nên nói thêm để tránh bị hỏi quá sâu:

"Nhóm không trình bày security theo hướng pentest chuyên sâu, mà chỉ dừng ở mức xác định các rủi ro phổ biến trên một ứng dụng web PHP/MySQL cũ, như SQL Injection basic, XSS basic và kiểm tra phân quyền truy cập."

## 3.10. Demo Performance bằng JMeter result

### Màn hình cần mở

- Ảnh `JMeter Summary Report`
- hoặc bảng kết quả JMeter

### Lời thoại gợi ý

"Về kiểm thử hiệu năng, nhóm thực hiện ở mức tối giản trên môi trường local với tải nhỏ. Công cụ sử dụng là Apache JMeter. Các chỉ số chính nhóm lấy gồm số request trên giây, thời gian phản hồi trung bình và số request lỗi."

Nếu mở ảnh JMeter:

"Kết quả cho thấy website phản hồi ở mức chấp nhận được đối với mục tiêu demo môn học, chưa ghi nhận lỗi nghiêm trọng trong bài test tải nhỏ."

Nói thêm:

"Do hệ thống chạy local và mục tiêu là báo cáo môn học, nhóm không đặt nặng việc benchmark tuyệt đối. Nhóm chủ yếu dùng JMeter để kiểm tra xem với tải nhỏ hệ thống có phản hồi ổn định hay không."

"Ba chỉ số nhóm ưu tiên đọc là throughput hoặc requests per second, thời gian phản hồi trung bình và số lượng request lỗi."

## 3.11. Demo Automation bằng Playwright result

### Màn hình cần mở

- terminal chạy Playwright test
- screenshot kết quả chạy test
- hoặc ảnh kết quả automation

### Lời thoại gợi ý

"Về automation testing, nhóm dùng Playwright để tự động hóa một số smoke test cơ bản như mở homepage, đăng nhập Admin và logout nếu thao tác ổn định. Việc dùng automation trong báo cáo giúp nhóm chứng minh có áp dụng kiểm thử tự động, dù phạm vi còn đơn giản."

Nếu mở report:

"Đây là kết quả chạy test tự động của nhóm. Các case cơ bản chạy được trên môi trường local."

Nói thêm:

"Nhóm chọn automation ở mức smoke test vì đây là các luồng quan trọng, dễ quan sát và phù hợp để chứng minh tính lặp lại của kiểm thử. Nếu có thêm thời gian, nhóm có thể mở rộng sang các luồng quản lý dữ liệu hoặc negative case."

## 3.12. Mở Test Summary Report và kết luận

### Màn hình cần mở

- File `Test Summary Report`

### Lời thoại gợi ý

"Tổng kết lại, nhóm đã xây dựng test plan, test scenario, test case, bug report và thực hiện kiểm thử ở 4 hướng chính là functional, security, performance và automation."

"Về kết quả, nhóm có tổng cộng `30` test case, trong đó `24` pass, `4` fail và `2` blocked. Như vậy tỷ lệ pass đạt khoảng `80%`, cho thấy phần lớn chức năng cơ bản của hệ thống vẫn hoạt động được trên môi trường local."

"Tuy nhiên, hệ thống vẫn còn một số điểm cần cải thiện, tập trung vào validate dữ liệu đầu vào, kiểm soát truy cập, upload file và một số cấu hình bảo mật cơ bản."

"Trong phạm vi môn học, nhóm đánh giá hệ thống đạt mức đủ để demo và báo cáo, đồng thời nhóm cũng đề xuất các hướng cải thiện cho các phiên bản sau."

## 4. Câu trả lời khi giảng viên hỏi

## 4.1. Câu hỏi: "Cơ sở nào sinh testcase?"

### Trả lời ngắn gọn

"Nhóm sinh test case dựa trên 3 cơ sở chính: thứ nhất là các chức năng thực tế của hệ thống eLearning như login, quản lý Student, Faculty, lesson; thứ hai là luồng sử dụng của từng vai trò Admin, Faculty, Student; và thứ ba là tổ chức test case theo mẫu tài liệu kiểm thử chuẩn, đủ rõ nhưng vẫn gọn cho báo cáo."

### Trả lời dài hơn nếu cần

"Ngoài ra nhóm còn dựa vào giao diện thực tế, các form nhập liệu, yêu cầu chức năng cơ bản và các rủi ro thường gặp của web PHP/MySQL cũ như lỗi validate, phân quyền, upload file và xử lý input. Vì mục tiêu là demo báo cáo nên nhóm ưu tiên các test case có tính đại diện thay vì cố phủ quá rộng."

## 4.2. Câu hỏi: "Bài của nhóm là hộp đen hay hộp trắng?"

### Trả lời ngắn gọn

"Bài của nhóm chủ yếu là kiểm thử hộp đen, vì nhóm kiểm tra hệ thống thông qua đầu vào, đầu ra và hành vi thực tế trên giao diện."

### Trả lời dài hơn nếu cần

"Nhóm có tham khảo thêm source code, URL và cấu trúc form để hiểu hệ thống và setup test, nhưng phần thực thi kiểm thử vẫn tập trung vào functional test, security basic, performance basic và automation UI. Vì vậy bài làm nghiêng rõ ràng về hộp đen hơn là hộp trắng."

## 4.3. Câu hỏi: "Vì sao chọn công cụ này?"

### Với OWASP ZAP

"Nhóm chọn OWASP ZAP vì đây là công cụ phổ biến, miễn phí, phù hợp cho kiểm thử bảo mật cơ bản và đủ để quét nhanh các vấn đề như header, access control hoặc input ở mức demo."

### Với JMeter

"Nhóm chọn JMeter vì đây là công cụ phổ biến để kiểm thử hiệu năng, có giao diện trực quan và dễ chụp bằng chứng cho báo cáo."

### Với Playwright

"Nhóm chọn Playwright vì đây là công cụ kiểm thử tự động hiện đại, phù hợp với kiểm thử giao diện web, chạy ổn định trên môi trường local và dễ trình bày kết quả trong báo cáo môn học."

## 4.4. Câu hỏi: "Nếu có thêm thời gian thì nhóm sẽ cải thiện gì?"

### Trả lời gợi ý

"Nếu có thêm thời gian, nhóm sẽ mở rộng thêm negative test, kiểm thử sâu hơn với upload file, chuẩn hóa lại bug report và tăng số lượng automation test cho các luồng quan trọng như thêm Student, thêm Faculty hoặc kiểm tra phân quyền."

"Ngoài ra nhóm cũng muốn bổ sung thêm security headers, cải thiện validation và xử lý lỗi để hệ thống ổn định hơn."

## 5. Mẹo trình bày để không bị rối

1. Không vừa nói vừa tìm file quá lâu, nên mở sẵn tab
2. Chỉ demo 1 testcase chức năng tiêu biểu, sau đó chuyển sang tài liệu để giữ nhịp trình bày
3. Security, Performance, Automation nên ưu tiên mở kết quả hoặc evidence thay vì chạy live toàn bộ
4. Nếu live demo lỗi, chuyển ngay sang file test case, bug report hoặc screenshot evidence
5. Khi chuyển tab, nên nói một câu chuyển ý ngắn để người nghe không bị đứt mạch
6. Phần trả lời giảng viên nên ngắn, rõ và bám đúng phạm vi môn học

## 6. Kết thúc ngắn gọn

Câu chốt gợi ý:

"Phần trình bày của nhóm đến đây là hết. Nhóm đã tập trung xây dựng quy trình kiểm thử tối giản nhưng đầy đủ các phần chính để phù hợp với mục tiêu báo cáo môn học. Nhóm xin cảm ơn cô và các bạn đã lắng nghe."
