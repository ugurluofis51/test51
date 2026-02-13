import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  authUser: 'auth:user',
};

export const localStorage = {
  async setItem<T>(key: string, value: T) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async getItem<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  },
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  },
};
