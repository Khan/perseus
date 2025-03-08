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
import type {Interval} from "mafs";

const fontSize = 14;
export default function AxisLabels({i18n}: {i18n: I18nContextType}) {
    const {range, labels, width, height, labelLocation} = useGraphConfig();
    const {strings} = i18n;

    // Get the position of the main axis labels
    const [xAxisLabelLocation, yAxisLabelLocation] = getLabelPosition(
        range,
        width,
        height,
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
    range: [Interval, Interval],
    width: number,
    height: number,
    labelLocation: GraphConfig["labelLocation"],
): vec.Vector2[] => {
    // If the labels are rotated, we need to calculate the position
    // of the labels based on the graph's dimensions and range.
    const graphInfo: GraphDimensions = {
        range,
        width,
        height,
    };

    switch (labelLocation) {
        case "onAxis": {
            const xLabelInitial: vec.Vector2 = [range[X][MAX], 0];
            const yLabelInitial: vec.Vector2 = [0, range[Y][MAX]];
            const yLabelOffset: vec.Vector2 = [0, -fontSize * 2];

            const xLabel = pointToPixel(xLabelInitial, graphInfo);
            const yLabel = vec.add(
                pointToPixel(yLabelInitial, graphInfo),
                yLabelOffset,
            );
            return [xLabel, yLabel];
        }
        case "alongEdge": {
            const xAxisLabelOffset: [number, number] =
                range[Y][MIN] >= 0 // Move the label down by 3 font sizes if the y-axis is left of the graph
                    ? [0, fontSize * 3]
                    : [0, fontSize];
            const yAxisLabelOffset: [number, number] =
                range[X][MIN] >= 0 // Move the label left by 3.5 font sizes if the x-axis is below the graph
                    ? [-fontSize * 3.5, -fontSize]
                    : [-fontSize, -fontSize];

            const xAxisLabelLocation: vec.Vector2 = [
                (range[X][MIN] + range[X][MAX]) / 2,
                range[Y][MIN],
            ];
            const yAxisLabelLocation: vec.Vector2 = [
                range[X][MIN],
                (range[Y][MIN] + range[Y][MAX]) / 2,
            ];

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
        // Add more cases for other label locations as needed
        default:
            throw new Error(`Unknown label location: ${labelLocation}`);
    }
};
