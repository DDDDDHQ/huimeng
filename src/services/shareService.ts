import { SharePlatform, ShareContent, Dream } from '@/types';

export const shareService = {
  async saveToAlbum(imageUrl: string): Promise<boolean> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], 'dream-image.png', { type: 'image/png' });
        
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: '我的梦境',
            text: '记录了这个奇妙的梦境'
          });
          return true;
        }
      }
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `dream_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      
      return true;
    } catch (error) {
      console.error('Failed to save to album:', error);
      return false;
    }
  },

  async shareToXiaohongshu(content: ShareContent): Promise<boolean> {
    try {
      const shareText = `${content.title}\n\n${content.description}`;
      
      if (navigator.share) {
        await navigator.share({
          title: content.title,
          text: shareText,
          url: content.link
        });
        return true;
      }
      
      await navigator.clipboard.writeText(shareText);
      return true;
    } catch (error) {
      console.error('Failed to share to Xiaohongshu:', error);
      return false;
    }
  },

  async shareToWeChat(content: ShareContent): Promise<boolean> {
    try {
      const shareText = `${content.title}\n\n${content.description}`;
      
      if (navigator.share) {
        await navigator.share({
          title: content.title,
          text: shareText,
          url: content.link
        });
        return true;
      }
      
      await navigator.clipboard.writeText(shareText);
      return true;
    } catch (error) {
      console.error('Failed to share to WeChat:', error);
      return false;
    }
  },

  async shareToWeibo(content: ShareContent): Promise<boolean> {
    try {
      const weiboUrl = `https://service.weibo.com/share/share.php?title=${encodeURIComponent(content.title + '\n\n' + content.description)}&pic=${encodeURIComponent(content.imageUrl || '')}&url=${encodeURIComponent(content.link || '')}`;
      window.open(weiboUrl, '_blank', 'width=600,height=500');
      return true;
    } catch (error) {
      console.error('Failed to share to Weibo:', error);
      return false;
    }
  },

  async share(platform: SharePlatform, content: ShareContent): Promise<boolean> {
    switch (platform) {
      case 'album':
        if (content.imageUrl) {
          return await this.saveToAlbum(content.imageUrl);
        }
        return false;
      case 'xiaohongshu':
        return await this.shareToXiaohongshu(content);
      case 'wechat':
        return await this.shareToWeChat(content);
      case 'weibo':
        return await this.shareToWeibo(content);
      default:
        return false;
    }
  },

  generateShareContent(dream: Dream): ShareContent {
    const date = new Date(dream.date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const moodEmojis = dream.moodTags.map((tag) => {
      const emojiMap: Record<string, string> = {
        happy: '😊',
        scared: '😨',
        confused: '🤔',
        sad: '😢',
        excited: '🤩',
        peaceful: '😌',
        anxious: '😰',
        lonely: '😔'
      };
      return emojiMap[tag] || '';
    }).join('');

    return {
      title: `${date} 的梦境 ${moodEmojis}`,
      description: `${dream.description}\n\n来自：梦织 DreamWeaver`,
      imageUrl: dream.generatedImage,
      link: window.location.origin + `/dream/${dream.id}`
    };
  },

  async nativeShare(content: ShareContent): Promise<boolean> {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.description,
          url: content.link,
        });
        return true;
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Native share failed:', error);
        }
        return false;
      }
    }
    return false;
  }
};

export default shareService;
