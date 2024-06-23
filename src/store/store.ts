import { create } from "zustand";

interface State {
    darkMode: boolean;
}

interface Actions {
    setDarkMode: (darkmode: boolean) => void;
}

export const useSidebarStore = create<State & Actions>(set => ({
    darkMode: false, // initial state
    setDarkMode: (darkmode) => set({ darkMode: darkmode })
}))
