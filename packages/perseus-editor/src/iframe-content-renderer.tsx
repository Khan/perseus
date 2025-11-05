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
    const [iframe, setIframe] = React.useState<HTMLIFrameElement | null>(null);
    const iframeIdRef = React.useRef<number>(nextIframeID++);
    const lastDataRef = React.useRef<PreviewContent | null>(null);

    const {sendData, height} = usePreviewHost(iframeRef);

    // Create iframe and set it up
    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const frame = document.createElement("iframe");
        frame.style.width = "100%";
        frame.style.height = "100%";
        frame.src = props.url;

        if (props.datasetKey) {
            // If the user has specified a data-* attribute to place on the
            // iframe, we set it here. Right now, this is used to
            // communicate if the iframe should be enabling touch emulation.
            frame.dataset[props.datasetKey] = props.datasetValue;
        }
        frame.dataset.id = String(iframeIdRef.current);

        if (props.seamless) {
            // The seamless prop is the same as the "nochrome" prop that
            // gets passed to DeviceFramer. If it is set, then we're going
            // to be displaying editor previews and want to leave some room
            // for lint indicators in the right margin. We use the dataset
            // as above to pass this information on to the perseus-frame
            // component inside the iframe
            frame.dataset.lintGutter = "true";
        }

        container.appendChild(frame);
        setIframe(frame);

        return () => {
            if (frame.parentNode) {
                container.removeChild(frame);
            }
            setIframe(null);
        };
    }, [props.url, props.datasetKey, props.datasetValue, props.seamless]);

    // Update iframeRef when iframe changes
    React.useEffect(() => {
        // This is a workaround since we can't directly assign to ref.current
        // We need to recreate the ref object
        if (iframe) {
            Object.defineProperty(iframeRef, "current", {
                value: iframe,
                writable: true,
                configurable: true,
            });
        }
    }, [iframe]);

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
                lastDataRef.current = data;
                sendData(data);
            },
        }),
        [sendData],
    );

    return <div ref={containerRef} style={{width: "100%", height: "100%"}} />;
});

IframeContentRenderer.displayName = "IframeContentRenderer";

export default IframeContentRenderer;
