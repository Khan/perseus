(function(undefined) {

var Perseus = window.Perseus = {};

Perseus.init = function() {
    var deferred = $.Deferred();

    marked.setOptions({
        sanitize: true
    });

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

    return deferred;
};

})();
