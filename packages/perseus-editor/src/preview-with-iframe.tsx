import * as React from "react";

import {usePreviewController} from "./preview/use-preview-controller";

import type {PreviewContent} from "./preview/message-types";

type Props = {
    /**
     * The URL that the iframe should load
     */
    url: string;
    /**
     * Whether the iframe should be displaying in mobile mode
     */
    isMobile: boolean;
    /**
     * Whether to make the iframe's height match its content's height, used to
     * prevent scrolling inside the iframe.
     */
    seamless: boolean;

    /**
     * The content to render in the preview area. `null` means no data has
     * been provided yet and the iframe should render an empty placeholder.
     */
    content: PreviewContent | null;
};

/**
 * Displays content in an iframe, isolating it from the parent page and
 * switches to rendering for mobile, if needed.
 *
 * To simulate the environment of content rendered by itself, content previews
 * are rendered inside iframes, where components such as the math keypad and
 * mobile breakpoints based on media queries work (because the body of the
 * document is not the body of the editor). To make this work, this component
 * renders an iframe and communicates with it via the
 * {@link usePreviewController} hook and its use of postMessage.
 *
 * This is the new preview iframe component, replacing `IframeContentRenderer`
 * once all editors have migrated. It exists alongside the legacy component so
 * that consumers can keep using `IframeContentRenderer` until they are all
 * ported over.
 */
function PreviewWithIframe(props: Props) {
    const iframeRef = React.useRef<HTMLIFrameElement>(null);

    const {sendData, height} = usePreviewController(iframeRef);

    // NOTE: The `props.content` is an object and will trigger a re-render of
    // this component any time its identity changes (regardless of whether it
    // _actually_ changed). This matches previous behavior from the old
    // IframeContentRenderer. If performance becomes an issue, we can look at
    // using React.memo() on this component or some other performance fix.
    React.useEffect(() => {
        if (props.content != null) {
            sendData(props.content);
        }
    }, [sendData, props.content]);

    // Update container height based on iframe content height if we're in
    // seamless mode.
    const containerHeight =
        props.seamless && height != null ? `${height}px` : "100%";

    return (
        <iframe
            ref={iframeRef}
            title={`perseus-preview`}
            data-mobile={String(props.isMobile)}
            // The seamless prop is the same as the "nochrome" prop that
            // gets passed to DeviceFramer. If it is set, then we're going
            // to be displaying editor previews and want to leave some room
            // for lint indicators in the right margin.
            data-lint-gutter={String(props.seamless)}
            style={{width: "100%", height: containerHeight}}
            src={props.url}
        />
    );
}

PreviewWithIframe.displayName = "PreviewWithIframe";

export default PreviewWithIframe;
