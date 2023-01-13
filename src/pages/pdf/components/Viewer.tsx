import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { useState } from "react";
import felix from "../../../assets/images/felix-eye-roll.gif";
import ViewerButtons from "./ViewerButtons";

interface Props {
    doc: Blob;
    setDoc: (f: Blob | null | undefined) => void;
}
export default function Viewer({ doc, setDoc }: Props) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    interface FnProps {
        numPages: number | null;
    }
    function onDocumentLoadSuccess({ numPages }: FnProps) {
        setNumPages(numPages);
    }
    return (
        <>
            {!numPages ? (
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: "calc(100vh - 128px" }}
                >
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <ViewerButtons
                    pageNumber={pageNumber}
                    numPages={numPages}
                    setDoc={setDoc}
                    setPageNumber={setPageNumber}
                />
            )}
            {numPages && (
                <div
                    className="d-flex d-md-none flex-column align-items-center justify-content-center"
                    style={{ height: "calc(100vh - 128px" }}
                >
                    <img
                        src={felix}
                        alt="Felix the Cat"
                        style={{ width: 300, height: "auto" }}
                    />
                    <div className="mt-3">
                        Not sure how to best display on mobile yet
                    </div>
                    <button
                        className="btn btn-link"
                        onClick={() => setDoc(null)}
                    >
                        reset
                    </button>
                </div>
            )}
            <div
                className="d-none d-md-flex flex-column align-items-center w-100"
                style={{ height: numPages || pageNumber ? "100%" : 0 }}
            >
                <div className="d-flex align-items-start">
                    <Document file={doc} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                </div>
            </div>
        </>
    );
}
