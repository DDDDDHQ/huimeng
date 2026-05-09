import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoodTag, DreamTypeTag, ImageStyle } from '@/types';
import { MOOD_LABELS, DREAM_TYPE_LABELS, IMAGE_STYLES } from '@/utils/dreamUtils';
import { Sparkles } from 'lucide-react';
import { ImageGenerator } from './ImageGenerator';

interface DreamFormProps {
  onSubmit: (data: {
    date: string;
    description: string;
    moodTags: MoodTag[];
    dreamTypeTags: DreamTypeTag[];
    clarity: number;
    generatedImage?: string;
    imageStyle?: ImageStyle;
    keywords: string[];
  }) => void;
  initialData?: {
    date: string;
    description: string;
    moodTags: MoodTag[];
    dreamTypeTags: DreamTypeTag[];
    clarity: number;
    generatedImage?: string;
    imageStyle?: ImageStyle;
  };
  mode?: 'create' | 'edit';
}

export const DreamForm: React.FC<DreamFormProps> = ({ onSubmit, initialData, mode = 'create' }) => {
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState(initialData?.description || '');
  const [selectedMoods, setSelectedMoods] = useState<MoodTag[]>(initialData?.moodTags || []);
  const [selectedTypes, setSelectedTypes] = useState<DreamTypeTag[]>(initialData?.dreamTypeTags || []);
  const [clarity, setClarity] = useState(initialData?.clarity || 3);
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>(initialData?.imageStyle || 'digital_art');
  const [generatedImage, setGeneratedImage] = useState<string | null>(initialData?.generatedImage || null);

  const handleMoodToggle = (mood: MoodTag) => {
    setSelectedMoods((prev) =>
      prev.includes(mood)
        ? prev.filter((m) => m !== mood)
        : [...prev, mood]
    );
  };

  const handleTypeToggle = (type: DreamTypeTag) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleImageGenerated = (imageUrl: string) => {
    setGeneratedImage(imageUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const keywords = description.match(/[，。、！？；：「」『』（）【】《》…—\s\w]+/g) || [];
    const extractedKeywords = keywords
      .flatMap((k) => k.split(/[，、\s]+/))
      .filter((k) => k.length > 1)
      .slice(0, 5);

    onSubmit({
      date,
      description,
      moodTags: selectedMoods,
      dreamTypeTags: selectedTypes,
      clarity,
      generatedImage: generatedImage || undefined,
      imageStyle: generatedImage ? selectedStyle : undefined,
      keywords: extractedKeywords,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <label className="text-sm font-medium text-neutral-500">日期</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-neutral-500">心情</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(MOOD_LABELS).map(([key, { label, emoji }]) => (
            <motion.button
              key={key}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodToggle(key as MoodTag)}
              className={`px-4 py-2.5 rounded-full text-sm flex items-center space-x-2 transition-all ${
                selectedMoods.includes(key as MoodTag)
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              <span>{emoji}</span>
              <span>{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-neutral-500">类型</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(DREAM_TYPE_LABELS).map(([key, { label, emoji }]) => (
            <motion.button
              key={key}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTypeToggle(key as DreamTypeTag)}
              className={`px-4 py-2.5 rounded-full text-sm flex items-center space-x-2 transition-all ${
                selectedTypes.includes(key as DreamTypeTag)
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              <span>{emoji}</span>
              <span>{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-neutral-500">描述</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="描述你的梦境..."
          rows={6}
          className="input resize-none"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-neutral-500">清晰度</label>
        <div className="flex items-center space-x-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.button
              key={i}
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setClarity(i + 1)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all ${
                i < clarity
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              ★
            </motion.button>
          ))}
          <span className="ml-3 text-sm text-neutral-500">
            {clarity === 1 && '模糊'}
            {clarity === 2 && '不太清晰'}
            {clarity === 3 && '一般'}
            {clarity === 4 && '较清晰'}
            {clarity === 5 && '非常清晰'}
          </span>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-neutral-200">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-neutral-400" />
          <h3 className="text-sm font-medium">AI 画面生成</h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {Object.entries(IMAGE_STYLES).map(([key, { name, gradient }]) => (
            <motion.button
              key={key}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedStyle(key as ImageStyle)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedStyle === key
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200 bg-white'
              }`}
            >
              <div className={`w-full h-12 rounded-lg bg-gradient-to-br ${gradient} mb-2`} />
              <p className="text-xs font-medium text-neutral-700">{name}</p>
            </motion.button>
          ))}
        </div>

        <ImageGenerator
          description={description}
          style={selectedStyle}
          onImageGenerated={handleImageGenerated}
          initialImage={generatedImage}
        />
      </div>

      <motion.button
        type="submit"
        whileTap={{ scale: 0.98 }}
        className="w-full h-14 bg-neutral-900 text-white font-medium rounded-full"
      >
        {mode === 'create' ? '保存梦境' : '更新梦境'}
      </motion.button>
    </form>
  );
};
