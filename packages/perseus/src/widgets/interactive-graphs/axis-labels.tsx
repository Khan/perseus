import React from "react";

import {getDependencies} from "../../dependencies";

import {useTransformPointToPixel} from "./graphs/use-transform";
import useGraphConfig from "./reducer/use-graph-config";

import type {vec} from "mafs";

export default function AxisLabels(props) {
    const {range, labels, width, height} = useGraphConfig();

    const yAxisLabelLocation: vec.Vector2 = [0, range[1][1] + 1];
    const xAxisLabelLocation: vec.Vector2 = [range[0][1], 0];

    const [xAxisLabelText, yAxisLabelText] = labels;
    const graphInfo = {
        range: range,
        width,
        height,
    };
    const [[x1, y1]] = useTransformPointToPixel(
        [xAxisLabelLocation],
        graphInfo,
    );
    const [[x2, y2]] = useTransformPointToPixel(
        [yAxisLabelLocation],
        graphInfo,
    );

    const {TeX} = getDependencies();

    return (
        <>
            <span
                id="x-axis-label"
                style={{position: "absolute", left: x1, top: y1}}
            >
                <TeX>{xAxisLabelText}</TeX>
            </span>
            <span
                id="y-axis-label"
                style={{position: "absolute", left: x2, top: y2}}
            >
                <TeX>{yAxisLabelText}</TeX>
            </span>
        </>
    );
}
