/** @jsx React.DOM */
(function(Perseus) {

require("./core.js");
require("./util.js");

var TeX = require("./tex.jsx");
var Widgets = require("./widgets.js");

var Renderer = Perseus.Renderer = React.createClass({

    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(this.props, nextProps)) {
            // TODO(jack): Investigate why this is happening when
            // a hint is taken, and stop resetting the widgets in
            // that circumstance, either by making this check more
            // lenient, or by not modifying the answer area's
            // renderer props when that happens.
            this.setState({widgets: {}});
        }
    },

    getDefaultProps: function() {
        return {
            content: "",
            ignoreMissingWidgets: false
        };
    },

    getInitialState: function() {
        // TODO(alpert): Move up to parent props?
        return {
            widgets: {}
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        var stateChanged = !_.isEqual(this.state, nextState);
        var propsChanged = !_.isEqual(this.props, nextProps);
        return propsChanged || stateChanged;
    },

    getPiece: function(saved, widgetIds) {
        if (saved.charAt(0) === "@") {
            // Just text
            return saved;
        } else if (saved.charAt(0) === "$") {
            // Math
            var tex = saved.slice(1, saved.length - 1);
            return <TeX>{tex}</TeX>;
        } else if (saved.charAt(0) === "[") {
            // Widget
            var match = Perseus.Util.rWidgetParts.exec(saved);
            var id = match[1];
            var type = match[2];

            var widgetInfo = (this.props.widgets || {})[id];
            if (widgetInfo || this.props.ignoreMissingWidgets) {
                widgetIds.push(id);
                var cls = Widgets.get(type);

                return cls(_.extend({
                    ref: id,
                    onChange: function(newProps, cb) {
                        var widgets = _.clone(this.state.widgets);
                        widgets[id] = _.extend({}, widgets[id], newProps);
                        this.setState({widgets: widgets}, cb);
                    }.bind(this)
                }, (widgetInfo || {}).options, this.state.widgets[id]));
            }
        }
    },

    render: function() {
        var self = this;
        var extracted = extractMathAndWidgets(this.props.content);
        var markdown = extracted[0];
        var savedMath = extracted[1];
        var widgetIds = this.widgetIds = [];

        // XXX(alpert): smartypants gets called on each text node before it's
        // added to the DOM tree, so we override it to insert the math and
        // widgets.
        var smartypants = markedReact.InlineLexer.prototype.smartypants;
        markedReact.InlineLexer.prototype.smartypants = function(text) {
            var pieces = Perseus.Util.split(text, /@@(\d+)@@/g);
            for (var i = 0; i < pieces.length; i++) {
                var type = i % 2;
                if (type === 0) {
                    pieces[i] = smartypants.call(this, pieces[i]);
                } else if (type === 1) {
                    // A saved math-or-widget number
                    pieces[i] = self.getPiece(savedMath[pieces[i]], widgetIds);
                }
            }
            return pieces;
        };

        try {
            return <div>{markedReact(markdown)}</div>;
        } catch (e) {
            // (IE8 needs this catch)
            throw e;
        } finally {
            markedReact.InlineLexer.prototype.smartypants = smartypants;
        }
    },

    focus: function() {
        // Use _.some to break if any widget gets focused
        var focused = _.some(this.widgetIds, function(id) {
            var widget = this.refs[id];
            return widget.focus && widget.focus();
        }, this);

        if (focused) {
            return true;
        }
    },

    toJSON: function(skipValidation) {
        var state = {};
        _.each(this.props.widgets, function(props, id) {
            var widget = this.refs[id];
            var s = widget.toJSON(skipValidation);
            if (!_.isEmpty(s)) {
                state[id] = s;
            }
        }, this);
        return state;
    },

    guessAndScore: function() {
        var widgetProps = this.props.widgets;

        var totalGuess = _.map(this.widgetIds, function(id) {
            return this.refs[id].toJSON();
        }, this);

        var totalScore = _.chain(this.widgetIds)
                .filter(function(id) {
                    var props = widgetProps[id];
                    // props.graded is unset or true
                    return props.graded == null || props.graded;
                })
                .map(function(id) {
                    var props = widgetProps[id];
                    var widget = this.refs[id];
                    return widget.simpleValidate(props.options);
                }, this)
                .reduce(Perseus.Util.combineScores, Perseus.Util.noScore)
                .value();

        return [totalGuess, totalScore];
    },

    examples: function() {
        var widgets = _.values(this.refs);
        var examples = _.compact(_.map(widgets, function(widget) {
            return widget.examples ? widget.examples() : null;
        }));

        // no widgets with examples
        if (!examples.length) {
            return null;
        }

        var allEqual = _.all(examples, function(example) {
            return _.isEqual(examples[0], example);
        });

        // some widgets have different examples
        // TODO(alex): handle this better
        if (!allEqual) {
            return null;
        }

        return examples[0];
    }
});

var rInteresting =
        /(\$|[{}]|\\[\\${}]|\n{2,}|\[\[\u2603 [a-z-]+ [0-9]+\]\]|@@\d+@@)/g;

function extractMathAndWidgets(text) {
    // "$x$ is a cool number, just like $6 * 7$!" gives
    //     ["@@0@@ is a cool number, just like @@1@@!", ["$x$", "$6 * 7$"]]
    //
    // Inspired by http://stackoverflow.com/q/11231030.
    var savedMath = [];
    var blocks = Perseus.Util.split(text, rInteresting);

    var mathPieces = [], l = blocks.length, block, braces;
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
        } else if (i % 2 === 1) {
            // Looking for a start delimeter
            var two = block && block.slice(0, 2);
            if (two === "[[" || two === "@@") {
                // A widget or an @@n@@ thing (which we pull out so we don't
                // get confused later).
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

Renderer.extractMathAndWidgets = extractMathAndWidgets;

})(Perseus);
