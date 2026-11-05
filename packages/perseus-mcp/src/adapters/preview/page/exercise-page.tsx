// An exercise's page (`/exercises/<exerciseId>?item=<itemId>`): its problem
// types and items as a tree, each with its change since import and its
// validation issues, and the selected item's live preview. It follows the
// exercise's event stream, so it shows Claude's changes as they're made.
import Button from "@khanacademy/wonder-blocks-button";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import checkCircleIcon from "@phosphor-icons/core/regular/check-circle.svg";
import pencilSimpleIcon from "@phosphor-icons/core/regular/pencil-simple.svg";
import plusCircleIcon from "@phosphor-icons/core/regular/plus-circle.svg";
import warningCircleIcon from "@phosphor-icons/core/regular/warning-circle.svg";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {isWebUrl} from "../../../domain/exercises/exercise";

import {DraftPreview} from "./draft-preview";
import styles from "./exercise-pages.module.css";
import layout from "./page-layout.module.css";
import {StatusBar, worstConnection} from "./status-bar";

import type {DraftStatus} from "./draft-preview";
import type {Connection} from "./status-bar";

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
    /** The item's id on the site, as the exercise editor shows it. */
    contentId?: string;
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

const CHANGES = {
    new: {text: "New", icon: plusCircleIcon, className: styles.new},
    edited: {text: "Edited", icon: pencilSimpleIcon, className: styles.edited},
    unchanged: {
        text: "Unchanged",
        icon: checkCircleIcon,
        className: styles.unchanged,
    },
} as const;

function useExerciseEvents(exerciseId: string) {
    const [view, setView] = React.useState<ExerciseView | null>(null);
    const [connection, setConnection] =
        React.useState<Connection>("connecting");
    React.useEffect(() => {
        const events = new EventSource(
            `/exercises/${encodeURIComponent(exerciseId)}/events`,
        );
        events.addEventListener("exercise", (event) => {
            setView(JSON.parse(event.data));
            setConnection("open");
        });
        // EventSource reconnects by itself.
        events.addEventListener("error", () => setConnection("lost"));
        return () => events.close();
    }, [exerciseId]);
    return {view, connection};
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

/** The exercise's counts, for the status bar. */
function summarize(view: ExerciseView): string {
    const items = view.problemTypes.flatMap((type) => type.items);
    const count = (change: ItemView["change"]) =>
        items.filter((item) => item.change === change).length;
    const withErrors = items.filter((item) =>
        item.issues?.some((issue) => issue.severity === "error"),
    ).length;
    const missing = items.filter((item) => item.missing).length;
    const toReview = count("new") + count("edited");
    return (
        `${items.length} ${items.length === 1 ? "item" : "items"}: ` +
        `${count("new")} new, ${count("edited")} edited, ` +
        `${count("unchanged")} unchanged.` +
        (withErrors > 0 ? ` ${withErrors} with validation errors.` : "") +
        (missing > 0 ? ` ${missing} missing.` : "") +
        (toReview > REVIEW_LIMIT
            ? ` The exercise editor's import reviews at most ` +
              `${REVIEW_LIMIT} new or edited items at a time.`
            : "")
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
        <View className={styles.copyBar}>
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

function ItemStatus({item}: {item: ItemView}) {
    if (item.missing) {
        return (
            <span className={`${styles.status} ${styles.problem}`}>
                <PhosphorIcon
                    icon={warningCircleIcon}
                    className={styles.icon}
                    aria-hidden={true}
                />
                Draft missing
            </span>
        );
    }
    const change = item.change != null ? CHANGES[item.change] : null;
    const issues = countIssues(item.issues);
    const hasErrors = item.issues?.some((i) => i.severity === "error");
    return (
        <span className={styles.status}>
            {change != null && (
                <span className={styles.status}>
                    <PhosphorIcon
                        icon={change.icon}
                        className={`${styles.icon} ${change.className}`}
                        aria-hidden={true}
                    />
                    {change.text}
                </span>
            )}
            {` · revision ${item.revision}`}
            {issues != null && (
                <span
                    className={`${styles.status} ${hasErrors ? styles.problem : ""}`}
                >
                    {" · "}
                    <PhosphorIcon
                        icon={warningCircleIcon}
                        className={styles.icon}
                        aria-hidden={true}
                    />
                    {issues}
                </span>
            )}
        </span>
    );
}

function ItemLink({
    item,
    number,
    selected,
    onSelect,
}: {
    item: ItemView;
    /** As the exercise editor numbers it: problem type, then item. */
    number: string;
    selected: boolean;
    onSelect: (itemId: string) => void;
}) {
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
            <span className={styles.itemRow}>
                <BodyText tag="span" weight="semi">
                    {number}
                </BodyText>
                {item.summary != null && item.summary !== "" && (
                    <BodyText tag="span" className={styles.clip}>
                        {item.summary}
                    </BodyText>
                )}
            </span>
            <span className={`${styles.itemRow} ${styles.statusRow}`}>
                <BodyText tag="span" size="xsmall">
                    <ItemStatus item={item} />
                </BodyText>
                <BodyText tag="span" size="xsmall" className={styles.itemId}>
                    {item.contentId ?? `Draft ${item.itemId}`}
                </BodyText>
            </span>
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
                        {`${index + 1}. ${problemType.name ?? "Unassigned"}`}
                    </Heading>
                    <ol className={styles.list}>
                        {problemType.items.map((item, position) => (
                            <li key={item.itemId}>
                                <ItemLink
                                    item={item}
                                    number={`${index + 1}.${position + 1}`}
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
    const {view, connection} = useExerciseEvents(exerciseId);
    const [draftStatus, setDraftStatus] = React.useState<DraftStatus | null>(
        null,
    );
    const [selected, select] = useSelectedItem();
    const items = view?.problemTypes.flatMap((type) => type.items) ?? [];
    // With no item named (or one that's gone), show the first that has a
    // draft.
    const current =
        items.find((item) => item.itemId === selected && !item.missing) ??
        items.find((item) => !item.missing);

    return (
        <div className={layout.app}>
            <View tag="header" className={layout.header}>
                <BodyText size="small">
                    <a className={styles.link} href="/exercises">
                        All exercises
                    </a>
                </BodyText>
                <Heading tag="h1" size="large">
                    {view?.name ?? "Exercise"}
                </Heading>
                {view?.editorUrl != null && isWebUrl(view.editorUrl) && (
                    <BodyText size="small" className={layout.headerEnd}>
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
            </View>
            <div className={`${layout.main} ${styles.columns}`}>
                {view != null && (
                    <>
                        <div className={styles.treePanel}>
                            <Tree
                                view={view}
                                selected={current?.itemId ?? null}
                                onSelect={select}
                            />
                            <CopyButton exerciseId={exerciseId} />
                        </div>
                        <main className={styles.previewPanel}>
                            {current == null ? (
                                <BodyText className={styles.empty}>
                                    This exercise has no items.
                                </BodyText>
                            ) : (
                                <DraftPreview
                                    key={current.itemId}
                                    itemId={current.itemId}
                                    onStatus={setDraftStatus}
                                    above={
                                        <IssueList
                                            issues={current.issues ?? []}
                                        />
                                    }
                                />
                            )}
                        </main>
                    </>
                )}
            </div>
            <StatusBar
                summary={view == null ? "" : summarize(view)}
                connection={worstConnection(
                    connection,
                    ...(draftStatus != null ? [draftStatus.connection] : []),
                )}
            />
        </div>
    );
}

// The page's path is /exercises/<exerciseId>.
const exerciseId = decodeURIComponent(window.location.pathname.split("/")[2]);
createRoot(document.getElementById("root")!).render(
    <RenderStateRoot>
        <ExercisePage exerciseId={exerciseId} />
    </RenderStateRoot>,
);
