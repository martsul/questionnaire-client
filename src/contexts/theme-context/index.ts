import { createContext } from "react";

type Value = { toggleTheme: () => void; theme: string };

export const ThemeContext = createContext<Value | null>(null);
