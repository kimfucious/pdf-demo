import { useEffect, useState } from "react";

type Payload = {
    theme: string;
    toggleTheme: () => void;
};
export default function useColorTheme(): Payload {
    const [theme, setTheme] = useState("light");
    const storedTheme = localStorage.getItem("theme");

    useEffect(() => {
        const getPreferredTheme = () => {
            if (storedTheme) {
                return storedTheme;
            }
            return window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        };
        const preferred = getPreferredTheme();
        setTheme(preferred);
        localStorage.setItem("theme", preferred);
        const el = document.querySelector("[data-bs-theme]");
        el?.setAttribute("data-bs-theme", preferred);
    }, [storedTheme]);

    const toggleTheme = () => {
        const el = document.querySelector("[data-bs-theme]");
        const updatedTheme = theme === "dark" ? "light" : "dark";
        el?.setAttribute("data-bs-theme", updatedTheme);
        localStorage.setItem("theme", updatedTheme);
        console.log("Changing theme to:", updatedTheme);
        setTheme(updatedTheme);
    };
    return { theme, toggleTheme };
}
