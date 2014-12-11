var React             = require('react');
var _ = require("underscore");

var BlurInput         = require("react-components/blur-input.jsx");
var InfoTip           = require("react-components/info-tip.jsx");
var InputWithExamples = require("../components/input-with-examples.jsx");
var ParseTex          = require("../tex-wrangler.js").parseTex;

var ApiClassNames = require("../perseus-api.jsx").ClassNames;
var ApiOptions = require("../perseus-api.jsx").Options;
var Util = require("../util.js");
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
    "integer": function(options) { return $._("an integer, like $6$"); },
    "proper": function(options) {
        if (options.simplify === "optional") {
            return $._("a *proper* fraction, like $1/2$ or $6/10$");
        } else {
            return $._("a *simplified proper* fraction, like $3/5$");
        }
    },
    "improper": function(options) {
        if (options.simplify === "optional") {
            return $._("an *improper* fraction, like $10/7$ or $14/8$");
        } else {
            return $._("a *simplified improper* fraction, like $7/4$");
        }
    },
    "mixed": function(options) {
        return $._("a mixed number, like $1\\ 3/4$");
    },
    "decimal": function(options) {
        return $._("an *exact* decimal, like $0.75$");
    },
    "percent": function(options) {
        return $._("a percent, like $12.34\\%$");
    },
    "pi": function(options) {
        return $._("a multiple of pi, like $12\\ \\text{pi}$ or " +
                "$2/3\\ \\text{pi}$");
    }
};

var InputNumber = React.createClass({
    propTypes: {
        currentValue: React.PropTypes.string,
        enabledFeatures: EnabledFeatures.propTypes,
        reviewModeRubric: React.PropTypes.object,
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
        // HACK(johnsullivan): Create a function with shared logic between this
        // and NumericInput.
        var rubric = this.props.reviewModeRubric;
        var correct = null;
        var answerBlurb = null;
        if (rubric) {
            var score = this.simpleValidate(rubric);
            correct = score.type === "points" &&
                          score.earned === score.total;

            if (!correct) {
                // TODO(johnsullivan): Make this a little more human-friendly.
                var answerString = String(rubric.value);
                if (rubric.inexact && rubric.maxError) {
                    answerString += " \u00B1 " + rubric.maxError;
                }
                answerBlurb = <span className="perseus-possible-answers">
                    <span className="perseus-possible-answer">
                        {answerString}
                    </span>
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
        this.props.onChange({ currentValue: newValue });
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

        return [$._("**Acceptable Formats**")].concat(examples);
    },

    statics: {
        displayMode: "inline-block"
    }
});

_.extend(InputNumber, {
    validate: function(state, rubric, onInputError) {
        if (rubric.answerType == null) {
            rubric.answerType = "number";
        }
        var val = Khan.answerTypes.number.createValidatorFunctional(
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

var InputNumberEditor = React.createClass({
    propTypes: {
        value: React.PropTypes.number,
        simplify: React.PropTypes.oneOf(['required', 'optional', 'enforced']),
        size: React.PropTypes.oneOf(['normal', 'small']),
        inexact: React.PropTypes.bool,
        maxError: React.PropTypes.number,
        answerType: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            value: 0,
            simplify: "required",
            size: "normal",
            inexact: false,
            maxError: 0.1,
            answerType: "number"
        };
    },

    handleAnswerChange: function(str) {
        var value = Util.firstNumericalParse(str) || 0;
        this.props.onChange({value: value});
    },

    render: function() {
        var answerTypeOptions = _.map(answerTypes, function(v, k) {
            return <option value={k} key={k}>{v.name}</option>;
        }, this);

        return <div>
            <div><label>
                Correct answer:{' '}
                <BlurInput value={"" + this.props.value}
                           onChange={this.handleAnswerChange}
                           ref="input" />
            </label></div>

            <div>
                <label>
                    Unsimplified answers{' '}
                    <select value={this.props.simplify}
                            onChange={e => {
                                this.props.onChange({simplify:
                                e.target.value});
                            }}>
                        <option value="required">will not be graded</option>
                        <option value="optional">will be accepted</option>
                        <option value="enforced">will be marked wrong</option>
                    </select>
                </label>
                <InfoTip>
                    <p>Normally select "will not be graded". This will give the
                    user a message saying the answer is correct but not
                    simplified. The user will then have to simplify it and
                    re-enter, but will not be penalized. (5th grade and
                    anything after)</p>
                    <p>Select "will be accepted" only if the user is not
                    expected to know how to simplify fractions yet. (Anything
                    prior to 5th grade)</p>
                    <p>Select "will be marked wrong" only if we are
                    specifically assessing the ability to simplify.</p>
                </InfoTip>
            </div>

            <div><label>
                <input type="checkbox"
                    checked={this.props.inexact}
                    onChange={e => {
                        this.props.onChange({inexact: e.target.checked});
                    }} />
                {' '}Allow inexact answers
            </label>

            <label>
            <input /* TODO(emily): don't use a hidden checkbox for alignment */
                type="checkbox" style={{visibility: "hidden"}} />
            Max error:{' '}
            <input type="text" disabled={!this.props.inexact}
                defaultValue={this.props.maxError}
                onBlur={e => {
                    var ans = "" + (Util.firstNumericalParse(
                            e.target.value) || 0);
                    e.target.value = ans;
                    this.props.onChange({maxError: ans});
                }} />
            </label></div>

            <div>
            Answer type:{' '}
            <select
                value={this.props.answerType}
                onChange={e => {
                    this.props.onChange({answerType: e.target.value});
                }}>
                {answerTypeOptions}
            </select>
            <InfoTip>
                <p>Use the default "Numbers" unless the answer must be in a
                specific form (e.g., question is about converting decimals to
                fractions).</p>
            </InfoTip>
            </div>

            <div>
                <label>
                    Width{' '}
                    <select value={this.props.size}
                            onChange={e => {
                                this.props.onChange({size: e.target.value});
                            }}>
                        <option value="normal">Normal (80px)</option>
                        <option value="small">Small (40px)</option>
                    </select>
                </label>
                <InfoTip>
                    <p>Use size "Normal" for all text boxes, unless there are
                    multiple text boxes in one line and the answer area is too
                    narrow to fit them.</p>
                </InfoTip>
            </div>
        </div>;
    },

    focus: function() {
        this.refs.input.getDOMNode().focus();
        return true;
    },

    serialize: function() {
        return _.pick(this.props,
                "value", "simplify", "size", "inexact", "maxError",
                "answerType");
    }
});

var propTransform = (editorProps) => {
    return _.pick(editorProps, "simplify", "size", "answerType");
};

module.exports = {
    name: "input-number",
    displayName: "Number text box (old)",
    hidden: true,
    widget: InputNumber,
    editor: InputNumberEditor,
    transform: propTransform
};
