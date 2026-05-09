import { Dream, MoodTag, DreamTypeTag, ImageStyle } from '@/types';

export const MOOD_LABELS: Record<MoodTag, { label: string; emoji: string; color: string }> = {
  happy: { label: '愉悦', emoji: '😊', color: '#f59e0b' },
  scared: { label: '恐惧', emoji: '😨', color: '#ef4444' },
  confused: { label: '困惑', emoji: '🤔', color: '#6b7280' },
  sad: { label: '悲伤', emoji: '😢', color: '#3b82f6' },
  excited: { label: '兴奋', emoji: '🤩', color: '#f97316' },
  peaceful: { label: '平静', emoji: '😌', color: '#06b6d4' },
  anxious: { label: '焦虑', emoji: '😰', color: '#dc2626' },
  lonely: { label: '孤独', emoji: '😔', color: '#8b5cf6' },
};

export const DREAM_TYPE_LABELS: Record<DreamTypeTag, { label: string; emoji: string; color: string }> = {
  flying: { label: '飞行', emoji: '🦋', color: '#06b6d4' },
  falling: { label: '坠落', emoji: '⬇️', color: '#dc2626' },
  lost: { label: '迷路', emoji: '🏚️', color: '#6b7280' },
  chase: { label: '追逐', emoji: '🏃', color: '#f97316' },
  water: { label: '水域', emoji: '🌊', color: '#3b82f6' },
  forest: { label: '森林', emoji: '🌲', color: '#22c55e' },
  city: { label: '城市', emoji: '🏙️', color: '#8b5cf6' },
  space: { label: '太空', emoji: '🌌', color: '#a855f7' },
  beach: { label: '海滩', emoji: '🏖️', color: '#eab308' },
  mountain: { label: '山脉', emoji: '⛰️', color: '#78716c' },
};

export const IMAGE_STYLES: Record<ImageStyle, { name: string; description: string; gradient: string }> = {
  realistic: {
    name: '超写实',
    description: '逼真的写实风格',
    gradient: 'from-gray-400 via-gray-500 to-gray-600',
  },
  oil_painting: {
    name: '油画质感',
    description: '古典油画风格',
    gradient: 'from-amber-600 via-orange-500 to-yellow-500',
  },
  watercolor: {
    name: '水彩晕染',
    description: '梦幻水彩画风格',
    gradient: 'from-blue-400 via-purple-400 to-pink-400',
  },
  digital_art: {
    name: '数字艺术',
    description: '现代数字艺术风格',
    gradient: 'from-cyan-400 via-blue-500 to-purple-500',
  },
  surrealism: {
    name: '超现实',
    description: '超现实主义风格',
    gradient: 'from-purple-500 via-pink-500 to-red-500',
  },
  impressionism: {
    name: '印象派',
    description: '莫奈风格印象派',
    gradient: 'from-yellow-400 via-orange-400 to-red-400',
  },
  pop_art: {
    name: '波普艺术',
    description: '安迪沃霍尔风格',
    gradient: 'from-pink-500 via-yellow-400 to-cyan-400',
  },
  minimalist: {
    name: '极简主义',
    description: '简洁抽象风格',
    gradient: 'from-gray-300 via-gray-400 to-gray-500',
  },
  cyberpunk: {
    name: '赛博朋克',
    description: '未来都市风格',
    gradient: 'from-cyan-500 via-purple-600 to-pink-500',
  },
  vintage: {
    name: '复古怀旧',
    description: '老照片复古风格',
    gradient: 'from-amber-700 via-yellow-600 to-orange-600',
  },
};

export function getMoodLabel(mood: MoodTag): string {
  return MOOD_LABELS[mood]?.label || mood;
}

export function getDreamTypeLabel(type: DreamTypeTag): string {
  return DREAM_TYPE_LABELS[type]?.label || type;
}

export function getImageStyleName(style: ImageStyle): string {
  return IMAGE_STYLES[style]?.name || style;
}

export function groupDreamsByMonth(dreams: Dream[]): Map<string, Dream[]> {
  const grouped = new Map<string, Dream[]>();
  
  dreams.forEach((dream) => {
    const date = new Date(dream.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(dream);
  });
  
  return grouped;
}

export function sortDreamsByDate(dreams: Dream[], ascending = false): Dream[] {
  return [...dreams].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

export function calculateIntensity(count: number): 'none' | 'low' | 'medium' | 'high' {
  if (count === 0) return 'none';
  if (count === 1) return 'low';
  if (count === 2) return 'medium';
  return 'high';
}
