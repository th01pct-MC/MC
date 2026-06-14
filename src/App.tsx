import React, { useState, useEffect } from 'react';
import { 
  Home, BookOpen, UploadCloud, Folder, BarChart3, Settings, 
  LogOut, Search, Menu, X, Library, AlertCircle, HelpCircle, 
  CheckCircle, Plus, FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Sub components
import { LoginScreen } from './components/LoginScreen';
import { DashboardView } from './components/DashboardView';
import { LibraryView } from './components/LibraryView';
import { DetailView } from './components/DetailView';
import { UploadView } from './components/UploadView';
import { StatsView } from './components/StatsView';
import { SettingsView } from './components/SettingsView';

// Types and static database values
import { Resource, User } from './types';
import { GRADES, INITIAL_RESOURCES } from './data';

export default function App() {
  // Global React states
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('edu_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentView, setCurrentView] = useState<string>(() => {
    return localStorage.getItem('edu_view') || 'dashboard';
  });

  const [activeGradeFilter, setActiveGradeFilter] = useState<string>(() => {
    return localStorage.getItem('edu_grade_filter') || 'all';
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('edu_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [selectedResource, setSelectedResource] = useState<Resource | null>(() => {
    const saved = localStorage.getItem('edu_selected_res');
    return saved ? JSON.parse(saved) : null;
  });

  // Global search from top bar
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  // Mobile menu control toggles
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('edu_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('edu_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('edu_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('edu_grade_filter', activeGradeFilter);
  }, [activeGradeFilter]);

  useEffect(() => {
    localStorage.setItem('edu_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    if (selectedResource) {
      localStorage.setItem('edu_selected_res', JSON.stringify(selectedResource));
    } else {
      localStorage.removeItem('edu_selected_res');
    }
  }, [selectedResource]);

  // Auth Handler
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedResource(null);
    setCurrentView('dashboard');
    setActiveGradeFilter('all');
    localStorage.removeItem('edu_user');
    localStorage.removeItem('edu_view');
    localStorage.removeItem('edu_selected_res');
  };

  // Profile upgrader
  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  // View navigation helper
  const navigate = (view: string, resource: Resource | null = null) => {
    setCurrentView(view);
    if (resource) {
      setSelectedResource(resource);
    } else {
      setSelectedResource(null);
    }
    setMobileMenuOpen(false); // close mobile sidebar if open
  };

  // State modifier handlers for downloads, likes and views
  const handleLikeResource = (resourceId: string) => {
    setResources(prev => prev.map(res => {
      if (res.id === resourceId) {
        const isLikedAlready = (res as any).likedByUser;
        return {
          ...res,
          likes: (res.likes || 0) + (isLikedAlready ? -1 : 1),
          likedByUser: !isLikedAlready
        } as any;
      }
      return res;
    }));

    // If active selected resource, sync its state too
    if (selectedResource?.id === resourceId) {
      setSelectedResource(prev => {
        if (!prev) return null;
        const isLikedAlready = (prev as any).likedByUser;
        return {
          ...prev,
          likes: (prev.likes || 0) + (isLikedAlready ? -1 : 1),
          likedByUser: !isLikedAlready
        } as any;
      });
    }
  };

  const handleIncrementDownload = (resourceId: string) => {
    setResources(prev => prev.map(res => {
      if (res.id === resourceId) {
        return {
          ...res,
          download_count: res.download_count + 1
        };
      }
      return res;
    }));

    if (selectedResource?.id === resourceId) {
      setSelectedResource(prev => prev ? {
        ...prev,
        download_count: prev.download_count + 1
      } : null);
    }
  };

  const handleIncrementView = (resourceId: string) => {
    setResources(prev => prev.map(res => {
      if (res.id === resourceId) {
        return {
          ...res,
          view_count: res.view_count + 1
        };
      }
      return res;
    }));

    if (selectedResource?.id === resourceId) {
      setSelectedResource(prev => prev ? {
        ...prev,
        view_count: prev.view_count + 1
      } : null);
    }
  };

  // Delete Resource handler (for teacher administration mockup)
  const handleDeleteResource = (resourceId: string) => {
    if (window.confirm('Bạn có thực sự muốn xóa học liệu này ra khỏi hệ thống nhà trường?')) {
      setResources(prev => prev.filter(r => r.id !== resourceId));
      if (selectedResource?.id === resourceId) {
        setSelectedResource(null);
        setCurrentView('library');
      }
    }
  };

  // Submit new uploaded file helper
  const handleAddNewResource = (newRes: Resource) => {
    setResources(prev => [newRes, ...prev]);
    setCurrentView('library');
  };

  // Redirect top search keywords down to LibraryView with search keywords loaded
  const handleGlobalSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCurrentView('library');
      setActiveGradeFilter('all');
    }
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-850 overflow-hidden">
      
      {/* Dynamic Animated Mobile Sidebar Slider Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-slate-900/60 z-30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Navigation sidebar desk card */}
      <aside className="w-68 bg-white border-r border-slate-200 flex flex-col hidden md:flex h-full">
        <div className="p-6 pb-5 flex items-center gap-3 border-b border-slate-100">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-md shadow-blue-100">
            <BookOpen size={22} className="animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight text-slate-950 tracking-tight">EduResource</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Học liệu Tin học mới</p>
          </div>
        </div>

        {/* Sidebar Nav section links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <NavItem 
            icon={Home} 
            label="Tổng quan học vụ" 
            active={currentView === 'dashboard'} 
            onClick={() => navigate('dashboard')} 
          />
          
          <div className="pt-5 pb-2">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Danh mục khối lớp</p>
          </div>
          <NavItem 
            icon={Folder} 
            label="Tất cả học liệu" 
            active={currentView === 'library' && activeGradeFilter === 'all'} 
            onClick={() => { setActiveGradeFilter('all'); navigate('library'); }} 
          />
          {GRADES.map(grade => (
            <NavItem 
              key={grade.id} 
              icon={Folder} 
              label={grade.name} 
              active={currentView === 'library' && activeGradeFilter === grade.id} 
              onClick={() => { setActiveGradeFilter(grade.id); navigate('library'); }} 
            />
          ))}

          <div className="pt-5 pb-2">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hành động</p>
          </div>
          <NavItem 
            icon={UploadCloud} 
            label="Tải tài liệu lên" 
            active={currentView === 'upload'} 
            onClick={() => navigate('upload')} 
          />
          <NavItem 
            icon={BarChart3} 
            label="Thống kê hiệu quả" 
            active={currentView === 'stats'} 
            onClick={() => navigate('stats')} 
          />
          <NavItem 
            icon={Settings} 
            label="Thiết lập hệ thống" 
            active={currentView === 'settings'} 
            onClick={() => navigate('settings')} 
          />
        </nav>

        {/* Profile Card Footer block */}
        <div className="p-4 border-t border-slate-150 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4 p-1.5 bg-white rounded-xl border border-slate-100">
            <img 
              src={currentUser.avatar} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border border-blue-100 bg-slate-250 shrink-0" 
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-950 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 font-bold truncate">Giáo viên Tin học</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center w-full gap-2 px-3 py-2.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={14} /> Đăng xuất tài khoản
          </button>
        </div>
      </aside>

      {/* Slide Mobile Menu drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-72 bg-white flex flex-col z-40 md:hidden shadow-2xl h-full border-r border-slate-200"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg text-white">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h1 className="font-bold text-base text-slate-950 tracking-tight">EduResource</h1>
                  <p className="text-[10px] text-slate-400 font-bold">Thư viện phổ thông</p>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              <NavItem 
                icon={Home} 
                label="Tổng quan học vụ" 
                active={currentView === 'dashboard'} 
                onClick={() => navigate('dashboard')} 
              />
              <div className="pt-4 pb-2">
                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Danh mục khối lớp</p>
              </div>
              <NavItem 
                icon={Folder} 
                label="Tất cả học liệu" 
                active={currentView === 'library' && activeGradeFilter === 'all'} 
                onClick={() => { setActiveGradeFilter('all'); navigate('library'); }} 
              />
              {GRADES.map(grade => (
                <NavItem 
                  key={grade.id} 
                  icon={Folder} 
                  label={grade.name} 
                  active={currentView === 'library' && activeGradeFilter === grade.id} 
                  onClick={() => { setActiveGradeFilter(grade.id); navigate('library'); }} 
                />
              ))}
              <div className="pt-4 pb-2">
                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hành động</p>
              </div>
              <NavItem 
                icon={UploadCloud} 
                label="Tải tài liệu lên" 
                active={currentView === 'upload'} 
                onClick={() => navigate('upload')} 
              />
              <NavItem 
                icon={BarChart3} 
                label="Thống kê hiệu quả" 
                active={currentView === 'stats'} 
                onClick={() => navigate('stats')} 
              />
              <NavItem 
                icon={Settings} 
                label="Thiết lập hệ thống" 
                active={currentView === 'settings'} 
                onClick={() => navigate('settings')} 
              />
            </nav>

            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3 mb-3 p-1.5 bg-white rounded-lg border border-slate-100">
                <img src={currentUser.avatar} alt="Avatar" className="w-9 h-9 rounded-full bg-slate-250 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout} 
                className="flex items-center justify-center w-full gap-2 px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={14} /> Đăng xuất
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Container Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header navbar panel */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 relative z-20">
          
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors md:hidden cursor-pointer"
            >
              <Menu size={20} />
            </button>

            {/* Simulated instant global search mapping */}
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Tìm bài giảng, đề thi... Nhấn Enter để chuyển trang" 
                value={globalSearchTerm}
                onChange={e => setGlobalSearchTerm(e.target.value)}
                onKeyDown={handleGlobalSearchKeyPress}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-150/60 focus:bg-white border-transparent focus:border-blue-500 text-xs font-semibold rounded-xl focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('upload')} 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <Plus size={14} /> Đăng tài liệu
            </button>

            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse hidden xs:inline" />
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider hidden xs:inline">
              Trực tuyến v3.5
            </span>
          </div>

        </header>

        {/* Dynamic Frame Display scroll box */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth bg-slate-50/50">
          
          {/* Transition wrapper */}
          <div className="h-full">
            {currentView === 'dashboard' && (
              <DashboardView 
                resources={resources} 
                onNavigate={navigate} 
                setActiveGradeFilter={setActiveGradeFilter}
              />
            )}
            
            {currentView === 'library' && (
              <LibraryView 
                resources={resources} 
                gradeFilter={activeGradeFilter} 
                onNavigate={navigate}
                onDeleteResource={handleDeleteResource}
                currentUser={currentUser}
              />
            )}
            
            {currentView === 'upload' && (
              <UploadView 
                onUpload={handleAddNewResource} 
                currentUser={currentUser}
              />
            )}
            
            {currentView === 'detail' && selectedResource && (
              <DetailView 
                resource={selectedResource} 
                onBack={() => navigate('library')}
                onLikeResource={handleLikeResource}
                onIncrementDownload={handleIncrementDownload}
                onIncrementView={handleIncrementView}
              />
            )}

            {currentView === 'stats' && (
              <StatsView resources={resources} />
            )}

            {currentView === 'settings' && (
              <SettingsView 
                currentUser={currentUser} 
                onUpdateUser={handleUpdateUser} 
              />
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

/* Sidebar NavItem Helper Component */
interface NavItemProps {
  icon: React.ComponentType<any>;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
        active 
          ? 'bg-blue-600 text-white font-extrabold shadow-md shadow-blue-200/50 hover:bg-blue-600' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-semibold text-xs'
      }`}
    >
      <Icon size={18} className={active ? 'text-white' : 'text-slate-400'} />
      <span className="text-xs tracking-tight">{label}</span>
    </button>
  );
};
