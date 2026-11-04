// The preview page's render markers, the convention render pages use for
// screenshots: a headless browser that opens the page waits for
// `data-render-done` on its body, or reads `data-render-error`.
import * as React from "react";

import type {RenderState} from "@khanacademy/perseus-preview";

/**
 * Sets the markers on `element` for the preview's render state: `renderDone`
 * ("true") once the content has rendered, `renderError` (the message) if it
 * couldn't, and neither while it's rendering or before there's content.
 */
export function setRenderMarkers(
    element: HTMLElement,
    renderState: RenderState | null,
): void {
    if (renderState?.status === "done") {
        element.dataset.renderDone = "true";
    } else {
        delete element.dataset.renderDone;
    }
    if (renderState?.status === "error") {
        element.dataset.renderError = renderState.message;
    } else {
        delete element.dataset.renderError;
    }
}

/** Keeps the page body's render markers in step with `renderState`. */
export function useRenderMarkers(renderState: RenderState | null): void {
    React.useEffect(() => {
        setRenderMarkers(document.body, renderState);
    }, [renderState]);
}
