/** @jsx React.DOM */
(function(Perseus) {

require("./core.js");
var Util = require("./util.js");

var TeX = require("./tex.jsx");
var Widgets = require("./widgets.js");


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
 
// When using crowdin's jipt (Just in place translation), we need to keep a
// registry of crowdinId's to component so that we can update the component's
// state as the translator enters their translation.
Perseus.TranslationComponents = {};

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
            ignoreMissingWidgets: false,
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
            jiptContent: "",
            crowdinId: null,
            contentHasJiptTags: false
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

                return cls(_.extend({
                    ref: id,
                    onChange: function(newProps, cb) {
                        var widgets = _.clone(this.state.widgets);
                        widgets[id] = _.extend({}, widgets[id], newProps);
                        this.setState({widgets: widgets}, cb);
                    }.bind(this)
                }, (widgetInfo || {}).options, this.state.widgets[id],
                _.pick(this.props, "problemNum")));
            }
        }
    },

    render: function() {
        if (typeof(KA) != "undefined" && !this.crowdinId && 
                KA.language === "en-PT") {
            // Crowdin's JIPT (Just in place translation) uses a fake language
            // with language tag "en-PT" where the value of the translations
            // look like: {crwdns2657085:0}{crwdne2657085:0} where it keeps the
            // {crowdinId:ngettext variant}. We detect whether the current
            // content matches this, so we can take over rendering of
            // the perseus content as the translators interact with jipt.
            content = this.props.content;
            // this is the same re with the same name stolen from
            // https://cdn.crowdin.net/jipt/jipt.js
            var globalPhrase = /{crwdns(\d+):(\d)}([\s\S]*?){crwdne\1:\2}/g;
            var match = globalPhrase.exec(content);
            if (match) {
                // We have found a translation that looks like a crowdin tag,
                // so we cache the crowdinId
                this.crowdinId = match[1];
                // We now need to output this tag, as jipt looks for it to be
                // able to replace it with a translation that it runs an ajax 
                // call to get.  We add a data attribute with the crowdinId
                // to the div so thatwhen crowdin replaces the div contents 
                // with a translation, we can lookup this component by 
                // crowdinId in a registry we create and render it with 
                // markdown.
                return <div data-crowdin-id={this.crowdinId}>
                    {this.props.content}
                </div>;
            }
        }
        var content = this.state.jiptContent || this.props.content;
        var self = this;
        var extracted = extractMathAndWidgets(content);
        var markdown = extracted[0];
        var savedMath = extracted[1];
        var widgetIds = this.widgetIds = [];

        // XXX(alpert): smartypants gets called on each text node before it's
        // added to the DOM tree, so we override it to insert the math and
        // widgets.
        var smartypants = markedReact.InlineLexer.prototype.smartypants;
        markedReact.InlineLexer.prototype.smartypants = function(text) {
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

        try {
            if (this.crowdinId) {
                // If we are using jipt (Crowdin's just in place translation,
                // we need to be sure to add the crowdinId attribute to the div
                // so that we can look up the component in our registry as the
                // translators update that div.
                return <div data-crowdin-id={this.crowdinId}>
                    {markedReact(markdown)}
                </div>;
            }
            return <div>{markedReact(markdown)}</div>;
        } catch (e) {
            // IE8 requires `catch` in order to use `finally`
            throw e;
        } finally {
            markedReact.InlineLexer.prototype.smartypants = smartypants;
        }
    },

    handleRender: function() {
        if (this.crowdinId) {
            // When using Crowdin's jipt (Just in place translation), we need
            // to keep this registry of components that will need to be
            // updated as translators enter in new translations.  Furthermore 
            // we need to track the compoenents children dom, as jipt changes 
            // the contents of the div and we need to change it back before 
            // updating to avoid Invariant violations.
            // TODO(james): remove previousChildren once crowdin implements 
            // its beforeUpdate handler which should hopefully allow us to 
            // cancel its' writing to the DOM and let us have React do it 
            // instead.
            Perseus.TranslationComponents[this.crowdinId] = {
                component: this,
                previousChildren: $(this.getDOMNode()).children()
            };
        }

        var onRender = this.props.onRender;

        // Fire callback on image load...
        $(this.getDOMNode()).find("img").on("load", onRender);

        // ...as well as right now (non-image, non-TeX or image from cache)
        onRender();
    },

    componentDidMount: function() {
        this.handleRender();

        if (this.crowdinId) {
            // TODO(james): Once crowdin implements passing in a beforeUpdate
            // handler we should be able to do that instead.  Until then we 
            // set up this mutation observer on the DOMNode, where we capture 
            // the value of the new translation only after jipt already 
            // replaces the contents of the DOM node with the new translation.
            var MutationObserverObject = window.MutationObserver ||
                    window.WebKitMutationObserver ||
                    window.MozMutationObserver;
            if (!MutationObserverObject) {
                return;
            }
            var observer = new MutationObserverObject(function (records) { 
                records.forEach(function (record) {
                    var crowdinId;
                    var newTranslation;
                    var targetElement;
                    if (record.target &&
                        record.target.parentElement &&
                        record.type === "characterData" &&
                        record.target.parentElement.dataset["crowdinId"]) {
                           // The first time there is just a text element 
                           // with the crowdin tag. So the mutation event 
                           // is just on the text node itself and we need
                           // to get the parent
                            crowdinId = record.target.parentElement
                                .dataset["crowdinId"];
                            newTranslation = record.target.nodeValue;
                    } else if (
                        record.target &&
                        record.target.dataset &&
                        record.target.dataset["crowdinId"] &&
                        !record.target.children.length) {
                            // Following changes it will be an update to 
                            // the childList of the components' DOMNode
                            // and the target will be the node itself
                            crowdinId = record.target.dataset["crowdinId"];
                            newTranslation = record.target.textContent;
                    } else {
                        // When react updates the div, the target will have 
                        // children, we return here to avoid an infinite loop 
                        // of updating the DOM.
                        return;
                    }
                    var translationData = 
                        Perseus.TranslationComponents[crowdinId];
                    if (!translationData) {
                        // If we ever get data-crowdin-id on other non-perseus
                        // elements then they won't be in our 
                        // Perseus.TranslationComponents registry and we can 
                        // safely ignore them.
                        return;
                    }

                    // Crowdin jipt sets the new content of the div without 
                    // unescaping \\t to \t among other charachters, so we 
                    // need to do it here.
                    unescapedTranslation = newTranslation.replace(
                        rEscapedChars,
                        function(ch) {
                            return specialChars[ch];
                        });

                    // Revert the children dom of the component to what it was
                    // beforehand so that we don't get an Invariant 
                    // error stating that a div React created 
                    // disappeared.
                    $(translationData.component.getDOMNode())
                        .empty()
                        .append(translationData.previousChildren)
                        .promise().done(function() {
                            // Once the html is reverted to what React
                            // expects we can tell React the new
                            // translation, and that the crowdin jipt 
                            // tags have been replaced, so that it may 
                            // render the new content's markdown.
                            translationData.component.setState({
                                jiptContent: unescapedTranslation
                            });
                        });
                });
            });

            observer.observe(this.getDOMNode(), {
                childList: true,
                characterData: true,
                subtree: true
            });
        }
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
