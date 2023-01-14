import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../types";
import felix from "../../assets/images/felix-pub.gif";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div
            className="container py-5 d-flex flex-column align-items-center justify-content-center"
            style={{ height: "100vh"}}
        >
            <h1 className="fw-light text-muted">There's nothing here!</h1>
            <img
                src={felix}
                alt="Felix at the Pub"
                style={{ width: 300, height: "auto" }}
            />
            <button
                className="btn btn-sm btn-outline-primary mt-3"
                onClick={() => navigate(AppRoute.ROOT)}
            >
                Go Home
            </button>
        </div>
    );
}
