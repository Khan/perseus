// A snippet to paste into the console, kept on one line so it survives the
// copy. Each frame only receives the messages addressed to it, hence the note
// in the hint below.
const BRIDGE_DEBUG_SNIPPET =
    'window.addEventListener("message", (e) => ' +
    'e.data?.source === "perseus-preview" && ' +
    "console.log(JSON.stringify(e.data)));";

// One editor page can mount several previews; the hint is per page load.
let hasLogged = false;

/**
 * Tells whoever has the console open how to watch the preview bridge.
 *
 * The bridge is otherwise invisible: when a preview looks stuck there's no way
 * to tell a message that was never sent from one that arrived and was ignored,
 * without knowing to listen for it first.
 */
export function logBridgeHint(): void {
    if (hasLogged) {
        return;
    }
    hasLogged = true;

    // eslint-disable-next-line no-console
    console.log(
        "[perseus-preview] To watch preview bridge messages, paste this " +
            "into the console. A frame only sees the messages sent to it, so " +
            "run it in the editor's frame for messages from the preview, and " +
            "in the preview iframe's frame for messages to it:\n" +
            BRIDGE_DEBUG_SNIPPET,
    );
}
