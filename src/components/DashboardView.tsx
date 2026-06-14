import React from 'react';
import { 
  Folder, MonitorPlay, CheckCircle, Video, UploadCloud, 
  Search, ShieldAlert, ArrowUpRight, TrendingUp, Sparkles, BookOpen
} from 'lucide-react';
import { Resource } from '../types';
import { GRADES, RESOURCE_TYPES } from '../data';
import { ResourceIcon } from './ResourceIcon';
import { motion } from 'motion/react';

interface DashboardViewProps {
  resources: Resource[];
  onNavigate: (view: string, resource?: any) => void;
  setActiveGradeFilter: (gradeId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  resources, 
  onNavigate,
  setActiveGradeFilter
}) => {
  const stats = {
    total: resources.length,
    ppt: resources.filter(r => r.resource_type_id === 'rt_ppt').length,
    test: resources.filter(r => r.resource_type_id === 'rt_test').length,
    video: resources.filter(r => r.resource_type_id === 'rt_vid').length,
  };

  const recentResources = [...resources]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4);

  const getResourceTypeDetails = (typeId: string) => {
    return RESOURCE_TYPES.find(t => t.id === typeId) || {
      id: 'unknown',
      name: 'Tài liệu',
      iconName: 'File',
      color: 'text-slate-500',
      bg: 'bg-slate-50',
      border: 'border-slate-200'
    };
  };

  const totalViews = resources.reduce((acc, r) => acc + r.view_count, 0);
  const totalDownloads = resources.reduce((acc, r) => acc + r.download_count, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-blue-100">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/20 rounded-full blur-2xl transform -translate-x-20 translate-y-20"></div>
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide transition-colors">
            <Sparkles size={14} className="text-yellow-300 fill-yellow-300" />
            Học tập số hóa bám sát chương trình phổ thông 2018
          </div>
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Trung tâm Tài nguyên & Học liệu Tin học THPT
            </h2>
            <p className="text-white/80 mt-2 text-sm sm:text-base leading-relaxed">
              Giải pháp toàn diện giúp tổ chức, chia sẻ và lưu trữ bài giảng số, đề kiểm tra, phiếu học tập và sơ đồ cấu trúc trực quan cho giáo viên, học sinh toàn diện và chuẩn xác.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button 
              onClick={() => onNavigate('upload')} 
              className="flex items-center gap-2 bg-white text-blue-700 hover:bg-slate-50 px-5  py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <UploadCloud size={16} /> Đóng góp ngay
            </button>
            <button 
              onClick={() => { setActiveGradeFilter('all'); onNavigate('library'); }} 
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all backdrop-blur-sm cursor-pointer"
            >
              Khám phá thư viện &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Highlights Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard title="Tổng số học liệu" value={stats.total} icon={Folder} color="bg-blue-600 shadow-blue-100" accent="blue" />
        <StatCard title="Bài giảng PPT" value={stats.ppt} icon={MonitorPlay} color="bg-orange-500 shadow-orange-100" accent="orange" />
        <StatCard title="Đề kiểm tra thi" value={stats.test} icon={CheckCircle} color="bg-red-500 shadow-red-100" accent="red" />
        <StatCard title="Video hướng dẫn" value={stats.video} icon={Video} color="bg-purple-500 shadow-purple-100" accent="purple" />
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Recent Uploads */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              <h3 className="text-lg font-bold text-slate-900">Bài viết & Học liệu mới cập nhật</h3>
            </div>
            <button 
              onClick={() => { setActiveGradeFilter('all'); onNavigate('library'); }} 
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-0.5"
            >
              Xem toàn bộ &rarr;
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
            {recentResources.map((res) => {
              const details = getResourceTypeDetails(res.resource_type_id);
              const gradeName = GRADES.find(g => g.id === res.grade_id)?.name || 'Học liệu chung';
              return (
                <div 
                  key={res.id} 
                  onClick={() => onNavigate('detail', res)} 
                  className="p-4 sm:p-5 flex items-center gap-4 hover:bg-slate-50 cursor-pointer transition-all group duration-200"
                >
                  <div className={`w-11 h-11 rounded-xl ${details.bg} ${details.border} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <ResourceIcon name={details.iconName} className={details.color} size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-slate-950 truncate leading-snug group-hover:text-blue-600 transition-colors">
                      {res.title}
                    </h4>
                    <p className="text-xs text-slate-500 truncate mt-1">{res.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] font-semibold text-slate-400">
                      <span className="bg-slate-100 px-2 py-0.5 text-slate-600 rounded-md">{gradeName}</span>
                      <span>•</span>
                      <span>{new Date(res.created_at).toLocaleDateString('vi-VN')}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline text-slate-500">Người đăng: {res.uploaded_by}</span>
                    </div>
                  </div>
                  <div className="text-slate-300 group-hover:text-blue-500 transition-colors shrink-0">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Analytics Summary */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-xl">
                <TrendingUp size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Tình trạng tương tác</p>
                <p className="text-sm text-slate-200 mt-0.5">Tài liệu đã được tải và tương tác với hiệu quả cao.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center sm:text-right">
                <p className="text-xs text-slate-400">Xem nhiều nhất</p>
                <p className="text-lg font-bold text-blue-400">{totalViews} lượt</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs text-slate-400">Tải nhiều nhất</p>
                <p className="text-lg font-bold text-emerald-400">{totalDownloads} lượt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action & Grade Navigation */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
            <h3 className="text-lg font-bold text-slate-900">Thao tác nhanh</h3>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
            <button 
              onClick={() => onNavigate('upload')} 
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-md shadow-blue-100 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <UploadCloud size={18} /> Đăng tải tài liệu mới lên
            </button>
            <button 
              onClick={() => { setActiveGradeFilter('all'); onNavigate('library'); }} 
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer"
            >
              <Search size={18} /> Tìm học tập / đề kiểm tra
            </button>
            
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Phân loại khối giảng dạy</p>
              <div className="grid grid-cols-1 gap-2">
                {GRADES.map(g => (
                  <button 
                    key={g.id} 
                    onClick={() => { setActiveGradeFilter(g.id); onNavigate('library'); }} 
                    className="w-full text-left px-4 py-3 bg-slate-50/50 hover:bg-blue-50/80 hover:text-blue-700 rounded-xl text-slate-700 border border-slate-100 hover:border-blue-200/50 transition-all font-semibold text-sm flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                      <span>{g.name}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 group-hover:text-blue-600 bg-white border border-slate-100 px-2.5 py-1 rounded-full shrink-0">
                      {resources.filter(r => r.grade_id === g.id).length} học liệu
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex gap-3 text-amber-900 text-xs leading-relaxed">
              <ShieldAlert className="text-amber-500 shrink-0" size={18} />
              <div>
                <span className="font-bold">Lưu ý bảo mật:</span> Mọi học liệu được đăng lên sẽ qua quá trình tự động kiểm tra mã độc và tuân thủ các quy tắc bản quyền học tập số hóa.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

/* Mini Helper Component for StatCard */
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  color: string;
  accent: 'blue' | 'orange' | 'red' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, accent }) => {
  const getAccentColors = () => {
    switch (accent) {
      case 'blue':
        return 'border-blue-100 bg-blue-50/40 text-blue-600';
      case 'orange':
        return 'border-orange-100 bg-orange-50/40 text-orange-600';
      case 'red':
        return 'border-red-100 bg-red-50/40 text-red-600';
      case 'purple':
        return 'border-purple-100 bg-purple-50/40 text-purple-600';
    }
  };

  return (
    <div className={`bg-white p-4 sm:p-5 rounded-2xl border ${getAccentColors().split(' ')[0]} shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4`}>
      <div className={`w-11 sm:w-12 h-11 sm:h-12 rounded-xl ${color} flex items-center justify-center text-white shrink-0 shadow-lg`}>
        <Icon size={22} className="sm:size-24" />
      </div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm font-semibold text-slate-500 truncate">{title}</p>
        <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
};
