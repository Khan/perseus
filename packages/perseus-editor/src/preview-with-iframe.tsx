/**
 * Displays content in an iframe, isolating it from the parent page and
 * triggering rendering mobile, if needed.
 *
 * To simulate the environment of content rendered by itself, content previews
 * are rendered inside iframes, where components such as the math keypad and
 * mobile breakpoints based on media queries work (because the body of the
 * document is not the body of the editor. To make this work, this component
 * renders an iframe and communicates with it via the `usePreviewController`
 * hook and its use of postMessage.
 *
 * This is the new preview iframe component, replaces `IframeContentRenderer`
 * once all editors have migrated. It exists alongside the legacy component so
 * that consumers can keep using `IframeContentRenderer` until they are all
 * ported over.
 *
 * For backwards compatibility, this component also speaks the legacy
 * `IframeContentRenderer` wire protocol via `useLegacyPreviewController`,
 * so it can drive preview frames running an older version of Perseus (one
 * from before the typed-protocol preview existed). The legacy support is
 * transitional — see that hook's docs for the deletion trigger.
 */
import * as React from "react";

import {useLegacyPreviewController} from "./preview/use-legacy-preview-controller";
import {usePreviewController} from "./preview/use-preview-controller";

import type {PreviewContent} from "./preview/message-types";

type Props = {
    // The URL that the iframe should load
    url: string;
    // Whether the iframe should be displaying in mobile mode
    isMobile: boolean;
    // Whether to make the iframe's height match its content's height,
    // used to prevent scrolling inside the iframe.
    seamless: boolean;
};

export type PreviewWithIframeRef = {
    sendNewData: (data: PreviewContent) => void;
};

const PreviewWithIframe = React.forwardRef<PreviewWithIframeRef, Props>(
    (props, ref) => {
        const containerRef = React.useRef<HTMLDivElement>(null);
        const iframeRef = React.useRef<HTMLIFrameElement>(null);

        const {sendData, height: typedHeight} = usePreviewController(iframeRef);
        const {
            iframeId: legacyIframeId,
            sendData: sendLegacyData,
            height: legacyHeight,
        } = useLegacyPreviewController(iframeRef);

        // Expose sendNewData method via ref
        React.useImperativeHandle(
            ref,
            () => ({
                sendNewData: (data: PreviewContent) => {
                    sendData(data);
                    sendLegacyData(data);
                },
            }),
            [sendData, sendLegacyData],
        );

        // Either protocol can populate height; only one will in practice for
        // a given iframe.
        const height = typedHeight ?? legacyHeight;

        // Update container height based on iframe content height
        let containerHeight = "100%";
        if (!props.seamless) {
            containerHeight = "100%";
        } else if (height !== null) {
            containerHeight = `${height}px`;
        }

        return (
            <div
                ref={containerRef}
                data-testid="preview-with-iframe-container"
                style={{width: "100%", height: containerHeight}}
            >
                <iframe
                    ref={iframeRef}
                    title={`perseus-preview`}
                    data-mobile={props.isMobile ? "true" : "false"}
                    // The seamless prop is the same as the "nochrome" prop that
                    // gets passed to DeviceFramer. If it is set, then we're going
                    // to be displaying editor previews and want to leave some room
                    // for lint indicators in the right margin.
                    data-lint-gutter={props.seamless ? "true" : "false"}
                    // Identifier read by legacy preview frames via
                    // `window.frameElement.dataset.id`. New typed-protocol
                    // frames ignore it. See `useLegacyPreviewController`.
                    data-id={legacyIframeId}
                    style={{width: "100%", height: "100%"}}
                    src={props.url}
                />
            </div>
        );
    },
);

PreviewWithIframe.displayName = "PreviewWithIframe";

export default PreviewWithIframe;
