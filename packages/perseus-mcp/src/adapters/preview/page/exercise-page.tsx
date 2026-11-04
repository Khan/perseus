// An exercise's page (`/exercises/<exerciseId>?item=<itemId>`): its problem
// types and items as a tree, each with its change since import and its
// validation issues, and the selected item's live preview. It follows the
// exercise's event stream, so it shows Claude's changes as they're made.
import Button from "@khanacademy/wonder-blocks-button";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {DraftPreview} from "./draft-preview";
import styles from "./exercise-pages.module.css";
import shellStyles from "./shell.module.css";

// The page setup Wonder Blocks expects: its tokens, fonts and base styles.
import "@internal/perseus-environment/styles.css";
import "@internal/perseus-environment/lato.css";

type Issue = {
    severity: "error" | "warning" | "info";
    code: string;
    path: string;
    message: string;
};

type ItemView = {
    itemId: string;
    revision?: number;
    summary?: string;
    change?: "new" | "edited" | "unchanged";
    issues?: Issue[];
    missing?: true;
};

type ExerciseView = {
    exerciseId: string;
    name: string;
    notes?: string;
    editorUrl?: string;
    problemTypes: Array<{name: string | null; items: ItemView[]}>;
};

/** How many new or edited items the exercise editor's import reviews at once. */
const REVIEW_LIMIT = 50;

const CHANGE_TEXT = {
    new: "New",
    edited: "Edited",
    unchanged: "Unchanged",
} as const;

function useExerciseEvents(exerciseId: string) {
    const [view, setView] = React.useState<ExerciseView | null>(null);
    const [lost, setLost] = React.useState(false);
    React.useEffect(() => {
        const events = new EventSource(
            `/exercises/${encodeURIComponent(exerciseId)}/events`,
        );
        events.addEventListener("exercise", (event) => {
            setView(JSON.parse(event.data));
            setLost(false);
        });
        // EventSource reconnects by itself.
        events.addEventListener("error", () => setLost(true));
        return () => events.close();
    }, [exerciseId]);
    return {view, lost};
}

/** The `?item=` of the page's URL, kept in step with Back and Forward. */
function useSelectedItem(): [string | null, (itemId: string) => void] {
    const read = () => new URLSearchParams(window.location.search).get("item");
    const [itemId, setItemId] = React.useState(read);
    React.useEffect(() => {
        const onPopState = () => setItemId(read());
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);
    const select = React.useCallback((next: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set("item", next);
        window.history.pushState(null, "", url);
        setItemId(next);
    }, []);
    return [itemId, select];
}

function countIssues(issues: Issue[] = []): string | null {
    const errors = issues.filter((i) => i.severity === "error").length;
    const warnings = issues.filter((i) => i.severity === "warning").length;
    const parts = [
        errors > 0 ? `${errors} ${errors === 1 ? "error" : "errors"}` : null,
        warnings > 0
            ? `${warnings} ${warnings === 1 ? "warning" : "warnings"}`
            : null,
    ].filter((part) => part != null);
    return parts.length === 0 ? null : parts.join(", ");
}

function Summary({view}: {view: ExerciseView}) {
    const items = view.problemTypes.flatMap((type) => type.items);
    const count = (change: ItemView["change"]) =>
        items.filter((item) => item.change === change).length;
    const withErrors = items.filter((item) =>
        item.issues?.some((issue) => issue.severity === "error"),
    ).length;
    const missing = items.filter((item) => item.missing).length;
    const toReview = count("new") + count("edited");
    return (
        <BodyText>
            {`${items.length} ${items.length === 1 ? "item" : "items"}: ` +
                `${count("new")} new, ${count("edited")} edited, ` +
                `${count("unchanged")} unchanged.` +
                (withErrors > 0
                    ? ` ${withErrors} with validation errors.`
                    : "") +
                (missing > 0 ? ` ${missing} missing.` : "") +
                (toReview > REVIEW_LIMIT
                    ? ` The exercise editor's import reviews at most ` +
                      `${REVIEW_LIMIT} new or edited items at a time.`
                    : "")}
        </BodyText>
    );
}

/**
 * Copies the exercise in the exercise editor's bulk JSON format. The JSON is
 * fetched inside the clipboard write, so the click still counts as the
 * person's action when it arrives.
 */
async function copyBulkJson(exerciseId: string): Promise<void> {
    const url = `/api/exercises/${encodeURIComponent(exerciseId)}/bulk.json`;
    const text = fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`perseus-mcp answered ${response.status}`);
        }
        return response.text();
    });
    if (typeof ClipboardItem !== "undefined") {
        await navigator.clipboard.write([
            new ClipboardItem({
                "text/plain": text.then(
                    (json) => new Blob([json], {type: "text/plain"}),
                ),
            }),
        ]);
    } else {
        await navigator.clipboard.writeText(await text);
    }
}

function CopyButton({exerciseId}: {exerciseId: string}) {
    const [message, setMessage] = React.useState("");
    return (
        <View className={styles.row}>
            <Button
                kind="secondary"
                size="small"
                onClick={() => {
                    setMessage("Copying…");
                    copyBulkJson(exerciseId).then(
                        () =>
                            setMessage(
                                "Copied. In the exercise editor, choose " +
                                    "Import and paste.",
                            ),
                        (e) => setMessage(`Couldn't copy: ${String(e)}`),
                    );
                }}
            >
                Copy for bulk import
            </Button>
            <BodyText size="small" role="status">
                {message}
            </BodyText>
        </View>
    );
}

function ItemLink({
    item,
    position,
    selected,
    onSelect,
}: {
    item: ItemView;
    position: number;
    selected: boolean;
    onSelect: (itemId: string) => void;
}) {
    const details = item.missing
        ? "Draft missing"
        : [
              item.change != null ? CHANGE_TEXT[item.change] : null,
              `revision ${item.revision}`,
              countIssues(item.issues),
          ]
              .filter((part) => part != null)
              .join(" · ");
    return (
        <a
            className={`${styles.item} ${selected ? styles.selected : ""}`}
            href={`?item=${encodeURIComponent(item.itemId)}`}
            aria-current={selected ? "true" : undefined}
            onClick={(event) => {
                // Let modified clicks open a new tab or window.
                if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                ) {
                    return;
                }
                event.preventDefault();
                onSelect(item.itemId);
            }}
        >
            <BodyText tag="span" weight="semi">
                {`${position}. ${item.summary?.trim() || item.itemId}`}
            </BodyText>
            <BodyText
                tag="span"
                size="small"
                className={
                    item.missing ||
                    item.issues?.some((i) => i.severity === "error")
                        ? styles.problem
                        : undefined
                }
            >
                {details}
            </BodyText>
        </a>
    );
}

function Tree({
    view,
    selected,
    onSelect,
}: {
    view: ExerciseView;
    selected: string | null;
    onSelect: (itemId: string) => void;
}) {
    return (
        <nav aria-label="Items" className={styles.tree}>
            {view.problemTypes.map((problemType, index) => (
                <View key={problemType.name ?? `none-${index}`}>
                    <Heading tag="h2" size="medium">
                        {problemType.name ?? "No problem type"}
                    </Heading>
                    <ol className={styles.list}>
                        {problemType.items.map((item, position) => (
                            <li key={item.itemId}>
                                <ItemLink
                                    item={item}
                                    position={position + 1}
                                    selected={item.itemId === selected}
                                    onSelect={onSelect}
                                />
                            </li>
                        ))}
                    </ol>
                </View>
            ))}
        </nav>
    );
}

function IssueList({issues}: {issues: Issue[]}) {
    if (issues.length === 0) {
        return null;
    }
    return (
        <View tag="section" aria-label="Validation issues">
            <ul className={styles.issues}>
                {issues.map((issue, index) => (
                    <li key={index}>
                        <BodyText size="small">
                            {`${issue.severity === "error" ? "Error" : issue.severity === "warning" ? "Warning" : "Note"}: ` +
                                `${issue.message} (${issue.path})`}
                        </BodyText>
                    </li>
                ))}
            </ul>
        </View>
    );
}

function ExercisePage({exerciseId}: {exerciseId: string}) {
    const {view, lost} = useExerciseEvents(exerciseId);
    const [selected, select] = useSelectedItem();
    const items = view?.problemTypes.flatMap((type) => type.items) ?? [];
    // With no item named (or one that's gone), show the first that has a
    // draft.
    const current =
        items.find((item) => item.itemId === selected && !item.missing) ??
        items.find((item) => !item.missing);

    return (
        <View className={`${shellStyles.root} ${shellStyles.page}`}>
            <View tag="header" className={shellStyles.header}>
                <BodyText size="small">
                    <a className={styles.link} href="/exercises">
                        All exercises
                    </a>
                </BodyText>
                <Heading tag="h1" size="xlarge">
                    {view?.name ?? "Exercise"}
                </Heading>
                {view?.notes != null && <BodyText>{view.notes}</BodyText>}
                {view == null ? (
                    <BodyText>
                        {lost
                            ? "Couldn't connect to perseus-mcp. Retrying…"
                            : "Connecting…"}
                    </BodyText>
                ) : (
                    <>
                        <Summary view={view} />
                        {lost && (
                            <BodyText>
                                Lost the connection to perseus-mcp.
                                Reconnecting…
                            </BodyText>
                        )}
                        <View className={styles.row}>
                            {view.editorUrl != null && (
                                <BodyText size="small">
                                    <a
                                        className={styles.link}
                                        href={view.editorUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open in the exercise editor
                                        <span className={styles.hidden}>
                                            {" (opens in a new tab)"}
                                        </span>
                                    </a>
                                </BodyText>
                            )}
                            <CopyButton exerciseId={exerciseId} />
                        </View>
                    </>
                )}
            </View>
            {view != null && (
                <View className={styles.columns}>
                    <Tree
                        view={view}
                        selected={current?.itemId ?? null}
                        onSelect={select}
                    />
                    <View tag="main" className={styles.preview}>
                        {current == null ? (
                            <BodyText>This exercise has no items.</BodyText>
                        ) : (
                            <>
                                <IssueList issues={current.issues ?? []} />
                                <DraftPreview
                                    key={current.itemId}
                                    itemId={current.itemId}
                                />
                            </>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
}

// The page's path is /exercises/<exerciseId>.
const exerciseId = decodeURIComponent(window.location.pathname.split("/")[2]);
createRoot(document.getElementById("root")!).render(
    <RenderStateRoot>
        <ExercisePage exerciseId={exerciseId} />
    </RenderStateRoot>,
);
