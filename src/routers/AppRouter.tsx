import { AppRoute } from "../types/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import SignIn from "../pages/signIn";
import NavBar from "../components/NavBar";
import Pdf from "../pages/pdf";
import { useAppSelector } from "../hooks/reduxHooks";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function AppRouter() {
    const { username } = useAppSelector((state) => state.auth);
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path={AppRoute.ROOT} element={<Home />} />
                <Route
                    path={AppRoute.AUTH}
                    element={
                        <PublicRoute username={username}>
                            <SignIn />
                        </PublicRoute>
                    }
                />
                <Route
                    path={AppRoute.PDF}
                    element={
                        <PrivateRoute username={username}>
                            <Pdf />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
