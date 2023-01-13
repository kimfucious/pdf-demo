import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { PDFNavDirection } from "../../../types";
import { useState } from "react";
import felix from "../../../assets/images/felix-eye-roll.gif";

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
    function navigateToPage(direction: PDFNavDirection) {
        if (direction === PDFNavDirection.BACK) {
            setPageNumber(pageNumber - 1);
        } else {
            setPageNumber(pageNumber + 1);
        }
    }
    return (
        <>
            {!numPages && (
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: "calc(100vh - 128px" }}
                >
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
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
                className="d-none d-md-flex flex-column align-items-center"
                style={{ height: numPages && pageNumber ? "100%" : 0 }}
            >
                <div className="d-flex align-items-center justify-content-between w-100 mb-3">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setDoc(null)}
                    >
                        Reset
                    </button>
                    <small>
                        Page {pageNumber} of {numPages}
                    </small>
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigateToPage(PDFNavDirection.BACK)}
                            disabled={pageNumber === 1}
                        >
                            <i>
                                <ChevronLeft />
                            </i>
                        </button>
                        <button
                            className="btn btn-sm btn-outline-primary ms-2"
                            onClick={() =>
                                navigateToPage(PDFNavDirection.FORWARD)
                            }
                            disabled={pageNumber === numPages}
                        >
                            <i>
                                <ChevronRight />
                            </i>
                        </button>
                    </div>
                </div>
                <div className="d-flex align-items-start">
                    <Document file={doc} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                </div>
            </div>
        </>
    );
}
