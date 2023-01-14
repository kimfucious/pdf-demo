import { AppRoute, ElHeight, ElName } from "../../types";
import { NavLink } from "react-router-dom";
import { signOut } from "../../actions/authActions";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useRef } from "react";
import DarkModeToggleButton from "./components/DarkModeToggleButton";
import useColorTheme from "../../hooks/useColorTheme";
import useSize from "@react-hook/size";

interface Props {
    heights: ElHeight[];
    setHeights: (a: ElHeight[]) => void;
}

export default function NavBar({ heights, setHeights }: Props) {
    const target = useRef(null);
    const { username } = useAppSelector((state) => state.auth);
    const { theme } = useColorTheme();
    const isDark = theme === "dark";
    const dispatch = useAppDispatch();
    const [, height] = useSize(target);

    useEffect(() => {
        const newHeights = [...heights];
        const idx = newHeights.findIndex((item) => item.name === ElName.NAVBAR);
        if (idx !== -1) {
            const navBarHeight = newHeights[idx].height;
            if (navBarHeight !== height) {
                newHeights[idx].height = height;
                setHeights(newHeights);
            }
        } else {
            setHeights([
                ...newHeights,
                { name: ElName.NAVBAR, height: height },
            ]);
        }
    }, [height, heights, setHeights]);

    return (
        <nav
            ref={target}
            className="navbar fixed-top bg-body-tertiary"
        >
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
