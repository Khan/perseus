/**
 * Displays the given content in an iframe, isolating it from the parent page
 *
 * To simulate the environment of content rendered by itself, content previews
 * are rendered inside iframes, where components such as the math keypad work
 * because the body of the document is not the body of the editor. To make this
 * work, this component renders an iframe and communicates with it via postMessage
 * using the preview hooks system.
 */
import * as React from "react";

import {usePreviewHost} from "./preview/use-preview-host";

import type {PreviewContent} from "./preview/message-types";

let nextIframeID = 0;

type Props = {
    // The URL that the iframe should load
    url: string;
    // Whether the iframe should be displaying in mobile mode
    isMobile: boolean;
    // Whether to make the iframe's height match its content's height,
    // used to prevent scrolling inside the iframe.
    seamless: boolean;
};

type IframeContentRendererHandle = {
    sendNewData: (data: PreviewContent) => void;
};

const IframeContentRenderer = React.forwardRef<
    IframeContentRendererHandle,
    Props
>((props, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    // ID is for debugging/logging, not routing (which uses event.source)
    const [iframeId] = React.useState(() => String(nextIframeID++));

    const {sendData, height} = usePreviewHost(iframeRef);

    // Update container height based on iframe content height
    React.useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        if (!props.seamless) {
            containerRef.current.style.height = "100%";
        } else if (height !== null) {
            containerRef.current.style.height = `${height}px`;
        }
    }, [height, props.seamless]);

    // Expose sendNewData method via ref
    React.useImperativeHandle(
        ref,
        () => ({
            sendNewData: (data: PreviewContent) => {
                sendData(data);
            },
        }),
        [sendData],
    );

    return (
        <div ref={containerRef} style={{width: "100%", height: "100%"}}>
            <iframe
                ref={iframeRef}
                title={`perseus-preview-${iframeId}`}
                data-id={iframeId}
                data-mobile={props.isMobile ? "true" : "false"}
                // The seamless prop is the same as the "nochrome" prop that
                // gets passed to DeviceFramer. If it is set, then we're going
                // to be displaying editor previews and want to leave some room
                // for lint indicators in the right margin.
                data-lint-gutter={props.seamless ? "true" : "false"}
                style={{width: "100%", height: "100%"}}
                src={props.url}
            />
        </div>
    );
});

IframeContentRenderer.displayName = "IframeContentRenderer";

export default IframeContentRenderer;
