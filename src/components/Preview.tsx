import React from "react";
import { useFormContext } from "../hooks/useFormContext";

// Map component types to render functions
const renderComponent = (item: any) => {
    const { component, properties } = item;

    const defaultStyles = {
        margin: "0",
        padding: "0",
        color: "#000000",
        fontSize: "14px",
    };

    switch (component) {
        case "H1":
            return <h1 style={{ ...defaultStyles, ...properties }}>{properties.text || "Heading 1"}</h1>;
        case "H3":
            return <h3 style={{ ...defaultStyles, ...properties }}>{properties.text || "Heading 3"}</h3>;
        case "Paragraph":
            return <p style={{ ...defaultStyles, ...properties }}>{properties.text || "This is a paragraph."}</p>;
        case "Separator":
            return <hr style={{ ...defaultStyles, ...properties }} />;
        case "Button":
            return (
                <button style={{ ...defaultStyles, ...properties }}>
                    {properties.text || "Click Me"}
                </button>
            );
        case "Input Text":
            return (
                <input
                    type="text"
                    placeholder={properties.placeholder || "Enter text"}
                    readOnly
                    style={{ ...defaultStyles, ...properties }}
                />
            );
        case "Input Number":
            return (
                <input
                    type="number"
                    placeholder={properties.placeholder || "Enter number"}
                    readOnly
                    style={{ ...defaultStyles, ...properties }}
                />
            );
        case "Input Phone":
            return (
                <input
                    type="tel"
                    placeholder={properties.placeholder || "Enter phone number"}
                    readOnly
                    style={{ ...defaultStyles, ...properties }}
                />
            );
        case "Password":
            return (
                <input
                    type="password"
                    placeholder={properties.placeholder || "Enter password"}
                    readOnly
                    style={{ ...defaultStyles, ...properties }}
                />
            );
        case "Address":
            return (
                <textarea
                    placeholder={properties.placeholder || "Enter address"}
                    readOnly
                    style={{ ...defaultStyles, ...properties }}
                />
            );
        case "Radio":
            return (
                <div>
                    {properties.options.map((option: string, index: number) => (
                        <label key={index} style={{ marginRight: "8px" }}>
                            <input
                                type="radio"
                                name={item.id}
                                value={option}
                                disabled
                                style={{ marginRight: "4px" }}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            );
        case "Checkbox":
            return (
                <div>
                    {properties.options.map((option: string, index: number) => (
                        <label key={index} style={{ marginRight: "8px" }}>
                            <input
                                type="checkbox"
                                value={option}
                                disabled
                                style={{ marginRight: "4px" }}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            );
        case "Dropdown":
            return (
                <select disabled style={{ ...defaultStyles, ...properties }}>
                    {properties.options.map((option: string, index: number) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        default:
            return <p className="text-gray-400">Unsupported component type: {component}</p>;
    }
};

const Preview: React.FC = () => {
    const { components } = useFormContext();

    return (
        <div className="p-4 bg-white border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Form Preview</h2>
            <div className="space-y-4">
                {components.length === 0 ? (
                    <p className="text-gray-400">No components to preview.</p>
                ) : (
                    components.map((item) => (
                        <div key={item.id} className="p-2 py-0">
                            {renderComponent(item)}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Preview;
