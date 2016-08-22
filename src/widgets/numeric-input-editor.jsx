/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-redeclare, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, space-infix-ops */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const _ = require("underscore");

const Changeable    = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const ButtonGroup = require("react-components/button-group.jsx");
const Editor = require("../editor.jsx");
const {iconGear, iconTrash} = require("../icon-paths.js");
const InfoTip = require("../components/info-tip.jsx");
const InlineIcon = require("../components/inline-icon.jsx");
const MultiButtonGroup = require("react-components/multi-button-group.jsx");
const NumberInput = require("../components/number-input.jsx");
const PropCheckBox = require("../components/prop-check-box.jsx");
const TextInput = require("../components/text-input.jsx");

const firstNumericalParse = require("../util.js").firstNumericalParse;

const answerFormButtons = [
    {title: "Integers", value: "integer", content: "6"},
    {title: "Decimals", value: "decimal", content: "0.75"},
    {title: "Proper fractions", value: "proper", content: "\u2157"},
    {title: "Improper fractions", value: "improper",
        content: "\u2077\u2044\u2084"},
    {title: "Mixed numbers", value: "mixed", content: "1\u00BE"},
    {title: "Numbers with \u03C0", value: "pi", content: "\u03C0"}
];

const initAnswer = (status) => {
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

const NumericInputEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    getDefaultProps: function() {
        return {
            answers: [initAnswer("correct")],
            size: "normal",
            coefficient: false,
            labelText: "",
        };
    },

    getInitialState: function() {
        return {
            lastStatus: "wrong",
            showOptions: _.map(this.props.answers, () => false)
        };
    },

    render: function() {
        var answers = this.props.answers;

        var unsimplifiedAnswers = (i) => <div className="perseus-widget-row">
            <label>Unsimplified answers are</label>
            <ButtonGroup value={answers[i]["simplify"]}
                         allowEmpty={false}
                         buttons={[
                            {value: "required", content: "ungraded"},
                            {value: "optional", content: "accepted"},
                            {value: "enforced", content: "wrong"}]}
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
            <label>
                Max error
                {" "}
                <NumberInput
                    className="max-error"
                    value={answers[i]["maxError"]}
                    onChange={this.updateAnswer(i, "maxError")}
                    placeholder="0" />
            </label>
        </div>;

        var inputSize = <div className="perseus-widget-row">
                <label>Width:{' '} </label>
                <ButtonGroup value={this.props.size} allowEmpty={false}
                    buttons={[
                        {value: "normal", content: "Normal (80px)"},
                        {value: "small", content: "Small (40px)"}]}
                    onChange={this.change("size")} />
                <InfoTip>
                    <p>Use size "Normal" for all text boxes, unless there are
                    multiple text boxes in one line and the answer area is too
                    narrow to fit them.</p>
                </InfoTip>
            </div>;

        var labelText = <div className="perseus-widget-row">
                <label>
                    Label text:{' '}
                    <TextInput
                        value={this.props.labelText}
                        onChange={this.change("labelText")} />
                </label>
                <InfoTip>
                    <p>Text to describe this input. This will be shown to users
                    using screenreaders.</p>
                </InfoTip>
            </div>;

        var coefficientCheck = <div>
            <div className="perseus-widget-row">
                <PropCheckBox label="Coefficient"
                    coefficient={this.props.coefficient}
                    onChange={this.props.onChange} />
                <InfoTip>
                    <p>
                        A coefficient style number allows the student to use -
                        for -1 and an empty string to mean 1.
                    </p>
                </InfoTip>
            </div>
        </div>;

        var addAnswerButton = <div>
            <a
                href="javascript:void(0)"
                className="simple-button orange"
                onClick={() => this.addAnswer()}
                onKeyDown={(e) => this.onSpace(e, this.addAnswer)}>
              <span>Add new answer</span>
            </a>
        </div>;

        var instructions = {
            "wrong":    "(address the mistake/misconception)",
            "ungraded": "(explain in detail to avoid confusion)",
            "correct":  "(reinforce the user's understanding)"
        };

        var generateInputAnswerEditors = () => answers.map((answer, i) => {
            var editor = <Editor
                apiOptions={this.props.apiOptions}
                content={answer.message || ""}
                placeholder={"Why is this answer " + answer.status + "?\t" +
                    instructions[answer.status]}
                widgetEnabled={false}
                onChange={(newProps) => {
                    if ("content" in newProps) {
                        this.updateAnswer(i, {message: newProps.content});
                    }
                }} />;
            return <div className="perseus-widget-row" key={i}>
                <div className={"input-answer-editor-value-container" +
                    (answer.maxError ? " with-max-error" : "")}>
                    <NumberInput value={answer.value}
                        className="numeric-input-value"
                        placeholder="answer"
                        format={_.last(answer.answerForms)}
                        onFormatChange={(newValue, format) => {
                            // NOTE(charlie): The mobile web expression editor
                            // relies on this automatic answer form resolution
                            // for determining when to show the Pi symbol. If we
                            // get rid of it, we should also disable Pi for
                            // NumericInput and require problems that use Pi to
                            // build on Expression. Alternatively, we could
                            // store answers as plaintext and parse them to
                            // determine whether or not to reveal Pi on the
                            // keypad (right now, answers are stored as resolved
                            // values, like '0.125' rather than '1/8').
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
                        onClick={() => this.onStatusChange(i)}
                        onKeyDown={(e) =>
                            this.onSpace(e, this.onStatusChange, i)}>
                        {answer.status}
                    </a>
                    <a
                        href="javascript:void(0)"
                        className="answer-trash"
                        onClick={() => this.onTrashAnswer(i)}
                        onKeyDown={(e) =>
                            this.onSpace(e, this.onTrashAnswer, i)}
                    >
                        <InlineIcon {...iconTrash} />
                    </a>
                    <a href="javascript:void(0)"
                        className="options-toggle"
                        onClick={() => this.onToggleOptions(i)}
                        onKeyDown={(e) =>
                            this.onSpace(e, this.onToggleOptions, i)}
                    >
                        <InlineIcon {...iconGear} />
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
            {addAnswerButton}
            {inputSize}
            {coefficientCheck}
            {labelText}
        </div>;

    },

    onToggleOptions: function(choiceIndex) {
        var showOptions = this.state.showOptions.slice();
        showOptions[choiceIndex] = !showOptions[choiceIndex];
        this.setState({showOptions: showOptions});
    },

    onTrashAnswer: function(choiceIndex) {
        if (choiceIndex >= 0 && choiceIndex < this.props.answers.length) {
            var answers = this.props.answers.slice(0);
            answers.splice(choiceIndex, 1);
            this.props.onChange({answers: answers});
        }
    },

    onSpace: function(e, callback) {
        if (e.key === " ") {
            e.preventDefault(); // prevent page shifting
            var args = _.toArray(arguments).slice(2);
            callback.apply(this, args);
        }
    },

    onStatusChange: function(choiceIndex) {
        var statuses = ["wrong", "ungraded", "correct"];
        var answers = this.props.answers;
        var i = _.indexOf(statuses, answers[choiceIndex].status);
        var newStatus = statuses[(i + 1) % statuses.length];

        this.updateAnswer(choiceIndex, {
            status: newStatus,
            simplify: newStatus === "correct" ? "required" : "accepted"
        });
    },

    updateAnswer: function(choiceIndex, update) {
        if (!_.isObject(update)) {
            return _.partial((choiceIndex, key, value) => {
                var update = {};
                update[key] = value;
                this.updateAnswer(choiceIndex, update);
            }, choiceIndex, update);
        }

        var answers = _.clone(this.props.answers);

        // Don't bother to make a new answer box unless we are editing the last
        // one.
        // TODO(oliver): This might not be necessary anymore.
        if (choiceIndex === answers.length) {
            var lastAnswer = initAnswer(this.state.lastStatus);
            var answers = answers.concat(lastAnswer);
        }

        answers[choiceIndex] = _.extend({}, answers[choiceIndex], update);
        this.props.onChange({answers: answers});
    },

    addAnswer: function() {
        var lastAnswer = initAnswer(this.state.lastStatus);
        var answers = this.props.answers.concat(lastAnswer);
        this.props.onChange({answers: answers});
    },

    getSaveWarnings: function() {
        // Filter out all the empty answers
        var warnings = [];
        // TODO(emily): This doesn't actually work, because the value is either
        // null or undefined when undefined, probably.
        if (_.contains(_.pluck(this.props.answers, "value"), "")) {
            warnings.push("One or more answers is empty");
        }
        if (this.props.labelText === "") {
            warnings.push("No label is specified");
        }
        this.props.answers.forEach((answer, i) => {
            var formatError = (answer.strict &&
                (!answer.answerForms || answer.answerForms.length === 0));
            if (formatError) {
                warnings.push(`Answer ${i+1} is set to string format ` +
                              "matching, but no format was selected");
            }
        });
        return warnings;
    },
});

module.exports = NumericInputEditor;
