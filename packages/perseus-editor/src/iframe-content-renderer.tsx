/**
 * Displays the given content in an iframe, isolating it from the parent page
 *
 * To simulate the environment of content rendered by itself, content previews
 * are rendered inside iframes, where components such as the math keypad work
 * because the body of the document is not the body of the editor. To make this
 * work, this component renders an iframe and can communicate objects to it
 * through postMessage. The recipient then needs to listen for these messages
 * to get the data to render. When the iframe is loaded, it's javascript sends
 * a message to the parent, which triggers the parent to send the current data.
 */
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import {
    isPerseusMessage,
    sendMessageToIframeContent,
    setIframeParameter,
} from "./iframe-utils";

import type {MessageToIFrameParent} from "./iframe-utils";
import type {
    APIOptions,
    DeviceType,
    PerseusItem,
    PerseusRenderer,
} from "@khanacademy/perseus";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type ArticleData = {
    apiOptions: APIOptions;
    json: Partial<PerseusRenderer>;
    useNewStyles: boolean;
    linterContext: LinterContextProps;
    legacyPerseusLint: ReadonlyArray<string>;
};

export type NewDataMessage =
    | {
          type: "question";
          data: {
              item: PerseusItem;
              apiOptions: APIOptions;
              initialHintsVisible: number;
              device: DeviceType;
              linterContext: LinterContextProps;
              reviewMode: boolean;
              legacyPerseusLint: ReadonlyArray<string>;
          };
      }
    | {
          type: "hint";
          data: {
              hint: PerseusRenderer;
              bold: boolean;
              pos: number;
              apiOptions?: APIOptions;
              linterContext: LinterContextProps;
          };
      }
    | {type: "article-all"; data: ReadonlyArray<ArticleData>}
    | {type: "article"; data: ArticleData};

let nextIframeID = 0;
const requestIframeData: Record<string, any> = {};
const updateIframeHeight: Record<string, any> = {};

function processIframeParentMessage(message: MessageToIFrameParent) {
    if (!isPerseusMessage(message)) {
        return;
    }

    const messageType = message.type;
    switch (messageType) {
        case "perseus:update-iframe-height":
            updateIframeHeight[message.frameID]?.(message.height);
            return;

        case "perseus:request-data":
            // In Perseus, we expect the callback to exist, as it is added by
            // `IframeContentRenderer.componentDidMount()`. Unfortunately, this
            // event listener also gets added in Manticore (since we include Perseus
            // from there), and Crowdin fires its own "message" events. So we'll
            // just have to ignore the event when we can't find the callback.
            requestIframeData[message.frameID]?.();
            return;

        default:
            throw new UnreachableCaseError(messageType);
    }
}

// This is called once after Perseus is loaded and the iframe
// is ready to render content, then twice a second afterwards
// to capture the result of animations.
window.addEventListener("message", (event) => {
    processIframeParentMessage(event.data);
});

type Props = {
    // The HTML content to render to the iframe
    // content?: string,

    // The URL that the iframe should load
    url: string;
    // When `true`, instructs the iframe content page to enable mobile touch
    // emulation.
    emulateMobile: boolean;
    // Whether to make the iframe's height match its content's height,
    // used to prevent scrolling inside the iframe.
    seamless: boolean;
};

class IframeContentRenderer extends React.Component<Props> {
    _frame: HTMLIFrameElement | null | undefined;
    container = React.createRef<HTMLDivElement>();

    // @ts-expect-error - TS2564 - Property '_isMounted' has no initializer and is not definitely assigned in the constructor.
    _isMounted: boolean;
    _lastData: any;
    // @ts-expect-error - TS2564 - Property '_lastHeight' has no initializer and is not definitely assigned in the constructor.
    _lastHeight: number;

    iframeID = nextIframeID++;

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        this._prepareFrame();
        requestIframeData[this.iframeID] = () => {
            this.sendNewData(this._lastData);
        };

        updateIframeHeight[this.iframeID] = (height: any) => {
            this._lastHeight = height;
            if (
                this._isMounted &&
                this.props.seamless &&
                this.container.current
            ) {
                this.container.current.style.height = height + "px";
            }
        };
    }

    shouldComponentUpdate(nextProps: Props): boolean {
        return (
            nextProps.emulateMobile !== this.props.emulateMobile ||
            nextProps.seamless !== this.props.seamless
        );
    }

    componentDidUpdate(prevProps: Props) {
        if (this.container.current) {
            if (!this.props.seamless) {
                this.container.current.style.height = "100%";
            } else {
                this.container.current.style.height = this._lastHeight + "px";
            }
        }

        if (prevProps.emulateMobile !== this.props.emulateMobile) {
            // Not just a change in seamless
            this._prepareFrame();
        }
    }

    componentWillUnmount() {
        requestIframeData[this.iframeID] = null;
        updateIframeHeight[this.iframeID] = null;

        this._isMounted = false;
    }

    _prepareFrame() {
        // Don't initialize the iframe until the page has loaded
        if (this._frame) {
            this.container.current?.removeChild(this._frame);
        }

        const frame = document.createElement("iframe");
        frame.style.width = "100%";
        frame.style.height = "100%";
        // We provide a known, invalid base URL here (the second parameter) so
        // that we can remove it later in this function. The URL constructor
        // does not accept a path-only but we use it to properly construct the
        // URL we need. At the end we strip the known base URI and know that
        // the only way it would exist in the final URL is because a path was
        // passed in.
        const frameSrc = new URL(this.props.url, "https://www.example.com");

        setIframeParameter(
            frameSrc,
            "emulate-mobile",
            this.props.emulateMobile.toString(),
        );

        setIframeParameter(frameSrc, "frame-id", String(this.iframeID));

        if (this.props.seamless) {
            // The seamless prop is the same as the "nochrome" prop that
            // gets passed to DeviceFramer. If it is set, then we're going
            // to be displaying editor previews and want to leave some room
            // for lint indicators in the right margin. We use the dataset
            // as above to pass this information on to the perseus-frame
            // component inside the iframe
            setIframeParameter(frameSrc, "lint-gutter", "true");
        }
        // Now strip the known, invalid base URL - meaning we were passed just
        // a URL path.
        frame.src = frameSrc.toString().replace("https://www.example.com", "");
        this.container.current?.appendChild(frame);

        this._frame = frame;
    }

    sendNewData(data: NewDataMessage) {
        const frame = this._frame;
        if (this._isMounted && data && frame?.contentWindow) {
            this._lastData = data;

            // We can't use JSON.stringify/parse for this because the apiOptions
            // includes the functions GroupMetadataEditor, groupAnnotator,
            // onFocusChange, and onInputError.
            sendMessageToIframeContent(frame, {
                type: "perseus:data-changed",
                frameID: this.iframeID,
                // We clone the data using the JSON module to eliminate
                // functions that may exist (mostly in APIOptions).
                // `JSON.stringify()` throws away any values that are
                // functions. These values cannot be sent through
                // `postMessage()` and shouldn't be anyways.
                data: JSON.parse(JSON.stringify(data)),
            });
        }
    }

    render(): React.ReactNode {
        return (
            <div ref={this.container} style={{width: "100%", height: "100%"}} />
        );
    }
}

export default IframeContentRenderer;
