/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, no-var, react/jsx-sort-prop-types */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/* globals i18n, $_ */
var React = require('react');
var ReactDOM = require("react-dom");
var _ = require("underscore");

var Changeable   = require("../mixins/changeable.jsx");

var NumberInput  = require("../components/number-input.jsx");
var MathOutput   = require("../components/math-output.jsx");
const SimpleKeypadInput = require("../components/simple-keypad-input.jsx");

var ApiOptions = require("../perseus-api.jsx").Options;
const {keypadElementPropType} = require("../../math-input").propTypes;

var Graphie = require("../components/graphie.jsx");
var MovablePoint = Graphie.MovablePoint;
var Line = Graphie.Line;

var knumber = require("kmath").number;
const KhanMath = require("../util/math.js");
const KhanColors = require("../util/colors.js");

var bound = (x, gt, lt) => Math.min(Math.max(x, gt), lt);
var assert = require("../interactive2/interactive-util.js").assert;

var EN_DASH = "\u2013";
const horizontalPadding = 30;

var reverseRel = {
    ge: "le",
    gt: "lt",
    le: "ge",
    lt: "gt",
};

var toggleStrictRel = {
    ge: "gt",
    gt: "ge",
    le: "lt",
    lt: "le",
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

var _label = (graphie, labelStyle, pos, value, base) => {
    value = value || pos;

    // TODO(jack): Find out if any exercises have "decimal ticks" set,
    // and if so, re-save them and remove this check.
    if (labelStyle === "decimal" || labelStyle === "decimal ticks") {
        return graphie.label([pos, -0.53],
            Math.round(value * 100) / 100, "center");
    } else if (labelStyle === "improper") {
        const frac = KhanMath.toFraction(value);
        return graphie.label([pos, -0.53],
                formatImproper(frac[0], frac[1]), "center");
    } else if (labelStyle === "mixed") {
        const frac = KhanMath.toFraction(value);
        return graphie.label([pos, -0.53],
                formatMixed(frac[0], frac[1]), "center");
    } else if (labelStyle === "non-reduced") {
        const frac = KhanMath.toFraction(value);
        return graphie.label([pos, -0.53],
                formatNonReduced(frac[0], frac[1], base), "center");
    }
};

var TickMarks = Graphie.createSimpleClass((graphie, props) => {
    // Avoid infinite loop
    if (!_.isFinite(props.tickStep) || props.tickStep <= 0) {
        return []; // this has screwed me for the last time!
    }

    var results = [];

    // For convenience, extract some props into separate variables
    var range = props.range;
    var labelRange = props.labelRange;
    var leftLabel = labelRange[0] == null ? range[0] : labelRange[0];
    var rightLabel = labelRange[1] == null ? range[1] : labelRange[1];

    // Find base via GCD for non-reduced fractions
    var base;
    if (props.labelStyle === "non-reduced") {
        var fractions = [leftLabel, rightLabel];
        for (let i = 0; i <= props.numDivisions; i++) {
            const x = range[0] + i * props.tickStep;
            fractions.push(x);
        }
        var getDenom = (x) => knumber.toFraction(x)[1];
        var denoms = _.map(fractions, getDenom);
        base = _.reduce(denoms, (x, y) => KhanMath.getLCM(x, y));
    } else {
        base = undefined;
    }

    // Draw and save the tick marks and tick labels
    for (let i = 0; i <= props.numDivisions; i++) {
        const x = range[0] + i * props.tickStep;
        results.push(graphie.line([x, -0.2], [x, 0.2]));

        var labelTicks = props.labelTicks;
        if (labelTicks || props.labelStyle === "decimal ticks") {
            results.push(_label(graphie, props.labelStyle, x, x, base));
        }
    }

    // Render the text labels
    results.push(graphie.style(
        props.isMobile ? {
            color: KhanColors.BLUE_D,
        } : {},
        () =>
            _label(graphie, props.labelStyle, leftLabel, leftLabel, base)
    ));

    results.push(graphie.style(
        props.isMobile ? {
            color: KhanColors.BLUE_D,
        } : {},
        () =>
            _label(graphie, props.labelStyle, rightLabel, rightLabel, base)
    ));

    // Render the labels' lines
    graphie.style(
        {
            stroke: props.isMobile ? KhanColors.BLUE_D :
                KhanColors.DYNAMIC,
            strokeWidth: 3.5,
        },
        () => {
            results.push(graphie.line([leftLabel, -0.2], [leftLabel, 0.2]));
            results.push(graphie.line([rightLabel, -0.2], [rightLabel, 0.2]));
        }
    );

    return results;
});


var NumberLine = React.createClass({
    propTypes: {
        range: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,

        labelRange: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
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
        rel: React.PropTypes.oneOf(["lt", "gt", "le", "ge"]),

        onFocus: React.PropTypes.func.isRequired,
        onBlur: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,

        apiOptions: ApiOptions.propTypes,
        keypadElement: keypadElementPropType,
        static: React.PropTypes.bool,
        showTooltips: React.PropTypes.bool,
        trackInteraction: React.PropTypes.func.isRequired,
    },

    mixins: [Changeable],

    getDefaultProps: function() {
        return {
            range: [0, 10],
            labelStyle: "decimal",
            labelRange: [null, null],
            divisionRange: [1, 12],
            labelTicks: true,
            isTickCtrl: false,
            isInequality: false,
            numLinePosition: 0,
            snapDivisions: 2,
            showTooltips: false,
            rel: "ge",
            apiOptions: ApiOptions.defaults,
        };
    },

    getInitialState() {
        return {
            numDivisionsEmpty: false,
        };
    },

    isValid: function() {
        var range = this.props.range;
        var initialX = this.props.numLinePosition;
        var divisionRange = this.props.divisionRange;

        initialX = initialX == null ? range[0] : initialX;

        return range[0] <  range[1] &&
               knumber.sign(initialX - range[0]) >= 0 &&
               knumber.sign(initialX - range[1]) <= 0 &&
               divisionRange[0] < divisionRange[1] &&
               0 < this.props.numDivisions &&
               0 < this.props.snapDivisions;
    },

    onNumDivisionsChange: function(numDivisions, cb) {
        var divRange = this.props.divisionRange.slice();
        var width = this.props.range[1] - this.props.range[0];

        // Don't allow a fraction for the number of divisions
        numDivisions = Math.round(numDivisions);

        // Don't allow negative numbers for the number of divisions
        numDivisions = numDivisions < 0 ? numDivisions * -1 : numDivisions;

        // If the number of divisions isn't blank, update the number line
        if (numDivisions) {
            var nextProps = _.extend({}, this.props, {
                tickStep: width / numDivisions,
            });

            var newNumLinePosition = this.snapNumLinePosition(
                nextProps,
                this.props.numLinePosition
            );

            this.setState({
                numDivisionsEmpty: false,
            }, () => {
                this.props.onChange({
                    divisionRange: divRange,
                    numDivisions: numDivisions,
                    numLinePosition: newNumLinePosition,
                }, cb);
            });
        } else {
            this.setState({
                numDivisionsEmpty: true,
            }, cb);
        }
    },

    _handleTickCtrlFocus: function() {
        this.props.onFocus(["tick-ctrl"]);
    },

    _handleTickCtrlBlur: function() {
        this.props.onBlur(["tick-ctrl"]);
    },

    focus: function() {
        if (this.props.isTickCtrl) {
            this.refs["tick-ctrl"].focus();
            return true;
        }
    },

    focusInputPath: function(path) {
        if (path.length === 1) {
            this.refs[path[0]].focus();
        }
    },

    blurInputPath: function(path) {
        if (path.length === 1) {
            this.refs[path[0]].blur();
        }
    },

    getInputPaths: function() {
        if (this.props.isTickCtrl) {
            return [["tick-ctrl"]];
        } else {
            return [];
        }
    },

    getDOMNodeForPath: function(inputPath) {
        if (inputPath.length === 1) {
            return ReactDOM.findDOMNode(this.refs[inputPath[0]]);
        }
    },

    getGrammarTypeForPath: function(inputPath) {
        if (inputPath.length === 1 && inputPath[0] === "tick-ctrl") {
            return "number";
        }
    },

    setInputValue: function(inputPath, value, callback) {
        if (inputPath.length === 1 && inputPath[0] === "tick-ctrl") {
            this.onNumDivisionsChange(value, callback);
        }
    },

    _renderGraphie: function() {
        // Position variables
        var range = this.props.range;
        var width = range[1] - range[0];

        var options = _.pick(this.props, [
            "range",
            "isTickCtrl",
        ]);

        // TODO(aria): Maybe save this as `this.calculatedProps`?
        var props = _.extend({}, this.props, {
            tickStep: width / this.props.numDivisions,
        });

        return <Graphie
            ref="graphie"
            box={[460, 80]}
            options={options}
            onMouseDown={(coord) => {
                this.refs.graphie.movables.numberLinePoint.grab(coord);
            }}
            setup={this._setupGraphie}
            setDrawingAreaAvailable={
                this.props.apiOptions.setDrawingAreaAvailable}
            isMobile={this.props.apiOptions.isMobile}
        >
            <TickMarks
                {..._.pick(props, [
                    "range",
                    "numDivisions",
                    "labelTicks",
                    "labelStyle",
                    "labelRange",
                    "tickStep",
                ])}
                isMobile={this.props.apiOptions.isMobile}
            />
            {this._renderInequality(props)}
            {this._renderNumberLinePoint(props)}
        </Graphie>;
    },

    snapNumLinePosition: function(props, numLinePosition) {
        var left = props.range[0];
        var right = props.range[1];
        var snapX = props.tickStep / props.snapDivisions;

        let x = bound(numLinePosition, left, right);
        x = left + knumber.roundTo(x - left, snapX);
        assert(_.isFinite(x));
        return x;
    },

    _renderNumberLinePoint: function(props) {
        var isOpen = _(["lt", "gt"]).contains(props.rel);

        // In static mode the point's fill and stroke is blue to signify that
        // it can't be interacted with.
        var fill;
        if (isOpen) {
            fill = KhanColors._BACKGROUND;
        } else if (props.static) {
            fill = KhanColors.DYNAMIC;
        } else {
            fill = KhanColors.INTERACTIVE;
        }
        var normalStyle = {
            fill: fill,
            stroke: props.static ? KhanColors.DYNAMIC : KhanColors.INTERACTIVE,
            "stroke-width": isOpen ? 3 : 1,
        };
        var highlightStyle = {
            fill: isOpen ? KhanColors._BACKGROUND : KhanColors.INTERACTING,
            "stroke-width": isOpen ? 3 : 1,
        };

        const mobileDotStyle = props.isInequality ? {
            stroke: KhanColors.INTERACTIVE,
            "fill-opacity": isOpen ? 0 : 1,
        } : {};

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
                },
            ]}
            normalStyle={normalStyle}
            highlightStyle={highlightStyle}
            onMove={(coord) => {
                this.change({numLinePosition: coord[0]});
                this.props.trackInteraction();
            }}
            isMobile={this.props.apiOptions.isMobile}
            mobileStyleOverride={mobileDotStyle}
            showTooltips={this.props.showTooltips}
            xOnlyTooltip={true}
        />;
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
        var isGreater = _(["ge", "gt"]).contains(props.rel);
        var widthInPixels = 400;
        var range = props.range;
        var scale = (range[1] - range[0]) / widthInPixels;
        var buffer = horizontalPadding * scale;
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
                stroke: this.props.apiOptions.isMobile ?
                    KhanColors.INTERACTIVE : KhanColors.DYNAMIC,
                strokeWidth: 3.5,
            };

            const isGreater = ["ge", "gt"].includes(props.rel);

            return <Line
                // We shift the line to either side of the dot so they don't
                // intersect
                start={[(isGreater ? 0.4 : -0.4) + props.numLinePosition, 0]}
                end={end}
                style={style}
            />;
        } else {
            return null;
        }
    },

    _setupGraphie: function(graphie, options) {
        // Ensure a sane configuration to avoid infinite loops
        if (!this.isValid()) {return;}

        // Position variables
        var widthInPixels = this.props.apiOptions.isMobile ?
            (288 - (horizontalPadding * 2)) : 400;
        var range = options.range;
        var scale = (range[1] - range[0]) / widthInPixels;
        var buffer = horizontalPadding * scale;

        // Initiate the graphie without actually drawing anything
        var left = range[0] - buffer;
        var right = range[1] + buffer;
        var bottom = -1;
        var top = 1;

        graphie.init({
            range: [[left, right], [bottom, top]],
            scale: [1 / scale, 40],
            isMobile: this.props.apiOptions.isMobile,
        });

        // Draw the number line
        var center = (range[0] + range[1]) / 2;
        graphie.line([center, 0], [right, 0], {arrows: "->"});
        graphie.line([center, 0], [left, 0], {arrows: "->"});
    },

    getUserInput: function() {
        return {
            numLinePosition: this.props.numLinePosition,
            rel: this.props.isInequality ? this.props.rel : "eq",
            numDivisions: this.props.numDivisions,
            divisionRange: this.props.divisionRange,
        };
    },

    simpleValidate: function(rubric) {
        return NumberLine.validate(this.getUserInput(), rubric);
    },

    render: function() {
        var divisionRange = this.props.divisionRange;
        var divRangeString = divisionRange[0] + EN_DASH + divisionRange[1];
        var invalidNumDivisions = this.props.numDivisions < divisionRange[0] ||
                this.props.numDivisions > divisionRange[1];

        var inequalityControls = <div>
            <input
                type="button"
                className="simple-button"
                value={i18n._("Switch direction")}
                onClick={this.handleReverse}
            />
            <input
                type="button"
                className="simple-button"
                value={_(["le", "ge"]).contains(this.props.rel) ?
                        i18n._("Make circle open") :
                        i18n._("Make circle filled")}
                onClick={this.handleToggleStrict}
            />
        </div>;

        var tickCtrl;
        if (this.props.isTickCtrl) {
            var Input;
            if (this.props.apiOptions.customKeypad) {
                Input = SimpleKeypadInput;
            } else if (this.props.apiOptions.staticRender) {
                Input = MathOutput;
            } else {
                Input = NumberInput;
            }
            tickCtrl = <label>
                {i18n._("Number of divisions:")}{" "}
                <Input
                    ref={"tick-ctrl"}
                    value={
                        this.state.numDivisionsEmpty
                            ? null : this.props.numDivisions || divisionRange[0]
                    }
                    checkValidity={(val) =>
                        val >= divisionRange[0] && val <= divisionRange[1]}
                    onChange={this.onNumDivisionsChange}
                    onFocus={this._handleTickCtrlFocus}
                    onBlur={this._handleTickCtrlBlur}
                    useArrowKeys={true}
                    keypadElement={this.props.keypadElement}
                />
            </label>;
        }

        return <div className={"perseus-widget " +
            "perseus-widget-interactive-number-line"}
        >
            {tickCtrl}
            {!this.isValid() ?
                <div className="perseus-error">
                    Invalid number line configuration.
                </div> :
                (this.props.isTickCtrl && invalidNumDivisions ?
                    <div className="perseus-error">
                        {$_({divRangeString: divRangeString},
                            "Please make sure the number of divisions is in " +
                            "the range %(divRangeString)s.")}
                    </div> : this._renderGraphie())}
            {!this.props.static && this.props.isInequality &&
                inequalityControls}
        </div>;
    },
});


_.extend(NumberLine, {
    validate: function(state, rubric) {
        var range = rubric.range;
        var divisionRange = state.divisionRange;
        var start = rubric.initialX != null ? rubric.initialX : range[0];
        var startRel = rubric.isInequality ? "ge" : "eq";
        var correctRel = rubric.correctRel || "eq";
        var correctPos = knumber.equal(
                state.numLinePosition,
                rubric.correctX || 0);
        var outsideAllowedRange = state.numDivisions > divisionRange[1] ||
                state.numDivisions < divisionRange[0];

        if (state.isTickCrtl && outsideAllowedRange) {
            return {
                type: "invalid",
                message: "Number of divisions is outside the allowed range.",
            };
        } else if (correctPos && correctRel === state.rel) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null,
            };
        } else if (state.numLinePosition === start && state.rel === startRel) {
            // We're where we started.
            return {
                type: "invalid",
                message: null,
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null,
            };
        }
    },
});

var numberLineTransform = (editorProps) => {
    var props = _.pick(editorProps, [
        "range",

        "labelRange",
        "labelStyle",
        "labelTicks",

        "divisionRange",
        "snapDivisions",

        "isTickCtrl",
        "isInequality",

        "showTooltips",
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
        numDivisions: numDivisions,
        // Use getDefaultProps value if null
        snapDivisions: props.snapDivisions || undefined,
    });

    return props;
};

var staticTransform = (editorProps) => {
    var props = _.pick(editorProps, [
        "range",

        "labelRange",
        "labelStyle",
        "labelTicks",

        "divisionRange",
        "snapDivisions",

        // isTickCtrl is ignored since users can't interact with it anyway
        "isInequality",
    ]);

    // The correct x is the initial position of the point
    var numLinePosition = (editorProps.correctX != null) ?
            editorProps.correctX :
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
        numDivisions: numDivisions,
        // Render the relation in the correct answer
        rel: editorProps.isInequality ? editorProps.correctRel : null,
        // Use getDefaultProps value if null
        snapDivisions: props.snapDivisions || undefined,
    });

    return props;
};

module.exports = {
    name: "number-line",
    displayName: "Number line",
    widget: NumberLine,
    transform: numberLineTransform,
    staticTransform: staticTransform,
};
