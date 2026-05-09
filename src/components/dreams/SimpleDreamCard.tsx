import React from 'react';
import { motion } from 'framer-motion';
import { Dream } from '@/types';
import { MOOD_LABELS } from '@/utils/dreamUtils';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SimpleDreamCardProps {
  dream: Dream;
}

export const SimpleDreamCard: React.FC<SimpleDreamCardProps> = ({ dream }) => {
  const navigate = useNavigate();
  const date = new Date(dream.date);
  const formattedDate = `${date.getMonth() + 1}月${date.getDate()}日`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/dream/${dream.id}`)}
      className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-sm border border-neutral-100 dark:border-neutral-700 cursor-pointer active:scale-98 transition-transform"
    >
      {dream.generatedImage && (
        <div className="mb-3 rounded-lg overflow-hidden">
          <img
            src={dream.generatedImage}
            alt=""
            className="w-full h-32 object-cover"
          />
        </div>
      )}
      
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2 text-sm text-neutral-500">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        {dream.moodTags.length > 0 && (
          <span className="text-lg">
            {MOOD_LABELS[dream.moodTags[0]].emoji}
          </span>
        )}
      </div>

      <p className="text-sm text-neutral-700 dark:text-neutral-200 line-clamp-2 leading-relaxed">
        {dream.description}
      </p>

      {dream.moodTags.length > 1 && (
        <div className="flex items-center space-x-1 mt-2">
          {dream.moodTags.slice(1, 3).map((mood) => (
            <span key={mood} className="text-xs">
              {MOOD_LABELS[mood].emoji}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};
