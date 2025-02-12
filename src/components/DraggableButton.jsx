import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

const DraggableButton = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { label: String(label) },
  });

  const [isDragging, setIsDragging] = useState(false);

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setTimeout(() => setIsDragging(false), 300)}
      onTouchStart={(e) => {
        setIsDragging(true);
        e.target.classList.add("touch-dragging");
      }}
      onTouchEnd={(e) => {
        setTimeout(() => setIsDragging(false), 300);
        e.target.classList.remove("touch-dragging");
      }}
      className={`px-5 py-3 cursor-grab text-white rounded-lg shadow-md transition-all duration-200 transform ${
        isDragging
          ? "scale-110 opacity-50 bg-blue-500 shadow-lg"
          : "bg-blue-500 hover:bg-blue-700 hover:shadow-xl active:scale-95"
      }`}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : "none",
        transition: "transform 0.2s ease",
        touchAction: "none",
      }}
    >
      {label}
    </button>
  );
};

export default DraggableButton;
