// The preview page for one draft (`/drafts/<itemId>/preview`). It follows the
// draft's event stream and sends each revision to the preview frame, so the
// page shows the draft's latest state without reloading.
import {usePreviewController} from "@khanacademy/perseus-editor";
import * as React from "react";
import {createRoot} from "react-dom/client";

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

function Shell({itemId}: {itemId: string}) {
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    const {sendData, height} = usePreviewController(iframeRef);
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
        <>
            <header>
                <h1>{`Preview of draft ${itemId}`}</h1>
                <p>{status}</p>
            </header>
            <main>
                <iframe
                    ref={iframeRef}
                    src="/preview/frame"
                    title={`Draft ${itemId}`}
                    style={{height: height ?? undefined}}
                />
            </main>
        </>
    );
}

// The page's path is /drafts/<itemId>/preview.
const itemId = decodeURIComponent(window.location.pathname.split("/")[2]);
createRoot(document.getElementById("root")!).render(<Shell itemId={itemId} />);
