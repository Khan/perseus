/**
 * Sent to the parent iframe to tell it to update the <iframe> height. This is
 * used to ensure that the iframe displays the full height of the content after
 * it has rendered.
 */
type UpdateIframeHeightMessage = {
    type: "perseus:update-iframe-height";
    frameID: string;
    height: number;
};

/**
 * Sent to the parent of the iframe to request it to send data to the iframe.
 */
type RequestDataMessage = {
    type: "perseus:request-data";
    frameID: string;
};

/**
 * Messages sent (via sendMessageToIframeParent()) from the iframe preview page
 * to the Perseus iframe host (the page that has the the <iframe> element).
 */
export type MessageToIFrameParent =
    | UpdateIframeHeightMessage
    | RequestDataMessage;

/**
 * Sent by the iframe host to update what is being previewed (ie. re-render).
 */
type DataChangedMessage = {
    type: "perseus:data-changed";
    frameID: number;
    data: any;
};

/**
 * Messages sent (via sendMessageToIframeContent()) from the iframe host
 * to the iframe preview page.
 */
export type MessageToIFrameContent = DataChangedMessage;

/**
 * Sends a message to the iframe host from within the iframe preview page.
 */
export function sendMessageToIframeParent(message: MessageToIFrameParent) {
    window.parent.postMessage(message, "*");
}

/**
 * Sends a message to the iframe preview page from the iframe host.
 */
export function sendMessageToIframeContent(
    target: HTMLIFrameElement,
    message: MessageToIFrameContent,
) {
    target.contentWindow?.postMessage(message, "*");
}

/**
 * Checks if the given message is a Perseus iframe message. Other components
 * loaded on the page may also use `postMessage()` (including browser addons)
 * and so we need to be careful to ignore anything that isn't for us.
 */
export function isPerseusMessage(msg: any): boolean {
    if (typeof msg !== "object") {
        return false;
    }

    return (msg.type ?? "").startsWith("perseus:");
}

/**
 * Registers a message handler to listen for messages from the iframe parent.
 * This should be called by the preview page that is hosted within the iframe.
 * @returns a function to unregister the handler.
 */
export function registerIframeParentMessageHandler(
    handler: (message: MessageToIFrameContent) => void,
) {
    const wrappedHandler = (event) => {
        const data = event.data;
        // All perseus iframe messages are prefixed with a common prefix so
        // that it's easier to detect messages not meant for us.
        if (!isPerseusMessage(data)) {
            return;
        }

        handler(data);
    };

    window.addEventListener("message", wrappedHandler);

    return () => window.removeEventListener("message", wrappedHandler);
}

type IframeParameter = "frame-id" | "lint-gutter" | "emulate-mobile";

/**
 * Sets the given iframe parameter and value on the provided url.
 */
export function setIframeParameter(
    url: URL,
    parameter: IframeParameter,
    value: string,
) {
    url.searchParams.set(parameter, value);
}

type NormalizedSearchParams = Record<string, string>;

/**
 * Extracts the requested parameter from the preview <iframe> `src` url.
 * @returns the parameter value, if found, or `null`.
 */
export function getIframeParameter(
    url: string | URL | URLSearchParams | NormalizedSearchParams,
    parameter: IframeParameter,
): string | null {
    const searchParams =
        typeof url === "string"
            ? new URL(url, "https://www.example.com").searchParams
            : url instanceof URL
              ? url.searchParams
              : url instanceof URLSearchParams
                ? url
                : new URLSearchParams(url);

    return searchParams.get(parameter);
}
