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
    LogarithmGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {Coord} from "@khanacademy/perseus-core";

export type NamedLogarithmCoefficient = {
    a: number;
    b: number;
    c: number;
};

export function renderLogarithmGraph(
    state: LogarithmGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <LogarithmGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getLogarithmDescription(state, i18n),
    };
}

type LogarithmGraphProps = MafsGraphProps<LogarithmGraphState>;

function LogarithmGraph(props: LogarithmGraphProps) {
    const {dispatch, graphState} = props;
    const {interactiveColor, range} = useGraphConfig();
    const i18n = usePerseusI18n();
    const id = React.useId();
    const descriptionId = id + "-description";

    const {coords, asymptote, snapStep} = graphState;

    // The coefficients are used to calculate the logarithm equation,
    // plot the graph, and to indicate the currently selected "correct answer".
    // We keep a ref as fallback so the graph doesn't break during transient
    // invalid states (e.g., mid-drag).
    const coeffRef = React.useRef<NamedLogarithmCoefficient>({
        a: 1,
        b: 1,
        c: 0,
    });
    const coeffs = getLogarithmCoefficients(coords, asymptote);

    if (coeffs !== undefined) {
        coeffRef.current = coeffs;
    }

    // Determine the domain: logarithm is defined where b*x + c > 0
    // The asymptote x-position is at x = -c/b
    const asymptoteX = asymptote[0][X];
    const xRange: [number, number] = [range[0][0], range[0][1]];

    // Determine which side of the asymptote the points are on.
    // We use a very small domainOffset so that Mafs samples points
    // extremely close to the asymptote. The curve shoots toward
    // +/- infinity near the asymptote but never touches it.
    const domainOffset = 0.001;
    const pointsRightOfAsymptote = coords[0][X] > asymptoteX;
    const domain: [number, number] = pointsRightOfAsymptote
        ? [asymptoteX + domainOffset, xRange[1]]
        : [xRange[0], asymptoteX - domainOffset];

    // Extend the y-range so the curve renders well past the visible
    // graph area. This prevents the curve from appearing "cut off"
    // near the asymptote — it continues off-screen instead of ending
    // abruptly at the domain boundary.
    const yMin = range[1][0];
    const yMax = range[1][1];
    const yPadding = (yMax - yMin) * 2;

    // Aria strings
    const {
        srLogarithmGraph,
        srLogarithmDescription,
        srLogarithmPoint1,
        srLogarithmPoint2,
        srLogarithmAsymptote,
    } = describeLogarithmGraph(graphState, i18n);

    // Asymptote line endpoints (vertical line spanning the full y-range)
    const asymptoteTop: vec.Vector2 = [asymptoteX, range[1][1]];
    const asymptoteBottom: vec.Vector2 = [asymptoteX, range[1][0]];

    // Midpoint of the asymptote for the drag handle position
    const asymptoteMidY = (range[1][0] + range[1][1]) / 2;
    const asymptoteMid: vec.Vector2 = [asymptoteX, asymptoteMidY];

    // Transform asymptote endpoints + midpoint to pixel coordinates
    const [topPx, bottomPx, midPx] = useTransformVectorsToPixels(
        asymptoteTop,
        asymptoteBottom,
        asymptoteMid,
    );

    // Track focus and hover state for the drag handle appearance
    const [asymptoteFocused, setAsymptoteFocused] = React.useState(false);
    const [asymptoteHovered, setAsymptoteHovered] = React.useState(false);

    // Make the entire asymptote line draggable (horizontal only)
    const asymptoteRef = React.useRef<SVGGElement | null>(null);
    const {dragging: asymptoteDragging} = useDraggable({
        gestureTarget: asymptoteRef,
        point: asymptoteBottom,
        onMove: (newPoint) => {
            dispatch(actions.logarithm.moveCenter([newPoint[X], newPoint[Y]]));
        },
        constrainKeyboardMovement: (p) =>
            constrainAsymptoteKeyboard(p, coords, snapStep),
    });

    return (
        <g aria-label={srLogarithmGraph} aria-describedby={descriptionId}>
            {/* Draggable vertical asymptote line */}
            <g
                ref={asymptoteRef}
                tabIndex={0}
                aria-label={srLogarithmAsymptote}
                aria-live="polite"
                className="movable-line"
                style={{cursor: asymptoteDragging ? "grabbing" : "grab"}}
                role="button"
                onFocus={() => setAsymptoteFocused(true)}
                onBlur={() => setAsymptoteFocused(false)}
                onMouseEnter={() => setAsymptoteHovered(true)}
                onMouseLeave={() => setAsymptoteHovered(false)}
            >
                {/* Transparent wide hit target */}
                <SVGLine
                    start={topPx}
                    end={bottomPx}
                    style={{stroke: "transparent", strokeWidth: 44}}
                />
                {/* Visible solid line */}
                <SVGLine
                    start={topPx}
                    end={bottomPx}
                    style={{
                        stroke: interactiveColor,
                        strokeWidth: "var(--movable-line-stroke-weight)",
                    }}
                    className={asymptoteDragging ? "movable-dragging" : ""}
                />
                {/* Drag handle at the midpoint of the asymptote */}
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
                    const y = computeLogarithm(x, coeffRef.current);
                    // Return NaN when the value exceeds the visible
                    // range (with some padding). This stops the SVG
                    // path before it reaches the asymptote, preventing
                    // the curve's stroke from visually touching the
                    // asymptote's stroke. The curve exits the visible
                    // area and the path simply ends off-screen.
                    if (y < yMin - yPadding || y > yMax + yPadding) {
                        return NaN;
                    }
                    return y;
                }}
                domain={domain}
                color={interactiveColor}
                svgPathProps={{
                    "aria-hidden": true,
                }}
            />
            {coords.map((coord, i) => (
                <MovablePoint
                    ariaLabel={i === 0 ? srLogarithmPoint1 : srLogarithmPoint2}
                    key={"point-" + i}
                    point={coord}
                    sequenceNumber={i + 1}
                    constrain={getLogarithmKeyboardConstraint(
                        coords,
                        asymptote,
                        snapStep,
                        i,
                    )}
                    onMove={(destination) =>
                        dispatch(actions.logarithm.movePoint(i, destination))
                    }
                />
            ))}
            <SRDescInSVG id={descriptionId}>
                {srLogarithmDescription}
            </SRDescInSVG>
        </g>
    );
}

// Active (hovered/focused/dragging): full pill with dots
const ACTIVE_W = 12;
const ACTIVE_H = 22;
// Inactive: thinner pill without dots
const INACTIVE_W = 6;
const INACTIVE_H = 16;
const RING_PAD = 2;
const HALO_PAD = 3;
// Focus ring around the drag handle (keyboard navigation indicator)
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

    // Focus ring sits outside the halo
    const focusRingW = haloW + FOCUS_RING_PAD * 2;
    const focusRingH = haloH + FOCUS_RING_PAD * 2;

    return (
        <g aria-hidden={true} style={{pointerEvents: "none"}}>
            {/* Focus ring — visible only on keyboard focus */}
            {focused && (
                <rect
                    x={x - focusRingW / 2}
                    y={y - focusRingH / 2}
                    width={focusRingW}
                    height={focusRingH}
                    rx={focusRingW / 2}
                    ry={focusRingW / 2}
                    fill="none"
                    stroke={interactiveColor}
                    strokeWidth={FOCUS_RING_STROKE}
                />
            )}
            {/* Halo — matches movable-point-halo styling */}
            <rect
                x={x - haloW / 2}
                y={y - haloH / 2}
                width={haloW}
                height={haloH}
                rx={haloW / 2}
                ry={haloW / 2}
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
                rx={ringW / 2}
                ry={ringW / 2}
                fill="#fff"
            />
            {/* Center — filled with interactive color */}
            <rect
                x={x - centerW / 2}
                y={y - centerH / 2}
                width={centerW}
                height={centerH}
                rx={centerW / 2}
                ry={centerW / 2}
                fill={interactiveColor}
            />
            {/* Grip dots: only shown when active */}
            {active &&
                [-3, 0, 3].map((dy) =>
                    [-2, 2].map((dx) => (
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

const getLogarithmKeyboardConstraint = (
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
    const asymptoteX = asymptote[0][X];
    const otherPointSide = otherPoint[X] > asymptoteX;

    const isValidPosition = (coord: vec.Vector2): boolean => {
        // Can't be on the asymptote
        if (coord[X] === asymptoteX) {
            return false;
        }
        // Can't have same y as other point
        if (coord[Y] === otherPoint[Y]) {
            return false;
        }
        // Must be on the same side of the asymptote as the other point
        if (coord[X] > asymptoteX !== otherPointSide) {
            return false;
        }
        return true;
    };

    const movePointWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        let movedCoord = moveFunc(coordToBeMoved);
        // Try up to 3 steps to find a valid position (handles cases
        // where the first move lands on the asymptote and the second
        // lands on the other point's y-value).
        for (let i = 0; i < 3 && !isValidPosition(movedCoord); i++) {
            movedCoord = moveFunc(movedCoord);
        }
        // If still invalid after 3 attempts, stay in place
        if (!isValidPosition(movedCoord)) {
            return coordToBeMoved;
        }
        return movedCoord;
    };

    return {
        up: movePointWithConstraint((coord) =>
            vec.add(coord, [0, snapStep[1]]),
        ),
        down: movePointWithConstraint((coord) =>
            vec.sub(coord, [0, snapStep[1]]),
        ),
        left: movePointWithConstraint((coord) =>
            vec.sub(coord, [snapStep[0], 0]),
        ),
        right: movePointWithConstraint((coord) =>
            vec.add(coord, [snapStep[0], 0]),
        ),
    };
};

// Keyboard constraint for the asymptote. When the next snapped position
// would land between or on the curve points, snap past all points in the
// movement direction. This mirrors the reducer's snap-through logic but
// uses explicit direction (keyboard always moves one step at a time).
const constrainAsymptoteKeyboard = (
    p: vec.Vector2,
    coords: ReadonlyArray<Coord>,
    snapStep: vec.Vector2,
): vec.Vector2 => {
    const snapped = snap(snapStep, p);
    let newX = snapped[X];
    const stepX = snapStep[X];

    const leftMost = Math.min(coords[0][X], coords[1][X]);
    const rightMost = Math.max(coords[0][X], coords[1][X]);

    // If the position is valid (all points on one side), allow it
    const allRight = coords[0][X] > newX && coords[1][X] > newX;
    const allLeft = coords[0][X] < newX && coords[1][X] < newX;

    if (!allRight && !allLeft) {
        // The position is between or on the points. Determine the
        // keyboard direction from the current asymptote position:
        // p is already the destination after one arrow key step.
        // We compare against the midpoint to infer direction.
        const midpoint = (leftMost + rightMost) / 2;
        if (newX >= midpoint) {
            newX = rightMost + stepX;
        } else {
            newX = leftMost - stepX;
        }
    }

    // Can't land exactly on a point — skip one more step
    if (newX === coords[0][X] || newX === coords[1][X]) {
        if (newX >= (leftMost + rightMost) / 2) {
            newX += stepX;
        } else {
            newX -= stepX;
        }
    }

    return [newX, snapped[Y]];
};

// Plot a logarithm of the form: f(x) = a * ln(b * x + c)
// Returns NaN where the argument is non-positive (undefined domain).
const computeLogarithm = function (
    x: number,
    coefficients: NamedLogarithmCoefficient,
) {
    const {a, b, c} = coefficients;
    const arg = b * x + c;
    if (arg <= 0) {
        return NaN;
    }
    return a * Math.log(arg);
};

// Compute logarithm coefficients from two points and an asymptote.
// Uses inverse exponential approach (same as Grapher widget).
// Formula: y = a * ln(b * x + c)
export const getLogarithmCoefficients = (
    coords: ReadonlyArray<Coord>,
    asymptote: ReadonlyArray<Coord>,
): NamedLogarithmCoefficient | undefined => {
    const p1 = coords[0];
    const p2 = coords[1];
    const asymptoteX = asymptote[0][X];

    // Points must have different y-values
    if (p1[Y] === p2[Y]) {
        return;
    }

    // Points must not be on the asymptote
    if (p1[X] === asymptoteX || p2[X] === asymptoteX) {
        return;
    }

    // Use the inverse exponential approach from the Grapher widget.
    // The logarithm y = a * ln(b * x + c) is the inverse of
    // x = (1/b) * (e^(y/a) - c/b), which is an exponential in y.
    //
    // We flip coords (x,y) -> (y,x) and asymptote similarly,
    // compute exponential coefficients, then invert.
    const flip = (coord: Coord): Coord => [coord[1], coord[0]];
    const flippedCoords = [flip(p1), flip(p2)];
    const flippedAsymptoteY = asymptoteX; // The vertical asymptote x becomes horizontal y

    // Exponential coefficients for the flipped curve:
    // y_flipped = a_exp * e^(b_exp * x_flipped) + c_exp
    const cExp = flippedAsymptoteY;
    const denom = flippedCoords[0][0] - flippedCoords[1][0];
    if (denom === 0) {
        return;
    }
    const bExp =
        Math.log((flippedCoords[0][1] - cExp) / (flippedCoords[1][1] - cExp)) /
        denom;
    const aExp =
        (flippedCoords[0][1] - cExp) / Math.exp(bExp * flippedCoords[0][0]);

    if (!isFinite(aExp) || !isFinite(bExp) || aExp === 0) {
        return;
    }

    // Invert exponential coefficients to get logarithm coefficients
    const c = -cExp / aExp;
    const b = 1 / aExp;
    const a = 1 / bExp;

    if (!isFinite(a) || !isFinite(b) || !isFinite(c)) {
        return;
    }

    return {a, b, c};
};

function getLogarithmDescription(
    state: LogarithmGraphState,
    i18n: I18nContextType,
): string {
    const strings = describeLogarithmGraph(state, i18n);
    return strings.srLogarithmInteractiveElements;
}

function describeLogarithmGraph(
    state: LogarithmGraphState,
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

    const srLogarithmGraph = strings.srLogarithmGraph;
    const srLogarithmDescription = strings.srLogarithmDescription({
        point1X: formattedPoint1.x,
        point1Y: formattedPoint1.y,
        point2X: formattedPoint2.x,
        point2Y: formattedPoint2.y,
        asymptoteX: srFormatNumber(asymptote[0][X], locale),
    });
    const srLogarithmAsymptote = strings.srLogarithmAsymptote({
        asymptoteX: srFormatNumber(asymptote[0][X], locale),
    });
    const srLogarithmPoint1 = strings.srLogarithmPoint1(formattedPoint1);
    const srLogarithmPoint2 = strings.srLogarithmPoint2(formattedPoint2);
    const srLogarithmInteractiveElements = strings.srInteractiveElements({
        elements: strings.srLogarithmInteractiveElements({
            point1X: srFormatNumber(point1[X], locale),
            point1Y: srFormatNumber(point1[Y], locale),
            point2X: srFormatNumber(point2[X], locale),
            point2Y: srFormatNumber(point2[Y], locale),
            asymptoteX: srFormatNumber(asymptote[0][X], locale),
        }),
    });

    return {
        srLogarithmGraph,
        srLogarithmDescription,
        srLogarithmAsymptote,
        srLogarithmPoint1,
        srLogarithmPoint2,
        srLogarithmInteractiveElements,
    };
}
