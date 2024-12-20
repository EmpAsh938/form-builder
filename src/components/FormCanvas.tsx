import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableComponent from "./DraggableComponent";
import { useFormContext } from "../hooks/useFormContext";
import { ValidationRules } from "../context/FormContext";

const FormCanvas: React.FC = () => {
    const { components, addComponent, reorderComponents, removeComponent, updateComponentText, updateComponentProperties, updateComponentValidations } = useFormContext();

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("application/json");
        try {
            const componentData = JSON.parse(data);
            addComponent(componentData); // Pass the full component data
        } catch (error) {
            console.error("Invalid component data:", error);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const newIndex = components.findIndex((item) => item.id === over?.id);
            const oldIndex = components.findIndex((item) => item.id === active.id);
            reorderComponents(oldIndex, newIndex);
        }
    };

    const handleDelete = (id: string) => {
        removeComponent(id);
    };

    const handleChange = (id: string, newText: string) => {
        updateComponentText(id, newText); // Update text in the parent context
    };

    const handleEdit = (id: string, updatedProperties: Record<string, string>, updatedValidations: ValidationRules | null) => {
        updateComponentProperties(id, updatedProperties);
        if (updatedValidations) updateComponentValidations(id, updatedValidations);
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="flex-1 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg shadow-inner p-6 min-h-[400px] w-full overflow-auto"
            >
                {/* Placeholder when no components */}
                {components.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 text-lg font-semibold animate-pulse">
                        <div className="mb-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-gray-300"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <path d="M3 9h18M9 21V9"></path>
                            </svg>
                        </div>
                        Drop components here
                    </div>
                )}

                {/* Render draggable components */}
                <SortableContext
                    items={components.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-3">
                        {components.map((item) => (
                            <DraggableComponent
                                key={item.id}
                                id={item.id}
                                component={item.component}
                                validations={item.validations}
                                properties={item.properties}
                                onDelete={handleDelete}
                                onChange={handleChange}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                </SortableContext>
            </div>
        </DndContext>
    );
};

export default FormCanvas;
