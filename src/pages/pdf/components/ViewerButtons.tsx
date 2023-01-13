import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import { PDFNavDirection } from "../../../types";

interface Props {
    setDoc: (f: Blob | null | undefined) => void;
    setPageNumber: (n: number) => void;
    pageNumber: number;
    numPages: number | null;
}
export default function ViewerButtons({
    pageNumber,
    numPages,
    setDoc,
    setPageNumber,
}: Props) {
    function navigateToPage(direction: PDFNavDirection) {
        if (direction === PDFNavDirection.BACK) {
            setPageNumber(pageNumber - 1);
        } else {
            setPageNumber(pageNumber + 1);
        }
    }
    return (
        <div
            className="d-flex align-items-center justify-content-between w-100 mb-3"
            style={{ maxWidth: 596 }}
        >
            <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => setDoc(null)}
            >
                Reset
            </button>
            <small>
                Page {pageNumber ?? "loading"} of {numPages ?? "loading"}
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
                    onClick={() => navigateToPage(PDFNavDirection.FORWARD)}
                    disabled={pageNumber === numPages}
                >
                    <i>
                        <ChevronRight />
                    </i>
                </button>
            </div>
        </div>
    );
}