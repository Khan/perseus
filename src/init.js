/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const _ = require("underscore");

const init = function(options) {
    _.defaults(options, {
        // Pass skipMathJax: true if MathJax is already loaded and configured.
        skipMathJax: false,
    });

    const deferred = $.Deferred();

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
                showMathMenu: false,
            },
        });

        MathJax.Hub.Configured();
        MathJax.Hub.Queue(deferred.resolve);
    }

    return deferred;
};

module.exports = init;
