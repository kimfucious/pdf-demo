import { useCallback, useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { navHeight } from "../../../constants";

interface Props {
    setDoc: (b: Blob) => void;
    setError: (s: string) => void;
}
export default function Dropzone({ setDoc, setError }: Props) {
    const onDrop = useCallback(
        (acceptedFiles: Blob[], fileRejections: FileRejection[]) => {
            setError("");
            // Not doing this for now
            // if (fileRejections && fileRejections.length) {
            //     const errors = fileRejections[0].errors;
            //     const codes = errors.map((item) => item.code);
            //     if (codes.includes("file-invalid-type")) {
            //         setError("Only PDF files are permitted");
            //     } else {
            //         setError("Something's not right");
            //     }
            //     return;
            // }

            if (acceptedFiles && acceptedFiles.length) {
                setDoc(acceptedFiles[0]);
            } else {
                // setError("Something's not right");
            }
        },
        [setDoc, setError]
    );

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
        },
        maxFiles: 1,
        onDrop,
    });

    const borderClasses = useMemo(() => {
        if (isFocused) {
            return "border border-primary rounded";
        } else if (isDragReject) {
            return "border border-danger rounded";
        } else if (isDragAccept) {
            return "border border-success rounded";
        } else {
            return "border rounded";
        }
    }, [isFocused, isDragAccept, isDragReject]);

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "calc(100vh - 192px", marginTop: navHeight }}
        >
            <h1 className="fw-light mb-3">Upload PDF</h1>
            <div {...getRootProps()} style={{cursor: "pointer", minWidth: 300 }}>
                <input {...getInputProps()} />
                <div
                    className={`${borderClasses} p-5 d-flex flex-column align-items-center`}
                >
                    <div className="text-center">
                        Drop PDF file here, or click to select
                    </div>
                    {isDragReject && (
                        <small className="text-danger mt-2">
                            Only PDF files are permitted
                        </small>
                    )}
                    {isDragAccept && (
                        <small className="text-success mt-2">
                            You can let go now
                        </small>
                    )}
                </div>
            </div>
        </div>
    );
}
