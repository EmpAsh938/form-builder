import React from "react";
import { useFormContext } from "../hooks/useFormContext";
import { toCamelCase } from "../utils/toCamelCase";

const GenerateCode: React.FC = () => {
    const { components } = useFormContext(); // Access components from context

    const generateZodSchema = () => {
        const schemaFields = components
            .map((item) => {
                if (!item.validations) return null;
                const fieldName = toCamelCase(item.component) || "unnamedField";
                const rules = item.validations;

                const stringValidations = [
                    rules.required ? ".nonempty()" : "",
                    rules.minLength ? `.min(${rules.minLength})` : "",
                    rules.maxLength ? `.max(${rules.maxLength})` : "",
                    rules.pattern ? `.regex(${rules.pattern})` : "",
                ].join("");

                const numberValidations = [
                    rules.required ? "" : ".optional()",
                    rules.min !== undefined ? `.gte(${rules.min})` : "",
                    rules.max !== undefined ? `.lte(${rules.max})` : "",
                ].join("");

                const arrayValidations = [
                    rules.required ? "" : ".optional()",
                    rules.minSelected ? `.min(${rules.minSelected})` : "",
                    rules.maxSelected ? `.max(${rules.maxSelected})` : "",
                ].join("");

                const allowedValuesValidation = rules.allowedValues
                    ? `.refine((val) => ${JSON.stringify(rules.allowedValues)}.includes(val), { message: "Invalid value" })`
                    : "";

                switch (item.component) {
                    case "Input Text":
                    case "Input Phone":
                    case "Password":
                    case "Address":
                        return `  ${fieldName}: z.string()${stringValidations}${allowedValuesValidation}`;
                    case "Input Number":
                        return `  ${fieldName}: z.number()${numberValidations}`;
                    case "Checkbox Group":
                        return `  ${fieldName}: z.array(z.string())${arrayValidations}`;
                    default:
                        return null;
                }
            })
            .filter(Boolean)
            .join(",\n");

        return `const validationSchema = z.object({\n${schemaFields}\n});`;
    };

    const generateReactCode = () => {
        const zodSchema = generateZodSchema();

        const stripProperties = (properties: Record<string, any>) => {
            // List of properties to strip
            const propertiesToRemove = ["text", "label", "placeholder", "value"];
            const filteredProperties: Record<string, any> = {};

            // Filter out the properties to be removed
            Object.keys(properties).forEach((key) => {
                if (!propertiesToRemove.includes(key)) {
                    filteredProperties[key] = properties[key];
                }
            });

            return filteredProperties;
        };


        return `import React from "react";
import { z } from "zod";

${zodSchema}

const GeneratedComponent = () => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const validatedData = validationSchema.parse(data);
            console.log("Validated Data:", validatedData);
        } catch (error) {
            console.error("Validation Error:", error.errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
${components
                .map((item) => {
                    const filteredProperties = stripProperties(item.properties); // Get the properties without text, label, placeholder, value
                    const styleString = JSON.stringify(filteredProperties).slice(1, -1); // Convert filtered properties to a valid style string

                    switch (item.component) {
                        case "H1":
                            return `            <h1 style={{ ${styleString} }}>
                ${item.properties.text || "Heading 1"}
            </h1>`;
                        case "H3":
                            return `            <h3 style={{ ${styleString} }}>
                ${item.properties.text || "Heading 3"}
            </h3>`;
                        case "Paragraph":
                            return `            <p style={{ ${styleString} }}>
                ${item.properties.text || "This is a paragraph."}
            </p>`;
                        case "Separator":
                            return `            <hr style={{ ${styleString} }} />`;
                        case "Button":
                            return `            <button style={{ ${styleString} }}>
                ${item.properties.text || "Click Me"}
            </button>`;
                        case "Input Text":
                        case "Input Phone":
                        case "Password":
                            return `            <input 
                name="${item.properties.name || "unnamedField"}"
                type="${item.component === "Password" ? "password" : "text"}" 
                placeholder="${item.properties.placeholder || "Enter value"}" 
                style={{ ${styleString} }} 
            />`;
                        case "Input Number":
                            return `            <input 
                name="${item.properties.name || "unnamedField"}"
                type="number" 
                placeholder="${item.properties.placeholder || "Enter number"}" 
                style={{ ${styleString} }} 
            />`;
                        case "Address":
                            return `            <textarea 
                name="${item.properties.name || "unnamedField"}"
                placeholder="${item.properties.placeholder || "Enter address"}" 
                style={{ ${styleString} }}
            ></textarea>`;
                        default:
                            return "";
                    }
                })
                .join("\n")}
        </form>
    );
};

export default GeneratedComponent;`;
    };

    const copyToClipboard = () => {
        const code = generateReactCode();
        navigator.clipboard.writeText(code);
        alert("Code copied to clipboard!");
    };

    return (
        <div className="p-4 bg-white border rounded-lg shadow-md h-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Generated React Code</h2>

            {/* Copy Code Button */}
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md"
                >
                    Copy Code
                </button>
            </div>

            {/* Code Viewer */}
            <div className="bg-gray-100 p-4 border rounded-lg shadow-inner overflow-auto h-96">
                <pre
                    className="whitespace-pre-wrap text-sm overflow-auto max-w-full"
                    style={{
                        wordBreak: "break-word", // Ensures long words wrap
                        overflowWrap: "break-word", // Ensures long lines wrap
                    }}
                >
                    {generateReactCode()}
                </pre>
            </div>
        </div>
    );
};

export default GenerateCode;
