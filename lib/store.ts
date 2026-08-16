import { create } from 'zustand';

interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

interface ProjectFile {
  id: string;
  name: string;
  content: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AppStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  currentProject: string | null;
  setCurrentProject: (projectId: string | null) => void;
  projectFiles: ProjectFile[];
  setProjectFiles: (files: ProjectFile[]) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
  currentProject: null,
  setCurrentProject: (currentProject) => set({ currentProject }),
  projectFiles: [],
  setProjectFiles: (projectFiles) => set({ projectFiles }),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));
