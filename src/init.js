
const init = function(options) {
    // Pass skipMathJax: true if MathJax is already loaded and configured.
    const skipMathJax = options.skipMathJax;

    const widgetsDeferred = $.Deferred();

    if (options.loadExtraWidgets) {
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
