import React from "react";

import {getDependencies} from "../../../dependencies";
import {X, Y} from "../math";
import useGraphConfig from "../reducer/use-graph-config";
import {replaceOutsideTeX} from "../utils";

import {fontSize, getLabelPosition, getLabelTransform} from "./utils";

import type {I18nContextType} from "../../../components/i18n-context";
import type {GraphDimensions} from "../types";

export default function AxisLabels({i18n}: {i18n: I18nContextType}) {
    const {range, labels, width, height, labelLocation, tickStep} =
        useGraphConfig();

    const graphInfo: GraphDimensions = {
        range,
        width,
        height,
    };

    // Get the position of the main axis labels
    const [xAxisLabelLocation, yAxisLabelLocation] = getLabelPosition(
        graphInfo,
        labelLocation,
        tickStep,
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
