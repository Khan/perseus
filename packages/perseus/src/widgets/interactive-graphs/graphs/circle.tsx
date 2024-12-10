import {vec} from "mafs";
import * as React from "react";
import {useRef} from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
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

    const {strings} = usePerseusI18n();
    const [radiusPointAriaLive, setRadiusPointAriaLive] = React.useState<
        "off" | "polite"
    >("off");

    const radius = getRadius(graphState);
    const id = React.useId();
    const circleId = id + "-circle";
    const radiusId = id + "-radius";
    const outerPointsId = id + "-outer-points";

    // Aria label strings
    const circleGraphAriaLabel = strings.circleGraphAriaLabel;
    const circleShapeAriaLabel = strings.circleShapeAriaLabel({
        centerX: center[0],
        centerY: center[1],
    });
    const circleRadiusPointAriaLabel = strings.circleRadiusPointAriaLabel({
        radiusPointX: radiusPoint[0],
        radiusPointY: radiusPoint[1],
    });
    const circleRadiusDescription = strings.circleRadiusDescription({
        radius,
    });
    const circleOuterPointsDescription = strings.circleOuterPointsDescription({
        point1X: center[0] + radius,
        point1Y: center[1],
        point2X: center[0],
        point2Y: center[1] + radius,
        point3X: center[0] - radius,
        point3Y: center[1],
        point4X: center[0],
        point4Y: center[1] - radius,
    });

    return (
        <g
            aria-label={circleGraphAriaLabel}
            aria-describedby={`${circleId} ${radiusId} ${outerPointsId}`}
        >
            <MovableCircle
                id={circleId}
                ariaLabel={circleShapeAriaLabel}
                ariaDescribedBy={`${radiusId} ${outerPointsId}`}
                center={center}
                radius={radius}
                onMove={(c) => {
                    setRadiusPointAriaLive("off");
                    dispatch(actions.circle.moveCenter(c));
                }}
            />
            <MovablePoint
                ariaLabel={`${circleRadiusPointAriaLabel} ${circleRadiusDescription}`}
                ariaDescribedBy={`${outerPointsId}`}
                ariaLive={radiusPointAriaLive}
                point={radiusPoint}
                sequenceNumber={1}
                cursor="ew-resize"
                onMove={(newRadiusPoint) => {
                    setRadiusPointAriaLive("polite");
                    dispatch(actions.circle.moveRadiusPoint(newRadiusPoint));
                }}
            />
            <g id={radiusId} style={{display: "hidden"}}>
                {circleRadiusDescription}
            </g>
            <g id={outerPointsId} style={{display: "hidden"}}>
                {circleOuterPointsDescription}
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
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-live="polite"
            ref={draggableRef}
            role="button"
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
