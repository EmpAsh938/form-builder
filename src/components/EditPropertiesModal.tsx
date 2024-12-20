import { useState, useEffect } from "react";
import { ValidationRules } from "../context/FormContext";

interface EditPropertiesModalProps {
    isOpen: boolean;
    onClose: () => void;
    validations: ValidationRules | null;
    properties: Record<string, any>;
    onSave: (properties: Record<string, any>, validations: ValidationRules | null) => void;
}

const EditPropertiesModal: React.FC<EditPropertiesModalProps> = ({
    isOpen,
    onClose,
    validations,
    properties,
    onSave,
}) => {
    const [editedProperties, setEditedProperties] = useState(properties);
    const [validationRules, setValidationRules] = useState<ValidationRules | null>(validations);
    const [options, setOptions] = useState<string[]>(
        Array.isArray(properties.options)
            ? properties.options
            : typeof properties.options === "string"
                ? properties.options.split(",")
                : []
    );

    useEffect(() => {
        setEditedProperties(properties);
        setValidationRules(validations);
        setOptions(
            Array.isArray(properties.options)
                ? properties.options
                : typeof properties.options === "string"
                    ? properties.options.split(",")
                    : []
        );
    }, [properties, validations]);

    const handleInputChange = (key: string, value: string) => {
        setEditedProperties((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleValidationChange = (field: string, updatedRules: boolean | number | string[] | RegExp) => {
        setValidationRules((prev) => ({
            ...prev,
            [field]: updatedRules,
        }));
    };

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
        setEditedProperties((prev) => ({
            ...prev,
            options: updatedOptions,
        }));
    };

    const addOption = () => {
        setOptions((prev) => [...prev, ""]);
    };

    const removeOption = (index: number) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
        setEditedProperties((prev) => ({
            ...prev,
            options: updatedOptions,
        }));
    };

    const handleSave = () => {
        onSave(editedProperties, validationRules);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed h-screen inset-0 z-50 flex items-center justify-center p-2 md:p-0 bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-[400px] w-full h-[90%] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Edit Properties</h2>
                <div className="space-y-4">
                    {/* Edit generic properties */}
                    {Object.keys(editedProperties)
                        .filter((key) => key !== "options") // Skip options for separate handling
                        .map((key) => (
                            <div key={key} className="flex flex-col">
                                <label className="text-base font-semibold capitalize">{key}</label>
                                <input
                                    type="text"
                                    value={editedProperties[key]}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                    className="border rounded p-2"
                                />
                            </div>
                        ))}

                    {/* Edit options for select, radio, checkbox */}
                    <>
                        <h3 className="text-base font-semibold">Options</h3>
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="border rounded p-2 flex-grow"
                                    placeholder={`Option ${index + 1}`}
                                />
                                <button
                                    onClick={() => removeOption(index)}
                                    className="text-red-500 px-2 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addOption}
                            className="text-gray-700 px-4 py-2 rounded mt-2"
                        >
                            Add Option
                        </button>
                    </>

                    {/* Edit validation rules */}
                    {validationRules && (
                        <>
                            <h3 className="text-lg font-semibold mt-4">Validation Rules</h3>
                            {Object.entries(validationRules).map(([key, rules]) => (
                                <div key={key} className="flex flex-col">
                                    <label className="text-base font-semibold capitalize">{key}</label>
                                    {typeof rules === "boolean" && (
                                        <input
                                            type="checkbox"
                                            checked={rules}
                                            onChange={(e) => handleValidationChange(key, e.target.checked)}
                                            className="h-4 w-4"
                                        />
                                    )}
                                    {typeof rules === "number" && (
                                        <input
                                            type="number"
                                            value={rules || ""}
                                            onChange={(e) => handleValidationChange(key, parseInt(e.target.value) || 0)}
                                            placeholder={`Enter ${key}`}
                                            className="border rounded p-2 w-20"
                                        />
                                    )}
                                    {Array.isArray(rules) && rules.every((item) => typeof item === "string") && (
                                        <input
                                            type="text"
                                            value={rules.join(", ")}
                                            onChange={(e) =>
                                                handleValidationChange(key, e.target.value.split(",").map((val) => val.trim()))
                                            }
                                            placeholder="Enter allowed values"
                                            className="border rounded p-2 flex-grow"
                                        />
                                    )}
                                    {rules instanceof RegExp && (
                                        <input
                                            type="text"
                                            value={rules.source || ""}
                                            onChange={(e) => handleValidationChange(key, new RegExp(e.target.value))}
                                            placeholder="Enter regex pattern"
                                            className="border rounded p-2 flex-grow"
                                        />
                                    )}
                                    {/* Fallback for unsupported rule types */}
                                    {!(typeof rules === "boolean" || typeof rules === "number" || rules instanceof RegExp || Array.isArray(rules)) && (
                                        <p className="text-red-500 text-sm">
                                            Unsupported rule type: {typeof rules} for {key}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </>
                    )}

                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPropertiesModal;
