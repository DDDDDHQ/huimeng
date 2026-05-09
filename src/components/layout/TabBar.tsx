import { Link, useLocation } from 'react-router-dom';
import { Home, User } from 'lucide-react';

const tabItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/profile', icon: User, label: '我的' },
];

export const TabBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-t border-black/5 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${
                isActive ? 'scale-110' : 'scale-100'
              }`}
            >
              <div
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-black text-white shadow-lg shadow-black/20'
                    : 'text-black/40'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
              </div>
              <span className={`text-[11px] font-medium mt-1 transition-colors ${
                isActive ? 'text-black' : 'text-black/40'
              }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
