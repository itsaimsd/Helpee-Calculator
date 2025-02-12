import useCalculatorStore from "../store/useCalculatorStore";

const ResultDisplay = () => {
  const { components, result, setResult } = useCalculatorStore();

  const evaluateExpression = () => {
    const expression = components.map((comp) => comp.label).join("");
    try {
      setResult(eval(expression));
    } catch (error) {
      console.error("Calculation error:", error);
      setResult("Error");
    }
  };

  return (
    <div className="p-4 border rounded mt-4 bg-gray-50 shadow-md">
      <div className="text-xl font-semibold">
        {components.map((comp) => comp.label).join(" ") || "Start typing..."}
      </div>
      <button
        onClick={evaluateExpression}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
      >
        =
      </button>
      <div className="mt-2 text-2xl font-bold">Result: {result}</div>
    </div>
  );
};

export default ResultDisplay;
