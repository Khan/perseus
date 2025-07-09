import {vec} from "mafs";

import {pointToPixel} from "../graphs/use-transform";
import {X, Y, MIN, MAX} from "../math";

import type {GraphConfig} from "../reducer/use-graph-config";
import type {GraphDimensions} from "../types";
import type {Interval} from "mafs";

// Exported for testing purposes
export const fontSize = 14;

/* Calculate the position of the main axis labels based on the labelLocation
 * and the ranges of the graph. Exported for testing purposes.
 */
// This function clamps the label position to ensure that the labels do not go too far
// outside the graph bounds. This is only required when the labelLocations are set to "onAxis".
export const clampLabelPosition = (
    labelPosition: vec.Vector2,
    graphInfo: GraphDimensions,
): vec.Vector2 => {
    // Clamp the label position to ensure that the labels do not go too far outside of the graph bounds.
    // Unfortuantely, this logic is a little complex as we have to account for both the positive and negative
    // ranges of the graph, and the variable position of the axis tick labels.
    const x = Math.max(
        // The maximum x value is the width of the graph + 1.25 font sizes, which aligns the label with the axis ticks
        // when the x-axis is out of bounds to the right of the graph.
        Math.min(labelPosition[X], graphInfo.width + fontSize * 1.25),
        // The minimum x value is -1.5 font sizes, as this aligns the label with the axis ticks
        // when the y-axis is out of bounds to the left of the graph.
        -fontSize * 1.5,
    );
    const y = Math.max(
        // The maximum y value is the height of the graph + 1.25 font sizes, which aligns the label with the axis ticks
        // when the y-axis is out of bounds below the graph.
        Math.min(labelPosition[Y], graphInfo.height + fontSize * 1.25),
        // The minimum y value is -2 font sizes, which aligns the label with the axis ticks
        // when the y-axis is out of bounds above the graph.
        -fontSize * 2,
    );
    return [x, y];
};

/* Get the transform for the labels based on the labelLocation
 *  Exported for testing purposes.
 */
export const getLabelTransform = (
    labelLocation: GraphConfig["labelLocation"],
): {xLabelTransform: string; yLabelTransform: string} => {
    // onAxis is the default label location
    const isOnAxis = labelLocation === undefined || labelLocation === "onAxis";

    const xLabelTransform = isOnAxis
        ? "translate(7px, -50%)"
        : "translate(-50%, -50%)";

    const yLabelTransform = isOnAxis
        ? "translate(-50%, 0px)"
        : "translate(-50%, 0px) rotate(-90deg)";

    return {xLabelTransform, yLabelTransform};
};

/**
 * Calculate the maximum number of digits needed to display tick labels on the y-axis.
 * This accounts for both the integer part of the range values and decimal places in the tick step.
 */
export const calculateMaxDigitsInRange = (
    range: [number, number],
    tickStep: number,
): number => {
    // Calculate maximum digits in the integer part of range values
    const maxDigitsInRange = Math.max(
        String(Math.abs(Math.floor(range[MIN]))).length,
        String(Math.abs(Math.ceil(range[MAX]))).length,
    );

    // A decimal tick step can result in additional digits, so we need to account for that,
    // including the leading 0 and decimal point.
    const tickStepSigFigs = countSignificantDecimals(tickStep) + 2;

    // Return the maximum of the two
    return Math.max(maxDigitsInRange, tickStepSigFigs);
};

export const getLabelPosition = (
    graphInfo: GraphDimensions,
    labelLocation: GraphConfig["labelLocation"],
    tickStep: GraphConfig["tickStep"],
): vec.Vector2[] => {
    // If the labels are placed along the edge of the graph, we need to place them at the
    // center of the graph, which is the average of the min and max values of the axes.
    if (labelLocation === "alongEdge") {
        // Offset the labels by a certain amount based on the range of the graph, to ensure that
        // the labels do not overlap with the axis tick if they are out of the graph bounds.
        const xAxisLabelOffset: [number, number] =
            graphInfo.range[Y][MIN] >= 0
                ? [0, fontSize * 3] // Move the label down by 2 font sizes if the y-axis min is positive
                : [0, fontSize * 1.5]; // Move the label down by 1.5 font sizes if the y-axis min is negative

        // Determine if the x-axis min is negative and relatively close to zero, based on the scale of the x-axis range.
        const isRelativelyCloseToZero =
            graphInfo.range[X][MIN] < 0 &&
            Math.abs(graphInfo.range[X][MIN]) <
                (graphInfo.range[X][MAX] - graphInfo.range[X][MIN]) * 0.07;

        // Determine if the tick labels extend beyond the left edge of the graph, either
        // because the x-axis is wholly positive or because the x-axis min is negative and close to zero.
        const needsExtraSpacing =
            graphInfo.range[X][MIN] >= 0 || isRelativelyCloseToZero;

        // When tick labels extend beyond the left edge of the graph, we need to account for their
        // width to prevent the main axis label from overlapping with them.
        let paddingRequiredForTickLabels = 0;
        if (needsExtraSpacing) {
            // Calculate the maximum digits needed for tick labels
            const maxDigits = calculateMaxDigitsInRange(
                graphInfo.range[Y],
                tickStep[Y],
            );

            // Estimate the width of the tick labels so that we can ensure
            // the axis labels do not overlap with the tick labels.
            paddingRequiredForTickLabels =
                maxDigits * (fontSize * 0.75) +
                (graphInfo.range[Y][MIN] < 0 && graphInfo.range[X][MIN] <= 0
                    ? fontSize * 0.5
                    : 0); // Add space for negative sign if needed
        }

        const yAxisLabelOffset: [number, number] = [
            -fontSize * 1.25 - paddingRequiredForTickLabels,
            -fontSize,
        ];

        // Calculate the location of the labels to be halfway between the min and max values of the axes
        const xAxisLabelLocation: vec.Vector2 = [
            (graphInfo.range[X][MIN] + graphInfo.range[X][MAX]) / 2,
            graphInfo.range[Y][MIN],
        ];
        const yAxisLabelLocation: vec.Vector2 = [
            graphInfo.range[X][MIN],
            (graphInfo.range[Y][MIN] + graphInfo.range[Y][MAX]) / 2,
        ];

        // If we're VERY close to zero, we want to account for the strange grid offset to avoid
        // the y-axis label from getting too far from the tick labels.
        if (isRelativelyCloseToZero) {
            yAxisLabelLocation[X] =
                yAxisLabelLocation[X] - graphInfo.range[X][MIN];
        }

        // Convert the Vector2 coordinates to pixel coordinates and add the offsets
        const xLabel = vec.add(
            pointToPixel(xAxisLabelLocation, graphInfo),
            xAxisLabelOffset,
        );
        const yLabel = vec.add(
            pointToPixel(yAxisLabelLocation, graphInfo),
            yAxisLabelOffset,
        );

        return [xLabel, yLabel];
    }

    // Otherwise, the labels are placed on the axes (default), and we need to
    // place them at the end of the axis, which is the maximum value of the axis.
    const xLabelInitial: vec.Vector2 = [graphInfo.range[X][MAX], 0];
    const yLabelInitial: vec.Vector2 = [0, graphInfo.range[Y][MAX]];
    const yLabelOffset: vec.Vector2 = [0, -fontSize * 2]; // Move the y-axis label up by 2 font sizes

    let xLabel = pointToPixel(xLabelInitial, graphInfo);
    let yLabel = vec.add(pointToPixel(yLabelInitial, graphInfo), yLabelOffset);

    // Clamp the label positions to ensure that the labels do not go too far outside of the graph bounds.
    xLabel = clampLabelPosition(xLabel, graphInfo);
    yLabel = clampLabelPosition(yLabel, graphInfo);

    return [xLabel, yLabel];
};
// Determines whether to show the label for the given tick
// Currently, the only condition is to hide the label at -tickStep
// on the y-axis when the y-axis is within the graph bounds
export const shouldShowLabel = (
    currentTick: number,
    range: [Interval, Interval],
    tickStep: number,
) => {
    let showLabel = true;

    // If the y-axis is within the graph and currentTick equals -tickStep, hide the label
    if (
        range[X][MIN] < -tickStep &&
        range[X][MAX] > 0 &&
        currentTick === -tickStep
    ) {
        showLabel = false;
    }

    return showLabel;
};

export function generateTickLocations(
    tickStep: number,
    min: number,
    max: number,
): number[] {
    const ticks: number[] = [];

    // Calculate the number of significant decimals in the tick step so
    // that we can match the desired precision when generating ticks.
    const decimalSigFigs: number = countSignificantDecimals(tickStep);

    // Add ticks in the positive direction
    const start = Math.max(min, 0);
    for (let i = start + tickStep; i < max; i += tickStep) {
        // Match to the same number of decimal places as the tick step
        // to avoid floating point errors when working with small numbers
        ticks.push(parseFloat(i.toFixed(decimalSigFigs)));
    }

    // Add ticks in the negative direction
    // Start at the first tick after 0 or the maximum value if it is negative
    let i = Math.min(max, 0) - tickStep;
    for (i; i > min; i -= tickStep) {
        ticks.push(i);
    }
    return ticks;
}

// Count the number of significant digits after the decimal point
export const countSignificantDecimals = (number: number): number => {
    const numStr = number.toString();
    if (!numStr.includes(".")) {
        return 0;
    }
    return numStr.split(".")[1].length;
};

// Show the given value as a multiple of pi (already assumed to be
// a multiple of pi). Exported for testing
export function divideByAndShowPi(value: number): string {
    const dividedValue = value / Math.PI;

    switch (dividedValue) {
        case 1:
            return "π";
        case -1:
            return "-π";
        case 0:
            return "0";
        default:
            return dividedValue + "π";
    }
}
