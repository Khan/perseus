/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");

const Util = require("../util.js");

const BlurInput         = require("react-components/blur-input.jsx");
const InfoTip           = require("../components/info-tip.jsx");

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

const InputNumberEditor = React.createClass({
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
        ReactDOM.findDOMNode(this.refs.input).focus();
        return true;
    },

    serialize: function() {
        return _.pick(this.props,
                "value", "simplify", "size", "inexact", "maxError",
                "answerType");
    }
});

module.exports = InputNumberEditor;
