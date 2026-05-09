import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useDreamStore } from '@/stores/dreamStore';
import { DreamForm } from '@/components/dreams/DreamForm';
import { MoodTag, DreamTypeTag, ImageStyle } from '@/types';

export const EditDream: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { dreams, updateDream } = useDreamStore();

  const dream = dreams.find((d) => d.id === id);

  if (!dream) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <p className="text-lg text-neutral-500">未找到该梦境记录</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: {
    date: string;
    description: string;
    moodTags: MoodTag[];
    dreamTypeTags: DreamTypeTag[];
    clarity: number;
    generatedImage?: string;
    imageStyle?: ImageStyle;
    keywords: string[];
  }) => {
    updateDream(dream.id, {
      ...data,
      updatedAt: new Date().toISOString(),
      interpretation: undefined
    });
    
    navigate(`/dream/${dream.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-neutral-200"
      >
        <div className="flex items-center space-x-3 px-5 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-medium text-neutral-900">编辑梦境</h1>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 py-6"
      >
        <DreamForm
          onSubmit={handleSubmit}
          mode="edit"
          initialData={{
            date: dream.date,
            description: dream.description,
            moodTags: dream.moodTags,
            dreamTypeTags: dream.dreamTypeTags,
            clarity: dream.clarity,
            generatedImage: dream.generatedImage,
            imageStyle: dream.imageStyle
          }}
        />
      </motion.div>
    </div>
  );
};
