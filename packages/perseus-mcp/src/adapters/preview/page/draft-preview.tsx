// A draft's live preview: it follows the draft's event stream and sends each
// revision to the preview frame. The options fold into one row above the
// frame, which scrolls in its own pane, and the hint controls sit in a bar
// pinned under it. The draft page (shell.tsx) and the exercise page show it.
import {usePreviewController} from "@khanacademy/perseus-preview";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import caretRightIcon from "@phosphor-icons/core/regular/caret-right.svg";
import * as React from "react";

import {pinDiagramRevisions} from "../../../domain/graffiti/diagram";

import {
    DEFAULT_OFFERED_OPTIONS,
    describeOptions,
    HintControls,
    OptionControls,
} from "./controls";
import styles from "./page-layout.module.css";
import {useRenderMarkers} from "./render-markers";

import type {OfferedOptions} from "./controls";
import type {Connection} from "./status-bar";
import type {PerseusItem} from "@khanacademy/perseus-core";

type DraftEvent = {
    itemId: string;
    revision: number;
    updatedAt: string;
    item: PerseusItem;
    /** The latest revision of each diagram the item shows. */
    diagrams?: Record<string, number>;
};

/** What the page around the preview shows of it, in its status bar. */
export type DraftStatus = {connection: Connection; revision: number | null};

function useDraftEvents(itemId: string) {
    const [draft, setDraft] = React.useState<DraftEvent | null>(null);
    const [connection, setConnection] =
        React.useState<Connection>("connecting");

    React.useEffect(() => {
        const events = new EventSource(
            `/drafts/${encodeURIComponent(itemId)}/events`,
        );
        events.addEventListener("draft", (event) => {
            setDraft(JSON.parse(event.data));
            setConnection("open");
        });
        events.addEventListener("error", () => setConnection("lost"));
        return () => events.close();
    }, [itemId]);

    return {draft, connection};
}

/** Remount it (with a `key`) to show another draft. */
export function DraftPreview({
    itemId,
    onStatus,
    above,
}: {
    itemId: string;
    onStatus: (status: DraftStatus) => void;
    /** Shown above the preview, in its scrolling pane. */
    above?: React.ReactNode;
}) {
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    const {
        sendData,
        height,
        revealHint,
        hintsState,
        setPreviewOptions,
        renderState,
    } = usePreviewController(iframeRef);
    // On the page's body, so a tool that opens the page's URL can tell when
    // the frame has rendered the draft.
    useRenderMarkers(renderState);
    const [options, setOptions] = React.useState<OfferedOptions>(
        DEFAULT_OFFERED_OPTIONS,
    );
    React.useEffect(() => {
        setPreviewOptions(options);
    }, [options, setPreviewOptions]);
    const {draft, connection} = useDraftEvents(itemId);
    const revision = draft?.revision ?? null;
    React.useEffect(() => {
        onStatus({connection, revision});
    }, [connection, revision, onStatus]);

    React.useEffect(() => {
        if (draft == null) {
            return;
        }
        // Naming each diagram's revision makes Perseus load a new
        // revision's labels rather than the ones it has kept.
        const item = pinDiagramRevisions(draft.item, draft.diagrams ?? {});
        sendData({
            type: "exercise",
            data: {item, apiOptions: {}, showRationales: false},
        });
    }, [draft, sendData]);

    return (
        <div className={styles.pane}>
            <div className={styles.paneTop}>
                <details className={styles.options}>
                    <summary className={styles.optionsSummary}>
                        <PhosphorIcon
                            icon={caretRightIcon}
                            className={styles.caret}
                            aria-hidden={true}
                        />
                        <BodyText tag="span" weight="semi">
                            Preview options
                        </BodyText>
                        <BodyText
                            tag="span"
                            size="small"
                            className={styles.optionsSet}
                        >
                            {describeOptions(options)}
                        </BodyText>
                    </summary>
                    <div className={styles.optionsBody}>
                        <OptionControls
                            label="Modes"
                            options={options}
                            onChange={(changed) =>
                                setOptions((current) => ({
                                    ...current,
                                    ...changed,
                                }))
                            }
                        />
                    </div>
                </details>
            </div>
            <div className={styles.paneScroll}>
                {above}
                <iframe
                    ref={iframeRef}
                    src="/preview/frame"
                    title={`Draft ${itemId}`}
                    className={styles.frame}
                    style={{blockSize: height ?? undefined}}
                />
            </div>
            <div className={styles.paneBar}>
                <HintControls
                    hintsState={hintsState}
                    revealHint={revealHint}
                    layout="bar"
                />
            </div>
        </div>
    );
}
