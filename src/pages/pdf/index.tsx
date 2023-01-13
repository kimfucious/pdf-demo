import { useState } from "react";
import Dropzone from "./components/Dropzone";
import Viewer from "./components/Viewer";

export default function Pdf() {
    const [doc, setDoc] = useState<Blob | null | undefined>();
    const [error, setError] = useState("");

    return (
        <div className="container py-5 d-flex flex-column align-items-center">
            {/* <h1 className="display-4">PDF</h1> */}
            {doc ? (
                <Viewer doc={doc} setDoc={setDoc} />
            ) : (
                <Dropzone setDoc={setDoc} setError={setError} />
            )}
            {error && (
                <div className="alert alert-danger mt-3" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
}
