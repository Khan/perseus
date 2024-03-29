import {Coordinates} from "mafs";
import * as React from "react";

import GridArrows from "./grid-arrows";

import type {SizeClass} from "../../util/sizing-utils";

interface GridProps {
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

export const Grid = (props: GridProps) =>
    props.markings === "none" ? null : (
        <>
            <Coordinates.Cartesian
                xAxis={axisOptions(props, 0)}
                yAxis={axisOptions(props, 1)}
            />
            <GridArrows />
        </>
    );
