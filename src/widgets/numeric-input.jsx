/* eslint-disable brace-style, comma-dangle, indent, no-undef, no-var, object-curly-spacing, react/forbid-prop-types, react/prop-types, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var classNames = require("classnames");
var React = require("react");
var _ = require("underscore");
const {StyleSheet, css} = require("aphrodite");
const styleConstants = require("../styles/constants.js");

var InputWithExamples = require("../components/input-with-examples.jsx");
const SimpleKeypadInput = require("../components/simple-keypad-input.jsx");
var ParseTex = require("../tex-wrangler.js").parseTex;
var PossibleAnswers = require("../components/possible-answers.jsx");

var ApiClassNames = require("../perseus-api.jsx").ClassNames;
var ApiOptions = require("../perseus-api.jsx").Options;
const KhanAnswerTypes = require("../util/answer-types.js");
const KhanMath = require("../util/math.js");
const {keypadElementPropType} = require("../../math-input").propTypes;
const {
    linterContextProps,
    linterContextDefault,
} = require("../gorgon/proptypes.js");
const {iconDropdownArrow} = require("../icon-paths.js");
const InlineIcon = require("../components/inline-icon.jsx");

var answerFormButtons = [
    {title: "Integers", value: "integer", content: "6"},
    {title: "Decimals", value: "decimal", content: "0.75"},
    {title: "Proper fractions", value: "proper", content: "\u2157"},
    {
        title: "Improper fractions",
        value: "improper",
        content: "\u2077\u2044\u2084",
    },
    {title: "Mixed numbers", value: "mixed", content: "1\u00BE"},
    {title: "Numbers with \u03C0", value: "pi", content: "\u03C0"},
];

var formExamples = {
    integer: () => i18n._("an integer, like $6$"),
    proper: form =>
        form.simplify === "optional"
            ? i18n._("a *proper* fraction, like $1/2$ or $6/10$")
            : i18n._("a *simplified proper* fraction, like $3/5$"),
    improper: form =>
        form.simplify === "optional"
            ? i18n._("an *improper* fraction, like $10/7$ or $14/8$")
            : i18n._("a *simplified improper* fraction, like $7/4$"),
    mixed: () => i18n._("a mixed number, like $1\\ 3/4$"),
    decimal: () => i18n._("an *exact* decimal, like $0.75$"),
    pi: () =>
        i18n._(
            "a multiple of pi, like $12\\ \\text{pi}$ or " +
                "$2/3\\ \\text{pi}$"
        ),
};

var NumericInput = React.createClass({
    propTypes: {
        currentValue: React.PropTypes.string,
        currentMultipleValues: React.PropTypes.arrayOf(React.PropTypes.string),
        size: React.PropTypes.oneOf(["normal", "small"]),
        apiOptions: ApiOptions.propTypes,
        coefficient: React.PropTypes.bool,
        answerForms: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                simplify: React.PropTypes.oneOf(["required", "optional"])
                    .isRequired,
            })
        ),
        keypadElement: keypadElementPropType,
        labelText: React.PropTypes.string,
        reviewModeRubric: React.PropTypes.object,
        trackInteraction: React.PropTypes.func.isRequired,
        widgetId: React.PropTypes.string.isRequired,
        linterContext: linterContextProps,
        multipleNumberInput: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            currentValue: "",
            // currentMultipleValues has an empty string, because if finite
            // solutions is chosen, there must be at least 1 answer
            currentMultipleValues: [""],
            size: "normal",
            apiOptions: ApiOptions.defaults,
            coefficient: false,
            answerForms: [],
            labelText: "",
            linterContext: linterContextDefault,
            multipleNumberInput: false,
        };
    },

    getInitialState: function() {
        return {
            // dropdown option: either no-solutions or finite-solutions
            numSolutions: "no-solutions",
            // keeps track of the other set of values when switching
            // between 0 and finite solutions
            previousValues: [""],
        };
    },

    getAnswerBlurb: function(rubric) {
        var correct;
        var answerBlurb;
        if (this.props.apiOptions.satStyling && rubric) {
            var score = this.simpleValidate(rubric);
            correct = score.type === "points" && score.earned === score.total;

            if (!correct) {
                var correctAnswers = _.filter(
                    rubric.answers,
                    answer => answer.status === "correct"
                );
                var answerStrings = _.map(correctAnswers, answer => {
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
                        answer.value,
                        format
                    );
                    if (answer.maxError) {
                        answerString +=
                            " \u00B1 " +
                            KhanMath.toNumericString(answer.maxError, format);
                    }
                    return answerString;
                });
                answerBlurb = <PossibleAnswers answers={answerStrings} />;
            }
        }
        return [answerBlurb, correct];
    },

    getClasses: function(correct, rubric) {
        const classes = {};
        classes["perseus-input-size-" + this.props.size] = true;
        classes[ApiClassNames.CORRECT] =
            rubric && correct && this.props.currentValue;
        classes[ApiClassNames.INCORRECT] =
            rubric && !correct && this.props.currentValue;
        classes[ApiClassNames.UNANSWERED] = rubric && !this.props.currentValue;
        return classes;
    },

    render: function() {
        const rubric = this.props.reviewModeRubric;
        const answers = this.getAnswerBlurb(rubric);
        const answerBlurb = answers[0];
        const correct = answers[1];
        const classes = this.getClasses(correct, rubric);

        var labelText = this.props.labelText;
        if (labelText == null || labelText === "") {
            labelText = i18n._("Your answer:");
        }

        var selectClasses = classNames({
            "perseus-widget-dropdown": true,
        });

        const dropdown = <div>
            <select
                onChange={this.handleNumSolutionsChange}
                className={selectClasses +
                    " " + css(styles.dropdown) +
                    " " + ApiClassNames.INTERACTIVE}
                value={this.state.numSolutions}
            >
                <option value="no-solutions">
                    {i18n._("0 solutions")}
                </option>
                <option value="finite-solutions">
                    {i18n._("Finite solutions")}
                </option>
            </select>
            <InlineIcon
                {...iconDropdownArrow}
                style={{
                    marginLeft: -24,
                    height: 24,
                    width: 24,
                }}
            />
        </div>;

        var input;
        if (this.props.multipleNumberInput) {
            if (this.state.numSolutions === "no-solutions") {
                return dropdown;
            } else {
                const addInput = (
                    <div
                        className={css(styles.addInputButton)}
                        onClick={this._addInput}
                    >
                        +
                    </div>
                );

                input = <div>
                    {this.props.currentMultipleValues.map((item, i) =>
                        <div
                            key={i}
                            className={css(styles.numberInputContainer)}
                        >
                            {i > 0 && <div
                                className={css(styles.removeInputButton)}
                                onClick={evt => this._removeInput(i, evt)}
                                aria-label="Remove this answer"
                            >
                                    -
                                </div>
                            }
                            {this.props.apiOptions.customKeypad ?
                            <SimpleKeypadInput
                                ref="input"
                                value={this.props.currentMultipleValues[i]}
                                keypadElement={this.props.keypadElement}
                                onChange={
                                    e => this.handleMultipleInputChange(i, e)}
                                onFocus={this._handleFocus}
                                onBlur={this._handleBlur}
                            /> :
                            <InputWithExamples
                                ref="input"
                                value={this.props.currentMultipleValues[i]}
                                onChange={
                                    e => this.handleMultipleInputChange(i, e)}
                                className={classNames(
                                    classes, css(styles.numberInput))}
                                labelText={labelText}
                                type={this._getInputType()}
                                examples={this.examples()}
                                shouldShowExamples={this.shouldShowExamples()}
                                onFocus={this._handleFocus}
                                onBlur={this._handleBlur}
                                id={this.props.widgetId}
                                disabled={this.props.apiOptions.readOnly}
                                highlightLint={this.props.highlightLint}
                            />}
                        </div>)
                    }
                    {addInput}
                    Add answer
                </div>;
            }
        } else {
            if (this.props.apiOptions.customKeypad) {
                // TODO(charlie): Support "Review Mode".
                return (
                    <SimpleKeypadInput
                        ref="input"
                        value={this.props.currentValue}
                        keypadElement={this.props.keypadElement}
                        onChange={this.handleChange}
                        onFocus={this._handleFocus}
                        onBlur={this._handleBlur}
                    />
                );
            } else {
                input = (
                    <InputWithExamples
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
                        highlightLint={this.props.highlightLint}
                    />
                );
            }
        }

        if (answerBlurb) {
            return <span className="perseus-input-with-answer-blurb">
                {this.props.multipleNumberInput && dropdown}
                {input}
                {answerBlurb}
            </span>;
        } else if (this.props.apiOptions.satStyling) {
            // NOTE(amy): the input widgets themselves already have
            // a default aria label of "Your Answer", so we hide this
            // redundant label from screen-readers.
            return <label
                className="perseus-input-with-label"
                aria-hidden="true"
            >
                <span className="perseus-input-label">
                    {i18n.i18nDoNotTranslate("Answer:")}
                </span>
                {this.props.multipleNumberInput && dropdown}
                {input}
            </label>;
        } else {
            return <div>
                {this.props.multipleNumberInput && dropdown}
                {input}
            </div>;
        }
    },

    handleChange: function(newValue, cb) {
        this.props.onChange({currentValue: newValue}, cb);
        this.props.trackInteraction();
    },

    handleMultipleInputChange: function(index, newValue) {
        const newValues = this.props.currentMultipleValues.slice();
        newValues[index] = newValue;
        this.props.onChange({
            currentMultipleValues: newValues,
        });
        this.props.trackInteraction();
    },

    handleNumSolutionsChange: function(event) {
        const newValue = event.target.value;
        this.setState({numSolutions: newValue});

        // Saves the values the user entered when switching between no
        // solutions and finite solutions, however, we also correctly update
        // the answer that is to be graded
        if (newValue === "no-solutions") {
            this.setState({
                previousValues: this.props.currentMultipleValues,
            });
            this.props.onChange({
                currentMultipleValues: [],
            });

        } else {
            this.props.onChange({
                currentMultipleValues: this.state.previousValues,
            });
            this.setState({
                previousValues: [],
            });
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
        // HACK(kevinb): We want to dismiss the feedback popover that webapp
        // displays as soon as a user clicks in in the input field so we call
        // interactionCallback directly.
        const {interactionCallback} = this.props.apiOptions;
        if (interactionCallback) {
            interactionCallback();
        }
    },

    _handleBlur: function() {
        this.props.onBlur([]);
    },

    _addInput: function() {
        // Add a new blank value to the list of current values
        this.props.onChange({
            currentMultipleValues: this.props.currentMultipleValues.concat([
                "",
            ]),
        });
    },

    _removeInput: function(i, event) {
        const length = this.props.currentMultipleValues.length;
        const newValues = this.props.currentMultipleValues.slice(0, i).concat(
            this.props.currentMultipleValues.slice(i + 1, length));
        this.props.onChange({
            currentMultipleValues: newValues,
        });
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
        this.props.onChange(
            {
                currentValue: newValue,
            },
            cb
        );
    },

    getUserInput: function() {
        const multiple = this.props.multipleNumberInput;
        return {
            multInput: multiple,
            currentValue: multiple
                ? this.props.currentMultipleValues
                : this.props.currentValue,
        };
    },

    simpleValidate: function(rubric) {
        return NumericInput.validate(this.getUserInput(), rubric);
    },

    shouldShowExamples: function() {
        var noFormsAccepted = this.props.answerForms.length === 0;
        // To check if all answer forms are accepted, we must first
        // find the *names* of all accepted forms, and see if they are
        // all present, ignoring duplicates
        var answerFormNames = _.uniq(
            this.props.answerForms.map(form => form.name)
        );
        var allFormsAccepted = answerFormNames.length >= _.size(formExamples);
        return !noFormsAccepted && !allFormsAccepted;
    },

    examples: function() {
        // if the set of specified forms are empty, allow all forms
        var forms =
            this.props.answerForms.length !== 0
                ? this.props.answerForms
                : _.map(_.keys(formExamples), name => {
                      return {
                          name: name,
                          simplify: "required",
                      };
                  });

        var examples = _.map(forms, form => {
            return formExamples[form.name](form);
        });
        // Ensure no duplicate tooltip text from simplified and unsimplified
        // versions of the same format
        examples = _.uniq(examples);

        return [i18n._("**Your answer should be** ")].concat(examples);
    },
});

_.extend(NumericInput, {
    validate: function(state, rubric) {
        var allAnswerForms = _.pluck(answerFormButtons, "value");

        var createValidator = answer =>
            KhanAnswerTypes.number.createValidatorFunctional(answer.value, {
                message: answer.message,
                simplify:
                    answer.status === "correct" ? answer.simplify : "optional",
                inexact: true, // TODO(merlob) backfill / delete
                maxError: answer.maxError,
                forms:
                    answer.strict &&
                    answer.answerForms &&
                    answer.answerForms.length !== 0
                        ? answer.answerForms
                        : allAnswerForms,
            });

        // We may have received TeX; try to parse it before grading.
        // If `currentValue` is not TeX, this should be a no-op.
        var currentValue = ParseTex(state.currentValue);
        var correctAnswers = _.where(rubric.answers, {status: "correct"});

        if (state.multInput) {
            // sort the answers and the solutions so they can be compared
            var sortedInputs = currentValue.split(",").sort();
            correctAnswers.sort((a, b) => {
                return a.value > b.value ? 1 : -1;
            });

            // If the number of correct answers and user answers do not match
            // return early that the answer is wrong
            if (sortedInputs.length !== correctAnswers.length) {
                return {
                    type: "points",
                    earned: 0,
                    total: 1,
                    message: "Incorrect number of answers",
                };
            }

            // Look through all correct answers and make sure there is
            // the correct user answer for each
            var correct = true;
            var message;
            correctAnswers.forEach(function(answer, i) {
                var localValue = sortedInputs[i];
                if (rubric.coefficient) {
                    if (!localValue) {
                        localValue = 1;
                    } else if (localValue === "-") {
                        localValue = -1;
                    }
                }
                var validate = createValidator(answer);
                const status = validate(localValue);
                correct = correct && status.correct;
                if (status.message) {
                    message = status.message;
                }
            });

            return {
                type: "points",
                earned: correct ? 1 : 0,
                total: 1,
                message: message,
            };
        } else {
            // Look through all correct answers for one that matches either
            // precisely or approximately and return the appropriate message:
            // - if precise, return the message that the answer came with
            // - if it needs to be simplified, etc., show that message
            var result = _.find(
                _.map(correctAnswers, answer => {
                    // The coefficient is an attribute of the widget
                    var localValue = currentValue;
                    if (rubric.coefficient) {
                        if (!localValue) {
                            localValue = 1;
                        } else if (localValue === "-") {
                            localValue = -1;
                        }
                    }
                    var validate = createValidator(answer);
                    return validate(localValue);
                }),
                match => match.correct || match.empty
            );

            if (!result) {
                // Otherwise, if the guess is not correct
                var otherAnswers = [].concat(
                    _.where(rubric.answers, {status: "ungraded"}),
                    _.where(rubric.answers, {status: "wrong"})
                );

                // Look through all other answers and if one matches either
                // precisely or approximately return the answer's message
                const match = _.find(otherAnswers, answer => {
                    var validate = createValidator(answer);
                    return validate(currentValue).correct;
                });
                result = {
                    empty: match ? match.status === "ungraded" : false,
                    correct: match ? match.status === "correct" : false,
                    message: match ? match.message : null,
                    guess: currentValue,
                };
            }

            // TODO(eater): Seems silly to translate result to this
            // invalid/points thing and immediately translate it
            // back in ItemRenderer.scoreInput()
            if (result.empty) {
                return {
                    type: "invalid",
                    message: result.message,
                };
            } else {
                return {
                    type: "points",
                    earned: result.correct ? 1 : 0,
                    total: 1,
                    message: result.message,
                };
            }
        }
    },
});

// TODO(thomas): Currently we receive a list of lists of acceptable answer types
// and union them down into a single set. It's worth considering whether it
// wouldn't make more sense to have a single set of acceptable answer types for
// a given *problem* rather than for each possible [correct/wrong] *answer*.
// When should two answers to a problem take different answer types?
// See D27790 for more discussion.
var unionAnswerForms = function(answerFormsList) {
    // Takes a list of lists of answer forms, and returns a list of the forms
    // in each of these lists in the same order that they're listed in the
    // `formExamples` forms from above.

    // uniqueBy takes a list of elements and a function which compares whether
    // two elements are equal, and returns a list of unique elements. This is
    // just a helper function here, but works generally.
    var uniqueBy = function(list, iteratee) {
        return _.reduce(
            list,
            (uniqueList, element) => {
                // For each element, decide whether it's already in the list of
                // unique items.
                var inList = _.find(uniqueList, iteratee.bind(null, element));
                if (inList) {
                    return uniqueList;
                } else {
                    return uniqueList.concat([element]);
                }
            },
            []
        );
    };

    // Pull out all of the forms from the different lists.
    var allForms = _.flatten(answerFormsList);
    // Pull out the unique forms using uniqueBy.
    var uniqueForms = uniqueBy(allForms, _.isEqual);
    // Sort them by the order they appear in the `formExamples` list.
    return _.sortBy(uniqueForms, form => {
        return _.keys(formExamples).indexOf(form.name);
    });
};

var propsTransform = function(editorProps) {
    var rendererProps = _.extend(_.omit(editorProps, "answers"), {
        answerForms: unionAnswerForms(
            // Pull out the name of each form and whether that form has
            // required simplification.
            _.map(editorProps.answers, answer => {
                return _.map(answer.answerForms, form => {
                    return {
                        simplify: answer.simplify,
                        name: form,
                    };
                });
            })
        ),
    });

    return rendererProps;
};

const styles = StyleSheet.create({
    addInputButton: {
        cursor: "pointer",
        display: "inline-block",
        border: `2px solid ${styleConstants.kaGreen}`,
        backgroundColor: styleConstants.kaGreen,
        color: styleConstants.white,
        fontSize: 20,
        borderRadius: 15,
        width: 18,
        height: 18,
        marginBottom: 7,
        marginRight: 8,
        marginTop: 3,
        textAlign: "center",
        paddingTop: 1,
    },

    removeInputButton: {
        cursor: "pointer",
        display: "inline-block",
        border: `2px solid ${styleConstants.red}`,
        backgroundColor: styleConstants.red,
        color: styleConstants.white,
        fontSize: 20,
        borderRadius: 15,
        width: 18,
        height: 18,
        marginBottom: 7,
        marginRight: 8,
        marginTop: 4,
        textAlign: "center",
    },

    dropdown: {
        width: 250,
        marginBottom: 10,
        appearance: 'none',
        backgroundColor: 'transparent',
        border: `1px solid ${styleConstants.gray76}`,
        borderRadius: 4,
        boxShadow: 'none',
        fontFamily: styleConstants.baseFontFamily,
        padding: `9px 25px 9px 9px`,

        ':focus': {
            outline: 'none',
            border: `2px solid ${styleConstants.kaGreen}`,
            padding: `8px 25px 8px 8px`,
        },

        ':focus + svg': {
            color: `${styleConstants.kaGreen}`,
        },

        ':disabled': {
            color: styleConstants.gray68,
        },

        ':disabled + svg' : {
            color: styleConstants.gray68,
        },
    },

    numberInput: {
        float: "right",
        width: 170,
        marginBottom: 10,
        border: `1px solid ${styleConstants.gray76}`,
        borderRadius: 4,
        padding: `9px 25px 9px 9px`,

        ':focus': {
            outline: 'none',
            border: `2px solid ${styleConstants.kaGreen}`,
            padding: `8px 25px 8px 8px`,
        },
    },

    numberInputContainer: {
        display: "flex",
    },
});

module.exports = {
    name: "numeric-input",
    displayName: "Number text box",
    defaultAlignment: "inline-block",
    accessible: true,
    widget: NumericInput,
    transform: propsTransform,
    isLintable: true,
};
