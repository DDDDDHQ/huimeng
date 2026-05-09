import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { ImageStyle } from '@/types';
import { aiService } from '@/services/aiService';

interface ImageGeneratorProps {
  description: string;
  style: ImageStyle;
  onImageGenerated: (imageUrl: string) => void;
  initialImage?: string | null;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  description,
  style,
  onImageGenerated,
  initialImage,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(initialImage || null);

  React.useEffect(() => {
    if (initialImage) {
      setCurrentImage(initialImage);
    }
  }, [initialImage]);

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);
    try {
      const response = await aiService.generateDreamImage({
        description,
        style,
        keywords: [],
      });

      if (response.success) {
        setCurrentImage(response.imageUrl);
        onImageGenerated(response.imageUrl);
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);
    try {
      const response = await aiService.regenerateImage({
        description,
        style,
        keywords: [],
      });

      if (response.success) {
        setCurrentImage(response.imageUrl);
        onImageGenerated(response.imageUrl);
      }
    } catch (error) {
      console.error('Failed to regenerate image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-3">
      {!currentImage ? (
        <motion.button
          onClick={handleGenerate}
          disabled={!description.trim() || isGenerating}
          whileTap={description.trim() && !isGenerating ? { scale: 0.98 } : {}}
          className={`w-full h-32 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center space-y-2 ${
            description.trim()
              ? 'border-neutral-300 hover:border-neutral-900 bg-neutral-50'
              : 'border-neutral-200 bg-white cursor-not-allowed'
          }`}
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-8 h-8 text-neutral-400" />
              </motion.div>
              <span className="text-sm font-medium text-neutral-500">生成中...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-8 h-8 text-neutral-300" />
              <span className="text-sm font-medium text-neutral-400">
                {description.trim() ? '生成画面' : '请先输入描述'}
              </span>
            </>
          )}
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100">
            <img
              src={currentImage}
              alt="Generated"
              className="w-full h-full object-cover"
            />
          </div>

          <motion.button
            onClick={handleRegenerate}
            disabled={isGenerating}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 bg-neutral-100 rounded-full text-sm font-medium flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="w-4 h-4" />
              </motion.div>
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span>重新生成</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
