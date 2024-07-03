import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {pointToPixel} from "../use-transform";

import type {GraphConfig} from "../../reducer/use-graph-config";
import type {vec} from "mafs";

type ShowTickLabelProps = {
    // The gridStep is the number of units between each grid line
    gridStep: number;
    // The tickStep is the number of units between each tick label
    tickStep: number;
    // The label for the axis tick
    label: number;
    // The relevant edge of the graph (either the width for xLabels or height for yLabels)
    graphEdge: number;
    // The relevant position of the tick label in pixels (either the x or y position)
    position: number;
    // Whether or not the axis is outside of the graph's viewbox/range
    axisOutOfBounds: boolean;
};

type GridLabel = {
    label: number;
    graphConfig: GraphConfig;
    axisOutOfBounds: boolean;
    axis: "x" | "y";
};

type GridAxisProps = {
    axisTicks: number[];
    graphConfig: GraphConfig;
};

// Universal padding for the axis ticks to ensure that the labels
// have enough space to render without overlapping the tick lines
const tickPadding = 5;

export const AxisTickLabels = () => {
    const graphConfig = useGraphConfig();
    const {tickStep, range} = graphConfig;

    const [[xMin, xMax], [yMin, yMax]] = range;
    const [xTickStep, yTickStep] = tickStep;

    const yGridTicks = generateTickLocations(yTickStep, yMin, yMax);
    const xGridTicks = generateTickLocations(xTickStep, xMin, xMax);

    return (
        <div className="axis-tick-labels">
            <YGridAxis axisTicks={yGridTicks} graphConfig={graphConfig} />
            <XGridAxis axisTicks={xGridTicks} graphConfig={graphConfig} />
        </div>
    );
};

// Generate the necessary styles and ticks for the y-axis tick labels container
const YGridAxis = (props: GridAxisProps): React.ReactElement => {
    const {axisTicks, graphConfig} = props;
    const {width, height} = graphConfig;

    // First get the label height by calculating the difference between the first two y-axis labels
    const yTopPoint: vec.Vector2 = pointToPixel([0, axisTicks[0]], graphConfig);
    const ySecondPoint: vec.Vector2 = pointToPixel(
        [0, axisTicks[1]],
        graphConfig,
    );
    const yLabelHeight = ySecondPoint[1] - yTopPoint[1];

    // When rendering purely positive y-axis labels, we want to adjust the left position
    // from the lowest calculated tick, as yMin may be negative
    const yLowestTick = axisTicks[axisTicks.length - 1];
    const yLeftAdjustment = Math.min(
        Math.max(yTopPoint[0] - tickPadding, 0),
        width,
    );

    // We only want to render the 0 label on the y-axis if it is left of the grid
    const yAxisIsLeftOfGrid = yLeftAdjustment === 0;

    // If the y-axis is right of the graph's viewbox/range,
    // we want to adjust both the positioning and text alignment
    const yAxisRightOfGrid = yLeftAdjustment === width;

    // Determine the default spacing for the labels based on whether the y-axis is right of the grid
    const defaultSpacing = yAxisRightOfGrid ? 0.5 : 0;

    // We also want to adjust the spacing if there are no negative y-axis labels as the extra space is not needed
    const marginSpacing =
        yLowestTick >= 0 ? defaultSpacing * 2 : defaultSpacing;

    // Determine the text alignment based on whether the y-axis is right of the grid
    // We need to cast this as a const as it is used in the inline styles
    const textAlign = yAxisRightOfGrid ? ("left" as const) : ("right" as const);

    const yAxisStyles = {
        left: `calc(${yLeftAdjustment}px - ${marginSpacing}em)`,
        top: `calc(${yTopPoint[1]}px - 0.5em)`,
        height,
        textAlign,
        "--y-axis-label-height": yLabelHeight + "px",
    };

    const classNames = yAxisRightOfGrid
        ? "y-axis-tick-labels y-axis-right-of-grid"
        : "y-axis-tick-labels ";

    return (
        <div
            className={classNames}
            data-testid="y-axis-tick-labels"
            style={yAxisStyles}
        >
            {axisTicks.map((label) => {
                return (
                    <AxisTickLabel
                        label={label}
                        axis="y"
                        key={`y-grid-tick-${label}`}
                        graphConfig={graphConfig}
                        axisOutOfBounds={yAxisIsLeftOfGrid}
                    />
                );
            })}
        </div>
    );
};

// Generate the necessary styles and ticks for the x-axis tick labels container
const XGridAxis = (props: GridAxisProps): React.ReactElement => {
    const {axisTicks, graphConfig} = props;
    const {width, height} = graphConfig;

    // Determine label width by calculating the difference between the first two x-axis labels
    const xFirstPoint: vec.Vector2 = pointToPixel(
        [axisTicks[0], 0],
        graphConfig,
    );
    const xSecondPoint: vec.Vector2 = pointToPixel(
        [axisTicks[1], 0],
        graphConfig,
    );
    const xLabelWidth = Math.abs(xSecondPoint[0] - xFirstPoint[0]);

    // Determine the top position of the x-axis labels based on
    // whether the x-axis is above, within, or below the graph
    const xAxisAboveGraph = xFirstPoint[1] < 0;
    const xTopAdjustment = xAxisAboveGraph
        ? 0
        : Math.min(xFirstPoint[1] + tickPadding, height);

    // Determine whether the x-axis is outside of the graph's viewbox/range
    // This is used to conditionally render the 0 label on the x-axis
    const xAxisOutOfBounds = xTopAdjustment === height || xAxisAboveGraph;

    // Determine the available space to the right of the x-axis labels
    const availableSpaceRight = width - xFirstPoint[0];

    // Calculate the total combined width of ALL the x-axis labels
    const axisTicksWidth = axisTicks.length * xLabelWidth;

    // Determine if we need to increase the width of the axis past the graph width
    const calculatedWidth = axisTicksWidth > width ? axisTicksWidth : width;

    // Determine the right adjustment for the x-axis labels based on the available space
    // We're adjusting the right as the flex-direction is row-reverse
    const xRightAdjustment = availableSpaceRight - xLabelWidth / 2;

    const xAxisStyles = {
        top: xTopAdjustment,
        right: xRightAdjustment,
        width: calculatedWidth,
        "--x-axis-label-width": xLabelWidth + "px",
    };

    return (
        <div
            className={`x-axis-tick-labels ${xAxisAboveGraph && "x-axis-top-of-grid"}`}
            data-testid="x-axis-tick-labels"
            style={xAxisStyles}
        >
            {axisTicks.map((label) => {
                return (
                    <AxisTickLabel
                        axis="x"
                        label={label}
                        key={`x-grid-tick-${label}`}
                        graphConfig={graphConfig}
                        axisOutOfBounds={xAxisOutOfBounds}
                    />
                );
            })}
        </div>
    );
};

// Generate the individual tick label elements
const AxisTickLabel = ({
    label,
    graphConfig,
    axisOutOfBounds,
    axis,
}: GridLabel) => {
    const {gridStep, tickStep} = graphConfig;
    // Determine the point on the axis based on the axis type
    const pointOnAxis: vec.Vector2 = axis === "x" ? [label, 0] : [0, label];
    const pixelPoint = pointToPixel(pointOnAxis, graphConfig);

    // Determine the relevant edge of the graph based on the axis type
    const graphEdge = axis === "x" ? graphConfig.width : graphConfig.height;

    // Determine the vector index based on the axis type
    const vectorIndex = axis === "x" ? 0 : 1;

    // Determine whether or not to render the tick label text
    const shouldShowLabel = showTickLabel({
        label,
        axisOutOfBounds,
        graphEdge,
        position: pixelPoint[vectorIndex],
        gridStep: gridStep[vectorIndex],
        tickStep: tickStep[vectorIndex],
    });

    return (
        <span className={`${axis}-axis-tick-label`}>
            {shouldShowLabel && label}
        </span>
    );
};

// Determine whether or not to show the tick label text
export const showTickLabel = ({
    gridStep,
    tickStep,
    label,
    graphEdge,
    position,
    axisOutOfBounds,
}: ShowTickLabelProps): boolean => {
    let showLabel = true;

    // We only want to show the initial negative tick labels (e.g. -1) on each
    // axis if the tickStep > gridStep, to ensure that these labels do not overlap.
    // e.g. If gridStep = 1 and tickStep = 2, there are 2 grid lines for every 1 tick,
    // which allows enough room for both these tick labels to render.
    showLabel = tickStep > gridStep ? true : label !== -tickStep;

    // If the tick label position is greater than the relevant edge of the graph, don't render it
    if (position <= -graphEdge || position >= graphEdge) {
        showLabel = false;
    }

    // If the label is 0, we only want to show it if the axis is to the left of the graph's viewbox/range
    // otherwise it will overlap with graph axis labels
    if (label === 0 && !axisOutOfBounds) {
        showLabel = false;
    }

    return showLabel;
};

// Generate the tick labels for an axis based on the tick step
export function generateTickLocations(
    tickStep: number,
    min: number,
    max: number,
): number[] {
    const positiveTicks: number[] = [];
    const negativeTicks: number[] = [];
    const ticks: number[] = [];

    // Add 0 if it is applicable.
    // This will be conditionally rendered using showTickLabel.
    if (min <= 0 && max >= 0) {
        positiveTicks.push(0);
    }

    // Add ticks on the positive axis
    // Start at the first tick after 0 or the minimum value,
    // taking into account that the graph may be zoomed in on the positive axis
    let i = Math.max(min, 0) + tickStep;
    for (i; min < i && i < max; i += tickStep) {
        positiveTicks.push(i);
    }

    // Add ticks on the negative axis
    // Start at the first tick before 0 or the maximum value,
    // taking into account that the graph may be zoomed in on the negative axis
    i = Math.min(max, 0) - tickStep;
    for (i; i > min; i -= tickStep) {
        negativeTicks.push(i);
    }

    // Reverse the ticks so that they are in the correct render order
    positiveTicks.reverse();

    ticks.push(...positiveTicks, ...negativeTicks);
    return ticks;
}
