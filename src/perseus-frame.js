/**
 * Loads the Perseus preview frame
 *
 * This is loaded inside the iframe, where it sets up the PreviewFrame component
 * that handles all communication between the iframe and its parent.
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

const afterMathJaxLoad = () => {
    Perseus.init({skipMathJax: false, loadExtraWidgets: true}).then(function() {
        const isMobile =
            window.frameElement.getAttribute("data-mobile") === "true";
        ReactDOM.render(
            <div id="measured">
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
