import React from 'react';
import { Outlet } from 'react-router-dom';
import { TabBar } from './TabBar';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      <main className="relative">
        <Outlet />
      </main>
      
      <TabBar />
    </div>
  );
};
