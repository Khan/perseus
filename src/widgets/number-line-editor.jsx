/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/jsx-sort-prop-types */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var _ = require("underscore");

var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var ButtonGroup  = require("react-components/button-group.jsx");
var InfoTip      = require("../components/info-tip.jsx");
var NumberInput  = require("../components/number-input.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var RangeInput   = require("../components/range-input.jsx");

var knumber = require("kmath").number;
var bound = (x, gt, lt) => Math.min(Math.max(x, gt), lt);

var EN_DASH = "\u2013";

var NumberLineEditor = React.createClass({
    propTypes: {
        range: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,

        labelRange: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
        labelStyle: React.PropTypes.string.isRequired,
        labelTicks: React.PropTypes.bool,

        divisionRange: React.PropTypes.arrayOf(
            React.PropTypes.number
        ).isRequired,
        numDivisions: React.PropTypes.number.isRequired,
        snapDivisions: React.PropTypes.number,

        tickStep: React.PropTypes.number,
        correctRel: React.PropTypes.oneOf(["lt", "gt", "le", "ge", "eq"]),
        correctX: React.PropTypes.number,
        initialX: React.PropTypes.number,
        isTickCtrl: React.PropTypes.bool,

        onChange: React.PropTypes.func.isRequired,

        static: React.PropTypes.bool,
        showTooltips: React.PropTypes.bool,
    },

    mixins: [EditorJsonify],

    getDefaultProps: function() {
        return {
            range: [0, 10],

            labelRange: [null, null],
            labelStyle: "decimal",
            labelTicks: true,

            divisionRange: [1, 12],
            numDivisions: 5,
            snapDivisions: 2,

            tickStep: null,
            correctRel: "eq",
            correctX: null,
            initialX: null,

            showTooltips: false,
        };
    },

    onRangeChange: function(range) {
        // Changing the range constrains the initial position, as well as the
        // position of the answer and labels. Atm, it just marks them as
        // invalid and prevents the number line from showing; it was annoying
        // to change it for them, because if they're typing in fractions,
        // it registers one-at-a-time and messes things up.
        this.props.onChange({range: range});
    },

    onLabelRangeChange: function(i, num) {
        var labelRange = this.props.labelRange.slice();
        var otherNum = labelRange[1 - i];

        if (num == null || otherNum == null) {
            labelRange[i] = num;
        } else {
            // If both labels have values, this updates the "appropriate" one.
            // It enforces that the position of the left label <= right label.
            // If left otherwise, it makes certain aspects of validation hard.
            labelRange = [Math.min(num, otherNum), Math.max(num, otherNum)];
        }

        this.props.onChange({labelRange: labelRange});
    },

    onDivisionRangeChange: function(divisionRange) {
        var numDivisions = this.props.numDivisions;
        numDivisions = bound(numDivisions, divisionRange[0], divisionRange[1]);
        this.props.onChange({
            divisionRange: divisionRange,
            numDivisions: numDivisions});
    },

    onNumChange: function(key, value) {
        var opts = {};
        opts[key] = value;
        this.props.onChange(opts);
    },

    onNumDivisionsChange: function(numDivisions) {
        var divRange = this.props.divisionRange.slice();

        if (!_.isFinite(numDivisions)) {
            numDivisions = null;
        }

        // Don't allow a fraction for the number of divisions
        numDivisions = Math.round(numDivisions);

        // Don't allow negative numbers for the number of divisions
        numDivisions = numDivisions < 0 ? numDivisions * -1 : numDivisions;

        // If the number of divisions isn't blank, update the number line
        if (numDivisions) {
            // Constrain numDivisions to be within the allowed range
            numDivisions = Math.min(
                divRange[1],
                Math.max(divRange[0], numDivisions)
            );

            this.props.onChange({
                tickStep: null,
                divisionRange: divRange,
                numDivisions: numDivisions,
            });
        }
    },

    onTickStepChange: function(tickStep) {
        this.props.onChange({
            numDivisions: null,
            tickStep: tickStep,
        });
    },

    onChangeRelation: function(e) {
        const value = e.target.value;
        this.props.onChange({
            correctRel: value,
            isInequality: value !== "eq",
        });
    },

    onLabelStyleChange: function(labelStyle) {
        this.props.onChange({
            labelStyle: labelStyle,
        });
    },

    render: function() {
        var range = this.props.range;
        var labelRange = this.props.labelRange;
        var divisionRange = this.props.divisionRange;

        range[0] = +range[0]; range[1] = +range[1];

        var width = range[1] - range[0];
        var numDivisions = this.props.numDivisions;
        var snapDivisions = this.props.snapDivisions;
        var tickStep = this.props.tickStep;
        var isTickCtrl = this.props.isTickCtrl;

        let step;
        if (!isTickCtrl) {
            // this will help constrain the answer to what is reachable
            step = tickStep ? tickStep / snapDivisions :
                  (width / numDivisions) / snapDivisions;
        } else {
            // but if tickCtrl is on, the range of what is reachable is
            // rather large, and it becomes obnoxious to check for this
            step = null;
        }

        var labelStyleEditorButtons = [
              {value: "decimal", content: "0.75", title: "Decimals"},
              {value: "improper", content: "\u2077\u2044\u2084",
                title: "Improper fractions"},
              {value: "mixed", content: "1\u00BE",
                title: "Mixed numbers"},
              {value: "non-reduced", content: "\u2078\u2044\u2084",
                title: "Non-reduced"},
        ];

        return <div className="perseus-widget-number-line-editor">
            <div className="perseus-widget-row">
                Correct x
                {" "}
                <select
                    value={this.props.correctRel}
                    onChange={this.onChangeRelation}
                >
                    <option value="eq"> = </option>
                    <option value="lt"> &lt; </option>
                    <option value="gt"> &gt; </option>
                    <option value="le"> &le; </option>
                    <option value="ge"> &ge; </option>
                </select>
                {" "}
                <NumberInput
                    value={this.props.correctX}
                    format={this.props.labelStyle}
                    onChange={this.onNumChange.bind(this, "correctX")}
                    checkValidity={val =>
                        val >= range[0] && val <= range[1] &&
                        (!step || knumber.isInteger((val - range[0]) / step))
                    }
                    placeholder="answer" size="normal"
                    useArrowKeys={true}
                />
                <InfoTip><p>
                    This is the correct answer. The answer is validated
                    (as right or wrong) by using only the end position of the
                    point and the relation (=, &lt;, &gt;, &le;, &ge;).
                </p></InfoTip>
            </div>

            <div className="perseus-widget-row">
                {this.props.static ?
                    <label>
                        {/* Don't display initial position input in static mode
                            since it isn't used. */}
                        Range:
                    </label> :
                    <label>
                        Position:
                        {" "}
                        <NumberInput
                            value={this.props.initialX}
                            format={this.props.labelStyle}
                            onChange={this.onNumChange.bind(this, "initialX")}
                            placeholder={range[0]}
                            checkValidity={(val) => {
                                return (val >= range[0]) && (val <= range[1]);
                            }}
                            useArrowKeys={true}
                        />
                        {" \u2208 " /* element of (little E) symbol @Nolint */}
                    </label>}

                <RangeInput
                    value={range}
                    onChange={this.onRangeChange}
                    format={this.props.labelStyle}
                    useArrowKeys={true}
                />
                <InfoTip><p>
                    This controls the initial position of the point along the
                    number line and the <strong>range</strong>, the position
                    of the endpoints of the number line. Setting the range
                    constrains the position of the answer and the labels.
                </p><p>
                    In static mode, the initial position of the point is
                    determined by Correct x instead of position.
                </p></InfoTip>
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    Labels:
                    {" "}
                    <NumberInput
                        value={labelRange[0]} placeholder={range[0]}
                        format={this.props.labelStyle}
                        checkValidity={val =>
                            val >= range[0] && val <= range[1]}
                        onChange={this.onLabelRangeChange.bind(this, 0)}
                        useArrowKeys={true}
                    />
                    <span> &amp; </span>
                    <NumberInput
                        value={labelRange[1]} placeholder={range[1]}
                        format={this.props.labelStyle}
                        checkValidity={val =>
                            val >= range[0] && val <= range[1]}
                        onChange={this.onLabelRangeChange.bind(this, 1)}
                        useArrowKeys={true}
                    />
                    <InfoTip><p>
                        This controls the position of the left / right labels.
                        By default, the labels are set by the range <br />
                        <strong>Note:</strong> Ensure that the labels line up
                        with the tick marks, or it may be confusing for users.
                    </p></InfoTip>
                </div>
            </div>
            <div className="perseus-widget-row">
                Style:
                {" "}
                <ButtonGroup
                    allowEmpty={false}
                    value={this.props.labelStyle}
                    buttons={labelStyleEditorButtons}
                    onChange={this.onLabelStyleChange}
                />
                <InfoTip><p>
                    This controls the styling of the labels for the two
                    main labels as well as all the tick mark labels,
                    if applicable. Your choices are decimal,
                    improper fractions, mixed fractions, and non-reduced
                    fractions.
                </p></InfoTip>
            </div>
            <div className="perseus-widget-row">
                {!this.props.static &&
                    <div className="perseus-widget-left-col">
                        <PropCheckBox
                            label="Show tick controller"
                            isTickCtrl={this.props.isTickCtrl}
                            onChange={this.props.onChange}
                        />
                    </div>
                }
                <div className="perseus-widget-right-col">
                    <PropCheckBox
                        label="Show label ticks"
                        labelTicks={this.props.labelTicks}
                        onChange={this.props.onChange}
                    />
                </div>
            </div>

            <div className="perseus-widget-row">
                {!this.props.static &&
                    <PropCheckBox
                        label="Show tooltips"
                        showTooltips={this.props.showTooltips}
                        onChange={this.props.onChange}
                    />
                }
            </div>
            <div className="perseus-widget-row">
                {isTickCtrl && <span>
                    <label>
                        Start num divisions at
                        {" "}
                        <NumberInput
                            value={this.props.numDivisions || null}
                            format={"decimal"}
                            onChange={this.onNumDivisionsChange}
                            checkValidity={(val) => {
                                return (val >= divisionRange[0]) &&
                                    (val <= divisionRange[1]);
                            }}
                            placeholder={width / this.props.tickStep}
                            useArrowKeys={true}
                        />
                    </label>
                    <InfoTip><p>
                        This controls the number (and position) of the tick
                        marks. The number of divisions is constrained to
                        {" " + divisionRange[0] + EN_DASH + divisionRange[1]}.
                        <br />
                        <strong>Note:</strong> The user will be able to specify
                        the number of divisions in a number input.
                    </p></InfoTip></span>}
                {!isTickCtrl && <span>
                    <label>
                        Num divisions:
                        {" "}
                        <NumberInput
                            value={this.props.numDivisions || null}
                            format={"decimal"}
                            onChange={this.onNumDivisionsChange}
                            checkValidity={(val) => {
                                return (val >= divisionRange[0]) &&
                                    (val <= divisionRange[1]);
                            }}
                            placeholder={width / this.props.tickStep}
                            useArrowKeys={true}
                        />
                    </label>
                    {" "}
                    <label>
                        or tick step:
                        {" "}
                        <NumberInput
                            value={this.props.tickStep || null}
                            format={this.props.labelStyle}
                            onChange={this.onTickStepChange}
                            checkValidity={(val) => {
                                return val > 0 && val <= width;
                            }}
                            placeholder={width / this.props.numDivisions}
                            useArrowKeys={true}
                        />
                    </label>
                    <InfoTip><p>
                        This controls the number (and position) of the tick
                        marks; you can either set the number of divisions (2
                        divisions would split the entire range in two halves),
                        or the tick step (the distance between ticks) and the
                        other value will be updated accordingly. <br />
                        <strong>Note:</strong> There is no check to see if
                        labels coordinate with the tick marks, which may be
                        confusing for users if the blue labels and black ticks
                        are off-step.
                    </p></InfoTip></span>}
            </div>
            <div className="perseus-widget-row">
                <label>
                    Snap increments per tick:
                    {" "}
                    <NumberInput
                        value={snapDivisions}
                        checkValidity={(val) => val > 0}
                        format={this.props.labelStyle}
                        onChange={this.onNumChange.bind(this, "snapDivisions")}
                        useArrowKeys={true}
                    />
                </label>
                <InfoTip><p>
                    This determines the number of different places the point
                    will snap between two adjacent tick marks. <br />
                    <strong>Note:</strong>Ensure the required number of
                    snap increments is provided to answer the question.
                </p></InfoTip>
            </div>

        </div>;
    },
});

module.exports = NumberLineEditor;
