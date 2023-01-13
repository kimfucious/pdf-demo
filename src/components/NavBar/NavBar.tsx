import { AppRoute } from "../../types";
import { NavLink } from "react-router-dom";
import { signOut } from "../../actions/authActions";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import DarkModeToggleButton from "./components/DarkModeToggleButton";
import useColorTheme from "../../hooks/useColorTheme";

export default function NavBar() {
    const { username } = useAppSelector((state) => state.auth);
    const { theme } = useColorTheme();
    const isDark = theme === "dark";
    const dispatch = useAppDispatch();
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container">
                <NavLink to={AppRoute.ROOT} className="navbar-brand">
                   PDF Demo 
                </NavLink>
                <div>
                    {username && (
                        <button
                            className={`btn btn-sm btn-${
                                isDark ? "outline-primary" : "primary"
                            } `}
                            onClick={() => dispatch(signOut())}
                        >
                            Sign Out
                        </button>
                    )}
                    <DarkModeToggleButton />
                </div>
            </div>
        </nav>
    );
}
