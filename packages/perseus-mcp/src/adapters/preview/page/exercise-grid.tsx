// The exercise page's grid: every item at once, each in a preview frame of
// its own at a phone's width, rendered as on a phone, so an author can look
// over a whole exercise. A frame loads when it scrolls near the window, and
// reads its draft again when the exercise's event stream says it changed.
import {usePreviewController} from "@khanacademy/perseus-preview";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import caretRightIcon from "@phosphor-icons/core/regular/caret-right.svg";
import * as React from "react";

import {pinDiagramRevisions} from "../../../domain/graffiti/diagram";

import {describeOptions, OptionControls} from "./controls";
import {IssueList, ItemStatus} from "./exercise-items";
import styles from "./exercise-pages.module.css";
import layout from "./page-layout.module.css";

import type {OfferedOptions} from "./controls";
import type {ExerciseView, ItemView} from "./exercise-items";
import type {PerseusItem} from "@khanacademy/perseus-core";

type DraftData = {
    revision: number;
    item: PerseusItem;
    diagrams?: Record<string, number>;
};

/**
 * Whether the element has come near the window yet; once it has, it stays
 * true, so a frame that's been loaded isn't unloaded on scrolling away.
 */
function useNearWindow<T extends Element>(): [React.RefObject<T>, boolean] {
    const ref = React.useRef<T>(null);
    const [near, setNear] = React.useState(false);
    React.useEffect(() => {
        const element = ref.current;
        if (element == null || near) {
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setNear(true);
                }
            },
            // Start loading a screen ahead of the scroll.
            {rootMargin: "100% 0px"},
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [near]);
    return [ref, near];
}

/**
 * How many frames load at once. Each loads several hundred modules from the
 * dev server; started together, a screenful of frames runs the browser out
 * of requests (ERR_INSUFFICIENT_RESOURCES) and some never load.
 */
const LOADING_AT_ONCE = 2;
/** A frame that hasn't rendered by then gives up its turn anyway. */
const LOADING_LIMIT_MS = 20_000;

let loading = 0;
const waiting: Array<() => void> = [];

function startWaiting() {
    while (loading < LOADING_AT_ONCE && waiting.length > 0) {
        loading++;
        waiting.shift()!();
    }
}

/**
 * Whether the frame may load yet, once `wanted`, and the function to call
 * when it has rendered, which lets the next frame load.
 */
function useLoadingTurn(wanted: boolean): [boolean, () => void] {
    const [allowed, setAllowed] = React.useState(false);
    const release = React.useRef<() => void>(() => {});
    React.useEffect(() => {
        if (!wanted) {
            return;
        }
        let started = false;
        let finished = false;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const finish = () => {
            if (finished || !started) {
                return;
            }
            finished = true;
            clearTimeout(timer);
            loading--;
            startWaiting();
        };
        const start = () => {
            started = true;
            timer = setTimeout(finish, LOADING_LIMIT_MS);
            setAllowed(true);
        };
        release.current = finish;
        waiting.push(start);
        startWaiting();
        return () => {
            const index = waiting.indexOf(start);
            if (index >= 0) {
                waiting.splice(index, 1);
            }
            finish();
        };
    }, [wanted]);
    const done = React.useCallback(() => release.current(), []);
    return [allowed, done];
}

/** The item at `revision`, read when the revision changes. */
function useDraft(itemId: string, revision: number | undefined) {
    const [draft, setDraft] = React.useState<DraftData | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => {
        let current = true;
        fetch(`/api/drafts/${encodeURIComponent(itemId)}`)
            .then((response) =>
                response.ok
                    ? response.json()
                    : Promise.reject(
                          new Error(`perseus-mcp answered ${response.status}`),
                      ),
            )
            .then(
                (data: DraftData) => {
                    if (current) {
                        setDraft(data);
                        setError(null);
                    }
                },
                (e) => {
                    if (current) {
                        setError(String(e));
                    }
                },
            );
        return () => {
            current = false;
        };
        // The revision is what says to read the draft again.
    }, [itemId, revision]);
    return {draft, error};
}

function GridFrame({
    itemId,
    revision,
    options,
    title,
    onRendered,
}: {
    itemId: string;
    revision: number | undefined;
    options: OfferedOptions;
    title: string;
    /** Called once Perseus has rendered the item, or couldn't. */
    onRendered: () => void;
}) {
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    const {sendData, height, setPreviewOptions, renderState} =
        usePreviewController(iframeRef);
    React.useEffect(() => {
        if (renderState?.status === "done" || renderState?.status === "error") {
            onRendered();
        }
    }, [renderState?.status, onRendered]);
    const {draft, error} = useDraft(itemId, revision);

    React.useEffect(() => {
        setPreviewOptions(options);
    }, [options, setPreviewOptions]);
    React.useEffect(() => {
        if (draft == null) {
            return;
        }
        sendData({
            type: "exercise",
            data: {
                item: pinDiagramRevisions(draft.item, draft.diagrams ?? {}),
                apiOptions: {},
                showRationales: false,
            },
        });
    }, [draft, sendData]);

    return (
        <>
            {error != null && (
                <BodyText size="small" role="alert">
                    {`Couldn't read this item: ${error}`}
                </BodyText>
            )}
            <iframe
                ref={iframeRef}
                src="/preview/frame"
                title={title}
                className={styles.gridFrame}
                style={{blockSize: height ?? undefined}}
            />
        </>
    );
}

function GridCard({
    item,
    number,
    options,
    onOpen,
}: {
    item: ItemView;
    number: string;
    options: OfferedOptions;
    onOpen: (itemId: string) => void;
}) {
    const [ref, near] = useNearWindow<HTMLLIElement>();
    const [allowed, rendered] = useLoadingTurn(near && !item.missing);
    const title = `Item ${number}`;
    return (
        <li ref={ref} className={styles.card}>
            <div className={styles.cardHeader}>
                <a
                    className={styles.link}
                    href={`?item=${encodeURIComponent(item.itemId)}`}
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
                        onOpen(item.itemId);
                    }}
                >
                    <BodyText tag="span" weight="semi">
                        {title}
                    </BodyText>
                </a>
                <BodyText tag="span" size="xsmall">
                    <ItemStatus item={item} />
                </BodyText>
            </div>
            <IssueList issues={item.issues ?? []} brief={true} />
            {item.missing ? null : allowed ? (
                <GridFrame
                    itemId={item.itemId}
                    revision={item.revision}
                    options={options}
                    title={title}
                    onRendered={rendered}
                />
            ) : (
                <div className={styles.gridPlaceholder} />
            )}
        </li>
    );
}

/**
 * Every problem type's items, each in its own frame at a phone's width.
 * `onOpen` shows one item on its own.
 */
export function ExerciseGrid({
    view,
    options,
    onOptionsChange,
    onOpen,
}: {
    view: ExerciseView;
    /** The options every frame renders with. */
    options: OfferedOptions;
    onOptionsChange: (options: Partial<OfferedOptions>) => void;
    onOpen: (itemId: string) => void;
}) {
    const none = view.problemTypes.every((type) => type.items.length === 0);
    return (
        <div className={styles.grid}>
            <details className={layout.options}>
                <summary className={layout.optionsSummary}>
                    <PhosphorIcon
                        icon={caretRightIcon}
                        className={layout.caret}
                        aria-hidden={true}
                    />
                    <BodyText tag="span" weight="semi">
                        Preview options
                    </BodyText>
                    <BodyText
                        tag="span"
                        size="small"
                        className={layout.optionsSet}
                    >
                        {describeOptions(options, {withoutPhone: true})}
                    </BodyText>
                </summary>
                <div className={layout.optionsBody}>
                    <OptionControls
                        label="Modes"
                        options={options}
                        withoutPhone={true}
                        onChange={onOptionsChange}
                    />
                </div>
            </details>
            {none && <BodyText>This exercise has no items.</BodyText>}
            {view.problemTypes.map((problemType, index) =>
                problemType.items.length === 0 ? null : (
                    <section
                        key={problemType.name ?? `none-${index}`}
                        aria-label={`${index + 1}. ${problemType.name ?? "Unassigned"}`}
                    >
                        <Heading tag="h2" size="medium">
                            {`${index + 1}. ${problemType.name ?? "Unassigned"}`}
                        </Heading>
                        <ol className={styles.cards}>
                            {problemType.items.map((item, position) => (
                                <GridCard
                                    key={item.itemId}
                                    item={item}
                                    number={`${index + 1}.${position + 1}`}
                                    options={options}
                                    onOpen={onOpen}
                                />
                            ))}
                        </ol>
                    </section>
                ),
            )}
        </div>
    );
}
