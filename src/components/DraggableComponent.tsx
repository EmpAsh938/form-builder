import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillSetting } from "react-icons/ai";
import { MdOutlineDragIndicator } from "react-icons/md";
import EditPropertiesModal from "./EditPropertiesModal";
import { ValidationRules } from "../context/FormContext";

const DraggableComponent: React.FC<{
    id: string;
    component: string;
    validations: ValidationRules | null;
    properties: Record<string, string>;
    onDelete: (id: string) => void;
    onChange: (id: string, text: string) => void;
    onEdit: (id: string, updatedProperties: Record<string, string>, updatedValidations: ValidationRules | null) => void;
}> = ({ id, validations, component, properties, onDelete, onChange, onEdit }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(properties.text || properties.placeholder || "");

    // Open and close modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Handle inline text editing
    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onChange(id, text);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    // Sync text state with properties
    useEffect(() => {
        setText(properties.text || properties.placeholder || "");
    }, [properties.text, properties.placeholder]);

    const renderComponent = () => {
        switch (component.toLowerCase()) {
            case "heading":
                const HeadingTag = properties.tag || "h2"; // Default to h2 if no tag is specified
                return (
                    <HeadingTag
                        style={{
                            color: properties.color || "#000",
                            fontSize: properties.fontSize || "1.5rem",
                            textAlign: properties.textAlign || "left",
                        }}
                        onDoubleClick={handleDoubleClick}
                    >
                        {isEditing ? (
                            <input
                                type="text"
                                value={text}
                                onChange={handleTextChange}
                                onBlur={handleBlur}
                                autoFocus
                                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-400 text-gray-800"
                            />
                        ) : (
                            text
                        )}
                    </HeadingTag>
                );

            case "paragraph":
                return (
                    <p
                        style={{
                            color: properties.color || "#000",
                            fontSize: properties.fontSize || "1rem",
                            textAlign: properties.textAlign || "left",
                            lineHeight: properties.lineHeight || "1.5",
                        }}
                        onDoubleClick={handleDoubleClick}
                    >
                        {isEditing ? (
                            <input
                                type="text"
                                value={text}
                                onChange={handleTextChange}
                                onBlur={handleBlur}
                                autoFocus
                                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-400 text-gray-800"
                            />
                        ) : (
                            text
                        )}
                    </p>
                );

            case "button":
                return (
                    <button
                        style={{
                            backgroundColor: properties.backgroundColor || "#007bff", // Default to primary blue
                            color: properties.color || "#fff", // Default to white text
                            padding: properties.padding || "8px 16px", // Default padding
                            borderRadius: properties.borderRadius || "4px", // Default rounded corners
                            border: properties.border || "none", // Default to no border
                            width: properties.width || "auto", // Default to auto width
                            height: properties.height || "auto", // Default to auto height
                            margin: properties.margin || "0", // Default to no margin
                        }}
                        onDoubleClick={handleDoubleClick} // Event for double-clicking
                        className="transition-all duration-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {isEditing ? (
                            <input
                                type="text"
                                value={text}
                                onChange={handleTextChange} // Update the button text
                                onBlur={handleBlur} // Exit editing mode on blur
                                autoFocus
                                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-400 text-gray-800"
                            />
                        ) : (
                            text // Render the current button text
                        )}
                    </button>
                );

            case "radio":
                return (
                    <div onDoubleClick={handleDoubleClick} className="cursor-pointer">
                        {text || "Radio Button"}
                    </div>
                );

            case "checkbox":
                return (
                    <div onDoubleClick={handleDoubleClick} className="cursor-pointer">
                        {text || "Checkbox"}
                    </div>
                );

            case "dropdown":
                return (
                    <div onDoubleClick={handleDoubleClick} className="cursor-pointer">
                        {text || "Dropdown"}
                    </div>
                );

            case "separator":
                return (
                    <div
                        style={{
                            height: properties.height || "2px",
                            backgroundColor: properties.color || "#ccc",
                            width: properties.width || "100%",
                            margin: properties.margin || "8px 0",
                            borderStyle: properties.style || "solid",
                        }}
                        className="w-full"
                    />
                );

            default:
                return (
                    <span
                        className="block font-medium text-gray-700 truncate"
                        onDoubleClick={handleDoubleClick}
                    >
                        {isEditing ? (
                            <input
                                type="text"
                                value={text}
                                onChange={handleTextChange}
                                onBlur={handleBlur}
                                autoFocus
                                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-400 text-gray-800"
                            />
                        ) : (
                            text
                        )}
                    </span>
                );
        }
    };


    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                className="flex flex-col items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 md:flex-row md:items-center md:justify-between md:gap-0"
            >
                {/* Drag handle */}
                <div
                    {...listeners}
                    className="cursor-move text-gray-500 hover:text-gray-700 p-2 rounded-lg transition-colors sm:self-start"
                >
                    <MdOutlineDragIndicator size={20} />
                </div>

                {/* Render the component */}
                <div className="flex-1 mx-4">
                    {renderComponent()}
                </div>

                <div className="flex items-center space-x-2 sm:space-x-0 sm:mt-2 sm:flex-wrap sm:gap-2">
                    {/* Settings button */}
                    <button
                        onClick={handleOpenModal}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all focus:outline-none focus:ring focus:ring-blue-300"
                        title="Edit Properties"
                    >
                        <AiFillSetting size={20} />
                    </button>

                    {/* Delete button */}
                    <button
                        onClick={() => onDelete(id)}
                        className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100 transition-all focus:outline-none focus:ring focus:ring-red-300"
                        title="Delete Component"
                    >
                        <AiFillDelete size={20} />
                    </button>
                </div>
            </div>

            {/* EditPropertiesModal */}
            <EditPropertiesModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                validations={validations}
                properties={properties}
                onSave={(updatedProperties, updatedValidations) => onEdit(id, updatedProperties, updatedValidations)}
            />
        </>
    );

};

export default DraggableComponent;
