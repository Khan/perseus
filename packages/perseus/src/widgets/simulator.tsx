/* eslint-disable @typescript-eslint/no-unused-vars, react/no-unsafe, react/sort-comp */
import {number as knumber} from "@khanacademy/kmath";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import Graphie from "../components/graphie";
import InfoTip from "../components/info-tip";
import NumberInput from "../components/number-input";
import InteractiveUtil from "../interactive2/interactive-util";
import * as Changeable from "../mixins/changeable";
import {ApiOptions} from "../perseus-api";
import Util from "../util";
import KhanColors from "../util/colors";
import KhanMath from "../util/math";

import type {Range} from "../perseus-types";
import type {WidgetExports} from "../types";

const {assert} = InteractiveUtil;
const {seededRNG} = Util;
// @ts-expect-error - TS2339 - Property 'Path' does not exist on type 'typeof Graphie'. | TS2339 - Property 'Arc' does not exist on type 'typeof Graphie'. | TS2339 - Property 'Circle' does not exist on type 'typeof Graphie'. | TS2339 - Property 'Label' does not exist on type 'typeof Graphie'. | TS2339 - Property 'Line' does not exist on type 'typeof Graphie'. | TS2339 - Property 'MovablePoint' does not exist on type 'typeof Graphie'. | TS2339 - Property 'MovableLine' does not exist on type 'typeof Graphie'.
const {Path, Arc, Circle, Label, Line, MovablePoint, MovableLine} = Graphie;

const defaultBoxSize = 400;
const maxSampleSize = 1000;
const maxTrials = 5000;

class Histogram extends React.Component<any, any> {
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

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        // Reset the threshold if the range has changed
        // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
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
        // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
        const yRange = [0, this._range()[1][1]];
        const coords = _.map(yRange, (y) => [this.state.threshold, y]);

        // Returns an inivisble, placeholder coord that anchors the line
        const invisiblePointForCoord = (coord: any, i: any) => {
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
            } as const;

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
            } as const;

            return <Arc {...options} />;
        };

        // Plot the label below the circle
        // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
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
            } as const;
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
        // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
        const range = this._range();

        // Plot bars
        const barWidth = 1;
        const pathForData = (count: any, i: any) => {
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
            } as const;
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

    render(): React.ReactNode {
        const data = this.props.data;
        // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
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
        } as const;

        const axisStyle = {
            stroke: "#000",
            strokeWidth: 1,
            opacity: 1.0,
        } as const;
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

    _setupGraphie = (graphie: any, options: any) => {
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
        } as const;
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

    handleMouseInteraction = (point: any) => {
        this.setState({
            threshold: point[0],
        });
    };

    /* Convenience functions that help calculate props based on other props. */
    _range = (props): [Range, Range] => {
        const defaultRange: [Range, Range] = [
            [0, 100],
            [-1, 10],
        ];
        props = props || this.props;
        return props.data ? this._getRangeForData(props.data) : defaultRange;
    };

    _getRangeForData = (data: any): [Range, Range] => {
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

    _getInitialThreshold = (
        range:
            | Array<Array<number>>
            | Array<Array<number> | Array<any | number>>,
    ) => {
        // We pick a pretty-looking threshold, 1/3 of the way along the axis
        const xRange = range[0];
        return xRange[0] + (xRange[1] - xRange[0]) / 3;
    };

    state = {
        // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
        threshold: this._getInitialThreshold(this._range()),
    };
}

class Simulator extends React.Component<any, any> {
    // @ts-expect-error - TS2564 - Property 'generateNumber' has no initializer and is not definitely assigned in the constructor.
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

    static defaultProps: any = {
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

    state: any = {
        invalidInput: false,
    };

    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        if (this.props.randomSeed != null) {
            this.generateNumber = Util.seededRNG(this.props.randomSeed);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        if (nextProps.randomSeed !== this.props.randomSeed) {
            this.generateNumber = Util.seededRNG(nextProps.randomSeed);
        }
    }

    render(): React.ReactNode {
        const inputStyle = {
            marginLeft: "5px",
        } as const;

        const highlight = "0px 0px 0px 2px rgba(255, 165, 0, 1)";
        const highlightStyle = _.extend({}, inputStyle, {
            boxShadow: highlight,
            transition: "all 0.15s",
        });
        const unhighlightStyle = _.extend({}, inputStyle, {
            transition: "all 0.15s",
        });
        const style = this.state.invalidInput
            ? highlightStyle
            : unhighlightStyle;

        const proportionInput = (
            <div>
                <NumberInput
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
                <NumberInput
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
        const generateTable = (
            contents: Array<{
                title: string;
                value: React.ReactElement<React.ComponentProps<"div">>;
            }>,
        ) => {
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
        } as const;
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
        } as const;
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

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    checkProportionValidity: (arg1: number) => boolean = (value) => {
        return (
            (value >= 0.0 &&
                this.props.proportionOrPercentage === "proportion" &&
                value <= 1.0) ||
            (this.props.proportionOrPercentage === "percentage" &&
                value <= 100.0)
        );
    };

    handleUserProportionChange: (arg1: number, arg2: any) => void = (
        value,
        cb,
    ) => {
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

    // @ts-expect-error - TS2322 - Type '(sampleSize: any, cb: any) => void' is not assignable to type '(number: any) => void'.
    handleSampleSizeChange: (number: any) => void = (sampleSize, cb) => {
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
            // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
            data: this.generateData(),
        });
        this.props.trackInteraction();
    };

    generateData: (arg1: any) => any = (props) => {
        props = props || this.props;
        const getSampleDistribution = (
            sampleSize: any,
            numTrials: any,
            proportion: any,
        ) => {
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
    getInputPaths: () => ReadonlyArray<ReadonlyArray<string>> = () => {
        return [["userProportion"], ["sampleSize"]];
    };

    focus: () => boolean = () => {
        const path = _.head(this.getInputPaths());
        this.focusInputPath(path);
        return true;
    };

    focusInputPath: (arg1: any) => void = (path) => {
        assert(path.length > 0);
        const inputID = _.head(path);
        // eslint-disable-next-line react/no-string-refs
        const inputComponent = this.refs[inputID];
        // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        inputComponent.focus();
    };

    blurInputPath: (arg1: any) => void = (path) => {
        assert(path.length > 0);
        const inputID = _.head(path);
        // eslint-disable-next-line react/no-string-refs
        const inputComponent = this.refs[inputID];
        // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
        inputComponent.blur();
    };

    getDOMNodeForPath: (arg1: any) => Element | Text | null | undefined = (
        path,
    ) => {
        assert(path.length > 0);
        const inputID = _.head(path);
        // eslint-disable-next-line react/no-string-refs
        return ReactDOM.findDOMNode(this.refs[inputID]);
    };

    getGrammarTypeForPath: (arg1: any) => string = (path) => {
        assert(path.length > 0);
        return "number";
    };

    setInputValue: (arg1: any, arg2: any, arg3: any) => void = (
        path,
        newValue,
        cb,
    ) => {
        assert(path.length > 0);
        const inputID = _.head(path);
        const capitalizedID =
            inputID.charAt(0).toUpperCase() + inputID.slice(1);
        const functionName = "handle" + capitalizedID + "Change";
        this[functionName](newValue, cb);
    };

    getUserInput: () => undefined | null | undefined = () => {
        return null;
    };

    simpleValidate: (arg1: any) => any = (rubric) => {
        // @ts-expect-error - TS2339 - Property 'validate' does not exist on type 'typeof Simulator'.
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

const propTransform: (arg1: any) => any = (editorProps) => {
    const widgetProps = _.clone(editorProps);
    widgetProps.randomSeed = editorProps.problemNum;
    return widgetProps;
};

export default {
    name: "simulator",
    displayName: "Simulator (deprecated)",
    widget: Simulator,
    transform: propTransform,
    hidden: true,
} as WidgetExports<typeof Simulator>;
