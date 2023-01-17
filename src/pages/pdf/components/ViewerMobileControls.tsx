import {
    ArrowBack,
    ChevronLeft,
    ChevronRight,
} from "tabler-icons-react";
import { PDFNavDirection } from "../../../types";

interface Props {
    navigateToPage: (d: PDFNavDirection) => void;
    numPages: number | null;
    pageNumber: number;
    setDoc: (f: Blob | null | undefined) => void;
    setPageNumber: (n: number) => void;
}
export default function ViewerMobileControls({
    navigateToPage,
    numPages,
    pageNumber,
    setDoc,
    setPageNumber,
}: Props) {
    return (
        <div
            className="d-flex d-sm-none align-items-center justify-content-between w-100"
            style={{ height: 48 }}
        >
            <div>
                <button
                    className="btn btn-link ps-0"
                    onClick={() => {
                        setDoc(null);
                    }}
                    style={{ textDecoration: "none" }}
                >
                    <ArrowBack />
                </button>
            </div>
            <small className="ms-4 text-muted">
                Page {pageNumber} of {numPages}
            </small>
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-link"
                    disabled={pageNumber === 1}
                    onClick={() => navigateToPage(PDFNavDirection.BACK)}
                    style={{ textDecoration: "none" }}
                >
                    <ChevronLeft />
                </button>
                <button
                    className="btn btn-link px-0"
                    disabled={pageNumber === numPages}
                    onClick={() => navigateToPage(PDFNavDirection.FORWARD)}
                    style={{ textDecoration: "none" }}
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
