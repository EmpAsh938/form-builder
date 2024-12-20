import { createContext, useState, ReactNode } from "react";

export interface ValidationRules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    allowedValues?: string[];
    minSelected?: number;
    maxSelected?: number;
}

// Interface for a draggable item
export interface DraggableItem {
    id: string; // Unique identifier for the item
    component: string; // Name of the component to render
    validations: ValidationRules | null; // Use `null` for cases without validation
    properties: Record<string, string>; // Flexible object for properties
}


// Interface for the FormContext
export interface FormContextType {
    components: DraggableItem[];
    addComponent: (componentData: Omit<DraggableItem, "id">) => void; // Omit `id` to auto-generate it
    removeComponent: (id: string) => void;
    reorderComponents: (oldIndex: number, newIndex: number) => void;
    updateComponentProperties: (id: string, properties: Record<string, string>) => void; // Update by `id`
    updateComponentText: (id: string, text: string) => void; // Update text by `id`
    updateComponentValidations: (id: string, validations: ValidationRules) => void; // Update validations by `id`;
}

// Create the context with a default undefined value
const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider to wrap the application
interface FormProviderProps {
    children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    const [components, setComponents] = useState<DraggableItem[]>([]);

    // Add a new component to the list
    const addComponent = (componentData: Omit<DraggableItem, "id">) => {
        setComponents((prev) => [
            ...prev,
            {
                id: Date.now().toString(), // Auto-generate a unique ID
                validations: componentData.validations,
                component: componentData.component,
                properties: componentData.properties || {},
            },
        ]);
    };

    // Remove a component by its ID
    const removeComponent = (id: string) => {
        setComponents((prev) => prev.filter((item) => item.id !== id));
    };

    // Reorder components by indices
    const reorderComponents = (oldIndex: number, newIndex: number) => {
        setComponents((prev) => {
            const reordered = [...prev];
            const [movedItem] = reordered.splice(oldIndex, 1);
            reordered.splice(newIndex, 0, movedItem);
            return reordered;
        });
    };

    const updateComponentProperties = (id: string, updatedProperties: Record<string, string>) => {
        setComponents((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, properties: { ...item.properties, ...updatedProperties } }
                    : item
            )
        );
    };


    // Update the text of a component by its ID
    const updateComponentText = (id: string, text: string) => {
        setComponents((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, properties: { ...item.properties, text, placeholder: text } } : item
            )
        );
    }

    // update the validations of a component by its ID
    const updateComponentValidations = (id: string, updatedValidations: ValidationRules) => {
        setComponents((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, validations: { ...item.validations, ...updatedValidations } }
                    : item
            )
        );
    }

    return (
        <FormContext.Provider
            value={{
                components,
                addComponent,
                removeComponent,
                reorderComponents,
                updateComponentText,
                updateComponentProperties,
                updateComponentValidations
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

export default FormContext;
