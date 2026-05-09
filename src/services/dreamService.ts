import { Dream, MoodTag, DreamTypeTag, HeatmapCell } from '@/types';
import { storageService, STORAGE_KEYS } from './storageService';
import { mockDreams } from '@/data/mockDreams';
import { calculateIntensity } from '@/utils/dreamUtils';

export const dreamService = {
  createDream(
    dreamData: Omit<Dream, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'likeCount'>
  ): Dream {
    const dreams = this.getAllDreams();
    const newDream: Dream = {
      ...dreamData,
      id: `dream_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 0,
      likeCount: 0,
    };
    
    dreams.unshift(newDream);
    storageService.save(STORAGE_KEYS.DREAMS, dreams);
    
    return newDream;
  },

  getAllDreams(): Dream[] {
    const storedDreams = storageService.load<Dream[]>(STORAGE_KEYS.DREAMS, []);
    if (storedDreams.length === 0) {
      storageService.save(STORAGE_KEYS.DREAMS, mockDreams);
      return mockDreams;
    }
    return storedDreams;
  },

  getDreamById(id: string): Dream | null {
    const dreams = this.getAllDreams();
    return dreams.find((d) => d.id === id) || null;
  },

  updateDream(id: string, updates: Partial<Dream>): Dream | null {
    const dreams = this.getAllDreams();
    const index = dreams.findIndex((d) => d.id === id);
    
    if (index === -1) return null;
    
    dreams[index] = {
      ...dreams[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    storageService.save(STORAGE_KEYS.DREAMS, dreams);
    return dreams[index];
  },

  deleteDream(id: string): boolean {
    const dreams = this.getAllDreams();
    const filteredDreams = dreams.filter((d) => d.id !== id);
    
    if (filteredDreams.length === dreams.length) return false;
    
    storageService.save(STORAGE_KEYS.DREAMS, filteredDreams);
    return true;
  },

  getDreamsByDateRange(start: string, end: string): Dream[] {
    const dreams = this.getAllDreams();
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    return dreams.filter((d) => {
      const dreamDate = new Date(d.date);
      return dreamDate >= startDate && dreamDate <= endDate;
    });
  },

  getDreamsByMood(mood: MoodTag): Dream[] {
    const dreams = this.getAllDreams();
    return dreams.filter((d) => d.moodTags.includes(mood));
  },

  getDreamsByType(type: DreamTypeTag): Dream[] {
    const dreams = this.getAllDreams();
    return dreams.filter((d) => d.dreamTypeTags.includes(type));
  },

  getHeatmapData(year: number, month: number): HeatmapCell[] {
    const dreams = this.getAllDreams();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: HeatmapCell[] = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayDreams = dreams.filter((d) => d.date === date);
      
      cells.push({
        date,
        count: dayDreams.length,
        dreams: dayDreams,
        intensity: calculateIntensity(dayDreams.length),
      });
    }
    
    return cells;
  },

  getDreamsForDate(date: string): Dream[] {
    const dreams = this.getAllDreams();
    return dreams.filter((d) => d.date === date);
  },

  getTodayDreams(): Dream[] {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return this.getDreamsForDate(dateStr);
  },

  getRecentDreams(limit: number = 5): Dream[] {
    const dreams = this.getAllDreams();
    return dreams.slice(0, limit);
  },

  searchDreams(query: string): Dream[] {
    const dreams = this.getAllDreams();
    const lowerQuery = query.toLowerCase();
    
    return dreams.filter(
      (d) =>
        d.description.toLowerCase().includes(lowerQuery) ||
        d.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
    );
  },
};
