// An exercise's page (`/exercises/<exerciseId>?item=<itemId>`): its problem
// types and items as a tree, each with its change since import and its
// validation issues, and the selected item's live preview; or, as a grid
// (`?view=grid`), every item at once at a phone's width. It follows the
// exercise's event stream, so it shows Claude's changes as they're made.
import Button from "@khanacademy/wonder-blocks-button";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import squareIcon from "@phosphor-icons/core/regular/square.svg";
import squaresFourIcon from "@phosphor-icons/core/regular/squares-four.svg";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {isWebUrl} from "../../../domain/exercises/exercise";

import {DEFAULT_OFFERED_OPTIONS} from "./controls";
import {DraftPreview} from "./draft-preview";
import {ExerciseGrid} from "./exercise-grid";
import {IssueList, ItemStatus} from "./exercise-items";
import styles from "./exercise-pages.module.css";
import {BarLink, PageHeader} from "./page-header";
import header from "./page-header.module.css";
import layout from "./page-layout.module.css";
import {StatusBar, worstConnection} from "./status-bar";

import type {OfferedOptions} from "./controls";
import type {DraftStatus} from "./draft-preview";
import type {ExerciseView, ItemView} from "./exercise-items";
import type {Connection} from "./status-bar";

// The page setup Wonder Blocks expects: its tokens, fonts and base styles.
import "@internal/perseus-environment/styles.css";
import "@internal/perseus-environment/lato.css";

/** How many new or edited items the exercise editor's import reviews at once. */
const REVIEW_LIMIT = 50;

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

type ViewMode = "single" | "grid";

type Location = {item: string | null; view: ViewMode};

function readLocation(): Location {
    const params = new URLSearchParams(window.location.search);
    return {
        item: params.get("item"),
        view: params.get("view") === "grid" ? "grid" : "single",
    };
}

/**
 * The selected item (`?item=`) and the view (`?view=grid`, or one item) in
 * the page's URL, kept in step with Back and Forward.
 */
function usePageLocation(): [Location, (next: Partial<Location>) => void] {
    const [location, setLocation] = React.useState(readLocation);
    React.useEffect(() => {
        const onPopState = () => setLocation(readLocation());
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);
    const go = React.useCallback((next: Partial<Location>) => {
        const url = new URL(window.location.href);
        if (next.item != null) {
            url.searchParams.set("item", next.item);
        }
        if (next.view === "grid") {
            url.searchParams.set("view", "grid");
        } else if (next.view === "single") {
            url.searchParams.delete("view");
        }
        window.history.pushState(null, "", url);
        setLocation(readLocation());
    }, []);
    return [location, go];
}

const VIEWS = [
    {view: "single", label: "One item", icon: squareIcon},
    {view: "grid", label: "Grid, as on phones", icon: squaresFourIcon},
] as const;

/**
 * The views, as a pair of buttons: the pressed one is showing. Each button's
 * name is its view, as screen readers announce it with its pressed state.
 */
function ViewButtons({
    view,
    onChange,
}: {
    view: ViewMode;
    onChange: (view: ViewMode) => void;
}) {
    return (
        <div role="group" aria-label="View" className={header.viewButtons}>
            {VIEWS.map(({view: value, label, icon}) => (
                <IconButton
                    key={value}
                    icon={icon}
                    kind="tertiary"
                    size="medium"
                    aria-label={label}
                    aria-pressed={view === value}
                    className={`${header.viewButton} ${view === value ? header.pressed : ""}`}
                    onClick={() => onChange(value)}
                />
            ))}
        </div>
    );
}

/** What the exercise holds, for the line under its title. */
function describeContents(view: ExerciseView): string {
    const items = view.problemTypes.reduce((n, t) => n + t.items.length, 0);
    const types = view.problemTypes.length;
    return (
        `${items} ${items === 1 ? "item" : "items"} in ${types} ` +
        `${types === 1 ? "problem type" : "problem types"}`
    );
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

function ExercisePage({exerciseId}: {exerciseId: string}) {
    const {view, connection} = useExerciseEvents(exerciseId);
    const [draftStatus, setDraftStatus] = React.useState<DraftStatus | null>(
        null,
    );
    const [{item: selected, view: viewMode}, go] = usePageLocation();
    const select = React.useCallback(
        (itemId: string) => go({item: itemId}),
        [go],
    );
    const [gridOptions, setGridOptions] = React.useState<OfferedOptions>(
        DEFAULT_OFFERED_OPTIONS,
    );
    const items = view?.problemTypes.flatMap((type) => type.items) ?? [];
    // With no item named (or one that's gone), show the first that has a
    // draft.
    const current =
        items.find((item) => item.itemId === selected && !item.missing) ??
        items.find((item) => !item.missing);

    return (
        <div className={layout.app}>
            <PageHeader
                title={view?.name ?? "Exercise"}
                subtitle={view == null ? undefined : describeContents(view)}
                back={{href: "/exercises", label: "All exercises"}}
                end={
                    <>
                        {view?.editorUrl != null &&
                            isWebUrl(view.editorUrl) && (
                                <BarLink href={view.editorUrl} external={true}>
                                    Open in the exercise editor
                                </BarLink>
                            )}
                        <ViewButtons
                            view={viewMode}
                            onChange={(next) => go({view: next})}
                        />
                    </>
                }
            />
            {viewMode === "grid" ? (
                <main className={`${layout.main} ${styles.gridMain}`}>
                    {view != null && (
                        <ExerciseGrid
                            view={view}
                            // The grid is for seeing items as on phones.
                            options={{...gridOptions, isMobile: true}}
                            onOptionsChange={(changed) =>
                                setGridOptions((current) => ({
                                    ...current,
                                    ...changed,
                                }))
                            }
                            onOpen={(itemId) =>
                                go({item: itemId, view: "single"})
                            }
                        />
                    )}
                </main>
            ) : (
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
            )}
            <StatusBar
                summary={view == null ? "" : summarize(view)}
                connection={worstConnection(
                    connection,
                    ...(draftStatus != null && viewMode === "single"
                        ? [draftStatus.connection]
                        : []),
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
