import {Coordinates} from "mafs";
import * as React from "react";

import AxisArrows from "./axis-arrows";

import type {SizeClass} from "../../util/sizing-utils";
import type {vec} from "mafs";

interface GridProps {
    step: vec.Vector2;
    gridStep: vec.Vector2;
    range: [[number, number], [number, number]];
    containerSizeClass: SizeClass;
    markings: "graph" | "grid" | "none";
}

const renderLineLabel = (
    n: number,
    axisTickStep: number,
    axisRange: vec.Vector2,
) => {
    const [min, max] = axisRange;
    const isOnStep = n % axisTickStep === 0;
    const isNegativeOne = n === -1;
    const isMin = n === min;
    const isMax = n === max;
    const shouldRender = isOnStep && !isNegativeOne && !isMin && !isMax;
    return shouldRender ? n : "";
};

// axisIndex is for grabbing data in an array that contains
// data for multiple axes. For example range: [[-10, 10], [-10, 10]]
// range[0] is data for the x axis and range[1] is data for the y axis
const axisOptions = (
    props: Omit<GridProps, "containerSizeClass">,
    axisIndex: number,
) => {
    const axisStep = props.step[axisIndex];
    const axisRange = props.range[axisIndex];
    return {
        axis: props.markings === "graph",
        lines: props.gridStep[axisIndex],
        labels: (n: number) => renderLineLabel(n, axisStep, axisRange),
    };
};

export const Grid = (props: GridProps) => {
    return props.markings === "none" ? null : (
        <>
            <Coordinates.Cartesian
                xAxis={axisOptions(props, 0)}
                yAxis={axisOptions(props, 1)}
            />
            {props.markings === "graph" && <AxisArrows />}
        </>
    );
};
