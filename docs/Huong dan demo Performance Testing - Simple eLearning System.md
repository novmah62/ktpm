# HƯỚNG DẪN DEMO PERFORMANCE TESTING - SIMPLE ELEARNING SYSTEM

## 1. Mục tiêu

Tài liệu này hướng dẫn kiểm thử hiệu năng ở mức tối giản cho website `Simple eLearning System` chạy local tại:

- `http://localhost:8088`

Mục tiêu là lấy số liệu và bằng chứng để đưa vào báo cáo môn học, không nhằm benchmark production. Tài liệu hướng dẫn theo 2 cách:

1. Cách nhanh bằng `Apache Benchmark (ab)` để tham khảo thêm
2. Cách trình bày chính bằng `Apache JMeter`

Phạm vi chỉ kiểm tra tải nhỏ trên các trang:

- Homepage: `http://localhost:8088`
- Admin login page: `http://localhost:8088/admin`
- Faculty page/login: `http://localhost:8088/faculty`

Lưu ý: trong bộ công cụ chính của báo cáo nhóm 7, công cụ hiệu năng được chốt là `Apache JMeter`. Phần `ab` trong tài liệu này chỉ là cách tham khảo thêm để lấy số liệu nhanh.

## 2. Chỉ số cần lấy cho báo cáo

Khi chạy test, chỉ cần lấy 3 chỉ số chính:

- `Requests per second`
- `Time per request`
- `Failed requests`

Nếu có thêm:

- `Complete requests`
- `Concurrency Level`

thì cũng có thể đưa vào bảng kết quả.

## 2.1. Thư mục lưu evidence

Nên tạo thư mục:

```text
evidence/
  performance/
```

Tạo nhanh bằng lệnh:

```bash
mkdir -p evidence/performance
```

Tên file gợi ý:

- `PERF_JMETER_CONFIG_001.png`
- `PERF_JMETER_SUMMARY_001.png`
- `PERF_JMETER_AGG_001.png`
- `PERF_RESULT_TABLE_001.png`

Đường dẫn sử dụng trong báo cáo:

- `evidence/performance/PERF_JMETER_SUMMARY_001.png`

## 2.2. Cách chụp evidence

Nên chụp theo nguyên tắc:

1. Ảnh cấu hình test:
   - số thread
   - ramp-up
   - loop count
   - URL đang test
2. Ảnh kết quả:
   - `Summary Report` hoặc `Aggregate Report`
   - nhìn rõ `# Samples`, `Average`, `Error %`, `Throughput`
3. Nếu dùng terminal hoặc file text, ảnh phải nhìn rõ các dòng:
   - `Requests/sec`
   - `Time per request`
   - `Failed requests`

Không cần chụp toàn bộ quá trình. Chỉ cần:

- 1 ảnh cấu hình
- 1 ảnh kết quả chính
- 1 ảnh bảng tổng hợp nếu có

## 3. Cách 1: Test nhanh bằng Apache Benchmark

## 3.1. Mục đích

`Apache Benchmark (ab)` phù hợp khi cần chạy nhanh vài lệnh và lấy số liệu cơ bản để đưa vào báo cáo.

## 3.2. Kiểm tra có sẵn `ab` trên máy hay chưa

Chạy:

```bash
ab -V
```

Nếu hiện version thì dùng trực tiếp được.

## 3.3. Nếu chưa có `ab`

### Cách cài trên Ubuntu

```bash
sudo apt update
sudo apt install apache2-utils
```

Gói `apache2-utils` sẽ có lệnh `ab`.

### Cách dùng Docker nếu không muốn cài local

Có thể chạy tạm container Ubuntu hoặc image có `ab`, nhưng cách local thường nhanh hơn cho bài demo. Nếu cần Docker, có thể dùng:

```bash
docker run --rm --network host jordi/ab -n 100 -c 10 http://localhost:8088/
```

Nếu image trên máy không có sẵn, ưu tiên cài local để đỡ mất thời gian.

## 3.4. Kịch bản test đề xuất

Chỉ cần chạy 3 bài test:

1. Homepage
2. Admin login page
3. Faculty login page

Mức tải nhỏ:

- `100` requests, concurrency `10`
- hoặc `200` requests, concurrency `20`

Không cần vượt quá mức này cho báo cáo demo.

## 3.5. Lệnh cụ thể

### Test homepage

```bash
ab -n 100 -c 10 http://localhost:8088/
```

Hoặc mức cao hơn một chút:

```bash
ab -n 200 -c 20 http://localhost:8088/
```

### Test admin login page

```bash
ab -n 100 -c 10 http://localhost:8088/admin/
```

### Test faculty login page

```bash
ab -n 100 -c 10 http://localhost:8088/faculty/
```

## 3.6. Các dòng cần lấy từ kết quả `ab`

Sau khi chạy, tập trung lấy các dòng sau:

```text
Concurrency Level:
Complete requests:
Failed requests:
Requests per second:
Time per request:
```

Ví dụ cách đọc:

- `Failed requests: 0` là tốt
- `Requests per second` càng cao càng tốt trong cùng môi trường
- `Time per request` càng thấp càng tốt

## 3.7. Cách lưu bằng chứng

### Cách 1: Chụp ảnh terminal

Chạy lệnh rồi chụp ảnh màn hình terminal.

Tên file gợi ý:

- `evidence/performance/PERF_AB_HOME_001.png`
- `evidence/performance/PERF_AB_ADMIN_001.png`
- `evidence/performance/PERF_AB_FACULTY_001.png`

### Cách 2: Lưu output ra file text

```bash
ab -n 100 -c 10 http://localhost:8088/ > perf_home_ab.txt
ab -n 100 -c 10 http://localhost:8088/admin/ > perf_admin_ab.txt
ab -n 100 -c 10 http://localhost:8088/faculty/ > perf_faculty_ab.txt
```

Sau đó:

- chụp terminal
- hoặc mở file text để copy số liệu vào báo cáo

## 4. Cách 2: Test đẹp hơn bằng Apache JMeter

## 4.1. Mục đích

JMeter phù hợp khi cần ảnh minh chứng đẹp hơn, dễ đưa vào báo cáo hơn, nhất là ảnh:

- Summary Report
- View Results in Table
- Aggregate Report

## 4.2. Chuẩn bị JMeter

### Nếu cài local

Tải và cài `Apache JMeter`, sau đó chạy:

```bash
jmeter
```

### Nếu dùng Docker

Có thể dùng container JMeter nếu đã có sẵn. Tuy nhiên, với bài demo, chạy local GUI sẽ tiện chụp evidence hơn.

Nếu cần chạy command line bằng Docker:

```bash
docker run --rm --network host -v "$PWD:/test" justb4/jmeter -n -t /test/perf.jmx -l /test/result.jtl
```

Cách này chỉ phù hợp khi bạn đã có file `.jmx`. Để demo nhanh, nên dùng GUI local.

## 4.3. Kịch bản JMeter tối giản

Tạo `1 Test Plan` với `3 HTTP Request`:

1. Homepage
2. Admin page
3. Faculty page

Thiết lập chung:

- Number of Threads (users): `10`
- Ramp-Up Period: `5`
- Loop Count: `10`

Như vậy tổng số request gần mức demo nhỏ. Nếu muốn gần `100-500 requests`, có thể:

- 10 users x 10 loop = 100 requests cho mỗi request sampler

Hoặc:

- 20 users x 10 loop = 200 requests

## 4.4. Các bước cấu hình JMeter

1. Mở `JMeter`.
2. Tạo `Test Plan`.
3. Thêm `Thread Group`.
4. Trong `Thread Group`, nhập:
   - Number of Threads: `10`
   - Ramp-Up Period: `5`
   - Loop Count: `10`
5. Thêm `HTTP Request Defaults` nếu muốn:
   - Server Name: `localhost`
   - Port: `8088`
   - Protocol: `http`
6. Thêm 3 `HTTP Request`:
   - Request 1: Path `/`
   - Request 2: Path `/admin/`
   - Request 3: Path `/faculty/`
7. Thêm Listener:
   - `Summary Report`
   - `View Results in Table`
   - hoặc `Aggregate Report`
8. Click `Start`.
9. Chờ chạy xong rồi chụp màn hình kết quả.

## 4.5. Chỉ số cần lấy từ JMeter

Trong `Summary Report` hoặc `Aggregate Report`, lấy:

- `# Samples`
- `Average`
- `Error %`
- `Throughput`

Khi đưa vào báo cáo, có thể quy đổi:

- `Throughput` gần tương đương tốc độ xử lý
- `Error % = 0%` là tốt
- `Average` là thời gian phản hồi trung bình

Nếu muốn bám sát cách viết thống nhất với `ab`, bạn có thể trình bày:

- `Requests/sec`: lấy từ `Throughput`
- `Time per request`: lấy từ `Average`
- `Failed requests`: suy ra từ `Error %` hoặc số lỗi trong bảng

## 4.6. Cách chụp evidence với JMeter

Chụp các màn hình sau:

1. `Thread Group` cấu hình số user và loop
2. `HTTP Request` cho homepage/admin/faculty
3. `Summary Report` hoặc `Aggregate Report`

Tên file gợi ý:

- `evidence/performance/PERF_JMETER_CONFIG_001.png`
- `evidence/performance/PERF_JMETER_SUMMARY_001.png`
- `evidence/performance/PERF_JMETER_AGG_001.png`

## 5. Kết quả mẫu để điền vào báo cáo

Bạn có thể tạo bảng kết quả theo mẫu sau.

| Test ID | Tool | Target URL | Total Requests | Concurrency | Requests/sec | Time per request | Failed requests | Kết luận |
|---|---|---|---|---|---|---|---|---|
| PERF_001 | Apache Benchmark | `http://localhost:8088/` | 100 | 10 | Điền sau khi chạy | Điền sau khi chạy | Điền sau khi chạy | Ổn định / Cần xem xét |
| PERF_002 | Apache Benchmark | `http://localhost:8088/admin/` | 100 | 10 | Điền sau khi chạy | Điền sau khi chạy | Điền sau khi chạy | Ổn định / Cần xem xét |
| PERF_003 | Apache Benchmark | `http://localhost:8088/faculty/` | 100 | 10 | Điền sau khi chạy | Điền sau khi chạy | Điền sau khi chạy | Ổn định / Cần xem xét |
| PERF_004 | JMeter | `http://localhost:8088/` | 100 | 10 | Điền sau khi chạy | Điền sau khi chạy | Điền sau khi chạy | Ổn định / Cần xem xét |
| PERF_005 | JMeter | `http://localhost:8088/admin/` | 100 | 10 | Điền sau khi chạy | Điền sau khi chạy | Điền sau khi chạy | Ổn định / Cần xem xét |
| PERF_006 | JMeter | `http://localhost:8088/faculty/` | 100 | 10 | Điền sau khi chạy | Điền sau khi chạy | Điền sau khi chạy | Ổn định / Cần xem xét |

## 6. Mẫu nhận xét ngắn cho báo cáo

Bạn có thể dùng câu ngắn như sau:

- `Kiểm thử hiệu năng cơ bản được thực hiện trên môi trường local với tải nhỏ nhằm đánh giá khả năng phản hồi của hệ thống.`
- `Kết quả cho thấy các trang chính như homepage, admin login và faculty page đều phản hồi ổn định ở mức tải 100 requests với concurrency 10.`
- `Không ghi nhận lỗi nghiêm trọng trong quá trình test, số failed requests ở mức chấp nhận được hoặc bằng 0.`

Nếu kết quả chưa đẹp:

- `Trong một số lần chạy, thời gian phản hồi của trang nội bộ cao hơn trang chủ, tuy nhiên hệ thống vẫn đáp ứng được mục tiêu demo môn học.`

## 7. Gợi ý chọn cách nào để demo

Nếu cần nhanh:

- Chạy `Apache Benchmark`
- Chụp 3 ảnh terminal
- Điền bảng kết quả

Nếu cần đẹp hơn:

- Dùng `JMeter`
- Chụp `Summary Report`
- Gắn ảnh vào báo cáo

Phương án thực tế cho bài này:

1. Dùng `ab` để lấy số liệu nhanh
2. Dùng `JMeter` để có ảnh minh chứng đẹp

Như vậy là đủ cho phần `Performance Testing` trong báo cáo mà không cần làm quá sâu.
