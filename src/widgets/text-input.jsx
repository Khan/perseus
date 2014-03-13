/** @jsx React.DOM */

require("../core.js");
var Util = require("../util.js");
var Widgets = require("../widgets.js");

var JsonifyProps = require("../mixins/jsonify-props.jsx");
var Changeable = require("../mixins/changeable.jsx");

var InfoTip = require("../components/info-tip.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var NumberInput = require("../components/number-input.jsx");
var MultiButtonGroup = require("../components/multi-button-group.jsx");

var answerFormButtons = [
    {title: "Integers", value: "integer", text: "6", selected: true},
    {title: "Decimals", value: "decimal", text: "0.75", selected: true},
    {title: "Proper fractions", value: "proper", text: "\u2157",
        selected: true},
    {title: "Improper fractions", value: "improper",
        text: "\u2077\u2044\u2084", selected: true},
    {title: "Mixed numbers", value: "mixed", text: "1\u00BE", selected: true},
    {title: "Percentages", value: "percent", text: "%"},
    {title: "Numbers with pi", value: "pi", text: "\u03C0"}
];

var formExamples = {
    "integer": (options) => $._("an integer, like $6$"),
    "proper": (options) => {
        if (options.simplify === "optional") {
            return $._("a *proper* fraction, like $1/2$ or $6/10$");
        } else {
            return $._("a *simplified proper* fraction, like $3/5$");
        }
    },
    "improper": (options) => {
        if (options.simplify === "optional") {
            return $._("an *improper* fraction, like $10/7$ or $14/8$");
        } else {
            return $._("a *simplified improper* fraction, like $7/4$");
        }
    },
    "mixed": () => $._("a mixed number, like $1\\ 3/4$"),
    "decimal": () => $._("an *exact* decimal, like $0.75$"),
    "percent": () => $._("a percent, like $12.34\\%$"),
    "pi": () => $._("a multiple of pi, like $12\\ \\text{pi}$ or " +
                "$2/3\\ \\text{pi}$")
};

var TextInput = React.createClass({
    propTypes: {
        currentValue: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            currentValue: "",
            size: "normal"
        };
    },

    render: function() {
        return <input type="text"
                    value={this.props.currentValue}
                    onChange={this.handleChange}
                    className={"perseus-input-size-" + this.props.size} />;
    },

    handleChange: function(e) {
        this.props.onChange({ currentValue: e.target.value });
    },

    focus: function() {
        this.getDOMNode().focus();
        return true;
    },

    toJSON: function(skipValidation) {
        return {
            currentValue: this.props.currentValue
        };
    },

    simpleValidate: function(rubric) {
        return TextInput.validate(this.toJSON(), rubric);
    },

    examples: function() {
        return _.map(this.props.answerForms, function(form) {
            return formExamples[form](this.props);
        }, this);
    }
});

_.extend(TextInput, {
    validate: function(state, rubric) {
        // TODO(merlob) hook up skipValidation for answerForms === [] case
        // especially when strict; then there are no answers :P

        // TODO(merlob) make answerForms autofill-in in a semi-intelligent
        // but also not annoying way.

        var allAnswerForms = _.pluck(answerFormButtons, "value");

        var val = Khan.answerTypes.number.createValidatorFunctional(
            rubric.value, {
                simplify: rubric.simplify,
                inexact: true,
                maxError: rubric.maxError,
                forms: rubric.strict ? rubric.answerForms : allAnswerForms
            });

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

var TextInputEditor = React.createClass({
    mixins: [JsonifyProps, Changeable],

    getDefaultProps: function() {
        return {
            value: null,
            simplify: "required",
            size: "normal",
            maxError: null,
            answerForms: [],
            strict: false
        };
    },

    handleAnswerChange: function(str) {
        var value = Util.firstNumericalParse(str) || 0;
        this.props.onChange({value: value});
    },

    render: function() {
        return <div className="perseus-input-number-editor">
            <div><label>
                {' '}Correct answer:{' '}
                <NumberInput value={this.props.value}
                           onChange={this.handleAnswerChange}
                           ref="input" />
                </label>
                {' '} &plusmn; {' '}
                <NumberInput className="max-error"
                    value={this.props.maxError}
                    onChange={this.change("maxError")}
                    placeholder="0"
                    ref="input" />
            </div>

            <div>
                <label>
                    {' '}Unsimplified answers{' '}
                    <select value={this.props.simplify}
                            onChange={function(e) {
                                this.props.onChange({simplify:
                                e.target.value});
                            }.bind(this)}>
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

            <div>
            Answer format:
            <MultiButtonGroup values={this.props.answerForms}
                buttons={answerFormButtons}
                onChange={this.change("answerForms")} />
            <InfoTip><p>
                These answer formats are the <i>suggested</i> formats that
                show up in "Acceptable Formats" field. They do not restrict
                the answer accepted unless you select "strict" below.
            </p></InfoTip>
            </div>
            <div>
            <PropCheckBox label="Strictly accept only these answer formats"
                strict={this.props.strict}
                onChange={this.change("strict")} />
            </div>

            <div>
                <label>
                    {' '}Width{' '}
                    <select value={this.props.size}
                            onChange={function(e) {
                                this.props.onChange({size: e.target.value});
                            }.bind(this)}>
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
    }
});

Widgets.register("text-input", TextInput);
Widgets.register("text-input-editor", TextInputEditor);
