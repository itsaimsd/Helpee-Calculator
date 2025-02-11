import { useDraggable } from "@dnd-kit/core";
import PropTypes from "prop-types";

const DraggableButton = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { label: String(label) }, // ✅ Convert label to string
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`px-4 py-2 m-1 bg-blue-500 text-white rounded shadow hover:bg-blue-700 cursor-grab active:cursor-grabbing`}
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

// DraggableButton.propTypes = {
//   id: PropTypes.string.isRequired,
//   label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// };

export default DraggableButton;
