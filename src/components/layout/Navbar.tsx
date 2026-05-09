import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, GitBranch, Grid3X3, Image, Moon } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/record', icon: Plus, label: '记录' },
  { path: '/timeline', icon: GitBranch, label: '时间轴' },
  { path: '/heatmap', icon: Grid3X3, label: '热力图' },
  { path: '/gallery', icon: Image, label: '画廊' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-space/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-star-gold to-dream-pink flex items-center justify-center group-hover:scale-110 transition-transform">
              <Moon className="w-6 h-6 text-deep-space" />
            </div>
            <span className="font-noto-serif text-xl font-bold text-moonlight">
              DreamWeaver
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-star-gold/20 text-star-gold'
                      : 'text-star-mist hover:text-moonlight hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-noto-sans">{label}</span>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center">
            <Link
              to="/record"
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-star-gold to-dream-pink flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Plus className="w-5 h-5 text-deep-space" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
