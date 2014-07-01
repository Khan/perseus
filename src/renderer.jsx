/** @jsx React.DOM */

var React = require('react');
var TeX = require("./tex.jsx");
var WidgetContainer = require("./widget-container.jsx");
var Widgets = require("./widgets.js");
var QuestionParagraph = require("./question-paragraph.jsx");

var Util = require("./util.js");
var EnabledFeatures = require("./enabled-features.jsx");
var ApiOptions = require("./perseus-api.jsx").Options;

var mapObject = function(obj, lambda) {
    var result = {};
    _.each(_.keys(obj), function(key) {
        result[key] = lambda(obj[key], key);
    });
    return result;
};

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
    window.PerseusTranslationComponents = [];

    if (!KA.jipt_dom_insert_checks) {
        KA.jipt_dom_insert_checks = [];
    }

    // We add a function that will get called whenever jipt says the dom needs
    // to be updated
    KA.jipt_dom_insert_checks.push(function(text, node, attribute) {
        var index = $(node).data("perseus-component-index");
        // We only update if we had added an index onto the node's data.
        if (node && typeof index !== "undefined") {
            var component = window.PerseusTranslationComponents[index];

            if (!component) {
                // The component has disappeared, so we tell jipt not to try
                // and insert anything
                return false;
            }
            // Jipt sends down the escaped translation, so we need to
            // unescape \\t to \t among other characters here
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

var SHOULD_CLEAR_WIDGETS_PROP_LIST = [
    "content",
    "problemNum",
    "widgets"
];

// Check if one focus path / id path is a prefix of another
// The focus path null will never be a prefix of any non-null
// path, since it represents no focus.
// Otherwise, prefix is calculated by whether every array
// element in the prefix is present in the same position in the
// wholeArray path.
var isIdPathPrefix = function(prefixArray, wholeArray) {
    if (prefixArray === null || wholeArray === null) {
        return prefixArray === wholeArray;
    }
    return _.every(prefixArray, (elem, i) => {
        return _.isEqual(elem, wholeArray[i]);
    });
};

var Renderer = React.createClass({
    propTypes: {
        highlightedWidgets: React.PropTypes.array,
        enabledFeatures: EnabledFeatures.propTypes,
        apiOptions: React.PropTypes.object,
        questionCompleted: React.PropTypes.bool,
        onInteractWithWidget: React.PropTypes.func
    },

    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(_.pick(this.props, SHOULD_CLEAR_WIDGETS_PROP_LIST),
                       _.pick(nextProps, SHOULD_CLEAR_WIDGETS_PROP_LIST))) {
            this.setState(this._getInitialWidgetState(nextProps));
        }
    },

    getDefaultProps: function() {
        return {
            content: "",
            widgets: {},
            ignoreMissingWidgets: false,
            highlightedWidgets: [],
            enabledFeatures: EnabledFeatures.defaults,
            apiOptions: {},  // we'll do a deep defaults in render()
            // onRender may be called multiple times per render, for example
            // if there are multiple images or TeX pieces within `content`.
            // It is a good idea to debounce any functions passed here.
            questionCompleted: false,
            onRender: function() {},
            onInteractWithWidget: function() {}
        };
    },

    getInitialState: function() {
        return _.extend({
            jiptContent: null
        }, this._getInitialWidgetState());
    },

    _getInitialWidgetState: function(props) {
        props = props || this.props;
        var allWidgetInfo = this._getAllWidgetsInfo(props);
        return {
            widgetInfo: allWidgetInfo,
            widgetProps: this._getAllWidgetsStartProps(allWidgetInfo),
        };
    },

    _getAllWidgetsInfo: function(props) {
        props = props || this.props;
        return mapObject(props.widgets, (widgetInfo, widgetId) => {
            if (!widgetInfo.type) {
                var type = widgetId.split(" ")[0];
                widgetInfo = _.extend({}, widgetInfo, {
                    type: type
                });
            }
            return Widgets.upgradeWidgetInfoToLatestVersion(widgetInfo);
        });
    },

    _getAllWidgetsStartProps: function(allWidgetInfo) {
        return mapObject(allWidgetInfo, Widgets.getRendererPropsForWidgetInfo);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        var stateChanged = !_.isEqual(this.state, nextState);
        var propsChanged = !_.isEqual(this.props, nextProps);
        return propsChanged || stateChanged;
    },

    getPiece: function(saved, /* output */ widgetIds, apiOptions) {
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
            var implied_type = match[2];

            var widgetInfo = this.state.widgetInfo[id];
            if (widgetInfo || this.props.ignoreMissingWidgets) {
                // TODO(jack): Remove this input/output parameter
                widgetIds.push(id);

                var type = (widgetInfo || {}).type || implied_type;
                var cls = Widgets.getWidget(type, this.props.enabledFeatures);
                var widgetProps = this.state.widgetProps[id] || {};
                var shouldHighlight = _.contains(
                    this.props.highlightedWidgets,
                    id
                );

                return <WidgetContainer
                    enableHighlight={this.props.enabledFeatures.highlight}
                    shouldHighlight={shouldHighlight}>
                    {cls(_.extend({}, widgetProps, {
                            ref: id,
                            widgetId: id,
                            problemNum: this.props.problemNum,
                            enabledFeatures: this.props.enabledFeatures,
                            apiOptions: apiOptions,
                            questionCompleted: this.props.questionCompleted,
                            onFocus: _.partial(this._onWidgetFocus, id),
                            onBlur: _.partial(this._onWidgetBlur, id),
                            onChange: (newProps, cb) => {
                                this._setWidgetProps(id, newProps, cb);
                            }
                        })
                    )}
                </WidgetContainer>;
            }
        }
    },

    _onWidgetFocus: function(id, focusPath, element) {
        if (focusPath === undefined && element === undefined) {
            focusPath = [];
            element = this.refs[id].getDOMNode();
        } else {
            if (!_.isArray(focusPath)) {
                throw new Error(
                    "widget props.onFocus focusPath must be an Array, " +
                    "but was" + JSON.stringify(focusPath)
                );
            }
            if (element == null) {
                throw new Error(
                    "widget props.onFocus element was " +
                    element
                );
            }
        }
        this._setCurrentFocus([id].concat(focusPath), element);
    },

    _onWidgetBlur: function(id) {
        var blurringFocus = this._currentFocus;
        // Wait until after any new focus events fire this tick before
        // declaring that nothing is focused.
        // If a different widget was focused, we'll see an onBlur event
        // now, but then an onFocus event on a different element before
        // this callback is executed
        _.defer(() => {
            if (_.isEqual(this._currentFocus.path, blurringFocus.path)) {
                this._setCurrentFocus(null, null);
            }
        });
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
                    window.PerseusTranslationComponents.push(this) - 1;
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
        var extracted = Renderer.extractMathAndWidgets(content);
        var markdown = extracted[0];
        var savedMath = extracted[1];
        var widgetIds = this.widgetIds = [];

        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions
        );

        var oldWidgetIds = [];

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
                    pieces[i] = self.getPiece(
                        savedMath[pieces[i]],
                        widgetIds,
                        apiOptions
                    );
                }
            }
            return pieces;
        };

        var wrap = function(text) {
            return <QuestionParagraph>
                {text}
            </QuestionParagraph>;
        };

        var tok = markedReact.Parser.prototype.tok;
        var tokLevelCount = 0;
        markedReact.Parser.prototype.tok = function() {
            tokLevelCount++;
            var result;
            var text = tok.call(this);
            if (tokLevelCount === 1 && (!_.isArray(text) || text.length)) {
                result = wrap(text);
            } else {
                result = text;
            }
            tokLevelCount--;
            return result;
        };

        try {
            return <div>{markedReact(markdown)}</div>;
        } finally {
            markedReact.InlineLexer.prototype.smartypants = smartypants;
            markedReact.Parser.prototype.tok = tok;
        }
    },

    handleRender: function() {
        var onRender = this.props.onRender;

        var $images = $(this.getDOMNode()).find("img");
        var imageAttrs = this.props.images || {};

        // TODO(jack): Weave this into the rendering in markedReact by passing
        // a function for how to render images, which reads this data
        // (probably part of a larger marked refactor to take all rendering
        // methods via parameters)
        _.map(_.toArray($images), (image, i) => {
            var $image = $(image);
            var src = $image.attr('src');
            var attrs = imageAttrs[src];
            if (attrs) {
                $image.attr(attrs);
            }
        });

        // Fire callback on image load...
        // TODO (jack): make this call happen exactly once through promises!
        $images.on("load", onRender);

        // ...as well as right now (non-image, non-TeX or image from cache)
        onRender();
    },

    componentDidMount: function() {
        this.handleRender();
        this._currentFocus = {
            path: null,
            element: null
        };
    },

    componentDidUpdate: function() {
        this.handleRender();
    },

    componentWillUnmount: function() {
        if (this.translationIndex != null) {
            window.PerseusTranslationComponents[this.translationIndex] = null;
        }
    },

    // Sets the current focus path and element
    // If the new focus path is not a prefix of the old focus path,
    // we send an onChangeFocus event back to our parent.
    _setCurrentFocus: function(path, element) {
        // We don't do this when the new path is a prefix because
        // that prefix is already focused (we're just in a more specific
        // area of it). This makes it safe to call _setCurrentFocus
        // whenever a widget is interacted with--we won't wipe out
        // our focus state if we are already focused on a subpart
        // of that widget (i.e. a transformation NumberInput inside
        // of a transformer widget).
        if (!isIdPathPrefix(path, this._currentFocus.path)) {
            var prevFocus = this._currentFocus;
            this._currentFocus = {
                path: path,
                element: element
            };
            if (this.props.apiOptions.onFocusChange != null) {
                this.props.apiOptions.onFocusChange(
                    this._currentFocus,
                    prevFocus
                );
            }
        }
    },

    focus: function() {
        var id;
        var focusResult;
        for (var i = 0; i < this.widgetIds.length; i++) {
            var widgetId = this.widgetIds[i];
            var widget = this.refs[widgetId];
            var widgetFocusResult = widget.focus && widget.focus();
            if (widgetFocusResult) {
                id = widgetId;
                focusResult = widgetFocusResult;
                break;
            }
        }

        if (id) {
            // reconstruct a {path, element} focus object
            var path;
            var element;
            if (_.isObject(focusResult)) {
                // The result of focus was a {path, id} object itself
                path = [id].concat(focusResult.path || []);
                element = focusResult.element || this.refs[id].getDOMNode();
            } else {
                // The result of focus was true or the like; just
                // construct a root focus object
                path = [id];
                element = this.refs[id].getDOMNode();
            }

            this._setCurrentFocus(path, element);
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

    emptyWidgets: function () {
        return _.filter(this.widgetIds, (id) => {
            var widgetProps = this.props.widgets[id];
            var score = this.refs[id].simpleValidate(
                widgetProps.options,
                null
            );
            return Util.scoreIsEmpty(score);
        });
    },

    _setWidgetProps: function(id, newProps, cb) {
        var widgetProps = _.clone(this.state.widgetProps);
        widgetProps[id] = _.extend({}, widgetProps[id], newProps);
        this.setState({widgetProps: widgetProps}, () => {
            var cbResult = cb && cb();
            this.props.onInteractWithWidget(id);
            if (cbResult !== false) {
                this._setCurrentFocus([id], this.refs[id].getDOMNode());
            }
        });
    },

    setInputValue: function(inputWidgetId, newValue, focus) {
        // TODO(jack): change this to value: when we change input-number/
        // expression's prop to be value
        this._setWidgetProps(inputWidgetId, {
            currentValue: String(newValue)
        }, () => focus);
    },

    guessAndScore: function() {
        var widgetProps = this.props.widgets;
        var onInputError = this.props.apiOptions.onInputError ||
                function() { };

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
                    return widget.simpleValidate(props.options, onInputError);
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
    },

    statics: {
        extractMathAndWidgets: extractMathAndWidgets
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

module.exports = Renderer;
