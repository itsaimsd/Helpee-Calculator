import useCalculatorStore from "../store/useCalculatorStore";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useCalculatorStore();

  return (
    <button
      onClick={toggleDarkMode}
      className={`flex items-center px-5 py-2 w-45 rounded-full shadow-md transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 text-white hover:bg-gray-700 shadow-gray-700"
          : "bg-gray-200 text-black hover:bg-gray-300 shadow-gray-400"
      }`}
    >
      <span className="text-lg">
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </span>
    </button>
  );
};

export default DarkModeToggle;
