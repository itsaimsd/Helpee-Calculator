// import { DndContext } from "@dnd-kit/core";
// import Navbar from "./components/Navbar";
// import AvailableComponents from "./components/AvailableComponents";
// import DropArea from "./components/DropArea";
// import ResultDisplay from "./components/ResultDisplay";
// import useCalculatorStore from "./store/useCalculatorStore";
// import DarkModeToggle from "./components/DarkModeToggle";

// const App = () => {
//   const { addComponent, reset, undo, redo, darkMode } = useCalculatorStore();

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!active || !over) return;
//     const draggedData = active.data.current;
//     if (!draggedData || !draggedData.label) return;
//     addComponent({ id: active.id, label: draggedData.label });
//   };

//   return (
//     <DndContext onDragEnd={handleDragEnd}>
//       <div
//         className={`min-h-screen transition-all ${
//           darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
//         } p-5 max-w-2xl mx-auto flex flex-col gap-6`}
//       >
//         <DarkModeToggle />
//         <Navbar />
//         <AvailableComponents />
//         <DropArea />
//         <ResultDisplay />
//         <div className="flex gap-4 mt-4">
//           <button
//             onClick={undo}
//             className="bg-yellow-500 text-white px-4 py-2 rounded"
//           >
//             Undo
//           </button>
//           <button
//             onClick={redo}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Redo
//           </button>
//           <button
//             onClick={reset}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Reset
//           </button>
//         </div>
//       </div>
//     </DndContext>
//   );
// };

// export default App;

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Navbar from "./components/Navbar";
import AvailableComponents from "./components/AvailableComponents";
import DropArea from "./components/DropArea";
import ResultDisplay from "./components/ResultDisplay";
import useCalculatorStore from "./store/useCalculatorStore";
import DarkModeToggle from "./components/DarkModeToggle";

const App = () => {
  const { addComponent, reset, undo, redo, darkMode } = useCalculatorStore();

  // ✅ Enable Mobile Dragging Support
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // ✅ Prevents accidental drags by requiring movement
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over) return;
    const draggedData = active.data.current;
    if (!draggedData || !draggedData.label) return;
    addComponent({ id: active.id, label: draggedData.label });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        className={`min-h-screen transition-all flex flex-col gap-6 p-5 max-w-2xl mx-auto ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        {/* ✅ Dark Mode Toggle */}
        <DarkModeToggle />

        {/* ✅ App Sections */}
        <Navbar />
        <AvailableComponents />
        <DropArea />
        <ResultDisplay />

        {/* ✅ Buttons for Undo, Redo & Reset */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={undo}
            className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600"
          >
            Undo
          </button>
          <button
            onClick={redo}
            className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
          >
            Redo
          </button>
          <button
            onClick={reset}
            className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>
    </DndContext>
  );
};

export default App;
