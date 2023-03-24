/**
 * Displays the given content in an iframe, isolating it from the parent page
 *
 * To simulate the environment of content rendered by itself, content previews
 * are rendered inside iframes, where components such as the math keypad work
 * because the body of the document is not the body of the editor. To make this
 * work, this component renders an iframe and can communicate objects to it
 * through postMessage. The recipient then needs to listen for these messages
 * and pull out the appropriate object stored in the parent's iframeDataStore
 * to get the data to render. When the iframe is loaded, it's javascript calls
 * its requestIframeData function in the parent, which triggers the parent to
 * send the current data.
 */
import {Log} from "@khanacademy/perseus";
import * as React from "react";

let nextIframeID = 0;
const requestIframeData: Record<string, any> = {};
const updateIframeHeight: Record<string, any> = {};
window.iframeDataStore = {};

// This is called once after Perseus is loaded and the iframe
// is ready to render content, then twice a second afterwards
// to capture the result of animations.
window.addEventListener("message", (event) => {
    if (typeof event.data === "string") {
        // In Perseus, we expect the callback to exist, as it is added by
        // `IframeContentRenderer.componentDidMount()`. Unfortunately, this
        // event listener also gets added in Manticore (since we include Perseus
        // from there), and Crowdin fires its own "message" events. So we'll
        // just have to ignore the event when we can't find the callback.
        const callback = requestIframeData[event.data];
        if (callback) {
            callback();
        }
    } else if (event.data.id) {
        if (event.data.height !== undefined) {
            updateIframeHeight[event.data.id](event.data.height);
        } else if (event.data.lintWarnings) {
            // This is a lint report being sent back from the linter.
            // TODO:
            // We'll want to display the number of warnings in the HUD.
            // But for now, we just log it to the console
            Log.log("LINTER REPORT", {
                lintWarnings: JSON.stringify(event.data.lintWarnings),
            });
        }
    }
});

type Props = {
    // The HTML content to render to the iframe
    // content?: string,

    // The URL that the iframe should load
    url: string,
    // The data-* suffix for passing information to the iframe's JS
    datasetKey: string,
    // The value of the data-* attribute
    datasetValue: any,
    // Whether to make the iframe's height match its content's height,
    // used to prevent scrolling inside the iframe.
    seamless: boolean
};

class IframeContentRenderer extends React.Component<Props> {
    _frame: HTMLIFrameElement | null | undefined;
    _isMounted: boolean;
    _lastData: any;
    _lastHeight: number;
    iframeID: number;

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        this.iframeID = nextIframeID;
        nextIframeID++;

        this._prepareFrame();
        requestIframeData[this.iframeID] = () => {
            this.sendNewData(this._lastData);
        };

        updateIframeHeight[this.iframeID] = (height: any) => {
            this._lastHeight = height;
            if (this._isMounted && this.props.seamless) {
                // eslint-disable-next-line react/no-string-refs
                this.refs.container.style.height = height + "px";
            }
        };
    }

    shouldComponentUpdate(nextProps: Props): boolean {
        return (
            nextProps.datasetValue !== this.props.datasetValue ||
            nextProps.seamless !== this.props.seamless
        );
    }

    componentDidUpdate(prevProps: Props) {
        if (!this.props.seamless) {
            // eslint-disable-next-line react/no-string-refs
            this.refs.container.style.height = "100%";
        } else {
            // eslint-disable-next-line react/no-string-refs
            this.refs.container.style.height = this._lastHeight + "px";
        }

        if (prevProps.datasetValue !== this.props.datasetValue) {
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
            // eslint-disable-next-line react/no-string-refs
            this.refs.container.removeChild(this._frame);
        }

        const frame = document.createElement("iframe");
        frame.style.width = "100%";
        frame.style.height = "100%";
        frame.src = this.props.url;

        if (this.props.datasetKey) {
            // If the user has specified a data-* attribute to place on the
            // iframe, we set it here. Right now, this is used to
            // communicate if the iframe should be enabling touch emulation.
            frame.dataset[this.props.datasetKey] = this.props.datasetValue;
        }
        frame.dataset.id = String(this.iframeID);

        if (this.props.seamless) {
            // The seamless prop is the same as the "nochrome" prop that
            // gets passed to DeviceFramer. If it is set, then we're going
            // to be displaying editor previews and want to leave some room
            // for lint indicators in the right margin. We use the dataset
            // as above to pass this information on to the perseus-frame
            // component inside the iframe
            frame.dataset.lintGutter = "true";
        }

        // eslint-disable-next-line react/no-string-refs
        this.refs.container.appendChild(frame);

        this._frame = frame;
    }

    sendNewData(data: any) {
        const frame = this._frame;
        if (this._isMounted && data && frame?.contentWindow) {
            this._lastData = data;

            // We can't use JSON.stringify/parse for this because the apiOptions
            // includes the functions GroupMetadataEditor, groupAnnotator,
            // onFocusChange, and onInputError.
            window.iframeDataStore[this.iframeID] = data;
            frame.contentWindow.postMessage(this.iframeID, "*");
        }
    }

    render(): React.ReactElement {
        // eslint-disable-next-line react/no-string-refs
        return <div ref="container" style={{width: "100%", height: "100%"}} />;
    }
}

export default IframeContentRenderer;
