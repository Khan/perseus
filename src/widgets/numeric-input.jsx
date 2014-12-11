var React         = require('react');
var _ = require("underscore");

var Changeable    = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var InfoTip = require("react-components/info-tip.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var NumberInput = require("../components/number-input.jsx");
var ButtonGroup = require("react-components/button-group.jsx");
var MultiButtonGroup = require("react-components/multi-button-group.jsx");
var InputWithExamples = require("../components/input-with-examples.jsx");
var ParseTex = require("../tex-wrangler.js").parseTex;

var ApiClassNames   = require("../perseus-api.jsx").ClassNames;
var ApiOptions      = require("../perseus-api.jsx").Options;
var EnabledFeatures = require("../enabled-features.jsx");

var Editor = require("../editor.jsx");

var firstNumericalParse = require("../util.js").firstNumericalParse;

var answerFormButtons = [
    {title: "Integers", value: "integer", content: "6"},
    {title: "Decimals", value: "decimal", content: "0.75"},
    {title: "Proper fractions", value: "proper", content: "\u2157"},
    {title: "Improper fractions", value: "improper",
        content: "\u2077\u2044\u2084"},
    {title: "Mixed numbers", value: "mixed", content: "1\u00BE"},
    {title: "Numbers with \u03C0", value: "pi", content: "\u03C0"}
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
        currentValue: React.PropTypes.string,
        enabledFeatures: EnabledFeatures.propTypes,
        reviewModeRubric: React.PropTypes.object,
    },

    getDefaultProps: function() {
        return {
            currentValue: "",
            size: "normal",
            enabledFeatures: EnabledFeatures.defaults,
            apiOptions: ApiOptions.defaults,
            coefficient: false,
            answerForms: [],
        };
    },

    render: function() {
        // HACK(johnsullivan): Create a function with shared logic between this
        // and InputNumber.
        var rubric = this.props.reviewModeRubric;
        if (rubric) {
            var score = this.simpleValidate(rubric);
            var correct = score.type === "points" &&
                          score.earned === score.total;

            var answerBlurb = null;
            if (!correct) {
                var correctAnswers = _.filter(
                    rubric.answers, (answer) => answer.status === "correct");
                var answerComponents = _.map(correctAnswers, (answer, key) => {
                    // Figure out how this answer is supposed to be displayed
                    var format = "decimal";
                    if (answer.answerForms && answer.answerForms[0]) {
                        // NOTE(johnsullivan): This isn't exactly ideal, but
                        // it does behave well for all the currently known
                        // problems. See D14742 for some discussion on
                        // alternate strategies.
                        format = answer.answerForms[0]
                    }

                    var answerString = KhanUtil.toNumericString(answer.value,
                                                                format);
                    if (answer.maxError) {
                        answerString += " \u00B1 " +
                            KhanUtil.toNumericString(answer.maxError, format);
                    }
                    return <span key={key} className="perseus-possible-answer">
                        {answerString}
                    </span>
                });
                answerBlurb = <span className="perseus-possible-answers">
                    {answerComponents}
                </span>;
            }
        }

        var classes = {};
        classes["perseus-input-size-" + this.props.size] = true;
        classes[ApiClassNames.CORRECT] =
            rubric && correct && this.props.currentValue;
        classes[ApiClassNames.INCORRECT] =
            rubric && !correct && this.props.currentValue;
        classes[ApiClassNames.UNANSWERED] = rubric && !this.props.currentValue;

        var input = <InputWithExamples
            ref="input"
            value={this.props.currentValue}
            onChange={this.handleChange}
            className={React.addons.classSet(classes)}
            type={this._getInputType()}
            examples={this.examples()}
            shouldShowExamples={this.shouldShowExamples()}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur} />;

        if (answerBlurb) {
            return <span className="perseus-input-with-answer-blurb">
                {input}
                {answerBlurb}
            </span>;
        } else {
            return input;
        }
    },

    handleChange: function(newValue) {
        // TODO(johnsullivan): It would be better to support this lower down so
        // that the input element actually gets marked with the disabled
        // attribute. Because of how many layers of widgets are below us
        // though, and because we're using CSS to disable click events (only
        // unsupported on IE 10), I'm calling this sufficient for now.
        if (!this.props.apiOptions.readOnly) {
            this.props.onChange({ currentValue: newValue });
        }
    },

    _getInputType: function() {
        if (this.props.apiOptions.staticRender) {
            return "tex";
        } else {
            return "text";
        }
    },

    _handleFocus: function() {
        this.props.onFocus([]);
    },

    _handleBlur: function() {
        this.props.onBlur([]);
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    focusInputPath: function(inputPath) {
        this.refs.input.focus();
    },

    blurInputPath: function(inputPath) {
        this.refs.input.blur();
    },

    getInputPaths: function() {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        return [[]];
    },

    getGrammarTypeForPath: function(inputPath) {
        return "number";
    },

    setInputValue: function(path, newValue, cb) {
        this.props.onChange({
            currentValue: newValue
        }, cb);
    },

    getUserInput: function() {
        return {currentValue: this.props.currentValue};
    },

    simpleValidate: function(rubric) {
        return NumericInput.validate(this.getUserInput(), rubric);
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

        // We may have received TeX; try to parse it before grading.
        // If `currentValue` is not TeX, this should be a no-op.
        var currentValue = ParseTex(state.currentValue);

        // Look through all correct answers for one that matches either
        // precisely or approximately and return the appropriate message:
        // - if precise, return the message that the answer came with
        // - if it needs to be simplified, etc., show that message
        var correctAnswers = _.where(rubric.answers, {status: "correct"});
        var result = _.find(_.map(correctAnswers, (answer) => {
            // The coefficient is an attribute of the widget
            var localValue = currentValue;
            if (rubric.coefficient) {
                if (localValue == "") {
                    localValue = 1;
                }
                else if (localValue == "-") {
                    localValue = -1;
                }
            }

            var validate = createValidator(answer);
            return validate(localValue);
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
                 return validate(currentValue).correct;
             });
            result = {
                empty: match ? match.status === "ungraded" : false,
                correct: match ? match.status === "correct" : false,
                message: match ? match.message : null,
                guess: currentValue
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
    mixins: [EditorJsonify, Changeable],

    getDefaultProps: function() {
        return {
            answers: [initAnswer("correct")],
            size: "normal",
            coefficient: false
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
            <NumberInput label="Max error"
                className="max-error"
                value={answers[i]["maxError"]}
                onChange={this.updateAnswer(i, "maxError")}
                placeholder="0" />
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

        var coefficientCheck = <div>
            <div className="perseus-widget-row">
                <PropCheckBox label="Coefficient"
                    coefficient={this.props.coefficient}
                    onChange={this.props.onChange} />
                <InfoTip>
                    <p>A coefficient style number allows the student to use - for -1 and an empty string to mean 1.</p>
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
                        onKeyDown={(e) => this.onSpace(e, this.onStatusChange, i)}>
                        {answer.status}
                    </a>
                    <a
                        href="javascript:void(0)"
                        className="answer-trash"
                        onClick={() => this.onTrashAnswer(i)}
                        onKeyDown={(e) => this.onSpace(e, this.onTrashAnswer, i)}>
                      <span className="icon-trash" />
                    </a>
                    <a href="javascript:void(0)"
                        className="options-toggle"
                        onClick={() => this.onToggleOptions(i)}
                        onKeyDown={(e) => this.onSpace(e, this.onToggleOptions, i)}>
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
            {addAnswerButton}
            {inputSize}
            {coefficientCheck}
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

        // Don't bother to make a new answer box unless we are editing the last one
        // TODO(michelle): This might not be necessary anymore.
        if (choiceIndex == answers.length) {
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
        if (_.contains(_.pluck(this.props.answers, "value"), "")) {
            return ["Warning: one or more answers is empty."];
        }
        return [];
    },
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
    displayName: "Number text box",
    widget: NumericInput,
    editor: NumericInputEditor,
    transform: propsTransform
};
