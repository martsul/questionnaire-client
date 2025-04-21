import { useTheme } from "../contexts/theme-context/use-theme";

export const useStatisticStyles = () => {
    const { theme } = useTheme();

    const darkTheme = {
        backgroundColor: "transparent",
        hAxis: {
            textStyle: { color: '#fff' },
        },
        vAxis: {
            textStyle: { color: '#fff' },
        },
        legend: { position: 'none' },
    };

    return theme === "dark" ? darkTheme : {legend: { position: 'none' },};
};
