/* eslint-disable no-console */

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

const React = require('react');

let nextIframeID = 0;
const requestIframeData = {};
const updateIframeHeight = {};
window.iframeDataStore = {};

// This is only called once per iframe, after Perseus is loaded and the frame
// is ready to render content.
window.addEventListener("message", (event) => {
    if (typeof event.data === "string") {
        requestIframeData[event.data]();
    } else if (event.data.id) {
        updateIframeHeight[event.data.id](event.data.height);
    }
});

const IframeContentRenderer = React.createClass({
    propTypes: {
        // The HTML content to render to the iframe
        content: React.PropTypes.string.isRequired,

        // The data-* suffix for passing information to the iframe's JS
        datasetKey: React.PropTypes.any,

        // The value of the data-* attribute
        datasetValue: React.PropTypes.any,

        // Whether to make the iframe's height match its content's height,
        // used to prevent scrolling inside the iframe.
        seamless: React.PropTypes.bool,
    },

    componentDidMount: function() {
        this.iframeID = nextIframeID;
        nextIframeID++;

        this._prepareFrame();
        requestIframeData[this.iframeID] = () => {
            this.sendNewData(this._lastData);
        };

        updateIframeHeight[this.iframeID] = (height) => {
            this._lastHeight = height;
            if (this.isMounted() && this.props.seamless) {
                this.refs.container.style.height = height + "px";
            }
        };
    },

    shouldComponentUpdate: function(nextProps) {
        return nextProps.content !== this.props.content
            || nextProps.datasetValue !== this.props.datasetValue
            || nextProps.seamless !== this.props.seamless;
    },

    componentDidUpdate: function(prevProps) {
        if (!this.props.seamless) {
            this.refs.container.style.height = "100%";
        } else {
            this.refs.container.style.height = this._lastHeight + "px";
        }

        if (prevProps.content !== this.props.content ||
            prevProps.datasetValue !== this.props.datasetValue) {
            // Not just a change in seamless
            this._prepareFrame();
        }
    },

    componentWillUnmount: function() {
        requestIframeData[this.iframeID] = null;
        updateIframeHeight[this.iframeID] = null;
    },

    _prepareFrame: function() {
        // Don't initialize the iframe until the page has loaded
        if (this._frame) {
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
            setTimeout(() => {
                this._frame.contentWindow.document.open();
                this._frame.contentWindow.document.write(this.props.content);
                this._frame.contentWindow.document.close();
            });
        };

        this.refs.container.appendChild(this._frame);
    },

    sendNewData: function(data) {
        if (this.isMounted() && data) {
            this._lastData = data;

            // We can't use JSON.stringify/parse for this because the apiOptions
            // includes the functions GroupMetadataEditor, groupAnnotator,
            // onFocusChange, and onInputError.
            window.iframeDataStore[this.iframeID] = data;
            this._frame.contentWindow.postMessage(this.iframeID, "*");
        }
    },

    render: function() {
        return <div
            ref="container"
            style={{width: "100%", height: "100%"}}
        ></div>;
    },
});

module.exports = IframeContentRenderer;
