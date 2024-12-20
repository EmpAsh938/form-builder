import FormBuilder from "./components/FormBuilder";
import { FormProvider } from "./context/FormContext";

function App() {
    return (
        <FormProvider>
            <div>
                <FormBuilder />
            </div>
        </FormProvider>
    );
}

export default App;
