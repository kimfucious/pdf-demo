import { AppRoute } from "../../types";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import felix from "../../assets/images/felix_show.gif";

interface Props {
    navbarOffset: number;
}
export default function Home({ navbarOffset }: Props) {
    const navigate = useNavigate();
    const { username } = useAppSelector((state) => state.auth);
    return (
        <div
            className="container py-5 d-flex flex-column align-items-center justify-content-center"
            style={{ marginTop: navbarOffset }}
        >
            <img
                src={felix}
                alt="Felix the Cat"
                style={{ width: 300, height: "auto" }}
            />
            <h2 className="lead mt-3">Welcome to the show</h2>
            <small className="mt-1 text-center">
                Simple uploading and displaying of a PDF file.
            </small>
            <small className="mt-2 text-center">
                No HTML conversion or hot-spots happening yet, just some basic
                navigation.
            </small>
            <small className="mt-2 text-center">
                CSS Framework is Bootstrap (v5.3)
            </small>
            <small className="mt-2 text-center">
                Redux is currently only used for auth state management and
                protected routes.
            </small>
            <small className="mt-2 text-center">
                Repo is{" "}
                <a
                    href="https://github.com/kimfucious/pdf-demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                >
                    here
                </a>
                .
            </small>
            {!username ? (
                <button
                    className="btn btn-sm btn-outline-primary mt-3"
                    onClick={() => navigate(AppRoute.AUTH)}
                >
                    Sign In
                </button>
            ) : (
                <button
                    className="btn btn-sm btn-outline-primary mt-3"
                    onClick={() => navigate(AppRoute.PDF)}
                >
                    Upload PDF
                </button>
            )}
        </div>
    );
}
