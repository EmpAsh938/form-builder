import { useContext } from "react";
import FormContext, { FormContextType } from "../context/FormContext"; // Import the type here

export const useFormContext = (): FormContextType => { // Ensure the hook returns the correct type
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};
