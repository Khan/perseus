/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, comma-dangle, indent, no-undef, no-var, react/forbid-prop-types, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var classNames = require("classnames");
var React = require('react');
var _ = require("underscore");

var InputWithExamples = require("../components/input-with-examples.jsx");
var ParseTex = require("../tex-wrangler.js").parseTex;
var PossibleAnswers = require("../components/possible-answers.jsx");
const { KeypadInput } = require("../../math-input").components;

var ApiClassNames   = require("../perseus-api.jsx").ClassNames;
var ApiOptions      = require("../perseus-api.jsx").Options;
var EnabledFeatures = require("../enabled-features.jsx");
const KhanAnswerTypes = require("../util/answer-types.js");
const KhanMath = require("../util/math.js");
const { configureKeypad } = require("../../math-input").actions;
const { keypadConfigurationPropType } = require("../../math-input").propTypes;
const { KeypadTypes } = require("../../math-input").consts;

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
    "integer": () => i18n._("an integer, like $6$"),
    "proper": (form) => form.simplify === "optional" ?
        i18n._("a *proper* fraction, like $1/2$ or $6/10$") :
        i18n._("a *simplified proper* fraction, like $3/5$"),
    "improper": (form) => form.simplify === "optional" ?
        i18n._("an *improper* fraction, like $10/7$ or $14/8$") :
        i18n._("a *simplified improper* fraction, like $7/4$"),
    "mixed": () => i18n._("a mixed number, like $1\\ 3/4$"),
    "decimal": () => i18n._("an *exact* decimal, like $0.75$"),
    "pi": () => i18n._("a multiple of pi, like $12\\ \\text{pi}$ or " +
                "$2/3\\ \\text{pi}$")
};

var NumericInput = React.createClass({
    propTypes: {
        currentValue: React.PropTypes.string,
        size: React.PropTypes.oneOf(["normal", "small"]),
        enabledFeatures: EnabledFeatures.propTypes,
        apiOptions: ApiOptions.propTypes,
        coefficient: React.PropTypes.bool,
        answerForms: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            simplify: React.PropTypes.oneOf([
                "required",
                "optional"
            ]).isRequired,
        })),
        keypadConfiguration: keypadConfigurationPropType,
        labelText: React.PropTypes.string,
        reviewModeRubric: React.PropTypes.object,
        trackInteraction: React.PropTypes.func.isRequired,
        widgetId: React.PropTypes.string.isRequired,
    },

    getDefaultProps: function() {
        return {
            currentValue: "",
            size: "normal",
            enabledFeatures: EnabledFeatures.defaults,
            apiOptions: ApiOptions.defaults,
            coefficient: false,
            answerForms: [],
            labelText: "",
        };
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
            // this and InputNumber.
            var correct;
            var answerBlurb;
            var rubric = this.props.reviewModeRubric;
            if (rubric) {
                var score = this.simpleValidate(rubric);
                correct = score.type === "points" &&
                          score.earned === score.total;

                if (!correct) {
                    var correctAnswers = _.filter(
                        rubric.answers, answer => answer.status === "correct");
                    var answerStrings = _.map(correctAnswers, (answer) => {
                        // Figure out how this answer is supposed to be
                        // displayed
                        var format = "decimal";
                        if (answer.answerForms && answer.answerForms[0]) {
                            // NOTE(johnsullivan): This isn't exactly ideal, but
                            // it does behave well for all the currently known
                            // problems. See D14742 for some discussion on
                            // alternate strategies.
                            format = answer.answerForms[0];
                        }

                        var answerString = KhanMath.toNumericString(
                            answer.value, format);
                        if (answer.maxError) {
                            answerString += " \u00B1 " +
                                KhanMath.toNumericString(answer.maxError,
                                    format);
                        }
                        return answerString;
                    });
                    answerBlurb = <PossibleAnswers answers={answerStrings} />;
                }
            }

            var classes = {};
            classes["perseus-input-size-" + this.props.size] = true;
            classes[ApiClassNames.CORRECT] =
                rubric && correct && this.props.currentValue;
            classes[ApiClassNames.INCORRECT] =
                rubric && !correct && this.props.currentValue;
            classes[ApiClassNames.UNANSWERED] = rubric &&
                !this.props.currentValue;

            var labelText = this.props.labelText;
            if (labelText == null || labelText === "") {
                labelText = i18n._("Your answer:");
            }

            var input = <InputWithExamples
                ref="input"
                value={this.props.currentValue}
                onChange={this.handleChange}
                className={classNames(classes)}
                labelText={labelText}
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

    handleChange: function(newValue) {
        this.props.onChange({ currentValue: newValue });
        this.props.trackInteraction();
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
                        this.props.answerForms :
                        _.map(_.keys(formExamples), (name) => {
                            return {
                                name: name,
                                simplify: "required"
                            };
                        });

        var examples = _.map(forms, (form) => {
            return formExamples[form.name](form);
        });

        return [i18n._("**Your answer should be** ")].concat(examples);
    }
});

_.extend(NumericInput, {
    validate: function(state, rubric) {
        var allAnswerForms = _.pluck(answerFormButtons, "value");

        var createValidator = (answer) =>
            KhanAnswerTypes.number.createValidatorFunctional(
                answer.value, {
                    message: answer.message,
                    simplify: answer.status === "correct" ?
                        answer.simplify : "optional",
                    inexact: true, // TODO(merlob) backfill / delete
                    maxError: answer.maxError,
                    forms: (answer.strict && answer.answerForms &&
                            answer.answerForms.length !== 0) ?
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
                if (!localValue) {
                    localValue = 1;
                }
                else if (localValue === "-") {
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

var unionAnswerForms = function(answerFormsList) {
    // Takes a list of lists of answer forms, and returns a list of the forms
    // in each of these lists in the same order that they're listed in the
    // `formExamples` forms from above.

    // uniqueBy takes a list of elements and a function which compares whether
    // two elements are equal, and returns a list of unique elements. This is
    // just a helper function here, but works generally.
    var uniqueBy = function(list, iteratee) {
        return _.reduce(list, (uniqueList, element) => {
            // For each element, decide whether it's already in the list of
            // unique items.
            var inList = _.find(uniqueList, iteratee.bind(null, element));
            if (inList) {
                return uniqueList;
            } else {
                return uniqueList.concat([element]);
            }
        }, []);
    };

    // Pull out all of the forms from the different lists.
    var allForms = _.flatten(answerFormsList);
    // Pull out the unique forms using uniqueBy.
    var uniqueForms = uniqueBy(allForms, _.isEqual);
    // Sort them by the order they appear in the `formExamples` list.
    return _.sortBy(uniqueForms, (form) => {
        return _.keys(formExamples).indexOf(form.name);
    });
};

/**
 * Determine the keypad configuration parameters for the input, based on the
 * provided properties.
 *
 * There are two configuration parameters to be determined:
 *   (1) The keypad type. Typically, the NumericInput widget will use the
 *       Fraction keypad, although if the question requires use of Pi, then
 *       it upgrades to the Basic Expression keypad, and if it only requires
 *       integer input, then it downgrades to the Number keypad.
 *   (2) The extra keys; namely, any variables or constants (like Pi) that need
 *       to be included as keys on the keypad. The only symbol that the
 *       NumericInput widget would ever need would be Pi.
 */
const keypadConfigurationForProps = (props) => {
    // TODO(charlie): These are somewhat hacky and rely on the way that the
    // widget currently stores its input values and answer formats.
    // Specifically, answers are stored as raw values and formats, not as plain
    // text, so we can _only_ detect that an answer is using Pi if it's made
    // explicit in its answer formats. Unfortunately, the answer formats aren't
    // all encompassing in that they don't automatically resolve to the proper
    // values for integer or decimal input (and according to Cam, the content
    // team would like to remove the automatic resolution altogether), so we
    // also need to look at the raw answers to determine if we can get by with
    // integer input alone.
    const values = props.answers.map(answer => answer.value);
    const formNames = props.answers.map(answer => answer.answerForms || [])
        .reduce((a, b) => a.concat(b));

    const includePi = formNames.includes('pi');
    const integersOnly = values.every(value => /^[1-9]+[0-9]*$/.test(value));

    if (includePi) {
        return {
            keypadType: KeypadTypes.BASIC_EXPRESSION,
            extraKeys: ["PI"],
        };
    } else if (integersOnly) {
        return {
            keypadType: KeypadTypes.NUMBER,
            extraSymbols: [],
        };
    } else {
        return {
            keypadType: KeypadTypes.FRACTION,
            extraKeys: [],
        };
    }
};

var propsTransform = function(editorProps) {
    var rendererProps = _.extend(
        _.omit(editorProps, "answers"),
        {
            answerForms: unionAnswerForms(
                // Pull out the name of each form and whether that form has
                // required simplification.
                _.map(editorProps.answers, (answer) => {
                    return _.map(answer.answerForms, (form) => {
                        return {
                            simplify: answer.simplify,
                            name: form
                        };
                    });
                })
            )
        }
    );
    return {
        ...rendererProps,
        keypadConfiguration: keypadConfigurationForProps(editorProps),
    };
};

module.exports = {
    name: "numeric-input",
    displayName: "Number text box",
    defaultAlignment: "inline-block",
    accessible: true,
    widget: NumericInput,
    transform: propsTransform
};
