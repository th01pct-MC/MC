import React, { useState } from 'react';
import { 
  ArrowLeft, Download, Eye, Heart, Sparkles, FileText, 
  Calendar, Check, AlertTriangle, MonitorPlay, MessageSquare, Play, Pause, RefreshCw, Terminal
} from 'lucide-react';
import { Resource } from '../types';
import { GRADES, TOPICS, LESSONS, RESOURCE_TYPES } from '../data';
import { ResourceIcon } from './ResourceIcon';

interface DetailViewProps {
  resource: Resource;
  onBack: () => void;
  onLikeResource: (id: string) => void;
  onIncrementDownload: (id: string) => void;
  onIncrementView: (id: string) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ 
  resource, 
  onBack,
  onLikeResource,
  onIncrementDownload,
  onIncrementView
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadFinished, setDownloadFinished] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([
    'Tài liệu rất hay, hiệu ứng slide thiết kế vô cùng chuyên nghiệp!',
    'Đầy đủ cả ma trận và đặc tả đề kiểm tra, cảm ơn cô Châu rất nhiều.'
  ]);
  const [newComment, setNewComment] = useState('');

  // Simulator values for slides and media
  const [activeSlide, setActiveSlide] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isPythonRunning, setIsPythonRunning] = useState(false);
  const [pythonTerminal, setPythonTerminal] = useState<string[]>([]);

  // Automatically increment view once when opening
  React.useEffect(() => {
    onIncrementView(resource.id);
  }, [resource.id]);

  const typeInfo = RESOURCE_TYPES.find(t => t.id === resource.resource_type_id) || {
    id: 'unknown',
    name: 'Học liệu',
    iconName: 'File',
    color: 'text-slate-500',
    bg: 'bg-slate-50',
    border: 'border-slate-200'
  };

  const gradeName = GRADES.find(g => g.id === resource.grade_id)?.name || 'Học liệu chung';
  const topicName = TOPICS.find(t => t.id === resource.topic_id)?.name || 'Chưa phân chủ đề';
  const lessonName = LESSONS.find(l => l.id === resource.lesson_id)?.name || 'Kiến thức chung';

  const handleDownload = () => {
    if (downloadFinished) return;
    setDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setDownloadFinished(true);
          onIncrementDownload(resource.id);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const handleLike = () => {
    onLikeResource(resource.id);
    setLiked(!liked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, newComment]);
    setNewComment('');
  };

  // Run Custom Code for Python scripts
  const runPythonCode = () => {
    setIsPythonRunning(true);
    setPythonTerminal(['$ python ' + resource.file_name, 'Đang chuẩn bị môi trường chạy Python...', 'Hệ điều hành ảo hóa: Kích hoạt thành công.']);
    
    setTimeout(() => {
      setPythonTerminal(prev => [...prev, '>>> Khởi chạy kịch bản...']);
      setTimeout(() => {
        if (resource.id === 'res5') {
          setPythonTerminal(prev => [
            ...prev,
            '<!DOCTYPE html>',
            '<html>',
            '<head><title>Trang Web Của Tôi</title></head>',
            '<body>',
            '  <h1>Chào mừng đến với tiết học HTML Lớp 12!</h1>',
            '  <p>Website chạy kiểm thử thành công trên Localhost.</p>',
            '</body>',
            '</html>',
            '',
            'Process finished with exit code 0'
          ]);
        } else {
          setPythonTerminal(prev => [
            ...prev,
            'Output:',
            '========================================',
            'Hello, World from Python for high school!',
            'Bài tập tuần 16: Phân tích danh sách học sinh...',
            'Đọc File dữ liệu: Hoàn tất.',
            'Tổng só bản ghi xử lý: 45 học sinh.',
            '========================================',
            'Process finished with exit code 0'
          ]);
        }
        setIsPythonRunning(false);
      }, 800);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      
      {/* Navigation and Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft size={16} /> Quay lại thư viện
        </button>
        <span className="text-xs font-semibold text-slate-400">
          Mã học liệu: #{resource.id}
        </span>
      </div>

      {/* Main Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Dynamic Preview Simulation Stage */}
        <div className="aspect-video sm:h-80 w-full bg-slate-950 flex flex-col justify-between p-4 relative text-white border-b border-slate-100 select-none">
          
          {resource.resource_type_id === 'rt_ppt' && (
            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="flex items-center justify-between text-xs text-white/50 font-semibold uppercase tracking-wider">
                <span>Xem trước slide PowerPoint</span>
                <span>Slide {activeSlide} / 4</span>
              </div>

              {/* Slide Screen layout */}
              <div className="text-center py-6 px-4 space-y-3 bg-white/5 rounded-xl border border-white/10 max-w-lg mx-auto">
                <p className="text-sm text-blue-400 font-bold uppercase tracking-wider">Tiết {activeSlide}: {resource.title.split('–')[1] || resource.title}</p>
                {activeSlide === 1 && (
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold">Kính chào quý thầy cô và các em học sinh!</h3>
                    <p className="text-xs text-white/70">Người soạn bài giảng: {resource.uploaded_by}</p>
                  </div>
                )}
                {activeSlide === 2 && (
                  <div className="space-y-1.5 text-left">
                    <p className="text-xs font-bold text-yellow-400">I. Khởi động bài học</p>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Sáng nay khi truy cập Facebook hoặc đọc tin tức, các em đã tiếp nhận thông tin gì? Làm sao máy tính hiểu được thông tin này?
                    </p>
                  </div>
                )}
                {activeSlide === 3 && (
                  <div className="space-y-1.5 text-left">
                    <p className="text-xs font-bold text-yellow-400">II. Hình thành kiến thức</p>
                    <p className="text-xs text-white/80 leading-relaxed">
                      - Dữ liệu (Data) là một chuỗi các ký hiệu vô tri.<br/>
                      - Thông tin (Information) là dữ liệu đã được xử lý mang ý nghĩa cụ thể trong ngữ cảnh nhất định.
                    </p>
                  </div>
                )}
                {activeSlide === 4 && (
                  <div className="space-y-1.5 text-left">
                    <p className="text-xs font-bold text-yellow-400">III. Tổng kết và Luyện tập</p>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Làm bài tập trắc nghiệm số 1-5 phần luyện tập trong sách giáo khoa Tin học để củng cố hệ thống sơ đồ xử lý.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button 
                  disabled={activeSlide === 1}
                  onClick={() => setActiveSlide(prev => prev - 1)}
                  className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 disabled:opacity-40 rounded-lg font-bold transition-all"
                >
                  Trở lại
                </button>
                <button 
                  disabled={activeSlide === 4}
                  onClick={() => setActiveSlide(prev => prev + 1)}
                  className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 disabled:opacity-40 rounded-lg font-bold transition-all"
                >
                  Trang kế
                </button>
              </div>
            </div>
          )}

          {resource.resource_type_id === 'rt_vid' && (
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-white/50 font-semibold uppercase tracking-wider">
                <span>Học liệu số: Trình chiếu video</span>
                <span>MP4 • 1080p</span>
              </div>

              <div className="text-center space-y-4">
                <button 
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="w-16 h-16 bg-blue-600/90 hover:bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto shadow-xl hover:scale-105 transition-all outline-none"
                >
                  {isVideoPlaying ? <Pause size={28} /> : <Play size={28} className="translate-x-0.5" />}
                </button>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-200">Video: {resource.file_name}</p>
                  <p className="text-xs text-slate-400">
                    {isVideoPlaying ? 'Trạng thái: Đang phát clip minh họa...' : 'Nhấp chuột phát để xem cấu cảnh'}
                  </p>
                </div>
              </div>

              {/* Seekbar visual */}
              <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
                <div className={`bg-blue-500 h-1 rounded-full transition-all duration-300 ${isVideoPlaying ? 'w-2/5 animate-pulse' : 'w-0'}`}></div>
              </div>
            </div>
          )}

          {resource.resource_type_id === 'rt_prac' && (
            <div className="flex-1 flex flex-col justify-between font-mono text-xs">
              <div className="flex items-center justify-between text-white/50 tracking-wider">
                <span>Môi trường chạy code ảo hóa</span>
                <span className="text-blue-400">Trình biên dịch IDE Lớp 10/11/12</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 my-2 overflow-hidden select-text text-[11px] leading-tight">
                <div className="bg-slate-900 border border-white/10 p-2.5 rounded-lg overflow-y-auto max-h-36">
                  <p className="text-yellow-400 font-bold"># Python Source Code</p>
                  <p className="text-slate-300 mt-1">
                    def process_data(samples):<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;print("Phân tích học liệu...")<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;total_sum = sum(samples)<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;return total_sum / len(samples)<br/>
                    <br/>
                    data = [8, 9, 7.5, 10, 6.5, 9.5]<br/>
                    average = process_data(data)<br/>
                    print("Điểm số trung bình thực hành:", average)
                  </p>
                </div>
                <div className="bg-black/80 border border-white/10 p-2.5 rounded-lg overflow-y-auto max-h-36 flex flex-col justify-between">
                  <div className="space-y-1 text-slate-400">
                    <p className="text-emerald-400 font-bold flex items-center gap-1"><Terminal size={12} /> Bảng chạy kết quả Terminal</p>
                    {pythonTerminal.length > 0 ? (
                      pythonTerminal.map((line, idx) => (
                        <p key={idx} className={`${line.includes('Error') ? 'text-red-400' : line.includes('Output') ? 'text-yellow-300' : ''}`}>{line}</p>
                      ))
                    ) : (
                      <p className="italic">Chưa có đầu ra. Hãy bấm "Chạy thử (Run Code)"</p>
                    )}
                  </div>
                  <button 
                    disabled={isPythonRunning}
                    onClick={runPythonCode}
                    className="mt-2 w-full flex items-center justify-center gap-1.5 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded cursor-pointer"
                  >
                    <RefreshCw size={12} className={isPythonRunning ? 'animate-spin' : ''} />
                    Chạy thử
                  </button>
                </div>
              </div>

              <span className="text-white/30 text-[10px]">Lưu ý: Môi trường chạy ảo hóa phục vụ bài trắc nghiệm thiết kế kiểm thử mã lệnh.</span>
            </div>
          )}

          {(resource.resource_type_id !== 'rt_ppt' && resource.resource_type_id !== 'rt_vid' && resource.resource_type_id !== 'rt_prac') && (
            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="flex items-center justify-between text-xs text-white/50 font-semibold uppercase tracking-wider">
                <span>Tài liệu cấu trúc tệp tin</span>
                <span>Dung lượng: {resource.file_size}</span>
              </div>

              <div className="text-center max-w-sm mx-auto space-y-4">
                <div className={`w-16 h-16 rounded-2xl ${typeInfo.bg} border ${typeInfo.border} flex items-center justify-center mx-auto shadow-lg`}>
                  <ResourceIcon name={typeInfo.iconName} className={typeInfo.color} size={30} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-100">{resource.file_name}</h3>
                  <p className="text-xs text-slate-400">Định dạng file đặc sản: bám sát tệp Tin Học trung học phổ thông mới.</p>
                </div>
              </div>

              <div className="flex justify-center gap-2">
                <button 
                  onClick={handleDownload}
                  disabled={downloading || downloadFinished}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white font-bold text-xs px-5 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {downloading ? 'Đang giải nén tải...' : downloadFinished ? 'Đã tải thành công' : 'Đăng ký tải xuống'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Content Body Details */}
        <div className="p-6 sm:p-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className={`px-2.5 py-1 font-bold rounded-full border ${typeInfo.bg} ${typeInfo.color} ${typeInfo.border}`}>
                  {typeInfo.name}
                </span>
                <span className="px-2.5 py-1 font-bold bg-slate-100 text-slate-700 border border-slate-200 rounded-full">
                  {gradeName}
                </span>
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Calendar size={13} /> Đăng: {new Date(resource.created_at).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                {resource.title}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                {resource.description}
              </p>
            </div>

            <div className="flex sm:flex-col gap-2.5 shrink-0 w-full sm:w-44">
              <button 
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-100 cursor-pointer"
              >
                <Download size={18} /> {downloading ? 'Đang tải...' : downloadFinished ? 'Đã tải hoàn tất' : 'Tải tài liệu'}
              </button>
              <button 
                onClick={handleLike}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all border cursor-pointer ${
                  liked 
                    ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm' 
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Heart size={18} className={liked ? 'fill-rose-500 text-rose-500' : ''} /> {liked ? 'Đã yêu thích' : 'Yêu thích học liệu'}
              </button>
            </div>
          </div>

          {/* Dynamic Download Progress Bar */}
          {downloading && (
            <div className="space-y-1.5 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
              <div className="flex justify-between text-xs font-bold text-blue-700">
                <span>Bộ đệm đang tải tệp tin và xác thực chữ ký số trường học...</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-150" style={{ width: `${downloadProgress}%` }}></div>
              </div>
            </div>
          )}

          {/* Detailed categorization mapping */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600 leading-relaxed">
            <div className="space-y-2">
              <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Cơ cấu chương trình học</p>
              <div className="space-y-1 text-slate-800">
                <p><span className="text-slate-500">Chủ đề bài giảng:</span> {topicName}</p>
                <p><span className="text-slate-500">Bài học bám sát:</span> {lessonName}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Chi tiết học liệu vật lý</p>
              <div className="space-y-1 text-slate-800">
                <p className="truncate"><span className="text-slate-500">Tên file:</span> {resource.file_name}</p>
                <p><span className="text-slate-500">Người khởi tạo:</span> {resource.uploaded_by}</p>
              </div>
            </div>
          </div>

          {/* Interactive Comments Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-500 mt-0.5" />
              <h3 className="text-base font-bold text-slate-900">Thảo luận giáo viên ({comments.length})</h3>
            </div>

            <div className="space-y-3.5 max-h-60 overflow-y-auto">
              {comments.map((cmt, idx) => (
                <div key={idx} className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0 uppercase">
                    {idx === 0 ? 'GV' : idx === 1 ? 'AD' : 'GV'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{idx === 0 ? 'GV. Nguyễn Vũ Lam' : idx === 1 ? 'Admin Hệ Thống' : 'Giáo viên trường'}</span>
                      <span className="text-slate-400 font-medium">Bình luận mẫu</span>
                    </div>
                    <p className="text-slate-700 mt-1 leading-normal font-semibold">{cmt}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleCommentSubmit} className="flex gap-3">
              <input 
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Viết câu hỏi hoặc chia sẻ nhận xét tài liệu..."
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
              />
              <button 
                type="submit"
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              >
                Gửi nhận xét
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
