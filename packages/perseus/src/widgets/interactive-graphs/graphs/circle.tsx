import {vec} from "mafs";
import * as React from "react";
import {useRef} from "react";

import {snap, X, Y} from "../math";
import {actions} from "../reducer/interactive-graph-action";
import {getRadius} from "../reducer/interactive-graph-state";
import useGraphConfig from "../reducer/use-graph-config";

import {MovablePoint} from "./components/movable-point";
import {useDraggable} from "./use-draggable";
import {
    useTransformDimensionsToPixels,
    useTransformVectorsToPixels,
} from "./use-transform";

import type {
    CircleGraphState,
    Dispatch,
    InteractiveGraphElementSuite,
    MafsGraphProps,
} from "../types";

export function renderCircleGraph(
    state: CircleGraphState,
    dispatch: Dispatch,
): InteractiveGraphElementSuite {
    return {
        graph: <CircleGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: null,
    };
}

type CircleGraphProps = MafsGraphProps<CircleGraphState>;

function CircleGraph(props: CircleGraphProps) {
    const {dispatch, graphState} = props;
    const {center, radiusPoint} = graphState;

    const [edgePointAriaLive, setEdgePointAriaLive] = React.useState<
        "off" | "polite"
    >("off");

    const radius = getRadius(graphState);
    const id = React.useId();
    const circleId = id + "-circle";
    const diameterId = id + "-diameter";
    const outerPointsId = id + "-outer-points";

    // Move this string to string.ts file
    const wholeGraphAriaLabel = "A circle on a coordinate plane.";
    const circleAriaLabel = `Circle. The center point is at ${center[0]} comma
        ${center[1]}.`;
    const edgePointAriaLabel = `Edge point at ${radiusPoint[0]} comma
        ${radiusPoint[1]}.`;
    const diameterAriaLabel = `Circle diameter is ${radius * 2}.`;
    const outerPoints = `Points on the circle at
        ${center[0] + radius} comma ${center[1]},
        ${center[0]} comma ${center[1] + radius},
        ${center[0] - radius} comma ${center[1]},
        ${center[0]} comma ${center[1] - radius}.`;

    return (
        <g
            aria-label={wholeGraphAriaLabel}
            aria-describedby={`${circleId} ${diameterId} ${outerPointsId}`}
        >
            <MovableCircle
                id={circleId}
                ariaLabel={circleAriaLabel}
                ariaDescribedBy={`${diameterId} ${outerPointsId}`}
                center={center}
                radius={radius}
                onMove={(c) => {
                    setEdgePointAriaLive("off");
                    dispatch(actions.circle.moveCenter(c));
                }}
            />
            <MovablePoint
                ariaLabel={`${edgePointAriaLabel} ${diameterAriaLabel}`}
                ariaDescribedBy={`${outerPointsId}`}
                ariaLive={edgePointAriaLive}
                point={radiusPoint}
                sequenceNumber={1}
                cursor="ew-resize"
                onMove={(newRadiusPoint) => {
                    setEdgePointAriaLive("polite");
                    dispatch(actions.circle.moveRadiusPoint(newRadiusPoint));
                }}
            />
            <g id={diameterId} style={{display: "hidden"}}>
                {diameterAriaLabel}
            </g>
            <g id={outerPointsId} style={{display: "hidden"}}>
                {outerPoints}
            </g>
        </g>
    );
}

function MovableCircle(props: {
    id?: string;
    ariaLabel?: string;
    ariaDescribedBy?: string;
    center: vec.Vector2;
    radius: number;
    onMove: (newCenter: vec.Vector2) => unknown;
}) {
    const {id, ariaLabel, ariaDescribedBy, center, radius, onMove} = props;
    const {snapStep, disableKeyboardInteraction} = useGraphConfig();

    const draggableRef = useRef<SVGGElement>(null);

    const {dragging} = useDraggable({
        gestureTarget: draggableRef,
        point: center,
        onMove,
        constrainKeyboardMovement: (p) => snap(snapStep, p),
    });

    const [centerPx] = useTransformVectorsToPixels(center);
    const [radiiPx] = useTransformDimensionsToPixels([radius, radius]);

    return (
        <g
            ref={draggableRef}
            tabIndex={disableKeyboardInteraction ? -1 : 0}
            className={`movable-circle ${dragging ? "movable-circle--dragging" : ""}`}
        >
            <ellipse
                className="focus-ring"
                cx={centerPx[X]}
                cy={centerPx[Y]}
                rx={radiiPx[X] + 3}
                ry={radiiPx[Y] + 3}
            />
            <ellipse
                id={id}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedBy}
                aria-live="assertive"
                className="circle"
                cx={centerPx[X]}
                cy={centerPx[Y]}
                rx={radiiPx[X]}
                ry={radiiPx[Y]}
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
                x={topLeft[X]}
                y={topLeft[Y]}
                width={dragHandleDimensions[X]}
                height={dragHandleDimensions[Y]}
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
