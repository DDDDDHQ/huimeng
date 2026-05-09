import React from 'react';
import { HeatmapCell } from '@/types';
import { getCalendarGrid, getFirstDayOfMonth, formatMonthYear } from '@/utils/dateUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DreamHeatmapProps {
  data: HeatmapCell[];
  year: number;
  month: number;
  onMonthChange?: (year: number, month: number) => void;
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

const intensityColors = {
  none: 'bg-neutral-100 dark:bg-neutral-800',
  low: 'bg-neutral-300 dark:bg-neutral-600',
  medium: 'bg-neutral-500 dark:bg-neutral-500',
  high: 'bg-neutral-900 dark:bg-neutral-100',
};

export const DreamHeatmap: React.FC<DreamHeatmapProps> = ({
  data,
  year,
  month,
  onMonthChange,
}) => {
  const calendarGrid = getCalendarGrid(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const dataMap = new Map(data.map((d) => [d.date, d]));

  const handlePrevMonth = () => {
    const newMonth = month === 0 ? 11 : month - 1;
    const newYear = month === 0 ? year - 1 : year;
    onMonthChange?.(newYear, newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = month === 11 ? 0 : month + 1;
    const newYear = month === 11 ? year + 1 : year;
    onMonthChange?.(newYear, newMonth);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
          {formatMonthYear(year, month)}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs text-neutral-400 py-2"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {calendarGrid.flat().filter(Boolean).map((dateStr) => {
          const safeDateStr = dateStr!;
          const cellData = dataMap.get(safeDateStr);
          const intensity = cellData?.intensity || 'none';

          return (
            <div
              key={safeDateStr}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs ${intensityColors[intensity]}`}
            >
              <span className="text-neutral-600 dark:text-neutral-300 font-medium">
                {parseInt(safeDateStr.split('-')[2])}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center space-x-4 pt-2 text-xs text-neutral-500">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-neutral-100 dark:bg-neutral-800" />
          <span>无</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-neutral-300 dark:bg-neutral-600" />
          <span>少</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-neutral-500" />
          <span>中</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-neutral-900 dark:bg-neutral-100" />
          <span>多</span>
        </div>
      </div>
    </div>
  );
};
