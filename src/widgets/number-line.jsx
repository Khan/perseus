/** @jsx React.DOM */

var React = require('react');

var Changeable   = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var ButtonGroup  = require("react-components/button-group.jsx");
var InfoTip      = require("react-components/info-tip.jsx");
var Interactive2 = require("../interactive2.js");
var NumberInput  = require("../components/number-input.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var RangeInput   = require("../components/range-input.jsx");

var Graphie = require("../components/graphie.jsx");
var MovablePoint = Graphie.MovablePoint;
var Line = Graphie.Line;
var Label = Graphie.Label;

var knumber = KhanUtil.knumber;
var kpoint = KhanUtil.kpoint;

var bound = (x, gt, lt) => Math.min(Math.max(x, gt), lt);
var deepEq = require("../util.js").deepEq;
var assert = require("../interactive2/interactive-util.js").assert;

var reverseRel = {
    ge: "le",
    gt: "lt",
    le: "ge",
    lt: "gt"
};

var toggleStrictRel = {
    ge: "gt",
    gt: "ge",
    le: "lt",
    lt: "le"
};

function formatImproper(n, d) {
    if (d === 1) {
        return "" + n;
    } else {
        return n + "/" + d;
    }
}

function formatMixed(n, d) {
    if (n < 0) {
        return "-" + formatMixed(-n, d);
    }
    var w = Math.floor(n / d);
    if (w === 0) {
        return formatImproper(n, d);
    } else if (n - w * d === 0) {
        return "" + w;
    } else {
        return w + "\\:" + formatImproper(n - w * d, d);
    }
}

function formatNonReduced(n, d, base) {
    var factor = Math.floor(base / d);
    return formatImproper(n * factor, base);
}

_label = (graphie, labelStyle, pos, value, base) => {
    value = value || pos;

    // TODO(jack): Find out if any exercises have "decimal ticks" set,
    // and if so, re-save them and remove this check.
    if (labelStyle === "decimal" || labelStyle === "decimal ticks") {
        return graphie.label([pos, -0.53],
            Math.round(value * 100) / 100, "center");
    } else if (labelStyle === "improper") {
        var frac = KhanUtil.toFraction(value);
        return graphie.label([pos, -0.53],
                formatImproper(frac[0], frac[1]), "center");
    } else if (labelStyle === "mixed") {
        var frac = KhanUtil.toFraction(value);
        return graphie.label([pos, -0.53],
                formatMixed(frac[0], frac[1]), "center");
    } else if (labelStyle === "non-reduced") {
        var frac = KhanUtil.toFraction(value);
        return graphie.label([pos, -0.53],
                formatNonReduced(frac[0], frac[1], base), "center");
    }
};

TickMarks = Graphie.createSimpleClass((graphie, props) => {
    // Avoid infinite loop
    if (!_.isFinite(props.tickStep) || props.tickStep <= 0) {
        return []; // this has screwed me for the last time!
    }

    var results = [];

    // For convenience, extract some props into separate variables
    var range = props.range;
    var labelRange = props.labelRange;
    var range = props.range;
    var leftLabel = labelRange[0] == null ? range[0] : labelRange[0];
    var rightLabel = labelRange[1] == null ? range[1] : labelRange[1];

    // Find base via GCD for non-reduced fractions
    var base;
    if (props.labelStyle === "non-reduced") {
        var fractions = [leftLabel, rightLabel];
        for (var i = 0; i < props.numDivisions; i++) {
            var x = range[0] + i * props.tickStep;
            fractions.push(x);
        }
        var getDenom = (x) => KhanUtil.knumber.toFraction(x)[1];
        var denoms = _.map(fractions, getDenom);
        base = _.reduce(denoms, (x, y) => KhanUtil.getLCM(x, y));
    } else {
        base = undefined;
    }

    // Draw and save the tick marks and tick labels
    for (var i = 0; i < props.numDivisions; i++) {
        var x = range[0] + i * props.tickStep;
        results.push(graphie.line([x, -0.2], [x, 0.2]));

        var labelTicks = props.labelTicks;
        if (labelTicks || props.labelStyle === "decimal ticks") {
            results.push(_label(graphie, props.labelStyle, x, x, base));
        }
    }

    // Render the text labels
    graphie.style({color: KhanUtil.DYNAMIC}, () => {
        results.push(_label(graphie, props.labelStyle, leftLabel, leftLabel,
            base));
        results.push(_label(graphie, props.labelStyle, rightLabel, rightLabel,
            base));
    });

    // Render the labels' lines
    graphie.style(
        {
            stroke: KhanUtil.DYNAMIC,
            strokeWidth: 3.5
        },
        () => {
            results.push(graphie.line([leftLabel, -0.2], [leftLabel, 0.2]));
            results.push(graphie.line([rightLabel, -0.2], [rightLabel, 0.2]));
        }
    );

    return results;
});


var NumberLine = React.createClass({
    mixins: [Changeable],

    propTypes: {
        range: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,

        labelRange: React.PropTypes.array.isRequired,
        labelStyle: React.PropTypes.string.isRequired,
        labelTicks: React.PropTypes.bool.isRequired,

        divisionRange: React.PropTypes.arrayOf(
            React.PropTypes.number
        ).isRequired,
        numDivisions: React.PropTypes.number.isRequired,
        snapDivisions: React.PropTypes.number.isRequired,

        isTickCtrl: React.PropTypes.bool.isRequired,
        isInequality: React.PropTypes.bool.isRequired,

        numLinePosition: React.PropTypes.number.isRequired,
        rel: React.PropTypes.oneOf(["lt", "gt", "le", "ge"])
    },

    getDefaultProps: function() {
        return {
            range: [0, 10],
            labelStyle: "decimal",
            labelRange: [null, null],
            divisionRange: [1, 10],
            labelTicks: true,
            isTickCtrl: false,
            isInequality: false,
            numLinePosition: 0,
            snapDivisions: 2,
            rel: "ge"
        };
    },

    isValid: function() {
        var range = this.props.range;
        var initialX = this.props.numLinePosition;
        var divisionRange = this.props.divisionRange;

        initialX = initialX == null ? range[0] : initialX;

        return range[0] <  range[1] &&
               initialX >= range[0] &&
               initialX <= range[1] &&
               divisionRange[0] < divisionRange[1] &&
               0 < this.props.numDivisions &&
               0 < this.props.snapDivisions;
    },

    render: function() {
        var inequalityControls = <div>
            <input
                type="button"
                className="simple-button"
                value="Switch direction"
                onClick={this.handleReverse} />
            <input
                type="button"
                className="simple-button"
                value={_(["le", "ge"]).contains(this.props.rel) ?
                        "Make circle open" :
                        "Make circle filled"}
                onClick={this.handleToggleStrict} />
        </div>;

        return <div className={"perseus-widget " +
                "perseus-widget-interactive-number-line"}>
            {!this.isValid() ? <div>invalid number line configuration</div> :
                this._renderGraphie()}
            {this.props.isInequality && inequalityControls}
        </div>;
    },

    _renderGraphie: function() {
        // Position variables
        var widthInPixels = 400;
        var range = this.props.range;
        var width = range[1] - range[0];
        var scale = width / widthInPixels;
        var buffer = 30 * scale;

        // Initiate the graphie without actually drawing anything
        var left = range[0] - buffer, right = range[1] + buffer;
        var bottom = -1, top = 1 + (this.props.isTickCtrl ? 1 : 0);

        var options = _.pick(this.props, [
            "range",
            "isTickCtrl",
        ]);

        // TODO(aria): Maybe save this as `this.calculatedProps`?
        var props = _.extend({}, this.props, {
            tickCtrlPosition: this.calculateTickControlPosition(
                this.props.numDivisions
            ),
            tickStep: width / this.props.numDivisions
        });

        return <Graphie
                ref="graphie"
                box={[460, (this.props.isTickCtrl ? 120 : 80)]}
                options={options}
                onMouseDown={(coord) => {
                    this.refs.graphie.movables.numberLinePoint.grab(coord);
                }}
                setup={this._setupGraphie}>
            {this._renderTickControl(props)}
            {TickMarks(_.pick(props, [
                "range",
                "numDivisions",
                "labelTicks",
                "labelStyle",
                "labelRange",
                "tickStep"
            ]))}
            {this._renderInequality(props)}
            {this._renderNumberLinePoint(props)}
        </Graphie>;
    },

    snapNumLinePosition: function(props, numLinePosition) {
        var left = props.range[0];
        var right = props.range[1];
        var snapX = props.tickStep / props.snapDivisions;

        x = bound(numLinePosition, left, right);
        x = left + knumber.roundTo(x - left, snapX);
        assert(_.isFinite(x));
        return x;
    },

    _renderNumberLinePoint: function(props) {
        var isOpen = _(["lt", "gt"]).contains(props.rel);
        var normalStyle = {
            fill: isOpen ? KhanUtil._BACKGROUND : KhanUtil.INTERACTIVE,
            "stroke-width": isOpen ? 3 : 1
        };
        var highlightStyle = {
            fill: isOpen ? KhanUtil._BACKGROUND : KhanUtil.INTERACTING,
            "stroke-width": isOpen ? 3 : 1
        };

        return <MovablePoint
            ref="numberLinePoint"
            pointSize={6}
            coord={[props.numLinePosition, 0]}
            constraints={[
                (coord, prevCoord) => {  // constrain-y
                    return [coord[0], prevCoord[1]];
                },
                (coord, prevCoord) => {  // snap X
                    var x = this.snapNumLinePosition(props, coord[0]);
                    return [x, coord[1]];
                }
            ]}
            normalStyle={normalStyle}
            highlightStyle={highlightStyle}
            onMove={(coord) => {
                this.change({numLinePosition: coord[0]});
            }}
        />;
    },

    _renderTickControl: function(props) {
        if (!this.props.isTickCtrl) {
            return null;
        }

        var width = props.range[1] - props.range[0];
        var tickCtrlWidth = (1/3) * width;
        var tickCtrlLeft = props.range[0] + (1/3) * width;
        var tickCtrlRight = props.range[0] + (2/3) * width;
        var scale = width / 400;
        var textBuffer = 50 * scale;
        var textLeft = tickCtrlLeft - textBuffer;
        var textRight = tickCtrlRight + textBuffer;
        var divSpan= props.divisionRange[1] - props.divisionRange[0];

        return [
            <Line start={[tickCtrlLeft, 1.5]} end={[tickCtrlRight, 1.5]} />,
            <Label
                coord={[textLeft, 1.5]}
                text="fewer ticks"
                direction="center"
                tex={false} />,
            <Label
                coord={[textRight, 1.5]}
                text="more ticks"
                direction="center"
                tex={false} />,
            <MovablePoint
                key="tickControl"
                pointSize={5}
                coord={[props.tickCtrlPosition, 1.5]}
                constraints={[
                    (coord, prevCoord) => {  // constrain-y
                        return [coord[0], prevCoord[1]];
                    },
                    (coord, prevCoord) => {  // snap & bound
                        var snapX = tickCtrlWidth / (divSpan);
                        x = bound(coord[0], tickCtrlLeft, tickCtrlRight);
                        x = tickCtrlLeft +
                            Math.round((x - tickCtrlLeft) / (snapX)) * snapX;
                        assert(_.isFinite(x));
                        return [x, coord[1]];
                    }
                ]}
                onMove={(coord) => {
                    var numDivisions = this.calculateNumDivisions(coord[0]);
                    this.change({numDivisions: numDivisions});
                }}
                onMoveEnd={(coord) => {
                    // Snap point to a tick step
                    var numDivisions = this.calculateNumDivisions(coord[0]);

                    var nextProps = _.extend({}, props, {
                        numDivisions: numDivisions,
                        tickStep: width / numDivisions
                    });
                    var newNumLinePosition = this.snapNumLinePosition(
                        nextProps,
                        props.numLinePosition
                    );
                    this.change({numLinePosition: newNumLinePosition});
                }}
            />
        ];
    },

    handleReverse: function() {
        var newRel = reverseRel[this.props.rel];
        this.props.onChange({rel: newRel});
    },

    handleToggleStrict: function() {
        var newRel = toggleStrictRel[this.props.rel];
        this.props.onChange({rel: newRel});
    },

    _getInequalityEndpoint: function(props) {
        var isGreater = _(["ge","gt"]).contains(props.rel);
        var widthInPixels = 400;
        var range = props.range;
        var scale = (range[1] - range[0]) / widthInPixels;
        var buffer = 30 * scale;
        var left = range[0] - buffer;
        var right = range[1] + buffer;
        var end = isGreater ? [right, 0] : [left, 0];
        return end;
    },

    _renderInequality: function(props) {
        if (props.isInequality) {
            var end = this._getInequalityEndpoint(props);
            var style = {
                arrows: "->",
                stroke: KhanUtil.DYNAMIC,
                strokeWidth: 3.5
            };

            return <Line
                start={[props.numLinePosition, 0]}
                end={end}
                style={style} />;
        } else {
            return null;
        }
    },

    calculateTickControlPosition: function(numDivisions) {
        var width = this.props.range[1] - this.props.range[0];
        var tickCtrlLeft = this.props.range[0] + (1/3) * width;
        var tickCtrlWidth = (1/3) * width;
        var minDivs = this.props.divisionRange[0];
        var maxDivs = this.props.divisionRange[1];

        var tickCtrlPosition = tickCtrlLeft + tickCtrlWidth *
                ((numDivisions - minDivs) / (maxDivs - minDivs));

        return tickCtrlPosition;
    },

    calculateNumDivisions: function(tickCtrlPosition) {
        var width = this.props.range[1] - this.props.range[0];
        var tickCtrlLeft = this.props.range[0] + (1/3) * width;
        var tickCtrlRight = this.props.range[0] + (2/3) * width;
        var tickCtrlWidth = (1/3) * width;
        var minDivs = this.props.divisionRange[0];
        var maxDivs = this.props.divisionRange[1];

        var tickCtrlPosition = bound(tickCtrlPosition,
                       tickCtrlLeft, tickCtrlRight);
        var numDivs = minDivs + Math.round((maxDivs - minDivs) *
                ((tickCtrlPosition - tickCtrlLeft) / tickCtrlWidth));

        assert(_.isFinite(numDivs));
        return numDivs;
    },

    _setupGraphie: function(graphie, options) {
        // Ensure a sane configuration to avoid infinite loops
        if (!this.isValid()) {return;}

        // Position variables
        var widthInPixels = 400;
        var range = options.range;
        var scale = (range[1] - range[0]) / widthInPixels;
        var buffer = 30 * scale;

        // Initiate the graphie without actually drawing anything
        var left = range[0] - buffer, right = range[1] + buffer;
        var bottom = -1, top = 1 + (options.isTickCtrl ? 1 : 0);
        graphie.init({
            range: [[left, right], [bottom, top]],
            scale: [1 / scale, 40]
        });

        // Draw the number line
        var center = (range[0] + range[1]) / 2;
        graphie.line([center, 0], [right, 0], {arrows: "->"});
        graphie.line([center, 0], [left, 0], {arrows: "->"});
    },

    getUserInput: function() {
        return {
            numLinePosition: this.props.numLinePosition,
            rel: this.props.isInequality ? this.props.rel : "eq"
        };
    },

    simpleValidate: function(rubric) {
        return NumberLine.validate(this.getUserInput(), rubric);
    },

    focus: $.noop,

    statics: {
        displayMode: "block"
    }
});


_.extend(NumberLine, {
    validate: function(state, rubric) {
        var range = rubric.range;
        var start = rubric.initialX != null ? rubric.initialX : range[0];
        var startRel = rubric.isInequality ? "ge" : "eq";
        var correctRel = rubric.correctRel || "eq";

        if (knumber.equal(state.numLinePosition, rubric.correctX || 0) &&
                correctRel === state.rel) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else if (state.numLinePosition === start && state.rel === startRel) {
            // We're where we started.
            return {
                type: "invalid",
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});


var NumberLineEditor = React.createClass({
    getDefaultProps: function() {
        return {
            range: [0, 10],
            labelRange: [null, null],
            divisionRange: [1, 10],
            labelStyle: "decimal",
            labelTicks: true,
            numDivisions: 5,
            tickStep: null,
            snapDivisions: 2,
            correctRel: "eq",
            correctX: null,
            initialX: null
        };
    },

    mixins: [EditorJsonify],

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
              {value: "decimal", content: "0.75", title: "Decimals",},
              {value: "improper", content: "\u2077\u2044\u2084",
                title: "Improper fractions"},
              {value: "mixed", content: "1\u00BE",
                title: "Mixed numbers"},
              {value: "non-reduced", content: "\u2078\u2044\u2084",
                title: "Non-reduced"}];

        return <div className="perseus-widget-number-line-editor">
            <div className="perseus-widget-row">
                <label>correct x</label>
                <select value={this.props.correctRel}
                  onChange={this.onChangeRelation}>
                    <option value="eq"> = </option>
                    <option value="lt"> &lt; </option>
                    <option value="gt"> &gt; </option>
                    <option value="le"> &le; </option>
                    <option value="ge"> &ge; </option>
                </select>
                <NumberInput value={this.props.correctX}
                    format={this.props.labelStyle}
                    onChange={this.onNumChange.bind(this, "correctX")}
                    checkValidity={val =>
                        val >= range[0] && val <= range[1] &&
                        (!step || knumber.isInteger((val - range[0]) / step))
                    }
                    placeholder="answer" size="normal"
                    useArrowKeys={true} />
                <InfoTip><p>
                    This is the correct answer. The answer is validated
                    (as right or wrong) by using only the end position of the
                    point and the relation (=, &lt;, &gt;, &le;, &ge;)
                </p></InfoTip>
            </div>

            <div className="perseus-widget-row">
                <NumberInput label="position"
                    value={this.props.initialX}
                    format={this.props.labelStyle}
                    onChange={this.onNumChange.bind(this, "initialX")}
                    placeholder={range[0]}
                    checkValidity={val => val >= range[0] && val <= range[1]}
                    useArrowKeys={true} />
                <span> &isin; {' '} </span>
                <RangeInput value={range}
                    onChange={this.onRangeChange}
                    format={this.props.labelStyle}
                    useArrowKeys={true} />
                <InfoTip><p>
                    This controls the initial position of the point along the
                    number line and the <strong>range</strong>, the position
                    of the endpoints of the number line. Setting the range
                    constrains the position of the answer and the labels.
                </p></InfoTip>
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    <span>labels </span>
                    <NumberInput
                        value={labelRange[0]} placeholder={range[0]}
                        format={this.props.labelStyle}
                        checkValidity={val =>
                            val >= range[0] && val <= range[1]}
                        onChange={this.onLabelRangeChange.bind(this, 0)}
                        useArrowKeys={true} />
                    <span> &amp; </span>
                    <NumberInput
                        value={labelRange[1]} placeholder={range[1]}
                        format={this.props.labelStyle}
                        checkValidity={val =>
                            val >= range[0] && val <= range[1]}
                        onChange={this.onLabelRangeChange.bind(this, 1)}
                        useArrowKeys={true} />
                    <InfoTip><p>
                        This controls the position of the left / right labels.
                        By default, the labels are set by the range <br />
                        <strong>Note:</strong> Ensure that the labels line up
                        with the tick marks, or it may be confusing for users.
                    </p></InfoTip>
                </div>
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    <label>style</label>
                    <ButtonGroup allowEmpty={false}
                        value={this.props.labelStyle}
                        buttons={labelStyleEditorButtons}
                        onChange={this.onLabelStyleChange} />
                    <InfoTip><p>
                        This controls the styling of the labels for the two
                        main labels as well as all the tick mark labels,
                        if applicable. Your choices are decimal,
                        improper fractions, mixed fractions, and non-reduced
                        fractions.
                    </p></InfoTip>
                </div>
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    <PropCheckBox label="show tick controller"
                        isTickCtrl={this.props.isTickCtrl}
                        onChange={this.props.onChange} />
                </div>
                <div className="perseus-widget-right-col">
                    <PropCheckBox label="show label ticks"
                        labelTicks={this.props.labelTicks}
                        onChange={this.props.onChange} />
                </div>
            </div>
            <div className="perseus-widget-row">
                <NumberInput label="num divisions"
                    value={this.props.numDivisions || null}
                    format={"decimal"}
                    onChange={this.onNumDivisionsChange}
                    checkValidity={val =>
                        val >= divisionRange[0] && val <= divisionRange[1]}
                    placeholder={width / this.props.tickStep}
                    useArrowKeys={true} />
                {isTickCtrl && <span> &isin; {' '}
                    <RangeInput value={divisionRange}
                        format={this.props.labelStyle}
                        checkValidity={val => val[0] >= 1 && val[1] > val[0]}
                        enforceInequality={true}
                        onChange={this.onDivisionRangeChange}
                        useArrowKeys={true} />
                    <InfoTip><p>
                    This controls the number (and position) of the tick marks.
                    The range dictates the minimum and maximum number of ticks
                    that the user can make using the tick controller. <br />
                    <strong>Note:</strong> There is no check to see if labels
                    coordinate with the tick marks, which may be confusing for
                    users if the blue labels and black ticks are off-step.
                    </p></InfoTip></span>}
                {!isTickCtrl && <span>
                    <NumberInput label=" or tick step"
                        value={this.props.tickStep || null}
                        format={this.props.labelStyle}
                        onChange={this.onTickStepChange}
                        checkValidity={val => val > 0 && val <= width}
                        placeholder={width / this.props.numDivisions}
                        useArrowKeys={true} />
                    <InfoTip><p>
                    This controls the number (and position) of the tick marks;
                    you can either set the number of divisions (2 divisions
                    would split the entire range in two halves), or the
                    tick step (the distance between ticks) and the other
                    value will be updated accordingly. <br />
                    <strong>Note:</strong> There is no check to see if labels
                    coordinate with the tick marks, which may be confusing for
                    users if the blue labels and black ticks are off-step.
                    </p></InfoTip></span>}
            </div>
            <div className="perseus-widget-row">
                <NumberInput label="snap increments per tick"
                    value={snapDivisions}
                    checkValidity={val => val > 0}
                    format={this.props.labelStyle}
                    onChange={this.onNumChange.bind(this, "snapDivisions")}
                    useArrowKeys={true} />
                <InfoTip><p>
                    This determines the number of different places the point
                    will snap between two adjacent tick marks. <br />
                    <strong>Note:</strong>Ensure the required number of
                    snap increments is provided to answer the question.
                </p></InfoTip>
            </div>

        </div>;
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
        var range = this.props.range.slice(),
            labelRange = this.props.labelRange.slice(),
            otherNum = labelRange[1-i];

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

        // Auto-updates (constrains) the numDivisions to be within the range
        // of appliable divisions (more important for when the tick controller
        // isn't shown and otherwise shows as invalid for no apparent reason)
        divRange[0] = Math.max(1, Math.min(divRange[0], numDivisions));
        divRange[1] = Math.max(divRange[1], numDivisions);

        this.props.onChange({
            tickStep: null,
            divisionRange: divRange,
            numDivisions: numDivisions,
        });
    },

    onTickStepChange: function(tickStep) {
        this.props.onChange({
            numDivisions: null,
            tickStep: tickStep,
        });
    },

    onChangeRelation: function(e) {
        value = e.target.value;
        this.props.onChange({
            correctRel: value,
            isInequality: value !== "eq",
        });
    },

    onLabelStyleChange: function(labelStyle) {
        this.props.onChange({
            labelStyle: labelStyle
        });
    }
});

var NumberLineTransform = (editorProps) => {
    var props = _.pick(editorProps, [
        "range",

        "labelRange",
        "labelStyle",
        "labelTicks",

        "divisionRange",
        "snapDivisions",

        "isTickCtrl",
        "isInequality"
    ]);

    var numLinePosition = (editorProps.initialX != null) ?
            editorProps.initialX :
            editorProps.range[0];

    var width = editorProps.range[1] - editorProps.range[0];

    var numDivisions;
    if (editorProps.numDivisions != null) {
        numDivisions = editorProps.numDivisions;
    } else if (editorProps.tickStep != null) {
        numDivisions = width / editorProps.tickStep;
    } else {
        numDivisions = undefined; // send to getDefaultProps()
    }

    _.extend(props, {
        numLinePosition: numLinePosition,
        numDivisions: numDivisions
    });

    return props;
};

module.exports = {
    name: "number-line",
    displayName: "Number line",
    widget: NumberLine,
    editor: NumberLineEditor,
    transform: NumberLineTransform
};
