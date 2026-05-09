import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Moon } from 'lucide-react';
import { useDreamStore } from '@/stores/dreamStore';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { dreams, loadDreams } = useDreamStore();

  useEffect(() => {
    loadDreams();
  }, [loadDreams]);

  const sortedDreams = [...dreams].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const today = new Date();
  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 6) return '凌晨好';
    if (hour < 12) return '早上好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  const handleDreamClick = (dreamId: string) => {
    navigate(`/dream/${dreamId}`);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="sticky top-0 z-40 bg-zinc-50/80 backdrop-blur-3xl">
        <div className="px-6 pt-14 pb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {getGreeting()}
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {dreams.length === 0 ? '记录你的第一个梦境' : `${dreams.length} 个梦境记录`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-6 pb-36">
        {dreams.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="pt-20"
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-zinc-100 flex items-center justify-center">
                <Moon className="w-10 h-10 text-zinc-400" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-2">
                还没有梦境记录
              </h2>
              <p className="text-sm text-zinc-500 mb-8">
                点击右下角按钮开始记录
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200" />
            
            <div className="space-y-8 pl-6">
              {sortedDreams.map((dream, index) => {
                const date = new Date(dream.date);
                
                return (
                  <motion.div
                    key={dream.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    <div className="absolute left-[-25px] top-0 w-3 h-3 bg-zinc-900" />
                    
                    <motion.div
                      onClick={() => handleDreamClick(dream.id)}
                      whileTap={{ scale: 0.98 }}
                      className="cursor-pointer"
                    >
                      <div>
                        <span className="text-xs font-medium text-zinc-500 mb-2 block">
                          {date.getMonth() + 1}月{date.getDate()}日
                        </span>
                        
                        {dream.generatedImage ? (
                          <div className="relative overflow-hidden">
                            <img
                              src={dream.generatedImage}
                              alt=""
                              className="w-full aspect-[16/9] object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <p className="text-sm text-white/90 leading-relaxed line-clamp-2">
                                {dream.description}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white p-4 shadow-sm border border-zinc-100">
                            <p className="text-sm text-zinc-600 leading-relaxed">
                              {dream.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="fixed bottom-24 right-6 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate('/record')}
          className="w-14 h-14 rounded-2xl bg-zinc-900 text-white shadow-xl shadow-zinc-900/30 flex items-center justify-center"
        >
          <Plus className="w-7 h-7" strokeWidth={2.5} />
        </motion.button>
      </motion.div>
    </div>
  );
};
