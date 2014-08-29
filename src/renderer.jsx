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
            inline: false,
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
            widgetProps: this._getAllWidgetsStartProps(allWidgetInfo, props),
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

    _getAllWidgetsStartProps: function(allWidgetInfo, props) {
        return mapObject(allWidgetInfo, (editorProps) => {
            return Widgets.getRendererPropsForWidgetInfo(
                editorProps,
                props.problemNum
            );
        });
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        var stateChanged = !_.isEqual(this.state, nextState);
        var propsChanged = !_.isEqual(this.props, nextProps);
        return propsChanged || stateChanged;
    },

    getPiece: function(saved, /* output */ widgetIds) {
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

                // We don't want to render a duplicate widget key/ref,
                // as this causes problems with react (for obvious reasons).
                // Instead we just notify the hopefully-content-creator that
                // they need to change the widget id.
                var duplicate = _.contains(widgetIds, id);
                if (duplicate) {
                    return <span className="renderer-widget-error">
                        Widget [[{'\u2603'} {id}]] already exists.
                    </span>;
                }

                // TODO(jack): Remove this input/output parameter
                widgetIds.push(id);

                var type = (widgetInfo || {}).type || implied_type;
                var cls = Widgets.getWidget(type, this.props.enabledFeatures);
                var shouldHighlight = _.contains(
                    this.props.highlightedWidgets,
                    id
                );

                return <WidgetContainer
                        ref={"container:" + id}
                        key={"container:" + id}
                        type={cls}
                        initialProps={this.getWidgetProps(id)}
                        shouldHighlight={shouldHighlight} />;
            }
        }
    },

    getApiOptions: function(props) {
        return _.extend(
            {},
            ApiOptions.defaults,
            props.apiOptions
        );
    },

    getWidgetProps: function(id) {
        var widgetProps = this.state.widgetProps[id] || {};
        return _.extend({}, widgetProps, {
            ref: id,
            widgetId: id,
            problemNum: this.props.problemNum,
            enabledFeatures: this.props.enabledFeatures,
            apiOptions: this.getApiOptions(this.props),
            questionCompleted: this.props.questionCompleted,
            onFocus: _.partial(this._onWidgetFocus, id),
            onBlur: _.partial(this._onWidgetBlur, id),
            interWidgets: this.interWidgets,
            onChange: (newProps, cb) => {
                this._setWidgetProps(id, newProps, cb);
            }
        });
    },

    /**
     * Allows inter-widget communication.
     *
     * Each widget can access this function using `this.props.interWidgets`
     * Takes a `filterCriterion` on which widgets to return.
     * `filterCriterion` can be one of:
     *  * A string widget id
     *  * A string widget type
     *  * a function from (id, widgetInfo, widgetComponent) to true or false
     *
     * Returns an array of the matching widget components.
     *
     * If you need to do logic with more than the components, it is possible
     * to do such logic inside the filter, rather than on the result array.
     *
     * See the passage-ref widget for an example.
     *
     * "Remember: abilities are not inherently good or evil, it's how you use
     * them." ~ Kyle Katarn
     * Please use this one with caution.
     */
    interWidgets: function(filterCriterion) {
        var filterFunc;
        // Convenience filters:
        // "interactive-graph 3" will give you [[interactive-graph 3]]
        // "interactive-graph" will give you all interactive-graphs
        if (typeof filterCriterion === "string") {
            if (filterCriterion.indexOf(' ') !== -1) {
                var widgetId = filterCriterion;
                filterFunc = (id, widgetInfo) => id === widgetId;
            } else {
                var widgetType = filterCriterion;
                filterFunc = (id, widgetInfo) => {
                    return widgetInfo.type === widgetType;
                };
            }
        } else {
            filterFunc = filterCriterion;
        }

        return this.widgetIds.filter((id) => {
            var widgetInfo = this.state.widgetInfo[id];
            var widget = this.getWidgetInstance(id);
            return filterFunc(id, widgetInfo, widget);
        }).map(this.getWidgetInstance);
    },

    getWidgetInstance: function(id) {
        return this.refs["container:" + id].getWidget();
    },

    _onWidgetFocus: function(id, focusPath) {
        if (focusPath === undefined) {
            focusPath = [];
        } else {
            if (!_.isArray(focusPath)) {
                throw new Error(
                    "widget props.onFocus focusPath must be an Array, " +
                    "but was" + JSON.stringify(focusPath)
                );
            }
        }
        this._setCurrentFocus([id].concat(focusPath));
    },

    _onWidgetBlur: function(id, blurPath) {
        var blurringFocusPath = this._currentFocus;

        // Failsafe: abort if ID is different, because focus probably happened
        // before blur
        var fullPath = [id].concat(blurPath);
        if (!_.isEqual(fullPath, blurringFocusPath)) {
            return;
        }

        // Wait until after any new focus events fire this tick before
        // declaring that nothing is focused.
        // If a different widget was focused, we'll see an onBlur event
        // now, but then an onFocus event on a different element before
        // this callback is executed
        _.defer(() => {
            if (_.isEqual(this._currentFocus, blurringFocusPath)) {
                this._setCurrentFocus(null);
            }
        });
    },

    componentWillUpdate: function(nextProps, nextState) {
        var oldJipt = this.shouldRenderJiptPlaceholder(this.props, this.state);
        var newJipt = this.shouldRenderJiptPlaceholder(nextProps, nextState);
        var oldContent = this.getContent(this.props, this.state);
        var newContent = this.getContent(nextProps, nextState);

        this.reuseMarkdown = !oldJipt && !newJipt && oldContent === newContent;
    },

    componentDidUpdate: function(prevProps, prevState) {
        this.handleRender(prevProps);
        if (this.reuseMarkdown) {
            this.widgetIds.forEach(function(id) {
                var container = this.refs["container:" + id];
                container.replaceWidgetProps(
                    this.getWidgetProps(id)
                );
            }, this);
        }
    },

    getContent: function(props, state) {
        return state.jiptContent || props.content;
    },

    shouldRenderJiptPlaceholder: function(props, state) {
        return typeof KA !== "undefined" && KA.language === "en-PT" &&
                    state.jiptContent == null &&
                    props.content.indexOf('crwdns') !== -1;
    },

    render: function() {
        if (this.reuseMarkdown) {
            return this.lastRenderedMarkdown;
        }

        var self = this;
        var content = this.getContent(this.props, this.state);
        var widgetIds = this.widgetIds = [];

        if (this.shouldRenderJiptPlaceholder(this.props, this.state)) {
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
        var extracted = Renderer.extractMathAndWidgets(content);
        var markdown = extracted[0];
        var savedMath = extracted[1];

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
                        widgetIds
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
        var outerParagraphCount = 0;
        markedReact.Parser.prototype.tok = function() {
            tokLevelCount++;
            outerParagraphCount++;
            var text = tok.call(this);

            // We want to wrap all base-level elements in a div.paragraph
            // This is so things like tables or other non-paragraphs get the
            // appropriate margins. Super hacky.
            var hasChildren = text && (!_.isArray(text) || text.length);
            var isOuter = tokLevelCount === 1 && hasChildren;

            // We also only do this if we're not an inline widget, or we
            // are inline but not on the first paragraph of the inline-ness
            var isFirst = outerParagraphCount === 1;

            var result;
            if (isOuter && (!self.props.inline || !isFirst)) {
                result = wrap(text);
            } else {
                result = text;
            }
            tokLevelCount--;
            return result;
        };

        var markedOptions = {
            sanitize: true,
            paragraphFn: (this.props.inline ?
                (text) => <span>{text}</span> :
                (text) => <div>{text}</div>
            )
        };

        try {
            var markdownContents = markedReact(markdown, markedOptions);
            this.lastRenderedMarkdown = this.props.inline ?
                <span>{markdownContents}</span> :
                <div>{markdownContents}</div>;
            return this.lastRenderedMarkdown;
        } finally {
            markedReact.InlineLexer.prototype.smartypants = smartypants;
            markedReact.Parser.prototype.tok = tok;
        }
    },

    handleRender: function(prevProps) {
        var onRender = this.props.onRender;
        var oldOnRender = prevProps.onRender;

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
        if (oldOnRender) {
            $images.off("load", oldOnRender);
        }
        $images.on("load", onRender);

        // ...as well as right now (non-image, non-TeX or image from cache)
        onRender();
    },

    componentDidMount: function() {
        this.handleRender({});
        this._currentFocus = null;
    },

    componentWillUnmount: function() {
        if (this.translationIndex != null) {
            window.PerseusTranslationComponents[this.translationIndex] = null;
        }
    },

    // Sets the current focus path
    // If the new focus path is not a prefix of the old focus path,
    // we send an onChangeFocus event back to our parent.
    _setCurrentFocus: function(path) {
        // We don't do this when the new path is a prefix because
        // that prefix is already focused (we're just in a more specific
        // area of it). This makes it safe to call _setCurrentFocus
        // whenever a widget is interacted with--we won't wipe out
        // our focus state if we are already focused on a subpart
        // of that widget (i.e. a transformation NumberInput inside
        // of a transformer widget).
        if (!isIdPathPrefix(path, this._currentFocus)) {
            var prevFocus = this._currentFocus;

            if (prevFocus) {
                this.blurPath(prevFocus);
            }

            this._currentFocus = path;
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
            var widget = this.getWidgetInstance(widgetId);
            var widgetFocusResult = widget && widget.focus && widget.focus();
            if (widgetFocusResult) {
                id = widgetId;
                focusResult = widgetFocusResult;
                break;
            }
        }

        if (id) {
            // reconstruct a {path, element} focus object
            var path;
            if (_.isObject(focusResult)) {
                // The result of focus was a {path, id} object itself
                path = [id].concat(focusResult.path || []);
            } else {
                // The result of focus was true or the like; just
                // construct a root focus object
                path = [id];
            }

            this._setCurrentFocus(path);
            return true;
        }
    },

    getDOMNodeForPath: function(path) {
        var widgetId = _.first(path);
        var interWidgetPath = _.rest(path);

        // Widget handles parsing of the interWidgetPath. If the path is empty
        // beyond the widgetID, as a special case we just return the widget's
        // DOM node.
        var widget = this.getWidgetInstance(widgetId);
        var getNode = widget.getDOMNodeForPath;
        if (getNode) {
            return getNode(interWidgetPath);
        } else if (interWidgetPath.length === 0) {
            return widget.getDOMNode();
        }
    },

    getAcceptableFormatsForInputPath: function(path) {
        var widgetId = _.first(path);
        var interWidgetPath = _.rest(path);

        // Widget handles parsing of the interWidgetPath.
        var widget = this.getWidgetInstance(widgetId);
        return widget.getAcceptableFormatsForInputPath(
            interWidgetPath);
    },

    getInputPaths: function() {
        var inputPaths = [];
        _.each(this.widgetIds, (widgetId) => {
            var widget = this.getWidgetInstance(widgetId);
            if (widget.getInputPaths) {
                // Grab all input paths and add widgetID to the front
                var widgetInputPaths = widget.getInputPaths();
                if (widgetInputPaths === widget) {
                    // Special case: we allow you to just return the widget
                    inputPaths.push([
                        widgetId
                    ]);
                } else {
                    // Prefix paths with their widgetID and add to collective
                    // list of paths.
                    _.each(widgetInputPaths, (inputPath) => {
                        var relativeInputPath = [widgetId].concat(inputPath);
                        inputPaths.push(relativeInputPath);
                    });
                }
            }
        });

        return inputPaths;
    },

    focusPath: function(path) {
        // No need to focus if it's already focused
        if (_.isEqual(this._currentFocus, path)) {
            return;
        } else if (this._currentFocus) {
            // Unfocus old path, if exists
            this.blurPath(this._currentFocus);
        }

        var widgetId = _.first(path);
        var interWidgetPath = _.rest(path);

        // Widget handles parsing of the interWidgetPath
        var focusWidget = this.getWidgetInstance(widgetId).focus;
        focusWidget && focusWidget(interWidgetPath);
    },

    blurPath: function(path) {
        // No need to blur if it's not focused
        if (!_.isEqual(this._currentFocus, path)) {
            return;
        }

        var widgetId = _.first(path);
        var interWidgetPath = _.rest(path);
        // Widget handles parsing of the interWidgetPath
        var blurWidget = this.getWidgetInstance(widgetId).blur;
        blurWidget && blurWidget(interWidgetPath);
    },

    blur: function() {
        if (this._currentFocus) {
            this.blurPath(this._currentFocus);
        }
    },

    getSaveWarnings: function() {
        return _(this.props.widgets)
            .chain()
            .map((props, id) => {
                var widget = this.getWidgetInstance(id);
                var issuesFunc = widget.getSaveWarnings;
                return issuesFunc ? issuesFunc() : [];
            })
            .flatten(true)
            .value();
    },

    serialize: function() {
        var state = {};
        _.each(this.props.widgets, function(props, id) {
            var widget = this.getWidgetInstance(id);
            var s = widget.serialize();
            if (!_.isEmpty(s)) {
                state[id] = s;
            }
        }, this);
        return state;
    },

    emptyWidgets: function () {
        return _.filter(this.widgetIds, (id) => {
            var widgetProps = this.props.widgets[id];
            var score = this.getWidgetInstance(id).simpleValidate(
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
                // TODO(jack): For some reason, some widgets don't always end
                // up in refs here, which is repro-able if you make an
                // [[ orderer 1 ]] and copy-paste this, then change it to be
                // an [[ orderer 2 ]]. The resulting Renderer ends up with
                // an "orderer 2" ref but not an "orderer 1" ref. @_@??
                // TODO(jack): Figure out why this is happening and fix it
                // As far as I can tell, this is only an issue in the
                // editor-page, so doing this shouldn't break clients hopefully
                this._setCurrentFocus([id]);
            }
        });
    },

    setInputValue: function(path, newValue, focus) {
        var widgetId = _.first(path);
        var interWidgetPath = _.rest(path);
        var widget = this.getWidgetInstance(widgetId);

        // Widget handles parsing of the interWidgetPath.
        widget.setInputValue(interWidgetPath, newValue, focus);
    },

    guessAndScore: function() {
        var widgetProps = this.props.widgets;
        var onInputError = this.props.apiOptions.onInputError ||
                function() { };

        var totalGuess = _.map(this.widgetIds, function(id) {
            return this.getWidgetInstance(id).getUserInput();
        }, this);

        var totalScore = _.chain(this.widgetIds)
                .filter(function(id) {
                    var props = widgetProps[id];
                    // props.graded is unset or true
                    return props.graded == null || props.graded;
                })
                .map(function(id) {
                    var props = widgetProps[id];
                    var widget = this.getWidgetInstance(id);
                    return widget.simpleValidate(props.options, onInputError);
                }, this)
                .reduce(Util.combineScores, Util.noScore)
                .value();

        return [totalGuess, totalScore];
    },

    examples: function() {
        var widgets = this.widgetIds;
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
