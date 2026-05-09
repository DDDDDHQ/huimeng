import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Moon, Calendar, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useDreamStore } from '@/stores/dreamStore';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { dreams, loadDreams } = useDreamStore();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadDreams();
  }, [loadDreams]);

  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  const getMonthData = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const data: number[] = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const count = dreams.filter(d => d.date === dateStr).length;
      data.push(count);
    }
    
    return { data, firstDay: adjustedFirstDay };
  };

  const { data: monthData, firstDay } = getMonthData();

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-zinc-100';
    if (count === 1) return 'bg-zinc-300';
    if (count === 2) return 'bg-zinc-500';
    return 'bg-zinc-700';
  };

  const sortedDreams = [...dreams].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    const now = new Date();
    const isCurrentMonth = currentYear === now.getFullYear() && currentMonth === now.getMonth();
    if (!isCurrentMonth) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const now = new Date();
  const isCurrentMonth = currentYear === now.getFullYear() && currentMonth === now.getMonth();
  const canGoNext = !isCurrentMonth;

  return (
    <div className="min-h-screen bg-zinc-50 pb-32">
      <div className="px-6 pt-14 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            我的
          </h1>
          <p className="text-sm text-zinc-500 mt-1">{dreams.length} 个梦境记录</p>
        </motion.div>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-900">{currentYear}年 {monthNames[currentMonth]}</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              disabled={!canGoNext}
              className={`p-1 transition-colors ${
                canGoNext ? 'hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900' : 'text-zinc-200 cursor-not-allowed'
              }`}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {['一', '二', '三', '四', '五', '六', '日'].map((day, i) => (
            <div key={i} className="h-3 flex items-center justify-center">
              <span className="text-[8px] text-zinc-400">{day}</span>
            </div>
          ))}
          
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-3" />
          ))}
          
          {monthData.map((count, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.006 }}
              className={`h-3 rounded-sm ${getIntensityClass(count)}`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-zinc-400">
            {monthData.filter(d => d > 0).length} 天有记录
          </span>
          <div className="flex items-center space-x-1">
            <span className="text-[9px] text-zinc-400 mr-1">少</span>
            <div className="w-2 h-2 rounded-sm bg-zinc-100" />
            <div className="w-2 h-2 rounded-sm bg-zinc-300" />
            <div className="w-2 h-2 rounded-sm bg-zinc-500" />
            <div className="w-2 h-2 rounded-sm bg-zinc-700" />
            <span className="text-[9px] text-zinc-400 ml-1">多</span>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">记录</h2>
            {sortedDreams.length > 0 && (
              <button
                onClick={() => navigate('/records')}
                className="text-sm text-zinc-500 flex items-center space-x-1"
              >
                <span>查看全部</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {sortedDreams.length === 0 ? (
            <div className="bg-white p-8 shadow-sm border border-zinc-100 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-zinc-100 flex items-center justify-center">
                <Moon className="w-8 h-8 text-zinc-400" />
              </div>
              <p className="text-sm text-zinc-500">还没有记录</p>
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6">
              {sortedDreams.slice(0, 6).map((dream) => (
                <motion.div
                  key={dream.id}
                  onClick={() => navigate(`/dream/${dream.id}`)}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 w-36 cursor-pointer"
                >
                  {dream.generatedImage ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={dream.generatedImage}
                        alt=""
                        className="w-full aspect-[3/4] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="bg-white p-4 shadow-sm border border-zinc-100 h-36 flex flex-col justify-center">
                      <p className="text-xs text-zinc-500 text-center line-clamp-2">
                        {dream.description}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">设置</h2>
          
          <div className="bg-white shadow-sm border border-zinc-100 overflow-hidden">
            <button
              onClick={() => navigate('/settings/api')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
            >
              <span className="text-sm text-zinc-900">API 配置</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-zinc-400">管理 AI 密钥</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </div>
            </button>
            <div className="h-px bg-zinc-100" />
            <button
              onClick={() => navigate('/settings/style')}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
            >
              <span className="text-sm text-zinc-900">默认风格</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-zinc-400">设置生成风格</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </div>
            </button>
          </div>
        </div>

        <div className="pt-4 text-center">
          <p className="text-xs text-zinc-400">绘梦 v1.0.0</p>
        </div>
      </div>
    </div>
  );
};
