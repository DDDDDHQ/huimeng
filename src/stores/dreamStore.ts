import { create } from 'zustand';
import { Dream, MoodTag, DreamTypeTag } from '@/types';
import { dreamService } from '@/services/dreamService';

interface DreamState {
  dreams: Dream[];
  currentDream: Dream | null;
  loading: boolean;
  error: string | null;
  filters: {
    mood: MoodTag | null;
    type: DreamTypeTag | null;
    dateRange: { start: string; end: string } | null;
  };
  
  loadDreams: () => void;
  addDream: (dream: Omit<Dream, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'likeCount'>) => Dream;
  updateDream: (id: string, updates: Partial<Dream>) => void;
  deleteDream: (id: string) => void;
  setCurrentDream: (dream: Dream | null) => void;
  setFilters: (filters: Partial<DreamState['filters']>) => void;
  clearFilters: () => void;
  getFilteredDreams: () => Dream[];
}

export const useDreamStore = create<DreamState>((set, get) => ({
  dreams: [],
  currentDream: null,
  loading: false,
  error: null,
  filters: {
    mood: null,
    type: null,
    dateRange: null,
  },

  loadDreams: () => {
    set({ loading: true, error: null });
    try {
      const dreams = dreamService.getAllDreams();
      set({ dreams, loading: false });
    } catch (error) {
      set({ error: 'Failed to load dreams', loading: false });
    }
  },

  addDream: (dreamData) => {
    const newDream = dreamService.createDream(dreamData);
    set((state) => ({ dreams: [newDream, ...state.dreams] }));
    return newDream;
  },

  updateDream: (id, updates) => {
    dreamService.updateDream(id, updates);
    set((state) => ({
      dreams: state.dreams.map((d) =>
        d.id === id ? { ...d, ...updates } : d
      ),
    }));
  },

  deleteDream: (id) => {
    dreamService.deleteDream(id);
    set((state) => ({
      dreams: state.dreams.filter((d) => d.id !== id),
      currentDream: state.currentDream?.id === id ? null : state.currentDream,
    }));
  },

  setCurrentDream: (dream) => {
    set({ currentDream: dream });
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  clearFilters: () => {
    set({
      filters: {
        mood: null,
        type: null,
        dateRange: null,
      },
    });
  },

  getFilteredDreams: () => {
    const { dreams, filters } = get();
    let filtered = [...dreams];

    if (filters.mood) {
      filtered = filtered.filter((d) => d.moodTags.includes(filters.mood!));
    }

    if (filters.type) {
      filtered = filtered.filter((d) => d.dreamTypeTags.includes(filters.type!));
    }

    if (filters.dateRange) {
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      filtered = filtered.filter((d) => {
        const date = new Date(d.date);
        return date >= start && date <= end;
      });
    }

    return filtered;
  },
}));
