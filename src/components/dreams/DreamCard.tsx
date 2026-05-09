import React from 'react';
import { motion } from 'framer-motion';
import { Dream } from '@/types';
import { MOOD_LABELS, DREAM_TYPE_LABELS } from '@/utils/dreamUtils';
import { Calendar, Eye, Heart } from 'lucide-react';

interface DreamCardProps {
  dream: Dream;
  variant?: 'compact' | 'expanded' | 'gallery';
  onClick?: () => void;
}

export const DreamCard: React.FC<DreamCardProps> = ({ 
  dream, 
  variant = 'compact',
  onClick 
}) => {
  const date = new Date(dream.date);
  const formattedDate = `${date.getMonth() + 1}月${date.getDate()}日`;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group relative bg-galaxy-purple/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-star-gold/30"
    >
      {dream.generatedImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={dream.generatedImage}
            alt={dream.description}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-galaxy-purple via-transparent to-transparent" />
        </div>
      )}

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-star-mist">
            <Calendar className="w-4 h-4" />
            <span className="font-space-mono">{formattedDate}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-star-mist">
            <span className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{dream.viewCount}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{dream.likeCount}</span>
            </span>
          </div>
        </div>

        <p className="text-moonlight/90 font-noto-sans line-clamp-2">
          {dream.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {dream.moodTags.map((mood) => (
            <span
              key={mood}
              className="px-2 py-1 text-xs rounded-full bg-white/5 text-star-mist flex items-center space-x-1"
            >
              <span>{MOOD_LABELS[mood].emoji}</span>
              <span>{MOOD_LABELS[mood].label}</span>
            </span>
          ))}
        </div>

        {variant !== 'compact' && (
          <div className="flex flex-wrap gap-2">
            {dream.dreamTypeTags.map((type) => (
              <span
                key={type}
                className="px-2 py-1 text-xs rounded-full bg-dream-pink/20 text-dream-pink"
              >
                {DREAM_TYPE_LABELS[type].emoji} {DREAM_TYPE_LABELS[type].label}
              </span>
            ))}
          </div>
        )}

        {dream.clarity > 0 && (
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < dream.clarity
                    ? 'bg-star-gold'
                    : 'bg-white/20'
                }`}
              />
            ))}
            <span className="ml-2 text-xs text-star-mist">清晰度</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-star-gold/5 to-dream-pink/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};
