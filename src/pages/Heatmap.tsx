import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDreamStore } from '@/stores/dreamStore';
import { DreamHeatmap } from '@/components/dreams/DreamHeatmap';
import { Dream } from '@/types';

export const Heatmap: React.FC = () => {
  const { dreams, loadDreams } = useDreamStore();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  useEffect(() => {
    loadDreams();
  }, [loadDreams]);

  const handleMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-5 pt-12 pb-6"
      >
        <h1 className="page-title">月度热力图</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {dreams.length} 个梦境记录
        </p>
      </motion.div>

      <div className="px-5">
        <div className="card p-5">
          <DreamHeatmap
            data={dreams.filter((d) => {
              const date = new Date(d.date);
              return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
            }).reduce((acc, dream) => {
              const existing = acc.find((d) => d.date === dream.date);
              if (existing) {
                existing.count++;
                existing.dreams.push(dream);
              } else {
                acc.push({
                  date: dream.date,
                  count: 1,
                  dreams: [dream],
                  intensity: dream.clarity >= 4 ? 'high' : dream.clarity >= 3 ? 'medium' : 'low',
                });
              }
              return acc;
            }, [] as { date: string; count: number; dreams: Dream[]; intensity: 'none' | 'low' | 'medium' | 'high' }[])}
            year={currentYear}
            month={currentMonth}
            onMonthChange={handleMonthChange}
          />
        </div>
      </div>
    </div>
  );
};
