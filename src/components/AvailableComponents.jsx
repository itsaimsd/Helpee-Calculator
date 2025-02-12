import DraggableButton from "./DraggableButton";

const AvailableComponents = () => {
  const buttons = [...Array(10).keys(), "+", "-", "*", "/"];

  return (
    <div className="p-6 border rounded-xl bg-white/40 backdrop-blur-md shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-all duration-300">
      <h2 className="text-lg font-semibold text-center text-gray-700 dark:text-gray-300 mb-3">
        Drag & Drop Components
      </h2>
      <div className="grid grid-cols-5 gap-3 place-items-center">
        {buttons.map((btn) => (
          <DraggableButton key={btn} id={`btn-${btn}`} label={btn} />
        ))}
      </div>
    </div>
  );
};

export default AvailableComponents;
