// import { useDraggable } from "@dnd-kit/core";

// const DraggableButton = ({ id, label }) => {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id,
//     data: { label: String(label) }, // ✅ Convert label to string
//   });

//   return (
//     <button
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       className={`px-4 py-2 m-1 bg-blue-500 text-white rounded shadow hover:bg-blue-700 cursor-grab active:cursor-grabbing`}
//       style={{
//         transform: transform
//           ? `translate(${transform.x}px, ${transform.y}px)`
//           : "none",
//         transition: "transform 0.2s ease", // ✅ Smooth drag effect
//       }}
//     >
//       {label}
//     </button>
//   );
// };

// // DraggableButton.propTypes = {
// //   id: PropTypes.string.isRequired,
// //   label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// // };

// export default DraggableButton;





import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

const DraggableButton = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { label: String(label) }, // ✅ Convert label to string
  });

  const [isDragging, setIsDragging] = useState(false);

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onTouchStart={() => setIsDragging(true)} // ✅ Fix touch-based drag issues
      onTouchEnd={() => setTimeout(() => setIsDragging(false), 300)} // ✅ Reset after drag
      className={`px-4 py-2 m-1 bg-blue-500 text-white rounded shadow hover:bg-blue-700 cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : "opacity-100" // ✅ Reduce opacity while dragging
      }`}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : "none",
        transition: "transform 0.2s ease", // ✅ Smooth drag effect
      }}
    >
      {label}
    </button>
  );
};

export default DraggableButton;
