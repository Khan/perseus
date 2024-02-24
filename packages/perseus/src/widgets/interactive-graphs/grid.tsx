import {Coordinates} from "mafs";
import * as React from "react";

import type {PerseusImageBackground} from "../../perseus-types";
import type {SizeClass} from "../../util/sizing-utils";

const renderLineLabel = (n: number, [min, max]: [number, number]) =>
    n !== -1 && n !== min && n !== max;

export const Grid = (props: {
    step: number[];
    gridStep: number[];
    range: [[number, number], [number, number]];
    backgroundImage?: PerseusImageBackground;
    containerSizeClass: SizeClass;
}) => (
    <Coordinates.Cartesian
        xAxis={{
            lines: props.step[0],
            subdivisions: props.step[0] / props.gridStep[0],
            labels: (n) => (renderLineLabel(n, props.range[0]) ? n : ""),
        }}
        yAxis={{
            lines: props.step[1],
            subdivisions: props.step[1] / props.gridStep[1],
            labels: (n) => (renderLineLabel(n, props.range[1]) ? n : ""),
        }}
    />
);
