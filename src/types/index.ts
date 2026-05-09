export type MoodTag =
  | 'happy'
  | 'scared'
  | 'confused'
  | 'sad'
  | 'excited'
  | 'peaceful'
  | 'anxious'
  | 'lonely';

export type DreamTypeTag =
  | 'flying'
  | 'falling'
  | 'lost'
  | 'chase'
  | 'water'
  | 'forest'
  | 'city'
  | 'space'
  | 'beach'
  | 'mountain';

export type ImageStyle = 
  | 'realistic'
  | 'oil_painting'
  | 'watercolor'
  | 'digital_art'
  | 'surrealism'
  | 'impressionism'
  | 'pop_art'
  | 'minimalist'
  | 'cyberpunk'
  | 'vintage';

export interface Dream {
  id: string;
  userId: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  keywords: string[];
  moodTags: MoodTag[];
  dreamTypeTags: DreamTypeTag[];
  clarity: number;
  generatedImage?: string;
  imageStyle?: ImageStyle;
  viewCount: number;
  likeCount: number;
  interpretation?: DreamInterpretation;
}

export interface DreamInterpretation {
  id: string;
  dreamId: string;
  interpretation: string;
  keywords: string[];
  luckyNumbers: number[];
  luckyColors: string[];
  suggestions: string[];
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar?: string;
  createdAt: string;
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  defaultImageStyle: ImageStyle;
  notifications: boolean;
}

export interface HeatmapCell {
  date: string;
  count: number;
  dreams: Dream[];
  intensity: 'none' | 'low' | 'medium' | 'high';
}

export interface ImageGenerationRequest {
  description: string;
  style: ImageStyle;
  keywords: string[];
}

export interface ImageGenerationResponse {
  success: boolean;
  imageUrl: string;
  style: ImageStyle;
}

export type SharePlatform = 'album' | 'xiaohongshu' | 'wechat' | 'weibo';

export interface ShareContent {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}
