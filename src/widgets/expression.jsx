var React   = require("react");
var ReactDOM = require("react-dom");
var classNames = require("classnames");

var InfoTip = require("react-components/js/info-tip.jsx");
var Tooltip = require("react-components/js/tooltip.jsx");

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");
var ApiOptions = require("../perseus-api.jsx").Options;

var EnabledFeatures   = require("../enabled-features.jsx");
var PropCheckBox      = require("../components/prop-check-box.jsx");

var InputWithExamples = require("../components/input-with-examples.jsx");
var MathInput         = require("../components/math-input.jsx");
var TeX               = require("../tex.jsx"); // OldExpression only
var TexButtons        = require("../components/tex-buttons.jsx");

var EnabledFeatures = require("../enabled-features.jsx");
var Util = require("../util.js");

var ERROR_MESSAGE = $._("Sorry, I don't understand that!");

// The new, MathQuill input expression widget
var Expression = React.createClass({
    mixins: [Changeable],

    propTypes: {
        value: React.PropTypes.string,
        times: React.PropTypes.bool,
        functions: React.PropTypes.arrayOf(React.PropTypes.string),
        buttonsVisible: React.PropTypes.oneOf(['always', 'never', 'focused']),
        enabledFeatures: EnabledFeatures.propTypes,
        apiOptions: ApiOptions.propTypes,
        buttonSets: TexButtons.buttonSetsType,
        easybuttons: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            value: "",
            times: false,
            functions: [],
            onFocus: function() { },
            onBlur: function() { },
            enabledFeatures: EnabledFeatures.defaults,
            apiOptions: ApiOptions.defaults,
        };
    },

    getInitialState: function() {
        return {
            showErrorTooltip: false,
            showErrorText: false,
            offsetLeft: 0
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

    componentDidMount: function() {
        var expression = ReactDOM.getDOMNode(this);
        this.setState({offsetLeft: expression.offsetLeft});
    },

    render: function() {
        // for old questions without buttonSets, make buttonSets by easybuttons
        if (!this.props.buttonSets)
        {
            if(!this.props.easybuttons) {
                this.props.buttonSets = ["basic", "relations", "trig", "prealgebra"];
            }
            else {
                this.props.buttonSets = ["basic"];
            }
            this.props.onChange;
        }

        if (this.props.apiOptions.staticRender) {
            var style = {
                borderRadius: "5px",
                padding: "4px",
                background: "white",
                border: "1px solid #a4a4a4"
            };
            return <span style={style}>
                <TeX ref="input" onClick={this._handleFocus}>
                    {this.props.value}
                </TeX>
            </span>;
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

            var inEditor = window.location.pathname.indexOf("/questionpanel/perseus_editor/") >= 0;

            return <span className={className}>
                <MathInput
                    ref="input"
                    value={this.props.value}
                    onChange={this.handleChange}
                    convertDotToTimes={this.props.times}
                    buttonsVisible={this.props.buttonsVisible || "focused"}
                    buttonSets={this.props.buttonSets}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                    offsetLeft={this.state.offsetLeft}
                    inEditor={inEditor} />
                {this.state.showErrorTooltip && errorTooltip}
            </span>;
        }
    },

    handleChange: function(newValue) {
        this.props.onChange({ value: Util.asc(newValue) });
    },

    _handleFocus: function() {
        if (this.props.apiOptions.staticRender) {
            this.props.onFocus([], this.refs.input);
        } else {
            this.props.onFocus([], this.refs.input.getInputDOMNode());
        }
    },

    _handleBlur: function() {
        this.props.onBlur([], this.refs.input.getInputDOMNode());
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

    // HACK(joel)
    insert: function(text) {
        this.refs.input.insert(text);
    },

    simpleValidate: function(rubric, onInputError) {
        onInputError = onInputError || function() { };
        return Expression.validate(this.toJSON(), rubric, onInputError);
    },

    toJSON: function(skipValidation) {
        return {value: this.props.value};
    },

    statics: {
        displayMode: "inline-block"
    }
});

_.extend(Expression, {
    validate: function(state, rubric, onInputError) {
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



var ExpressionEditor = React.createClass({
    mixins: [Changeable, JsonifyProps],

    propTypes: {
        value: React.PropTypes.string,
        form: React.PropTypes.bool,
        simplify: React.PropTypes.bool,
        times: React.PropTypes.bool,
        functions: React.PropTypes.arrayOf(React.PropTypes.string),
        buttonSets: TexButtons.buttonSetsType,
        easybuttons: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            value: "",
            form: true,
            simplify: false,
            times: true,
            functions: ["f", "g", "h"],
            easybuttons: true
        };
    },

    getInitialState: function() {
        var value = this.props.value;

        return {
            // In Junyi, all expressions are new expression widget, not oldExpression widget.
            // So isTeX default is true.
            isTex: true
        };
    },

    render: function() {
        // for editing old questions, make buttonSets by easybuttons
        if (!this.props.buttonSets)
        {
            if(!this.props.easybuttons) {
                this.props.buttonSets = ["basic", "relations", "trig", "prealgebra"];
            }
            else {
                this.props.buttonSets = ["basic"];
            }
            this.props.onChange;
        }

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
            buttonSets: this.props.buttonSets,
        };

        var expression = this.state.isTex ? Expression : OldExpression;

        // checkboxes to choose which sets of input buttons are shown
        var buttonSetChoices = _(TexButtons.buttonSets).map((set, name) => {
            // The first one gets special cased to always be checked, disabled,
            // and float left.
            var isFirst = name === "basic";
            var checked = _.contains(this.props.buttonSets, name) || isFirst;
            var className = isFirst ?
                "button-set-label-float" :
                "button-set-label";

            var chineseName = "";
            switch (name){
                case "basic":
                    chineseName = "基本運算";
                    break;
                case "relations":
                    chineseName = "不等式";
                    break;
                case "trig":
                    chineseName = "三角函數";
                    break;
                case "prealgebra":
                    chineseName = "初階代數";
                    break;
                default:
                    chineseName = "其他";
            };

            return <div>
             <label className={className} key={name}>
                <input type="checkbox"
                       checked={checked}
                       disabled={isFirst}
                       onChange={() => this.handleButtonSet(name)} />
                {chineseName}
            </label>
            </div>;
        });

        // TODO(joel) - move buttons outside of the label so they don't weirdly
        // focus
        return <div>
            <div><label>
                正確答案:{' '}
                {expression(expressionProps)}
            </label></div>
            {this.state.isTex && <TexButtons
                className="math-input-buttons"
                convertDotToTimes={this.props.times}
                onInsert={this.handleTexInsert}
                sets={this.props.buttonSets} />}

            <div>
                <PropCheckBox
                    form={this.props.form}
                    onChange={this.props.onChange}
                    labelAlignment="right"
                    label="答案一定要與格式相符。" />
                <InfoTip>
                    <p>學生必須輸入相同的算式。
                    但容許交換律與負號，例如：1+3，可接受3+1或1-(-3)，但不能接受4或2+2。</p>
                </InfoTip>
            </div>

            <div>
                <PropCheckBox
                    simplify={this.props.simplify}
                    onChange={this.props.onChange}
                    labelAlignment="right"
                    label="答案一定要化簡、展開。" />
                <InfoTip>
                    <p>答案一定要化簡或展開，例如方程式 (x^2+2x+1) ，如果輸入
                    (x+1)^2 就會算不對，並且提示學生：
                    factored equation (x+1)^2 will render this response
                    "你的答案還沒化簡或展開"。</p>
                </InfoTip>
            </div>

            {simplifyWarning}

            <div>
                <PropCheckBox
                    times={this.props.times}
                    onChange={this.props.onChange}
                    labelAlignment="right"
                    label="用 × 表示乘號。" />
                <InfoTip>
                    <p>算術問題使用 × 表示乘法，代數問題用・表示乘法。</p>
                </InfoTip>
            </div>

            <div>
                <div>運算符號選擇:</div>
                {buttonSetChoices}
            </div>

            <div>
                <label>
                {"函數名稱: "}
                <input type="text"
                    defaultValue={this.props.functions.join(" ")}
                    onChange={this.handleFunctions} />
                </label>
                <InfoTip><p>
                    列在此處的變數為函數名稱，當我們使用 f(x)，會把它解讀成函數，而不是解釋成 f 乘以 x 。
                </p></InfoTip>
            </div>

        </div>;
    },

    handleTexInsert: function(str) {
        this.refs.expression.insert(str);
    },

    // called when the selected buttonset changes
    handleButtonSet: function(changingName) {
        var buttonSetNames = _(TexButtons.buttonSets).keys();

        // Filter to preserve order - using .union and .difference would always
        // move the last added button set to the end.
        // Because filter by buttonSetNames, the order can be keep
        var buttonSets = _(buttonSetNames).filter(set => {
            // if set in original buttonSets & set is changingName => false
            // if set in original buttonSets & set is not changingName => true
            // if set not in original buttonSets & set is changingName => true
            // if set not in original buttonSets & set is not changingName => false
            return _(this.props.buttonSets).contains(set) !==
                   (set === changingName);
        });

        this.props.onChange({ buttonSets });
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
    displayName: "Expression/數學式",
    getWidget: (enabledFeatures) => {
        // Allow toggling between the two versions of the widget
        return enabledFeatures.useMathQuill ? Expression : OldExpression;
    },
    editor: ExpressionEditor,
    transform: (editorProps) => {
        return _.pick(editorProps, "times", "functions", "buttonSets", "easybuttons");
    },
    hidden: false
};
