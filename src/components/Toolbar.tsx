import { useState } from "react";
import {
    AiOutlineFontSize,
    AiOutlineBold,
    AiOutlineEdit,
    AiOutlineMinus,
    // AiOutlineForm,
    AiOutlineFieldNumber,
    AiOutlinePhone,
    AiOutlineLock,
    AiOutlineHome,
    AiOutlineDown,
    AiOutlineCheckSquare,
    AiOutlineDotChart,
    AiOutlineClose,
    AiOutlineMenu,
} from "react-icons/ai";


const Toolbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle the toolbar visibility


    const items = [
        // Heading 1
        {
            id: "h1",
            label: "H1",
            icon: <AiOutlineFontSize size={24} />,
            properties: {
                text: "Heading 1",
                fontSize: "32px",
                fontWeight: "bold",
                color: "#000000",
                textAlign: "center",
                margin: "16px 0",
            },
        },
        // Heading 3
        {
            id: "h3",
            label: "H3",
            icon: <AiOutlineBold size={24} />,
            properties: {
                text: "Heading 3",
                fontSize: "24px",
                fontWeight: "medium",
                color: "#333333",
                textAlign: "left",
                margin: "12px 0",
            },
        },
        // Paragraph
        {
            id: "paragraph",
            label: "Paragraph",
            icon: <AiOutlineEdit size={24} />,
            properties: {
                text: "This is a paragraph.",
                fontSize: "16px",
                color: "#555555",
                lineHeight: "1.5",
                textAlign: "justify",
                margin: "8px 0",
            },
        },
        // Separator
        {
            id: "separator",
            label: "Separator",
            icon: <AiOutlineMinus size={24} />,
            properties: {
                height: "2px",
                color: "#dddddd",
                width: "100%",
                margin: "16px 0",
                style: "solid", // Options: "dotted", "dashed"
            },
        },
        // button
        {
            id: "button",
            label: "Button",
            icon: <AiOutlineLock size={24} />, // Correct icon name
            properties: {
                text: "Button",
                height: "40px", // Default button height
                color: "#222", // Default button text color
                width: "fit-content", // Default button width
                margin: "auto 0", // Default margin
                padding: "8px 16px", // Default padding
                style: "solid", // Default border style, options: "solid", "dotted", "dashed"
                backgroundColor: "#007bff", // Default background color
                borderRadius: "4px", // Default border radius
            },
        },
        // Input Text
        {
            id: "input-text",
            label: "Input Text",
            icon: <AiOutlineEdit size={24} />,
            properties: {
                label: "Text Input",
                placeholder: "Enter text",
                value: "",
                width: "100%",
                height: "40px",
                color: "#333333",
                backgroundColor: "#ffffff",
                borderColor: "#cccccc",
                borderWidth: "1px",
                borderRadius: "4px",
                padding: "8px",
                fontSize: "14px",
            },
            validation: {
                maxLength: 100,
                minLength: 1,
                required: true,
            },
        },
        // Input Number
        {
            id: "input-number",
            label: "Input Number",
            icon: <AiOutlineFieldNumber size={24} />,
            properties: {
                label: "Number Input",
                placeholder: "Enter number",
                value: 0,
                width: "100%",
                height: "40px",
                color: "#333333",
                backgroundColor: "#ffffff",
                borderColor: "#cccccc",
                borderWidth: "1px",
                borderRadius: "4px",
                padding: "8px",
                fontSize: "14px",
            },
            validation: {
                min: 0,
                max: 100,
            },
        },
        // Input Telephone
        {
            id: "input-telephone",
            label: "Input Phone",
            icon: <AiOutlinePhone size={24} />,
            properties: {
                label: "Phone Number",
                placeholder: "Enter phone number",
                value: "",
                width: "100%",
                height: "40px",
                color: "#333333",
                backgroundColor: "#ffffff",
                borderColor: "#cccccc",
                borderWidth: "1px",
                borderRadius: "4px",
                padding: "8px",
                fontSize: "14px",
            },
            validation: {
                minLength: 10,
                maxLength: 10,
                required: true,
            },
        },
        // Input Password
        {
            id: "input-password",
            label: "Password",
            icon: <AiOutlineLock size={24} />,
            properties: {
                label: "Password Input",
                placeholder: "Enter password",
                value: "",
                width: "100%",
                height: "40px",
                color: "#333333",
                backgroundColor: "#ffffff",
                borderColor: "#cccccc",
                borderWidth: "1px",
                borderRadius: "4px",
                padding: "8px",
                fontSize: "14px",
            },
            validation: {
                minLength: 8,
                maxLength: 20,
                required: true,
            },
        },
        // Input Address
        {
            id: "input-address",
            label: "Address",
            icon: <AiOutlineHome size={24} />,
            properties: {
                label: "Address Input",
                placeholder: "Enter address",
                value: "",
                width: "100%",
                height: "80px",
                color: "#333333",
                backgroundColor: "#ffffff",
                borderColor: "#cccccc",
                borderWidth: "1px",
                borderRadius: "4px",
                padding: "8px",
                fontSize: "14px",
            },
            validation: {
                maxLength: 200,
            },
        },
        // Dropdown
        {
            id: "dropdown",
            label: "Dropdown",
            icon: <AiOutlineDown size={24} />,
            properties: {
                options: ["Option 1", "Option 2", "Option 3"],
                width: "100%",
                height: "40px",
                color: "#333333",
                backgroundColor: "#ffffff",
                borderColor: "#cccccc",
                borderWidth: "1px",
                borderRadius: "4px",
            },
            // validation: {
            //     allowedValues: ["Option 1", "Option 2", "Option 3"],
            // },
        },
        // Radio Group
        {
            id: "radio-group",
            label: "Radio",
            icon: <AiOutlineDotChart size={24} />,
            properties: {
                options: ["Option 1", "Option 2", "Option 3"],
                color: "#333333",
                fontSize: "14px",
                spacing: "8px",
            },
            // validation: {
            //     allowedValues: ["Option 1", "Option 2", "Option 3"],
            // },
        },
        // Checkbox Group
        {
            id: "checkbox-group",
            label: "Checkbox",
            icon: <AiOutlineCheckSquare size={24} />,
            properties: {
                options: ["Checkbox 1", "Checkbox 2", "Checkbox 3"],
                color: "#333333",
                fontSize: "14px",
                spacing: "8px",
            },
            // validation: {
            //     minSelected: 1,
            //     maxSelected: 3,
            // },
        },
    ];

    return (
        <>
            {/* Floating Menu Button for Small Screens */}
            <button
                className="fixed top-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>

            {/* Toolbar Drawer */}
            <div
                className={`
                    fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 overflow-y-auto
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                    md:relative md:translate-x-0 md:shadow-none
                `}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-700">Components</h3>
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        <AiOutlineClose size={20} />
                    </button>
                </div>

                {/* Toolbar Items */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={(e) =>
                                e.dataTransfer.setData(
                                    "application/json",
                                    JSON.stringify({
                                        id: item.id,
                                        component: item.label,
                                        validations: item.validation,
                                        properties: item.properties,
                                    })
                                )
                            }
                            className="flex flex-col items-center gap-1 p-3 bg-gray-50 border rounded-lg shadow-sm cursor-grab hover:bg-blue-100 active:scale-95 transition-all duration-200"
                        >
                            <div className="text-blue-500">{item.icon}</div>
                            <span className="text-sm font-medium text-gray-700 text-center">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Toolbar;
