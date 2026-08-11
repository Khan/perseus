import type {
    IframeToParentMessage,
    ParentToIframeMessage,
} from "./message-types";

declare global {
    interface Window {
        /**
         * Set to `true` in either frame to log every preview bridge message.
         */
        __PERSEUS_PREVIEW_BRIDGE_DEBUG__?: boolean;
    }
}

type BridgeMessage = ParentToIframeMessage | IframeToParentMessage;

/**
 * Which way a message crossed the bridge, named for the peer at the far end:
 * the parent logs `→iframe`/`←iframe`, the iframe logs `→parent`/`←parent`.
 */
export type BridgeDirection = "→iframe" | "←iframe" | "→parent" | "←parent";

const LOG_PREFIX = "[preview-bridge]";

// Width of the longest message type, so details line up down the log.
const TYPE_COLUMN_WIDTH = "set-a11y-scanning-enabled".length;

let sequence = 0;

/**
 * Whether bridge logging is currently on, read fresh each call so it can be
 * flipped mid-session from the console.
 *
 * Also honours the parent's flag: the presenter runs inside the iframe, so a
 * flag set only in the top frame would log one side of the conversation and
 * silently drop the other.
 */
function isEnabled(): boolean {
    if (window.__PERSEUS_PREVIEW_BRIDGE_DEBUG__ === true) {
        return true;
    }

    try {
        return (
            window.parent !== window &&
            window.parent.__PERSEUS_PREVIEW_BRIDGE_DEBUG__ === true
        );
    } catch {
        // A cross-origin parent can't be read. Nothing to fall back to.
        return false;
    }
}

/**
 * The fields that distinguish one instance of a message type from another —
 * enough to spot a stale version or a runaway resend, without dumping whole
 * content payloads into the console.
 */
function describeMessage(message: BridgeMessage): string {
    switch (message.type) {
        case "content-data":
            return `v=${message.contentVersion} content=${message.content.type}`;

        case "iframe-init":
            return [
                `v=${message.contentVersion}`,
                `content=${message.content?.type ?? "null"}`,
                `scanning=${message.a11yScanningEnabled}`,
            ].join(" ");

        case "set-a11y-scanning-enabled":
            return `enabled=${message.enabled}`;

        case "highlight-issues":
            return [
                `v=${message.contentVersion}`,
                `ids=[${message.instanceIds.join(", ")}]`,
            ].join(" ");

        case "clear-highlights":
        case "iframe-ready":
            return "";

        case "height-update":
            return `height=${message.height}`;

        case "a11y-report":
            return [
                `v=${message.contentVersion}`,
                `violations=${message.violations.length}`,
                `needsReview=${message.needsReview.length}`,
            ].join(" ");
    }

    // Unreachable while every message type is handled above; adding one makes
    // this a compile error. It returns rather than throws because a debug aid
    // must never be the thing that breaks the preview.
    return message satisfies never;
}

/**
 * Logs one message crossing the preview bridge, when bridge debugging is on.
 *
 * The sequence number is what makes a resend loop obvious: on an idle preview
 * it stops climbing.
 */
export function logBridgeMessage(
    direction: BridgeDirection,
    message: BridgeMessage,
): void {
    if (!isEnabled()) {
        return;
    }

    sequence += 1;

    const details = describeMessage(message);
    const type = message.type.padEnd(TYPE_COLUMN_WIDTH);

    // eslint-disable-next-line no-console
    console.log(
        `${LOG_PREFIX} #${sequence} ${direction} ${type} ${details}`.trimEnd(),
    );
}
