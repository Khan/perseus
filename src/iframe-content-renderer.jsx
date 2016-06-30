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
window.iframeDataStore = {};

// This is only called once per iframe, after Perseus is loaded and the frame
// is ready to render content.
window.addEventListener("message", (event) => {
    requestIframeData[event.data]();
});

const IframeContentRenderer = React.createClass({
    propTypes: {
        content: React.PropTypes.string.isRequired,
        datasetKey: React.PropTypes.any,
        datasetValue: React.PropTypes.any,
    },

    componentDidMount: function() {
        this.iframeID = nextIframeID;
        nextIframeID++;

        this._prepareFrame();
        requestIframeData[this.iframeID] = () => {
            this.sendNewData(this._lastData);
        };
    },

    shouldComponentUpdate: function(nextProps) {
        return nextProps.content !== this.props.content
            || nextProps.datasetValue !== this.props.datasetValue;
    },

    componentDidUpdate: function() {
        this._prepareFrame();
    },

    coomponentWillUnmount: function() {
        requestIframeData[this.iframeID] = null;
    },

    _prepareFrame: function() {
        if (this._frame) {
            this.refs.container.removeChild(this._frame);
        }

        this._frame = document.createElement("iframe");
        this._frame.style.width = "100%";
        this._frame.style.height = "100%";
        if (this.props.datasetKey) {
            this._frame.dataset[this.props.datasetKey] =
                this.props.datasetValue;
        }
        this._frame.dataset.id = this.iframeID;
        this.refs.container.appendChild(this._frame);

        this._frame.contentWindow.document.open();
        this._frame.contentWindow.document.write(this.props.content);
        this._frame.contentWindow.document.close();
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
