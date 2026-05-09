import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { storageService } from '@/services/storageService';
import { ImageStyle } from '@/types';
import { IMAGE_STYLES } from '@/utils/dreamUtils';

export const StyleSettings: React.FC = () => {
  const navigate = useNavigate();
  const [defaultStyle, setDefaultStyle] = useState<ImageStyle>('realistic');
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const settings = storageService.load('dreamweaver_settings', {
      defaultStyle: 'realistic' as ImageStyle,
    });
    setDefaultStyle(settings.defaultStyle as ImageStyle || 'realistic');
  }, []);

  const handleStyleChange = (style: ImageStyle) => {
    setDefaultStyle(style);
    setHasChanges(true);
  };

  const handleSave = () => {
    storageService.save('dreamweaver_settings', {
      defaultStyle,
    });
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const styleOptions = Object.entries(IMAGE_STYLES);

  return (
    <div className="min-h-screen bg-zinc-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 z-10 bg-zinc-50/80 backdrop-blur-3xl border-b border-zinc-200/50"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-zinc-100 text-zinc-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-zinc-900">默认风格</h1>
          <div className="w-9" />
        </div>
      </motion.div>

      <div className="px-6 py-6 space-y-4">
        <div className="bg-white p-4 border border-zinc-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium text-zinc-900">选择默认风格</h2>
              <p className="text-xs text-zinc-500 mt-0.5">新建梦境时的默认艺术风格</p>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
              <Check className="w-3 h-3" />
              <span>{IMAGE_STYLES[defaultStyle].name}</span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {styleOptions.map(([key, { name, gradient }]) => (
              <motion.button
                key={key}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStyleChange(key as ImageStyle)}
                className={`p-2 border-2 transition-all ${
                  defaultStyle === key
                    ? 'border-zinc-900 bg-zinc-50'
                    : 'border-zinc-200 bg-white'
                }`}
              >
                <div className={`w-full h-6 rounded bg-gradient-to-br ${gradient} mb-1.5`} />
                <p className="text-[9px] font-medium text-zinc-700 text-center leading-tight">{name}</p>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: hasChanges ? 0.98 : 1 }}
          onClick={handleSave}
          disabled={!hasChanges}
          className={`w-full h-12 text-sm font-medium flex items-center justify-center space-x-2 transition-all ${
            hasChanges
              ? 'bg-zinc-900 text-white'
              : 'bg-zinc-100 text-zinc-400'
          }`}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              <span>已保存</span>
            </>
          ) : (
            <span>{hasChanges ? '保存设置' : '暂无更改'}</span>
          )}
        </motion.button>
      </div>
    </div>
  );
};
