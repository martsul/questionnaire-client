import { CSSObjectWithLabel } from "react-select";
import { useTheme } from "../contexts/theme-context/use-theme";

export const useSelectStyles = () => {
    const { theme } = useTheme();

    const customStyles = {
        control: (provided: CSSObjectWithLabel) => ({
            ...provided,
            backgroundColor: theme === "dark" ? "#212529" : "#fff",
            borderColor: theme === "dark" ? "#495057" : "#dee2e6",
            borderWidth: "1px",
            borderRadius: "0.375rem",
            boxShadow: "none",
            "&:hover": {},
        }),
        menu: (provided: CSSObjectWithLabel) => ({
            ...provided,
            backgroundColor: theme === "dark" ? "#212529" : "#fff",
            padding: "0 3px",
            borderRadius: "0.375rem",
            marginTop: "0.25rem",
            boxShadow: "none",
            border:
                theme === "dark"
                    ? "1px solid rgb(112, 112, 112)"
                    : "1px solid rgb(171, 171, 171)",
        }),
        option: (
            provided: CSSObjectWithLabel,
            state: { isFocused: boolean }
        ) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? theme === "dark"
                    ? "#52525e"
                    : "#E5E7EB"
                : theme === "dark"
                ? "#212529"
                : "#fff",
            color: theme === "dark" ? "#FFFFFF" : "#1F2A44",
            borderRadius: "2px",
            "&:hover": {
                backgroundColor: theme === "dark" ? "#52525e" : "#E5E7EB",
            },
            padding: "0.325rem 1rem",
        }),
        dropdownIndicator: (provided: CSSObjectWithLabel) => ({
            ...provided,
            color: theme === "dark" ? "#9CA3AF" : "#373d43",
            "&:hover": {
                color: theme === "dark" ? "#FFFFFF" : "#373d43",
            },
        }),
        multiValue: (provided: CSSObjectWithLabel) => ({
            ...provided,
            backgroundColor: "#0d6efd",
            borderRadius: ".3em",
        }),
        multiValueLabel: (provided: CSSObjectWithLabel) => ({
            ...provided,
            color: "#fff",
        }),
        multiValueRemove: (provided: CSSObjectWithLabel) => ({
            ...provided,
            color: "#fff",
            "&:hover": {
                backgroundColor: "transparent",
                color: "#fff",
            },
        }),
        input: (provided: CSSObjectWithLabel) => ({
            ...provided,
            color: theme === "dark" ? "#FFFFFF" : "#1F2A44",
        }),
    };

    return { customStyles };
};
