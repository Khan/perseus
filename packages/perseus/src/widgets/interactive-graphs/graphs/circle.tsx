import {color} from "@khanacademy/wonder-blocks-tokens";
import {Circle} from "mafs";
import * as React from "react";

import {moveCenter, moveRadiusPoint} from "../reducer/interactive-graph-action";

import {StyledMovablePoint} from "./components/movable-point";

import type {CircleGraphState, MafsGraphProps} from "../types";

type CircleGraphProps = MafsGraphProps<CircleGraphState>;

export function CircleGraph(props: CircleGraphProps) {
    const {dispatch, graphState} = props;
    const {center, radiusPoint} = graphState;

    const [centerX, centerY] = center;
    const [radiusX, radiusY] = radiusPoint;
    const radius = Math.sqrt(
        Math.pow(radiusX - centerX, 2) + Math.pow(radiusY - centerY, 2),
    );

    return (
        <>
            <Circle
                center={center}
                radius={radius}
                fillOpacity={0}
                color={color.blue}
            />
            <StyledMovablePoint
                point={center}
                onMove={(newCenter) => {
                    dispatch(moveCenter(newCenter));
                }}
            />
            <StyledMovablePoint
                point={radiusPoint}
                onMove={(newCenter) => {
                    dispatch(moveRadiusPoint(newCenter));
                }}
            />
        </>
    );
}
