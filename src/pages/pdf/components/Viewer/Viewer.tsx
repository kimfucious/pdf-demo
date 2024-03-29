import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { navHeight } from "../../../../constants";
import { pdfjs } from "react-pdf";
import { useState } from "react";
import ViewerControls from "../ViewerControls";
import felix from "../../../../assets/images/felix-eye-roll.gif";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { ElHeight, PDFNavDirection } from "../../../../types";

/* 
per https://github.com/wojtekmaj/react-pdf#standard-browserify-esbuild-and-others
FYI: the file has been placed in the public directory already.
*/
pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

interface Props {
    doc: Blob;
    heights: ElHeight[];
    setDoc: (f: Blob | null | undefined) => void;
    setHeights: (a: ElHeight[]) => void;
}
export default function Viewer({ heights, setHeights, doc, setDoc }: Props) {
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
            {!numPages ? (
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    // style={{ height: `calc(100vh-(128px+${navHeight})` }}
                    style={{ height: "100vh", marginTop: navHeight }}
                >
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <ViewerControls
                    heights={heights}
                    navigateToPage={navigateToPage}
                    navMargin={navHeight}
                    numPages={numPages}
                    pageNumber={pageNumber}
                    setDoc={setDoc}
                    setHeights={setHeights}
                    setPageNumber={setPageNumber}
                />
            )}
            {numPages && (
                <div
                    className="d-flex d-md-none flex-column align-items-center justify-content-center"
                    style={{
                        height: "calc(100vh - 128px",
                        marginTop: navHeight,
                    }}
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
                        style={{ textDecoration: "none" }}
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
                        <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                </div>
            </div>
        </>
    );
}
