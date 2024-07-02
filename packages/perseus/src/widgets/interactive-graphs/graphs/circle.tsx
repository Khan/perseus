import {vec} from "mafs";
import * as React from "react";
import {useRef} from "react";

import {moveCenter, moveRadiusPoint} from "../reducer/interactive-graph-action";
import {getRadius} from "../reducer/interactive-graph-state";
import useGraphConfig from "../reducer/use-graph-config";
import {snap} from "../utils";

import {StyledMovablePoint} from "./components/movable-point";
import {useDraggable} from "./use-draggable";
import {
    useTransformDimensionsToPixels,
    useTransformVectorsToPixels,
} from "./use-transform";

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
                cursor="ew-resize"
                onMove={(newRadiusPoint) => {
                    dispatch(moveRadiusPoint(newRadiusPoint));
                }}
            />
        </>
    );
}

function MovableCircle(props: {
    center: vec.Vector2;
    radius: number;
    onMove: (newCenter: vec.Vector2) => unknown;
}) {
    const {center, radius, onMove} = props;
    const {snapStep} = useGraphConfig();

    const draggableRef = useRef<SVGGElement>(null);

    const {dragging} = useDraggable({
        gestureTarget: draggableRef,
        point: center,
        onMove,
        constrain: (p) => snap(snapStep, p),
    });

    const [centerPx] = useTransformVectorsToPixels(center);
    const [radiiPx] = useTransformDimensionsToPixels([radius, radius]);

    return (
        <g
            ref={draggableRef}
            tabIndex={0}
            className={`movable-circle ${dragging ? "movable-circle--dragging" : ""}`}
        >
            <ellipse
                className="focus-ring"
                cx={centerPx[0]}
                cy={centerPx[1]}
                rx={radiiPx[0] + 3}
                ry={radiiPx[1] + 3}
            />
            <ellipse
                className="circle"
                cx={centerPx[0]}
                cy={centerPx[1]}
                rx={radiiPx[0]}
                ry={radiiPx[1]}
            />
            <DragHandle center={center} />
        </g>
    );
}

const dragHandleDimensions: vec.Vector2 = [24, 14];
const dragHandleDotPositions = crossProduct([-4.4, 0, 4.4], [-2.1, 2.1]);
function DragHandle(props: {center: [x: number, y: number]}) {
    const {center} = props;
    const cornerRadius = Math.min(...dragHandleDimensions) / 2;
    const [centerPx] = useTransformVectorsToPixels(center);
    const topLeft = vec.sub(centerPx, vec.scale(dragHandleDimensions, 0.5));

    return (
        <>
            <rect
                className="movable-circle-handle"
                x={topLeft[0]}
                y={topLeft[1]}
                width={dragHandleDimensions[0]}
                height={dragHandleDimensions[1]}
                rx={cornerRadius}
                ry={cornerRadius}
            />
            {dragHandleDotPositions.map((offsetPx) => {
                const [xPx, yPx] = vec.add(offsetPx, centerPx);
                return (
                    <circle
                        key={`circle-${xPx}-${yPx}`}
                        className="movable-circle-handle-dot"
                        cx={xPx}
                        cy={yPx}
                    />
                );
            })}
        </>
    );
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
