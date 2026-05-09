import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Star, Palette } from 'lucide-react';
import { DreamInterpretation } from '@/types';

interface DreamInterpretationCardProps {
  interpretation: DreamInterpretation;
}

export const DreamInterpretationCard: React.FC<DreamInterpretationCardProps> = ({
  interpretation
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-5 h-5 text-neutral-400" />
          <h3 className="text-lg font-semibold text-neutral-900">周公解梦</h3>
        </div>

        <div className="prose prose-sm max-w-none">
          <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
            {interpretation.interpretation}
          </p>
        </div>

        {interpretation.keywords.length > 0 && (
          <div className="mt-5 pt-4 border-t border-neutral-100">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-500">关键词</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {interpretation.keywords.map((keyword, index) => (
                <span key={index} className="tag text-xs">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Star className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-500">幸运数字</span>
            </div>
            <div className="flex space-x-2">
              {interpretation.luckyNumbers.map((num, index) => (
                <span key={index} className="w-8 h-8 rounded-lg bg-neutral-900 text-white text-sm font-medium flex items-center justify-center">
                  {num}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Palette className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-500">幸运色</span>
            </div>
            <div className="flex space-x-2">
              {interpretation.luckyColors.map((color, index) => (
                <span key={index} className="px-3 py-1 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-medium">
                  {color}
                </span>
              ))}
            </div>
          </div>
        </div>

        {interpretation.suggestions.length > 0 && (
          <div className="mt-5 pt-4 border-t border-neutral-100">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-500">温馨提示</span>
            </div>
            <ul className="space-y-2">
              {interpretation.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-neutral-600">
                  <span className="text-neutral-300">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DreamInterpretationCard;
