import {
  DndContext,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSortable, SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useCalculatorStore from "../store/useCalculatorStore";

const SortableButton = ({ id, label }) => {
  const { removeComponent } = useCalculatorStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => removeComponent(id)}
      className={`px-4 py-2 m-1 text-white rounded shadow cursor-pointer transition-all duration-150 ease-in-out ${
        isDragging
          ? "scale-110 opacity-30 bg-blue-500"
          : "bg-blue-500 hover:bg-blue-800"
      }`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
      }}
    >
      {label}
    </button>
  );
};

const DropArea = () => {
  const { components, setComponents } = useCalculatorStore();
  const { setNodeRef } = useDroppable({ id: "drop-area" });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = components.findIndex((item) => item.id === active.id);
    const newIndex = components.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updatedComponents = arrayMove(components, oldIndex, newIndex);
      setComponents(updatedComponents);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={components.map((comp) => comp.id)}>
        <div
          ref={setNodeRef}
          className="w-full min-h-20 border-2 border-dashed border-gray-400 flex flex-wrap p-4 bg-white shadow-lg rounded-lg"
          style={{ touchAction: "none" }}
        >
          {components.map((component) => (
            <SortableButton
              key={component.id}
              id={component.id}
              label={component.label}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DropArea;
