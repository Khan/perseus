import {color} from "@khanacademy/wonder-blocks-tokens";
import {Circle, vec} from "mafs";
import * as React from "react";

import {moveCenter, moveRadiusPoint} from "../reducer/interactive-graph-action";
import {getRadius} from "../reducer/interactive-graph-state";

import {StyledMovablePoint} from "./components/movable-point";

import type {CircleGraphState, MafsGraphProps} from "../types";

type CircleGraphProps = MafsGraphProps<CircleGraphState>;

export function CircleGraph(props: CircleGraphProps) {
    const {dispatch, graphState} = props;
    const {center, radiusPoint} = graphState;

    return (
        <>
            <MovableCircle
                center={center}
                radius={getRadius(graphState)}
                onMove={(newCenter) => dispatch(moveCenter(newCenter))}
            />
            <StyledMovablePoint
                point={radiusPoint}
                onMove={(newRadiusPoint) => {
                    dispatch(moveRadiusPoint(newRadiusPoint));
                }}
            />
        </>
    );
}

function MovableCircle(props: {center: vec.Vector2, radius: number, onMove: (newCenter: vec.Vector2) => unknown}) {
    const {center, radius, onMove} = props;
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
                onMove={onMove}
            />
        </>
    )
}
