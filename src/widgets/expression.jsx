/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, indent, no-redeclare, no-undef, no-unused-vars, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp, space-before-function-paren */
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

var EnabledFeatures = require("../enabled-features.jsx");

var InputWithExamples = require("../components/input-with-examples.jsx");
var MathInput = require("../components/math-input.jsx");
var TeX = require("react-components/tex.jsx");// OldExpression only
var TexButtons = require("../components/tex-buttons.jsx");
var KeypadMathInput = require("../../math-input/src/components/input/math-input.js");
const { configureKeypad } = require("../../math-input/src/actions");
const { keypadConfigurationPropType } = require("../../math-input/src/components/prop-types.js");

var EnabledFeatures = require("../enabled-features.jsx");

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
        enabledFeatures: EnabledFeatures.propTypes,
        functions: React.PropTypes.arrayOf(React.PropTypes.string),
        keypadConfiguration: keypadConfigurationPropType,
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
            enabledFeatures: EnabledFeatures.defaults,
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
            return <KeypadMathInput
                ref="input"
                onFocus={() => {
                    configureKeypad(this.props.keypadConfiguration);
                    this._handleFocus();
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
                    <i
                        className="icon-exclamation-sign error-icon"
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
                        }} />
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

    changeAndTrack: function(e) {
        this.change("value")(e);
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
        // The buttons are often on top of text you're trying to read, so don't
        // focus the editor automatically.
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

// The old, plain-text input expression widget
var OldExpression = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        times: React.PropTypes.bool,
        functions: React.PropTypes.arrayOf(React.PropTypes.string),
        enabledFeatures: EnabledFeatures.propTypes,
        widgetId: React.PropTypes.string.isRequired,
    },

    getDefaultProps: function() {
        return {
            value: "",
            times: false,
            functions: [],
            onFocus: function() { },
            onBlur: function() { },
            enabledFeatures: EnabledFeatures.defaults,
            apiOptions: ApiOptions.defaults
        };
    },

    getInitialState: function() {
        return {
            lastParsedTex: ""
        };
    },

    parse: function(value, props) {
        // TODO(jack): Disable icu for content creators here, or
        // make it so that solution answers with ','s or '.'s work
        var options = _.pick(props || this.props, "functions");
        if (window.icu && window.icu.getDecimalFormatSymbols) {
            _.extend(options, window.icu.getDecimalFormatSymbols());
        }
        return KAS.parse(value, options);
    },

    componentWillMount: function() {
        this.updateParsedTex(this.props.value);
    },

    componentWillReceiveProps: function(nextProps) {
        this.updateParsedTex(nextProps.value, nextProps);
    },

    render: function() {
        var result = this.parse(this.props.value);
        var shouldShowExamples = this.props.enabledFeatures.toolTipFormats;

        return <span className="perseus-widget-expression-old">
            <span className="output">
                <span className="tex"
                        style={{opacity: result.parsed ? 1.0 : 0.5}}>
                    <TeX>{this.state.lastParsedTex}</TeX>
                </span>
                <span className="placeholder">
                    <span ref="error" className="error"
                            style={{display: "none"}}>
                        <span className="buddy" />
                        <span className="message"><span>
                            {ERROR_MESSAGE}
                        </span></span>
                    </span>
                </span>
            </span>
            <InputWithExamples
                ref="input"
                value={this.props.value}
                onKeyDown={this.handleKeyDown}
                onKeyPress={this.handleKeyPress}
                onChange={this.handleChange}
                examples={this.examples()}
                shouldShowExamples={shouldShowExamples}
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                id={this.props.widgetId}
            />
        </span>;
    },

    _handleFocus: function() {
        this.props.onFocus([]);
    },

    _handleBlur: function() {
        this.props.onBlur([]);
    },

    errorTimeout: null,

    componentDidMount: function() {
        this.componentDidUpdate();
    },

    componentDidUpdate: function() {
        clearTimeout(this.errorTimeout);
        if (this.parse(this.props.value).parsed) {
            this.hideError();
        } else {
            this.errorTimeout = setTimeout(this.showError, 2000);
        }
    },

    componentWillUnmount: function() {
        clearTimeout(this.errorTimeout);
    },

    showError: function() {
        var apiResult = this.props.apiOptions.onInputError(
            null, // reserved for some widget identifier
            this.props.value,
            ERROR_MESSAGE
        );
        if (apiResult !== false) {
            var $error = $(ReactDOM.findDOMNode(this.refs.error));
            if (!$error.is(":visible")) {
                $error.css({ top: 50, opacity: 0.1 }).show()
                    .animate({ top: 0, opacity: 1.0 }, 300);
            }
        } else {
            this.hideError();
        }
    },

    hideError: function() {
        var $error = $(ReactDOM.findDOMNode(this.refs.error));
        if ($error.is(":visible")) {
            $error.animate({ top: 50, opacity: 0.1 }, 300, function() {
                $(this).hide();
            });
        }
    },

    /**
     * The keydown handler handles clearing the error timeout, telling
     * props.value to update, and intercepting the backspace key when
     * appropriate...
     */
    handleKeyDown: function(event) {
        var input = ReactDOM.findDOMNode(this.refs.input);
        var text = input.value;

        var start = input.selectionStart;
        var end = input.selectionEnd;
        var supported = start !== undefined;

        var which = event.nativeEvent.keyCode;

        if (supported && which === 8 /* backspace */) {
            if (start === end && text.slice(start - 1, start + 1) === "()") {
                event.preventDefault();
                var val = text.slice(0, start - 1) + text.slice(start + 1);

                // this.props.onChange will update the value for us, but
                // asynchronously, making it harder to set the selection
                // usefully, so we just set .value directly here as well.
                input.value = val;
                input.selectionStart = start - 1;
                input.selectionEnd = end - 1;
                this.props.onChange({value: val});
            }
        }
    },

    /**
     * ...whereas the keypress handler handles the parentheses because keyCode
     * is more useful for actual character insertions (keypress gives 40 for an
     * open paren '(' instead of keydown which gives 57, the code for '9').
     */
    handleKeyPress: function(event) {
        var input = ReactDOM.findDOMNode(this.refs.input);
        var text = input.value;

        var start = input.selectionStart;
        var end = input.selectionEnd;
        var supported = start !== undefined;

        var which = event.nativeEvent.charCode;

        if (supported && which === 40 /* left paren */) {
            event.preventDefault();

            var val;
            if (start === end) {
                var insertMatched = _.any([" ", ")", ""], function(val) {
                    return text.charAt(start) === val;
                });

                val = text.slice(0, start) +
                        (insertMatched ? "()" : "(") + text.slice(end);
            } else {
                val = text.slice(0, start) +
                        "(" + text.slice(start, end) + ")" + text.slice(end);
            }

            input.value = val;
            input.selectionStart = start + 1;
            input.selectionEnd = end + 1;
            this.props.onChange({value: val});

        } else if (supported && which === 41 /* right paren */) {
            if (start === end && text.charAt(start) === ")") {
                event.preventDefault();
                input.selectionStart = start + 1;
                input.selectionEnd = end + 1;
            }
        }
    },

    handleChange: function(newValue) {
        this.props.onChange({value: newValue});
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    getInputPaths: function() {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        return [[]];
    },

    getGrammarTypeForPath: function(inputPath) {
        return "expression";
    },

    getUserInput: function() {
        return this.props.value;
    },

    updateParsedTex: function(value, props) {
        var result = this.parse(value, props);
        var options = _.pick(this.props, "times");
        if (result.parsed) {
            this.setState({lastParsedTex: result.expr.asTex(options)});
        }
    },

    simpleValidate: function(rubric, onInputError) {
        onInputError = onInputError || function() { };
        return Expression.validate(this.getUserInput(), rubric, onInputError);
    },

    examples: function() {
        var mult = i18n._("For $2\\cdot2$, enter **2*2**");
        if (this.props.times) {
            mult = mult.replace(/\\cdot/g, "\\times");
        }

        return [
            i18n._("**Acceptable Formats**"),
            mult,
            i18n._("For $3y$, enter **3y** or **3*y**"),
            i18n._("For $\\dfrac{1}{x}$, enter **1/x**"),
            i18n._("For $\\dfrac{1}{xy}$, enter **1/(xy)**"),
            i18n._("For $\\dfrac{2}{x + 3}$, enter **2/(x + 3)**"),
            i18n._("For $x^{y}$, enter **x^y**"),
            i18n._("For $x^{2/3}$, enter **x^(2/3)**"),
            i18n._("For $\\sqrt{x}$, enter **sqrt(x)**"),
            i18n._("For $\\sqrt[3]{x}$, enter **sqrt\\[3\\]{x}**"),
            i18n._("For $\\pi$, enter **pi**"),
            i18n._("For $\\sin \\theta$, enter **sin(theta)**"),
            i18n._("For $\\le$ or $\\ge$, enter **<=** or **>=**"),
            i18n._("For $\\neq$, enter **=/=**")
        ];
    }
});

/**
 * Determine the keypad configuration parameters for the input, based on the
 * provided properties.
 *
 * There are two configuration parameters to be determined:
 *   (1) The keypad type. Typically, the Expression widget will use the Basic
 *       Expression keypad, although if the question requires use of the
 *       trigonometric or logarithm functions, then it upgrades to the Advanced
 *       Expression keypad.
 *   (2) The extra keys; namely, any variables or constants (like Pi) that need
 *       to be included as keys on the keypad. These are scraped from the answer
 *       forms.
 */
const keypadConfigurationForProps = (props) => {
    let keypadType;
    if (props.buttonSets.includes("trig") ||
            props.buttonSets.includes("logarithms")) {
        keypadType = "ADVANCED_EXPRESSION";
    } else {
        keypadType = "BASIC_EXPRESSION";
    }

    // Extract any and all variables and constants from the answer forms.
    const uniqueExtraSymbols = {};
    for (const answerForm of props.answerForms) {
        const maybeExpr = KAS.parse(answerForm.value, props);
        if (maybeExpr.parsed) {
            const expr = maybeExpr.expr;
            for (const variable of expr.getVars()) {
                uniqueExtraSymbols[variable] = true;
            }
            for (const constant of expr.getConsts()) {
                uniqueExtraSymbols[constant] = true;
            }
        }
    }

    // TODO(charlie): Alert the keypad as to which of these symbols should be
    // treated as functions.
    const extraKeys = Object.keys(uniqueExtraSymbols).map(
        symbol => symbol.toUpperCase()
    );

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
    getDefaultAlignment: function (enabledFeatures) {
        // Each version of the widget has different alignments
        return enabledFeatures.useMathQuill ? "inline-block" : "block";
    },
    getWidget: (enabledFeatures) => {
        // Allow toggling between the two versions of the widget
        return enabledFeatures.useMathQuill ? Expression : OldExpression;
    },
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
