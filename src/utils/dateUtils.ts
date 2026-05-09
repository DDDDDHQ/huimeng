export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDate(dateString: string): Date {
  return new Date(dateString);
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function getRelativeDate(date: Date): string {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays === 2) return '前天';
  if (diffDays < 7) return `${diffDays}天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
  return `${Math.floor(diffDays / 365)}年前`;
}

export function formatMonthYear(year: number, month: number): string {
  return `${year}年${month + 1}月`;
}

export function getMonthDates(year: number, month: number): string[] {
  const days = getDaysInMonth(year, month);
  return Array.from({ length: days }, (_, i) => {
    return formatDate(new Date(year, month, i + 1));
  });
}

export function getCalendarGrid(year: number, month: number): (string | null)[][] {
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const grid: (string | null)[][] = [];
  
  let currentDay = 1;
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  
  for (let i = 0; i < totalCells; i++) {
    const weekIndex = Math.floor(i / 7);
    if (!grid[weekIndex]) grid[weekIndex] = [];
    
    if (i < firstDay || currentDay > daysInMonth) {
      grid[weekIndex].push(null);
    } else {
      grid[weekIndex].push(formatDate(new Date(year, month, currentDay)));
      currentDay++;
    }
  }
  
  return grid;
}
