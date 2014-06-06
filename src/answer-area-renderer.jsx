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

    renderMultiple: function() {
        var parentInterceptInputFocus =
                this.props.apiOptions.interceptInputFocus;
        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            {
                // Rewrite widgetIds sent to interceptInputFocus on the way
                // up to include an "answer-" prefix
                interceptInputFocus: function(widgetId) {
                    var args = _.toArray(arguments);
                    var fullWidgetId = "answer-" + widgetId;
                    args[0] = fullWidgetId;
                    return parentInterceptInputFocus.apply(null, args);
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

        return <QuestionParagraph>
            <WidgetContainer
                enableHighlight={this.props.enabledFeatures.highlight}
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
                    apiOptions: apiOptions
                }, transform(editorProps), this.state.widget))}
            </WidgetContainer>
        </QuestionParagraph>;
    },

    _setWidgetValue: function(widgetId, newProps, cb) {
        // "area" -> global id "answer-area" ;)
        if (widgetId === "area" && this.props.type !== "multiple") {
            // We have a single widget
            this.handleChangeRenderer(newProps, cb);
        } else if (this.props.type === "multiple") {
            // We have a `Renderer`
            this.refs.widget._setWidgetValue(widgetId, newProps, cb);
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
        this.setState({widget: widget}, cb);
        if (this.props.type !== "multiple") {
            this.props.onInteractWithWidget(SINGLE_ITEM_WIDGET_ID);
        }
    },

    componentDidMount: function() {
        // Storing things directly on components should be avoided!
        this.examples = [];
        this.$examples = $("<div id='examples'></div>");

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
