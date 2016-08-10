/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, indent, no-redeclare, no-undef, no-unused-vars, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp, space-before-function-paren */
/* To fix, remove an entry above, run ka-lint, and fix errors. */


var classNames = require("classnames");
var React = require("react");
var ReactDOM = require("react-dom");
var Tooltip = require("react-components/tooltip.jsx");
var _ = require("underscore");

var ApiOptions = require("../perseus-api.jsx").Options;
var Changeable = require("../mixins/changeable.jsx");
var ApiOptions = require("../perseus-api.jsx").Options;
var ApiClassNames = require("../perseus-api.jsx").ClassNames;
const KhanAnswerTypes = require("../util/answer-types.js");

const InlineIcon = require("../components/inline-icon.jsx");
var InputWithExamples = require("../components/input-with-examples.jsx");
var MathInput = require("../components/math-input.jsx");
var TexButtons = require("../components/tex-buttons.jsx");
const { KeypadInput } = require("../../math-input").components;
const {
    keypadConfigurationPropType,
    keypadElementPropType,
} = require("../../math-input").propTypes;
const {KeypadTypes} = require("../../math-input").consts;

const {iconExclamationSign} = require("../icon-paths.js");

var lens = require("../../hubble/index.js");

var ERROR_MESSAGE = i18n._("Sorry, I don't understand that!");

// TODON'T(emily): Don't delete these.
var NO_ANSWERS_WARNING = [
    "An expression without an answer",
    "is no expression to me.",
    "Who can learn from an input",
    "like the one that I see?",
    "Put something in there",
    "won't you please?",
    "A few digits will do -",
    "might I suggest some threes?"
    ].join("\n");
var NO_CORRECT_ANSWERS_WARNING = "This question is probably going to be too " +
    "hard because the expression has no correct answer.";
var SIMPLIFY_WARNING = str => {
    return `"${str}" is required to be simplified but is not considered ` +
        "simplified by our fancy computer algebra system. This will be " +
        "graded as incorrect.";
};
var PARSE_WARNING = str => `"${str}" <- you sure that's math?`;
var NOT_SPECIFIED_WARNING = ix => {
    return `mind filling in answer ${ix}? (the blank one)`;
};

var insertBraces = value => {
    // HACK(alex): Make sure that all LaTeX super/subscripts are wrapped
    // in curly braces to avoid the mismatch between KAS and LaTeX sup/sub
    // parsing.
    //
    // What exactly is this mismatch? Due to its heritage of parsing plain
    // text math from <OldExpression />, KAS parses "x^12" as x^(12).
    // This is both generally what the user expects to happen, and is
    // consistent with other computer algebra systems. It is NOT
    // consistent with LaTeX however, where x^12 is equivalent to x^{1}2.
    //
    // Since the only LaTeX we parse comes from MathQuill, this wouldn't
    // be a problem if MathQuill just always gave us the latter version
    // (with explicit braces). However, instead it always gives the former.
    // This behavior is baked in pretty deep; my naive attempts at changing
    // it triggered all sorts of confusing errors. So instead we just make
    // sure to add in any missing braces before grading MathQuill input.
    //
    // TODO(alex): Properly hack MathQuill to always use explicit braces.
    return value.replace(/([_^])([^{])/g, "$1{$2}");
};

// The new, MathQuill input expression widget
var Expression = React.createClass({
    mixins: [Changeable],

    propTypes: {
        apiOptions: ApiOptions.propTypes,
        buttonSets: TexButtons.buttonSetsType,
        buttonsVisible: React.PropTypes.oneOf(['always', 'never', 'focused']),
        functions: React.PropTypes.arrayOf(React.PropTypes.string),
        keypadConfiguration: keypadConfigurationPropType,
        keypadElement: keypadElementPropType,
        times: React.PropTypes.bool,
        trackInteraction: React.PropTypes.func.isRequired,
        value: React.PropTypes.string,
        widgetId: React.PropTypes.string.isRequired,
    },

    getDefaultProps: function() {
        return {
            value: "",
            times: false,
            functions: [],
            buttonSets: ["basic", "trig", "prealgebra", "logarithms"],
            onFocus: function() { },
            onBlur: function() { },
            apiOptions: ApiOptions.defaults
        };
    },

    getInitialState: function() {
        return {
            showErrorTooltip: false,
            showErrorText: false
        };
    },

    parse: function(value, props) {
        // TODO(jack): Disable icu for content creators here, or
        // make it so that solution answers with ','s or '.'s work
        var options = _.pick(props || this.props, "functions");
        if (window.icu && window.icu.getDecimalFormatSymbols) {
            _.extend(options, window.icu.getDecimalFormatSymbols());
        }
        return KAS.parse(insertBraces(value), options);
    },

    render: function() {
        if (this.props.apiOptions.customKeypad) {
            return <KeypadInput
                ref="input"
                value={this.props.value}
                keypadElement={this.props.keypadElement}
                onChange={this.changeAndTrack}
                onFocus={() => {
                    this.props.keypadElement.configure(
                        this.props.keypadConfiguration, () => {
                            if (this.isMounted()) {
                                this._handleFocus();
                            }
                        }
                    );
                }}
                onBlur={this._handleBlur}
            />;
        } else if (this.props.apiOptions.staticRender) {
            // To make things slightly easier, we just use an InputWithExamples
            // component to handle the static rendering, which is the same
            // component used by InputNumber and NumericInput
            return <InputWithExamples
                ref="input"
                value={this.props.value}
                type={"tex"}
                examples={[]}
                shouldShowExamples={false}
                onChange={this.changeAndTrack}
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                id={this.props.widgetId}
            />;
        } else {
            // TODO(alex): Style this tooltip to be more consistent with other
            // tooltips on the site; align to left middle (once possible)
            var errorTooltip = <span className="error-tooltip">
                <Tooltip
                        className="error-text-container"
                        horizontalPosition="right"
                        horizontalAlign="left"
                        verticalPosition="top"
                        arrowSize={10}
                        borderColor="#fcc335"
                        show={this.state.showErrorText} >
                    <span
                        className="error-icon"
                        onMouseEnter={() => {
                            this.setState({showErrorText: true});
                        }}
                        onMouseLeave={() => {
                            this.setState({showErrorText: false});
                        }}
                        onClick={() => {
                            // TODO(alex): Better error feedback for mobile
                            this.setState({
                                showErrorText: !this.state.showErrorText
                            });
                        }}
                    >
                        <InlineIcon {...iconExclamationSign} />
                    </span>
                    <div className="error-text">
                        {ERROR_MESSAGE}
                    </div>
                </Tooltip>
            </span>;

            var className = classNames({
                "perseus-widget-expression": true,
                "show-error-tooltip": this.state.showErrorTooltip
            });

            return <span className={className}>
                <MathInput
                    ref="input"
                    className={ApiClassNames.INTERACTIVE}
                    value={this.props.value}
                    onChange={this.changeAndTrack}
                    convertDotToTimes={this.props.times}
                    buttonsVisible={this.props.buttonsVisible || "focused"}
                    buttonSets={this.props.buttonSets}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur} />
                {this.state.showErrorTooltip && errorTooltip}
            </span>;
        }
    },

    changeAndTrack: function(e, cb) {
        this.change("value", e, cb);
        this.props.trackInteraction();
    },

    _handleFocus: function() {
        this.props.onFocus([]);
    },

    _handleBlur: function() {
        this.props.onBlur([]);
    },

    errorTimeout: null,

    // Whenever the input value changes, attempt to parse it.
    //
    // Clear any errors if this parse succeeds, show an error within a second
    // if it fails.
    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(this.props.value, nextProps.value) ||
            !_.isEqual(this.props.functions, nextProps.functions)) {

            clearTimeout(this.errorTimeout);

            if (this.parse(nextProps.value, nextProps).parsed) {
                this.setState({showErrorTooltip: false});
            } else {
                // Store timeout ID so that we can clear it above
                this.errorTimeout = setTimeout(() => {
                    var apiResult = this.props.apiOptions.onInputError(
                        null, // reserved for some widget identifier
                        this.props.value,
                        ERROR_MESSAGE
                    );
                    if (apiResult !== false) {
                        this.setState({showErrorTooltip: true});
                    }
                }, 2000);
            }
        }
    },

    componentWillUnmount: function() {
        clearTimeout(this.errorTimeout);
    },

    focus: function() {
        if (this.props.apiOptions.customKeypad) {
            this.refs.input.focus();
        } else {
            // The buttons are often on top of text you're trying to read, so
            // don't focus the editor automatically.
        }

        return true;
    },

    focusInputPath: function(inputPath) {
        this.refs.input.focus();
    },

    blurInputPath: function(inputPath) {
        this.refs.input.blur();
    },

    // HACK(joel)
    insert: function(text) {
        if (!this.props.apiOptions.staticRender) {
            this.refs.input.insert(text);
        }
    },

    getInputPaths: function() {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        return [[]];
    },

    getGrammarTypeForPath: function(inputPath) {
        return "expression";
    },

    setInputValue: function(path, newValue, cb) {
        this.props.onChange({
            value: newValue
        }, cb);
    },

    getAcceptableFormatsForInputPath: function() {
        // TODO(charlie): What format does the mobile team want this in?
        return null;
    },

    getUserInput: function() {
        return insertBraces(this.props.value);
    },

    simpleValidate: function(rubric, onInputError) {
        onInputError = onInputError || function() { };
        return Expression.validate(this.getUserInput(), rubric, onInputError);
    }
});

/* Content creators input a list of answers which are matched from top to
 * bottom. The intent is that they can include spcific solutions which should
 * be graded as correct or incorrect (or ungraded!) first, then get more
 * general.
 *
 * We iterate through each answer, trying to match it with the user's input
 * using the following angorithm:
 * - Try to parse the user's input. If it doesn't parse then return "not
 *   graded".
 * - For each answer:
 *   ~ Try to validate the user's input against the answer. The answer is
 *     expected to parse.
 *   ~ If the user's input validates (the validator judges it "correct"), we've
 *     matched and can stop considering answers.
 * - If there were no matches or the matching answer is considered "ungraded",
 *   show the user an error. TODO(joel) - what error?
 * - Otherwise, pass through the resulting points and message.
 */
_.extend(Expression, {
    validate: function(state, rubric, onInputError) {
        var options = _.clone(rubric);
        if (window.icu && window.icu.getDecimalFormatSymbols) {
            _.extend(options, window.icu.getDecimalFormatSymbols());
        }

        var createValidator = answer => {
            return KhanAnswerTypes.expression.createValidatorFunctional(
                // We don't give options to KAS.parse here because that is
                // parsing the solution answer, not the student answer, and we
                // don't want a solution to work if the student is using a
                // different language but not in english.
                KAS.parse(answer.value, rubric).expr,
                _({}).extend(options, {
                    simplify: answer.simplify,
                    form: answer.form
                })
            );
        };

        // find the first result to match the user's input
        var result;
        var matchingAnswer;
        var allEmpty = true;
        var foundMatch = !!_(rubric.answerForms).find(answer => {
            var validate = createValidator(answer);

            // save these because they'll be needed if this answer matches
            result = validate(state);
            matchingAnswer = answer;
            allEmpty = allEmpty && result.empty;

            // short-circuit as soon as an answer matches
            return result.correct;
        });

        var message = "" || (result && result.message);

        // now check to see whether it's considered correct, incorrect, or
        // ungraded
        if (!foundMatch) {
            if (allEmpty) {
                // If everything graded as empty, it's invalid.
                return {
                    type: "invalid",
                    message: null
                };
            } else {
                // We fell through all the possibilities and we're not empty,
                // so the answer is considered incorrect.
                return {
                    type: "points",
                    earned: 0,
                    total: 1
                };
            }

        // we matched an ungraded answer - return "invalid"
        } else if (matchingAnswer.considered === "ungraded") {
            var apiResult = onInputError(
                null, // reserved for some widget identifier
                state,
                message
            );
            return {
                type: "invalid",
                message: apiResult === false ? null : message
            };

        // The user's input matched one of the answers - is it correct or
        // incorrect?
        } else {

            // TODO(eater): Seems silly to translate result to this
            // invalid/points thing and immediately translate it back in
            // ItemRenderer.scoreInput()
            return {
                type: "points",
                earned: matchingAnswer.considered === "correct" ? 1 : 0,
                total: 1,
                message: message
            };
        }
    }
});

/**
 * Determine the keypad configuration parameters for the input, based on the
 * provided properties.
 *
 * There are two configuration parameters to be passed to the keypad:
 *   (1) The keypad type. For the Expression widget, we always use the
 *       Expression keypad.
 *   (2) The extra keys; namely, any variables or constants (like Pi) that need
 *       to be included as keys on the keypad. These are scraped from the answer
 *       forms.
 */
const keypadConfigurationForProps = (props) => {
    // Always use the Expression keypad, regardless of the button sets that have
    // been enabled.
    const keypadType = KeypadTypes.EXPRESSION;

    // Extract any and all variables and constants from the answer forms.
    const uniqueExtraVariables = {};
    const uniqueExtraConstants = {};
    for (const answerForm of props.answerForms) {
        const maybeExpr = KAS.parse(answerForm.value, props);
        if (maybeExpr.parsed) {
            const expr = maybeExpr.expr;

            // The keypad expects Greek letters to be capitalized (e.g., it
            // requires `PI` instead of `pi`). Right now, it only supports Pi
            // and Theta, so we special-case.
            const isGreek = symbol => symbol === 'pi' || symbol === 'theta';
            const toKey = symbol => isGreek(symbol) ? symbol.toUpperCase()
                                                    : symbol;

            for (const variable of expr.getVars()) {
                uniqueExtraVariables[toKey(variable)] = true;
            }
            for (const constant of expr.getConsts()) {
                uniqueExtraConstants[toKey(constant)] = true;
            }
        }
    }

    // TODO(charlie): Alert the keypad as to which of these symbols should be
    // treated as functions.
    const extraVariables = Object.keys(uniqueExtraVariables);
    extraVariables.sort();

    const extraConstants = Object.keys(uniqueExtraConstants);
    extraConstants.sort();

    const extraKeys = [...extraVariables, ...extraConstants];
    if (!extraKeys.length) {
        // If there are no extra symbols available, we include Pi anyway, so
        // that the "extra symbols" button doesn't appear empty.
        extraKeys.push("PI");
    }

    return { keypadType, extraKeys };
};

/*
 * v0 props follow this schema:
 *
 *     times: bool
 *     buttonSets: [string]
 *     functions: [string]
 *     buttonsVisible: "always" | "focused" | "never"
 *
 *     value: string
 *     form: bool
 *     simplify: bool
 *
 * v1 props follow this schema:
 *
 *     times: bool
 *     buttonSets: [string]
 *     functions: [string]
 *     buttonsVisible: "always" | "focused" | "never"
 *
 *     answerForms: [{
 *         considered: "correct" | "ungraded" | "incorrect"
 *         form: bool
 *         simplify: bool
 *         value: string
 *     }]
 */

var propUpgrades = {
    1: (v0props) => ({
        times: v0props.times,
        buttonSets: v0props.buttonSets,
        functions: v0props.functions,
        buttonsVisible: v0props.buttonsVisible,

        answerForms: [{
            considered: "correct",
            form: v0props.form,
            simplify: v0props.simplify,
            value: v0props.value,
            key: 0,
        }]
    })
};

module.exports = {
    name: "expression",
    displayName: "Expression / Equation",
    defaultAlignment: "inline-block",
    widget: Expression,
    transform: (editorProps) => {
        const { times, functions, buttonSets, buttonsVisible } = editorProps;
        return {
            keypadConfiguration: keypadConfigurationForProps(editorProps),
            times,
            functions,
            buttonSets,
            buttonsVisible,
        };
    },
    version: { major: 1, minor: 0 },
    propUpgrades: propUpgrades,

    // For use by the editor
    Expression,
};
