// The list page's import: a file field and a drop target for an exercise's
// export (or a zip of several), sent to POST /exercises/import.
import Button from "@khanacademy/wonder-blocks-button";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
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

/**
 * Opens a single imported exercise; for several, reports them and lets
 * the page list them.
 */
export function ImportArea({onImported}: {onImported: () => void}) {
    const inputId = React.useId();
    const headingId = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [message, setMessage] = React.useState("");
    const [busy, setBusy] = React.useState(false);
    const [dragging, setDragging] = React.useState(false);

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

    return (
        <section aria-labelledby={headingId} className={styles.importArea}>
            <Heading tag="h2" size="medium" id={headingId}>
                Import an exercise
            </Heading>
            {/* Dropping a file is a pointer shortcut for the labelled file
                field, which is how a keyboard or screen reader user imports;
                the form is the drop target so the whole area takes the file.
                A role would misdescribe the form, so the drag handlers stay
                on it without one. */}
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <form
                className={`${styles.dropTarget} ${dragging ? styles.dragging : ""}`}
                onSubmit={(event) => {
                    event.preventDefault();
                    void importFile(inputRef.current?.files?.[0]);
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={(event) => {
                    // Moving onto the label or button inside the form
                    // leaves the form too; only leaving it counts.
                    const to = event.relatedTarget;
                    if (
                        !(to instanceof Node) ||
                        !event.currentTarget.contains(to)
                    ) {
                        setDragging(false);
                    }
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    setDragging(false);
                    void importFile(event.dataTransfer.files[0]);
                }}
            >
                <BodyText tag="label" htmlFor={inputId}>
                    An exercise&rsquo;s bulk JSON export, or a .zip of several
                    (or drop the file here)
                </BodyText>
                <div className={styles.importRow}>
                    <input
                        ref={inputRef}
                        id={inputId}
                        type="file"
                        accept=".json,.zip,application/json,application/zip"
                    />
                    <Button type="submit" size="small" disabled={busy}>
                        Import
                    </Button>
                </div>
            </form>
            <BodyText tag="output" size="small">
                {message}
            </BodyText>
        </section>
    );
}
