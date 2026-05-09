import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dream } from '@/types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOOD_LABELS } from '@/utils/dreamUtils';

interface DreamGalleryProps {
  dreams: Dream[];
}

export const DreamGallery: React.FC<DreamGalleryProps> = ({ dreams }) => {
  const [selectedImage, setSelectedImage] = useState<Dream | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    setSelectedIndex((prev) => 
      prev === 0 ? dreams.length - 1 : prev - 1
    );
    setSelectedImage(dreams[selectedIndex === 0 ? dreams.length - 1 : selectedIndex - 1]);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => 
      prev === dreams.length - 1 ? 0 : prev + 1
    );
    setSelectedImage(dreams[selectedIndex === dreams.length - 1 ? 0 : selectedIndex + 1]);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {dreams.map((dream, index) => (
          <motion.div
            key={dream.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedImage(dream);
              setSelectedIndex(index);
            }}
            className="aspect-square rounded-xl overflow-hidden cursor-pointer active:scale-98 transition-transform"
          >
            <img
              src={dream.generatedImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={selectedImage.generatedImage}
                alt=""
                className="w-full rounded-xl"
              />

              <div className="mt-4">
                <p className="text-sm text-white/80 line-clamp-2">
                  {selectedImage.description}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  {selectedImage.moodTags.slice(0, 2).map((mood) => (
                    <span
                      key={mood}
                      className="text-lg"
                    >
                      {MOOD_LABELS[mood].emoji}
                    </span>
                  ))}
                </div>
              </div>

              {dreams.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {dreams.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">🎨</div>
          <p className="text-sm text-neutral-500">还没有生成的梦境画面</p>
        </div>
      )}
    </>
  );
};
