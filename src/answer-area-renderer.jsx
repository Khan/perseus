var React = require('react');
var _ = require("underscore");

var Renderer = require("./renderer.jsx");
var QuestionParagraph = require("./question-paragraph.jsx");
var WidgetContainer = require("./widget-container.jsx");
var Widgets = require("./widgets.js");

var Util = require("./util.js");
var EnabledFeatures = require("./enabled-features.jsx");
var ApiOptions = require("./perseus-api.jsx").Options;

var SINGLE_ITEM_WIDGET_ID = "answer-area";
var PT = React.PropTypes;

var AnswerAreaRenderer = React.createClass({
    propTypes: {
        type: PT.string,
        options: PT.object,
        calculator: PT.bool,
        problemNum: PT.number,
        onInteractWithWidget: PT.func.isRequired,
        enabledFeatures: EnabledFeatures.propTypes,
        highlightedWidgets: PT.array.isRequired,
        apiOptions: ApiOptions.propTypes
    },

    getDefaultProps: function() {
        return {
            problemNum: 0,
            onInteractWithWidget: function() {},
            enabledFeatures: EnabledFeatures.defaults,
            highlightedWidgets: [],
            apiOptions: ApiOptions.defaults
        };
    },

    getInitialState: function() {
        // TODO(alpert): Move up to parent props?
        return {
            widget: {},
            cls: this.getClass(this.props.type)
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({cls: this.getClass(nextProps.type)});
    },

    getWidgetInstance: function() {
        // Half the time this is a Renderer; the other half of the time it's a
        // real widget.
        if (this.props.type === "multiple") {
            return this.refs.widget;
        } else {
            return this.refs.container.getWidget();
        }
    },

    getClass: function(type) {
        if (type === "multiple") {
            return Renderer;
        } else {
            return Widgets.getWidget(type, this.props.enabledFeatures);
        }
    },

    render: function() {
        if (this.props.type === "multiple") {
            return this.renderMultiple();
        } else {
            return this.renderSingle();
        }
    },

    emptyWidgets: function() {
        if (this.props.type === "multiple") {
            return this.getWidgetInstance().emptyWidgets();
        } else {
            return Util.scoreIsEmpty(
                this.getWidgetInstance().simpleValidate(this.props.options)) ?
                [SINGLE_ITEM_WIDGET_ID] : [];
        }
    },

    // Gets a focus object fixed up with an "answer-" prefix for
    // onFocusChange when type === "multiple"
    _getAnswerAreaFocusObj: function(rendererFocusPath) {
        if (rendererFocusPath == null) {
            return rendererFocusPath;
        }
        // TODO(jack): make "answer" the first element of the prefix
        // array, rather than modifying the widgetId, once we have
        // expunged widgetIds from the rest of the api calls in
        // favor of focus paths
        var answerPath = ["answer-" + _.first(rendererFocusPath)].concat(
            _.rest(rendererFocusPath));
        return answerPath;
    },

    renderMultiple: function() {
        var parentOnFocusChange = this.props.apiOptions.onFocusChange;
        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            parentOnFocusChange && {
                onFocusChange: (newFocus, oldFocus) => {
                    // If we have an apiOptions.onFocusChange, call
                    // it with an "answer-" prefix on our widget id
                    parentOnFocusChange(
                        this._getAnswerAreaFocusObj(newFocus),
                        this._getAnswerAreaFocusObj(oldFocus)
                    );
                }
            }
        );

        return <this.state.cls
            ref="widget"
            problemNum={this.props.problemNum}
            onChange={this.handleChangeRenderer}
            onInteractWithWidget={this.props.onInteractWithWidget}
            highlightedWidgets={this.props.highlightedWidgets}
            enabledFeatures={_.extend({}, this.props.enabledFeatures, {
                // Hide answer area tooltip formats,
                // the "Acceptable formats" box already works
                toolTipFormats: false
            })}
            apiOptions={apiOptions}
            {...this.props.options}
            {...this.state.widget}
        />;
    },

    renderSingle: function() {
        var shouldHighlight = _.contains(this.props.highlightedWidgets,
                                    SINGLE_ITEM_WIDGET_ID);

        return <QuestionParagraph>
            <WidgetContainer
                ref="container"
                key={this.props.type}
                type={this.state.cls}
                initialProps={this.getSingleWidgetProps()}
                shouldHighlight={shouldHighlight} />
        </QuestionParagraph>;
    },

    getSingleWidgetProps: function() {
        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions
        );

        // Pass onFocus/onBlur handlers to each widget, so they
        // can trigger `onFocusChange`s if/when those happen.
        // Since we're just a single widget, any focusing has
        // to be from nothing (path: null), and any blurring has
        // to be to nothing. Our parent ItemRenderer will handle
        // connecting the dots between these events and any
        // focusing/blurring between elements in the question
        // area to combine this event with those into a single
        // onChangeFocus at the ItemRenderer level.
        var onFocus = (path, elem) => {
            this._isFocused = true;
            apiOptions.onFocusChange(
                [SINGLE_ITEM_WIDGET_ID].concat(path),
                // we're pretending we're a renderer, so if we got
                // focus, we must not have had it before
                null);
        };
        var onBlur = (path, elem) => {
            this._isFocused = false;
            apiOptions.onFocusChange(null,
                [SINGLE_ITEM_WIDGET_ID].concat(path));
        };

        var initialWidgetProps = Widgets.getRendererPropsForWidgetInfo(
            this.props,
            this.props.problemNum
        );

        return _.extend({
            widgetId: SINGLE_ITEM_WIDGET_ID,
            problemNum: this.props.problemNum,
            onChange: this.handleChangeRenderer,
            enabledFeatures: _.extend({}, this.props.enabledFeatures, {
                // Hide answer area tooltip formats,
                // the "Acceptable formats" box already works
                toolTipFormats: false
            }),
            apiOptions: apiOptions,
            onFocus: onFocus,
            onBlur: onBlur
        }, initialWidgetProps, this.state.widget);
    },

    _setWidgetProps: function(widgetId, newProps, cb) {
        // "area" -> global id "answer-area" ;)
        if (widgetId === "area" && this.props.type !== "multiple") {
            // We have a single widget
            this.handleChangeRenderer(newProps, cb);
        } else if (this.props.type === "multiple") {
            // We have a `Renderer`
            this.getWidgetInstance()._setWidgetProps(widgetId, newProps, cb);
        } else if ((typeof console) !== "undefined" && console.error) {
            // We have a widget id other than area in a non-renderer area
            console.error(
                "Sent invalid widget id `answer-" + widgetId +
                "` to an answerArea of type `" + this.props.type + "`."
            );
        }
    },

    handleChangeRenderer: function(newProps, cb) {
        var widget = _.extend({}, this.state.widget, newProps);
        this.setState({widget: widget}, () => {
            if (this.props.type !== "multiple") {
                var cbResult = cb && cb();
                this.props.onInteractWithWidget(SINGLE_ITEM_WIDGET_ID);
                // If we're not type === "multiple", send an onFocusChange
                // event to focus to this widget if we aren't already focused.
                // For type "multiple" these events are handled in the
                // multiple's Renderer

                if (cbResult !== false &&
                        this.props.apiOptions.onFocusChange &&
                        !this._isFocused) {
                    this._isFocused = true;
                    this.props.apiOptions.onFocusChange(
                        [SINGLE_ITEM_WIDGET_ID],
                        // we're pretending we're a renderer, so if we got
                        // focus, we must not have had it before
                        null);
                }
            }
        });
    },

    componentDidMount: function() {
        // Storing things directly on components should be avoided!
        this._isFocused = false;
        this.update();
    },

    componentDidUpdate: function(prevProps) {
        this.update();

        if (this.props.type !== "multiple" &&
                prevProps.type === this.props.type) {
            this.refs.container.replaceWidgetProps(
                this.getSingleWidgetProps());
        }
    },

    update: function() {
        $("#calculator").toggle(this.props.calculator);
    },

    componentWillUnmount: function() {
        if (this.props.calculator) {
            $("#calculator").hide();
        }
    },

    getDOMNodeForPath: function(path) {
        var prefixedWidgetId = _.first(path);
        var interWidgetPath = _.rest(path);

        if (this.props.type === "multiple") {
            var widgetId = prefixedWidgetId.replace('answer-', '');
            var relativePath = [widgetId].concat(interWidgetPath);

            // Answer-area is a renderer, so we can pass down the path
            return this.getWidgetInstance().getDOMNodeForPath(relativePath);
        } else {
            // Answer-area is a widget, so we treat it like a widget, returning
            // the outer node in the special-case that there is no remaining
            // path.
            var widget = this.getWidgetInstance();
            var getNode = widget.getDOMNodeForPath;
            if (getNode) {
                return getNode(interWidgetPath);
            } else if (interWidgetPath.length === 0) {
                return widget.getDOMNode();
            }
        }
    },

    getGrammarTypeForPath: function(path) {
        // TODO(emily): refactor this kind of logic out, or wait until alex
        // kills the answer-area-renderer and solves it for me.
        var prefixedWidgetId = _.first(path);
        var interWidgetPath = _.rest(path);

        if (this.props.type === "multiple") {
            var widgetId = prefixedWidgetId.replace('answer-', '');
            var relativePath = [widgetId].concat(interWidgetPath);

            // Answer-area is a renderer, so we can pass down the path
            return this.getWidgetInstance().getGrammarTypeForPath(
                relativePath);
        } else {
            // Answer-area is a widget, so we treat it like a widget.
            var widget = this.getWidgetInstance();
            return widget.getGrammarTypeForPath(interWidgetPath);
        }
    },

    getInputPaths: function() {
        if (this.props.type === "multiple") {
            var inputPaths = this.getWidgetInstance().getInputPaths();
            // We need to prefix our widgetIds with 'answer-' to preserve
            // uniqueness when we return these to the item-renderer.
            return _.map(inputPaths, (path) => {
                var prefixedWidget = 'answer-' + _.first(path);
                return [prefixedWidget].concat(_.rest(path));
            });
        } else {
            var widgetId = "answer-area";
            var inputPaths = [];
            var widget = this.getWidgetInstance();
            if (widget.getInputPaths) {
                // Grab all input paths and add widgetID to the front
                var widgetInputPaths = widget.getInputPaths();

                if (widgetInputPaths === widget) {
                    // Special case: we allow you to just return the widget
                    inputPaths.push([
                        widgetId
                    ]);
                } else {
                    // Add to collective list of inputs
                    _.each(widgetInputPaths, (inputPath) => {
                        var relativeInputPath = [widgetId].concat(inputPath);
                        inputPaths.push(relativeInputPath);
                    });
                }
            }
            return inputPaths;
        }
    },

    focusPath: function(path) {
        var prefixedWidgetId = _.first(path);
        var interWidgetPath = _.rest(path);

        if (this.props.type === "multiple") {
            var widgetId = prefixedWidgetId.replace('answer-', '');
            var relativePath = [widgetId].concat(interWidgetPath);

            // Answer-area is a renderer, so we can pass down the path
            this.getWidgetInstance().focusPath(relativePath);
        } else {
            // Answer-area is a widget
            var focusWidget = this.getWidgetInstance().focusInputPath;
            focusWidget && focusWidget(interWidgetPath);
        }
    },

    blurPath: function(path) {
        var prefixedWidgetId = _.first(path);
        var interWidgetPath = _.rest(path);

        if (this.props.type === "multiple") {
            var widgetId = prefixedWidgetId.replace('answer-', '');
            var relativePath = [widgetId].concat(interWidgetPath);

            // Answer-area is a renderer, so we can pass down the path
            this.getWidgetInstance().blurPath(relativePath);
        } else {
            // Answer-area is a widget
            var blurWidget = this.getWidgetInstance().blurInputPath;
            blurWidget && blurWidget(interWidgetPath);
        }
    },

    focus: function() {
        var focusContents = this.getWidgetInstance().focus;
        focusContents && focusContents();
    },

    blur: function() {
        var blurContents = this.getWidgetInstance().blur;
        blurContents && blurContents();
    },

    setInputValue: function(path, newValue, focus) {
        var prefixedWidgetId = _.first(path);
        var interWidgetPath = _.rest(path);

        var newPath;
        if (this.props.type === "multiple") {
            var widgetId = prefixedWidgetId.replace('answer-', '');
            var relativePath = [widgetId].concat(interWidgetPath);
            newPath = relativePath;
        } else {
            newPath = interWidgetPath;
        }

        // Thankfully, the API is agnostic! So it doesn't matter if this is a
        // renderer or a widget.
        this.getWidgetInstance().setInputValue(newPath, newValue, focus);
    },

    guessAndScore: function() {
        // TODO(alpert): These should probably have the same signature...
        if (this.props.type === "multiple") {
            return this.getWidgetInstance().guessAndScore();
        } else {
            var guess = this.getWidgetInstance().getUserInput();

            var score;
            if (this.props.graded == null || this.props.graded) {
                // props.graded is unset or true
                // TODO(alpert): Separate out the rubric
                score = this.getWidgetInstance().simpleValidate(
                    this.props.options);
            } else {
                score = Util.noScore;
            }

            return [guess, score];
        }
    }
});

module.exports = AnswerAreaRenderer;
