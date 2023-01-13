import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import { PDFNavDirection } from "../../../types";

interface Props {
    navMargin: string;
    numPages: number | null;
    pageNumber: number;
    setDoc: (f: Blob | null | undefined) => void;
    setPageNumber: (n: number) => void;
}
export default function ViewerButtons({
    navMargin,
    numPages,
    pageNumber,
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
            className="d-none d-md-flex align-items-center justify-content-between w-100 mb-3"
            style={{ maxWidth: 596, marginTop: navMargin }}
        >
            <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => setDoc(null)}
            >
                Upload New
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
