(function(Perseus) {

var Renderer = Perseus.Renderer = Backbone.View.extend({
    render: function() {
        var deferred = $.Deferred();

        // Extract math with HTML entities so we don't get confused by
        // "_italicized equations like $y - y_1 = m (x - x_1)$_"
        // and similar confusing things where underscores and asterisks within
        // math screw up the Markdown parsing
        var extracted = extractMath(this.options.content),
            html = marked(extracted[0]),
            savedMath = extracted[1];

        // Replace math with the original contents
        html = html.replace(/@@(\d+)@@/g, function(match, num) {
            var original = savedMath[num];
            if (original.charAt(0) === "@") {
                // Not actually math, just sub it back in
                return original;
            } else {
                // Math starting and ending with $. Substitute "< /" for "</"
                // so it doesn't end the script tag.
                var tex = original.slice(1, original.length - 1);
                return ('<script type="math/tex">' +
                        tex.replace(/<\//g, "< /") +
                        '</script>');
            }
        });

        this.$el.html(html);

        MathJax.Hub.Queue(["Process", MathJax.Hub, this.el]);
        MathJax.Hub.Queue(deferred.resolve);

        return deferred;
    }
});

function extractMath(text) {
    // extractMath("$x$ is a cool number, just like $6 * 7$!") gives
    //     ["@@0@@ is a cool number, just like @@1@@!", ["$x$", "$6 * 7$"]]
    //
    // Inspired by http://stackoverflow.com/q/11231030.
    //
    // TODO(alpert): Backticks for code
    var savedMath = [];
    var blocks = text.split(/(\$|\\.|[{}]|@@\d+@@)/g);
    console.log(JSON.stringify(blocks));

    var mathPieces = [], l = blocks.length, block, braces;
    // TODO(alpert): Skip by 2 instead?
    for (var i = 0; i < l; i++) {
        block = blocks[i];

        if (mathPieces.length) {
            // Looking for an end delimeter
            mathPieces.push(block);
            blocks[i] = "";

            if (block === "$" && braces <= 0) {
                blocks[i] = saveMath(mathPieces.join(""));
                mathPieces = [];
            } else if (i === l - 1) {
                // We're at the end... just don't do anything with the $
                // TODO(alpert): Error somehow?
                blocks[i] = mathPieces.join("")
                mathPieces = [];
            } else if (block === "{") {
                braces++;
            } else if (block === "}") {
                braces--;
            }
        } else {
            // Looking for a start delimeter
            if (block && block.charAt(0) === "@") {
                // An @@n@@ thing! Pull it out so we don't get confused later.
                blocks[i] = saveMath(block);
            } else if (block === "$") {
                // We got one! Save it for later and blank out its space.
                mathPieces.push(block);
                blocks[i] = "";
                braces = 0;
            }
            // Else, just normal text. Move along, move along.
        }
    }

    return [blocks.join(""), savedMath];

    function saveMath(math) {
        savedMath.push(math);
        return "@@" + (savedMath.length - 1) + "@@";
    }
}

// Export functions for unit tests
Renderer._extractMath = extractMath;

})(Perseus);
