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
import {useTransformVectorsToPixels} from "./use-transform";

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
            <DragHandle center={center}/>
        </g>
    )
}

const dragHandleDimensions: vec.Vector2 = [24, 14];
const dragHandlePointPositions = crossProduct([-4.4, 0, 4.4], [-2.1, 2.1])
function DragHandle(props: { center: [x: number, y: number] }) {
    const {center} = props;
    const cornerRadius = Math.min(...dragHandleDimensions) / 2;
    const [centerPx] = useTransformVectorsToPixels(center);
    const topLeft = vec.sub(centerPx, vec.scale(dragHandleDimensions, 0.5));

    // FIXME make fill color a WB color
    return <>
        <rect x={topLeft[0]} y={topLeft[1]} width={dragHandleDimensions[0]} height={dragHandleDimensions[1]} rx={cornerRadius} ry={cornerRadius} fill="#777" stroke="#fff" strokeWidth={2}/>
        {dragHandlePointPositions.map((offsetPx) => {
            const [xPx, yPx] = vec.add(offsetPx, centerPx)
            return <circle cx={xPx} cy={yPx} r={1.25} fill="#fff" />
        })}
    </>;
}

function crossProduct<A, B>(as: A[], bs: B[]): [A, B][] {
    const result: [A, B][] = [];
    for (const a of as) {
        for (const b of bs) {
            result.push([a, b]);
        }
    }
    return result;
}
