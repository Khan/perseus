/* eslint-disable static-service/require-fixture */
// @flow
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
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import * as React from "react";

let nextIframeID = 0;
const requestIframeData = {};
const updateIframeHeight = {};
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

const IframeContentRenderer: $FlowFixMe = createReactClass({
    displayName: "IframeContentRenderer",

    propTypes: {
        // The HTML content to render to the iframe
        content: PropTypes.string.isRequired,

        // The data-* suffix for passing information to the iframe's JS
        datasetKey: PropTypes.any,

        // The value of the data-* attribute
        datasetValue: PropTypes.any,

        // Whether to make the iframe's height match its content's height,
        // used to prevent scrolling inside the iframe.
        seamless: PropTypes.bool,
    },

    componentDidMount: function () {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        this.iframeID = nextIframeID;
        nextIframeID++;

        this._prepareFrame();
        requestIframeData[this.iframeID] = () => {
            this.sendNewData(this._lastData);
        };

        updateIframeHeight[this.iframeID] = (height) => {
            this._lastHeight = height;
            if (this._isMounted && this.props.seamless) {
                // eslint-disable-next-line react/no-string-refs
                this.refs.container.style.height = height + "px";
            }
        };
    },

    shouldComponentUpdate: function (nextProps) {
        return (
            nextProps.content !== this.props.content ||
            nextProps.datasetValue !== this.props.datasetValue ||
            nextProps.seamless !== this.props.seamless
        );
    },

    componentDidUpdate: function (prevProps) {
        if (!this.props.seamless) {
            // eslint-disable-next-line react/no-string-refs
            this.refs.container.style.height = "100%";
        } else {
            // eslint-disable-next-line react/no-string-refs
            this.refs.container.style.height = this._lastHeight + "px";
        }

        if (
            prevProps.content !== this.props.content ||
            prevProps.datasetValue !== this.props.datasetValue
        ) {
            // Not just a change in seamless
            this._prepareFrame();
        }
    },

    componentWillUnmount: function () {
        requestIframeData[this.iframeID] = null;
        updateIframeHeight[this.iframeID] = null;

        this._isMounted = false;
    },

    _prepareFrame: function () {
        // Don't initialize the iframe until the page has loaded
        if (this._frame) {
            // eslint-disable-next-line react/no-string-refs
            this.refs.container.removeChild(this._frame);
        }

        this._frame = document.createElement("iframe");
        this._frame.style.width = "100%";
        this._frame.style.height = "100%";

        if (this.props.datasetKey) {
            // If the user has specified a data-* attribute to place on the
            // iframe, we set it here. Right now, this is used to
            // communicate if the iframe should be enabling touch emulation.
            this._frame.dataset[this.props.datasetKey] =
                this.props.datasetValue;
        }
        this._frame.dataset.id = this.iframeID;

        if (this.props.seamless) {
            // The seamless prop is the same as the "nochrome" prop that
            // gets passed to DeviceFramer. If it is set, then we're going
            // to be displaying editor previews and want to leave some room
            // for lint indicators in the right margin. We use the dataset
            // as above to pass this information on to the perseus-frame
            // component inside the iframe
            this._frame.dataset.lintGutter = "true";
        }

        // To make sure the value of location.href inside the iframe is the
        // same as the location of the parent, we wait for the iframe to
        // load before writing contents. Without the wait, the location
        // inside the iframe becomes "about:blank", which causes problems
        // with loading $LAB.
        this._frame.onload = () => {
            this._frame.onload = null;

            // To prevent an issue with the contents of the iframe not being
            // loaded properly, where the javascript inside the iframe is
            // not executed, we push the content window write to the end
            // of the event queue.
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            // eslint-disable-next-line no-restricted-syntax
            setTimeout(() => {
                this._frame.contentWindow.document.open();
                this._frame.contentWindow.document.write(this.props.content);
                this._frame.contentWindow.document.close();
            });
        };

        // eslint-disable-next-line react/no-string-refs
        this.refs.container.appendChild(this._frame);
    },

    sendNewData: function (data) {
        if (this._isMounted && data && this._frame.contentWindow) {
            this._lastData = data;

            // We can't use JSON.stringify/parse for this because the apiOptions
            // includes the functions GroupMetadataEditor, groupAnnotator,
            // onFocusChange, and onInputError.
            window.iframeDataStore[this.iframeID] = data;
            this._frame.contentWindow.postMessage(this.iframeID, "*");
        }
    },

    render: function () {
        // eslint-disable-next-line react/no-string-refs
        return <div ref="container" style={{width: "100%", height: "100%"}} />;
    },
});

export default IframeContentRenderer;
