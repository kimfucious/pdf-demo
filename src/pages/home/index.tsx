import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { AppRoute } from "../../types";
import felix from "../../assets/images/felix_show.gif";

export default function Home() {
    const navigate = useNavigate();
    const { username } = useAppSelector((state) => state.auth);
    return (
        <div
            className="container py-5 d-flex flex-column align-items-center justify-content-center"
            style={{ height: "calc(100vh - 128px" }}
        >
            <img
                src={felix}
                alt="Felix the Cat"
                style={{ width: 300, height: "auto" }}
            />
            <h2 className="lead mt-3">Welcome to the show</h2>
            <div className="mt-1 text-center">
                This project demonstrates uploading and displaying a PDF file.
            </div>
            <div className="mt-2 text-center">
                There is no HTML conversion or hot-spots happening yet, just PDF
                display with some basic navigation.
            </div>
            <div className="mt-2 text-center">
                CSS Framework is Bootstrap (v5.3)
            </div>
            <div className="mt-2 text-center">
                Redux is used to manage state (auth and protected routes)
            </div>
            {!username ? (
                <button
                    className="btn btn-outline-primary mt-3"
                    onClick={() => navigate(AppRoute.AUTH)}
                >
                    Sign In
                </button>
            ) : (
                <button
                    className="btn btn-outline-primary mt-3"
                    onClick={() => navigate(AppRoute.PDF)}
                >
                    Upload PDF
                </button>
            )}
        </div>
    );
}
