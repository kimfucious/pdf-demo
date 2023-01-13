import useColorTheme from "../../../hooks/useColorTheme";
import { MoonStars, Sun } from "tabler-icons-react";

export default function DarkModeToggleButton() {
    const { theme, toggleTheme } = useColorTheme();
    return (
        <button className="btn" onClick={() => toggleTheme()}>
            <i>
                {theme === "dark" ? (
                    <Sun color="var(--bs-warning-text)" />
                ) : (
                    <MoonStars color="var(--bs-info-text)" />
                )}
            </i>
        </button>
    );
}
