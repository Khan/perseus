var React = require('react');

var init = function(options) {
    _.defaults(options, {
        // Pass skipMathJax: true if MathJax is already loaded and configured.
        skipMathJax: false
    });

    var deferred = $.Deferred();

    markedReact.setOptions({
        sanitize: true,
        paragraphFn: function(text) {
            return React.DOM.div(null, text);
        }
    });

    if (options.skipMathJax) {
        deferred.resolve();
    } else {
        MathJax.Hub.Config({
            messageStyle: "none",
            skipStartupTypeset: "none",
            "HTML-CSS": {
                availableFonts: ["TeX"],
                imageFont: null,
                scale: 100,
                showMathMenu: false
            }
        });

        MathJax.Hub.Configured();
        MathJax.Hub.Queue(deferred.resolve);
    }

    return deferred;
};

module.exports = init;
