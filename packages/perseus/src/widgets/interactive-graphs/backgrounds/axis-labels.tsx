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
    const {strings} = i18n;

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

    // If the labels are rotated, we need to move the x-axis label
    // further left in order to center it on the x-axis.
    const xLabelTransform =
        labelLocation === "alongEdge"
            ? "translate(-50%, -50%)"
            : "translate(7px, -50%)";

    const yLabelTransform =
        labelLocation === "alongEdge"
            ? "translate(-50%, 0px) rotate(-90deg)"
            : "translate(-50%, 0px)";

    const {TeX} = getDependencies();

    return (
        <>
            <span
                aria-label={strings.xAxis}
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
                aria-label={strings.yAxis}
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
                ? [-fontSize * 3, -fontSize] // Move the label left by 3.5 font sizes if the x-axis min is positive
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

    const xLabel = pointToPixel(xLabelInitial, graphInfo);
    const yLabel = vec.add(
        pointToPixel(yLabelInitial, graphInfo),
        yLabelOffset,
    );
    return [xLabel, yLabel];
};
