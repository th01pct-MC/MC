import React from 'react';
import { BarChart3, TrendingUp, Users, FolderCheck, Calendar, BookOpen, Clock, Heart, Eye, Download } from 'lucide-react';
import { Resource } from '../types';
import { GRADES, RESOURCE_TYPES } from '../data';

interface StatsViewProps {
  resources: Resource[];
}

export const StatsView: React.FC<StatsViewProps> = ({ resources }) => {
  // Aggregate Stats
  const totalResources = resources.length;
  const totalViews = resources.reduce((acc, r) => acc + r.view_count, 0);
  const totalDownloads = resources.reduce((acc, r) => acc + r.download_count, 0);
  const totalLikes = resources.reduce((acc, r) => acc + (r.likes || 0), 0);

  // Group by format
  const formatBreakdown = RESOURCE_TYPES.map(type => {
    const list = resources.filter(r => r.resource_type_id === type.id);
    const count = list.length;
    const percentage = totalResources > 0 ? Math.round((count / totalResources) * 100) : 0;
    const views = list.reduce((acc, r) => acc + r.view_count, 0);
    return {
      ...type,
      count,
      percentage,
      views
    };
  }).sort((a, b) => b.count - a.count);

  // Group by grade
  const gradeBreakdown = GRADES.map(grade => {
    const list = resources.filter(r => r.grade_id === grade.id);
    const count = list.length;
    const views = list.reduce((acc, r) => acc + r.view_count, 0);
    const downloads = list.reduce((acc, r) => acc + r.download_count, 0);
    return {
      ...grade,
      count,
      views,
      downloads
    };
  });

  // Top resources based on downloads
  const topDownloaded = [...resources]
    .sort((a, b) => b.download_count - a.download_count)
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans">
      <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
        <BarChart3 size={14} /> Thống kê quản trị 
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Thống kê & Hiệu năng sử dụng học liệu</h2>
        <p className="text-sm text-slate-500 font-medium mt-0.5">
          Theo dõi tổng số lượt chia sẻ, lượng tải xuống và mật độ đóng góp giáo bồi của các khối lớp học.
        </p>
      </div>

      {/* Grid counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Học liệu lưu trữ</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-slate-900">{totalResources}</span>
            <span className="text-xs text-slate-500">tập tin</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Lượt xem bài giảng</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-blue-600">{totalViews}</span>
            <span className="text-xs text-slate-500">truy cập</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Lượt tải tài liệu</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-emerald-600">{totalDownloads}</span>
            <span className="text-xs text-slate-500">lần lưu</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Lượt biểu thích</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-rose-500">{totalLikes}</span>
            <span className="text-xs text-slate-500 font-semibold">yêu thích</span>
          </div>
        </div>
      </div>

      {/* Breakdown blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Resource format breakdowns */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2">
            <FolderCheck size={18} className="text-blue-500" />
            <h3 className="text-base font-bold text-slate-950">Phân bố cơ cấu định dạng học liệu</h3>
          </div>
          <div className="space-y-4 pt-2">
            {formatBreakdown.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.bg.replace('bg-', 'bg-')}`}></span>
                    {item.name}
                  </span>
                  <span>{item.count} file ({item.percentage}%)</span>
                </div>
                {/* Custom CSS Progress line */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grade summary card stats */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-indigo-500" />
            <h3 className="text-base font-bold text-slate-950">Độ phủ các khối lớp</h3>
          </div>
          <div className="space-y-4 pt-2 divide-y divide-slate-100">
            {gradeBreakdown.map((grade, idx) => (
              <div key={grade.id} className={`pt-3 ${idx === 0 ? 'pt-0' : ''} space-y-1 text-xs`}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{grade.name}</span>
                  <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">{grade.count} học liệu</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><Eye size={12} /> {grade.views} xem</span>
                  <span className="flex items-center gap-1"><Download size={12} /> {grade.downloads} tải</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Downloads Table list */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-emerald-500" />
          <h3 className="text-base font-bold text-slate-950">Top 5 học liệu được sử dụng tải xuống nhiều nhất</h3>
        </div>
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-2.5 pb-2">Tên học liệu</th>
                <th className="py-2.5 pb-2">Khối lớp</th>
                <th className="py-2.5 pb-2 text-right">Lượt tải</th>
                <th className="py-2.5 pb-2 text-right">Lượt xem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {topDownloaded.map((res) => {
                const grade = GRADES.find(g => g.id === res.grade_id);
                return (
                  <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-bold text-slate-900 truncate max-w-sm" title={res.title}>{res.title}</td>
                    <td className="py-3 text-slate-500">{grade ? grade.name : 'Chung'}</td>
                    <td className="py-3 text-right text-emerald-600 font-bold">{res.download_count} lần</td>
                    <td className="py-3 text-right text-slate-500">{res.view_count} xem</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
