(function(undefined) {

var Perseus = window.Perseus = {};

Perseus.init = function() {
    var deferred = $.Deferred();

    MathJax.Hub.Config({
        messageStyle: "none",
        skipStartupTypeset: "none",
        "HTML-CSS": {
            availableFonts: ["TeX"],
            imageFont: null,
            scale: 100,
            showMathMenu: false
        },
        tex2jax: {
            inlineMath: [["$", "$"]],
            processEscapes: true
        }
    });

    MathJax.Hub.Configured();
    MathJax.Hub.Queue(deferred.resolve);

    return deferred;
};

})();
