/** @jsx React.DOM */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var InfoTip = require("react-components/info-tip");
var PropCheckBox = require("../components/prop-check-box.jsx");
var NumberInput = require("../components/number-input.jsx");
var ButtonGroup = require("react-components/button-group");
var MultiButtonGroup = require("../components/multi-button-group.jsx");
var InputWithExamples = require("../components/input-with-examples.jsx");

var Editor = require("../editor.jsx");

var Util = require("../util.js");

var answerFormButtons = [
    {title: "整數", value: "integer", text: "6"},
    {title: "小樹", value: "decimal", text: "0.75"},
    {title: "真分數", value: "proper", text: "\u2157"},
    {title: "假分數", value: "improper",
        text: "\u2077\u2044\u2084"},
    {title: "帶分數", value: "mixed", text: "1\u00BE"},
    {title: "有 \u03C0 的數", value: "pi", text: "\u03C0"}
];

var formExamples = {
    "integer": (options) => $._("整數, 例 $6$"),
    "proper": (options) => options.simplify === "optional" ?
        $._("*真* 分數, 例 $1/2$ or $6/10$") :
        $._("最簡真* 分數, 例 $3/5$"),
    "improper": (options) => options.simplify === "optional" ?
        $._("*假* 分數, 例 $10/7$ or $14/8$") :
        $._("*最簡假* 分數, 例 $7/4$"),
    "mixed": () => $._("帶分數, 例 $1\\ 3/4$"),
    "decimal": () => $._("*精確的* 小數, 例 $0.75$"),
    "pi": () => $._("pi 的倍數, 例 $12\\ \\text{pi}$ or " +
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
        this.props.onChange({ currentValue: Util.asc(newValue) });
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
            <label>未化簡的答案是</label>
            <ButtonGroup value={answers[i]["simplify"]}
                         allowEmpty={false}
                         buttons={[
                            {value: "required", text: "不合適的"},
                            {value: "optional", text: "可接受的"},
                            {value: "enforced", text: "錯誤的"}]}
                         onChange={this.updateAnswer(i, "simplify")} />
            <InfoTip>
                <p>預設是選取「不合適的」。會告訴使用者這個答案是對的但是沒有化簡。
                使用者必須化簡後再重新送出答案，但不會算錯。(適用於五年級以上)</p>
                <p>只有當使用者不知道如何化簡分數時才選取「可接受的」。(適用於五年級以下)</p>
                <p><em>只有</em>在要學會化簡時才選取「錯誤的」。</p>
            </InfoTip>
        </div>;

        var suggestedAnswerTypes = (i) => <div>
            <div className="perseus-widget-row">
                <label>選擇建議的答題格式</label>
                <MultiButtonGroup buttons={answerFormButtons}
                    values={answers[i]["answerForms"]}
                    onChange={this.updateAnswer(i, "answerForms")} />
                <InfoTip>
                    <p>這邊選取的是學生在作答時，會顯示的答題建議格式。這邊會根據輸入的答案自動選取建議的格式。
                        若輸入的答案為「小數、整數」則預設不顯示建議，同時不限制輸入的格式。
                        若輸入的答案為帶有「π」的數值，則預設會顯示如何輸入 pi 的格式建議。
                        若輸入的答案為「帶分數」，則預設會顯示帶分數以及真分數的格式建議。
                        若輸入的答案為「假分數、真分數」，則預設會顯示假分數以及真分數的格式建議。
                        因此若需要特別只顯示某個格式建議，再取消選取即可，一般使用不需要更動。</p>
                    <p>例如，如果想要限制答案 <em>只能是</em> 假分數 (譬如 7/4)，選取
                        「假分數」並把「完全符合」打勾。
                        這樣就 <b>不會</b> 接受輸入的答案為 1.75。</p>
                    <p>除非你需要測試學生的某個技能 (例如：分數)，一般使用請不要特別限制輸入的格式。</p>
                </InfoTip>
            </div>
            <div className="perseus-widget-row">
                <PropCheckBox label="完全符合選取的答題格式"
                    strict={answers[i]["strict"]}
                    onChange={this.updateAnswer.bind(this, i)} />
            </div>
        </div>;

        var maxError = (i) => <div className="perseus-widget-row">
            <NumberInput label="最大誤差"
                className="max-error"
                value={answers[i]["maxError"]}
                onChange={this.updateAnswer(i, "maxError")}
                placeholder="0" />
        </div>;


        var inputSize = <div>
                <label>寬度:{' '} </label>
                <ButtonGroup value={this.props.size} allowEmpty={false}
                    buttons={[
                        {value: "normal", text: "一般 (80px)"},
                        {value: "small", text: "較小 (40px)"}]}
                    onChange={this.change("size")} />
                <InfoTip>
                    <p>預設使用一般大小，除非需要很多個答案格在同一行，會出現放不下的情況。</p>
                </InfoTip>
            </div>;

        var instructions = {
            "wrong":    "(說明這個答案的錯誤之處或迷思概念)",
            "ungraded": "(進一步解釋避免混淆)",
            "correct":  "(加強使用者對觀念的理解)"
        };

        var generateInputAnswerEditors = () => answers.map((answer, i) => {
            var editor = Editor({
                content: answer.message || "",
                placeholder: "為什麼這個答案是" + answer.status + "?\t" +
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
                                value: Util.firstNumericalParse(newValue),
                                answerForms: forms
                            });
                        }}
                        onChange={(newValue) => {
                            this.updateAnswer(i, {
                                value: Util.firstNumericalParse(newValue)});
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
    transform: propsTransform,
    hidden: false
};
