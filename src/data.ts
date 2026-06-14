import { Grade, Topic, Lesson } from './types';

export const GRADES: Grade[] = [
  { id: 'g10', name: 'Tin học lớp 10' },
  { id: 'g11', name: 'Tin học lớp 11' },
  { id: 'g12', name: 'Tin học lớp 12' },
];

export const TOPICS: Topic[] = [
  // Lớp 10
  { id: 't10_1', grade_id: 'g10', name: 'Chủ đề 1: Máy tính và xã hội tri thức' },
  { id: 't10_2', grade_id: 'g10', name: 'Chủ đề 2: Mạng máy tính và Internet' },
  { id: 't10_3', grade_id: 'g10', name: 'Chủ đề 3: Đạo đức, pháp luật và văn hóa trong môi trường số' },
  { id: 't10_4', grade_id: 'g10', name: 'Chủ đề 4: Ứng dụng Tin học' },
  { id: 't10_5', grade_id: 'g10', name: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính' },
  { id: 't10_6', grade_id: 'g10', name: 'Chủ đề 7: Hướng nghiệp với Tin học' } ,
  // Lớp 11
  { id: 't11_1', grade_id: 'g11', name: 'Chủ đề 1: Máy tính và xã hội tri thức' },
  { id: 't11_2', grade_id: 'g11', name: 'Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin' },
  { id: 't11_3', grade_id: 'g11', name: 'Chủ đề 3: Đạo đức, pháp luật và văn hóa trong môi trường số'},
  { id: 't11_4', grade_id: 'g11', name: 'Chủ đề 4: Giới thiệu các hệ cơ sở dữ liệu' },
  { id: 't11_5', grade_id: 'g11', name: 'Chủ đề 6: Hướng nghiệp với Tin học' },
  { id: 't11_6', grade_id: 'g11', name: 'Chủ đề 7: Thực hành tạo và khai thác cơ sơ dữ liệu'},
  { id: 't11_7', grade_id: 'g11', name: 'Chủ đề 5: Phần mềm chỉnh sửa ảnh và làm Video'},
  // Lớp 12
  { id: 't12_1', grade_id: 'g12', name: 'Chủ đề 1: Máy tính và xã hội tri thức' },
  { id: 't12_2', grade_id: 'g12', name: 'Chủ đề 2: Mạng máy tính và Internet' },
  { id: 't12_3', grade_id: 'g12', name: 'Chủ đề 3: Đạo đức, pháp luật và văn hóa trong môi trường số'},
  { id: 't12_4', grade_id: 'g12', name: 'Chủ đề 4: Giải quyết vấn đề với sự trợ giúp của máy tính'},
  { id: 't12_5', grade_id: 'g12', name: 'Chủ đề 6: Hướng nghiệp với Tin học'},
  { id: 't12_6', grade_id: 'g12', name: 'Chủ đề 7: Máy tính và xã hội tri thức'},
  { id: 't12_7', grade_id: 'g12', name: 'Chủ đề 5: Ứng dụng Tin học'},
];

export const LESSONS: Lesson[] = [
  { id: 'l10_1_1', topic_id: 't10_1', name: 'Bài 1: Thông tin và xử lý thông tin' },
  { id: 'l10_1_2', topic_id: 't10_1', name: 'Bài 2: Vai trò của thiết bị thông minh và tin học đối với xã hội' },
  { id: 'l10_1_7', topic_id: 't10_1', name: 'Bài 7: Thực hành sử dụng thiết bị số thông dụng'},
  { id: 'l10_2_8', topic_id: 't10_2', name: 'Bài 8: Mạng máy tính trong cuộc sống hiện đại' },
  { id: 'l10_2_9', topic_id: 't10_2', name: 'Bài 9: An toàn trên không gian mạng' },
  { id: 'l10_2_10', topic_id: 't10_2', name: 'Bài 10: Thực hành khai thác tài nguyên trên Internet' },
  { id: 'l10_3_11', topic_id: 't10_3', name: 'Bài 11: Ứng xử trên môi trường số. Nghĩa vụ tôn trọng bản quyền' },
  { id: 'l10_4_12', topic_id: 't10_4', name: 'Bài 12: Phần mềm thiết kế đồ họa Inkscape' },
  { id: 'l10_4_13', topic_id: 't10_4', name: 'Bài 13: Bổ sung các đối tượng đồ họa' },
  { id: 'l10_4_14', topic_id: 't10_4', name: 'Bài 14: Làm việc với đối tượng đường và văn bản' },
  { id: 'l10_4_15', topic_id: 't10_4', name: 'Bài 15: Hoàn thiện hình ảnh đồ họa' },
  { id: 'l10_5_16', topic_id: 't10_5', name: 'Bài 16: Ngôn ngữ lập trình bậc cao Python' },
  { id: 'l10_5_17', topic_id: 't10_5', name: 'Bài 17: Biến và lệnh gán' },
  { id: 'l10_5_18', topic_id: 't10_5', name: 'Bài 18: Các lệnh vào ra đơn giản' },
  { id: 'l10_5_19', topic_id: 't10_5', name: 'Bài 19: Câu lệnh rẽ nhánh if' },
  { id: 'l10_5_20', topic_id: 't10_5', name: 'Bài 20: Câu lệnh lặp for' },
  { id: 'l10_5_21', topic_id: 't10_5', name: 'Bài 21: Câu lệnh lặp while' },
  { id: 'l10_5_22', topic_id: 't10_5', name: 'Bài 22: Kiểu dữ liệu danh sách' },
  { id: 'l10_5_23', topic_id: 't10_5', name: 'Bài 23: Một số lệnh làm việc với dữ liệu danh sách' },
  { id: 'l10_5_24', topic_id: 't10_5', name: 'Bài 24: Xâu ký tự' },
  { id: 'l10_5_25', topic_id: 't10_5', name: 'Bài 25: Một số lệnh làm việc với xâu ký tự' },
  { id: 'l10_5_26', topic_id: 't10_5', name: 'Bài 26: Hàm trong Python' },
  { id: 'l10_5_27', topic_id: 't10_5', name: 'Bài 27: Tham số của hàm' },
  { id: 'l10_5_28', topic_id: 't10_5', name: 'Bài 28: Phạm vi của biến' },
  { id: 'l10_5_29', topic_id: 't10_5', name: 'Bài 29: Nhận biết lỗi chương trình' },
  { id: 'l10_5_30', topic_id: 't10_5', name: 'Bài 30: Kiểm thử và gỡ lỗi chương trình' },
  { id: 'l10_5_31', topic_id: 't10_5', name: 'Bài 31: Thực hành viết chương trình đơn giản' },
  { id: 'l10_5_32', topic_id: 't10_5', name: 'Bài 32: Ôn tập lập trình Python' },
  { id: 'l10_6_33', topic_id: 't10_6', name: 'Bài 33: Nghề thiết kế đồ họa máy tính' },
  { id: 'l10_6_34', topic_id: 't10_6', name: 'Bài 34: Nghề phát triển phần mềm' },
  
  { id: 'l11_1_1', topic_id: 't11_1', name: 'Bài 1: Hệ điều hành' },
  { id: 'l11_1_2', topic_id: 't11_1', name: 'Bài 2: Thực hành sử dụng hệ điều hành. Thiết bị số thông minh' },
  { id: 'l11_1_3', topic_id: 't11_1', name: 'Bài 3: Phần mềm nguồn mở và phần mềm chạy trên Internet' },
  { id: 'l11_1_4', topic_id: 't11_1', name: 'Bài 4: Bên trong máy tính' },
  { id: 'l11_1_5', topic_id: 't11_1', name: 'Bài 5: Kết nối máy tính với các thiết bị số' },
  { id: 'l11_2_6', topic_id: 't11_2', name: 'Bài 6: Lưu trữ và chia sẻ tệp tin trên Internet' },
  { id: 'l11_2_7', topic_id: 't11_2', name: 'Bài 7: Thực hành tìm kiếm thông tin trên Internet'},
  { id: 'l11_2_8', topic_id: 't11_2', name: 'Bài 8: Thực hành nâng cao sử dụng thư điện tử và mạng xã hội' },
  { id: 'l11_3_9', topic_id: 't11_3', name: 'Bài 9: Giao tiếp an toàn trên Internet' },
  { id: 'l11_4_10', topic_id: 't11_4', name: 'Bài 10: Lưu trữ dữ liệu và khai thác thông tin phục vụ quản lý' },
  { id: 'l11_4_11', topic_id: 't11_4', name: 'Bài 11: Cơ sở dữ liệu' },
  { id: 'l11_4_12', topic_id: 't11_4', name: 'Bài 12: Hệ quản trị cơ sở dữ liệu và hệ cơ sở dữ liệu' },
  { id: 'l11_4_13', topic_id: 't11_4', name: 'Bài 13: Cơ sở dữ liệu quan hệ' },
  { id: 'l11_4_14', topic_id: 't11_4', name: 'Bài 14: SQL - Ngôn ngữ truy vấn có cấu trúc' },
  { id: 'l11_4_15', topic_id: 't11_4', name: 'Bài 15: Bảo mật và an toàn hệ cơ sở dữ liệu' },
  { id: 'l11_5_16', topic_id: 't11_5', name: 'Bài 16: Nghề quản trị cơ sở dữ liệu' },
  { id: 'l11_6_17', topic_id: 't11_6', name: 'Bài 17: Quản trị cơ sở dữ liệu trên máy tính' },
  { id: 'l11_6_18', topic_id: 't11_6', name: 'Bài 18: Thực hành xác định cấu trúc bảng và các trường khóa' },
  { id: 'l11_6_19', topic_id: 't11_6', name: 'Bài 19: Thực hành tạo lập cơ sở dữ liệu và các bảng' },
  { id: 'l11_6_20', topic_id: 't11_6', name: 'Bài 20: Thực hành tạo lập các bảng có khóa ngoài' },
  { id: 'l11_6_21', topic_id: 't11_6', name: 'Bài 21: Thực hành cập nhật và truy xuất dữ liệu các bảng' },
  { id: 'l11_6_22', topic_id: 't11_6', name: 'Bài 22: Thực hành cập nhật bảng dữ liệu có tham chiếu' },
  { id: 'l11_6_23', topic_id: 't11_6', name: 'Bài 23: Thực hành truy xuất dữ liệu qua liên kết các bảng' },
  { id: 'l11_6_24', topic_id: 't11_6', name: 'Bài 24: Thực hành sao lưu dữ liệu' },
  { id: 'l11_7_25', topic_id: 't11_7', name: 'Bài 25: Phần mềm chỉnh sửa ảnh' },
  { id: 'l11_7_26', topic_id: 't11_7', name: 'Bài 26: Công cụ tinh chỉnh màu sắc và công cụ chọn' },
  { id: 'l11_7_27', topic_id: 't11_7', name: 'Bài 27: Công cụ vẽ và một số ứng dụng' },
  { id: 'l11_7_28', topic_id: 't11_7', name: 'Bài 28: Tạo ảnh động' },
  { id: 'l11_7_29', topic_id: 't11_7', name: 'Bài 29: Khám phá phần mềm làm phim' },
  { id: 'l11_7_30', topic_id: 't11_7', name: 'Bài 30: Biên tập phim' },
  { id: 'l11_7_31', topic_id: 't11_7', name: 'Bài 31: Thực hành tạo phim hoạt hình' },

  { id: 'l12_1_1', topic_id: 't12_1', name: 'Bài 1: Làm quen với Trí tuệ nhân tạo' },
  { id: 'l12_1_2', topic_id: 't12_1', name: 'Bài 2: Trí tuệ nhân tạo trong khoa học và đời sống'},
  { id: 'l12_2_3', topic_id: 't12_2', name: 'Bài 3: Một số thiết bị mạng thông dụng' },
  { id: 'l12_2_4', topic_id: 't12_2', name: 'Bài 4: Giao thức mạng' },
  { id: 'l12_2_5', topic_id: 't12_2', name: 'Bài 5: Thực hành chia sẻ tài nguyên trên mạng' },
  { id: 'l12_6_22', topic_id: 't12_6', name: 'Bài 22: Thực hành kết nối các thiết bị số' },
  { id: 'l12_3_6', topic_id: 't12_3', name: 'Bài 6: Giao tiếp và ứng xử trong không gian mạng' },
  { id: 'l12_4_7', topic_id: 't12_4', name: 'Bài 7: HTML và cấu trúc trang web' },
  { id: 'l12_4_8', topic_id: 't12_4', name: 'Bài 8: Định dạng văn bản' },
  { id: 'l12_4_9', topic_id: 't12_4', name: 'Bài 9: Tạo danh sách, bảng' },
  { id: 'l12_4_10', topic_id: 't12_4', name: 'Bài 10: Tạo liên kết' },
  { id: 'l12_4_11', topic_id: 't12_4', name: 'Bài 11: Chèn tệp tin đa phương tiện và khung nội tuyến' },
  { id: 'l12_4_12', topic_id: 't12_4', name: 'Bài 12: Tạo biểu mẫu' },
  { id: 'l12_4_13', topic_id: 't12_4', name: 'Bài 13: Khái niệm, vai trò của CSS' },
  { id: 'l12_4_14', topic_id: 't12_4', name: 'Bài 14: Định dạng văn bản bằng CSS' },
  { id: 'l12_4_15', topic_id: 't12_4', name: 'Bài 15: Tạo màu cho chữ và nền' },
  { id: 'l12_4_16', topic_id: 't12_4', name: 'Bài 16: Định dạng khung' },
  { id: 'l12_4_17', topic_id: 't12_4', name: 'Bài 17: Các mức ưu tiên của bộ chọn' },
  { id: 'l12_4_18', topic_id: 't12_4', name: 'Bài 18: Thực hành tổng hợp thiết kế trang web' },
];

export const RESOURCE_TYPES = [
  { id: 'rt_ppt', name: 'Bài giảng PowerPoint', iconName: 'MonitorPlay', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
  { id: 'rt_doc', name: 'Phiếu học tập', iconName: 'FileText', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
  { id: 'rt_test', name: 'Đề kiểm tra', iconName: 'CheckCircle', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
  { id: 'rt_vid', name: 'Video hướng dẫn', iconName: 'Video', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
  { id: 'rt_img', name: 'Hình ảnh minh họa', iconName: 'ImageIcon', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { id: 'rt_prac', name: 'File thực hành', iconName: 'Code', color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-300' },
  { id: 'rt_mind', name: 'Sơ đồ tư duy', iconName: 'GitBranch', color: 'text-teal-500', bg: 'bg-teal-50', border: 'border-teal-200' },
];

export const INITIAL_RESOURCES = [
  {
    id: 'res1', title: 'Tin học 10 – Thông tin và xử lý thông tin', description: 'Bài giảng slide PowerPoint chi tiết có hiệu ứng động sinh động bám sát bài 1 Tin Học lớp 10.',
    grade_id: 'g10', topic_id: 't10_1', lesson_id: 'l10_1_1', resource_type_id: 'rt_ppt',
    file_name: 'Bai1_TinHoc10_XuLyThongTin.pptx', file_size: '5.2 MB', uploaded_by: 'GV. Hà Thị Minh Châu',
    view_count: 152, download_count: 45, created_at: '2026-05-05T08:00:00Z', likes: 24
  },
  {
    id: 'res2', title: 'Phiếu học tập – An toàn trên không gian mạng', description: 'Hệ thống câu hỏi tình huống mẫu nâng cao ý thức bảo mật cá nhân trên Internet cho học sinh.',
    grade_id: 'g10', topic_id: 't10_2', lesson_id: 'l10_2_9', resource_type_id: 'rt_doc',
    file_name: 'PHT_AnToanMang_K10.docx', file_size: '1.1 MB', uploaded_by: 'GV. Nguyễn Văn A',
    view_count: 89, download_count: 30, created_at: '2026-05-12T08:00:00Z', likes: 12
  },
  {
    id: 'res3', title: 'Đề kiểm tra trắc nghiệm giữa kỳ I – Tin học 10', description: 'Đề kiểm tra biên soạn chuẩn cấu trúc Bộ GD&ĐT kèm ma trận đặc tả chi tiết và đáp án tự động.',
    grade_id: 'g10', topic_id: 't10_1', lesson_id: null, resource_type_id: 'rt_test',
    file_name: 'DeKT_GiuaKi1_TH10.pdf', file_size: '2.5 MB', uploaded_by: 'GV. Nguyễn Văn A',
    view_count: 320, download_count: 150, created_at: '2026-05-15T08:00:00Z', likes: 45
  },
  {
    id: 'res4', title: 'Video hướng dẫn quy định phòng thực hành Tin học', description: 'Video ngắn trực quan, sinh động để chiếu giáo dục học sinh nội quy phòng thực hành Tin học đầu khóa.',
    grade_id: 'g10', topic_id: null, lesson_id: null, resource_type_id: 'rt_vid',
    file_name: 'NoiQuyPhongMay.mp4', file_size: '12.4 MB', uploaded_by: 'GV. Hà Thị Minh Châu',
    view_count: 500, download_count: 80, created_at: '2026-04-25T08:00:00Z', likes: 88
  },
  {
    id: 'res5', title: 'Source mẫu thiết kế HTML bài 7 – Lớp 12', description: 'Bộ khung mã nguồn HTML cơ bản giúp học sinh luyện tập hiển thị trang web đầu tiên đạt chuẩn.',
    grade_id: 'g12', topic_id: 't12_4', lesson_id: 'l12_4_7', resource_type_id: 'rt_prac',
    file_name: 'ThucHanh_HTML_Bai7.zip', file_size: '0.4 MB', uploaded_by: 'GV. Nguyễn Văn A',
    view_count: 65, download_count: 20, created_at: '2026-06-01T08:00:00Z', likes: 9
  },
  {
    id: 'res6', title: 'Sơ đồ tư duy (Mindmap) – Chủ đề 4: Cơ sở dữ liệu', description: 'Tóm lược toàn bộ chủ đề học tập Cơ sở dữ liệu Tin 11 chuẩn xác và trực quan.',
    grade_id: 'g11', topic_id: 't11_4', lesson_id: 'l11_4_11', resource_type_id: 'rt_mind',
    file_name: 'Mindmap_CSDL_11.png', file_size: '3.2 MB', uploaded_by: 'GV. Hà Thị Minh Châu',
    view_count: 110, download_count: 42, created_at: '2026-05-10T08:00:00Z', likes: 18
  },
  {
    id: 'res7', title: 'Slide bài 16: Ngôn ngữ lập trình bậc cao Python', description: 'Bài giảng giới thiệu Python, cú pháp cơ bản, cách tương tác với IDLE và viết chương trình đầu tiên.',
    grade_id: 'g10', topic_id: 't10_5', lesson_id: 'l10_5_16', resource_type_id: 'rt_ppt',
    file_name: 'Bai16_Python_Intro.pptx', file_size: '4.8 MB', uploaded_by: 'GV. Hà Thị Minh Châu',
    view_count: 215, download_count: 76, created_at: '2026-06-05T08:00:00Z', likes: 37
  },
  {
    id: 'res8', title: 'Phiếu vẽ thực hành GIMP – Tạo banner chúc mừng', description: 'Đề tuyển chọn thực hành Photoshop/GIMP cắt ghép ảnh tinh xảo theo cấu trúc bài 25 Tin 11.',
    grade_id: 'g11', topic_id: 't11_7', lesson_id: 'l11_7_25', resource_type_id: 'rt_doc',
    file_name: 'TH_GIMP_Design.docx', file_size: '1.8 MB', uploaded_by: 'GV. Nguyễn Văn A',
    view_count: 142, download_count: 53, created_at: '2026-05-12T08:00:00Z', likes: 21
  }
];
