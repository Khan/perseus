(function(undefined) {

var Util = require("./util.js");

var Perseus = window.Perseus = {
    Util: Util
};

Perseus.init = function(options) {
    _.defaults(options, {
        // Pass skipMathJax: true if MathJax is already loaded and configured.
        skipMathJax: false,
        // A function which takes a file object (guaranteed to be an image) and
        // a callback, then calls the callback with the url where the image
        // will be hosted. Image drag and drop is disabled when imageUploader
        // is null.
        imageUploader: null
    });

    var deferred = $.Deferred();

    markedReact.setOptions({
        sanitize: true,
        paragraphFn: function(text) {
            return React.DOM.div({className: 'paragraph'}, text);
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

    Perseus.imageUploader = options.imageUploader;

    return deferred;
};

})();
