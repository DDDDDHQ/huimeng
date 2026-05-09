import React from 'react';
import { motion } from 'framer-motion';
import { Dream } from '@/types';
import { useNavigate } from 'react-router-dom';
import { MOOD_LABELS } from '@/utils/dreamUtils';
import { Calendar } from 'lucide-react';

interface DreamTimelineProps {
  dreams: Dream[];
}

export const DreamTimeline: React.FC<DreamTimelineProps> = ({ dreams }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {dreams.map((dream, index) => {
        const date = new Date(dream.date);
        const formattedDate = `${date.getMonth() + 1}月${date.getDate()}日`;

        return (
          <motion.div
            key={dream.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate(`/dream/${dream.id}`)}
            className="group cursor-pointer"
          >
            <div className="card overflow-hidden">
              {dream.generatedImage && (
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={dream.generatedImage}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-sm text-neutral-400">
                    <Calendar className="w-4 h-4" />
                    <span>{formattedDate}</span>
                  </div>
                  {dream.generatedImage && (
                    <div className="w-2 h-2 rounded-full bg-neutral-900" />
                  )}
                </div>

                <p className="text-base text-neutral-800 leading-relaxed line-clamp-2 mb-4">
                  {dream.description}
                </p>

                <div className="flex items-center justify-between">
                  {dream.moodTags.length > 0 && (
                    <div className="flex items-center space-x-2">
                      {dream.moodTags.slice(0, 2).map((mood) => (
                        <span key={mood} className="tag text-xs">
                          {MOOD_LABELS[mood].emoji}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {dream.dreamTypeTags.length > 0 && (
                    <span className="text-xs text-neutral-400">
                      {dream.dreamTypeTags.slice(0, 1).map((type) => `#${type}`)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
