import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableButton = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="px-4 py-2 m-1 bg-green-500 text-white rounded shadow hover:bg-green-700 cursor-grab active:cursor-grabbing"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {label}
    </button>
  );
};

export default SortableButton;