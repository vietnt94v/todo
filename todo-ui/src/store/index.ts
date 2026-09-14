import { create } from 'zustand';

type Theme = 'light' | 'dark';

type AppState = {
  theme: Theme;
};

type AppActions = {
  toggleTheme: (theme: Theme) => void;
};

const useStore = create<AppState & AppActions>((set) => ({
  theme: 'light',
  toggleTheme: (theme) =>
    set(() => ({ theme: theme === 'light' ? 'dark' : 'light' })),
}));

export default useStore;
