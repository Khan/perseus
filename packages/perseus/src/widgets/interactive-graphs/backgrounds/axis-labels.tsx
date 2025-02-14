import {vec} from "mafs";
import React from "react";

import {getDependencies} from "../../../dependencies";
import {pointToPixel} from "../graphs/use-transform";
import {MAX, MIN, X, Y} from "../math";
import useGraphConfig from "../reducer/use-graph-config";
import {replaceOutsideTeX} from "../utils";

import type {I18nContextType} from "../../../components/i18n-context";
import type {GraphDimensions} from "../types";

export default function AxisLabels({i18n}: {i18n: I18nContextType}) {
    const {range, labels, width, height} = useGraphConfig();
    const {strings} = i18n;

    const rotatedLabels = true;

    // By default, the rotated x-axis label is positioned using its
    // top-left corner, which won't work for longer labels. To center
    // the label, we need to offset it by half the label's width.
    const rotatedXCenterOffset = (labels[Y].length / 2) * -8;

    // Default labels don't need a rotation ([0, 0]).
    // Rotated labels need an offset of 12px to account for
    // their positioning being determined by their top-left corner.
    // If the label is rotated and the axes start at 0, the label
    // needs to move additionally to avoid overlapping with the ticks.
    const xAxisLabelOffset: [number, number] = rotatedLabels
        ? [rotatedXCenterOffset, 12]
        : [0, 0];
    const yAxisLabelOffset: [number, number] = rotatedLabels
        ? [-12, -12]
        : [0, -24];

    // By default, the x-axis label is at the right center of the graph
    // (right of the x-axis), and the y-axis label is at the top center
    // of the graph (above the y-axis).
    // If `rotatedLabels` is true, the x-axis label is at the bottom
    // center of the graph (below the x-axis), and the y-axis label is
    // at the left center of the graph (left of the y-axis) and rotated
    // to take up vertical space instead of horizontal space.
    const xAxisLabelLocation: vec.Vector2 = rotatedLabels
        ? [(range[X][MIN] + range[X][MAX]) / 2, range[Y][MIN]]
        : [range[X][MAX], 0];
    const yAxisLabelLocation: vec.Vector2 = rotatedLabels
        ? [range[X][MIN], (range[Y][MIN] + range[Y][MAX]) / 2]
        : [0, range[Y][MAX]];

    const [xAxisLabelText, yAxisLabelText] = labels;
    const graphInfo: GraphDimensions = {
        range,
        width,
        height,
    };

    const [xLabelX, xLabelY] = vec.add(
        pointToPixel(xAxisLabelLocation, graphInfo),
        xAxisLabelOffset,
    );
    // The default location for the y-axis-label is at the maximum y point
    // This is just underneath the tick line for that point. The -24 moves the
    // label up one grid square, so it sits on top of the graph
    const [yLabelX, yLabelY] = vec.add(
        pointToPixel(yAxisLabelLocation, graphInfo),
        yAxisLabelOffset,
    );

    const {TeX} = getDependencies();

    return (
        <>
            <span
                aria-label={strings.xAxis}
                style={{
                    position: "absolute",
                    left: xLabelX,
                    top: xLabelY,
                    fontSize: "14px",
                    transform: "translate(7px, -50%)",
                }}
            >
                <TeX>{replaceOutsideTeX(xAxisLabelText)}</TeX>
            </span>
            <span
                aria-label={strings.yAxis}
                style={{
                    position: "absolute",
                    left: yLabelX,
                    top: yLabelY,
                    fontSize: "14px",
                    transform: rotatedLabels
                        ? "translate(-50%, 0px) rotate(-90deg)"
                        : "translate(-50%, 0px)",
                }}
            >
                <TeX>{replaceOutsideTeX(yAxisLabelText)}</TeX>
            </span>
        </>
    );
}
