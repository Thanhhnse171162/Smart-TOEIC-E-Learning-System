# Smart TOEIC E-Learning System

## 🚀 Giới thiệu
Smart TOEIC E-Learning System là một nền tảng học và thi TOEIC trực tuyến thông minh, ứng dụng AI để cá nhân hóa lộ trình học tập. Hệ thống phục vụ 3 nhóm người dùng chính: **Học viên (Student)**, **Giáo viên (Teacher)** và **Quản trị viên (Admin)**.

---

## 🛠️ Tech Stack (Công nghệ sử dụng)

Dự án được phát triển dựa trên hệ sinh thái hiện đại của React và hệ thống kiến trúc phân tầng (Layered Architecture):

### Frontend
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/) (Đảm bảo an toàn kiểu dữ liệu và dễ bảo trì)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (Xây dựng dựa trên Radix UI primitives và Tailwind)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts/Data Visualization:** [Recharts](https://recharts.org/) (Cho các biểu đồ thống kê, báo cáo)
- **Theming:** `next-themes` (Hỗ trợ Dark/Light mode)

### Architecture Pattern (Kiến trúc)
Dự án áp dụng **Layered Architecture (Kiến trúc phân tầng)** kết hợp với **Repository Pattern**:
1. **Domain Layer (`src/layers/domain`):** Chứa các định nghĩa Types, Interfaces cốt lõi (Entities).
2. **Data Layer (`src/layers/data`):**
   - **API:** Xử lý gọi API tới Backend thực tế (ASP.NET Core).
   - **Mock:** Dữ liệu giả lập dùng cho môi trường phát triển/demo.
   - **Repositories:** Lớp trung gian trừu tượng hóa việc truy xuất dữ liệu (chuyển đổi linh hoạt giữa Mock và API thật).
3. **Business Layer (`src/layers/business`):** Chứa các Services thực hiện logic nghiệp vụ, gọi tới Repositories.
4. **Presentation Layer (`src/app` & `src/components`):** UI/UX, Pages, Layouts của Next.js.

---

## 🔄 Luồng hoạt động (Project Flow)

Hệ thống được chia thành các phân hệ rõ ràng dựa trên Role của người dùng:

### 1. Luồng Xác thực (Authentication)
- **Landing Page:** Trang chủ giới thiệu tính năng, review, pricing.
- **Login/Register:** Đăng nhập, đăng ký tài khoản. Hệ thống phân quyền dựa trên Role (Student, Teacher, Admin).

### 2. Phân hệ Học viên (Student) - `/student/*`
Học viên là người dùng cốt lõi, tập trung vào việc học và luyện thi.
- **Dashboard:** Xem tổng quan tiến độ, điểm số, mục tiêu học tập.
- **Courses:** Đăng ký và học các khóa học TOEIC theo lộ trình.
- **Practice:** Luyện tập từng kỹ năng (Reading, Listening) và từng Part của TOEIC.
- **Mock Tests:** Thi thử TOEIC đầy đủ các kỹ năng, tính thời gian như thi thật và nhận kết quả ngay lập tức.
- **Vocabulary:** Học từ vựng theo chủ đề (Flashcards).
- **AI Chatbot:** Trợ lý ảo giải đáp thắc mắc ngữ pháp, từ vựng và mẹo thi TOEIC 24/7.
- **Progress:** Theo dõi biểu đồ tiến bộ, điểm số lịch sử.

### 3. Phân hệ Giáo viên (Teacher) - `/teacher/*`
Giáo viên quản lý nội dung học và theo dõi học viên.
- **Dashboard:** Thống kê tổng quan lớp học, khóa học.
- **Test Management:** Tạo, chỉnh sửa và quản lý các bài thi (Tests).
- **Question Bank:** Ngân hàng câu hỏi, thêm câu hỏi Reading/Listening mới.
- **Courses:** Quản lý khóa học của giáo viên.
- **Students:** Quản lý và theo dõi tiến độ của học viên trong lớp.
- **Analytics:** Phân tích điểm số, tỷ lệ hoàn thành, phát hiện các câu hỏi khó học viên hay sai.

### 4. Phân hệ Quản trị viên (Admin) - `/admin/*`
Admin có quyền lực cao nhất, quản lý toàn bộ nền tảng.
- **Dashboard:** Thống kê doanh thu, số lượng người dùng, tăng trưởng.
- **User Management:** Quản lý danh sách, trạng thái (Active/Ban) của mọi người dùng.
- **Approvals:** Phê duyệt khóa học mới từ giáo viên hoặc các yêu cầu hệ thống.
- **Course & Test Management:** Kiểm duyệt toàn bộ nội dung trên hệ thống.
- **Revenue:** Quản lý thanh toán, doanh thu từ khóa học/gói cước.
- **Reports:** Xuất báo cáo thống kê hoạt động.

---

## 🏃 Hướng dẫn chạy dự án

### Yêu cầu môi trường
- Node.js (phiên bản 18+ trở lên)
- npm hoặc yarn

### Cài đặt & Chạy Local
1. Cài đặt các dependencies:
   ```bash
   npm install
   ```

2. Cấu hình biến môi trường:
   Copy file `.env.example` thành `.env.local` và tùy chỉnh nếu cần.
   ```bash
   cp .env.example .env.local
   ```

3. Chạy Development Server:
   ```bash
   npm run dev
   ```

4. Truy cập ứng dụng:
   Mở trình duyệt và truy cập: `http://localhost:3000`

---
*Phát triển bởi Đội ngũ Smart TOEIC.*
