import { AppRoute } from "../types/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ElHeight, ElName } from "../types";
import { useAppSelector } from "../hooks/reduxHooks";
import { useMemo, useState } from "react";
import Home from "../pages/home";
import NavBar from "../components/NavBar";
import NotFound from "../pages/notFound";
import Pdf from "../pages/pdf";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import SignIn from "../pages/signIn";

export default function AppRouter() {
    const { username } = useAppSelector((state) => state.auth);
    const [heights, setHeights] = useState<ElHeight[]>([]);
    const { totalOffset, navbarOffset } = useMemo(() => {
        let hOffset = 0;
        let nOffset = 56;
        if (heights.length) {
            hOffset = heights.reduce((acc, curr) => acc + curr.height, 0);
            nOffset =
                heights.find((item) => item.name === ElName.NAVBAR)?.height ??
                56;
        }
        return { totalOffset: hOffset, navbarOffset: nOffset };
    }, [heights]);
    return (
        <BrowserRouter>
            <NavBar heights={heights} setHeights={setHeights} />
            <Routes>
                <Route
                    path={AppRoute.ROOT}
                    element={<Home navbarOffset={navbarOffset} />}
                />
                <Route
                    path={AppRoute.AUTH}
                    element={
                        <PublicRoute username={username}>
                            <SignIn navbarOffset={navbarOffset} />
                        </PublicRoute>
                    }
                />
                <Route
                    path={AppRoute.PDF}
                    element={
                        <PrivateRoute username={username}>
                            <Pdf
                                heights={heights}
                                navbarOffset={navbarOffset}
                                setHeights={setHeights}
                                totalOffset={totalOffset}
                            />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
