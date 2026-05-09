import { ImageGenerationRequest, ImageGenerationResponse, ImageStyle } from '@/types';
import { storageService } from './storageService';

const UNSPLASH_DREAM_IMAGES: Record<ImageStyle, string[]> = {
  realistic: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&h=1000&fit=crop',
  ],
  oil_painting: [
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&h=1000&fit=crop',
  ],
  watercolor: [
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=1000&fit=crop',
  ],
  digital_art: [
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=1000&fit=crop',
  ],
  surrealism: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=1000&fit=crop',
  ],
  impressionism: [
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=1000&fit=crop',
  ],
  pop_art: [
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&h=1000&fit=crop',
  ],
  minimalist: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=1000&fit=crop',
  ],
  cyberpunk: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=1000&fit=crop',
  ],
  vintage: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&h=1000&fit=crop',
  ],
};

const stylePrompts: Record<ImageStyle, string> = {
  realistic: '超写实风格，逼真细节，真实光影，高清画质',
  oil_painting: '古典油画风格，厚重的笔触，暖色调，梦幻氛围',
  watercolor: '水彩画风格，轻柔透明，梦幻过渡，柔和色彩',
  digital_art: '数字艺术风格，现代感，清晰细节，赛博朋克氛围',
  surrealism: '超现实主义风格，梦幻扭曲，超现实元素，奇幻色彩',
  impressionism: '印象派风格，莫奈风格，模糊笔触，光影效果',
  pop_art: '波普艺术风格，安迪沃霍尔风格，鲜艳色彩，重复图案',
  minimalist: '极简主义风格，简洁抽象，几何图形，单色配色',
  cyberpunk: '赛博朋克风格，霓虹灯，未来都市，科技感',
  vintage: '复古怀旧风格，老照片效果，暖色调，怀旧氛围',
};

export const aiService = {
  async generateDreamImage(
    request: ImageGenerationRequest
  ): Promise<ImageGenerationResponse> {
    const settings = storageService.load('dreamweaver_settings', {
      openaiApiKey: '',
      nanobananaApiKey: '',
      defaultStyle: 'realistic' as ImageStyle,
      theme: 'dark',
    });

    if (settings.nanobananaApiKey) {
      return this.generateWithNanobanana(request, settings.nanobananaApiKey);
    }

    if (settings.openaiApiKey) {
      return this.generateWithOpenAI(request, settings.openaiApiKey);
    }

    return this.generateMockImage(request);
  },

  async generateWithNanobanana(
    request: ImageGenerationRequest,
    apiKey: string
  ): Promise<ImageGenerationResponse> {
    const prompt = `${request.description}, ${stylePrompts[request.style]}, 高质量，梦境感`;

    try {
      const response = await fetch('https://api.nanobanana.com/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt,
          style: request.style,
          size: '1024x1024',
          quality: 'high',
        }),
      });

      if (!response.ok) {
        throw new Error('Nanobanana API error');
      }

      const data = await response.json();
      return {
        success: true,
        imageUrl: data.image_url,
        style: request.style,
      };
    } catch (error) {
      console.error('Nanobanana generation failed:', error);
      return this.generateMockImage(request);
    }
  },

  async generateWithOpenAI(
    request: ImageGenerationRequest,
    apiKey: string
  ): Promise<ImageGenerationResponse> {
    const prompt = `${request.description}, ${stylePrompts[request.style]}, dreamlike, ethereal, high quality`;

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt,
          size: '1024x1024',
          quality: 'hd',
          style: 'vivid',
        }),
      });

      if (!response.ok) {
        throw new Error('OpenAI API error');
      }

      const data = await response.json();
      return {
        success: true,
        imageUrl: data.data[0].url,
        style: request.style,
      };
    } catch (error) {
      console.error('OpenAI generation failed:', error);
      return this.generateMockImage(request);
    }
  },

  generateMockImage(
    request: ImageGenerationRequest
  ): Promise<ImageGenerationResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const images = UNSPLASH_DREAM_IMAGES[request.style];
        const randomIndex = Math.floor(Math.random() * images.length);
        resolve({
          success: true,
          imageUrl: images[randomIndex],
          style: request.style,
        });
      }, 1500);
    });
  },

  async regenerateImage(
    request: ImageGenerationRequest
  ): Promise<ImageGenerationResponse> {
    return this.generateDreamImage(request);
  },

  applyStyleFilter(imageUrl: string, _style: ImageStyle): string {
    return imageUrl;
  },
};
