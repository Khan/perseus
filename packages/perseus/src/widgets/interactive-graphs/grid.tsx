import {Coordinates} from "mafs";
import * as React from "react";

import AxisArrows from "./axis-arrows";
import {AxisTicks} from "./axis-ticks";

import type {SizeClass} from "../../util/sizing-utils";

/*
gridStep: where the lines on the grid show up
tickStep: where the little black lines should up (just called tick)
snapStep: where the points will lock to when they are dragging
*/
export interface GridProps {
    // todo: this should probably be tickStep
    step: [number, number];
    gridStep: [number, number];
    range: [[number, number], [number, number]];
    containerSizeClass: SizeClass;
    markings: "graph" | "grid" | "none";
}

const renderLineLabel = (n: number, [min, max]: [number, number]) =>
    n !== -1 && n !== min && n !== max;

const axisOptions = (
    props: Omit<GridProps, "containerSizeClass">,
    index: number,
) => ({
    axis: props.markings === "graph",
    lines: props.step[index],
    subdivisions: props.step[index] / props.gridStep[index],
    labels: (n: number) => (renderLineLabel(n, props.range[index]) ? n : ""),
});

export const Grid = (props: GridProps) => {
    return props.markings === "none" ? null : (
        <>
            <Coordinates.Cartesian
                xAxis={axisOptions(props, 0)}
                yAxis={axisOptions(props, 1)}
            />
            <AxisTicks range={props.range} tickStep={props.step} />
            {props.markings === "graph" && <AxisArrows />}
        </>
    );
};
