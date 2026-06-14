import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Eye, Download, Info, BookOpen, Filter, X, 
  ChevronRight, Calendar, Heart, ShieldQuestion
} from 'lucide-react';
import { Resource, Grade, Topic, Lesson } from '../types';
import { GRADES, TOPICS, LESSONS, RESOURCE_TYPES } from '../data';
import { ResourceIcon } from './ResourceIcon';

interface LibraryViewProps {
  resources: Resource[];
  gradeFilter: string;
  onNavigate: (view: string, resource?: any) => void;
  onDeleteResource?: (id: string) => void;
  currentUser?: any;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ 
  resources, 
  gradeFilter, 
  onNavigate,
  onDeleteResource,
  currentUser
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedTopicId, setSelectedTopicId] = useState('all');
  const [selectedLessonId, setSelectedLessonId] = useState('all');

  // If grade filter changes, reset the topic and lesson filters
  React.useEffect(() => {
    setSelectedTopicId('all');
    setSelectedLessonId('all');
  }, [gradeFilter]);

  // Dynamically filter Topics based on current Grade
  const filteredTopics = useMemo(() => {
    if (gradeFilter === 'all') return [];
    return TOPICS.filter(topic => topic.grade_id === gradeFilter);
  }, [gradeFilter]);

  // Dynamically filter Lessons of selected Topic
  const filteredLessons = useMemo(() => {
    if (selectedTopicId === 'all') return [];
    return LESSONS.filter(lesson => lesson.topic_id === selectedTopicId);
  }, [selectedTopicId]);

  // Full resource filter calculation
  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchGrade = gradeFilter === 'all' || res.grade_id === gradeFilter;
      const matchType = typeFilter === 'all' || res.resource_type_id === typeFilter;
      const matchTopic = selectedTopicId === 'all' || res.topic_id === selectedTopicId;
      const matchLesson = selectedLessonId === 'all' || res.lesson_id === selectedLessonId;
      
      const searchLower = searchTerm.toLowerCase();
      const matchSearch = res.title.toLowerCase().includes(searchLower) || 
                          res.description.toLowerCase().includes(searchLower) ||
                          (res.file_name && res.file_name.toLowerCase().includes(searchLower));
      
      return matchGrade && matchType && matchTopic && matchLesson && matchSearch;
    });
  }, [resources, gradeFilter, typeFilter, selectedTopicId, selectedLessonId, searchTerm]);

  const activeGrade = GRADES.find(g => g.id === gradeFilter);
  const gradeTitle = activeGrade ? activeGrade.name : 'Tất cả khối lớp';

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

  const handleResetFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setSelectedTopicId('all');
    setSelectedLessonId('all');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
            <BookOpen size={14} /> Thư viện học liệu
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">{gradeTitle}</h2>
          <p className="text-sm text-slate-500 font-medium">Đang hiển thị {filteredResources.length} của {resources.length} tài nguyên học liệu</p>
        </div>
        <button 
          onClick={() => onNavigate('upload')} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-100 transition-all active:scale-95 cursor-pointer"
        >
          <Plus size={18} /> Thêm tài liệu mới
        </button>
      </div>

      {/* Advanced Filters Block */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Keyword Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm bài giảng, mã nguồn Python, từ khóa đề thi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-slate-900"
            />
          </div>

          {/* Resource Type Filter */}
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-60 px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:border-blue-500 outline-none text-slate-700"
          >
            <option value="all">Tất cả định dạng</option>
            {RESOURCE_TYPES.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Topic & Lesson filtering (Only if specific grade is selected) */}
        {gradeFilter !== 'all' && (
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Topic dropdown */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chủ đề bài học</label>
              <select
                value={selectedTopicId}
                onChange={(e) => {
                  setSelectedTopicId(e.target.value);
                  setSelectedLessonId('all'); // reset lesson
                }}
                className="w-full px-3 py-2 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="all">Từng chủ đề / Tổng hợp chương</option>
                {filteredTopics.map(topic => (
                  <option key={topic.id} value={topic.id}>{topic.name}</option>
                ))}
              </select>
            </div>

            {/* Lesson dropdown */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bài học cụ thể</label>
              <select
                value={selectedLessonId}
                disabled={selectedTopicId === 'all'}
                onChange={(e) => setSelectedLessonId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 disabled:opacity-50"
              >
                {selectedTopicId === 'all' ? (
                  <option value="all">Chọn chủ đề trước...</option>
                ) : (
                  <>
                    <option value="all">Tất cả bài học thuộc chủ đề này</option>
                    {filteredLessons.map(lesson => (
                      <option key={lesson.id} value={lesson.id}>{lesson.name}</option>
                    ))}
                  </>
                )}
              </select>
            </div>

          </div>
        )}

        {/* Clear active filter indicators if any of them are active */}
        {(searchTerm || typeFilter !== 'all' || selectedTopicId !== 'all' || selectedLessonId !== 'all') && (
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                <Filter size={12} /> Bộ lọc đang kích hoạt:
              </span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                  Từ khóa: "{searchTerm}"
                  <X size={12} className="cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => setSearchTerm('')} />
                </span>
              )}
              {typeFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                  {getResourceTypeDetails(typeFilter).name}
                  <X size={12} className="cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => setTypeFilter('all')} />
                </span>
              )}
              {selectedTopicId !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 truncate max-w-xs">
                  {TOPICS.find(t => t.id === selectedTopicId)?.name.split(':')[0]}
                  <X size={12} className="cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => setSelectedTopicId('all')} />
                </span>
              )}
            </div>
            <button 
              onClick={handleResetFilters} 
              className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer shrink-0"
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Grid List of Resources */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(res => {
            const details = getResourceTypeDetails(res.resource_type_id);
            const gradeName = GRADES.find(g => g.id === res.grade_id)?.name || 'Học liệu chung';
            
            return (
              <div 
                key={res.id} 
                onClick={() => onNavigate('detail', res)} 
                className="bg-white rounded-2xl border border-slate-150 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer group flex flex-col h-full overflow-hidden relative"
              >
                {/* Visual Header */}
                <div className="p-5 flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl ${details.bg} ${details.border} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <ResourceIcon name={details.iconName} className={details.color} size={24} />
                    </div>
                    <span className="text-[10px] font-extrabold tracking-wider uppercase bg-slate-100 text-slate-500 px-3 py-1 rounded-full border border-slate-200">
                      {gradeName.split(' ')[2] ? `Khối ${gradeName.split(' ')[2]}` : gradeName}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 line-clamp-2 leading-relaxed text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-200">
                      {res.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>
                  </div>
                </div>

                {/* Meta details footer */}
                <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/55 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-slate-500"><Eye size={14} className="text-slate-400" /> {res.view_count}</span>
                    <span className="flex items-center gap-1 font-semibold text-slate-500"><Download size={14} className="text-slate-400" /> {res.download_count}</span>
                    <span className="flex items-center gap-1 font-semibold text-slate-500"><Heart size={14} className="text-slate-400 fill-slate-50" /> {res.likes || 0}</span>
                  </div>
                  <span className="font-bold text-slate-700 bg-white border border-slate-100 px-2 py-0.5 rounded-md">{res.file_size}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="mx-auto w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100">
            <ShieldQuestion size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Không tìm thấy tài nguyên nào</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
              Không tìm thấy mục nào tương thích với bộ lọc tìm kiếm hiện tại. Bạn có thể thử đặt lại bộ lọc để tìm kiếm rộng hơn.
            </p>
          </div>
          <button 
            onClick={handleResetFilters}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            Nhập lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
