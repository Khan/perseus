/** @jsx React.DOM */

var React = require('react');
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
            return this.refs.widget.emptyWidgets();
        } else {
            return Util.scoreIsEmpty(
                this.refs.widget.simpleValidate(this.props.options)) ?
                [SINGLE_ITEM_WIDGET_ID] : [];
        }
    },

    // Gets a focus object fixed up with an "answer-" prefix for
    // onFocusChange when type === "multiple"
    _getAnswerAreaFocusObj: function(rendererFocusObj) {
        if (rendererFocusObj.path == null) {
            return rendererFocusObj;
        }
        // TODO(jack): make "answer" the first element of the prefix
        // array, rather than modifying the widgetId, once we have
        // expunged widgetIds from the rest of the api calls in
        // favor of focus paths
        var answerPath = ["answer-" + rendererFocusObj.path[0]];
        answerPath = answerPath.concat(_.rest(rendererFocusObj.path));
        return {
            path: answerPath,
            element: rendererFocusObj.element
        };
    },

    renderMultiple: function() {
        var parentInterceptInputFocus =
                this.props.apiOptions.interceptInputFocus;
        var parentOnFocusChange = this.props.apiOptions.onFocusChange;

        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            parentInterceptInputFocus && {
                // Rewrite widgetIds sent to interceptInputFocus on the way
                // up to include an "answer-" prefix
                interceptInputFocus: (widgetId) => {
                    var args = _.toArray(arguments);
                    var fullWidgetId = "answer-" + widgetId;
                    args[0] = fullWidgetId;
                    return parentInterceptInputFocus.apply(null, args);
                }
            },
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

        return this.state.cls(_.extend({
            ref: "widget",
            problemNum: this.props.problemNum,
            onChange: this.handleChangeRenderer,
            onInteractWithWidget: this.props.onInteractWithWidget,
            highlightedWidgets: this.props.highlightedWidgets,
            enabledFeatures: _.extend({}, this.props.enabledFeatures, {
                // Hide answer area tooltip formats,
                // the "Acceptable formats" box already works
                toolTipFormats: false
            }),
            apiOptions: apiOptions
        }, this.props.options, this.state.widget));
    },

    renderSingle: function() {
        var shouldHighlight = _.contains(this.props.highlightedWidgets,
                                    SINGLE_ITEM_WIDGET_ID);

        var editorProps = this.props.options;
        var transform = Widgets.getTransform(this.props.type);
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
            apiOptions.onFocusChange({
                path: [SINGLE_ITEM_WIDGET_ID].concat(path),
                element: elem || this.refs.widget.getDOMNode()
            }, {
                // we're pretending we're a renderer, so if we got
                // focus, we must not have had it before
                path: null,
                element: null
            });
        };
        var onBlur = (path, elem) => {
            this._isFocused = false;
            apiOptions.onFocusChange({
                path: null,
                element: null
            }, {
                path: [SINGLE_ITEM_WIDGET_ID].concat(path),
                element: elem || this.refs.widget.getDOMNode()
            });
        };

        return <QuestionParagraph>
            <WidgetContainer
                shouldHighlight={shouldHighlight} >
                {this.state.cls(_.extend({
                    ref: "widget",
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
                }, transform(editorProps), this.state.widget))}
            </WidgetContainer>
        </QuestionParagraph>;
    },

    _setWidgetProps: function(widgetId, newProps, cb) {
        // "area" -> global id "answer-area" ;)
        if (widgetId === "area" && this.props.type !== "multiple") {
            // We have a single widget
            this.handleChangeRenderer(newProps, cb);
        } else if (this.props.type === "multiple") {
            // We have a `Renderer`
            this.refs.widget._setWidgetProps(widgetId, newProps, cb);
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
                    this.props.apiOptions.onFocusChange({
                        path: [SINGLE_ITEM_WIDGET_ID],
                        // TODO(jack): Make this less hacky (call some magic
                        // getElement function or something):
                        element: this.refs.widget.getDOMNode()
                    }, {
                        // we're pretending we're a renderer, so if we got
                        // focus, we must not have had it before
                        path: null,
                        element: null
                    });
                }
            }
        });
    },

    componentDidMount: function() {
        // Storing things directly on components should be avoided!
        this.examples = [];
        this.$examples = $("<div id='examples'></div>");
        this._isFocused = false;

        this.update();
    },

    componentDidUpdate: function() {
        this.update();
    },

    update: function() {
        $("#calculator").toggle(this.props.calculator);

        var widget = this.refs.widget;
        var examples = widget.examples ? widget.examples() : null;

        if (_.isEqual(examples, this.examples)) {
            // Only destroy (and maybe recreate) qtip if examples have changed
            return;
        }

        this.examples = examples;

        $("#examples-show").hide();
        if ($("#examples-show").data("qtip")) {
            // This will warn about Jquery removing a node owned by React, 
            // however React no longer owns that node. We created that node 
            // using React, copied its html, passed it to qtip, and then 
            // unmounted it from React. So it React thinks it is it's code 
            // because it has a data-reactid, but qtip created it.      
            $("#examples-show").qtip("destroy", /* immediate */ true);
        }

        if (examples && $("#examples-show").length) {
            $("#examples-show").append(this.$examples);

            var content = _.map(examples, function(example) {
                return "- " + example;
            }).join("\n");

            React.renderComponent(
                Renderer({content: content}),
                this.$examples[0]);

            $("#examples-show").qtip({
                content: {
                    text: this.$examples.html()
                },
                style: {classes: "qtip-light leaf-tooltip"},
                position: {
                    my: "center right",
                    at: "center left"
                },
                show: {
                    delay: 200,
                    effect: {
                        length: 0
                    }
                },
                hide: {delay: 0}
            });

            // Now that qtip has been created with a copy of the react 
            // component's html, we no longer need to keep the react component.
            React.unmountComponentAtNode(this.$examples[0]);
            this.$examples.remove();

            $("#examples-show").show();
        }
    },

    componentWillUnmount: function() {
        if (this.props.calculator) {
            $("#calculator").hide();
        }
        if (this.state.cls.examples && $("#examples-show").length) {
            $("#examples-show").hide();
            React.unmountComponentAtNode(
                    document.getElementById("examples"));
        }
    },

    focus: function() {
        this.refs.widget.focus();
    },

    guessAndScore: function() {
        // TODO(alpert): These should probably have the same signature...
        if (this.props.type === "multiple") {
            return this.refs.widget.guessAndScore();
        } else {
            var guess = this.refs.widget.toJSON();

            var score;
            if (this.props.graded == null || this.props.graded) {
                // props.graded is unset or true
                // TODO(alpert): Separate out the rubric
                score = this.refs.widget.simpleValidate(this.props.options);
            } else {
                score = Util.noScore;
            }

            return [guess, score];
        }
    }
});

module.exports = AnswerAreaRenderer;
