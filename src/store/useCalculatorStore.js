import { create } from "zustand";

const useCalculatorStore = create((set) => ({
  components: JSON.parse(localStorage.getItem("calculatorLayout")) || [],
  result: "",
  darkMode: false,
  history: [], // ✅ Stores past states for undo
  future: [], // ✅ Stores redo states

  addComponent: (component) => set((state) => {
    const newComponents = [...state.components, component];
    localStorage.setItem("calculatorLayout", JSON.stringify(newComponents));

    return {
      components: newComponents,
      history: [...state.history, state.components], // ✅ Save past state
      future: [], // ✅ Clear redo history
    };
  }),

  removeComponent: (index) => set((state) => {
    const newComponents = state.components.filter((_, i) => i !== index);
    localStorage.setItem("calculatorLayout", JSON.stringify(newComponents));

    return {
      components: newComponents,
      history: [...state.history, state.components],
      future: [],
    };
  }),

  reset: () => {
    localStorage.removeItem("calculatorLayout");
    set({ components: [], result: "", history: [], future: [] }); // ✅ Reset history too
  },

  setResult: (newResult) => set({ result: newResult }),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  // ✅ Undo functionality
  undo: () => set((state) => {
    if (state.history.length === 0) return state; // No history left

    const previous = state.history[state.history.length - 1];
    const newHistory = state.history.slice(0, -1);
    return {
      components: previous,
      history: newHistory,
      future: [state.components, ...state.future],  
    };
  }),

 
  redo: () => set((state) => {
    if (state.future.length === 0) return state; // No redo available

    const next = state.future[0];
    const newFuture = state.future.slice(1);
    return {
      components: next,
      history: [...state.history, state.components], // ✅ Save current to history
      future: newFuture,
    };
  }),
}));

export default useCalculatorStore;
