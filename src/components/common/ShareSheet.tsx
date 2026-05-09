import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Camera, Share2, MessageCircle, Globe } from 'lucide-react';
import { SharePlatform } from '@/types';
import { shareService } from '@/services/shareService';

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  shareContent: {
    title: string;
    description: string;
    imageUrl?: string;
    link?: string;
  };
}

interface ShareOption {
  platform: SharePlatform;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const shareOptions: ShareOption[] = [
  {
    platform: 'album',
    name: '保存到相册',
    icon: <Download className="w-6 h-6" />,
    color: 'bg-zinc-900',
  },
  {
    platform: 'xiaohongshu',
    name: '小红书',
    icon: <Camera className="w-6 h-6" />,
    color: 'bg-red-500',
  },
  {
    platform: 'wechat',
    name: '微信',
    icon: <MessageCircle className="w-6 h-6" />,
    color: 'bg-green-500',
  },
  {
    platform: 'weibo',
    name: '微博',
    icon: <Globe className="w-6 h-6" />,
    color: 'bg-orange-500',
  },
];

export const ShareSheet: React.FC<ShareSheetProps> = ({
  isOpen,
  onClose,
  shareContent,
}) => {
  const [isSharing, setIsSharing] = useState<SharePlatform | null>(null);

  const handleShare = async (platform: SharePlatform) => {
    setIsSharing(platform);
    try {
      const success = await shareService.share(platform, shareContent);
      if (success) {
        setTimeout(() => {
          onClose();
        }, 500);
      }
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(null);
    }
  };

  const handleNativeShare = async () => {
    setIsSharing('album' as SharePlatform);
    try {
      const success = await shareService.nativeShare(shareContent);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Native share failed:', error);
    } finally {
      setIsSharing(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-zinc-50 rounded-t-3xl z-50 pb-8"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-zinc-900">分享</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-6 mb-8">
                {shareOptions.map((option) => (
                  <motion.button
                    key={option.platform}
                    onClick={() => handleShare(option.platform)}
                    disabled={isSharing !== null}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center space-y-3"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${option.color} flex items-center justify-center text-white shadow-lg`}>
                      {isSharing === option.platform ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Share2 className="w-6 h-6" />
                        </motion.div>
                      ) : (
                        option.icon
                      )}
                    </div>
                    <span className="text-sm text-zinc-600 font-medium">{option.name}</span>
                  </motion.button>
                ))}
              </div>

              <div className="border-t border-zinc-200 pt-6">
                <button
                  onClick={handleNativeShare}
                  disabled={isSharing !== null}
                  className="w-full h-14 bg-white border border-zinc-200 rounded-2xl text-sm font-medium text-zinc-700 flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Share2 className="w-5 h-5" />
                  <span>更多分享方式</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareSheet;
