import useCalculatorStore from "../store/useCalculatorStore";

const ResultDisplay = () => {
  const { components, result, setResult } = useCalculatorStore();

  const evaluateExpression = () => {
    const expression = components.map((comp) => comp.label).join("");
    try {
      // Evaluate safely
      const safeResult = new Function(`return (${expression})`)();
      setResult(safeResult);
    } catch (error) {
      console.error("Calculation error:", error);
      setResult("Invalid Expression");
    }
  };

  return (
    <div className="p-6 border rounded-xl mt-4 bg-white/30 backdrop-blur-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 transition-all duration-300">
      <div className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
        {components.length
          ? components.map((comp) => comp.label).join(" ")
          : "Start typing..."}
      </div>

      {/* Calculation Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={evaluateExpression}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
        >
          =
        </button>
      </div>

      {/* Result Display */}
      <div
        className={`mt-4 text-3xl font-bold text-center ${
          result === "Invalid Expression"
            ? "text-red-500"
            : "text-green-700 dark:text-green-400"
        }`}
      >
        {result !== "" ? result : "Result: 0"}
      </div>
    </div>
  );
};

export default ResultDisplay;
