/**
 * Loads the Perseus preview frame
 *
 * This is loaded inside the iframe, where it sets up the PreviewFrame component
 * that handles all communication between the iframe and its parent.
 */

require('./perseus-env.js');

window.Khan = {
    Util: KhanUtil,
    error: function() {},
    query: {debug: ""},
    imageBase: "/images/",
    scratchpad: {
        _updateComponent: function() {
        },
        enable: function() {
            Khan.scratchpad.enabled = true;
            this._updateComponent();
        },
        disable: function() {
            Khan.scratchpad.enabled = false;
            this._updateComponent();
        },
        enabled: true,
    },
};

const Perseus = window.Perseus = require('./perseus.js');
const ReactDOM = window.ReactDOM = React.__internalReactDOM;

const PreviewFrame = require('./preview-frame.jsx');

Perseus.init({skipMathJax: false, loadExtraWidgets: true}).then(function() {
    const isMobile =
        window.frameElement.getAttribute("data-mobile") === "true";
    ReactDOM.render(
        <div style={{overflow: "hidden"}} id="measured">
            <PreviewFrame isMobile={isMobile} />
        </div>,
        document.getElementById("content-container")
    );
}).then(function() {}, function(err) {
    console.error(err); // @Nolint
});
