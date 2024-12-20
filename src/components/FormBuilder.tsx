import { useState } from "react";
import Toolbar from "./Toolbar";
import FormCanvas from "./FormCanvas";
import Preview from "./Preview";
import GenerateCode from "./GenerateCode";

const FormBuilder = () => {
    const [view, setView] = useState<"edit" | "preview" | "generate">("edit"); // Track current view

    return (
        <div className="flex gap-4 p-4 h-screen bg-gray-100">
            {/* Conditionally render Toolbar only in "edit" mode */}
            {view === "edit" && <Toolbar />}

            {/* Form Canvas, Preview, or Generate Code Section */}
            <div className="flex-1 flex flex-col bg-gray-50 border rounded-lg shadow-md p-4">
                {/* Toolbar Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <button
                        onClick={() => setView("preview")}
                        className={`flex items-center gap-2 px-4 py-2 ${view === "preview" ? "bg-blue-600" : "bg-blue-400"
                            } text-white rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md`}
                    >
                        <span>🔍</span>
                        <span>Preview</span>
                    </button>
                    <button
                        onClick={() => setView("edit")}
                        className={`flex items-center gap-2 px-4 py-2 ${view === "edit" ? "bg-green-600" : "bg-green-400"
                            } text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md`}
                    >
                        <span>📝</span>
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={() => setView("generate")}
                        className={`flex items-center gap-2 px-4 py-2 ${view === "generate" ? "bg-gray-800" : "bg-gray-700"
                            } text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-md`}
                    >
                        <span>⚙️</span>
                        <span>Generate Code</span>
                    </button>
                </div>

                {/* Render the selected view */}
                {view === "edit" && <FormCanvas />}
                {view === "preview" && <Preview />}
                {view === "generate" && <GenerateCode />}
            </div>
        </div>
    );
};

export default FormBuilder;
