import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon } from 'lucide-react';
import { useDreamStore } from '@/stores/dreamStore';
import { DREAM_TYPE_LABELS } from '@/utils/dreamUtils';

export const Records: React.FC = () => {
  const navigate = useNavigate();
  const { dreams, loadDreams } = useDreamStore();

  useEffect(() => {
    loadDreams();
  }, [loadDreams]);

  const sortedDreams = [...dreams].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 z-10 bg-zinc-50/80 backdrop-blur-3xl border-b border-zinc-200/50"
      >
        <div className="flex items-center space-x-3 px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-zinc-100 text-zinc-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-zinc-900">全部记录</h1>
          <span className="text-sm text-zinc-400 ml-auto">{dreams.length}</span>
        </div>
      </motion.div>

      <div className="px-6 pt-4">
        {sortedDreams.length === 0 ? (
          <div className="pt-20 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-zinc-100 flex items-center justify-center">
              <Moon className="w-10 h-10 text-zinc-400" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2">还没有记录</h2>
            <p className="text-sm text-zinc-500">开始记录你的第一个梦境吧</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {sortedDreams.map((dream, index) => {
              const date = new Date(dream.date);
              
              return (
                <motion.div
                  key={dream.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => navigate(`/dream/${dream.id}`)}
                  whileTap={{ scale: 0.97 }}
                  className="cursor-pointer"
                >
                  {dream.generatedImage ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={dream.generatedImage}
                        alt=""
                        className="w-full aspect-[3/4] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="text-[10px] text-white/60 mb-1">
                          {date.getMonth() + 1}月{date.getDate()}日
                        </div>
                        <p className="text-xs text-white/90 line-clamp-2 leading-relaxed">
                          {dream.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-4 shadow-sm border border-zinc-100">
                      <div className="text-[10px] text-zinc-400 mb-2">
                        {date.getMonth() + 1}月{date.getDate()}日
                      </div>
                      <p className="text-sm text-zinc-600 line-clamp-3 leading-relaxed">
                        {dream.description}
                      </p>
                      {dream.dreamTypeTags.length > 0 && (
                        <div className="flex items-center space-x-1 mt-3">
                          {dream.dreamTypeTags.slice(0, 2).map((type) => (
                            <span key={type} className="text-xs text-zinc-400">
                              {DREAM_TYPE_LABELS[type].label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
