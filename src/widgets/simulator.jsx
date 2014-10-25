var InfoTip      = require("react-components/info-tip.jsx");
var _ = require("underscore");

var Changeable   = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var ApiOptions = require("../perseus-api.jsx").Options;
var assert = require("../interactive2/interactive-util.js").assert;

var Graphie = require("../components/graphie.jsx");
var {
    Path,
    Arc,
    Circle,
    Label,
    Line,
    MovablePoint,
    MovableLine
} = Graphie;
var NumberInput  = require("../components/number-input.jsx");
var MathOutput  = require("../components/math-output.jsx");
var seededRNG    = require("../util.js").seededRNG;
var Util         = require("../util.js");
var knumber      = require("kmath").number;

var defaultBoxSize = 400;
var maxSampleSize = 1000;
var maxTrials = 5000;

var Histogram = React.createClass({
    propTypes: {
        data: React.PropTypes.arrayOf(React.PropTypes.number),
        xAxisLabel: React.PropTypes.string,
        yAxisLabel: React.PropTypes.string,
        box: React.PropTypes.arrayOf(React.PropTypes.number)
    },

    getDefaultProps: function() {
        return {
            data: null,
            xAxisLabel: "Proportion (%)",
            yAxisLabel: "Number of times seen",
            box: [defaultBoxSize, defaultBoxSize]
        };
    },

    getInitialState: function() {
        return {
            threshold: this._getInitialThreshold(this._range())
        };
    },

    componentWillReceiveProps: function(nextProps) {
        // Reset the threshold if the range has changed
        var oldRange = this._range();
        var nextRange = this._range(nextProps);
        if (!Util.deepEq(oldRange, nextRange)) {
            this.setState({
                threshold: this._getInitialThreshold(nextRange)
            });
        }
    },

    /* Renders the vertical line that users can drag across the histogram. */
    _renderThresholdLine: function() {
        // Recall the the y-range goes from [-1, yMax] to allow for ticks on
        // the x-axis.
        var yRange = [0, this._range()[1][1]];
        var coords = _.map(yRange, (y) => [this.state.threshold, y]);

        // Returns an inivisble, placeholder coord that anchors the line
        var invisiblePointForCoord = (coord) => {
            return <MovablePoint
                static={true}
                coord={coord}
                normalStyle={{stroke: "none", fill: "none"}} />;
        };

        return <MovableLine onMove={this.handleMouseInteraction}>
            {_.map(coords, invisiblePointForCoord)}
        </MovableLine>;
    },

    /* Renders the shaded circle in the top right. */
    _renderCircle: function() {
        var data = this.props.data;

        // Get proportion of results below threshold
        var total = _.reduce(data, (sum, next) => {
            return sum + next;
        }, 0);
        var numBelow = _.reduce(data, (sum, next, i) => {
            if (this.state.threshold != null &&
                    i <= this.state.threshold) {
                return sum + next;
            } else {
                return sum;
            }
        }, 0);
        var proportionBelow = numBelow / total;

        // This is a hack around the arc taking angles modulo 360.
        // TODO(charlie): Find a better way around this.
        var epsilon = 1e-5;
        var radius = 20;
        var center = [this.props.box[0] - 1.5 * radius, 1.5 * radius];

        // Plot little circle
        var plotBelowCircle = () => {
            var options = {
                center: center,
                radius: radius,
                startAngle: 0,
                endAngle: (proportionBelow < 1) ? 360 * proportionBelow
                                                : 360 - epsilon,
                sector: (proportionBelow !== 1),
                unscaled: true,
                style: {
                    fill: KhanUtil.LIGHT_RED,
                    stroke: KhanUtil.RED
                }
            };

            return Arc(options);
        };
        var plotAboveCircle = () => {
            var options = {
                center: center,
                radius: radius,
                startAngle: (proportionBelow > 0) ? 360 * proportionBelow
                                                  : epsilon,
                endAngle: 360,
                sector: (proportionBelow !== 0),
                unscaled: true,
                style: {
                    fill: KhanUtil.LIGHT_BLUE,
                    stroke: KhanUtil.BLUE
                },
            };

            return Arc(options);
        };

        // Plot the label below the circle
        var xRange = this._range()[0];
        var formattedThreshold = Math.min(
            Math.max(this.state.threshold, xRange[0]), xRange[1]).toFixed(2);
        var plotLabel = () => {
            var options = {
                coord: [center[0], center[1] + 1.5 * radius],
                text: numBelow + " of " + total + " results below " +
                    formattedThreshold + "%",
                direction: "center",
                tex: false,
                unscaled: true,
                style: {
                    fontSize: "12px"
                }
            };
            return Label(options);
        };

        return [
            proportionBelow > 0 && plotBelowCircle(),
            proportionBelow < 1 && plotAboveCircle(),
            plotLabel()
        ];
    },

    /* Renders the actual bars of the histogram. */
    _renderData: function() {
        var data = this.props.data;
        var range = this._range();

        // Plot bars
        var barWidth = 1;
        var pathForData = (count, i) => {
            // Avoid plotting bars of height 0, else you get a thick blue line
            // over the x-axis. We don't filter these out of the data passed in
            // to this function, however, to preserve absolute indices.
            if (!count) {
                return;
            }

            var isBelow = this.state.threshold != null &&
                    i <= this.state.threshold;
            var style = {
                fill: (isBelow) ?  KhanUtil.LIGHT_RED : KhanUtil.LIGHT_BLUE,
                stroke: (isBelow) ? KhanUtil.RED : KhanUtil.BLUE
            };
            var coords = [
                [i, 0],
                [i, count],
                [i + barWidth, count],
                [i + barWidth, 0]
            ];
            return <Path coords={coords} style={style} />;
        };

        return _.map(data, pathForData);
    },

    render: function() {
        var data = this.props.data;
        var range = this._range();

        var options = {
            xAxisLabel: this.props.xAxisLabel,
            yAxisLabel: this.props.yAxisLabel,
            box: this.props.box,
            range: range,
            data: data,
            scale: [Util.scaleFromExtent(range[0], this.props.box[0]),
                        Util.scaleFromExtent(range[1], this.props.box[1])]
        };

        var axisStyle = {
            stroke: "#000",
            strokeWidth: 1,
            opacity: 1.0
        };
        var origin = [range[0][0], 0];
        var bottomRight = [range[0][1], 0];

        return <Graphie box={options.box}
                        range={options.range}
                        options={options}
                        setup={this._setupGraphie}
                        onMouseMove={this.handleMouseInteraction}
                        onMouseDown={this.handleMouseInteraction}>
            <Line start={origin} end={bottomRight} style={axisStyle} />
            {/* Only plot these cool extra features if there's data */}
            {data && [
                this._renderData(),
                this._renderCircle(),
                this._renderThresholdLine()
            ]}
        </Graphie>;
    },

    _setupGraphie: function(graphie, options) {
        var data = options.data;
        var range = options.range;
        var scale = options.scale;

        /* Plot the bars that run parallel to the x-axis. */
        var xWidth = range[0][1] - range[0][0];
        var yWidth = range[1][1] - 0;

        var maxYAxisEntities = 20;
        var ySkip = Math.ceil(yWidth / maxYAxisEntities);
        _.each(_.range(0, range[1][1], ySkip), (y) => {

            // If there's no data, we don't label the axes
            if (data) {
                graphie.label(
                    [range[0][0], y],
                    KhanUtil.roundToApprox(y, 2),
                    "left",
                    /* isTeX */ true /* for the \approx symbol */
                );
            }

            graphie.line([range[0][0], y], [range[0][1], y], {
                stroke: "#000",
                strokeWidth: 1,
                opacity: 0.3
            });
        });


        // If there's no data, we don't label the x-axis at all
        if (data) {
            // Plot the labels below the bars
            var maxXAxisEntities = 15;
            var xSkip = Math.ceil(xWidth / maxXAxisEntities);
            _.each(_.range(range[0][0], range[0][1], xSkip), (x) => {
                graphie.label([x, 0], knumber.round(x, 2), "below", true);

                var tickHeight = 8;
                graphie.line([x, 0], [x, - tickHeight / scale[1]], {
                        stroke: "#000",
                        strokeWidth: 1
                    }
                );
            });
        }

        // Add y axis (x axis is added later to overlap the bars)
        var axisStyle = {
            stroke: "#000",
            strokeWidth: 2,
            opacity: 1.0
        };
        var origin = [range[0][0], 0];
        var topLeft = [range[0][0], range[1][1]];
        graphie.line(origin, topLeft, axisStyle);

        // Add axis labels
        var xMid = range[0][0] + (xWidth / 2);
        var xOffset = (data) ? 25 : 0;
        graphie.label([xMid, - xOffset / scale[1]],
            options.xAxisLabel,
            "below", false)
            .css("font-weight", "bold");

        var yMid = 0 + (yWidth / 2);
        var yOffset = (data) ? 55 : 28;
        graphie.label([range[0][0] - yOffset / scale[0], yMid],
            options.yAxisLabel,
            "center", false)
            .css("font-weight", "bold")
            .css("-webkit-transform", "rotate(-90deg)");
    },

    handleMouseInteraction: function(point) {
        this.setState({
            threshold: point[0]
        });
    },

    /* Convenience functions that help calculate props based on other props. */
    _range: function(props) {
        var defaultRange = [[0, 100], [-1, 10]];
        props = props || this.props;
        return (props.data) ? this._getRangeForData(props.data) : defaultRange;
    },

    _getRangeForData: function(data) {
        // Find first/last non-zero entry and add some padding
        var padding = 10;
        var firstIndex = _.indexOf(data, _.find(data, (n) => n > 0));
        var xMin = Math.max(0, firstIndex - padding);
        var lastIndex = _.lastIndexOf(data, _.last(
            _.filter(data, (n) => n > 0)));
        var xMax = Math.min(100 + 1, (lastIndex + 1) + padding);

        // The y-axis is bounded above by largest value, and below by 0.
        // However, the 'range' of the y-axis goes as low as -1 to allow
        // Graphie to draw ticks on the x-Axis that extend vertically below
        // y = 0.
        var yMin = -1;
        var yMax = _.max(data);

        return [[xMin, xMax], [yMin, yMax]];
    },

    _getInitialThreshold: function(range) {
        // We pick a pretty-looking threshold, 1/3 of the way along the axis
        var xRange = range[0];
        return xRange[0] + (xRange[1] - xRange[0]) / 3;
    }
});

var Simulator = React.createClass({
    mixins: [Changeable],

    propTypes: {
        data: React.PropTypes.arrayOf(React.PropTypes.number),
        userProportion: React.PropTypes.number,
        sampleSize: React.PropTypes.number,
        numTrials: React.PropTypes.number,
        randomSeed: React.PropTypes.number,
        xAxisLabel: React.PropTypes.string,
        yAxisLabel: React.PropTypes.string,
        proportionLabel: React.PropTypes.string,
        proportionOrPercentage: React.PropTypes.string,
        apiOptions: ApiOptions.propTypes
    },

    getInitialState: function() {
        return {
            invalidInput: false
        };
    },

    getDefaultProps: function() {
        return {
            data: null,
            userProportion: null,
            sampleSize: null,
            numTrials: null,
            randomSeed: 0,
            xAxisLabel: "Proportion (%)",
            yAxisLabel: "Number of times seen",
            proportionLabel: "Underlying proportion",
            proportionOrPercentage: "proportion",
            apiOptions: ApiOptions.defaults
        };
    },

    componentWillMount: function() {
        if (this.props.randomSeed != null) {
            this.generateNumber = Util.seededRNG(this.props.randomSeed);
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.randomSeed !== this.props.randomSeed) {
            this.generateNumber = Util.seededRNG(nextProps.randomSeed);
        }
    },

    render: function() {
        var inputStyle = {
            marginLeft: "5px"
        };

        var highlight = "0px 0px 9px 2px rgba(255, 165, 0, 1)";
        var highlightStyle = _.extend({}, inputStyle, {
            WebkitBoxShadow: highlight,
            MozBoxShadow: highlight,
            boxShadow: highlight,
            transition: "all 0.15s"
        });
        var unhighlightStyle = _.extend({}, inputStyle, {
            transition: "all 0.15s"
        });
        var style = (this.state.invalidInput) ? highlightStyle
                                              : unhighlightStyle;

        var InputComponent = this.props.apiOptions.staticRender ? MathOutput
                                                                : NumberInput;

        var proportionInput = <div>
            <InputComponent
                ref="userProportion"
                style={style}
                value={this.calculateDisplayProportion()}
                checkValidity={this.checkProportionValidity}
                onChange={this.handleUserProportionChange}
                onFocus={() => this.props.onFocus(["userProportion"])}
                onBlur={() => this.props.onBlur(["userProportion"])} />
            <InfoTip>
                <p>This controls the proportion or percentage that will be used
                   in your simulation.</p>
            </InfoTip>
        </div>;

        var sampleSizeInput = <div>
            <InputComponent
                ref="sampleSize"
                style={style}
                value={this.props.sampleSize}
                checkValidity={(val) => val >= 0}
                onChange={this.handleSampleSizeChange}
                onFocus={() => this.props.onFocus(["sampleSize"])}
                onBlur={() => this.props.onBlur(["sampleSize"])} />
            <InfoTip>
                <p>This controls the sample size that will be used in your
                   simulation. For example, if you set this to 100, then for
                   each trial, responses from 100 participants will be
                   simulated.</p>
            </InfoTip>
        </div>;

        var numTrialsDisplay = <div style={{float: "right"}}>
            <b>{this.props.numTrials}</b>
            <InfoTip>
                <p>This is the number of trials used in the simulation. For
                   example, if set to 50, then the survey will be conducted 50
                   times.</p>
            </InfoTip>
        </div>;

        // Generates a table from a set of titles and values.
        var generateTable = (contents) => {
            var header = <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                </tr>
            </thead>;

            var body = <tbody>
                {_.map(contents, (row, i) => {
                    return <tr key={i}>
                        <td>{row.title}</td>
                        <td>{row.value}</td>
                    </tr>;
                })}
            </tbody>;

            return <table>
                {header}
                {body}
            </table>;
        };

        // Contents for the table to-be generated
        var contents = [
            {
                title: this.props.proportionLabel + ":",
                value: proportionInput,
            },
            {
                title: "Sample size:",
                value: sampleSizeInput
            },
            {
                title: "Number of trials:",
                value: numTrialsDisplay
            }
        ];

        // The 'Run Simulation' button
        var buttonStyle = {
            margin: "20px 0"
        };
        var startButton = <button
                className="simple-button"
                style={buttonStyle}
                onClick={this.handleRunSimulation}>
            <$_>Run simulation</$_>
        </button>;

        // When we plot data, ticks on the x-axis require some vertical padding
        var histogramStyle = {
            paddingBottom: (this.props.data) ? 40 : 0
        };
        var histogram = <div style={histogramStyle}>
            <Histogram data={this.props.data}
                       xAxisLabel={this.props.xAxisLabel}
                       yAxisLabel={this.props.yAxisLabel} />
        </div>;

        return <div>
            {generateTable(contents)}
            {startButton}
            {histogram}
        </div>;
    },

    calculateDisplayProportion: function() {
        var userProportion = this.props.userProportion;

        // If we want to display as a percentage, multiply proportion by 100.0.
        if (this.props.proportionOrPercentage === "percentage") {
            return Math.round(100 * userProportion);
        } else {
            return userProportion;
        }
    },

    checkProportionValidity: function(value) {
        return value >= 0.0 &&
            (this.props.proportionOrPercentage === "proportion" &&
                value <= 1.0) ||
            (this.props.proportionOrPercentage === "percentage" &&
                value <= 100.0);
    },

    handleUserProportionChange: function(value, cb) {
        var userProportion;

        // If "percentage" mode is enabled, user will have entered value as
        // a percentage. However, we always store as a proportion, so we cast.
        if (this.props.proportionOrPercentage === "percentage") {
            userProportion = value / 100.0;
        } else {
            userProportion = value;
        }

        // If they entered a number, we may need to cap it
        if (userProportion != null) {
            userProportion = Math.min(1.0, Math.max(0.0, userProportion));
        }
        this.props.onChange({
            userProportion: userProportion
        }, cb);
    },

    handleSampleSizeChange: function(sampleSize, cb) {
        if (sampleSize != null) {
            sampleSize = Math.min(maxSampleSize,
                Math.max(0, Math.floor(sampleSize)));
        }
        this.props.onChange({
            sampleSize: sampleSize
        }, cb);
    },

    handleRunSimulation: function() {
        // If they haven't filled out a parameter field, highlight it.
        if (this.props.numTrials == null ||
                this.props.userProportion == null ||
                this.props.sampleSize == null) {
            this.setState({
                invalidInput: true
            });
            return;
        } else {
            this.setState({
                invalidInput: false
            });
        }
        this.props.onChange({
            data: this.generateData()
        });
    },

    generateData: function(props) {
        props = props || this.props;
        var getSampleDistribution = (sampleSize, numTrials, proportion) => {
            var draw = () => {
                return this.generateNumber() < proportion;
            };
            var sampleDistribution = _.times(100 + 1, () => 0);
            _.times(numTrials, () => {
                var results = _.times(sampleSize, draw);
                var count = _.filter(results, _.identity).length;
                var normalizedCount = Math.floor(100 * count / sampleSize);
                sampleDistribution[normalizedCount]++;
            });
            return sampleDistribution;
        };
        return getSampleDistribution(props.sampleSize, props.numTrials,
            props.userProportion);
    },

    /* InputPath API */
    getInputPaths: function() {
        return [["userProportion"], ["sampleSize"]];
    },

    focus: function() {
        var path = _.head(this.getInputPaths());
        this.focusInputPath(path);
        return true;
    },

    focusInputPath: function(path) {
        assert(path.length > 0);
        var inputID = _.head(path);
        var inputComponent = this.refs[inputID];
        inputComponent.focus();
    },

    blurInputPath: function(path) {
        assert(path.length > 0);
        var inputID = _.head(path);
        var inputComponent = this.refs[inputID];
        inputComponent.blur();
    },

    getDOMNodeForPath: function(path) {
        assert(path.length > 0);
        var inputID = _.head(path);
        return this.refs[inputID].getDOMNode();
    },

    getGrammarTypeForPath: function(path) {
        assert(path.length > 0);
        return "number";
    },

    setInputValue: function(path, newValue, cb) {
        assert(path.length > 0);
        var inputID = _.head(path);
        var capitalizedID = inputID.charAt(0).toUpperCase() + inputID.slice(1);
        var functionName = "handle" + capitalizedID + "Change";
        this[functionName](newValue, cb);
    },

    getUserInput: function() {
        return null;
    },

    simpleValidate: function(rubric) {
        return Simulator.validate(this.getUserInput(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});

_.extend(Simulator, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    }
});

var SimulatorEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    propTypes: {
        xAxisLabel: React.PropTypes.string,
        yAxisLabel: React.PropTypes.string,
        numTrials: React.PropTypes.number,
        proportionLabel: React.PropTypes.string,
        proportionOrPercentage: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            xAxisLabel: "Proportion (%)",
            yAxisLabel: "Number of times seen",
            numTrials: 100,
            proportionLabel: "Underlying proportion",
            proportionOrPercentage: "proportion"
        };
    },

    render: function() {
        return <div className="perseus-widget-simulator">
            <div>
                <$_>X-Axis Label</$_>:
                <input
                    type="text"
                    className="graph-settings-axis-label"
                    value={this.props.xAxisLabel}
                    onChange={_.partial(this.handleTargetValueChange,
                        "xAxisLabel")} />
            </div>
            <div>
                <$_>Y-Axis Label</$_>:
                <input
                    type="text"
                    className="graph-settings-axis-label"
                    value={this.props.yAxisLabel}
                    onChange={_.partial(this.handleTargetValueChange,
                        "yAxisLabel")} />
            </div>
            <div>
                <$_>"True Proportion" Label</$_>:
                <input
                    type="text"
                    className="graph-settings-axis-label"
                    value={this.props.proportionLabel}
                    onChange={_.partial(this.handleTargetValueChange,
                        "proportionLabel")} />
                <InfoTip>
                    <p>This text will be displayed next to the box in which
                        the user enters the sample proportion for their
                        simulation. For example, if your question is about
                        surveying for approval ratings, you might want this to
                        say "Sample approval rating".</p>
                </InfoTip>
            </div>
            <div>
                <$_>Proportion or Percentage</$_>:
                <select
                    className="perseus-widget-dropdown"
                    value={this.props.proportionOrPercentage}
                    onChange={_.partial(this.handleTargetValueChange,
                        "proportionOrPercentage")}>
                        <option key="proportion" value="proportion">
                            Proportion
                        </option>
                        <option key="percentage" value="percentage">
                            Percentage
                        </option>
                </select>
                <InfoTip>
                    <p>Do you want the user to describe their simulation in
                        terms of a proportion or a percentage?</p>
                </InfoTip>
            </div>
            <div>
                <$_>Number of trials</$_>:
                <NumberInput
                    value={this.props.numTrials}
                    checkValidity={(val) => {
                        return val >= 0 && val <= maxTrials;
                    }}
                    onChange={this.change("numTrials")} />
                <InfoTip>
                    <p>This controls the number of trials used in the
                       simulation. For example, if you set this to 50, then the
                       survey will be conducted 50 times. Warning: setting
                       this too high (i.e., greater than 5000 or so) will
                       freeze the page.</p>
                </InfoTip>
            </div>
        </div>;
    },

    handleTargetValueChange: function(propName, e) {
        this.change(propName, e.target.value);
    }
});

var propTransform = (editorProps) => {
    var widgetProps = _.clone(editorProps);
    widgetProps.randomSeed = editorProps.problemNum;
    return widgetProps;
};

module.exports = {
    name: "simulator",
    displayName: "Simulator",
    widget: Simulator,
    editor: SimulatorEditor,
    transform: propTransform
};
