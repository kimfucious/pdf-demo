import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import { ElName, PDFNavDirection } from "../../../types"; // enum
import type { ElHeight } from "../../../types";
import { useEffect, useRef } from "react";
import useSize from "@react-hook/size";

interface Props {
    heights: ElHeight[];
    navigateToPage: (d: PDFNavDirection) => void;
    mobileMaxWidth?: number;
    navMargin: string;
    numPages: number | null;
    pageNumber: number;
    setDoc: (f: Blob | null | undefined) => void;
    setHeights: (a: ElHeight[]) => void;
    setPageNumber: (n: number) => void;
}

export default function ViewerControls({
    heights,
    mobileMaxWidth,
    navigateToPage,
    navMargin,
    numPages,
    pageNumber,
    setDoc,
    setHeights,
    setPageNumber,
}: Props) {
    const target = useRef(null);
    const [, height] = useSize(target);

    useEffect(() => {
        const newHeights = [...heights];
        const idx = newHeights.findIndex(
            (item) => item.name === ElName.VIEWER_CONTROLS
        );
        if (idx !== -1) {
            const navBarHeight = newHeights[idx].height;
            if (navBarHeight !== height) {
                newHeights[idx].height = height;
                setHeights(newHeights);
            }
        } else {
            setHeights([
                ...newHeights,
                { name: ElName.VIEWER_CONTROLS, height: height },
            ]);
        }
    }, [height, heights, setHeights]);

    return (
        <div
            className="d-none d-sm-flex align-items-center justify-content-between w-100 my-3"
            ref={target}
            style={{ maxWidth: mobileMaxWidth }}
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
