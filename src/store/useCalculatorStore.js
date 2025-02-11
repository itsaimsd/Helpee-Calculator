import { create } from "zustand";

const useCalculatorStore = create((set) => ({
  components: JSON.parse(localStorage.getItem("calculatorLayout")) || [],
  result: "",
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || false, // ✅ Load from local storage
  history: [],
  future: [],

  addComponent: (component) =>
    set((state) => {
      // Generate a unique ID using timestamp
      const uniqueId = `${component.id}-${Date.now()}`;

      const newComponent = { ...component, id: uniqueId }; // ✅ Unique ID
      const newComponents = [...state.components, newComponent];

      localStorage.setItem("calculatorLayout", JSON.stringify(newComponents));

      return {
        components: newComponents,
        history: [...state.history, state.components], // ✅ Save past state
        future: [], // ✅ Clear redo history
      };
    }),

  removeComponent: (id) =>
    set((state) => {
      // ✅ Filter out the component with the matching ID
      const newComponents = state.components.filter(
        (component) => component.id !== id
      );
      localStorage.setItem("calculatorLayout", JSON.stringify(newComponents));

      return {
        components: newComponents,
        history: [...state.history, state.components], // ✅ Save past state
        future: [], // ✅ Clear redo history
      };
    }),

  reset: () => {
    localStorage.removeItem("calculatorLayout");
    set({ components: [], result: "", history: [], future: [] });
  },

  setResult: (newResult) => set({ result: newResult }),

  // ✅ Allow users to manually reorder inside Drop Area
  setComponents: (newComponents) =>
    set((state) => {
      localStorage.setItem("calculatorLayout", JSON.stringify(newComponents));
      return {
        components: newComponents,
        history: [...state.history, state.components],
        future: [],
      };
    }),

  // ✅ Dark mode toggle & save preference
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode)); // ✅ Save to localStorage
      return { darkMode: newMode };
    }),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;

      const previous = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      return {
        components: previous,
        history: newHistory,
        future: [state.components, ...state.future],
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;

      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        components: next,
        history: [...state.history, state.components],
        future: newFuture,
      };
    }),
}));

export default useCalculatorStore;
