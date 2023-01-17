import { useState } from "react";
import Dropzone from "./components/Dropzone";
import Viewer from "./components/Viewer/";
import type { ElHeight } from "../../types";

interface Props {
    heights: ElHeight[];
    navbarOffset: number;
    totalOffset: number;
    setHeights: (a: ElHeight[]) => void;
}
export default function Pdf({ heights, navbarOffset, totalOffset, setHeights }: Props) {
    const [doc, setDoc] = useState<Blob | null | undefined>();
    const [error, setError] = useState("");

    return (
        <div className="d-flex flex-column align-items-center"
        style={{marginTop: navbarOffset}}
        >
            {doc ? (
                <Viewer
                    doc={doc}
                    heights={heights}
                    totalOffset={totalOffset}
                    setDoc={setDoc}
                    setHeights={setHeights}
                />
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
