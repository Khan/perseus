import {vec} from "mafs";
import * as React from "react";

import {getDependencies} from "../../../dependencies";
import {pointToPixel} from "../graphs/use-transform";
import {MAX, X, Y} from "../math";
import useGraphConfig from "../reducer/use-graph-config";
import {replaceOutsideTeX} from "../utils";

import type {GraphDimensions} from "../types";

export default function AxisLabels() {
    const {range, labels, width, height} = useGraphConfig();

    const yAxisLabelLocation: vec.Vector2 = [0, range[Y][MAX]];
    const xAxisLabelLocation: vec.Vector2 = [range[X][MAX], 0];

    const [xAxisLabelText, yAxisLabelText] = labels;
    const graphInfo: GraphDimensions = {
        range,
        width,
        height,
    };
    const [x1, y1] = pointToPixel(xAxisLabelLocation, graphInfo);
    // The default location for the y-axis-label is at the maximum y point
    // This is just underneath the tick line for that point. The -24 moves the
    // label up one grid square, so it sits on top of the graph
    const [x2, y2] = vec.add(
        pointToPixel(yAxisLabelLocation, graphInfo),
        [0, -24],
    );

    const {TeX} = getDependencies();

    return (
        <>
            <span
                style={{
                    position: "absolute",
                    left: x1,
                    top: y1,
                    fontSize: "14px",
                    transform: "translate(7px, -50%)",
                }}
            >
                <TeX>{replaceOutsideTeX(xAxisLabelText)}</TeX>
            </span>
            <span
                style={{
                    position: "absolute",
                    left: x2,
                    top: y2,
                    fontSize: "14px",
                    transform: "translate(-50%, 0px)",
                }}
            >
                <TeX>{replaceOutsideTeX(yAxisLabelText)}</TeX>
            </span>
        </>
    );
}
