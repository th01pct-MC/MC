import React, { useState } from 'react';
import { BookOpen, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { User as UserType } from '../types';

interface LoginScreenProps {
  onLogin: (user: UserType) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('th01pct@gmail.com');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('Cô Hà Thị Minh Châu');
  const [error] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Default avatar based on selection or random
    const avatar = email.includes('chau') || name.includes('Châu') 
      ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80';

    onLogin({
      id: email === 'th01pct@gmail.com' ? 'u1' : 'u2',
      name: name,
      email: email,
      role: 'teacher',
      avatar: avatar
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        
        {/* Background gradient blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60 transform translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-60 transform -translate-x-12 translate-y-12"></div>

        <div className="relative text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mb-4 transform hover:scale-105 transition-transform duration-300">
            <BookOpen size={36} className="animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">EduResource</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">Hệ thống kho học liệu số bám sát GDPT Tin học</p>
        </div>

        <form className="mt-8 space-y-6 relative" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Họ và tên giáo viên</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên giáo viên..."
                  className="appearance-none block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email giáo viên</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="th01pct@gmail.com"
                  className="appearance-none block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="appearance-none block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-lg cursor-pointer"
              />
              <label htmlFor="remember_me" className="ml-2 block text-slate-600 cursor-pointer select-none">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <a href="#" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              Quên mật khẩu?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform active:scale-95 transition-all text-center leading-tight cursor-pointer"
            >
              Đăng nhập hệ thống
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
            <span>EduResource Demo • Mở cổng truy cập thử nghiệm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
