/** @jsx React.DOM */

require("../core.js");
var Util         = require("../util.js");
var Widgets      = require("../widgets.js");

var InfoTip      = require("../components/info-tip.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var NumberInput = require("../components/number-input.jsx");
var RangeInput   = require("../components/range-input.jsx");
var ButtonGroup  = require("../components/button-group.jsx");
var Interactive2 = require("../interactive2.js");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var eq = KhanUtil.knumber.equal;
var deepEq = Util.deepEq;
var bound = (x, gt, lt) => Math.min(Math.max(x, gt), lt);

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
    } else {
        return w + "\\:" + formatImproper(n - w * d, d);
    }
}

var NumberLine = React.createClass({
    propTypes: {
        correctX: React.PropTypes.number,
        correctRel: React.PropTypes.string,
        initialX: React.PropTypes.number,
        range: React.PropTypes.array,

        labelsRange: React.PropTypes.array,
        labelStyle: React.PropTypes.string,
        labelTicks: React.PropTypes.bool,

        divisionRange: React.PropTypes.array,
        numDivisions: React.PropTypes.number,
        tickStep: React.PropTypes.number,
        snapDivisions: React.PropTypes.number,

        isTickCtrl: React.PropTypes.bool,
        isInequality: React.PropTypes.bool,

        numLinePosition: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            range: [0, 10],
            initialX: 0,
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
        var initialX = this.props.initialX;
        var divisionRange = this.props.divisionRange;

        initialX = initialX == null ? range[0] : initialX;

        return range[0] <  range[1] &&
               initialX >= range[0] &&
               initialX <= range[1] &&
               divisionRange[0] < divisionRange[1] &&
               (0 < this.props.numDivisions || 0 < this.props.tickStep) &&
               0 < this.props.snapDivisions;
    },

    render: function() {
        var inequalityControls = <div>
            <input type="button" className="simple-button"
                value="Switch direction" onClick={this.handleReverse} />
            <input type="button" className="simple-button"
                value={_(["le", "ge"]).contains(this.props.rel) ?
                        "Make circle open" :
                        "Make circle filled"}
                onClick={this.handleToggleStrict} />
        </div>;

        return <div className={"perseus-widget " +
                "perseus-widget-interactive-number-line"}>
            {!this.isValid() ? <div>invalid number line configuration</div> :
                <div className="graphie above-scratchpad" ref="graphieDiv" />}
            {this.props.isInequality && inequalityControls}
        </div>;
    },

    handleReverse: function() {
        var newRel = reverseRel[this.props.rel];
        this.props.onChange({rel: newRel}, () => {
            this.updateInequality(this.props.numLinePosition, 0);});
    },

    handleToggleStrict: function() {
        var newRel = toggleStrictRel[this.props.rel];
        this.props.onChange({rel: newRel});
        var isOpen = _(["lt", "gt"]).contains(newRel);
        var style = {
            stroke: KhanUtil.ORANGE,
            fill: isOpen ? KhanUtil._BACKGROUND : KhanUtil.ORANGE,
            "stroke-width": isOpen ? 3 : 1
        };
        this.point.modify({
            pointSize: 6,   // why does this not stay as it is?
            coord: [this.props.numLinePosition, 0],
            normalStyle: style,
            highlightStyle: style});
    },

    componentWillMount: function() {
        this.tickOrLabels = [];
    },

    componentDidMount: function() {
        this.initGraphie();
    },

    componentDidUpdate: function(prevProps) {
        // Will only update on editor change, not renderer change
        prevProps = _(prevProps).omit("rel", "numLinePosition");
        var newProps = _(this.props).omit("rel", "numLinePosition");
        if (this.isValid() && !deepEq(prevProps, newProps)) {
            var node = this.refs.graphieDiv.getDOMNode();
            // Use jQuery to remove so event handlers don't leak
            $(node).children().remove();

            var numLinePosition = this.props.initialX != null ?
                this.props.initialX :
                this.props.range[0];

            this.props.onChange({
                rel: "ge",
                numLinePosition: numLinePosition
            }, this.initGraphie);
        }
    },

    _label: function(pos, value) {
        value = value || pos;
        var labelStyle = this.props.labelStyle;

        // TODO(jack): Find out if any exercises have "decimal ticks" set,
        // and if so, re-save them and remove this check.
        if (labelStyle === "decimal" || labelStyle === "decimal ticks") {
            return this.graphie.label([pos, -0.53],
                Math.round(value * 100) / 100, "center");
        } else if (labelStyle === "improper") {
            var frac = KhanUtil.toFraction(value);
            return this.graphie.label([pos, -0.53],
                    formatImproper(frac[0], frac[1]), "center");
        } else if (labelStyle === "mixed") {
            var frac = KhanUtil.toFraction(value);
            return this.graphie.label([pos, -0.53],
                    formatMixed(frac[0], frac[1]), "center");
        }
    },

    updateInequality: function(px, py) {
        if (this.inequalityLine) {
            this.inequalityLine.remove();
            this.inequalityLine = null;
        }
        if (this.props.isInequality) {
            var isGreater = _(["ge","gt"]).contains(this.props.rel);
            var widthInPixels = 400;
            var range = this.props.range;
            var scale = (range[1] - range[0])/ widthInPixels;
            var buffer = 30 * scale;
            var left = range[0] - buffer, right = range[1] + buffer;
            var end = isGreater ? [right, py] : [left, py];
            var style = {
                arrows: "->",
                stroke: KhanUtil.BLUE,
                strokeWidth: 3.5
            };

            this.inequalityLine = this.graphie.line([px, py], end, style);
            this.inequalityLine.toFront();
            if(this.point) {
                this.point.toFront();
            }
        }
        return this.inequalityLine;
    },

    addNumberLinePoint: function(numLinePosition, tickStep) {
        var isOpen = _(["lt", "gt"]).contains(this.props.rel);
        var style = {
            stroke: KhanUtil.ORANGE,
            fill: isOpen ? KhanUtil._BACKGROUND : KhanUtil.ORANGE,
            "stroke-width": isOpen ? 3 : 1
        };

        if (this.point) {
            this.point.remove();
        }

        var left = this.props.range[0], right = this.props.range[1];
        this.point = Interactive2.addMovablePoint(this.graphie, {
            pointSize: 6,
            coord: [numLinePosition, 0],
            constraints: [
                (coord, prevCoord) => {  // constrain-y
                    return [coord[0], prevCoord[1]];
                },
                (coord, prevCoord) => {  // snap & bound
                    // In non-TickCtrl number lines, legal prevCoords should
                    // still be legal; in TickCtrl number lines, we don't want
                    // the point to jump after the ticks have changed
                    if (coord[0] === prevCoord[0]) {
                        return coord;
                    }
                    var x = coord[0];
                    var snapX = tickStep / this.props.snapDivisions;
                    x = bound(x, left, right);
                    x = left + Math.round((x - left) / (snapX)) * snapX;
                    return [x, coord[1]];
                }
            ],
            normalStyle: style,
            highlightStyle: style,
            onMove: (coord) => {
                this.updateInequality(coord[0], coord[1]);
            },
            onMoveEnd: (coord) => {
                if (coord[0] !== this.props.numLinePosition) {
                    this.props.onChange({numLinePosition: coord[0]});
                }
            }
        });
    },

    addTickControl: function(tickCtrlPosition, scale) {
        var width = this.props.range[1] - this.props.range[0];
        var tickCtrlWidth = (1/3) * width;
        var tickCtrlLeft = this.props.range[0] + (1/3) * width;
        var tickCtrlRight = this.props.range[0] + (2/3) * width;
        var textBuffer = 50 * scale;
        var textLeft = tickCtrlLeft - textBuffer;
        var textRight = tickCtrlRight + textBuffer;
        var divSpan= this.props.divisionRange[1] - this.props.divisionRange[0];

        this.graphie.line([tickCtrlLeft, 1.5], [tickCtrlRight, 1.5], {});
        this.graphie.label([textLeft, 1.5], "fewer ticks", "center", false);
        this.graphie.label([textRight, 1.5], "more ticks", "center", false);

        this.tickCtrl = Interactive2.addMovablePoint(this.graphie, {
            pointSize: 5,
            coord: [tickCtrlPosition, 1.5],
            constraints: [
                (coord, prevCoord) => {  // constrain-y
                    return [coord[0], prevCoord[1]];
                },
                (coord, prevCoord) => {  // snap & bound
                    var snapX = tickCtrlWidth / (divSpan);
                    x = bound(coord[0], tickCtrlLeft, tickCtrlRight);
                    x = tickCtrlLeft +
                        Math.round((x - tickCtrlLeft) / (snapX)) * snapX;
                    return [x, coord[1]];
                }
            ],
            onMove: (coord) => {
                var opts = this.computeTickStep({tickCtrlPosition: coord[0]});
                this.drawTickMarks(opts.tickStep);
            },

            onMoveEnd: (coord) => {
                var opts, tickCtrlPosition;
                if (coord[0] !== tickCtrlPosition) {
                    opts = this.computeTickStep({tickCtrlPosition: coord[0]});
                    this.addNumberLinePoint(this.props.numLinePosition,
                        opts.tickStep);
                    this.updateInequality(this.props.numLinePosition, 0);
                }
            }
        });
    },

    computeTickStep: function(options) {
        // Sets tickStep and draws the ticks/labels.

        var width = this.props.range[1] - this.props.range[0];
        var tickCtrlWidth = (1/3) * width;
        var tickCtrlLeft = this.props.range[0] + (1/3) * width;
        var tickCtrlRight = this.props.range[0] + (2/3) * width;
        var minDivs = this.props.divisionRange[0];
        var maxDivs = this.props.divisionRange[1];

        // If the user has changed the point, it's obviously the priority
        if (options.tickCtrlPosition) {
            tickCtrlPosition = bound(options.tickCtrlPosition,
                           tickCtrlLeft, tickCtrlRight);
            numDivs = minDivs + Math.round((maxDivs - minDivs) *
                    ((tickCtrlPosition - tickCtrlLeft) / tickCtrlWidth), 1);

        // Otherwise, if it still has the value provided by the editor
        } else if (options.numDivs || options.tickStep) {
            numDivs = options.numDivs || width / options.tickStep;
            tickCtrlPosition = tickCtrlLeft + tickCtrlWidth *
                        ((numDivs - minDivs) / (maxDivs - minDivs));

        // And if the editor failed to provide a value
        } else {
            tickCtrlPosition = tickCtrlLeft;
            numDivs = minDivs;
        }

        return {
            tickStep: width / numDivs,
            tickCtrlPosition: tickCtrlPosition
        };
    },

    renderLabels: function() {
        var labelRange = this.props.labelRange;
        var range = this.props.range;
        var leftLabel = labelRange[0] === "" ? range[0] : labelRange[0];
        var rightLabel = labelRange[1] === "" ? range[1] : labelRange[1];

        // Render the text labels
        this.graphie.style({color: KhanUtil.BLUE}, () => {
            this.tickOrLabels.push(this._label(leftLabel));
            this.tickOrLabels.push(this._label(rightLabel));
        });

        // Render the labels' lines
        this.graphie.style({stroke: KhanUtil.BLUE, strokeWidth: 3.5}, () => {
            this.graphie.line([leftLabel, -0.2], [leftLabel, 0.2]);
            this.graphie.line([rightLabel, -0.2], [rightLabel, 0.2]);
        });
    },

    drawTickMarks: function(tickStep) {
        // Avoid infinite loop
        if (!_.isFinite(tickStep) || tickStep <= 0) {
            return; // this has screwed me for the last time!
        }

        // Get rid of the previous ticks, if there are any
        _.each(this.tickOrLabels, function(tickOrLabel){
            tickOrLabel.remove();
        });

        // Draw and save the tick marks and tick labels
        var range = this.props.range;
        for (var x = range[0]; x <= range[1]; x += tickStep) {
            this.tickOrLabels.push(this.graphie.line([x, -0.2], [x, 0.2]));

            var labelTicks = this.props.labelTicks; // for lint :^(
            if (labelTicks || this.props.labelStyle === "decimal ticks") {
                this.tickOrLabels.push(this._label(x));
            }
        }

        if (this.inequalityLine) {
            this.inequalityLine.toFront();
        }

        this.renderLabels();

        // The point doesn't exist yet if the props recently changed
        // because the snapX of the point depends on the tickStep, but
        // if this is occuring as a result of the onMove of the tickCtrl
        // then the point remains stationary in what may become an invalid
        // place for it to snap (but it's great for comparisons!)
        if (this.point) {
            this.point.toFront();
        }
    },

    initGraphie: function() {
        var graphieDiv = this.refs.graphieDiv.getDOMNode();
        this.graphie = KhanUtil.createGraphie(graphieDiv);

        // Ensure a sane configuration to avoid infinite loops
        if (!this.isValid()) {return;}

        // Position variables
        var widthInPixels = 400;
        var range = this.props.range;
        var scale = (range[1] - range[0]) / widthInPixels;
        var buffer = 30 * scale;

        // Initiate the graphie without actually drawing anything
        var left = range[0] - buffer, right = range[1] + buffer;
        var bottom = -1, top = 1 + (this.props.isTickCtrl ? 1 : 0);
        this.graphie.init({
            range: [[left, right], [bottom, top]],
            scale: [1 / scale, 40]
        });
        this.graphie.addMouseLayer({
            allowScratchpad: true
        });

        // Draw the number line
        var center = (range[0] + range[1]) / 2;
        this.graphie.line([center, 0], [right, 0], {arrows: "->"});
        this.graphie.line([center, 0], [left, 0], {arrows: "->"});

        // Compute tickStep/tickCtrlPosition from props
        var opts = this.computeTickStep({
            numDivs: this.props.numDivisions,
            tickStep: this.props.tickStep
        });

        this.drawTickMarks(opts.tickStep);
        this.updateInequality(this.props.numLinePosition, 0);
        this.addNumberLinePoint(this.props.numLinePosition, opts.tickStep);

        if (this.props.isTickCtrl) {
            this.addTickControl(opts.tickCtrlPosition, scale);
        }
    },

    toJSON: function() {
        return {
            numLinePosition: this.props.numLinePosition,
            rel: this.props.isInequality ? this.props.rel : "eq"
        };
    },

    simpleValidate: function(rubric) {
        return NumberLine.validate(this.toJSON(), rubric);
    },

    focus: $.noop
});


_.extend(NumberLine, {
    validate: function(state, rubric) {
        var range = rubric.range;
        var start = rubric.initialX || 0;
        var startRel = rubric.isInequality ? "ge" : "eq";
        var correctRel = rubric.correctRel || "eq";

        if (eq(state.numLinePosition, rubric.correctX || 0) &&
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
            labelRange: ["", ""],
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

    mixins: [JsonifyProps],

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
              {value: "decimal", text: "0.75", title: "Decimals",},
              {value: "improper", text: "\u2077\u2044\u2084",
                title: "Improper fractions"},
              {value: "mixed", text: "1\u00BE",
                title: "Mixed numbers"}];

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
                    onChange={this.onNumChange.bind(this, "correctX")}
                    min={range[0]} max={range[1]} step={step}
                    placeholder="answer" size="normal" />
                <InfoTip><p>
                    This is the correct answer. The answer is validated
                    (as right or wrong) by using only the end position of the
                    point and the relation (=, &lt;, &gt;, &le;, &ge;)
                </p></InfoTip>
            </div>

            <div className="perseus-widget-row">
                <NumberInput label="position"
                    value={this.props.initialX}
                    onChange={this.onNumChange.bind(this, "initialX")}
                    placeholder={range[0]}
                    min={range[0]} max={range[1]} />
                <span> &isin; {' '} </span>
                <RangeInput value={range} onChange={this.onRangeChange} />
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
                        min={range[0]} max={range[1]}
                        onChange={this.onLabelRangeChange.bind(this, 0)} />
                    <span> &amp; </span>
                    <NumberInput
                        value={labelRange[1]} placeholder={range[1]}
                        min={range[0]} max={range[1]}
                        onChange={this.onLabelRangeChange.bind(this, 1)} />
                    <InfoTip><p>
                        This controls the position of the left / right labels.
                        By default, the labels are set by the range <br />
                        <strong>Note:</strong> Ensure that the labels line up
                        with the tick marks, or it may be confusing for users.
                    </p></InfoTip>
                </div>
                <div className="perseus-widget-right-col">
                    <label>style </label>
                    <ButtonGroup allowEmpty={false}
                        value={this.props.labelStyle}
                        buttons={labelStyleEditorButtons}
                        onChange={this.onLabelStyleChange} />
                    <InfoTip><p>
                        This controls the styling of the labels for the two
                        main labels as well as all the tick mark labels,
                        if applicable. Your choices are decimal,
                        improper fractions, and mixed fractions.
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
                    value={this.props.numDivisions || ""}
                    onChange={this.onNumDivisionsChange}
                    min={+divisionRange[0]} max={+divisionRange[1]}
                    placeholder={width / this.props.tickStep} />
                {isTickCtrl && <span> &isin; {' '}
                    <RangeInput value={divisionRange}
                        min={1} enforceInequality={true}
                        onChange={this.onDivisionRangeChange} />
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
                        value={this.props.tickStep || ""}
                        onChange={this.onTickStepChange}
                        minExc={0} max={width}
                        placeholder={width / this.props.numDivisions} />
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
                    value={snapDivisions} minExc={0}
                    onChange={this.onNumChange.bind(this, "snapDivisions")} />
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

        if (num === "" || otherNum === "") {
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

Widgets.register("number-line", NumberLine);
Widgets.register("number-line-editor", NumberLineEditor);
