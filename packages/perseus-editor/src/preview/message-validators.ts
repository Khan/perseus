import {PREVIEW_MESSAGE_SOURCE} from "./message-types";

import type {
    IframeToParentMessage,
    ParentToIframeMessage,
} from "./message-types";

/**
 * Type guard to check if an object is an {IframeToParentMessage} type.
 *
 * This validates that the message has the correct structure and source
 * identifier to be from a Perseus preview iframe.
 *
 * @param msg - Unknown message to validate
 * @returns True if message is a valid IframeToParentMessage
 */
export function isIframeToParentMessage(
    msg: unknown,
): msg is IframeToParentMessage {
    return (
        typeof msg === "object" &&
        msg !== null &&
        "source" in msg &&
        typeof msg.source === "string" &&
        msg.source === PREVIEW_MESSAGE_SOURCE
    );
}

/**
 * Type guard to check if a message is from the Perseus preview system parent.
 *
 * This validates that the message has the correct structure and source
 * identifier to be from a Perseus preview host.
 *
 * @param message - Unknown message to validate
 * @returns True if message is a valid ParentToIframeMessage
 */
export function isParentToIframeMessage(
    message: unknown,
): message is ParentToIframeMessage {
    return (
        typeof message === "object" &&
        message !== null &&
        "source" in message &&
        typeof message.source === "string" &&
        message.source === PREVIEW_MESSAGE_SOURCE
    );
}
