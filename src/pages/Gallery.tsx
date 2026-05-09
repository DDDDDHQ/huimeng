import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDreamStore } from '@/stores/dreamStore';
import { DreamGallery } from '@/components/dreams/DreamGallery';

export const Gallery: React.FC = () => {
  const { dreams, loadDreams } = useDreamStore();

  useEffect(() => {
    loadDreams();
  }, [loadDreams]);

  const dreamsWithImages = dreams.filter((d) => d.generatedImage);

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-5 pt-12 pb-6"
      >
        <h1 className="page-title">梦境画廊</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {dreamsWithImages.length} 幅AI画作
        </p>
      </motion.div>

      <div className="px-5">
        <DreamGallery dreams={dreamsWithImages} />
      </div>
    </div>
  );
};
