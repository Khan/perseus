/**
 * Loads the Perseus preview frame
 *
 * This is loaded inside the iframe, where it sets up the PreviewFrame component
 * that handles all communication between the iframe and its parent.
 * NOTE(amy): The KA CMS preview relies on frame-exercise.jsx in webapp's
 * perseus-preview-package (which largely duplicates this logic)
 */

require('./perseus-env.js');

// We only apply the stub implementation of window.Khan when it is not detected.
// When the stub implementation is not used, mathJaxLoaded is defined on
// window.Khan so we wait for mathJaxLoaded to complete before initializing
// Perseus
if (!window.Khan) {
    window.Khan = {
        Util: KhanUtil,
        error: function() {},
        query: {debug: ""},
        imageBase: "/images/",
    };
}

const Perseus = window.Perseus = require('./perseus.js');
const ReactDOM = window.ReactDOM = React.__internalReactDOM;

const PreviewFrame = require('./preview-frame.jsx');
const constants = require('./components/constants.js');

const afterMathJaxLoad = () => {
    Perseus.init({skipMathJax: false, loadExtraWidgets: true}).then(function() {
        const isMobile =
            window.frameElement.getAttribute("data-mobile") === "true";

        const styles = {};
        if (window.frameElement.getAttribute("data-lint-gutter") === "true") {
            // When we're being used in "edit mode", we need to draw our own
            // border and allocate space on the right to display lint
            // indicators in. IframeContentRenderer tells us to do this by
            // setting the data-lint-gutter attribute. If that attribute is
            // not set we don't need to allocate extra space or draw a border.
            // The DeviceFramer has already done it for us.
            styles.marginRight = constants.lintGutterWidth;
            styles.borderWidth = constants.perseusFrameBorderWidth;
            styles.borderColor = "black";
            styles.borderStyle = "solid";
        }

        ReactDOM.render(
            <div id="measured" style={styles}>
                <PreviewFrame isMobile={isMobile}/>
            </div>,
            document.getElementById("content-container")
        );
    }).then(function() {}, function(err) {
        console.error(err); // @Nolint
    });
};

if (window.Khan.mathJaxLoaded) {
    window.Khan.mathJaxLoaded.then(afterMathJaxLoad);
} else {
    afterMathJaxLoad();
}
