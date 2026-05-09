import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, RefreshCw, BookOpen } from 'lucide-react';
import { useDreamStore } from '@/stores/dreamStore';
import { ImageStyle } from '@/types';
import { IMAGE_STYLES } from '@/utils/dreamUtils';
import { dreamService } from '@/services/interpretationService';
import { DreamInterpretation } from '@/types';
import { DreamInterpretationCard } from '@/components/dreams/DreamInterpretationCard';

export const Record: React.FC = () => {
  const navigate = useNavigate();
  const { addDream } = useDreamStore();
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>('realistic');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [interpretation, setInterpretation] = useState<DreamInterpretation | null>(null);

  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);
    
    setTimeout(() => {
      const mockImage = `https://neeko-copilot.bytedance.net/api/text_to_image?prompt=${encodeURIComponent(description + ' dreamlike surreal artwork')}&image_size=landscape_16_9`;
      setGeneratedImage(mockImage);
      
      const newDream = {
        id: 'temp',
        userId: 'user_1',
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description,
        keywords: [],
        moodTags: [],
        dreamTypeTags: [],
        clarity: 3,
        generatedImage: mockImage,
        imageStyle: selectedStyle,
        viewCount: 0,
        likeCount: 0,
      };
      
      const newInterpretation = dreamService.generateInterpretation(newDream);
      setInterpretation(newInterpretation);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!description.trim()) return;

    const keywords = description.match(/[，。、！？；：「」『』（）【】《》…—\s\w]+/g) || [];
    const extractedKeywords = keywords
      .flatMap((k) => k.split(/[，、\s]+/))
      .filter((k) => k.length > 1)
      .slice(0, 5);

    addDream({
      userId: 'user_1',
      date: new Date().toISOString().split('T')[0],
      description,
      keywords: extractedKeywords,
      moodTags: [],
      dreamTypeTags: [],
      clarity: 3,
      generatedImage: generatedImage || undefined,
      imageStyle: generatedImage ? selectedStyle : undefined,
      interpretation: interpretation || undefined,
    });
    
    navigate('/');
  };

  const styleOptions = Object.entries(IMAGE_STYLES);

  return (
    <div className="min-h-screen bg-zinc-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 z-10 bg-zinc-50/80 backdrop-blur-3xl border-b border-zinc-200/50"
      >
        <div className="flex items-center space-x-3 px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-zinc-100 text-zinc-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-zinc-900">记录梦境</h1>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 pt-6 pb-32 space-y-6"
      >
        <div className="bg-white p-4 shadow-sm border border-zinc-100">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-medium text-zinc-900">选择风格</h3>
            <span className="text-xs text-zinc-400 ml-auto">{IMAGE_STYLES[selectedStyle].name}</span>
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-2 px-2">
            {styleOptions.map(([key, { name, gradient }]) => (
              <motion.button
                key={key}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedStyle(key as ImageStyle)}
                className={`flex-shrink-0 px-3 py-2 border-2 transition-all ${
                  selectedStyle === key
                    ? 'border-zinc-900 bg-zinc-50'
                    : 'border-zinc-200 bg-white'
                }`}
              >
                <div className={`w-10 h-5 rounded-sm bg-gradient-to-br ${gradient} mb-1`} />
                <p className="text-xs font-medium text-zinc-700 whitespace-nowrap">{name}</p>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 shadow-sm border border-zinc-100">
          <textarea
            ref={descriptionRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="描述你的梦境...

可以描述梦中的场景、人物、情节和感受，例如：
我梦见自己站在一片金色的麦田中，阳光温暖地洒在身上，远处有一座古老的风车..."
            rows={10}
            className="w-full px-0 py-0 bg-transparent border-none text-zinc-900 placeholder:text-zinc-400 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <motion.button
          onClick={handleGenerate}
          disabled={!description.trim() || isGenerating}
          whileTap={{ scale: description.trim() && !isGenerating ? 0.98 : 1 }}
          className={`w-full h-14 text-sm font-medium flex items-center justify-center space-x-2 transition-all ${
            description.trim() && !isGenerating
              ? 'bg-zinc-900 text-white shadow-lg'
              : 'bg-zinc-100 text-zinc-400'
          }`}
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
              <span>生成画面中...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>生成画面与解梦</span>
            </>
          )}
        </motion.button>

        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white overflow-hidden shadow-sm border border-zinc-100">
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            <motion.button
              onClick={handleSave}
              whileTap={{ scale: 0.98 }}
              className="w-full h-14 bg-zinc-900 text-white font-medium"
            >
              保存梦境
            </motion.button>
          </motion.div>
        )}

        {interpretation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-5 shadow-sm border border-zinc-100"
          >
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-zinc-400" />
              <h3 className="text-lg font-semibold text-zinc-900">周公解梦</h3>
            </div>
            <DreamInterpretationCard interpretation={interpretation} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
