var React = require('react');
var _ = require("underscore");

var PerseusMarkdown = require("./perseus-markdown.jsx");
var QuestionParagraph = require("./question-paragraph.jsx");
var SvgImage = require("./components/svg-image.jsx");
var TeX = require("react-components/tex.jsx");
var WidgetContainer = require("./widget-container.jsx");
var Widgets = require("./widgets.js");

var Util = require("./util.js");
var EnabledFeatures = require("./enabled-features.jsx");
var ApiOptions = require("./perseus-api.jsx").Options;
var ApiClassNames = require("./perseus-api.jsx").ClassNames;

var {mapObject, mapObjectFromArray} = require("./interactive2/objective_.js");

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
var rContainsNonWhitespace = /\S/;

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
        onInteractWithWidget: React.PropTypes.func,
        interWidgets: React.PropTypes.func,
        alwaysUpdate: React.PropTypes.bool,
        reviewMode: React.PropTypes.bool,
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
            images: {},
            // TODO(aria): Remove this now that it is true everywhere
            // (here and in perseus-i18n)
            ignoreMissingWidgets: true,
            highlightedWidgets: [],
            enabledFeatures: EnabledFeatures.defaults,
            apiOptions: {},  // we'll do a deep defaults in render()
            // onRender may be called multiple times per render, for example
            // if there are multiple images or TeX pieces within `content`.
            // It is a good idea to debounce any functions passed here.
            questionCompleted: false,
            onRender: function() {},
            onInteractWithWidget: function() {},
            interWidgets: () => null,
            alwaysUpdate: false,
            reviewMode: false,
        };
    },

    getInitialState: function() {
        return _.extend(
            {jiptContent: null},
            this._getInitialWidgetState());
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
        if (this.props.alwaysUpdate) {
            // TOTAL hacks so that interWidgets doesn't break
            // when one widget updates without the other.
            // See passage-refs inside radios, which was why
            // this was introduced.
            // I'm sorry!
            // TODO(aria): cry
            return true;
        }
        var stateChanged = !_.isEqual(this.state, nextState);
        var propsChanged = !_.isEqual(this.props, nextProps);
        return propsChanged || stateChanged;
    },

    _getDefaultWidgetInfo: function(widgetId) {
        var widgetIdParts = Util.rTypeFromWidgetId.exec(widgetId);
        if (widgetIdParts == null) {
            return {};
        }
        return {
            type: widgetIdParts[1],
            graded: true,
            options: {}
        };
    },

    _getWidgetInfo: function(widgetId) {
        return this.state.widgetInfo[widgetId] ||
            this._getDefaultWidgetInfo(widgetId);
    },

    renderWidget: function(impliedType, id) {
        var widgetInfo = this.state.widgetInfo[id];
        if (widgetInfo || this.props.ignoreMissingWidgets) {

            var type = (widgetInfo && widgetInfo.type) || impliedType;
            var cls = Widgets.getWidget(type, this.props.enabledFeatures);
            var shouldHighlight = _.contains(
                this.props.highlightedWidgets,
                id
            );

            // By this point we should have no duplicates, which are
            // filtered out in this.render(), so we shouldn't have to
            // worry about using this widget key and ref:
            return <WidgetContainer
                    ref={"container:" + id}
                    key={"container:" + id}
                    type={cls}
                    initialProps={this.getWidgetProps(id)}
                    shouldHighlight={shouldHighlight} />;
        } else {
            return null;
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

        // The widget needs access to its "rubric" at all times when in review
        // mode (which is really just part of its widget info).
        var reviewModeRubric = null;
        if (this.props.reviewMode && this.state.widgetInfo[id]) {
            reviewModeRubric = this.state.widgetInfo[id].options;
        }

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
            reviewModeRubric: reviewModeRubric,
            onChange: (newProps, cb) => {
                this._setWidgetProps(id, newProps, cb);
            }
        });
    },

    /**
    * Serializes the questions state so it can be recovered.
    *
    * The return value of this function can be sent to the
    * `restoreSerializedState` method to restore this state.
    */
    getSerializedState: function() {
        return mapObject(this.state.widgetProps, (props, widgetId) => {
            var widget = this.getWidgetInstance(widgetId);
            if (widget && widget.getSerializedState) {
                return widget.getSerializedState();
            } else {
                return props;
            }
        });
    },

    restoreSerializedState: function(serializedState, callback) {
        // We want to wait until any children widgets who have a
        // restoreSerializedState function also call their own callbacks before
        // we declare that the operation is finished.
        var numCallbacks = 1;
        var fireCallback = () => {
            --numCallbacks;
            if (callback && numCallbacks === 0) {
                callback();
            }
        };

        this.setState({
            widgetProps: mapObject(serializedState, (props, widgetId) => {
                var widget = this.getWidgetInstance(widgetId);
                if (widget && widget.restoreSerializedState) {
                    // Note that we probably can't call
                    // `this.change()/this.props.onChange()` in this
                    // function, so we take the return value and use
                    // that as props if necessary so that
                    // `restoreSerializedState` in a widget can
                    // change the props as well as state.
                    // If a widget has no props to change, it can
                    // safely return null.
                    ++numCallbacks;
                    var restoreResult =
                        widget.restoreSerializedState(props, fireCallback);
                    return _.extend(
                        {},
                        this.state.widgetProps[widgetId],
                        restoreResult
                    );
                } else {
                    return props;
                }
            })
        }, fireCallback);
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

        var results = this.widgetIds.filter((id) => {
            var widgetInfo = this._getWidgetInfo(id);
            var widget = this.getWidgetInstance(id);
            return filterFunc(id, widgetInfo, widget);
        }).map(this.getWidgetInstance);

        // We allow the parent of our renderer to intercept our
        // interwidgets call.
        var propsInterWidgetResult = this.props.interWidgets(
            filterCriterion,
            results // allow our parent to inspect the local
                    // interwidget results before acting
        );

        if (propsInterWidgetResult) {
            return propsInterWidgetResult;
        } else {
            return results;
        }
    },

    getWidgetInstance: function(id) {
        var ref = this.refs["container:" + id];
        if (!ref) {
            return null;
        }
        return ref.getWidget();
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
        var oldHighlightedWidgets = this.props.highlightedWidgets;
        var newHighlightedWidgets = nextProps.highlightedWidgets;

        this.reuseMarkdown = !oldJipt && !newJipt &&
            oldContent === newContent &&
            // yes, this is identity array comparison, but these are passed
            // in from state in the item-renderer, so they should be
            // identity equal unless something changed, and it's expensive
            // to loop through them to look for differences.
            // Technically, we could reuse the markdown when this changes, but
            // to do that we'd have to do more expensive checking of whether
            // a widget should be highlighted in the common case where
            // this array hasn't changed, so we just redo the whole
            // render if this changed
            oldHighlightedWidgets === newHighlightedWidgets;
    },

    componentDidUpdate: function(prevProps, prevState) {
        this.handleRender(prevProps);
        // We even do this if we did reuse the markdown because
        // we might need to update the widget props on this render,
        // even though we have the same widgets.
        // WidgetContainers don't update their widgets props when
        // they are re-rendered, so even if they've been
        // re-rendered we need to call these methods on them.
        _.each(this.widgetIds, (id) => {
            var container = this.refs["container:" + id];
            container.replaceWidgetProps(
                this.getWidgetProps(id)
            );
        });
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

        var content = this.getContent(this.props, this.state);
        // `this.widgetIds` is appended to in `this.outputMarkdown`:
        this.widgetIds = [];

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

        // Hacks:
        // We use mutable state here to figure out whether the output
        // had two columns.
        // It is updated to true by `this.outputMarkdown` if a
        // column break is found
        // TODO(aria): Add a state variable to simple-markdown's output
        // functions so that we can do this in a less hacky way.
        this._isTwoColumn = false;

        var parsedMardown = PerseusMarkdown.parse(content);
        var markdownContents = this.outputMarkdown(parsedMardown);

        var className = this._isTwoColumn ?
            ApiClassNames.RENDERER + " " + ApiClassNames.TWO_COLUMN_RENDERER :
            ApiClassNames.RENDERER;

        this.lastRenderedMarkdown = <div className={className}>
            {markdownContents}
        </div>;
        return this.lastRenderedMarkdown;
    },

    // wrap top-level elements in a QuestionParagraph, mostly
    // for appropriate spacing and other css
    outputMarkdown: function(ast) {
        if (_.isArray(ast)) {
            return _.map(ast, (node) => this.outputMarkdown(node));
        } else {
            // !!! WARNING: Mutative hacks! mutates `this._foundTextNodes`:
            // because i wrote a bad interface to simple-markdown.js' `output`
            this._foundTextNodes = false;
            var output = this.outputNested(ast);
            var className = this._foundTextNodes ?
                "" :
                "perseus-paragraph-centered";

            return <QuestionParagraph className={className}>
                {output}
            </QuestionParagraph>;
        }
    },

    // output non-top-level nodes or arrays
    outputNested: function(ast) {
        if (_.isArray(ast)) {
            return _.map(ast, this.outputNested);
        } else {
            return this.outputNode(ast, this.outputNested);
        }
    },

    // output individual AST nodes [not arrays]
    outputNode: function(node, nestedOutput) {
        if (node.type === "widget") {
            // Widgets can contain text nodes, so we don't center them with
            // markdown magic here.
            // Instead, we center them with css magic in articles.less
            // /cry(aria)
            this._foundTextNodes = true;

            if (_.contains(this.widgetIds, node.id)) {
                // We don't want to render a duplicate widget key/ref,
                // as this causes problems with react (for obvious
                // reasons). Instead we just notify the
                // hopefully-content-creator that they need to change the
                // widget id.
                return <span className="renderer-widget-error">
                    Widget [[{'\u2603'} {node.id}]] already exists.
                </span>;

            } else {
                this.widgetIds.push(node.id);
                return this.renderWidget(node.widgetType, node.id);
            }

        } else if (node.type === "math") {
            // We render math here instead of in perseus-markdown.jsx
            // because we need to pass it our onRender callback.
            return <span style={{
                             // If math is directly next to text, don't let it
                             // wrap to the next line
                             "whiteSpace": "nowrap"
                         }}>
                {/* We add extra empty spans around the math to make it not
                    wrap (I don't know why this works, but it does) */}
                <span />
                <TeX onRender={this.props.onRender}>
                    {node.content}
                </TeX>
                <span />
            </span>;

        } else if (node.type === "image") {
            // We need to add width and height to images from our
            // props.images mapping.

            // We do a _.has check here to avoid weird things like
            // 'toString' or '__proto__' as a url.
            var extraAttrs = (_.has(this.props.images, node.target)) ?
                this.props.images[node.target] :
                null;

            return <SvgImage
                src={PerseusMarkdown.sanitizeUrl(node.target)}
                alt={node.alt}
                title={node.title}
                {...extraAttrs} />;

        } else if (node.type === "columns") {
            // Note that we have two columns. This is so we can put
            // a className on the outer renderer content for SAT.
            // TODO(aria): See if there is a better way we can do
            // things like this
            this._isTwoColumn = true;
            // but then render normally:
            return PerseusMarkdown.ruleOutput(node, nestedOutput);

        } else if (node.type === "text") {
            if (rContainsNonWhitespace.test(node.content)) {
                this._foundTextNodes = true;
            }
            return node.content;

        } else {
            // If it's a "normal" or "simple" markdown node, just
            // output it using its output rule.
            return PerseusMarkdown.ruleOutput(node, nestedOutput);
        }
    },

    handleRender: function(prevProps) {
        var onRender = this.props.onRender;
        var oldOnRender = prevProps.onRender;
        var $images = $(this.getDOMNode()).find("img");

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

    getGrammarTypeForPath: function(path) {
        var widgetId = _.first(path);
        var interWidgetPath = _.rest(path);

        var widget = this.getWidgetInstance(widgetId);
        return widget.getGrammarTypeForPath(interWidgetPath);
    },

    getInputPaths: function() {
        var inputPaths = [];
        _.each(this.widgetIds, (widgetId) => {
            var widget = this.getWidgetInstance(widgetId);
            if (widget.getInputPaths) {
                // Grab all input paths and add widgetID to the front
                var widgetInputPaths = widget.getInputPaths();
                // Prefix paths with their widgetID and add to collective
                // list of paths.
                _.each(widgetInputPaths, (inputPath) => {
                    var relativeInputPath = [widgetId].concat(inputPath);
                    inputPaths.push(relativeInputPath);
                });
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
        var focusWidget = this.getWidgetInstance(widgetId).focusInputPath;
        focusWidget && focusWidget(interWidgetPath);
    },

    blurPath: function(path) {
        // No need to blur if it's not focused
        if (!_.isEqual(this._currentFocus, path)) {
            return;
        }

        var widgetId = _.first(path);
        var interWidgetPath = _.rest(path);
        var widget = this.getWidgetInstance(widgetId);
        // We might be in the editor and blurring a widget that no
        // longer exists, so only blur if we actually found the widget
        if (widget) {
            var blurWidget = this.getWidgetInstance(widgetId).blurInputPath;
            // Widget handles parsing of the interWidgetPath
            blurWidget && blurWidget(interWidgetPath);
        }
    },

    blur: function() {
        if (this._currentFocus) {
            this.blurPath(this._currentFocus);
        }
    },

    getSaveWarnings: function() {
        return _(this.state.widgetInfo)
            .chain()
            .map((info, id) => {
                var widget = this.getWidgetInstance(id);
                var issuesFunc = widget.getSaveWarnings;
                return issuesFunc ? issuesFunc() : [];
            })
            .flatten(true)
            .value();
    },

    serialize: function() {
        var state = {};
        _.each(this.state.widgetInfo, function(info, id) {
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
            var widgetInfo = this._getWidgetInfo(id);
            var score = this.getWidgetInstance(id).simpleValidate(
                widgetInfo.options,
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

    /**
     * Returns an array of the widget `.getUserInput()` results
     */
    getUserInput: function() {
        return _.map(this.widgetIds, (id) => {
            return this.getWidgetInstance(id).getUserInput();
        });
    },

    /**
     * Returns an array of all widget IDs in the order they occur in
     * the content.
     */
    getWidgetIds: function() {
        return this.widgetIds;
    },

    /**
     * WARNING: This is an experimental/temporary API and should not be relied
     *     upon in production code. This function may change its behavior or
     *     disappear without notice.
     *
     * Returns a treelike structure containing all widget IDs (this will
     * descend into group widgets as well).
     *
     * An example of what the structure looks like:
     *
     * [
     *    {id: "radio 1", children: []},
     *    {
     *        id: "group 1",
     *        children: [
     *            {id: "radio 1", children: []}
     *            {id: "radio 2", children: []}
     *        ]
     *    }
     * ]
     *
     * Widgets will be listed in the order that they appear in their renderer.
     */
    getAllWidgetIds: function() {
        // Recursively builds our result
        return _.map(this.getWidgetIds(), (id) => {
            var groupPrefix = "group";
            if (id.substring(0, groupPrefix.length) === groupPrefix) {
                return {
                    id: id,
                    children:
                        this.getWidgetInstance(id)
                            .getRenderer()
                            .getAllWidgetIds(),
                };
            }

            // This is our base case
            return {id: id, children: []};
        });
    },

    /**
     * Returns the result of `.getUserInput()` for each widget, in
     * a map from widgetId to userInput.
     */
    getUserInputForWidgets: function() {
        return mapObjectFromArray(this.widgetIds, (id) => {
            return this.getWidgetInstance(id).getUserInput();
        });
    },

    /**
     * Returns an object mapping from widget ID to perseus-style score.
     * The keys of this object are the values of the array returned
     * from `getWidgetIds`.
     */
    scoreWidgets: function() {
        var widgetProps = this.state.widgetInfo;
        var onInputError = this.props.apiOptions.onInputError ||
                function() { };

        var gradedWidgetIds = _.filter(this.widgetIds, (id) => {
            var props = widgetProps[id];
            // props.graded is unset or true
            return props.graded == null || props.graded;
        });

        var widgetScores = mapObjectFromArray(gradedWidgetIds, (id) => {
            var props = widgetProps[id];
            var widget = this.getWidgetInstance(id);
            return widget.simpleValidate(props.options, onInputError);
        });

        return widgetScores;
    },

    /**
     * Grades the content.
     *
     * Returns a perseus-style score of {
     *     type: "invalid"|"points",
     *     message: string,
     *     earned: undefined|number,
     *     total: undefined|number
     * }
     */
    score: function() {
        return _.reduce(this.scoreWidgets(), Util.combineScores, Util.noScore);
    },

    guessAndScore: function() {
        var totalGuess = this.getUserInput();
        var totalScore = this.score();

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
});

module.exports = Renderer;
