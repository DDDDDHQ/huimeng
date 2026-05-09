import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Edit2, Share2, Search } from 'lucide-react';
import { useDreamStore } from '@/stores/dreamStore';
import { InterpretationButton } from '@/components/dreams/InterpretationButton';
import { ShareSheet } from '@/components/common/ShareSheet';
import { shareService } from '@/services/shareService';
import { DreamInterpretation } from '@/types';

export const DreamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dreams, loadDreams, deleteDream, updateDream } = useDreamStore();
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    loadDreams();
  }, [loadDreams]);

  const dream = dreams.find((d) => d.id === id);

  if (!dream) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-zinc-100 flex items-center justify-center">
            <Search className="w-10 h-10 text-zinc-400" />
          </div>
          <p className="text-lg text-zinc-500">未找到该梦境记录</p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('确定要删除这个梦境记录吗？')) {
      deleteDream(dream.id);
      navigate('/');
    }
  };

  const handleEdit = () => {
    navigate(`/record/edit/${dream.id}`);
  };

  const handleInterpretationGenerated = (newInterpretation: DreamInterpretation) => {
    updateDream(dream.id, { interpretation: newInterpretation });
  };

  const shareContent = shareService.generateShareContent(dream);
  const date = new Date(dream.date);

  return (
    <div className="min-h-screen pb-40 bg-zinc-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 z-10 bg-zinc-50/80 backdrop-blur-3xl border-b border-zinc-200/50"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-zinc-100 text-zinc-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center text-zinc-900">梦境详情</h1>
          <div className="flex items-center space-x-1">
            <button
              onClick={handleEdit}
              className="p-2 hover:bg-zinc-100 text-zinc-600 transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-red-50 text-zinc-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 py-6 space-y-6"
      >
        {dream.generatedImage && (
          <div className="relative overflow-hidden bg-zinc-100">
            <img
              src={dream.generatedImage}
              alt=""
              className="w-full aspect-square object-cover"
            />
          </div>
        )}

        <div className="bg-white p-6 shadow-sm border border-zinc-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                {date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                {date.toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-base text-zinc-700 leading-relaxed whitespace-pre-wrap">
                {dream.description}
              </p>
            </div>

            {dream.keywords.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-3">关键词</h3>
                <div className="flex flex-wrap gap-2">
                  {dream.keywords.map((keyword, index) => (
                    <span key={index} className="px-3 py-1.5 text-xs bg-zinc-100 text-zinc-600">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <InterpretationButton
          dream={dream}
          onInterpretationGenerated={handleInterpretationGenerated}
        />
      </motion.div>

      <div className="fixed bottom-24 left-6 right-6 z-40">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setShowShare(true)}
          className="w-full h-14 bg-zinc-900 text-white font-medium flex items-center justify-center space-x-2 shadow-xl shadow-zinc-900/30"
        >
          <Share2 className="w-5 h-5" />
          <span>分享梦境</span>
        </motion.button>
      </div>

      <ShareSheet
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        shareContent={shareContent}
      />
    </div>
  );
};
