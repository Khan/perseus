import {color} from "@khanacademy/wonder-blocks-tokens";
import {Circle, useMovable, vec} from "mafs";
import * as React from "react";

import {moveCenter, moveRadiusPoint} from "../reducer/interactive-graph-action";
import {getRadius} from "../reducer/interactive-graph-state";

import {StyledMovablePoint} from "./components/movable-point";

import type {CircleGraphState, MafsGraphProps} from "../types";
import {useRef} from "react";
import {snap} from "../utils";
import useGraphConfig from "../reducer/use-graph-config";

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
    const {snapStep} = useGraphConfig();

    const draggableRef = useRef<SVGGElement>(null);

    const {dragging} = useMovable({
        gestureTarget: draggableRef,
        point: center,
        onMove,
        constrain: (p) => snap(snapStep, p),
    })

    return (
        <g ref={draggableRef} className={`movable-circle ${dragging ? "movable-circle--dragging" : ""}`}>
            <Circle
                center={center}
                radius={radius}
                fillOpacity={0}
                color={color.blue}
            />
        </g>
    )
}
