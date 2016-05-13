/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-undef, no-var, react/forbid-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var classNames = require("classnames");
var React = require('react');
var _ = require("underscore");

var InputWithExamples = require("../components/input-with-examples.jsx");
var ParseTex          = require("../tex-wrangler.js").parseTex;
var PossibleAnswers = require("../components/possible-answers.jsx");
const KhanAnswerTypes = require("../util/answer-types.js");
const { KeypadInput } = require("../../math-input").components;
const { configureKeypad } = require("../../math-input").actions;
const { keypadConfigurationPropType } = require("../../math-input").propTypes;
const { KeypadTypes } = require("../../math-input").consts;

var ApiClassNames = require("../perseus-api.jsx").ClassNames;
var ApiOptions = require("../perseus-api.jsx").Options;
var EnabledFeatures = require("../enabled-features.jsx");

var answerTypes = {
    number: {
        name: "Numbers",
        forms: "integer, decimal, proper, improper, mixed"
    },
    decimal: {
        name: "Decimals",
        forms: "decimal"
    },
    integer: {
        name: "Integers",
        forms: "integer"
    },
    rational: {
        name: "Fractions and mixed numbers",
        forms: "integer, proper, improper, mixed"
    },
    improper: {
        name: "Improper numbers (no mixed)",
        forms: "integer, proper, improper"
    },
    mixed: {
        name: "Mixed numbers (no improper)",
        forms: "integer, proper, mixed"
    },
    percent: {
        name: "Numbers or percents",
        forms: "integer, decimal, proper, improper, mixed, percent"
    },
    pi: {
        name: "Numbers with pi", forms: "pi"
    }
};

var formExamples = {
    "integer": function(options) { return i18n._("an integer, like $6$"); },
    "proper": function(options) {
        if (options.simplify === "optional") {
            return i18n._("a *proper* fraction, like $1/2$ or $6/10$");
        } else {
            return i18n._("a *simplified proper* fraction, like $3/5$");
        }
    },
    "improper": function(options) {
        if (options.simplify === "optional") {
            return i18n._("an *improper* fraction, like $10/7$ or $14/8$");
        } else {
            return i18n._("a *simplified improper* fraction, like $7/4$");
        }
    },
    "mixed": function(options) {
        return i18n._("a mixed number, like $1\\ 3/4$");
    },
    "decimal": function(options) {
        return i18n._("an *exact* decimal, like $0.75$");
    },
    "percent": function(options) {
        return i18n._("a percent, like $12.34\\%$");
    },
    "pi": function(options) {
        return i18n._("a multiple of pi, like $12\\ \\text{pi}$ or " +
                "$2/3\\ \\text{pi}$");
    }
};

var InputNumber = React.createClass({
    propTypes: {
        answerType: React.PropTypes.oneOf(Object.keys(answerTypes)),
        currentValue: React.PropTypes.string,
        enabledFeatures: EnabledFeatures.propTypes,
        keypadConfiguration: keypadConfigurationPropType,
        reviewModeRubric: React.PropTypes.object,
        widgetId: React.PropTypes.string.isRequired,
    },

    getDefaultProps: function() {
        return {
            currentValue: "",
            size: "normal",
            answerType: "number",
            enabledFeatures: EnabledFeatures.defaults,
            apiOptions: ApiOptions.defaults
        };
    },

    shouldShowExamples: function() {
        return this.props.enabledFeatures.toolTipFormats &&
                this.props.answerType !== "number" &&
                !this.props.apiOptions.staticRender;
    },

    render: function() {
        if (this.props.apiOptions.customKeypad) {
            // TODO(charlie): Support "Review Mode".
            return <KeypadInput
                ref="input"
                value={this.props.currentValue}
                onChange={this.handleChange}
                onFocus={() => {
                    configureKeypad(this.props.keypadConfiguration);
                    this._handleFocus();
                }}
                onBlur={this._handleBlur}
            />;
        } else {
            // HACK(johnsullivan): Create a function with shared logic between
            // this and NumericInput.
            var rubric = this.props.reviewModeRubric;
            var correct = null;
            var answerBlurb = null;
            if (rubric) {
                var score = this.simpleValidate(rubric);
                correct = score.type === "points" &&
                              score.earned === score.total;

                if (!correct) {
                    // TODO(johnsullivan): Make this a little more
                    // human-friendly.
                    var answerString = String(rubric.value);
                    if (rubric.inexact && rubric.maxError) {
                        answerString += " \u00B1 " + rubric.maxError;
                    }
                    var answerStrings = [answerString];
                    answerBlurb = <PossibleAnswers answers={answerStrings} />;
                }
            }

            var classes = {};
            classes["perseus-input-size-" + this.props.size] = true;
            classes[ApiClassNames.CORRECT] =
                rubric && correct && this.props.currentValue;
            classes[ApiClassNames.INCORRECT] =
                rubric && !correct && this.props.currentValue;
            classes[ApiClassNames.UNANSWERED] =
                rubric && !this.props.currentValue;

            var input = <InputWithExamples
                ref="input"
                value={this.props.currentValue}
                onChange={this.handleChange}
                className={classNames(classes)}
                type={this._getInputType()}
                examples={this.examples()}
                shouldShowExamples={this.shouldShowExamples()}
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                id={this.props.widgetId}
                disabled={this.props.apiOptions.readOnly}
            />;

            if (answerBlurb) {
                return <span className="perseus-input-with-answer-blurb">
                    {input}
                    {answerBlurb}
                </span>;
            } else {
                return input;
            }
        }
    },

    handleChange: function(newValue, cb) {
        this.props.onChange({ currentValue: newValue }, cb);
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

    getGrammarTypeForPath: function(path) {
        return "number";
    },

    setInputValue: function(path, newValue, cb) {
        this.props.onChange({
            currentValue: newValue
        }, cb);
    },

    getUserInput: function() {
        return {
            currentValue: this.props.currentValue
        };
    },

    simpleValidate: function(rubric, onInputError) {
        onInputError = onInputError || function() { };
        return InputNumber.validate(
            this.getUserInput(),
            rubric,
            onInputError
        );
    },

    examples: function() {
        var type = this.props.answerType;
        var forms = answerTypes[type].forms.split(/\s*,\s*/);

        var examples = _.map(forms, function(form) {
            return formExamples[form](this.props);
        }, this);

        return [i18n._("**Your answer should be** ")].concat(examples);
    }
});

_.extend(InputNumber, {
    validate: function(state, rubric, onInputError) {
        if (rubric.answerType == null) {
            rubric.answerType = "number";
        }
        var val = KhanAnswerTypes.number.createValidatorFunctional(
            rubric.value, {
                simplify: rubric.simplify,
                inexact: rubric.inexact || undefined,
                maxError: rubric.maxError,
                forms: answerTypes[rubric.answerType].forms
            });

        // We may have received TeX; try to parse it before grading.
        // If `currentValue` is not TeX, this should be a no-op.
        var currentValue = ParseTex(state.currentValue);

        var result = val(currentValue);

        // TODO(eater): Seems silly to translate result to this invalid/points
        // thing and immediately translate it back in ItemRenderer.scoreInput()
        if (result.empty) {
            var apiResult = onInputError(
                null, // reserved for some widget identifier
                state.currentValue,
                result.message
            );
            return {
                type: "invalid",
                message: (apiResult === false) ? null : result.message
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

/**
 * Determine the keypad configuration parameters for the input, based on the
 * provided properties.
 *
 * There are two configuration parameters to be determined:
 *   (1) The keypad type. The InputNumber widget will try to use the Fraction,
 *       Number, or Basic Expression keypad (with Pi available) if it has an
 *       explicit `answerType` that makes the choice clear. If no `answerType`
 *       is specified, it again attempts to use the Number keypad if the value
 *       is integer-only, but defaults to using the Basic Expression keypad
 *       (with Pi), as it has no way of knowing whether the answer requires Pi
 *       or just fractions or decimals based on the answer value alone.
 *
 *   (2) The extra keys; namely, any variables or constants (like Pi) that need
 *       to be included as keys on the keypad. The only symbol that the
 *       InputNumber widget would ever need would be Pi.
 */
const keypadConfigurationForProps = (props) => {
    switch (props.answerType) {
        case "number":
            const integersOnly = /^[1-9]+[0-9]*$/.test(props.value);
            if (integersOnly) {
                return {
                    keypadType: KeypadTypes.NUMBER,
                    extraKeys: [],
                };
            }
            return {
                keypadType: KeypadTypes.BASIC_EXPRESSION,
                extraKeys: ["PI"],
            };

        case "pi":
            return {
                keypadType: KeypadTypes.BASIC_EXPRESSION,
                extraKeys: ["PI"],
            };

        case "decimal":
        case "rational":
        case "improper":
        case "mixed":
        case "percent":
            return {
                keypadType: KeypadTypes.FRACTION,
                extraKeys: [],
            };

        case "integer":
            return {
                keypadType: KeypadTypes.NUMBER,
                extraKeys: [],
            };
    }
};

var propTransform = (editorProps) => {
    const { simplify, size, answerType } = editorProps;
    return {
        keypadConfiguration: keypadConfigurationForProps(editorProps),
        simplify,
        size,
        answerType,
    };
};

module.exports = {
    name: "input-number",
    displayName: "Number text box (old)",
    defaultAlignment: "inline-block",
    hidden: true,
    widget: InputNumber,
    transform: propTransform,
};
