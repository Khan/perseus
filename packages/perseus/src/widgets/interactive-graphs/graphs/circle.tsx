import {vec} from "mafs";
import * as React from "react";
import {useRef} from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {snap, X, Y} from "../math";
import {actions} from "../reducer/interactive-graph-action";
import {getRadius} from "../reducer/interactive-graph-state";
import useGraphConfig from "../reducer/use-graph-config";

import {MovablePoint} from "./components/movable-point";
import {srFormatNumber} from "./screenreader-text";
import {useDraggable} from "./use-draggable";
import {
    useTransformDimensionsToPixels,
    useTransformVectorsToPixels,
} from "./use-transform";

import type {I18nContextType} from "../../../components/i18n-context";
import type {
    AriaLive,
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
        interactiveElementsDescription: CircleGraphDescription({state}),
    };
}

type CircleGraphProps = MafsGraphProps<CircleGraphState>;

function CircleGraph(props: CircleGraphProps) {
    const {dispatch, graphState} = props;
    const {center, radiusPoint} = graphState;

    const {strings, locale} = usePerseusI18n();
    const [radiusPointAriaLive, setRadiusPointAriaLive] =
        React.useState<AriaLive>("off");

    const radius = getRadius(graphState);
    const id = React.useId();
    const circleId = id + "-circle";
    const radiusId = id + "-radius";
    const outerPointsId = id + "-outer-points";

    // Aria label strings
    const {
        srCircleGraph,
        srCircleShape,
        srCircleRadiusPoint,
        srCircleRadius,
        srCircleOuterPoints,
    } = describeCircleGraph(graphState, {strings, locale});

    return (
        <g
            // Outer circle minimal description
            aria-label={srCircleGraph}
            aria-describedby={`${circleId} ${radiusId} ${outerPointsId}`}
        >
            <MovableCircle
                id={circleId}
                // Focusable circle aria label reads with every update
                // because of the aria-live property in the circle <g>.
                ariaLabel={srCircleShape}
                // Aria-describedby describes additional info on focus.
                ariaDescribedBy={`${radiusId} ${outerPointsId}`}
                center={center}
                radius={radius}
                onMove={(c) => {
                    setRadiusPointAriaLive("off");
                    dispatch(actions.circle.moveCenter(c));
                }}
            />
            <MovablePoint
                // Radius point aria label reads with every update.
                ariaLabel={`${srCircleRadiusPoint} ${srCircleRadius}`}
                // Aria-describedby describes additional info on focus.
                ariaDescribedBy={`${outerPointsId}`}
                // The radius point's aria-live property is set to "off" when
                // the circle is moved, so that it doesn't override the circle's
                // aria-live (since the point is moved along with the circle).
                // When the radius point is moved, the aria-live is set to
                // "polite" so that the radius is read out.
                ariaLive={radiusPointAriaLive}
                point={radiusPoint}
                sequenceNumber={1}
                cursor="ew-resize"
                onMove={(newRadiusPoint) => {
                    setRadiusPointAriaLive("polite");
                    dispatch(actions.circle.moveRadiusPoint(newRadiusPoint));
                }}
            />
            {/* Hidden elements to provide the descriptions for the
                circle and radius point's `aria-describedby` properties. */}
            <g id={radiusId} style={{display: "hidden"}}>
                {srCircleRadius}
            </g>
            <g id={outerPointsId} style={{display: "hidden"}}>
                {srCircleOuterPoints}
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

function CircleGraphDescription({state}: {state: CircleGraphState}) {
    // The reason that CircleGraphDescription is a component (rather than a
    // function that returns a string) is because it needs to use a
    // hook: `usePerseusI18n`.
    const i18n = usePerseusI18n();
    const strings = describeCircleGraph(state, i18n);

    return strings.srCircleInteractiveElement;
}

// Exported for testing
export function describeCircleGraph(
    state: CircleGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {strings, locale} = i18n;
    const {center, radiusPoint} = state;
    const radius = getRadius(state);

    // Aria label strings
    const srCircleGraph = strings.srCircleGraph;
    const srCircleShape = strings.srCircleShape({
        centerX: srFormatNumber(center[0], locale),
        centerY: srFormatNumber(center[1], locale),
    });
    const srCircleRadiusPoint = strings.srCircleRadiusPoint({
        radiusPointX: srFormatNumber(radiusPoint[0], locale),
        radiusPointY: srFormatNumber(radiusPoint[1], locale),
    });
    const srCircleRadius = strings.srCircleRadius({
        radius,
    });
    const srCircleOuterPoints = strings.srCircleOuterPoints({
        point1X: srFormatNumber(center[0] + radius, locale),
        point1Y: srFormatNumber(center[1], locale),
        point2X: srFormatNumber(center[0], locale),
        point2Y: srFormatNumber(center[1] + radius, locale),
        point3X: srFormatNumber(center[0] - radius, locale),
        point3Y: srFormatNumber(center[1], locale),
        point4X: srFormatNumber(center[0], locale),
        point4Y: srFormatNumber(center[1] - radius, locale),
    });

    const srCircleInteractiveElement = strings.srInteractiveElements({
        elements: [srCircleShape, srCircleRadius].join(" "),
    });

    return {
        srCircleGraph,
        srCircleShape,
        srCircleRadiusPoint,
        srCircleRadius,
        srCircleOuterPoints,
        srCircleInteractiveElement,
    };
}
