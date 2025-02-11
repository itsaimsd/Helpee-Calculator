import useCalculatorStore from "../store/useCalculatorStore";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useCalculatorStore();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded ${darkMode ? "bg-black text-white" : "bg-gray-800 text-white"}`}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
