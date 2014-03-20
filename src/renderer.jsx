/** @jsx React.DOM */
(function(Perseus) {

require("./core.js");
var Util = require("./util.js");

var TeX = require("./tex.jsx");
var Widgets = require("./widgets.js");

var QuestionParagraph = require("./question-paragraph.jsx");


var specialChars = {
    // escaped: original
    "\\a": "\u0007", // \a isn't valid javascript
    "\\b": "\b",
    "\\t": "\t",
    "\\n": "\n",
    "\\v": "\v",
    "\\f": "\f",
    "\\r": "\r",
    "\\\\": "\\"
};

var rEscapedChars = /\\a|\\b|\\t|\\n|\\v|\\f|\\r|\\\\/g; 
 
if (typeof KA !== "undefined" && KA.language === "en-PT") {
    // When using crowdin's jipt (Just in place translation), we need to keep a
    // registry of crowdinId's to component so that we can update the
    // component's state as the translator enters their translation.
    Perseus.TranslationComponents = [];

    if (!KA.jipt_dom_insert_checks) {
        KA.jipt_dom_insert_checks = [];
    }

    // We add a function that will get called whenever jipt says the dom needs
    // to be updated
    KA.jipt_dom_insert_checks.push(function(text, node, attribute) {
        var index = $(node).data("perseus-component-index");
        // We only update if we had added an index onto the node's data. 
        if (node && typeof index !== "undefined") {
            var component = Perseus.TranslationComponents[index];
            // Jipt sends down the escaped translation, so we need to
            // unescape \\t to \t among other charachters here
            text = text.replace(
                rEscapedChars,
                function(ch) {
                    return specialChars[ch];
                });

            component.setState({
                jiptContent: text
            });

            // Return false to tell jipt not to insert anything into the DOM
            // itself, otherwise it will mess up what React expects there to be
            return false;
        }
        // The string updated wasn't part of perseus, so we tell jipt to just
        // insert the translation as-is.
        return text;
    });
}

var CLEAR_WIDGETS_BLACKLIST = ["onChange", "usedWidgets"];

var Renderer = Perseus.Renderer = React.createClass({

    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(_.omit(this.props, CLEAR_WIDGETS_BLACKLIST),
                       _.omit(nextProps, CLEAR_WIDGETS_BLACKLIST))) {
            this.setState({widgets: {}});
        }
    },

    getDefaultProps: function() {
        return {
            content: "",
            ignoreMissingWidgets: false,
            shouldIndicate: false,
            // onRender may be called multiple times per render, for example
            // if there are multiple images or TeX pieces within `content`.
            // It is a good idea to debounce any functions passed here.
            onRender: function() {}
        };
    },

    getInitialState: function() {
        // TODO(alpert): Move up to parent props?
        return {
            widgets: {},
            jiptContent: null
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
            return <TeX onRender={this.props.onRender}>{tex}</TeX>;
        } else if (saved.charAt(0) === "[") {
            // Widget
            var match = Util.rWidgetParts.exec(saved);
            var id = match[1];
            var type = match[2];

            var widgetInfo = (this.props.widgets || {})[id];
            if (widgetInfo || this.props.ignoreMissingWidgets) {
                widgetIds.push(id);
                var cls = Widgets.get(type);

                return cls(_.extend({},
                    (widgetInfo || {}).options,
                    this.state.widgets[id],
                    {
                        ref: id,
                        problemNum: this.props.problemNum,
                        onChange: (newProps, cb) => {
                            var widgets = _.clone(this.state.widgets);
                            widgets[id] = _.extend({}, widgets[id], newProps);
                            this.setState({widgets: widgets}, cb);
                            this.props.onInteractWithWidget(id);
                        }
                    }
                ));
            }
        }
    },

    render: function() {
        var content = this.state.jiptContent || this.props.content;

        if (typeof KA !== "undefined" && KA.language === "en-PT" && 
                this.state.jiptContent == null &&
                this.props.content.indexOf('crwdns') !== -1) {
            // Crowdin's JIPT (Just in place translation) uses a fake language
            // with language tag "en-PT" where the value of the translations
            // look like: {crwdns2657085:0}{crwdne2657085:0} where it keeps the
            // {crowdinId:ngettext variant}. We detect whether the current
            // content matches this, so we can take over rendering of
            // the perseus content as the translators interact with jipt.
            // We search for only part of the tag that crowdin uses to guard 
            // against them changing the format on us. The full tag it looks 
            // for can be found in https://cdn.crowdin.net/jipt/jipt.js 
            // globalPhrase var.

            // If we haven't already added this component to the registry do so
            // now. showHints() may cause this component to be rerendered 
            // before jipt has a chance to replace its contents, so this check 
            // will keep us from adding the component to the registry a second 
            // time.
            if (!this.translationIndex) {
                this.translationIndex = 
                    Perseus.TranslationComponents.push(this) - 1;
            }
            // We now need to output this tag, as jipt looks for it to be
            // able to replace it with a translation that it runs an ajax 
            // call to get.  We add a data attribute with the index to the
            // Persues.TranslationComponent registry so that when jipt 
            // calls its before_dom_insert we can lookup this component by 
            // this attribute and render the text with markdown.
            return <div 
                    data-perseus-component-index={this.translationIndex}>
                {content}
            </div>;
        }
        var self = this;
        var extracted = extractMathAndWidgets(content);
        var markdown = extracted[0];
        var savedMath = extracted[1];
        var widgetIds = this.widgetIds = [];

        var oldWidgetIds = [];

        // XXX(alpert): smartypants gets called on each text node before it's
        // added to the DOM tree, so we override it to insert the math and
        // widgets.
        var smartypants = markedReact.InlineLexer.prototype.smartypants;
        markedReact.InlineLexer.prototype.smartypants = function(text) {
            var startingWidgets = _.clone(widgetIds);
            var pieces = Util.split(text, /@@(\d+)@@/g);
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

        // We want to set the paragraph function so we can keep track of which
        // widgets were added in which paragraph
        var markedOptions = {
            paragraphFn: function(text) {
                var newWidgetIds = _.difference(widgetIds, oldWidgetIds);
                newWidgetIds = _.filter(newWidgetIds, (widgetId) =>
                    Util.widgetShouldHighlight(self.props.widgets[widgetId]));
                oldWidgetIds = _.clone(widgetIds);
                var relevantUsedWidgets = _.intersection(newWidgetIds,
                                                     self.props.usedWidgets);
                return <QuestionParagraph
                    totalWidgets={newWidgetIds}
                    usedWidgets={relevantUsedWidgets}
                    shouldIndicate={self.props.shouldIndicate} >
                    {text}
                </QuestionParagraph>;
            }
        };

        try {
            return <div>{markedReact(markdown, markedOptions)}</div>;
        } catch (e) {
            // IE8 requires `catch` in order to use `finally`
            throw e;
        } finally {
            markedReact.InlineLexer.prototype.smartypants = smartypants;
        }
    },

    handleRender: function() {
        var onRender = this.props.onRender;

        // Fire callback on image load...
        $(this.getDOMNode()).find("img").on("load", onRender);

        // ...as well as right now (non-image, non-TeX or image from cache)
        onRender();
    },

    componentDidMount: function() {
        this.handleRender();
     },

    componentDidUpdate: function() {
        this.handleRender();
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
                .reduce(Util.combineScores, Util.noScore)
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
    var blocks = Util.split(text, rInteresting);

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
