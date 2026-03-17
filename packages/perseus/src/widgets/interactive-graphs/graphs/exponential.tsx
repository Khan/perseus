import {
    coefficients as kmathCoefficients,
    type ExponentialCoefficient,
} from "@khanacademy/kmath";
import {Plot, vec} from "mafs";
import * as React from "react";

import {
    usePerseusI18n,
    type I18nContextType,
} from "../../../components/i18n-context";
import {snap, X, Y} from "../math";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {MovablePoint} from "./components/movable-point";
import SRDescInSVG from "./components/sr-description-within-svg";
import {SVGLine} from "./components/svg-line";
import {srFormatNumber} from "./screenreader-text";
import {useDraggable} from "./use-draggable";
import {useTransformVectorsToPixels} from "./use-transform";

import type {
    ExponentialGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {Coord} from "@khanacademy/perseus-core";

const {getExponentialCoefficients} = kmathCoefficients;


export function renderExponentialGraph(
    state: ExponentialGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <ExponentialGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getExponentialDescription(state, i18n),
    };
}

type ExponentialGraphProps = MafsGraphProps<ExponentialGraphState>;

function ExponentialGraph(props: ExponentialGraphProps) {
    const {dispatch, graphState} = props;
    const {interactiveColor, range} = useGraphConfig();
    const i18n = usePerseusI18n();
    const id = React.useId();
    const descriptionId = id + "-description";

    const {coords, asymptote, snapStep} = graphState;

    // Cache last valid coefficients so the graph doesn't break during
    // transient invalid states (e.g. mid-drag where points share an x-value).
    const coeffRef = React.useRef<ExponentialCoefficient>({
        a: 1,
        b: 1,
        c: 0,
    });
    const coeffs = getExponentialCoefficients(coords, asymptote);
    if (coeffs !== undefined) {
        coeffRef.current = coeffs;
    }

    const asymptoteY = asymptote[0][Y];
    const yMin = range[1][0];
    const yMax = range[1][1];
    const yPadding = (yMax - yMin) * 2;

    // Aria strings
    const {
        srExponentialGraph,
        srExponentialDescription,
        srExponentialPoint1,
        srExponentialPoint2,
        srExponentialAsymptote,
    } = describeExponentialGraph(graphState, i18n);

    // The asymptote is a full-width horizontal line.
    const asymptoteLeft: vec.Vector2 = [range[0][0], asymptoteY];
    const asymptoteRight: vec.Vector2 = [range[0][1], asymptoteY];
    const asymptoteMidX = (range[0][0] + range[0][1]) / 2;
    const asymptoteMid: vec.Vector2 = [asymptoteMidX, asymptoteY];

    const [leftPx, rightPx, midPx] = useTransformVectorsToPixels(
        asymptoteLeft,
        asymptoteRight,
        asymptoteMid,
    );

    const [asymptoteFocused, setAsymptoteFocused] = React.useState(false);
    const [asymptoteHovered, setAsymptoteHovered] = React.useState(false);

    const asymptoteRef = React.useRef<SVGGElement | null>(null);
    const {dragging: asymptoteDragging} = useDraggable({
        gestureTarget: asymptoteRef,
        point: asymptoteLeft,
        onMove: (newPoint) => {
            dispatch(actions.exponential.moveCenter([newPoint[X], newPoint[Y]]));
        },
        constrainKeyboardMovement: (p) =>
            constrainAsymptoteKeyboard(p, coords, snapStep),
    });

    return (
        <g aria-label={srExponentialGraph} aria-describedby={descriptionId}>
            {/* Draggable horizontal asymptote line */}
            <g
                ref={asymptoteRef}
                tabIndex={0}
                aria-label={srExponentialAsymptote}
                aria-live="polite"
                className="movable-line"
                style={{cursor: asymptoteDragging ? "grabbing" : "grab"}}
                role="button"
                onFocus={() => setAsymptoteFocused(true)}
                onBlur={() => setAsymptoteFocused(false)}
                onMouseEnter={() => setAsymptoteHovered(true)}
                onMouseLeave={() => setAsymptoteHovered(false)}
            >
                {/* Transparent tall hit target */}
                <SVGLine
                    start={leftPx}
                    end={rightPx}
                    style={{stroke: "transparent", strokeWidth: 44}}
                />
                {/* Visible solid line */}
                <SVGLine
                    start={leftPx}
                    end={rightPx}
                    style={{
                        stroke: interactiveColor,
                        strokeWidth: "var(--movable-line-stroke-weight)",
                    }}
                    className={asymptoteDragging ? "movable-dragging" : ""}
                />
                {/* Drag handle at the midpoint of the asymptote */}
                {/* TODO(LEMS-3945): Extract into a shared AsymptoteDragHandle
                    component supporting both orientations once the logarithm
                    branch (LEMS-3950) merges. */}
                <AsymptoteDragHandle
                    x={midPx[X]}
                    y={midPx[Y]}
                    active={
                        asymptoteDragging ||
                        asymptoteFocused ||
                        asymptoteHovered
                    }
                    focused={asymptoteFocused}
                />
            </g>
            <Plot.OfX
                y={(x) => {
                    const y = computeExponential(x, coeffRef.current);
                    if (y < yMin - yPadding || y > yMax + yPadding) {
                        return NaN;
                    }
                    return y;
                }}
                color={interactiveColor}
                svgPathProps={{
                    "aria-hidden": true,
                }}
            />
            {coords.map((coord, i) => (
                <MovablePoint
                    ariaLabel={
                        i === 0 ? srExponentialPoint1 : srExponentialPoint2
                    }
                    key={"point-" + i}
                    point={coord}
                    sequenceNumber={i + 1}
                    constrain={getExponentialKeyboardConstraint(
                        coords,
                        asymptote,
                        snapStep,
                        i,
                    )}
                    onMove={(destination) =>
                        dispatch(
                            actions.exponential.movePoint(i, destination),
                        )
                    }
                />
            ))}
            <SRDescInSVG id={descriptionId}>
                {srExponentialDescription}
            </SRDescInSVG>
        </g>
    );
}

// Horizontal drag handle — wide pill with horizontal dot grid.
// TODO(LEMS-3945): Merge with the vertical AsymptoteDragHandle from the
// logarithm implementation (LEMS-3950) into a single shared component.
const ACTIVE_W = 22;
const ACTIVE_H = 12;
const INACTIVE_W = 16;
const INACTIVE_H = 6;
const RING_PAD = 2;
const HALO_PAD = 3;
const FOCUS_RING_PAD = 2;
const FOCUS_RING_STROKE = 2;

function AsymptoteDragHandle(props: {
    x: number;
    y: number;
    active: boolean;
    focused: boolean;
}) {
    const {x, y, active, focused} = props;
    const {interactiveColor} = useGraphConfig();

    const centerW = active ? ACTIVE_W : INACTIVE_W;
    const centerH = active ? ACTIVE_H : INACTIVE_H;
    const haloW = centerW + (RING_PAD + HALO_PAD) * 2;
    const haloH = centerH + (RING_PAD + HALO_PAD) * 2;
    const ringW = centerW + RING_PAD * 2;
    const ringH = centerH + RING_PAD * 2;

    const focusRingW = haloW + FOCUS_RING_PAD * 2;
    const focusRingH = haloH + FOCUS_RING_PAD * 2;

    return (
        <g aria-hidden={true} style={{pointerEvents: "none"}}>
            {focused && (
                <rect
                    x={x - focusRingW / 2}
                    y={y - focusRingH / 2}
                    width={focusRingW}
                    height={focusRingH}
                    rx={focusRingH / 2}
                    ry={focusRingH / 2}
                    fill="none"
                    stroke={interactiveColor}
                    strokeWidth={FOCUS_RING_STROKE}
                />
            )}
            {/* Halo */}
            <rect
                x={x - haloW / 2}
                y={y - haloH / 2}
                width={haloW}
                height={haloH}
                rx={haloH / 2}
                ry={haloH / 2}
                fill={interactiveColor}
                opacity={0.25}
                style={{filter: "drop-shadow(0 5px 5px #0008)"}}
            />
            {/* Ring — white background */}
            <rect
                x={x - ringW / 2}
                y={y - ringH / 2}
                width={ringW}
                height={ringH}
                rx={ringH / 2}
                ry={ringH / 2}
                fill="#fff"
            />
            {/* Center — filled with interactive color */}
            <rect
                x={x - centerW / 2}
                y={y - centerH / 2}
                width={centerW}
                height={centerH}
                rx={centerH / 2}
                ry={centerH / 2}
                fill={interactiveColor}
            />
            {/* Horizontal grip dots: 3 columns × 2 rows */}
            {active &&
                [-2, 2].map((dy) =>
                    [-3, 0, 3].map((dx) => (
                        <circle
                            key={`${dx},${dy}`}
                            cx={x + dx}
                            cy={y + dy}
                            r={1}
                            fill="#fff"
                        />
                    )),
                )}
        </g>
    );
}

// Keyboard constraint for the asymptote. When the next snapped position
// would land between or on the curve points, snap past all of them in the
// direction of travel. Mirrors logarithm's constrainAsymptoteKeyboard with
// Y-axis instead of X.
const constrainAsymptoteKeyboard = (
    p: vec.Vector2,
    coords: ReadonlyArray<Coord>,
    snapStep: vec.Vector2,
): vec.Vector2 => {
    const snapped = snap(snapStep, p);
    let newY = snapped[Y];
    const stepY = snapStep[Y];

    const topMost = Math.max(coords[0][Y], coords[1][Y]);
    const bottomMost = Math.min(coords[0][Y], coords[1][Y]);

    const allAbove = coords[0][Y] > newY && coords[1][Y] > newY;
    const allBelow = coords[0][Y] < newY && coords[1][Y] < newY;

    if (!allAbove && !allBelow) {
        const midpoint = (topMost + bottomMost) / 2;
        if (newY >= midpoint) {
            newY = topMost + stepY;
        } else {
            newY = bottomMost - stepY;
        }
    }

    // Can't land exactly on a point — skip one more step
    if (newY === coords[0][Y] || newY === coords[1][Y]) {
        if (newY >= (topMost + bottomMost) / 2) {
            newY += stepY;
        } else {
            newY -= stepY;
        }
    }

    return [snapped[X], newY];
};

const getExponentialKeyboardConstraint = (
    coords: ReadonlyArray<Coord>,
    asymptote: ReadonlyArray<Coord>,
    snapStep: vec.Vector2,
    pointIndex: number,
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} => {
    const coordToBeMoved = coords[pointIndex];
    const otherPoint = coords[1 - pointIndex];
    const asymptoteY = asymptote[0][Y];

    const isValidPosition = (coord: vec.Vector2): boolean => {
        if (coord[Y] === asymptoteY) return false;
        if (coord[X] === otherPoint[X]) return false;
        // Crossing the asymptote is allowed — the reducer reflects
        // the other point so both end up on the same side.
        return true;
    };

    const movePointWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        let movedCoord = moveFunc(coordToBeMoved);
        for (let i = 0; i < 3 && !isValidPosition(movedCoord); i++) {
            movedCoord = moveFunc(movedCoord);
        }
        if (!isValidPosition(movedCoord)) {
            return coordToBeMoved;
        }
        return movedCoord;
    };

    return {
        up: movePointWithConstraint((coord) =>
            vec.add(coord, [0, snapStep[Y]]),
        ),
        down: movePointWithConstraint((coord) =>
            vec.sub(coord, [0, snapStep[Y]]),
        ),
        left: movePointWithConstraint((coord) =>
            vec.sub(coord, [snapStep[X], 0]),
        ),
        right: movePointWithConstraint((coord) =>
            vec.add(coord, [snapStep[X], 0]),
        ),
    };
};

// Plot an exponential of the form: f(x) = a * e^(b * x) + c
const computeExponential = function (
    x: number,
    coefficients: ExponentialCoefficient,
) {
    const {a, b, c} = coefficients;
    return a * Math.exp(b * x) + c;
};



function getExponentialDescription(
    state: ExponentialGraphState,
    i18n: I18nContextType,
): string {
    const strings = describeExponentialGraph(state, i18n);
    return strings.srExponentialInteractiveElements;
}

function describeExponentialGraph(
    state: ExponentialGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {strings, locale} = i18n;
    const {coords, asymptote} = state;
    const [point1, point2] = coords;

    const formattedPoint1 = {
        x: srFormatNumber(point1[X], locale),
        y: srFormatNumber(point1[Y], locale),
    };
    const formattedPoint2 = {
        x: srFormatNumber(point2[X], locale),
        y: srFormatNumber(point2[Y], locale),
    };
    const asymptoteYFormatted = srFormatNumber(asymptote[0][Y], locale);

    return {
        srExponentialGraph: strings.srExponentialGraph,
        srExponentialDescription: strings.srExponentialDescription({
            point1X: formattedPoint1.x,
            point1Y: formattedPoint1.y,
            point2X: formattedPoint2.x,
            point2Y: formattedPoint2.y,
            asymptoteY: asymptoteYFormatted,
        }),
        srExponentialAsymptote: strings.srExponentialAsymptote({
            asymptoteY: asymptoteYFormatted,
        }),
        srExponentialPoint1: strings.srExponentialPoint1(formattedPoint1),
        srExponentialPoint2: strings.srExponentialPoint2(formattedPoint2),
        srExponentialInteractiveElements: strings.srInteractiveElements({
            elements: strings.srExponentialInteractiveElements({
                point1X: srFormatNumber(point1[X], locale),
                point1Y: srFormatNumber(point1[Y], locale),
                point2X: srFormatNumber(point2[X], locale),
                point2Y: srFormatNumber(point2[Y], locale),
                asymptoteY: asymptoteYFormatted,
            }),
        }),
    };
}
