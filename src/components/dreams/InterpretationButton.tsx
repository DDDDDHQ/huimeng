import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Loader2 } from 'lucide-react';
import { Dream, DreamInterpretation } from '@/types';
import { dreamService } from '@/services/interpretationService';
import { DreamInterpretationCard } from './DreamInterpretationCard';

interface InterpretationButtonProps {
  dream: Dream;
  onInterpretationGenerated?: (interpretation: DreamInterpretation) => void;
}

export const InterpretationButton: React.FC<InterpretationButtonProps> = ({
  dream,
  onInterpretationGenerated
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [interpretation, setInterpretation] = useState<DreamInterpretation | null>(
    dream.interpretation || null
  );

  const handleGenerateInterpretation = async () => {
    if (interpretation) {
      setShowInterpretation(true);
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const newInterpretation = dreamService.generateInterpretation(dream);
      setInterpretation(newInterpretation);
      setShowInterpretation(true);
      setIsLoading(false);
      
      if (onInterpretationGenerated) {
        onInterpretationGenerated(newInterpretation);
      }
    }, 1500);
  };

  return (
    <>
      <motion.button
        onClick={handleGenerateInterpretation}
        disabled={isLoading}
        whileTap={{ scale: 0.98 }}
        className="w-full h-14 bg-neutral-900 text-white font-medium rounded-full flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="w-5 h-5" />
            </motion.div>
            <span>解读中...</span>
          </>
        ) : (
          <>
            <BookOpen className="w-5 h-5" />
            <span>{interpretation ? '查看解梦' : '周公解梦'}</span>
          </>
        )}
      </motion.button>

      {showInterpretation && interpretation && (
        <div className="mt-6">
          <DreamInterpretationCard interpretation={interpretation} />
        </div>
      )}
    </>
  );
};

export default InterpretationButton;
