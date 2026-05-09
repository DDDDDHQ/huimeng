import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDreamStore } from '@/stores/dreamStore';
import { DreamTimeline } from '@/components/dreams/DreamTimeline';
import { FloatingActionButton } from '@/components/common/FloatingActionButton';
import { formatDate } from '@/utils/dateUtils';

export const Timeline: React.FC = () => {
  const { dreams, loadDreams } = useDreamStore();

  useEffect(() => {
    loadDreams();
  }, [loadDreams]);

  const today = new Date();
  const todayStr = formatDate(today);
  const todayDreams = dreams.filter((d) => d.date === todayStr);
  const otherDreams = dreams.filter((d) => d.date !== todayStr);

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-6 pt-16 pb-8"
      >
        <h1 className="page-title">时间轴</h1>
        <p className="page-subtitle">
          {dreams.length === 0 ? '记录你的每一个梦境' : `${dreams.length} 个梦境`}
        </p>
      </motion.div>

      <div className="px-6 space-y-10 pb-32">
        {todayDreams.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="section-title">今天</h2>
            </div>
            <DreamTimeline dreams={todayDreams} />
          </section>
        )}

        <section>
          <div className="mb-4">
            <h2 className="section-title">全部梦境</h2>
          </div>
          {otherDreams.length > 0 ? (
            <DreamTimeline dreams={otherDreams} />
          ) : dreams.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-neutral-400">还没有梦境记录</p>
            </div>
          ) : null}
        </section>
      </div>

      <FloatingActionButton />
    </div>
  );
};
