import { DndContext, useDroppable } from "@dnd-kit/core";
import { useSortable, SortableContext, arrayMove } from "@dnd-kit/sortable"; // ✅ Correct Import
import { CSS } from "@dnd-kit/utilities";
import useCalculatorStore from "../store/useCalculatorStore";

const SortableButton = ({ id, label }) => {
  const { removeComponent } = useCalculatorStore();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => removeComponent(id)} // ✅ Instantly removes on first click
      className="px-4 py-2 m-1 bg-blue-500 text-white rounded shadow hover:bg-red-500 cursor-pointer"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {label}
    </button>
  );
};

const DropArea = () => {
  const { components, setComponents } = useCalculatorStore();
  const { setNodeRef } = useDroppable({ id: "drop-area" });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Find indexes of dragged and target elements
    const oldIndex = components.findIndex((item) => item.id === active.id);
    const newIndex = components.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      setComponents(arrayMove(components, oldIndex, newIndex)); // ✅ Update Zustand Store
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={components.map((comp) => comp.id)}>
        <div
          ref={setNodeRef}
          className="w-full min-h-40 border-2 border-dashed border-gray-400 flex flex-wrap p-4 bg-white shadow-lg rounded-lg"
        >
          {components.map((component) => (
            <SortableButton
              key={component.id}
              id={component.id} // ✅ Pass correct ID
              label={component.label}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DropArea;
