import React, { useState, useMemo } from 'react';
import { UploadCloud, File, AlertCircle, Check, Loader2, BookOpen } from 'lucide-react';
import { Resource } from '../types';
import { GRADES, TOPICS, LESSONS, RESOURCE_TYPES } from '../data';

interface UploadViewProps {
  onUpload: (newResource: Resource) => void;
  currentUser?: any;
}

export const UploadView: React.FC<UploadViewProps> = ({ onUpload, currentUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gradeId, setGradeId] = useState('g10');
  const [topicId, setTopicId] = useState('');
  const [lessonId, setLessonId] = useState('');
  const [resourceTypeId, setResourceTypeId] = useState('rt_ppt');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Simulation States
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Filter topics depending on chosen GradeId
  const availableTopics = useMemo(() => {
    return TOPICS.filter(t => t.grade_id === gradeId);
  }, [gradeId]);

  // Filter lessons depending on chosen TopicId
  const availableLessons = useMemo(() => {
    return LESSONS.filter(l => l.topic_id === topicId);
  }, [topicId]);

  // Reset topic & lesson if grade changes
  React.useEffect(() => {
    setTopicId('');
    setLessonId('');
  }, [gradeId]);

  // Reset lesson if topic changes
  React.useEffect(() => {
    setLessonId('');
  }, [topicId]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedFile) {
      alert('Vui lòng nhập tên học liệu và kéo thả chọn tập tin tải lên.');
      return;
    }

    setIsUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadSuccess(true);
            
            const newRes: Resource = {
              id: `res_uploaded_${Date.now()}`,
              title,
              description: description || 'Tài nguyên chưa bổ sung mô tả ngắn.',
              grade_id: gradeId,
              topic_id: topicId || null,
              lesson_id: lessonId || null,
              resource_type_id: resourceTypeId,
              file_name: selectedFile.name,
              file_size: (selectedFile.size / (1024 * 1024)).toFixed(1) + ' MB',
              uploaded_by: currentUser?.name || 'Giáo viên giấu tên',
              view_count: 0,
              download_count: 0,
              created_at: new Date().toISOString()
            };

            // Call parent trigger
            setTimeout(() => {
              onUpload(newRes);
            }, 1000);

          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
        <UploadCloud size={14} /> Thêm tài liệu giáo trình
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tải học liệu số lên kho chung</h2>
        <p className="text-sm text-slate-500 font-medium mt-0.5">
          Tài liệu đóng góp sẽ được phân tích danh mục bài học giúp giáo viên trường truy cập tìm kiếm nhanh chóng.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
        
        {uploadSuccess ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto border-4 border-emerald-50">
              <Check size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Tải lên hoàn tất!</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Tài liệu của bạn đang được biên mục thông minh và lưu giữ an toàn. Hệ thống đang chuyển hướng bạn về thư viện...
              </p>
            </div>
            <Loader2 className="animate-spin text-blue-500 mx-auto mt-4" size={24} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Native Drag and drop wrapper */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative ${
                dragActive ? 'border-blue-500 bg-blue-50/50' : 
                selectedFile ? 'border-emerald-300 bg-emerald-50/20' : 
                'border-slate-200 bg-slate-50 hover:bg-slate-100/70 hover:border-slate-350'
              }`}
            >
              <input 
                type="file" 
                required={!selectedFile}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className={`mx-auto mb-3 ${selectedFile ? 'text-emerald-500' : 'text-slate-400'}`} size={44} />
              
              {selectedFile ? (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-emerald-700 truncate max-w-lg mx-auto">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500">Dung lượng: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Nhấp hoặc kéo thả để đổi file</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-700">Kéo và thả tệp tài nguyên vào đây</p>
                  <p className="text-xs text-slate-500">Hoặc nhấp chuột để chọn trực tiếp từ máy tính của bạn</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-2">Hỗ trợ PPTX, DOCX, ZIP, PDF, MP4, PNG (Tối đa 50MB)</p>
                </div>
              )}
            </div>

            {/* Title / Description */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Tiêu đề tài liệu học tập <span className="text-red-500">*</span></label>
                <input 
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Bài giảng PPTX bài 16 Python - Tin học 10"
                  className="w-full px-4 py-2.5 bg-slate-50/40 hover:bg-slate-50 focus:bg-white border border-slate-250 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Mô tả tóm tắt nội dung</label>
                <textarea 
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Hãy giới thiệu ngắn gọn cách thức tổ chức tiết dạy, mục tiêu phiếu học tập hoặc ma trận đặc tả đi kèm để đồng nghiệp tiện theo dõi..."
                  className="w-full px-4 py-2.5 bg-slate-50/40 hover:bg-slate-50 focus:bg-white border border-slate-250 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none text-slate-900"
                />
              </div>
            </div>

            {/* Categories and Format Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
              
              {/* Grade */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Khối lớp chủ quản</label>
                <select
                  value={gradeId}
                  onChange={(e) => setGradeId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-250 rounded-xl text-sm font-semibold outline-none focus:border-blue-500 text-slate-700"
                >
                  {GRADES.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>

              {/* Format/ResourceType */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Định dạng học liệu</label>
                <select
                  value={resourceTypeId}
                  onChange={(e) => setResourceTypeId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-250 rounded-xl text-sm font-semibold outline-none focus:border-blue-500 text-slate-700"
                >
                  {RESOURCE_TYPES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

            </div>

            {/* Topic and Lesson Row - Dynamic mapping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1 border-t border-slate-100">
              
              {/* Topic Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Chủ đề (Không bắt buộc)</label>
                <select
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-250 rounded-xl text-sm font-semibold outline-none focus:border-blue-500 text-slate-700"
                >
                  <option value="">- Chọn chủ đề (Chung toàn khối) -</option>
                  {availableTopics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              {/* Lesson Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Bài học (Không bắt buộc)</label>
                <select
                  value={lessonId}
                  disabled={!topicId}
                  onChange={(e) => setLessonId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-250 rounded-xl text-sm font-semibold outline-none focus:border-blue-500 text-slate-700 disabled:opacity-50"
                >
                  <option value="">- Chọn bài học cụ thể -</option>
                  {availableLessons.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>

            </div>

            {/* Upload indicator */}
            {isUploading && (
              <div className="space-y-2 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex justify-between items-center text-xs font-bold text-blue-700">
                  <span className="flex items-center gap-1.5">
                    <Loader2 size={14} className="animate-spin" /> Đang mã hóa và đẩy file lên máy chủ...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}

            {/* Alerts */}
            <div className="bg-slate-50 rounded-2xl p-4 flex gap-3 text-slate-600 text-xs shadow-sm shadow-slate-100">
              <AlertCircle size={18} className="text-slate-400 shrink-0" />
              <div>
                Bằng việc đăng tải, bạn đồng ý cung cấp giấy phép tài nguyên mở cho phép các giáo viên trong trường xem trước và tải xuống bản sao phục vụ tiết dạy.
              </div>
            </div>

            {/* Actions button */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => { setTitle(''); setDescription(''); setSelectedFile(null); }}
                className="px-5 py-2.5 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all cursor-pointer"
              >
                Nhập lại form
              </button>
              <button 
                type="submit"
                disabled={isUploading}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <UploadCloud size={18} /> {isUploading ? 'Đang tải lên...' : 'Xác nhận đăng tài liệu'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
