import {Coordinates, useTransformContext, vec} from "mafs";
import * as React from "react";

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

type ArrowProps = {
    x: number;
    y: number;
    rotate: number;
};

const Arrow = (props: ArrowProps) => {
    const {userTransform, viewTransform} = useTransformContext();

    const point: vec.Vector2 = [props.x, props.y];
    const userTransformedPoint = vec.transform(point, userTransform);
    const viewTransformedPoint = vec.transform(
        userTransformedPoint,
        viewTransform,
    );

    return (
        <g
            transform={`translate(${viewTransformedPoint[0]} ${viewTransformedPoint[1]}) rotate(${props.rotate}) scale(1.25)`}
        >
            <g transform="translate(-1)">
                <path
                    d="M-3 4 C-2.75 2.5 0 0.25 0.75 0C0 -0.25 -2.75 -2.5 -3 -4"
                    fill="none"
                />
            </g>
        </g>
    );
};

export const Grid = (props: GridProps) =>
    props.markings === "none" ? null : (
        <>
            <Coordinates.Cartesian
                xAxis={axisOptions(props, 0)}
                yAxis={axisOptions(props, 1)}
            />
            <Arrow x={10} y={0} rotate={0} />
            <Arrow x={0} y={-10} rotate={90} />
            <Arrow x={-10} y={0} rotate={180} />
            <Arrow x={0} y={10} rotate={270} />
        </>
    );
