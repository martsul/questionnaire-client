import { createContext } from "react";
import { AuthorizationContextValue } from "../../types/authorization-context-value";

export const AuthorizationContext =
    createContext<AuthorizationContextValue | null>(null);
