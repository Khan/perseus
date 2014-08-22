/** @jsx React.DOM */

var React   = require("react");
var InfoTip = require("react-components/info-tip.jsx");
var Tooltip = require("react-components/tooltip.jsx");

var Changeable   = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");
var ApiOptions = require("../perseus-api.jsx").Options;

var EnabledFeatures   = require("../enabled-features.jsx");
var PropCheckBox      = require("../components/prop-check-box.jsx");

var InputWithExamples = require("../components/input-with-examples.jsx");
var MathInput         = require("../components/math-input.jsx");
var TeX               = require("../tex.jsx"); // OldExpression only
var TexButtons        = require("../components/tex-buttons.jsx");

var cx = React.addons.classSet;
var EnabledFeatures = require("../enabled-features.jsx");

var ERROR_MESSAGE = $._("Sorry, I don't understand that!");

// The new, MathQuill input expression widget
var Expression = React.createClass({
    mixins: [Changeable, WidgetJsonifyDeprecated],

    propTypes: {
        value: React.PropTypes.string,
        times: React.PropTypes.bool,
        functions: React.PropTypes.arrayOf(React.PropTypes.string),
        buttonSets: TexButtons.buttonSetsType,
        buttonsVisible: React.PropTypes.oneOf(['always', 'never', 'focused']),
        enabledFeatures: EnabledFeatures.propTypes,
        apiOptions: ApiOptions.propTypes
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
        return KAS.parse(value, options);
    },

    render: function() {
        if (this.props.apiOptions.staticRender) {
            // To make things slightly easier, we just use an InputWithExamples
            // component to handle the static rendering, which is the same
            // component used by InputNumber and NumericInput
            return <InputWithExamples
                        ref="input"
                        value={this.props.value}
                        type={"tex"}
                        examples={[]}
                        shouldShowExamples={false}
                        onChange={this.change("value")}
                        onFocus={this._handleFocus}
                        onBlur={this._handleBlur} />;
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

            var className = cx({
                "perseus-widget-expression": true,
                "show-error-tooltip": this.state.showErrorTooltip
            });

            return <span className={className}>
                <MathInput
                    ref="input"
                    value={this.props.value}
                    onChange={this.change("value")}
                    convertDotToTimes={this.props.times}
                    buttonsVisible={this.props.buttonsVisible || "focused"}
                    buttonSets={this.props.buttonSets}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur} />
                {this.state.showErrorTooltip && errorTooltip}
            </span>;
        }
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
                }, 500);
            }
        }
    },

    componentWillUnmount: function() {
        clearTimeout(this.errorTimeout);
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    blur: function() {
        this.refs.input.blur();
        return true;
    },

    // HACK(joel)
    insert: function(text) {
        if (!this.props.apiOptions.staticRender) {
            this.refs.input.insert(text);
        }
    },

    getInputPaths: function() {
        return this;
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

    simpleValidate: function(rubric, onInputError) {
        onInputError = onInputError || function() { };
        return Expression.validate(this.getUserInput(), rubric, onInputError);
    },

    statics: {
        displayMode: "inline-block"
    }
});

_.extend(Expression, {
    validate: function(state, rubric, onInputError) {
        var options = _.clone(rubric);
        if (window.icu && window.icu.getDecimalFormatSymbols) {
            _.extend(options, window.icu.getDecimalFormatSymbols());
        }
        // We don't give options to KAS.parse here because that is parsing
        // the solution answer, not the student answer, and we don't
        // want a solution to work if the student is using a different
        // language but not in english.
        var val = Khan.answerTypes.expression.createValidatorFunctional(
            KAS.parse(rubric.value, rubric).expr, options);

        var result = val(state.value);

        // TODO(eater): Seems silly to translate result to this invalid/points
        // thing and immediately translate it back in ItemRenderer.scoreInput()
        if (result.empty) {
            var apiResult = onInputError(
                null, // reserved for some widget identifier
                state.value,
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

// The old, plain-text input expression widget
var OldExpression = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        times: React.PropTypes.bool,
        functions: React.PropTypes.arrayOf(React.PropTypes.string),
        enabledFeatures: EnabledFeatures.propTypes
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
            <InputWithExamples
                    ref="input"
                    value={this.props.value}
                    onKeyDown={this.handleKeyDown}
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                    examples={this.examples()}
                    shouldShowExamples={shouldShowExamples}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur} />
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
            var $error = $(this.refs.error.getDOMNode());
            if (!$error.is(":visible")) {
                $error.css({ top: 50, opacity: 0.1 }).show()
                    .animate({ top: 0, opacity: 1.0 }, 300);
            }
        } else {
            this.hideError();
        }
    },

    hideError: function() {
        var $error = $(this.refs.error.getDOMNode());
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
        var input = this.refs.input.getDOMNode();
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
        var input = this.refs.input.getDOMNode();
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

    blur: function() {
        this.refs.input.blur();
        return true;
    },

    getInputPaths: function() {
        return this;
    },

    getUserInput: function() {
        return {value: this.props.value};
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
        var mult = $._("For $2\\cdot2$, enter **2*2**");
        if (this.props.times) {
            mult = mult.replace(/\\cdot/g, "\\times");
        }

        return [
            $._("**Acceptable Formats**"),
            mult,
            $._("For $3y$, enter **3y** or **3*y**"),
            $._("For $\\dfrac{1}{x}$, enter **1/x**"),
            $._("For $\\dfrac{1}{xy}$, enter **1/(xy)**"),
            $._("For $\\dfrac{2}{x + 3}$, enter **2/(x + 3)**"),
            $._("For $x^{y}$, enter **x^y**"),
            $._("For $x^{2/3}$, enter **x^(2/3)**"),
            $._("For $\\sqrt{x}$, enter **sqrt(x)**"),
            $._("For $\\pi$, enter **pi**"),
            $._("For $\\sin \\theta$, enter **sin(theta)**"),
            $._("For $\\le$ or $\\ge$, enter **<=** or **>=**"),
            $._("For $\\neq$, enter **=/=**")
        ];
    },

    statics: {
        displayMode: "block"
    }
});

var ExpressionEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    propTypes: {
        value: React.PropTypes.string,
        form: React.PropTypes.bool,
        simplify: React.PropTypes.bool,
        times: React.PropTypes.bool,
        buttonSets: TexButtons.buttonSetsType,
        functions: React.PropTypes.arrayOf(React.PropTypes.string)
    },

    getDefaultProps: function() {
        return {
            value: "",
            form: false,
            simplify: false,
            times: false,
            buttonSets: ["basic"],
            functions: ["f", "g", "h"]
        };
    },

    getInitialState: function() {
        var value = this.props.value;

        return {
            // Is the format of `value` TeX or plain text?
            // TODO(alex): Remove after backfilling everything to TeX
            // TODO(joel) - sucks if you edit some expression without
            // backslashes or curly braces, then come back to the question and
            // it's surprisingly not TeX anymore.
            isTex: value === "" ||                  // default to TeX if new;
                _.indexOf(value, "\\") !== -1 ||    // only TeX has backslashes
                _.indexOf(value, "{") !== -1        // and curly braces
        };
    },

    render: function() {
        var simplifyWarning = null;
        var shouldTryToParse = this.props.simplify && this.props.value !== "";
        if (shouldTryToParse) {
            var expression = KAS.parse(this.props.value);
            if (expression.parsed && !expression.expr.isSimplified()) {
                simplifyWarning = <p className="warning"><b>Warning</b>: You
                    specified that the answer should be simplified but did not
                    provide a simplified answer. Are you sure you want to
                    require simplification?</p>;
            }
        }

        // TODO(alex): Consider adding more warnings (like the above) here

        var expressionProps = {
            ref: "expression",
            value: this.props.value,
            times: this.props.times,
            functions: this.props.functions,
            onChange: (newProps) => this.change(newProps),
            buttonsVisible: "never",
            buttonSets: this.props.buttonSets
        };

        var expression = this.state.isTex ? Expression : OldExpression;

        // checkboxes to choose which sets of input buttons are shown
        var buttonSetChoices = _(TexButtons.buttonSets).map((set, name) => {
            return <label>
                <input type="checkbox"
                       checked={_.contains(this.props.buttonSets, name)}
                       disabled={name === "basic"}
                       onChange={() => this.handleButtonSet(name)} />
                {name}
            </label>;
        });

        return <div>
            <div><label>
                Correct answer:{' '}
                {expression(expressionProps)}
            </label></div>
            {this.state.isTex && <TexButtons
                className="math-input-buttons"
                sets={this.props.buttonSets}
                convertDotToTimes={this.props.times}
                onInsert={this.handleTexInsert} />}

            <div>
                Button sets:
                {buttonSetChoices}
            </div>

            <div>
                <PropCheckBox
                    form={this.props.form}
                    onChange={this.props.onChange}
                    labelAlignment="right"
                    label="Answer expression must have the same form." />
                <InfoTip>
                    <p>The student's answer must be in the same form.
                    Commutativity and excess negative signs are ignored.</p>
                </InfoTip>
            </div>

            <div>
                <PropCheckBox
                    simplify={this.props.simplify}
                    onChange={this.props.onChange}
                    labelAlignment="right"
                    label="Answer expression must be fully expanded and
                        simplified." />
                <InfoTip>
                    <p>The student's answer must be fully expanded and
                    simplified. Answering this equation (x^2+2x+1) with this
                    factored equation (x+1)^2 will render this response
                    "Your answer is not fully expanded and simplified."</p>
                </InfoTip>
            </div>

            {simplifyWarning}

            <div>
                <PropCheckBox
                    times={this.props.times}
                    onChange={this.props.onChange}
                    labelAlignment="right"
                    label="Use × for rendering multiplication instead of a
                        center dot." />
                <InfoTip>
                    <p>For pre-algebra problems this option displays
                    multiplication as \times instead of \cdot in both the
                    rendered output and the acceptable formats examples.</p>
                </InfoTip>
            </div>

            <div>
                <label>
                {"Function variables: "}
                <input type="text"
                    defaultValue={this.props.functions.join(" ")}
                    onChange={this.handleFunctions} />
                </label>
                <InfoTip><p>
                    Single-letter variables listed here will be
                    interpreted as functions. This let us know that f(x) means
                    "f of x" and not "f times x".
                </p></InfoTip>
            </div>

        </div>;
    },

    handleButtonSet: function(changingName) {
        var buttonSetNames = _(TexButtons.buttonSets).keys();

        // Filter to preserve order - using .union and .difference would always
        // move the last added button set to the end.
        var buttonSets = _(buttonSetNames).filter(set => {
            return _(this.props.buttonSets).contains(set) !==
                   (set === changingName);
        });

        this.props.onChange({ buttonSets });
    },

    handleTexInsert: function(str) {
        this.refs.expression.insert(str);
    },

    handleFunctions: function(e) {
        var newProps = {};
        newProps.functions = _.compact(e.target.value.split(/[ ,]+/));
        this.props.onChange(newProps);
    },

    focus: function() {
        this.refs.expression.focus();
        return true;
    }
});

module.exports = {
    name: "expression",
    displayName: "Expression / Equation",
    getWidget: (enabledFeatures) => {
        // Allow toggling between the two versions of the widget
        return enabledFeatures.useMathQuill ? Expression : OldExpression;
    },
    editor: ExpressionEditor,
    transform: (editorProps) => {
        return _.pick(editorProps, "times", "functions", "buttonSets");
    },
    version: { major: 0, minor: 1 }
};
