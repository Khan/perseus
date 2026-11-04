// A draft's live preview: it follows the draft's event stream and sends each
// revision to the preview frame, with the preview's option and hint controls.
// The draft page (shell.tsx) and the exercise page show it.
import {usePreviewController} from "@khanacademy/perseus-preview";
import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {
    DEFAULT_OFFERED_OPTIONS,
    HintControls,
    OptionControls,
} from "./controls";
import styles from "./draft-preview.module.css";
import {useRenderMarkers} from "./render-markers";

import type {OfferedOptions} from "./controls";
import type {PerseusItem} from "@khanacademy/perseus-core";

type DraftEvent = {
    itemId: string;
    revision: number;
    updatedAt: string;
    item: PerseusItem;
};

type Connection = "connecting" | "open" | "lost";

const CONNECTION_TEXT: Record<Connection, string> = {
    connecting: "Connecting…",
    open: "Live: updates as the draft changes.",
    // EventSource reconnects by itself.
    lost: "Lost the connection to perseus-mcp. Reconnecting…",
};

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
export function DraftPreview({itemId}: {itemId: string}) {
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
    const status =
        draft == null
            ? CONNECTION_TEXT[connection]
            : `Revision ${draft.revision}. ${CONNECTION_TEXT[connection]}`;

    React.useEffect(() => {
        if (draft == null) {
            return;
        }
        sendData({
            type: "exercise",
            data: {item: draft.item, apiOptions: {}, showRationales: false},
        });
    }, [draft, sendData]);

    return (
        <View className={styles.preview}>
            <BodyText>{status}</BodyText>
            <OptionControls
                options={options}
                onChange={(changed) =>
                    setOptions((current) => ({...current, ...changed}))
                }
            />
            <HintControls hintsState={hintsState} revealHint={revealHint} />
            <iframe
                ref={iframeRef}
                src="/preview/frame"
                title={`Draft ${itemId}`}
                className={styles.frame}
                style={{blockSize: height ?? undefined}}
            />
        </View>
    );
}
