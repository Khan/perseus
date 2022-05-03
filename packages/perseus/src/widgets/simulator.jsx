/* eslint-disable no-unused-vars, react/no-unsafe, react/sort-comp */
// @flow
import {number as knumber} from "@khanacademy/kmath";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import Graphie from "../components/graphie.jsx";
import InfoTip from "../components/info-tip.jsx";
import MathOutput from "../components/math-output.jsx";
import NumberInput from "../components/number-input.jsx";
import InteractiveUtil from "../interactive2/interactive-util.js";
import * as Changeable from "../mixins/changeable.jsx";
import {ApiOptions} from "../perseus-api.jsx";
import Util from "../util.js";
import KhanColors from "../util/colors.js";
import KhanMath from "../util/math.js";

import type {WidgetExports} from "../types.js";

const {assert} = InteractiveUtil;
const {seededRNG} = Util;
// $FlowFixMe[prop-missing]
const {Path, Arc, Circle, Label, Line, MovablePoint, MovableLine} = Graphie;

const defaultBoxSize = 400;
const maxSampleSize = 1000;
const maxTrials = 5000;

class Histogram extends React.Component<$FlowFixMe, $FlowFixMe> {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.number),
        xAxisLabel: PropTypes.string,
        yAxisLabel: PropTypes.string,
        box: PropTypes.arrayOf(PropTypes.number),
    };

    static defaultProps = {
        data: null,
        xAxisLabel: "Proportion (%)",
        yAxisLabel: "Number of times seen",
        box: [defaultBoxSize, defaultBoxSize],
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        // Reset the threshold if the range has changed
        const oldRange = this._range();
        const nextRange = this._range(nextProps);
        if (!Util.deepEq(oldRange, nextRange)) {
            this.setState({
                threshold: this._getInitialThreshold(nextRange),
            });
        }
    }

    /* Renders the vertical line that users can drag across the histogram. */
    _renderThresholdLine = () => {
        // Recall the the y-range goes from [-1, yMax] to allow for ticks on
        // the x-axis.
        const yRange = [0, this._range()[1][1]];
        const coords = _.map(yRange, (y) => [this.state.threshold, y]);

        // Returns an inivisble, placeholder coord that anchors the line
        const invisiblePointForCoord = (coord, i) => {
            return (
                <MovablePoint
                    key={i}
                    static={true}
                    coord={coord}
                    normalStyle={{stroke: "none", fill: "none"}}
                />
            );
        };

        return (
            <MovableLine onMove={this.handleMouseInteraction}>
                {_.map(coords, invisiblePointForCoord)}
            </MovableLine>
        );
    };

    /* Renders the shaded circle in the top right. */
    _renderCircle = () => {
        const data = this.props.data;

        // Get proportion of results below threshold
        const total = _.reduce(
            data,
            (sum, next) => {
                return sum + next;
            },
            0,
        );
        const numBelow = _.reduce(
            data,
            (sum, next, i) => {
                if (this.state.threshold != null && i <= this.state.threshold) {
                    return sum + next;
                }
                return sum;
            },
            0,
        );
        const proportionBelow = numBelow / total;

        // This is a hack around the arc taking angles modulo 360.
        // TODO(charlie): Find a better way around this.
        const epsilon = 1e-5;
        const radius = 20;
        const center = [this.props.box[0] - 1.5 * radius, 1.5 * radius];

        // Plot little circle
        const plotBelowCircle = () => {
            const options = {
                key: "below",
                center: center,
                radius: radius,
                startAngle: 0,
                endAngle:
                    proportionBelow < 1 ? 360 * proportionBelow : 360 - epsilon,
                sector: proportionBelow !== 1,
                unscaled: true,
                style: {
                    fill: KhanColors.LIGHT_RED,
                    stroke: KhanColors.RED,
                },
            };

            return <Arc {...options} />;
        };
        const plotAboveCircle = () => {
            const options = {
                key: "above",
                center: center,
                radius: radius,
                startAngle:
                    proportionBelow > 0 ? 360 * proportionBelow : epsilon,
                endAngle: 360,
                sector: proportionBelow !== 0,
                unscaled: true,
                style: {
                    fill: KhanColors.LIGHT_BLUE,
                    stroke: KhanColors.BLUE,
                },
            };

            return <Arc {...options} />;
        };

        // Plot the label below the circle
        const xRange = this._range()[0];
        const formattedThreshold = Math.min(
            Math.max(this.state.threshold, xRange[0]),
            xRange[1],
        ).toFixed(2);
        const plotLabel = () => {
            const options = {
                key: "label",
                coord: [center[0], center[1] + 1.5 * radius],
                text:
                    numBelow +
                    " of " +
                    total +
                    " results below " +
                    formattedThreshold +
                    "%",
                direction: "center",
                tex: false,
                unscaled: true,
                style: {
                    fontSize: "12px",
                },
            };
            return <Label {...options} />;
        };

        return [
            proportionBelow > 0 && plotBelowCircle(),
            proportionBelow < 1 && plotAboveCircle(),
            plotLabel(),
        ];
    };

    /* Renders the actual bars of the histogram. */
    _renderData = () => {
        const data = this.props.data;
        const range = this._range();

        // Plot bars
        const barWidth = 1;
        const pathForData = (count, i) => {
            // Avoid plotting bars of height 0, else you get a thick blue line
            // over the x-axis. We don't filter these out of the data passed in
            // to this function, however, to preserve absolute indices.
            if (!count) {
                return;
            }

            const isBelow =
                this.state.threshold != null && i <= this.state.threshold;
            const style = {
                fill: isBelow ? KhanColors.LIGHT_RED : KhanColors.LIGHT_BLUE,
                stroke: isBelow ? KhanColors.RED : KhanColors.BLUE,
            };
            const coords = [
                [i, 0],
                [i, count],
                [i + barWidth, count],
                [i + barWidth, 0],
            ];
            return <Path key={i} coords={coords} style={style} />;
        };

        return _.map(data, pathForData);
    };

    render(): React.Node {
        const data = this.props.data;
        const range = this._range();

        const options = {
            xAxisLabel: this.props.xAxisLabel,
            yAxisLabel: this.props.yAxisLabel,
            box: this.props.box,
            range: range,
            data: data,
            scale: [
                Util.scaleFromExtent(range[0], this.props.box[0]),
                Util.scaleFromExtent(range[1], this.props.box[1]),
            ],
        };

        const axisStyle = {
            stroke: "#000",
            strokeWidth: 1,
            opacity: 1.0,
        };
        const origin = [range[0][0], 0];
        const bottomRight = [range[0][1], 0];

        return (
            <Graphie
                box={options.box}
                range={options.range}
                options={options}
                setup={this._setupGraphie}
                onMouseMove={this.handleMouseInteraction}
                onMouseDown={this.handleMouseInteraction}
                setDrawingAreaAvailable={this.props.setDrawingAreaAvailable}
            >
                <Line start={origin} end={bottomRight} style={axisStyle} />
                {/* Only plot these cool extra features if there's data */}
                {data && this._renderData()}
                {data && this._renderCircle()}
                {data && this._renderThresholdLine()}
            </Graphie>
        );
    }

    _setupGraphie = (graphie, options) => {
        const data = options.data;
        const range = options.range;
        const scale = options.scale;

        /* Plot the bars that run parallel to the x-axis. */
        const xWidth = range[0][1] - range[0][0];
        const yWidth = range[1][1] - 0;

        const maxYAxisEntities = 20;
        const ySkip = Math.ceil(yWidth / maxYAxisEntities);
        _.each(_.range(0, range[1][1], ySkip), (y) => {
            // If there's no data, we don't label the axes
            if (data) {
                graphie.label(
                    [range[0][0], y],
                    KhanMath.roundToApprox(y, 2),
                    "left",
                    /* isTeX */ true /* for the \approx symbol */,
                );
            }

            graphie.line([range[0][0], y], [range[0][1], y], {
                stroke: "#000",
                strokeWidth: 1,
                opacity: 0.3,
            });
        });

        // If there's no data, we don't label the x-axis at all
        if (data) {
            // Plot the labels below the bars
            const maxXAxisEntities = 15;
            const xSkip = Math.ceil(xWidth / maxXAxisEntities);
            _.each(_.range(range[0][0], range[0][1], xSkip), (x) => {
                graphie.label([x, 0], knumber.round(x, 2), "below", true);

                const tickHeight = 8;
                graphie.line([x, 0], [x, -tickHeight / scale[1]], {
                    stroke: "#000",
                    strokeWidth: 1,
                });
            });
        }

        // Add y axis (x axis is added later to overlap the bars)
        const axisStyle = {
            stroke: "#000",
            strokeWidth: 2,
            opacity: 1.0,
        };
        const origin = [range[0][0], 0];
        const topLeft = [range[0][0], range[1][1]];
        graphie.line(origin, topLeft, axisStyle);

        // Add axis labels
        const xMid = range[0][0] + xWidth / 2;
        const xOffset = data ? 25 : 0;
        graphie
            .label(
                [xMid, -xOffset / scale[1]],
                options.xAxisLabel,
                "below",
                false,
            )
            .css("font-weight", "bold");

        const yMid = 0 + yWidth / 2;
        const yOffset = data ? 55 : 28;
        graphie
            .label(
                [range[0][0] - yOffset / scale[0], yMid],
                options.yAxisLabel,
                "center",
                false,
            )
            .css("font-weight", "bold")
            .css("-webkit-transform", "rotate(-90deg)");
    };

    handleMouseInteraction = (point) => {
        this.setState({
            threshold: point[0],
        });
    };

    /* Convenience functions that help calculate props based on other props. */
    _range = (props) => {
        const defaultRange = [
            [0, 100],
            [-1, 10],
        ];
        props = props || this.props;
        return props.data ? this._getRangeForData(props.data) : defaultRange;
    };

    _getRangeForData = (data) => {
        // Find first/last non-zero entry and add some padding
        const padding = 10;
        const firstIndex = _.indexOf(
            data,
            _.find(data, (n) => n > 0),
        );
        const xMin = Math.max(0, firstIndex - padding);
        const lastIndex = _.lastIndexOf(
            data,
            _.last(_.filter(data, (n) => n > 0)),
        );
        const xMax = Math.min(100 + 1, lastIndex + 1 + padding);

        // The y-axis is bounded above by largest value, and below by 0.
        // However, the 'range' of the y-axis goes as low as -1 to allow
        // Graphie to draw ticks on the x-Axis that extend vertically below
        // y = 0.
        const yMin = -1;
        const yMax = _.max(data);

        return [
            [xMin, xMax],
            [yMin, yMax],
        ];
    };

    _getInitialThreshold = (range) => {
        // We pick a pretty-looking threshold, 1/3 of the way along the axis
        const xRange = range[0];
        return xRange[0] + (xRange[1] - xRange[0]) / 3;
    };

    state = {
        threshold: this._getInitialThreshold(this._range()),
    };
}

class Simulator extends React.Component<$FlowFixMe, $FlowFixMe> {
    generateNumber: () => number;

    static propTypes = {
        ...Changeable.propTypes,
        apiOptions: ApiOptions.propTypes,
        data: PropTypes.arrayOf(PropTypes.number),
        numTrials: PropTypes.number,
        proportionLabel: PropTypes.string,
        proportionOrPercentage: PropTypes.string,
        randomSeed: PropTypes.number,
        sampleSize: PropTypes.number,
        trackInteraction: PropTypes.func.isRequired,
        userProportion: PropTypes.number,
        xAxisLabel: PropTypes.string,
        yAxisLabel: PropTypes.string,
    };

    static defaultProps: $FlowFixMe = {
        data: null,
        userProportion: null,
        sampleSize: null,
        numTrials: null,
        randomSeed: 0,
        xAxisLabel: "Proportion (%)",
        yAxisLabel: "Number of times seen",
        proportionLabel: "Underlying proportion",
        proportionOrPercentage: "proportion",
        apiOptions: ApiOptions.defaults,
    };

    state: $FlowFixMe = {
        invalidInput: false,
    };

    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        if (this.props.randomSeed != null) {
            this.generateNumber = Util.seededRNG(this.props.randomSeed);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: $FlowFixMe) {
        if (nextProps.randomSeed !== this.props.randomSeed) {
            this.generateNumber = Util.seededRNG(nextProps.randomSeed);
        }
    }

    render(): React.Node {
        const inputStyle = {
            marginLeft: "5px",
        };

        const highlight = "0px 0px 0px 2px rgba(255, 165, 0, 1)";
        const highlightStyle = _.extend({}, inputStyle, {
            WebkitBoxShadow: highlight,
            MozBoxShadow: highlight,
            boxShadow: highlight,
            transition: "all 0.15s",
        });
        const unhighlightStyle = _.extend({}, inputStyle, {
            transition: "all 0.15s",
        });
        const style = this.state.invalidInput
            ? highlightStyle
            : unhighlightStyle;

        const InputComponent = this.props.apiOptions.staticRender
            ? MathOutput
            : NumberInput;

        const proportionInput = (
            <div>
                <InputComponent
                    // eslint-disable-next-line react/no-string-refs
                    ref="userProportion"
                    style={style}
                    value={this.calculateDisplayProportion()}
                    checkValidity={this.checkProportionValidity}
                    disabled={this.props.apiOptions.readOnly}
                    onChange={this.handleUserProportionChange}
                    onFocus={() => this.props.onFocus(["userProportion"])}
                    onBlur={() => this.props.onBlur(["userProportion"])}
                />
                <InfoTip>
                    <p>
                        {i18n._(
                            "This controls the proportion or percentage that will be used in your simulation.",
                        )}
                    </p>
                </InfoTip>
            </div>
        );

        const sampleSizeInput = (
            <div>
                <InputComponent
                    // eslint-disable-next-line react/no-string-refs
                    ref="sampleSize"
                    style={style}
                    value={this.props.sampleSize}
                    checkValidity={(val) => val >= 0}
                    disabled={this.props.apiOptions.readOnly}
                    onChange={this.handleSampleSizeChange}
                    onFocus={() => this.props.onFocus(["sampleSize"])}
                    onBlur={() => this.props.onBlur(["sampleSize"])}
                />
                <InfoTip>
                    <p>
                        {i18n._(
                            "This controls the sample size that will be used in your simulation. For example, if you set this to 100, then for each trial, responses from 100 participants will be simulated.",
                        )}
                    </p>
                </InfoTip>
            </div>
        );

        const numTrialsDisplay = (
            <div style={{textAlign: "right"}}>
                <b>{this.props.numTrials}</b>
                <InfoTip>
                    <p>
                        {i18n._(
                            "This is the number of trials used in the simulation. For example, if set to 50, then the survey will be conducted 50 times.",
                        )}
                    </p>
                </InfoTip>
            </div>
        );

        // Generates a table from a set of titles and values.
        const generateTable = (contents) => {
            const header = (
                <thead>
                    <tr>
                        <th>{i18n._("Parameter")}</th>
                        <th>{i18n._("Value")}</th>
                    </tr>
                </thead>
            );

            const body = (
                <tbody>
                    {_.map(contents, (row, i) => {
                        return (
                            <tr key={i}>
                                <td>{row.title}</td>
                                <td>{row.value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            );

            return (
                <table>
                    {header}
                    {body}
                </table>
            );
        };

        // Contents for the table to-be generated
        const contents = [
            {
                title: this.props.proportionLabel + ":",
                value: proportionInput,
            },
            {
                title: i18n._("Sample size:"),
                value: sampleSizeInput,
            },
            {
                title: i18n._("Number of trials:"),
                value: numTrialsDisplay,
            },
        ];

        // The 'Run Simulation' button
        const buttonStyle = {
            margin: "20px 0",
        };
        const startButton = (
            <button
                className="simple-button"
                style={buttonStyle}
                disabled={this.props.apiOptions.readOnly}
                onClick={this.handleRunSimulation}
            >
                {i18n._("Run simulation")}
            </button>
        );

        // When we plot data, ticks on the x-axis require some vertical padding
        const histogramStyle = {
            paddingBottom: this.props.data ? 40 : 0,
        };
        const histogram = (
            <div style={histogramStyle}>
                <Histogram
                    data={this.props.data}
                    xAxisLabel={this.props.xAxisLabel}
                    yAxisLabel={this.props.yAxisLabel}
                    setDrawingAreaAvailable={
                        this.props.apiOptions.setDrawingAreaAvailable
                    }
                />
            </div>
        );

        return (
            <div>
                {generateTable(contents)}
                {startButton}
                {histogram}
            </div>
        );
    }

    calculateDisplayProportion: () => number = () => {
        const userProportion = this.props.userProportion;

        // If we want to display as a percentage, multiply proportion by 100.0.
        if (this.props.proportionOrPercentage === "percentage") {
            return Math.round(100 * userProportion);
        }
        return userProportion;
    };

    change: (...args: $ReadOnlyArray<mixed>) => $FlowFixMe = (...args) => {
        // $FlowFixMe[incompatible-call]
        return Changeable.change.apply(this, args);
    };

    checkProportionValidity: (number) => boolean = (value) => {
        return (
            (value >= 0.0 &&
                this.props.proportionOrPercentage === "proportion" &&
                value <= 1.0) ||
            (this.props.proportionOrPercentage === "percentage" &&
                value <= 100.0)
        );
    };

    handleUserProportionChange: (number, $FlowFixMe) => void = (value, cb) => {
        let userProportion;

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
        this.props.onChange(
            {
                userProportion: userProportion,
            },
            cb,
        );
    };

    handleSampleSizeChange: (number: $FlowFixMe) => void = (sampleSize, cb) => {
        if (sampleSize != null) {
            sampleSize = Math.min(
                maxSampleSize,
                Math.max(0, Math.floor(sampleSize)),
            );
        }
        this.props.onChange(
            {
                sampleSize: sampleSize,
            },
            cb,
        );
    };

    handleRunSimulation: () => void = () => {
        // If they haven't filled out a parameter field, highlight it.
        if (
            this.props.numTrials == null ||
            this.props.userProportion == null ||
            this.props.sampleSize == null
        ) {
            this.setState({
                invalidInput: true,
            });
            return;
        }
        this.setState({
            invalidInput: false,
        });

        this.props.onChange({
            data: this.generateData(),
        });
        this.props.trackInteraction();
    };

    generateData: ($FlowFixMe) => $FlowFixMe = (props) => {
        props = props || this.props;
        const getSampleDistribution = (sampleSize, numTrials, proportion) => {
            const draw = () => {
                return this.generateNumber() < proportion;
            };
            const sampleDistribution = _.times(100 + 1, () => 0);
            _.times(numTrials, () => {
                const results = _.times(sampleSize, draw);
                const count = _.filter(results, _.identity).length;
                const normalizedCount = Math.floor((100 * count) / sampleSize);
                sampleDistribution[normalizedCount]++;
            });
            return sampleDistribution;
        };
        return getSampleDistribution(
            props.sampleSize,
            props.numTrials,
            props.userProportion,
        );
    };

    /* InputPath API */
    getInputPaths: () => $ReadOnlyArray<$ReadOnlyArray<string>> = () => {
        return [["userProportion"], ["sampleSize"]];
    };

    focus: () => boolean = () => {
        const path = _.head(this.getInputPaths());
        this.focusInputPath(path);
        return true;
    };

    focusInputPath: ($FlowFixMe) => void = (path) => {
        assert(path.length > 0);
        const inputID = _.head(path);
        // eslint-disable-next-line react/no-string-refs
        const inputComponent = this.refs[inputID];
        inputComponent.focus();
    };

    blurInputPath: ($FlowFixMe) => void = (path) => {
        assert(path.length > 0);
        const inputID = _.head(path);
        // eslint-disable-next-line react/no-string-refs
        const inputComponent = this.refs[inputID];
        inputComponent.blur();
    };

    getDOMNodeForPath: ($FlowFixMe) => ?(Element | Text) = (path) => {
        assert(path.length > 0);
        const inputID = _.head(path);
        // eslint-disable-next-line react/no-string-refs
        return ReactDOM.findDOMNode(this.refs[inputID]);
    };

    getGrammarTypeForPath: ($FlowFixMe) => string = (path) => {
        assert(path.length > 0);
        return "number";
    };

    setInputValue: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => void = (
        path,
        newValue,
        cb,
    ) => {
        assert(path.length > 0);
        const inputID = _.head(path);
        const capitalizedID =
            inputID.charAt(0).toUpperCase() + inputID.slice(1);
        const functionName = "handle" + capitalizedID + "Change";
        // $FlowFixMe[incompatible-use]
        this[functionName](newValue, cb);
    };

    getUserInput: () => ?void = () => {
        return null;
    };

    simpleValidate: ($FlowFixMe) => $FlowFixMe = (rubric) => {
        // $FlowFixMe[prop-missing]
        return Simulator.validate(this.getUserInput(), rubric);
    };
}

_.extend(Simulator, {
    validate: function (state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    },
});

const propTransform: ($FlowFixMe) => $FlowFixMe = (editorProps) => {
    const widgetProps = _.clone(editorProps);
    widgetProps.randomSeed = editorProps.problemNum;
    return widgetProps;
};

export default ({
    name: "simulator",
    displayName: "Simulator",
    widget: Simulator,
    transform: propTransform,
    hidden: true,
}: WidgetExports<typeof Simulator>);
