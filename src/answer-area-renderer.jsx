/** @jsx React.DOM */

var Renderer = require("./renderer.jsx");
var QuestionParagraph = require("./question-paragraph.jsx");
var WidgetContainer = require("./widget-container.jsx");
var Widgets = require("./widgets.js");

var Util = require("./util.js");
var EnabledFeatures = require("./enabled-features.jsx");

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
        highlightedWidgets: PT.array.isRequired
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
            })
        }, this.props.options, this.state.widget));
    },

    renderSingle: function() {
        var shouldHighlight = _.contains(this.props.highlightedWidgets,
                                    SINGLE_ITEM_WIDGET_ID);

        return <QuestionParagraph>
            <WidgetContainer
                enableHighlight={this.props.enabledFeatures.highlight}
                shouldHighlight={shouldHighlight} >
                {this.state.cls(_.extend({
                    ref: "widget",
                    problemNum: this.props.problemNum,
                    onChange: this.handleChangeRenderer,
                    enabledFeatures: _.extend({}, this.props.enabledFeatures, {
                        // Hide answer area tooltip formats,
                        // the "Acceptable formats" box already works
                        toolTipFormats: false
                    })
                }, this.props.options, this.state.widget))}
            </WidgetContainer>
        </QuestionParagraph>;
    },

    handleChangeRenderer: function(newProps, cb) {
        if (this.props.type !== "multiple") {
            this.props.onInteractWithWidget(SINGLE_ITEM_WIDGET_ID);
        }
        var widget = _.extend({}, this.state.widget, newProps);
        this.setState({widget: widget}, cb);
    },

    componentDidMount: function() {
        this.$examples = $("<div id='examples'></div>");
        this.update();
    },

    componentDidUpdate: function() {
        this.update();
    },

    update: function() {
        $("#calculator").toggle(this.props.calculator);

        $("#examples-show").hide();
        if ($("#examples-show").data("qtip")) {
            $("#examples-show").qtip("destroy", /* immediate */ true);
        }

        var widget = this.refs.widget;
        var examples = widget.examples ? widget.examples() : null;

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
                    text: this.$examples.remove()
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
