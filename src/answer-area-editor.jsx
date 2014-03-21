/** @jsx React.DOM */
(function(Perseus) {

require("./core.js");
require("./renderer.jsx");
require("./editor.jsx");
var Util = require("./util.js");

var InfoTip = require("./components/info-tip.jsx");
var QuestionParagraph = require("./question-paragraph.jsx");
var Widgets = require("./widgets.js");
var Renderer = Perseus.Renderer;
var Editor = Perseus.Editor;

var AnswerAreaRenderer = Perseus.AnswerAreaRenderer = React.createClass({
    propTypes: {
        onInteractWithWidget: React.PropTypes.func.isRequired,
        shouldIndicate: React.PropTypes.bool.isRequired,
        usedWidgets: React.PropTypes.array.isRequired,
        numWidgetsRemaining: React.PropTypes.number,
        numWidgets: React.PropTypes.number
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
            return Widgets.get(type);
        }
    },

    render: function() {
        var body;
        if (this.props.type === "multiple") {
            body = this.renderMultiple();
        } else {
            body = this.renderSingle();
        }
        return <div>
            {this.props.shouldIndicate && <div className="remaining-parts">
                {this.props.numWidgetsRemaining} /{' '}
                {this.props.numWidgets}
                {' '}remaining parts of this question
            </div>}
            {body}
        </div>;
    },

    renderMultiple: function() {
        return this.state.cls(_.extend({
            ref: "widget",
            problemNum: this.props.problemNum,
            onChange: this.handleChangeRenderer,
            onInteractWithWidget: this.props.onInteractWithWidget,
            usedWidgets: this.props.usedWidgets,
            shouldIndicate: this.props.shouldIndicate
        }, this.props.options, this.state.widget));
    },

    renderSingle: function() {
        return <QuestionParagraph
            totalWidgets={["answer-area"]}
            usedWidgets={this.props.usedWidgets}
            shouldIndicate={this.props.shouldIndicate} >
            {this.state.cls(_.extend({
                ref: "widget",
                problemNum: this.props.problemNum,
                onChange: this.handleChangeRenderer,
            }, this.props.options, this.state.widget))}
        </QuestionParagraph>;
    },

    handleChangeRenderer: function(newProps, cb) {
        if (this.props.type !== "multiple") {
            this.props.onInteractWithWidget("answer-area");
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

var AnswerAreaEditor = Perseus.AnswerAreaEditor = React.createClass({
    getDefaultProps: function() {
        return {
            type: "input-number",
            options: {},
            calculator: false
        };
    },

    render: function() {
        var cls;
        if (this.props.type === "multiple") {
            cls = Editor;
        } else {
            cls = Widgets.get(this.props.type + "-editor");
        }

        var editor = cls(_.extend({
            ref: "editor",
            placeholder: "This answer area is being deprecated. " +
            "Please use the widgets in the question area for your answer.",
            onChange: function(newProps, cb) {
                var options = _.extend({}, this.props.options, newProps);
                this.props.onChange({options: options}, cb);
            }.bind(this)
        }, this.props.options));

        return <div className="perseus-answer-editor">
            <div className="perseus-answer-options">
            <div><label>
                {' '}Show calculator:{' '}
                <input type="checkbox" checked={this.props.calculator}
                    onChange={function(e) {
                        this.props.onChange({calculator: e.target.checked});
                    }.bind(this)} />
            </label>
            <InfoTip>
                <p>Use the calculator when completing difficult calculations is
                NOT the intent of the question. DON’T use the calculator when
                testing the student’s ability to complete different types of
                computations.</p>
            </InfoTip>
            </div>
            <div><label>
                {' '}Answer type:{' '}
                <select value={this.props.type}
                        onChange={function(e) {
                            this.props.onChange({
                                type: e.target.value,
                                options: {}
                            }, function() {
                                this.refs.editor.focus();
                            }.bind(this));
                        }.bind(this)}>
                    <option value="radio">Multiple choice</option>
                    <option value="table">Table of values</option>
                    <option value="input-number">Text input (number)</option>
                    <option value="expression">Expression / Equation</option>
                    <option value="multiple">Custom format</option>
                </select>
            </label>
            <InfoTip>
                <p>Use the custom format if the question is in the question
                area, and tell the students how to complete the problem.</p>
            </InfoTip></div>
            </div>
            <div className={cls !== Editor ? "perseus-answer-widget" : ""}>
                {editor}
            </div>
        </div>;
    },

    toJSON: function(skipValidation) {
        // Could be just _.pick(this.props, "type", "options"); but validation!
        return {
            type: this.props.type,
            options: this.refs.editor.toJSON(skipValidation),
            calculator: this.props.calculator
        };
    }
});

})(Perseus);
