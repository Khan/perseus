import {vec} from "mafs";
import React from "react";

import {getDependencies} from "../../../dependencies";
import {pointToPixel} from "../graphs/use-transform";
import {MAX, MIN, X, Y} from "../math";
import useGraphConfig from "../reducer/use-graph-config";
import {replaceOutsideTeX} from "../utils";

import type {I18nContextType} from "../../../components/i18n-context";
import type {GraphConfig} from "../reducer/use-graph-config";
import type {GraphDimensions} from "../types";

// Exported for testing purposes
export const fontSize = 14;

export default function AxisLabels({i18n}: {i18n: I18nContextType}) {
    const {range, labels, width, height, labelLocation} = useGraphConfig();

    const graphInfo: GraphDimensions = {
        range,
        width,
        height,
    };

    // Get the position of the main axis labels
    const [xAxisLabelLocation, yAxisLabelLocation] = getLabelPosition(
        graphInfo,
        labelLocation,
    );

    const [xAxisLabelText, yAxisLabelText] = labels;

    // Get the transform for the labels
    const {xLabelTransform, yLabelTransform} = getLabelTransform(labelLocation);

    const {TeX} = getDependencies();

    return (
        <>
            <span
                // Reading the axis labels by themselves is mostly unhelpful
                // for screen reader users, so we should hide them to avoid
                // confusion. Instead, the axis labels should be included as
                // part of the graph description by content authors.
                aria-hidden={true}
                style={{
                    position: "absolute",
                    left: xAxisLabelLocation[X],
                    top: xAxisLabelLocation[Y],
                    fontSize: fontSize + "px",
                    transform: xLabelTransform,
                }}
            >
                <TeX>{replaceOutsideTeX(xAxisLabelText)}</TeX>
            </span>
            <span
                // Reading the axis labels by themselves is mostly unhelpful
                // for screen reader users, so we should hide them to avoid
                // confusion. Instead, the axis labels should be included as
                // part of the graph description by content authors.
                aria-hidden={true}
                style={{
                    position: "absolute",
                    left: yAxisLabelLocation[X],
                    top: yAxisLabelLocation[Y],
                    fontSize: fontSize + "px",
                    transform: yLabelTransform,
                }}
            >
                <TeX>{replaceOutsideTeX(yAxisLabelText)}</TeX>
            </span>
        </>
    );
}

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
export const getLabelPosition = (
    graphInfo: GraphDimensions,
    labelLocation: GraphConfig["labelLocation"],
): vec.Vector2[] => {
    // If the labels are placed along the edge of the graph, we need to place them at the
    // center of the graph, which is the average of the min and max values of the axes.
    if (labelLocation === "alongEdge") {
        // Offset the labels by a certain amount based on the range of the graph, to ensure that
        // the labels do not overlap with the axis tick if they are out of the graph bounds.
        const xAxisLabelOffset: [number, number] =
            graphInfo.range[Y][MIN] >= 0
                ? [0, fontSize * 3] // Move the label down by 3 font sizes if the y-axis min is positive
                : [0, fontSize]; // Move the label down by 1 font size if the y-axis min is negative
        const yAxisLabelOffset: [number, number] =
            graphInfo.range[X][MIN] >= 0
                ? [-fontSize * 3, -fontSize] // Move the label left by 3 font sizes if the x-axis min is positive
                : [-fontSize, -fontSize]; // Move the label left by 1 font size if the x-axis min is negative

        // Calculate the location of the labels to be halfway between the min and max values of the axes
        const xAxisLabelLocation: vec.Vector2 = [
            (graphInfo.range[X][MIN] + graphInfo.range[X][MAX]) / 2,
            graphInfo.range[Y][MIN],
        ];
        const yAxisLabelLocation: vec.Vector2 = [
            graphInfo.range[X][MIN],
            (graphInfo.range[Y][MIN] + graphInfo.range[Y][MAX]) / 2,
        ];

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
