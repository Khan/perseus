(function(Perseus) {

var Renderer = Perseus.Renderer = Perseus.Widget.extend({
    options: {
        content: "",
        widgets: {}
    },

    initialize: function() {
        this.subwidgetIds = [];
        this.subwidgets = {};
    },

    render: function() {
        var renderer = this;

        // Extract math with HTML entities so we don't get confused by
        // "_italicized equations like $y - y_1 = m (x - x_1)$_"
        // and similar confusing things where underscores and asterisks within
        // math screw up the Markdown parsing
        var extracted = extractMath(this.options.content),
            html = marked(extracted[0]),
            savedMath = extracted[1];

        // Replace widget references
        html = html.replace(
                /((?:<p>)?)\[\[\u2603 ([a-z-]+ [0-9]+)\]\]((?:<\/p>)?)/g,
                function(match, openp, id, closep) {
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
                            "data-widget-id='" + id + "'>" +
                            "</" + tag + ">" + closep);
                });

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

        // Hide the element now so you don't see unprocessed math -- will be
        // reshown at the end of the function
        this.$el.hide();
        this.$el.html(html);

        var mathDeferred = $.Deferred();
        // XXX(alpert): This is sometimes synchronous, other times async
        MathJax.Hub.Queue(["Process", MathJax.Hub, this.el]);
        MathJax.Hub.Queue(mathDeferred.resolve);

        var subwidgetDeferreds = [];

        // Need both of these since JS object keys aren't sorted consistently
        var subwidgetIds = this.subwidgetIds = [];
        var subwidgets = this.subwidgets = {};

        this.$(".perseus-widget").each(function() {
            var $widgetEl = $(this);
            // TODO(alpert): Check that widgetId in subwidgets, not used twice
            var widgetId = $widgetEl.data("widgetId");
            var widgetInfo = renderer.options.widgets[widgetId];

            if (widgetInfo == null) {
                // Something went wrong. One cause of this is when typing an
                // invalid widget name when editing. Hopefully there's nothing
                // else that gives this situation. We'll just not do anything
                // with this widget.
                return;
            }

            subwidgetIds.push(widgetId);
            // TODO(alpert): Error handling if/when getWidget gets fancy
            subwidgetDeferreds.push(Perseus.Widgets.get(widgetInfo.type).then(
                    function(widgetClass) {
                        // TODO(alpert): Widget options
                        var options = _.extend({
                            el: $widgetEl
                        }, widgetInfo.options);
                        var widget = new widgetClass(options);
                        subwidgets[widgetId] = widget;
                        return widget.render();
                    }));
        });

        return $.when.apply($, [mathDeferred].concat(subwidgetDeferreds)).then(
                function() {
                    renderer.$el.show();

                    // TODO(alpert): Call reprocess elsewhere?
                    return renderer.reprocess();
                });
    },

    reprocess: function() {
        var mathDeferred = $.Deferred();
        MathJax.Hub.Queue(["Reprocess", MathJax.Hub, this.el]);
        MathJax.Hub.Queue(mathDeferred.resolve);

        // TODO(alpert): Reprocess subwidgets

        var widget = this;
        return mathDeferred.then(function() {
            return widget;
        });
    },

    focus: function() {
        var firstWidget = this.subwidgetIds.length ?
                this.subwidgets[this.subwidgetIds[0]] :
                null;
        if (firstWidget) {
            firstWidget.focus();
            return true;
        } else {
            return false;
        }
    },

    setState: function() {
        // TODO(alpert): Propagate state to subwidgets
    },

    toJSON: function(skipValidation) {
        // TODO(alpert): Text content should probably be here somewhere
        var state = {};
        _.each(this.subwidgets, function(widget, id) {
            var s = widget.toJSON(skipValidation);
            if (!_.isEmpty(s)) {
                state[id] = s;
            }
        });
        return state;
    },

    guessAndScore: function() {
        var widgetOptions = this.options.widgets;

        var totalGuess = [];
        var totalScore = {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };

        totalScore = _.chain(this.subwidgetIds)
                .map(function(id) {
                    var widget = this.subwidgets[id];
                    // TODO(alpert): What if id not in subwidgets?
                    var guess = widget.toJSON();

                    totalGuess.push(guess);
                    return widget.simpleValidate(widgetOptions[id].options);
                }, this)
                .reduce(Perseus.Util.combineScores, totalScore)
                .value();

        return [totalGuess, totalScore];
    }
});

var rmath = /(\$|[{}]|\\[\\${}]|\n{2,}|@@\d+@@)/g;

// In IE8, split doesn't work right. Implement it ourselves.
var mathSplit = "x".split(/(.)/g).length ?
    function(str) { return str.split(rmath); } :
    function(str) {
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
