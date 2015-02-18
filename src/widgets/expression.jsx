var React = require("react");
var InfoTip = require("react-components/info-tip.jsx");
var SortableArea     = require("react-components/sortable.jsx");
var Tooltip = require("react-components/tooltip.jsx");
var _ = require("underscore");

var ApiOptions = require("../perseus-api.jsx").Options;
var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");
var ApiOptions = require("../perseus-api.jsx").Options;
var ApiClassNames = require("../perseus-api.jsx").ClassNames;

var EnabledFeatures = require("../enabled-features.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");

var InputWithExamples = require("../components/input-with-examples.jsx");
var MathInput = require("../components/math-input.jsx");
var TeX = require("react-components/tex.jsx"); // OldExpression only
var TexButtons = require("../components/tex-buttons.jsx");

var cx = React.addons.classSet;
var EnabledFeatures = require("../enabled-features.jsx");

var lens = require("../../hubble/index.js");

var ERROR_MESSAGE = $._("Sorry, I don't understand that!");

var NO_ANSWERS_WARNING = [
    "An expression without an answer",
    "is no expression to me.",
    "Who can learn from an input",
    "like the one that I see?",
    "Put something in there",
    "won't you please?",
    "Just a digit will do -",
    "might I suggest a three?"
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

// The new, MathQuill input expression widget
var Expression = React.createClass({
    mixins: [Changeable],

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
                    className={ApiClassNames.INTERACTIVE}
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
        return this.props.value;
    },

    simpleValidate: function(rubric, onInputError) {
        onInputError = onInputError || function() { };
        return Expression.validate(this.getUserInput(), rubric, onInputError);
    },

    statics: {
        displayMode: "inline-block"
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
            return Khan.answerTypes.expression.createValidatorFunctional(
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
                    onBlur={this._handleBlur} />
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

// An answer can be considered correct, wrong, or ungraded.
var CONSIDERED = ["correct", "wrong", "ungraded"];

var answerFormType = React.PropTypes.shape({
    considered: React.PropTypes.oneOf(CONSIDERED).isRequired,
    value: React.PropTypes.string.isRequired,
    form: React.PropTypes.bool.isRequired,
    simplify: React.PropTypes.bool.isRequired
});

var ExpressionEditor = React.createClass({
    mixins: [Changeable],

    propTypes: {
        answerForms: React.PropTypes.arrayOf(answerFormType),
        times: React.PropTypes.bool,
        buttonSets: TexButtons.buttonSetsType,
        functions: React.PropTypes.arrayOf(React.PropTypes.string)
    },

    getDefaultProps: function() {
        return {
            answerForms: [],
            times: false,
            buttonSets: ["basic"],
            functions: ["f", "g", "h"]
        };
    },

    getInitialState: function() {
        // Is the format of `value` TeX or plain text?
        // TODO(alex): Remove after backfilling everything to TeX
        // TODO(joel) - sucks if you edit some expression without
        // backslashes or curly braces, then come back to the question and
        // it's surprisingly not TeX anymore.

        var isTex;
        // default to TeX if new;
        if (this.props.answerForms.length === 0) {
            isTex = true;
        } else {
            isTex = _(this.props.answerForms).any(form => {
                var { value } = form;
                // only TeX has backslashes and curly braces
                return _.indexOf(value, "\\") !== -1 ||
                       _.indexOf(value, "{")  !== -1;
            });
        }

        return { isTex };
    },

    render: function() {

        var expression = this.state.isTex ? Expression : OldExpression;

        var answerOptions = this.props.answerForms
            .map((obj, ix) => {
                var expressionProps = {
                        // note we're using
                        // *this.props*.{times,functions,buttonSets} since each
                        // answer area has the same settings for those
                        times: this.props.times,
                        functions: this.props.functions,
                        buttonSets: this.props.buttonSets,

                        buttonsVisible: "focused",
                        form: obj.form,
                        simplify: obj.simplify,
                        value: obj.value,

                        onChange: props => this.updateForm(ix, props),
                };

                return lens(obj)
                    .merge([], {
                        draggable: true,
                        onChange: props => this.updateForm(ix, props),
                        onDelete: () => this.handleRemoveForm(ix),
                        expressionProps: expressionProps
                    })
                    .freeze();
            })
            .map(obj => <AnswerOption {...obj} />);

        var sortable = <SortableArea components={answerOptions}
                                     onReorder={this.handleReorder}
                                     className="answer-options-list" />;

        var Expr = this.state.isTex ? Expression : OldExpression;

        // checkboxes to choose which sets of input buttons are shown
        var buttonSetChoices = _(TexButtons.buttonSets).map((set, name) => {
            // The first one gets special cased to always be checked, disabled,
            // and float left.
            var isFirst = name === "basic";
            var checked = _.contains(this.props.buttonSets, name) || isFirst;
            var className = isFirst ?
                "button-set-label-float" :
                "button-set-label";
            return <label className={className}>
                <input type="checkbox"
                       checked={checked}
                       disabled={isFirst}
                       onChange={() => this.handleButtonSet(name)} />
                {name}
            </label>;
        });

        buttonSetChoices.splice(1, 1, <label>
            <input type="checkbox"
                   onChange={this.handleToggleDiv} />
            <span className="show-div-button">
                show <TeX>\div</TeX> button
            </span>
        </label>);

        return <div className="perseus-widget-expression-editor">
            <h3 className="expression-editor-h3">Global Options</h3>

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

            <div>
                <div>Button sets:</div>
                {buttonSetChoices}
            </div>

            {this.state.isTex && <TexButtons
                className="math-input-buttons"
                sets={this.props.buttonSets}
                convertDotToTimes={this.props.times}
                onInsert={this.handleTexInsert} />}

            <h3 className="expression-editor-h3">Answers</h3>

            <p style={{margin: "4px 0"}}>
                student responses area matched against these from top to bottom
            </p>

            {sortable}

            <div>
                <button className="simple-button orange"
                        style={{fontSize: 13}}
                        onClick={this.newAnswer}
                        type="button">
                    Add new answer
                </button>
            </div>

        </div>;
    },

    serialize: function() {
        var formSerializables = ["value", "form", "simplify", "considered",
            // it's a little weird to serialize the react key, but saves some
            // effort reconstructing them when this item is loaded later.
            "key"];
        var serializables = ["answerForms", "buttonSets", "functions",
            "times"];

        var answerForms = this.props.answerForms.map(form => {
            return _(form).pick(formSerializables);
        });

        return lens(this.props)
            .set(["answerForms"], answerForms)
            .mod([], props => _(props).pick(serializables))
            .freeze();
    },

    getSaveWarnings: function() {
        var issues = [];

        if (this.props.answerForms.length === 0) {
            issues.push(NO_ANSWERS_WARNING);
        } else {

            var hasCorrect = !!_(this.props.answerForms).find(form => {
                return form.considered === "correct";
            });
            if (!hasCorrect) {
                issues.push(NO_CORRECT_ANSWERS_WARNING);
            }

            _(this.props.answerForms).each((form, ix) => {
                if (this.props.value === "") {
                    issues.push(NOT_SPECIFIED_WARNING(ix+1));
                } else {
                    // note we're not using icu for content creators
                    var expression = KAS.parse(form.value);
                    if (!expression.parsed) {
                        issues.push(PARSE_WARNING(form.value));
                    } else if (form.simplify &&
                               !expression.expr.isSimplified()) {
                        issues.push(SIMPLIFY_WARNING(form.value));
                    }
                }
            });

            // TODO(joel) - warn about:
            //   - unreachable answers (how??)
            //   - specific answers following unspecific answers
            //   - incorrect answers as the final form
        }

        return issues;
    },

    _newEmptyAnswerForm: function() {
        return {
            considered: 'correct',
            form: false,

            // note: the key means "n-th form created" - not "form in
            // position n" and will stay the same for the life of this form
            key: this.props.answerForms.length,

            simplify: false,
            value: "",
        };
    },

    newAnswer: function() {
        var answerForms = this.props.answerForms.slice();
        answerForms.push(this._newEmptyAnswerForm());
        this.change({ answerForms });
    },

    handleRemoveForm: function(i) {
        var answerForms = this.props.answerForms.slice(0, -1);
        this.change({ answerForms });
    },

    // called when the options (including the expression itself) to an answer
    // form change
    updateForm: function(i, props) {
        var answerForms = lens(this.props.answerForms)
            .merge([i], props)
            .freeze();

        this.change({ answerForms });
    },

    handleReorder: function(components) {
        var answerForms = _(components).map(component => {
            var form = _(component.props)
                .pick("considered", "form", "simplify", "value");
            form.key = component.key;
            return form;
        });

        this.change({ answerForms });
    },

    // called when the selected buttonset changes
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

    handleToggleDiv: function() {
        // We always want buttonSets to contain exactly one of "basic" and
        // "basic+div". Toggle between the two of them.
        // If someone can think of a more elegant formulation of this (there
        // must be one!) feel free to change it.
        var keep, remove;
        if (_(this.props.buttonSets).contains("basic+div")) {
            keep = "basic";
            remove = "basic+div";
        } else {
            keep = "basic+div";
            remove = "basic";
        }

        var buttonSets = _(this.props.buttonSets)
            .reject(set => set === remove)
            .concat(keep);

        this.change("buttonSets", buttonSets);
    },

    // called when the correct answer changes
    handleTexInsert: function(str) {
        this.refs.expression.insert(str);
    },

    // called when the function variables change
    handleFunctions: function(e) {
        var newProps = {};
        newProps.functions = _.compact(e.target.value.split(/[ ,]+/));
        this.props.onChange(newProps);
    }
});

// Find the next element in arr after val, wrapping around to the first.
var findNextIn = function(arr, val) {
    var ix = _(arr).indexOf(val);
    ix = (ix + 1) % arr.length;
    return arr[ix];
};

var AnswerOption = React.createClass({
    mixins: [Changeable],

    propTypes: {
        considered: React.PropTypes.oneOf(CONSIDERED).isRequired,
        expressionProps: React.PropTypes.object.isRequired,

        // Must the answer have the same form as this answer.
        form: React.PropTypes.bool.isRequired,

        // Must the answer be simplified.
        simplify: React.PropTypes.bool.isRequired,

        onChange: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return { deleteFocused: false };
    },

    handleDeleteBlur: function() {
        this.setState({ deleteFocused: false });
    },

    render: function() {
        var removeButton = null;
        if (this.state.deleteFocused) {
            removeButton = <button type="button"
                                   className="simple-button orange"
                                   onClick={this.handleImSure}
                                   onBlur={this.handleDeleteBlur}>
                                I'm sure!
                           </button>;
        } else {
            removeButton = <button type="button"
                                   className="simple-button orange"
                                   onClick={this.handleDelete}>
                                Delete
                           </button>;
        }

        return <div className="expression-answer-option">

            <div className="answer-handle" />

            <div className="answer-body">

                <div className="answer-considered">
                    <div onClick={this.toggleConsidered}
                         className={"answer-status " + this.props.considered}>
                        {this.props.considered}
                    </div>

                    <div className="answer-expression">
                        <Expression {...this.props.expressionProps} />
                    </div>
                </div>

                <div className="answer-option">
                    <PropCheckBox
                        form={this.props.form}
                        onChange={this.props.onChange}
                        labelAlignment="right"
                        label="Answer expression must have the same form." />
                    <InfoTip>
                        <p>
                            The student's answer must be in the same form.
                            Commutativity and excess negative signs are
                            ignored.
                        </p>
                    </InfoTip>
                </div>

                <div className="answer-option">
                    <PropCheckBox
                        simplify={this.props.simplify}
                        onChange={this.props.onChange}
                        labelAlignment="right"
                        label="Answer expression must be fully expanded and
                            simplified." />
                    <InfoTip>
                        <p>
                            The student's answer must be fully expanded and
                            simplified. Answering this equation (x^2+2x+1) with
                            this factored equation (x+1)^2 will render this
                            response "Your answer is not fully expanded and
                            simplified."
                        </p>
                    </InfoTip>
                </div>

                <div className="remove-container">{removeButton}</div>

            </div>

        </div>;
    },

    handleImSure: function() {
        this.props.onDelete();
    },

    handleDelete: function() {
        this.setState({ deleteFocused: true });
    },

    toggleConsidered: function() {
        var newVal = findNextIn(CONSIDERED, this.props.considered);
        this.change({ considered: newVal });
    },
});

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
propUpgrades = {
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
    getWidget: (enabledFeatures) => {
        // Allow toggling between the two versions of the widget
        return enabledFeatures.useMathQuill ? Expression : OldExpression;
    },
    editor: ExpressionEditor,
    transform: (editorProps) => {
        return _.pick(editorProps, "times", "functions", "buttonSets",
                      "buttonsVisible", "answerForms");
    },
    version: { major: 1, minor: 0 },
    propUpgrades
};
