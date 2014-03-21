/** @jsx React.DOM */

var PropCheckBox = require("../components/prop-check-box.jsx");
var InfoTip      = require("../components/info-tip.jsx");
var TeX          = require("../tex.jsx");  // KaTeX and/or MathJax
var Util         = require("../util.js");
var Widgets      = require("../widgets.js");

var Expression = React.createClass({
    getDefaultProps: function() {
        return {
            currentValue: "",
            times: false,
            functions: []
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
        if (icu && icu.getDecimalFormatSymbols) {
            _.extend(options, icu.getDecimalFormatSymbols());
        }
        return KAS.parse(value, options);
    },

    componentWillMount: function() {
        this.updateParsedTex(this.props.currentValue);
    },

    componentWillReceiveProps: function(nextProps) {
        this.updateParsedTex(nextProps.currentValue, nextProps);
    },

    render: function() {
        var result = this.parse(this.props.currentValue);

        return <span className="perseus-widget-expression">
            <input ref="input" type="text"
                value={this.props.currentValue}
                onKeyDown={this.handleKeyDown}
                onKeyPress={this.handleKeyPress}
                onChange={this.handleChange} />
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
                            {"Sorry, I don't understand that!"}
                        </span></span>
                    </span>
                </span>
            </span>
        </span>;
    },

    errorTimeout: null,

    componentDidMount: function() {
        this.componentDidUpdate();
    },

    componentDidUpdate: function() {
        clearTimeout(this.errorTimeout);
        if (this.parse(this.props.currentValue).parsed) {
            this.hideError();
        } else {
            this.errorTimeout = setTimeout(this.showError, 2000);
        }
    },

    componentWillUnmount: function() {
        clearTimeout(this.errorTimeout);
    },

    showError: function() {
        var $error = $(this.refs.error.getDOMNode());
        if (!$error.is(":visible")) {
            $error.css({ top: 50, opacity: 0.1 }).show()
                .animate({ top: 0, opacity: 1.0 }, 300);
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
     * props.currentValue to update, and intercepting the backspace key when
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
                this.props.onChange({currentValue: val});
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
            this.props.onChange({currentValue: val});

        } else if (supported && which === 41 /* right paren */) {
            if (start === end && text.charAt(start) === ")") {
                event.preventDefault();
                input.selectionStart = start + 1;
                input.selectionEnd = end + 1;
            }
        }
    },

    handleChange: function(event) {
        this.props.onChange({currentValue: event.target.value});
    },

    focus: function() {
        this.refs.input.getDOMNode().focus();
        return true;
    },

    toJSON: function(skipValidation) {
        return {currentValue: this.props.currentValue};
    },

    updateParsedTex: function(value, props) {
        var result = this.parse(value, props);
        var options = _.pick(this.props, "times");
        if (result.parsed) {
            this.setState({lastParsedTex: result.expr.asTex(options)});
        }
    },

    simpleValidate: function(rubric) {
        return Expression.validate(this.toJSON(), rubric);
    },

    examples: function() {
        var mult = $._("For $2\\cdot2$, enter **2*2**");
        if (this.props.times) {
            mult = mult.replace(/\\cdot/g, "\\times");
        }

        return [
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
    }
});

_.extend(Expression, {
    validate: function(state, rubric) {
        var options = _.clone(rubric);
        if (icu && icu.getDecimalFormatSymbols) {
            _.extend(options, icu.getDecimalFormatSymbols());
        }
        // We don't give options to KAS.parse here because that is parsing
        // the solution answer, not the student answer, and we don't
        // want a solution to work if the student is using a different
        // language but not in english.
        var val = Khan.answerTypes.expression.createValidatorFunctional(
            KAS.parse(rubric.value, rubric).expr, options);

        var result = val(state.currentValue);

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

var ExpressionEditor = React.createClass({
    getDefaultProps: function() {
        return {
            form: false,
            simplify: false,
            times: false,
            functions: ["f", "g", "h"]
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

        return <div>
            <div><label>
                {' '}Correct answer:{' '}
                <Expression ref="expression"
                    currentValue={this.props.value}
                    times={this.props.times}
                    functions={this.props.functions}
                    onChange={function(newProps) {
                        if ("currentValue" in newProps) {
                            newProps.value = newProps.currentValue;
                            delete newProps.currentValue;
                        }
                        this.props.onChange(newProps);
                    }.bind(this)} />
            </label></div>

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
                    {' '}Single-letter variables listed here will be
                    interpreted as functions. This let us know that f(x) means
                    "f of x" and not "f times x".{' '}
                </p></InfoTip>
            </div>

        </div>;
    },

    handleCheck: function(e) {
        var newProps = {};
        newProps[e.target.name] = e.target.checked;
        this.props.onChange(newProps);
    },

    handleFunctions: function(e) {
        var newProps = {};
        newProps.functions = _.compact(e.target.value.split(/[ ,]+/));
        this.props.onChange(newProps);
    },

    focus: function() {
        this.refs.expression.focus();
        return true;
    },

    toJSON: function(skipValidation) {
        var value = this.props.value;

        if (!skipValidation) {
            if (value === "") {
                alert("Warning: No expression has been entered.");
            } else if (!this.refs.expression.parse(value).parsed) {
                alert("Warning: Entered expression didn't parse.");
            }
        }

        return _.pick(this.props, "value", "form", "simplify",
            "times", "functions");
    }
});

Widgets.register("expression", Expression);
Widgets.register("expression-editor", ExpressionEditor);

