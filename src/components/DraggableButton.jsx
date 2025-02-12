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
      onTouchStart={(e) => {
        setIsDragging(true);
        e.target.classList.add("touch-dragging");
      }}
      onTouchEnd={(e) => {
        setTimeout(() => setIsDragging(false), 300);
        e.target.classList.remove("touch-dragging");
      }}
      className={`px-4 py-2 m-1 bg-blue-500 text-white rounded shadow hover:bg-blue-700 cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50 scale-105" : "opacity-100"
      }`}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : "none",
        transition: isDragging ? "none" : "transform 0.2s ease",
        touchAction: "none",
      }}
    >
      {label}
    </button>
  );
};

export default DraggableButton;
