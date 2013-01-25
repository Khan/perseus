(function(undefined) {

var Perseus = window.Perseus = {};

Perseus.init = function() {
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

    $("code").each(function() {
        var $script = $('<script type="math/tex">').text($(this).text());
        $(this).replaceWith($script);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, $script[0]]);
    });
};

})();
