/* eslint-disable react/forbid-prop-types, react/no-unsafe */
/**
 * Used in the editor for the InteractiveGraph widget.
 */
import {
    components,
    interactiveSizes,
    Changeable,
    Util,
} from "@khanacademy/perseus";
import Banner from "@khanacademy/wonder-blocks-banner";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import Heading from "../../../components/heading";
import LabeledRow from "../locked-figures/labeled-row";

import AxisArrowSwitches from "./axis-arrow-switches";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {
    AxisLabelLocation,
    ShowAxisArrows,
    MarkingsType,
    PerseusImageBackground,
} from "@khanacademy/perseus-core";

type ChangeFn = typeof Changeable.change;

const {ButtonGroup, InfoTip, RangeInput} = components;

const defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0,
} as const;

function numSteps(range: any, step: any) {
    return Math.floor((range[1] - range[0]) / step);
}

type Range = [min: number, max: number];

type Props = {
    /**
     * The size of the graph area in pixels.
     */
    box: [x: number, y: number];
    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * Specifies the location of the labels on the graph.  default: "onAxis".
     * - "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
     * - "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
     *    The y label is rotated. Typically used when the range min is near 0 with longer labels.
     */
    labelLocation: AxisLabelLocation;
    /**
     * The range of the graph.
     */
    range: [x: Range, y: Range];
    /**
     * Whether the graph is bounded (no axis arrows) on the x and y axes.
     */
    showAxisArrows: ShowAxisArrows;
    /**
     * How far apart the tick marks on the axes are in the x and y
     * directions.
     */
    step: [x: number, y: number];
    /**
     * How far apart the grid lines are in the x and y directions.
     */
    gridStep: [x: number, y: number];
    /**
     * How far apart the snap-to points are in the x and y directions.
     */
    snapStep: [x: number, y: number];
    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: true | string;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;

    /**
     * The type of markings to display on the graph.
     * - axes: shows the axes without the gride lines
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: MarkingsType;
    /**
     * Whether to show the protractor on the graph.
     */
    showProtractor: boolean;
    /**
     * Whether to show tooltips on the graph.
     */
    showTooltips: boolean;

    onChange: (arg1: Partial<Props>) => void;

    apiOptions: APIOptionsWithDefaults;
};

type State = {
    isExpanded: boolean;
    labelsTextbox: ReadonlyArray<string>;
    labelLocation: AxisLabelLocation;
    gridStepTextbox: [x: number, y: number];
    snapStepTextbox: [x: number, y: number];
    stepTextbox: [x: number, y: number];
    rangeTextbox: [x: Range, y: Range];
    showAxisArrowsSwitches: ShowAxisArrows;
    backgroundImage: PerseusImageBackground;
};

class InteractiveGraphSettings extends React.Component<Props, State> {
    _isMounted = false;

    bgUrlRef = React.createRef<HTMLInputElement>();
    labelXRef = React.createRef<HTMLInputElement>();
    labelYRef = React.createRef<HTMLInputElement>();

    static stateFromProps(props: Props) {
        return {
            labelsTextbox: props.labels,
            labelLocation: props.labelLocation,
            gridStepTextbox: props.gridStep,
            snapStepTextbox: props.snapStep,
            stepTextbox: props.step,
            rangeTextbox: props.range,
            showAxisArrowsSwitches: props.showAxisArrows,
            backgroundImage: {...props.backgroundImage},
        };
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            isExpanded: true,
            ...InteractiveGraphSettings.stateFromProps(props),
        };
    }

    static defaultProps = {
        box: [
            interactiveSizes.defaultBoxSizeSmall,
            interactiveSizes.defaultBoxSizeSmall,
        ],
        labels: ["$x$", "$y$"],
        labelLocation: "onAxis",
        range: [
            [-10, 10],
            [-10, 10],
        ],
        step: [1, 1],
        gridStep: [1, 1],
        snapStep: [1, 1],
        valid: true,
        backgroundImage: defaultBackgroundImage,
        markings: "graph",
        showProtractor: false,
        showTooltips: false,
        showAxisArrows: {
            xMin: true,
            xMax: true,
            yMin: true,
            yMax: true,
        },
    };

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        this.changeGraph = _.debounce(this.changeGraph, 300);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            !_.isEqual(this.props.labels, nextProps.labels) ||
            !_.isEqual(this.props.labelLocation, nextProps.labelLocation) ||
            !_.isEqual(this.props.gridStep, nextProps.gridStep) ||
            !_.isEqual(this.props.snapStep, nextProps.snapStep) ||
            !_.isEqual(this.props.step, nextProps.step) ||
            !_.isEqual(this.props.range, nextProps.range) ||
            !_.isEqual(this.props.backgroundImage, nextProps.backgroundImage)
        ) {
            this.setState(InteractiveGraphSettings.stateFromProps(nextProps));
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    change: ChangeFn = (...args) => {
        return Changeable.change.apply(this, args);
    };

    changeBackgroundUrl = (e) => {
        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.key !== "Enter") {
            return;
        }

        const setUrl = (url, width: number, height: number) => {
            // Shallow-copied clone
            const image = {...this.props.backgroundImage};
            image.url = url;
            image.width = width;
            image.height = height;
            this.setState(
                {
                    backgroundImage: image,
                },
                this.changeGraph,
            );
        };

        const url = this.bgUrlRef.current?.value;
        if (url) {
            Util.getImageSize(url, (width, height) => {
                if (this._isMounted) {
                    setUrl(url, width, height);
                }
            });
        } else {
            setUrl(null, 0, 0);
        }
    };

    renderLabelChoices = (choices) => {
        return choices.map((nameAndValue) => (
            <option key={nameAndValue[1]} value={nameAndValue[1]}>
                {nameAndValue[0]}
            </option>
        ));
    };

    validRange = (range) => {
        const numbers = _.every(range, function (num) {
            return _.isFinite(num);
        });
        if (!numbers) {
            return "Range must be a valid number";
        }
        if (range[0] >= range[1]) {
            return "Range must have a higher number on the right";
        }
        return true;
    };

    validateStepValue = (settings) => {
        const {step, range, name, minTicks, maxTicks} = settings;

        const nSteps = numSteps(range, step);
        if (nSteps < minTicks) {
            return (
                name +
                " is too large, there must be at least " +
                minTicks +
                " ticks."
            );
        }
        if (nSteps > maxTicks) {
            return (
                name +
                " is too small, there can be at most " +
                maxTicks +
                " ticks."
            );
        }
        return true;
    };

    validSnapStep = (step, range) => {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Snap step",
            minTicks: 5,
            maxTicks: 60,
        });
    };

    validGridStep = (step, range) => {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Grid step",
            minTicks: 3,
            maxTicks: 60,
        });
    };

    validStep = (step, range) => {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Step",
            minTicks: 3,
            maxTicks: 20,
        });
    };

    validBackgroundImageSize = (image) => {
        // Ignore empty images
        if (!image.url) {
            return true;
        }

        const validSize = image.width <= 450 && image.height <= 450;

        if (!validSize) {
            return "Image must be smaller than 450px x 450px.";
        }
        return true;
    };

    validateGraphSettings = (range, step, gridStep, snapStep, image) => {
        const self = this;
        let msg;
        const goodRange = _.every(range, function (range) {
            msg = self.validRange(range);
            return msg === true;
        });
        if (!goodRange) {
            return msg;
        }
        const goodStep = _.every(step, function (step, i) {
            msg = self.validStep(step, range[i]);
            return msg === true;
        });
        if (!goodStep) {
            return msg;
        }
        const goodGridStep = _.every(gridStep, function (gridStep, i) {
            msg = self.validGridStep(gridStep, range[i]);
            return msg === true;
        });
        if (!goodGridStep) {
            return msg;
        }
        const goodSnapStep = _.every(snapStep, function (snapStep, i) {
            msg = self.validSnapStep(snapStep, range[i]);
            return msg === true;
        });
        if (!goodSnapStep) {
            return msg;
        }
        const goodImageSize = this.validBackgroundImageSize(image);
        if (goodImageSize !== true) {
            msg = goodImageSize;
            return msg;
        }
        return true;
    };

    changeLabel = (i, e) => {
        const val = e.target.value;
        const labels = this.state.labelsTextbox.slice();
        labels[i] = val;
        this.setState({labelsTextbox: labels}, this.changeGraph);
    };

    changeRange = (i, values) => {
        const ranges = this.state.rangeTextbox.slice();
        ranges[i] = values;

        this.setState(
            {
                rangeTextbox: ranges as [[number, number], [number, number]],
            },
            this.changeGraph,
        );
    };

    changeShowAxisArrows = (axis: keyof ShowAxisArrows) => {
        const newShowAxisArrows = {...this.state.showAxisArrowsSwitches};
        // Toggle the value of the axis switch.
        newShowAxisArrows[axis] = !newShowAxisArrows[axis];

        this.setState(
            {showAxisArrowsSwitches: newShowAxisArrows},
            this.changeGraph,
        );
    };

    changeStepsBasedOnRange = () => {
        const ranges = this.state.rangeTextbox.slice();

        const step = this.state.stepTextbox.slice();
        const gridStep = this.state.gridStepTextbox.slice();
        const snapStep = this.state.snapStepTextbox.slice();

        // Update values based on X range
        const scaleX = Util.scaleFromExtent(ranges[0], this.props.box[0]);
        if (this.validRange(ranges[0]) === true) {
            step[0] = Util.tickStepFromExtent(ranges[0], this.props.box[0]);

            const gridStepValue = Util.gridStepFromTickStep(step[0], scaleX);
            if (gridStepValue) {
                gridStep[0] = gridStepValue;
            }

            snapStep[0] = gridStep[0] / 2;
        }

        // Update values based on Y range
        const scaleY = Util.scaleFromExtent(ranges[1], this.props.box[1]);
        if (this.validRange(ranges[1]) === true) {
            step[1] = Util.tickStepFromExtent(ranges[1], this.props.box[1]);

            const gridStepValue = Util.gridStepFromTickStep(step[1], scaleY);
            if (gridStepValue) {
                gridStep[1] = gridStepValue;
            }

            snapStep[1] = gridStep[1] / 2;
        }

        this.setState(
            {
                stepTextbox: step as [number, number],
                gridStepTextbox: gridStep as [number, number],
                snapStepTextbox: snapStep as [number, number],
                rangeTextbox: ranges as [[number, number], [number, number]],
            },
            this.changeGraph,
        );
    };

    changeStep = (step) => {
        this.setState({stepTextbox: step}, this.changeGraph);
    };

    changeSnapStep = (snapStep) => {
        this.setState({snapStepTextbox: snapStep}, this.changeGraph);
    };

    changeGridStep = (gridStep) => {
        this.setState(
            {
                gridStepTextbox: gridStep,
                snapStepTextbox: _.map(gridStep, function (step) {
                    return step / 2;
                }) as [number, number],
            },
            this.changeGraph,
        );
    };

    changeGraph = () => {
        const labels = this.state.labelsTextbox;
        const labelLocation = this.state.labelLocation;
        const range = this.state.rangeTextbox.map((range) =>
            range.map((value) => Number(value)),
        );
        const showAxisArrows = this.state.showAxisArrowsSwitches;
        const step = this.state.stepTextbox.map((value) => Number(value));
        const gridStep = this.state.gridStepTextbox;
        const snapStep = this.state.snapStepTextbox;
        const image = this.state.backgroundImage;

        // validationResult is either:
        //   true -> the settings are valid
        //   a string -> the settings are invalid, and the explanation
        //               is contained in the string
        // TODO(aria): Refactor this to not be confusing
        const validationResult = this.validateGraphSettings(
            range,
            step,
            gridStep,
            snapStep,
            image,
        );

        if (validationResult === true) {
            // either true or a string
            this.change({
                valid: true,
                labels: labels,
                labelLocation: labelLocation,
                range: range,
                showAxisArrows: showAxisArrows,
                step: step,
                gridStep: gridStep,
                snapStep: snapStep,
                backgroundImage: image,
            });
        } else {
            this.change({
                valid: validationResult, // a string message, not false
            });
        }
    };

    render() {
        return (
            <>
                <Heading
                    title="Common Graph Settings"
                    isOpen={this.state.isExpanded}
                    isCollapsible={true}
                    onToggle={() =>
                        this.setState({isExpanded: !this.state.isExpanded})
                    }
                />
                {this.state.isExpanded && (
                    <View>
                        <div className="graph-settings">
                            <div className="perseus-widget-row">
                                <LabeledRow label="Label Location">
                                    <ButtonGroup
                                        value={this.props.labelLocation}
                                        allowEmpty={false}
                                        buttons={[
                                            {
                                                value: "onAxis",
                                                content: "On Axis",
                                            },
                                            {
                                                value: "alongEdge",
                                                content: "Along Graph Edge",
                                            },
                                        ]}
                                        onChange={this.change("labelLocation")}
                                    />
                                </LabeledRow>
                            </div>

                            <div className="perseus-widget-row">
                                <div className="perseus-widget-left-col">
                                    <LabeledRow label="x Label">
                                        <input
                                            type="text"
                                            className="graph-settings-axis-label"
                                            ref={this.labelXRef}
                                            onChange={(e) =>
                                                this.changeLabel(0, e)
                                            }
                                            value={
                                                this.state.labelsTextbox[0] ||
                                                ""
                                            }
                                        />
                                    </LabeledRow>
                                </div>
                                <div className="perseus-widget-right-col">
                                    <LabeledRow label="y Label">
                                        <input
                                            type="text"
                                            className="graph-settings-axis-label"
                                            ref={this.labelYRef}
                                            onChange={(e) =>
                                                this.changeLabel(1, e)
                                            }
                                            value={
                                                this.state.labelsTextbox[1] ||
                                                ""
                                            }
                                        />
                                    </LabeledRow>
                                </div>
                            </div>

                            <div className="perseus-widget-row">
                                <div className="perseus-widget-left-col">
                                    <LabeledRow label="x Range">
                                        <RangeInput
                                            value={this.state.rangeTextbox[0]}
                                            onChange={(vals) =>
                                                this.changeRange(0, vals)
                                            }
                                            allowPiTruncation={true}
                                        />
                                    </LabeledRow>
                                </div>
                                <div className="perseus-widget-right-col">
                                    <LabeledRow label="y Range">
                                        <RangeInput
                                            value={this.state.rangeTextbox[1]}
                                            onChange={(vals) =>
                                                this.changeRange(1, vals)
                                            }
                                            allowPiTruncation={true}
                                        />
                                    </LabeledRow>
                                </div>
                            </div>
                            <AxisArrowSwitches
                                showAxisArrows={
                                    this.state.showAxisArrowsSwitches
                                }
                                onChange={this.changeShowAxisArrows}
                                disabled={
                                    this.props.apiOptions?.editingDisabled ??
                                    false
                                }
                            />
                            <div className="perseus-widget-row">
                                <div className="perseus-widget-left-col">
                                    <LabeledRow label="Tick Step">
                                        <RangeInput
                                            value={this.state.stepTextbox}
                                            onChange={this.changeStep}
                                            allowPiTruncation={true}
                                        />
                                    </LabeledRow>
                                </div>
                                <div className="perseus-widget-right-col">
                                    <LabeledRow label="Grid Step">
                                        <RangeInput
                                            value={this.state.gridStepTextbox}
                                            onChange={this.changeGridStep}
                                            allowPiTruncation={true}
                                        />
                                    </LabeledRow>
                                </div>
                            </div>
                            <div className="perseus-widget-row">
                                <div className="perseus-widget-left-col">
                                    <LabeledRow label="Snap Step">
                                        <RangeInput
                                            value={this.state.snapStepTextbox}
                                            onChange={this.changeSnapStep}
                                            allowPiTruncation={true}
                                        />
                                    </LabeledRow>
                                </div>
                                <div className="perseus-widget-right-col">
                                    <Button
                                        size="small"
                                        kind="tertiary"
                                        onClick={() => {
                                            this.changeStepsBasedOnRange();
                                        }}
                                    >
                                        Auto-adjust steps
                                    </Button>
                                    <InfoTip>
                                        <p>
                                            Use the "Auto-adjust" steps button
                                            to update the tick step, grid step,
                                            and snap step to values that are
                                            valid for the current range.
                                        </p>
                                        <br />
                                        <p>
                                            This is useful when the range is
                                            changed, and the graph errors due to
                                            the step sizes being too large or
                                            too small.
                                        </p>
                                    </InfoTip>
                                </div>
                            </div>
                            <div className="perseus-widget-row">
                                <LabeledRow label="Markings:">
                                    <ButtonGroup
                                        value={this.props.markings}
                                        allowEmpty={false}
                                        buttons={[
                                            {value: "axes", content: "Axes"},
                                            {value: "graph", content: "Graph"},
                                            {value: "grid", content: "Grid"},
                                            {value: "none", content: "None"},
                                        ]}
                                        onChange={this.change("markings")}
                                    />
                                </LabeledRow>
                            </div>
                            <div className="perseus-widget-left-col">
                                <Checkbox
                                    label="Show tooltips"
                                    checked={this.props.showTooltips}
                                    onChange={(value) => {
                                        this.change({showTooltips: value});
                                    }}
                                />
                            </div>
                        </div>

                        <LabeledRow
                            label="Background image URL:"
                            style={styles.resetSpaceTop}
                        >
                            <input
                                type="text"
                                className={css(styles.backgroundUrlInput)}
                                ref={this.bgUrlRef}
                                value={this.state.backgroundImage.url || ""}
                                onChange={(e) => {
                                    // Shallow-copied clone
                                    const image = {
                                        ...this.props.backgroundImage,
                                    };
                                    image.url = e.target.value;
                                    this.setState({backgroundImage: image});
                                }}
                                onKeyPress={this.changeBackgroundUrl}
                                onBlur={this.changeBackgroundUrl}
                            />
                            <InfoTip>
                                <p>
                                    Create an image in graphie, or use the
                                    &quot;Add image&quot; function to create a
                                    background.
                                </p>
                            </InfoTip>
                        </LabeledRow>

                        <View style={styles.protractorSection}>
                            <View style={styles.checkboxRow}>
                                <Checkbox
                                    label="Show protractor"
                                    checked={this.props.showProtractor}
                                    onChange={(value) => {
                                        this.change({showProtractor: value});
                                    }}
                                    style={styles.resetSpaceTop}
                                />
                            </View>
                            {this.props.showProtractor && (
                                <Banner
                                    text="The protractor is not accessible. Please consider an alternate approach."
                                    kind="warning"
                                />
                            )}
                        </View>
                    </View>
                )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    resetSpaceTop: {
        marginTop: 0,
    },
    backgroundUrlInput: {
        border: `1px solid ${color.offBlack32}`,
        borderRadius: spacing.xxxSmall_4,
        padding: spacing.xxxSmall_4,
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: spacing.xSmall_8,
    },
    protractorSection: {
        marginTop: spacing.xSmall_8,
        borderTop: `1px solid ${color.offBlack16}`,
        paddingTop: spacing.xSmall_8,
        paddingBottom: spacing.xSmall_8,
        borderBottom: `1px solid ${color.offBlack16}`,
    },
});

export default InteractiveGraphSettings;
