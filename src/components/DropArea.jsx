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
import { useState } from "react";

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
      className={`px-5 py-3 m-2 text-white rounded-lg shadow-md cursor-pointer
         transition-all duration-200 transform ${
        isDragging
          ? "scale-110 opacity-50 bg-blue-500"
          : "bg-blue-500 hover:bg-blue-700 hover:shadow-xl active:scale-95"
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
  const [isHovered, setIsHovered] = useState(false);

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
          onDragEnter={() => setIsHovered(true)}
          onDragLeave={() => setIsHovered(false)}
          className={`w-full min-h-24 border-2 border-dashed flex flex-wrap p-6 rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800 transition-all duration-300 ${
            isHovered
              ? "border-blue-400 shadow-xl scale-105"
              : "border-gray-400"
          }`}
          style={{ touchAction: "none" }}
        >
          {components.length > 0 ? (
            components.map((component) => (
              <SortableButton
                key={component.id}
                id={component.id}
                label={component.label}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-lg italic">
              Drag components here...
            </p>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DropArea;
