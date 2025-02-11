import { useDroppable } from "@dnd-kit/core";
import useCalculatorStore from "../store/useCalculatorStore";

const DropArea = () => {
  const { components, removeComponent } = useCalculatorStore();
  const { setNodeRef, isOver } = useDroppable({ id: "drop-area" });

  return (
    <div
      ref={setNodeRef}
      className={`w-full min-h-40 border-2 border-dashed border-gray-400 flex flex-wrap p-4 bg-white shadow-lg rounded-lg ${
        isOver ? "bg-gray-200" : "" // ✅ Fix green background issue
      }`}
    >
      {components.map((component, index) => (
        <button
          key={index}
          onClick={() => removeComponent(index)}
          className="px-4 py-2 m-1 bg-blue-500 text-white rounded shadow hover:bg-blue-700 cursor-pointer"
        >
          {component.label}
        </button>
      ))}
    </div>
  );
};

export default DropArea;
