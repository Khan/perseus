(function(Perseus) {

// Why all caps? I don't know, but that's what MathJax does in its own source.
var HUB = MathJax.Hub;

var Renderer = Perseus.Renderer = Perseus.Widget.extend({
    render: function() {
        // Extract math with HTML entities so we don't get confused by
        // "_italicized equations like $y - y_1 = m (x - x_1)$_"
        // and similar confusing things where underscores and asterisks within
        // math screw up the Markdown parsing
        var extracted = extractMath(this.options.content),
            html = marked(extracted[0]),
            savedMath = extracted[1];

        // Replace math references
        html = html.replace(/@@(\d+)@@/g, function(match, num) {
            var original = savedMath[num];
            if (original.charAt(0) === "@") {
                // Not actually math, just sub it back in
                return original;
            } else {
                // Math starting and ending with $. Substitute "< /" for "</"
                // so it doesn't end the script tag.
                var tex = original.slice(1, original.length - 1);
                return ("<script type='math/tex'>" +
                        tex.replace(/<\//g, "< /") +
                        "</script>");
            }
        });

        // Replace widget references
        html = html.replace(
                /((?:<p>)?)\[\[([a-z-]+) (\d+)\]\]((?:<\/p>)?)/g,
                function(match, openp, type, id, closep) {
                    var tag;
                    if (openp && closep) {
                        // Block level widget (on its own line) -- we want to
                        // get rid of the surrounding <p> tags
                        tag = "div";
                        openp = closep = "";
                    } else {
                        tag = "span";
                    }

                    // Don't need to call _.escape because it's just
                    // alphanumeric (okay, and hyphens too...)
                    return (openp + "<" + tag + " class='perseus-widget' " +
                            "data-widget-type='" + type + "' " +
                            "data-widget-id='" + id + "'>" +
                            "</" + tag + ">" + closep);
                });

        // Hide the element now so you don't see unprocessed math -- will be
        // reshown in present()
        this.$el.hide();
        this.$el.html(html);

        var mathDeferred = $.Deferred();
        HUB.Queue(["Process", HUB, this.el]);
        HUB.Queue(mathDeferred.resolve);

        var subwidgetDeferreds = [];

        this.$(".perseus-widget").each(function() {
            var $widgetEl = $(this);
            var widgetType = $widgetEl.data("widgetType");
            var widgetId = $widgetEl.data("widgetId");

            // TODO(alpert): Error handling if/when getWidget gets fancy
            subwidgetDeferreds.push(Perseus.Widgets.get(widgetType).then(
                    function(widgetClass) {
                        // TODO(alpert): Widget options
                        var widget = new widgetClass({
                            el: $widgetEl
                        });
                        return widget.render();
                    }));
        });

        var widget = this;
        return $.when.apply($, [mathDeferred].concat(subwidgetDeferreds)).then(
                function() {
                    return widget;
                });
    },

    present: function() {
        var deferred = $.Deferred();

        this.$el.show();
        HUB.Queue(["Reprocess", HUB, this.el]);
        HUB.Queue(deferred.resolve);

        // TODO(alpert): Reprocess subwidgets

        return deferred.promise();
    }
});

var rmath = /(\$|[{}]|\\[\\${}]|\n{2,}|@@\d+@@)/g;

// In IE8, split doesn't work right. Implement it ourselves.
var mathSplit = "x".split(/(.)/g).length
        ? function(str) { return str.split(rmath); }
        : function(str) {
            // Based on Steven Levithan's MIT-licensed split, available at
            // http://blog.stevenlevithan.com/archives/cross-browser-split
            var output = [];
            var lastIndex = rmath.lastIndex = 0;
            var match;

            while (match = rmath.exec(str)) {
                output.push(str.slice(lastIndex, match.index));
                output.push.apply(output, match.slice(1));
                lastIndex = match.index + match[0].length;
            }

            output.push(str.slice(lastIndex));
            return output;
        };

function extractMath(text) {
    // extractMath("$x$ is a cool number, just like $6 * 7$!") gives
    //     ["@@0@@ is a cool number, just like @@1@@!", ["$x$", "$6 * 7$"]]
    //
    // Inspired by http://stackoverflow.com/q/11231030.
    //
    // TODO(alpert): Backticks for code
    var savedMath = [];
    var blocks = mathSplit(text);

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
            } else if (block.slice(0, 2) === "\n\n" || i === l - 1) {
                // We're at the end of a line... just don't do anything
                // TODO(alpert): Error somehow?
                blocks[i] = mathPieces.join("");
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
