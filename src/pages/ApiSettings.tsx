import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Check, Key, X } from 'lucide-react';
import { storageService } from '@/services/storageService';

export const ApiSettings: React.FC = () => {
  const navigate = useNavigate();
  const [openaiKey, setOpenaiKey] = useState('');
  const [nanobananaKey, setNanobananaKey] = useState('');
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showNanoKey, setShowNanoKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const settings = storageService.load('dreamweaver_settings', {
      openaiApiKey: '',
      nanobananaApiKey: '',
    });
    setOpenaiKey(settings.openaiApiKey || '');
    setNanobananaKey(settings.nanobananaApiKey || '');
  }, []);

  const handleOpenaiChange = (value: string) => {
    setOpenaiKey(value);
    setHasChanges(true);
  };

  const handleNanoChange = (value: string) => {
    setNanobananaKey(value);
    setHasChanges(true);
  };

  const handleSave = () => {
    storageService.save('dreamweaver_settings', {
      openaiApiKey: openaiKey,
      nanobananaApiKey: nanobananaKey,
    });
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const isOpenaiConfigured = openaiKey.length > 0;
  const isNanoConfigured = nanobananaKey.length > 0;

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
          <h1 className="text-lg font-semibold text-zinc-900">API 配置</h1>
          <div className="w-9" />
        </div>
      </motion.div>

      <div className="px-6 py-6 space-y-4">
        <div className="bg-white p-4 border border-zinc-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-medium text-zinc-900">OpenAI API</h2>
              <p className="text-xs text-zinc-500 mt-0.5">ChatGPT Image (DALL-E 3)</p>
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium ${
              isOpenaiConfigured 
                ? 'bg-green-100 text-green-700' 
                : 'bg-zinc-100 text-zinc-500'
            }`}>
              {isOpenaiConfigured ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>已配置</span>
                </>
              ) : (
                <>
                  <X className="w-3 h-3" />
                  <span>未配置</span>
                </>
              )}
            </div>
          </div>
          
          <div className="relative">
            <input
              type={showOpenaiKey ? 'text' : 'password'}
              value={openaiKey}
              onChange={(e) => handleOpenaiChange(e.target.value)}
              placeholder="sk-..."
              className="w-full h-11 px-4 pr-11 bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowOpenaiKey(!showOpenaiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              {showOpenaiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="bg-white p-4 border border-zinc-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-medium text-zinc-900">Nanobanana API</h2>
              <p className="text-xs text-zinc-500 mt-0.5">高质量图像生成</p>
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium ${
              isNanoConfigured 
                ? 'bg-green-100 text-green-700' 
                : 'bg-zinc-100 text-zinc-500'
            }`}>
              {isNanoConfigured ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>已配置</span>
                </>
              ) : (
                <>
                  <X className="w-3 h-3" />
                  <span>未配置</span>
                </>
              )}
            </div>
          </div>
          
          <div className="relative">
            <input
              type={showNanoKey ? 'text' : 'password'}
              value={nanobananaKey}
              onChange={(e) => handleNanoChange(e.target.value)}
              placeholder="nb_..."
              className="w-full h-11 px-4 pr-11 bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNanoKey(!showNanoKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              {showNanoKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
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
            <>
              <Key className="w-5 h-5" />
              <span>{hasChanges ? '保存配置' : '暂无更改'}</span>
            </>
          )}
        </motion.button>

        <div className="pt-2 text-center">
          <p className="text-xs text-zinc-400 leading-relaxed">
            API 密钥仅保存在本地浏览器中<br />
            不会上传至任何服务器
          </p>
        </div>
      </div>
    </div>
  );
};
