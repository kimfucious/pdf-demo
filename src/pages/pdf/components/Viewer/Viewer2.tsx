import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { navHeight } from "../../../../constants";
import { pdfjs } from "react-pdf";
import { PDFNavDirection } from "../../../../types"; // enum
import { useMemo, useRef, useState } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import type { ElHeight } from "../../../../types";
import useSize from "@react-hook/size";
import ViewerControls from "../ViewerControls";
import ViewerMobileControls from "../ViewerMobileControls";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import felix from "../../../assets/images/felix-eye-roll.gif";

/* 
per https://github.com/wojtekmaj/react-pdf#standard-browserify-esbuild-and-others
FYI: the file has been placed in the public directory already.
*/
pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

interface Props {
    doc: Blob;
    heights: ElHeight[];
    totalOffset: number;
    setDoc: (f: Blob | null | undefined) => void;
    setHeights: (a: ElHeight[]) => void;
}
export default function Viewer({
    doc,
    setDoc,
    heights,
    totalOffset,
    setHeights,
}: Props) {
    const target = useRef(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [height, width] = useWindowSize();
    const [pdfContainerWidth, pdfContainerHeight] = useSize(target);
    const MOBILE_MAX_WIDTH = 576;

    const pdfHeight = useMemo(() => {
        console.log("Viewport height", height);
        console.log("Viewport width", width);
        console.log("Heights", heights);
        console.log("PDF Container height", pdfContainerHeight);
        console.log("PDF Container width", pdfContainerWidth);
        const isViewPortLandscape = width > height;
        const isPdfLandscape = pdfContainerWidth > pdfContainerHeight;
        let margins = 0;
        const vControlsTopMargin = 48;
        const vControlsBottomMargin = 16;
        const vMobileControlsBottomHeight = 48;
        if (width <= MOBILE_MAX_WIDTH && !isViewPortLandscape) {
            margins += vMobileControlsBottomHeight;
        } else {
            margins += vControlsTopMargin + vControlsBottomMargin;
        }
        if (isViewPortLandscape && !isPdfLandscape) {
            console.log("Viewport is landscape");
            console.log("PDF is portrait");
            return 0.9 * (height - (totalOffset + margins));
        } else if (isViewPortLandscape && isPdfLandscape) {
            console.log("Viewport is landscape");
            console.log("PDF is landscape");
            return 0.9 * (height - (totalOffset + margins));
        } else if (!isViewPortLandscape && isPdfLandscape) {
            console.log("Viewport is portrait");
            console.log("PDF is landscape");
            return 0.9 * (height - (totalOffset + margins));
        } else {
            console.log("Viewport is portrait");
            console.log("PDF is portrait");
            return height;
            // return 0.9 * (height - (totalOffset + margins));
        }
    }, [
        height,
        totalOffset,
        width,
        pdfContainerHeight,
        pdfContainerWidth,
        heights,
    ]);

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
                <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <ViewerControls
                    heights={heights}
                    mobileMaxWidth={MOBILE_MAX_WIDTH}
                    navigateToPage={navigateToPage}
                    navMargin={navHeight}
                    numPages={numPages}
                    pageNumber={pageNumber}
                    setDoc={setDoc}
                    setHeights={setHeights}
                    setPageNumber={setPageNumber}
                />
            )}
            {/* {numPages && (
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
            )} */}
            <div
                className="d-flex flex-column align-items-center w-100"
                // style={{ height: numPages || pageNumber ? "100%" : 0 }}
                style={{ height: numPages || pageNumber ? `calc( 100vh - ${totalOffset}px)` : 0 }}
            >
                <div
                    className="d-flex flex-column align-items-center w-100"
                    ref={target}
                >
                    <Document file={doc} onLoadSuccess={onDocumentLoadSuccess}>
                        {width <= MOBILE_MAX_WIDTH ? (
                            <Page
                                // height={pdfHeight}
                                width={width}
                                pageNumber={pageNumber}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        ) : (
                            <Page
                                height={pdfHeight}
                                pageNumber={pageNumber}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        )}
                    </Document>
                    <ViewerMobileControls
                        navigateToPage={navigateToPage}
                        numPages={numPages}
                        pageNumber={pageNumber}
                        setDoc={setDoc}
                        setPageNumber={setPageNumber}
                    />
                </div>
            </div>
        </>
    );
}
