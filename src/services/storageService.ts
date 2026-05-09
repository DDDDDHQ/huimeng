const STORAGE_KEYS = {
  DREAMS: 'dreamweaver_dreams',
  USER: 'dreamweaver_user',
  SETTINGS: 'dreamweaver_settings',
};

const DATA_VERSION = '1.0';

interface StorageData<T> {
  version: string;
  data: T;
  updatedAt: string;
}

export const storageService = {
  save<T>(key: string, data: T): void {
    const storageData: StorageData<T> = {
      version: DATA_VERSION,
      data,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(key, JSON.stringify(storageData));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  load<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      
      const storageData: StorageData<T> = JSON.parse(item);
      return storageData.data;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return defaultValue;
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },

  clear(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },

  migrate(fromVersion: string, toVersion: string): void {
    if (fromVersion === toVersion) return;
    console.log(`Migrating data from ${fromVersion} to ${toVersion}`);
  },
};

export { STORAGE_KEYS };
