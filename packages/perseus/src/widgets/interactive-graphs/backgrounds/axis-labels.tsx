import React from "react";

import {getDependencies} from "../../../dependencies";
import {X, Y} from "../math";
import useGraphConfig from "../reducer/use-graph-config";
import {replaceOutsideTeX} from "../utils";

import {fontSize, getLabelTransform} from "./utils";

import type {I18nContextType} from "../../../components/i18n-context";

export default function AxisLabels({
    i18n,
    xAxisLabelLocation,
    yAxisLabelLocation,
}: {
    i18n: I18nContextType;
    xAxisLabelLocation: [number, number];
    yAxisLabelLocation: [number, number];
}) {
    const {labels, labelLocation} = useGraphConfig();

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
