
const init = function(options) {
    // Pass skipMathJax: true if MathJax is already loaded and configured.
    const skipMathJax = options.skipMathJax;

    const widgetsDeferred = $.Deferred();

    // HACK(charlie): To maintain backwards compatibility, only exclude the
    // extra widgets if the parameter is explicitly falsey (rather than merely
    // undefined). We should probably bump the Perseus major version number
    // (since this is a breaking change in the API) but this is a more
    // lightweight fix that will get exercises working in our mobile apps
    // immediately.
    if (options.loadExtraWidgets === undefined || options.loadExtraWidgets) {
        const Widgets = require("./widgets.js");
        require.ensure([], require => {
            const extraWidgets = require("./extra-widgets.js");
            Widgets.registerMany(extraWidgets);
            widgetsDeferred.resolve();
        }, "extra-widgets");
    } else {
        widgetsDeferred.resolve();
    }

    const mathJaxDeferred = $.Deferred();

    if (skipMathJax) {
        mathJaxDeferred.resolve();
    } else {
        MathJax.Hub.Config({
            messageStyle: "none",
            skipStartupTypeset: "none",
            "HTML-CSS": {
                availableFonts: ["TeX"],
                imageFont: null,
                scale: 100,
                showMathMenu: false,
            },
        });

        MathJax.Hub.Configured();
        MathJax.Hub.Queue(mathJaxDeferred.resolve);
    }

    return widgetsDeferred.then(() => mathJaxDeferred);
};

module.exports = init;
