import React, { useState } from 'react';
import { Settings, ShieldCheck, HardDrive, Bell, Eye, Save, Sparkles, HelpCircle } from 'lucide-react';
import { User } from '../types';

interface SettingsViewProps {
  currentUser: User;
  onUpdateUser: (updatedUser: any) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentUser, onUpdateUser }) => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [schoolName, setSchoolName] = useState('Trường THPT Chuyên Quốc Học Huế');
  const [maxUploadSize, setMaxUploadSize] = useState('50MB');
  const [virusChecking, setVirusChecking] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...currentUser,
      name,
      email
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
        <Settings size={14} /> Thiết lập hệ thống
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Cấu hình thư viện số trường học</h2>
        <p className="text-sm text-slate-500 font-medium mt-0.5">
          Tùy chỉnh thông tin tài khoản giáo viên, định mức lưu trữ vật lý tệp tin và các chính sách duyệt tin an toàn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card Summary */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center text-center space-y-4 shadow-sm self-start">
          <img 
            src={currentUser.avatar} 
            alt="Avatar" 
            className="w-20 h-20 rounded-full border-4 border-blue-50 bg-slate-100 shadow-md transform hover:scale-105 transition-transform duration-300"
          />
          <div>
            <h3 className="font-bold text-slate-900 leading-tight">{currentUser.name}</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Giảng viên / Tổ trưởng bộ môn</p>
          </div>
          <div className="w-full pt-4 border-t border-slate-150 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-650">
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <p className="text-slate-400 font-bold uppercase text-[9px]">Tổng upload</p>
              <p className="text-sm font-black text-slate-800 mt-0.5">12 file</p>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <p className="text-slate-400 font-bold uppercase text-[9px]">Dung lượng dùng</p>
              <p className="text-sm font-black text-slate-800 mt-0.5">32.4 MB</p>
            </div>
          </div>
        </div>

        {/* Action Form Customization */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 md:col-span-2 space-y-6 shadow-sm">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-100 flex items-center gap-1.5 animate-pulse">
              <ShieldCheck size={16} /> Lưu cài đặt cá nhân thành công!
            </div>
          )}

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Sparkles className="text-blue-500" size={16} /> Thông tin cá nhân & Đơn vị công tác
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Tên hiển thị</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Email giáo viên</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-500">Trường THPT công tác</label>
                <input 
                  type="text" 
                  value={schoolName}
                  onChange={e => setSchoolName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <HardDrive className="text-indigo-500" size={16} /> Quản trị hạ tầng tải lên
            </h4>

            <div className="space-y-3.5 text-xs text-slate-700 font-semibold">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">Giới hạn định mức dung lượng file tải</p>
                  <p className="text-slate-400 font-medium text-[11px]">Tự động nén tệp PowerPoint/Zip nếu quá ngưỡng.</p>
                </div>
                <select 
                  value={maxUploadSize} 
                  onChange={e => setMaxUploadSize(e.target.value)} 
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                >
                  <option value="20MB">20 MB</option>
                  <option value="50MB">50 MB</option>
                  <option value="100MB">100 MB</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">Quét mã virus tự động</p>
                  <p className="text-slate-400 font-medium text-[11px]">Tự động rà soát Trojan và mã nhúng trong file thực hành .ZIP .PY</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={virusChecking} 
                  onChange={e => setVirusChecking(e.target.checked)} 
                  className="h-4.5 w-4.5 text-blue-500 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">Nhận thông báo khi có thảo luận mới</p>
                  <p className="text-slate-400 font-medium text-[11px]">Báo cáo email định kỳ hàng tuần các bình luận thảo luận.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications} 
                  onChange={e => setNotifications(e.target.checked)} 
                  className="h-4.5 w-4.5 text-blue-500 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <Save size={14} /> Lưu cấu hình
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
