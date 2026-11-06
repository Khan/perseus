// The list page's import: a file field for an exercise's export (or a zip of
// several), sent to POST /exercises/import, and the whole page as a drop
// target for the file.
import Button from "@khanacademy/wonder-blocks-button";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import styles from "./exercise-list.module.css";

type ImportedExercise = {
    exerciseId: string;
    name: string;
    imported: number;
    skipped: number;
};

type ImportResponse = {
    exercises: ImportedExercise[];
    failed: Array<{fileName: string; error: string}>;
};

function isZip(file: File): boolean {
    return /\.zip$/i.test(file.name) || file.type === "application/zip";
}

async function upload(file: File): Promise<ImportResponse> {
    const response = await fetch(
        `/exercises/import?fileName=${encodeURIComponent(file.name)}`,
        {
            method: "POST",
            // A file's type is often empty for .json, so go by its name.
            headers: {
                "Content-Type": isZip(file)
                    ? "application/zip"
                    : "application/json",
            },
            body: file,
        },
    );
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(
            payload?.error ?? `perseus-mcp answered ${response.status}`,
        );
    }
    return payload;
}

function describe({exercises, failed}: ImportResponse): string {
    const made = exercises.map(
        ({name, imported, skipped}) =>
            `${name} (${imported} ${imported === 1 ? "item" : "items"}` +
            (skipped > 0 ? `, ${skipped} skipped` : "") +
            ")",
    );
    const notMade = failed.map(
        ({fileName, error}) => `${fileName} wasn't imported: ${error}`,
    );
    return [made.length === 0 ? "" : `Imported ${made.join(", ")}.`, ...notMade]
        .filter(Boolean)
        .join(" ");
}

/** Whether a drag carries files (not text or a link from the page). */
function hasFiles(event: DragEvent): boolean {
    return event.dataTransfer?.types.includes("Files") ?? false;
}

/**
 * Takes a file dropped anywhere on the page, and says whether one is being
 * dragged over it.
 */
function usePageDrop(onDrop: (file: File | undefined) => void): boolean {
    const [dragging, setDragging] = React.useState(false);
    const latest = React.useRef(onDrop);
    latest.current = onDrop;
    React.useEffect(() => {
        // Entering a child element enters it before leaving its parent, so
        // count: the drag has left the page when every enter has a leave.
        let depth = 0;
        const enter = (event: DragEvent) => {
            if (hasFiles(event)) {
                depth++;
                setDragging(true);
            }
        };
        const leave = (event: DragEvent) => {
            if (hasFiles(event) && --depth <= 0) {
                depth = 0;
                setDragging(false);
            }
        };
        const over = (event: DragEvent) => {
            if (hasFiles(event)) {
                // Without this the browser opens the file instead.
                event.preventDefault();
            }
        };
        const drop = (event: DragEvent) => {
            if (hasFiles(event)) {
                event.preventDefault();
                depth = 0;
                setDragging(false);
                latest.current(event.dataTransfer?.files[0]);
            }
        };
        window.addEventListener("dragenter", enter);
        window.addEventListener("dragleave", leave);
        window.addEventListener("dragover", over);
        window.addEventListener("drop", drop);
        return () => {
            window.removeEventListener("dragenter", enter);
            window.removeEventListener("dragleave", leave);
            window.removeEventListener("dragover", over);
            window.removeEventListener("drop", drop);
        };
    }, []);
    return dragging;
}

/**
 * Opens a single imported exercise; for several, reports them and lets
 * the page list them.
 */
export function ImportArea({onImported}: {onImported: () => void}) {
    const inputId = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [message, setMessage] = React.useState("");
    const [busy, setBusy] = React.useState(false);

    async function importFile(file: File | undefined) {
        if (file == null) {
            setMessage("Choose a .json or .zip file first.");
            return;
        }
        setBusy(true);
        setMessage(`Importing ${file.name}…`);
        try {
            const result = await upload(file);
            const [only] = result.exercises;
            if (result.exercises.length === 1 && result.failed.length === 0) {
                window.location.assign(
                    `/exercises/${encodeURIComponent(only.exerciseId)}`,
                );
                return;
            }
            setMessage(describe(result));
            onImported();
        } catch (e) {
            setMessage(
                `Couldn't import ${file.name}: ${e instanceof Error ? e.message : String(e)}`,
            );
        } finally {
            setBusy(false);
        }
    }

    const dragging = usePageDrop((file) => void importFile(file));

    return (
        <section aria-label="Import an exercise" className={styles.importArea}>
            <form
                className={styles.importRow}
                onSubmit={(event) => {
                    event.preventDefault();
                    void importFile(inputRef.current?.files?.[0]);
                }}
            >
                <BodyText tag="label" htmlFor={inputId} weight="semi">
                    Import an exercise
                </BodyText>
                <input
                    ref={inputRef}
                    id={inputId}
                    type="file"
                    accept=".json,.zip,application/json,application/zip"
                    aria-describedby={`${inputId}-hint`}
                />
                <Button type="submit" size="small" disabled={busy}>
                    Import
                </Button>
                <BodyText
                    tag="span"
                    size="small"
                    id={`${inputId}-hint`}
                    className={styles.hint}
                >
                    Its bulk JSON export, or a .zip of several. Or drop the file
                    anywhere on the page.
                </BodyText>
            </form>
            <BodyText tag="output" size="small">
                {message}
            </BodyText>
            {/* Dropping is a pointer shortcut for the file field above, so
                screen readers skip what shows while dragging. */}
            {dragging && (
                <div className={styles.dropOverlay} aria-hidden={true}>
                    <BodyText weight="bold" className={styles.dropText}>
                        Drop here to upload
                    </BodyText>
                </div>
            )}
        </section>
    );
}
