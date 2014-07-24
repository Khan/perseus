/** @jsx React.DOM */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var InfoTip = require("react-components/info-tip.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var NumberInput = require("../components/number-input.jsx");
var ButtonGroup = require("react-components/button-group.jsx");
var MultiButtonGroup = require("../components/multi-button-group.jsx");
var InputWithExamples = require("../components/input-with-examples.jsx");

var Editor = require("../editor.jsx");

var firstNumericalParse = require("../util.js").firstNumericalParse;

var answerFormButtons = [
    {title: "Integers", value: "integer", text: "6"},
    {title: "Decimals", value: "decimal", text: "0.75"},
    {title: "Proper fractions", value: "proper", text: "\u2157"},
    {title: "Improper fractions", value: "improper",
        text: "\u2077\u2044\u2084"},
    {title: "Mixed numbers", value: "mixed", text: "1\u00BE"},
    {title: "Numbers with \u03C0", value: "pi", text: "\u03C0"}
];

var formExamples = {
    "integer": (options) => $._("an integer, like $6$"),
    "proper": (options) => options.simplify === "optional" ?
        $._("a *proper* fraction, like $1/2$ or $6/10$") :
        $._("a *simplified proper* fraction, like $3/5$"),
    "improper": (options) => options.simplify === "optional" ?
        $._("an *improper* fraction, like $10/7$ or $14/8$") :
        $._("a *simplified improper* fraction, like $7/4$"),
    "mixed": () => $._("a mixed number, like $1\\ 3/4$"),
    "decimal": () => $._("an *exact* decimal, like $0.75$"),
    "pi": () => $._("a multiple of pi, like $12\\ \\text{pi}$ or " +
                "$2/3\\ \\text{pi}$")
};

var NumericInput = React.createClass({
    propTypes: {
        currentValue: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            currentValue: "",
            size: "normal"
        };
    },

    render: function() {
        return <InputWithExamples
                ref="input"
                value={this.props.currentValue}
                onChange={this.handleChange}
                className={"perseus-input-size-" + this.props.size}
                examples={this.examples()}
                shouldShowExamples={this.shouldShowExamples()} />;
    },

    handleChange: function(newValue) {
        this.props.onChange({ currentValue: newValue });
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    toJSON: function(skipValidation) {
        return {currentValue: this.props.currentValue};
    },

    simpleValidate: function(rubric) {
        return NumericInput.validate(this.toJSON(), rubric);
    },

    shouldShowExamples: function() {
        var noFormsAccepted = this.props.answerForms.length === 0;
        var allFormsAccepted = this.props.answerForms.length >=
                _.size(formExamples);
        return this.props.enabledFeatures.toolTipFormats &&
                !noFormsAccepted && !allFormsAccepted;
    },

    examples: function() {
        // if the set of specified forms are empty, allow all forms
        var forms = this.props.answerForms.length !== 0 ?
                this.props.answerForms : _.keys(formExamples);
        return _.map(forms, (form) => {
            return formExamples[form](this.props);
        });
    },

    statics: {
        displayMode: "inline-block"
    }
});

_.extend(NumericInput, {
    validate: function(state, rubric) {
        var allAnswerForms = _.pluck(answerFormButtons, "value");

        var createValidator = (answer) =>
            Khan.answerTypes.number.createValidatorFunctional(
                answer.value, {
                    message: answer.message,
                    simplify: answer.status === "correct" ?
                        answer.simplify : "optional",
                    inexact: true, // TODO(merlob) backfill / delete
                    maxError: answer.maxError,
                    forms: (answer.strict && answer.answerForms.length !== 0) ?
                            answer.answerForms : allAnswerForms
            });

        // Look through all correct answers for one that matches either
        // precisely or approximately and return the appropriate message:
        // - if precise, return the message that the answer came with
        // - if it needs to be simplified, etc., show that message
        var correctAnswers = _.where(rubric.answers, {status: "correct"});
        var result = _.find(_.map(correctAnswers, (answer) => {
            var validate = createValidator(answer);
            return validate(state.currentValue);
        }), match => match.correct || match.empty);

        if (!result) { // Otherwise, if the guess is not correct
            var otherAnswers = ([]).concat(
                _.where(rubric.answers, {status: "ungraded"}),
                _.where(rubric.answers, {status: "wrong"})
            );

            // Look through all other answers and if one matches either
            // precisely or approximately return the answer's message
            match = _.find(otherAnswers, (answer) => {
                 var validate = createValidator(answer);
                 return validate(state.currentValue).correct;
             });
            result = {
                empty: match ? match.status === "ungraded" : false,
                correct: match ? match.status === "correct" : false,
                message: match ? match.message : null,
                guess: state.currentValue
            };
        }

        // TODO(eater): Seems silly to translate result to this invalid/points
        // thing and immediately translate it back in ItemRenderer.scoreInput()
        if (result.empty) {
            return {
                type: "invalid",
                message: result.message
            };
        } else {
            return {
                type: "points",
                earned: result.correct ? 1 : 0,
                total: 1,
                message: result.message
            };
        }
    }
});

var initAnswer = (status) => {
    return {
        value: null,
        status: status,
        message: "",
        simplify: "required",
        answerForms: [],
        strict: false,
        maxError: null
    };
};

var NumericInputEditor = React.createClass({
    mixins: [JsonifyProps, Changeable],

    getDefaultProps: function() {
        return {
            answers: [initAnswer("correct")],
            size: "normal"
        };
    },

    getInitialState: function() {
        return {
            lastStatus: "wrong",
            showOptions: _.map(this.props.answers, () => false)
        };
    },

    render: function() {
        var lastStatus = this.state.lastStatus; // for a phantom last answer
        var answers = this.props.answers.concat(initAnswer(lastStatus));

        var unsimplifiedAnswers = (i) => <div className="perseus-widget-row">
            <label>Unsimplified answers are</label>
            <ButtonGroup value={answers[i]["simplify"]}
                         allowEmpty={false}
                         buttons={[
                            {value: "required", text: "ungraded"},
                            {value: "optional", text: "accepted"},
                            {value: "enforced", text: "wrong"}]}
                         onChange={this.updateAnswer(i, "simplify")} />
            <InfoTip>
                <p>Normally select "ungraded". This will give the
                user a message saying the answer is correct but not
                simplified. The user will then have to simplify it and
                re-enter, but will not be penalized. (5th grade and after)</p>
                <p>Select "accepted" only if the user is not
                expected to know how to simplify fractions yet. (Anything
                prior to 5th grade)</p>
                <p>Select "wrong" <em>only</em> if we are
                specifically assessing the ability to simplify.</p>
            </InfoTip>
        </div>;

        var suggestedAnswerTypes = (i) => <div>
            <div className="perseus-widget-row">
                <label>Choose the suggested answer formats</label>
                <MultiButtonGroup buttons={answerFormButtons}
                    values={answers[i]["answerForms"]}
                    onChange={this.updateAnswer(i, "answerForms")} />
                <InfoTip>
                    <p>Formats will be autoselected for you based on the
                        given answer; to show no suggested formats and
                        accept all types, simply have a decimal/integer be
                        the answer. Values with &pi; will have format "pi",
                        and values that are fractions will have some subset
                        (mixed will be "mixed" and "proper"; improper/proper
                        will both be "improper" and "proper"). If you would
                        like to specify that it is only a proper fraction
                        (or only a mixed/improper fraction), deselect the
                        other format. Except for specific cases, you should
                        not need to change the autoselected formats.</p>
                    <p>To restrict the answer to <em>only</em> an improper
                        fraction (i.e. 7/4), select the
                        improper fraction and toggle "strict" to true.
                        This <b>will not</b> accept 1.75 as an answer. </p>
                    <p>Unless you are testing that specific skill, please
                        do not restrict the answer format.</p>
                </InfoTip>
            </div>
            <div className="perseus-widget-row">
                <PropCheckBox label="Strictly match only these formats"
                    strict={answers[i]["strict"]}
                    onChange={this.updateAnswer.bind(this, i)} />
            </div>
        </div>;

        var maxError = (i) => <div className="perseus-widget-row">
            <NumberInput label="Max error"
                className="max-error"
                value={answers[i]["maxError"]}
                onChange={this.updateAnswer(i, "maxError")}
                placeholder="0" />
        </div>;


        var inputSize = <div>
                <label>Width:{' '} </label>
                <ButtonGroup value={this.props.size} allowEmpty={false}
                    buttons={[
                        {value: "normal", text: "Normal (80px)"},
                        {value: "small", text: "Small (40px)"}]}
                    onChange={this.change("size")} />
                <InfoTip>
                    <p>Use size "Normal" for all text boxes, unless there are
                    multiple text boxes in one line and the answer area is too
                    narrow to fit them.</p>
                </InfoTip>
            </div>;

        var instructions = {
            "wrong":    "(address the mistake/misconception)",
            "ungraded": "(explain in detail to avoid confusion)",
            "correct":  "(reinforce the user's understanding)"
        };

        var generateInputAnswerEditors = () => answers.map((answer, i) => {
            var editor = Editor({
                content: answer.message || "",
                placeholder: "Why is this answer " + answer.status + "?\t" +
                    instructions[answer.status],
                widgetEnabled: false,
                onChange: (newProps) => {
                    if ("content" in newProps) {
                        this.updateAnswer(i, {message: newProps.content});
                    }
                }
            });
            return <div className="perseus-widget-row" key={i}>
                <div className={"input-answer-editor-value-container" +
                    (answer.maxError ? " with-max-error" : "")}>
                    <NumberInput value={answer.value}
                        className="numeric-input-value"
                        placeholder="answer"
                        format={_.last(answer.answerForms)}
                        onFormatChange={(newValue, format) => {
                            var forms;
                            if (format === "pi") {
                                forms = ["pi"];
                            } else if (format === "mixed") {
                                forms = ["proper", "mixed"];
                            } else if (format === "proper" ||
                                       format === "improper") {
                                forms = ["proper", "improper"];
                            }
                            this.updateAnswer(i, {
                                value: firstNumericalParse(newValue),
                                answerForms: forms
                            });
                        }}
                        onChange={(newValue) => {
                            this.updateAnswer(i, {
                                value: firstNumericalParse(newValue)});
                        }} />
                    {answer.strict && <div className="is-strict-indicator"
                        title="strictly equivalent to">&equiv;</div>}
                    {answer.simplify !== "required" &&
                     answer.status === "correct" &&
                      <div className={"simplify-indicator " + answer.simplify}
                        title="accepts unsimplified answers">&permil;</div>}
                    {answer.maxError ? <div className="max-error-container">
                        <div className="max-error-plusmn">&plusmn;</div>
                        <NumberInput placeholder={0}
                            value={answers[i]["maxError"]}
                            format={_.last(answer.answerForms)}
                            onChange={this.updateAnswer(i, "maxError")} />
                    </div> : null}
                    <div className="value-divider" />
                    <a href="javascript:void(0)"
                      className={"answer-status " + answer.status}
                      onClick={this.onStatusChange.bind(this, i)}
                      onKeyDown={(e) => {if (e.key === " ") {
                        e.preventDefault(); // prevent page shifting
                        this.onStatusChange(i);
                      }}}>
                        {answer.status}
                    </a>
                    <a href="javascript:void(0)"
                       className="options-toggle"
                       onClick={this.onToggleOptions.bind(this, i)}
                       onKeyDown={(e) => {if (e.key === " ") {
                        e.preventDefault(); // prevent page shifting
                        this.onToggleOptions(i);
                      }}}>
                       <i className="icon-gear" />
                    </a>
                </div>
                <div className="input-answer-editor-message">{editor}</div>
                {this.state.showOptions[i] &&
                    <div className="options-container">
                        {maxError(i)}
                        {answer.status === "correct" && unsimplifiedAnswers(i)}
                        {suggestedAnswerTypes(i)}
                    </div>}
            </div>;
        });

        return <div className="perseus-input-number-editor">
            <div className="ui-title">User input</div>
            <div className="msg-title">Message shown to user on attempt</div>
            {generateInputAnswerEditors()}
            {inputSize}
        </div>;

    },

    onToggleOptions: function(choiceIndex) {
        var showOptions = this.state.showOptions.slice();
        showOptions[choiceIndex] = !showOptions[choiceIndex];
        this.setState({showOptions: showOptions});
    },

    onStatusChange: function(choiceIndex) {
        var statuses = ["wrong", "ungraded", "correct"];
        var lastAnswer = initAnswer(this.state.lastStatus);
        var answers = this.props.answers.concat(lastAnswer);
        var i = _.indexOf(statuses, answers[choiceIndex].status);
        var newStatus = statuses[(i + 1) % 3];

        // If we change the status of the new (phantom) answer
        if (choiceIndex === answers.length - 1) {
            this.setState({lastStatus: newStatus});
        } else {
            this.updateAnswer(choiceIndex, {
                status: newStatus,
                simplify: newStatus === "correct" ? "required" : "accepted"
            });
        }
    },

    updateAnswer: function(choiceIndex, update) {
        if (!_.isObject(update)) {
            return _.partial((choiceIndex, key, value) => {
                var update = {};
                update[key] = value;
                this.updateAnswer(choiceIndex, update);
            }, choiceIndex, update);
        }
        var lastAnswer = initAnswer(this.state.lastStatus);
        var answers = this.props.answers.concat(lastAnswer);
        answers[choiceIndex] = _.extend({}, answers[choiceIndex], update);
        this.updateAllAnswers(answers);
    },

    updateAllAnswers: function(newAnswers) {
        // Filter out all the empty answers
        var answers = _.filter(newAnswers, (c) => {
            return c.value != null || (c.message != null && c.message !== "");
        });

        var sortedAnswers = ([]).concat(
            _.where(answers, {status: "correct"}),
            _.where(answers, {status: "ungraded"}),
            _.where(answers, {status: "wrong"})
        );
        this.props.onChange({answers: sortedAnswers});
    }
});

var unionAnswerForms = function(answerFormsList) {
    var set = {};
    _.each(answerFormsList, (answerForms) => {
        _.each(answerForms, (form) => {
            set[form] = true;
        });
    });
    // Make sure to keep the order of forms in formExamples
    return _.filter(_.keys(formExamples), (form) => set[form] === true);
};

var propsTransform = function(editorProps) {
    var rendererProps = _.extend(
        _.omit(editorProps, "answers"),
        {
            answerForms: unionAnswerForms(
                _.pluck(editorProps.answers, "answerForms")
            )
        }
    );
    return rendererProps;
};

module.exports = {
    name: "numeric-input",
    displayName: "Number text box (new)",
    widget: NumericInput,
    editor: NumericInputEditor,
    transform: propsTransform
};
