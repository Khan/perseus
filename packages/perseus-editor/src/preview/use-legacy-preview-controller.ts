import * as React from "react";

import type {PreviewContent} from "./message-types";

let nextLegacyIframeId = 0;

declare global {
    interface Window {
        iframeDataStore?: Record<string, unknown>;
    }
}

type Result = {
    /**
     * Stable id assigned to the iframe; pass through to the iframe element's
     * `data-id` attribute so the legacy receiver can read it from
     * `window.frameElement.dataset.id`.
     */
    iframeId: string;
    /**
     * Send the latest preview data to the legacy iframe by writing it into
     * `window.iframeDataStore[iframeId]` and (once the iframe has handshook)
     * posting `iframeId` back to it. Call this on every content update —
     * the legacy iframe doesn't kick anything off until it sees the id.
     */
    sendData: (data: PreviewContent) => void;
    /**
     * Height reported via the legacy `{id, height}` message. `null` until the
     * iframe sends one (or always `null` if the iframe is on the typed
     * protocol — in that case the typed `height` from `usePreviewController`
     * is what's populated).
     */
    height: number | null;
};

/**
 * Parent-side preview controller for the legacy postMessage protocol.
 *
 * **Transitional — delete once all consumers have upgraded to a Perseus
 * version that uses `usePreviewPresenter` on the iframe side.**
 *
 * Teaches `PreviewWithIframe` to also speak the legacy `IframeContentRenderer`
 * wire protocol, alongside the typed protocol that `usePreviewController`
 * already implements. The two are mutually exclusive for any given iframe —
 * a preview frame loaded from a Perseus version that predates
 * `usePreviewPresenter` only ever sends/receives the legacy shape, and a
 * frame on the typed protocol never touches `window.iframeDataStore`.
 *
 * The legacy protocol:
 *   1. Parent assigns the iframe an id via `dataset.id` (aka `data-id={x}`).
 *   2. Iframe sends that id back to parent as a raw string when ready.
 *   3. Parent writes the latest data into `window.iframeDataStore[id]` and
 *      posts the id back to the iframe.
 *   4. Iframe reads `window.parent.iframeDataStore[id]` for its content.
 *   5. Iframe reports height via postMessage() as `{id, height}` (object, not
 *      string).
 *
 * This controller runs in addition to `usePreviewController`. The typed
 * listener filters by `source: "perseus-preview"` and ignores raw strings /
 * `{id, ...}` objects; this listener filters by the iframe's id and ignores
 * typed messages. Heights from either protocol surface through the typed
 * controller's `height` (typed) or this hook's `height` (legacy);
 * `PreviewWithIframe` combines them.
 */
export function useLegacyPreviewController(
    iframeRef: React.RefObject<HTMLIFrameElement>,
): Result {
    const [iframeId] = React.useState(() => String(nextLegacyIframeId++));
    const [height, setHeight] = React.useState<number | null>(null);
    const [isReady, setIsReady] = React.useState(false);
    const latestDataRef = React.useRef<PreviewContent | null>(null);

    React.useEffect(() => {
        if (!window.iframeDataStore) {
            window.iframeDataStore = {};
        }

        return () => {
            if (window.iframeDataStore) {
                delete window.iframeDataStore[iframeId];
            }
        };
    }, [iframeId]);

    React.useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const contentWindow = iframeRef.current?.contentWindow;
            if (contentWindow == null || event.source !== contentWindow) {
                return;
            }

            // Legacy ready handshake: the iframe posts its assigned id back
            // as a raw string.
            if (typeof event.data === "string" && event.data === iframeId) {
                if (latestDataRef.current != null && window.iframeDataStore) {
                    window.iframeDataStore[iframeId] = latestDataRef.current;
                    contentWindow.postMessage(iframeId, "*");
                }
                setIsReady(true);
                return;
            }

            // Legacy height update: `{id, height}`.
            if (
                event.data != null &&
                typeof event.data === "object" &&
                (event.data as {id?: unknown}).id === iframeId &&
                typeof (event.data as {height?: unknown}).height === "number"
            ) {
                setHeight((event.data as {height: number}).height);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [iframeRef, iframeId]);

    const sendData = React.useCallback(
        (data: PreviewContent) => {
            latestDataRef.current = data;

            if (!window.iframeDataStore) {
                window.iframeDataStore = {};
            }
            window.iframeDataStore[iframeId] = data;

            if (isReady) {
                iframeRef.current?.contentWindow?.postMessage(iframeId, "*");
            }
        },
        [iframeRef, iframeId, isReady],
    );

    return {iframeId, sendData, height};
}
