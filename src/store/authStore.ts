import { create } from 'zustand';
import { localStorage, storageKeys } from '../storage/localStorage';

type AuthUser = {
  email: string;
  fullName?: string;
};

type AuthState = {
  user: AuthUser | null;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setUser: (user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,
  hydrate: async () => {
    const user = await localStorage.getItem<AuthUser>(storageKeys.authUser);
    set({ user, hydrated: true });
  },
  setUser: async (user) => {
    await localStorage.setItem(storageKeys.authUser, user);
    set({ user });
  },
  logout: async () => {
    await localStorage.removeItem(storageKeys.authUser);
    set({ user: null });
  },
}));
