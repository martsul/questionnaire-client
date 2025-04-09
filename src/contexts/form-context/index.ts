import { createContext } from "react";
import { FormContextValue } from "../../types/form/form-context-value";

export const FormContext = createContext<null| FormContextValue>(null)