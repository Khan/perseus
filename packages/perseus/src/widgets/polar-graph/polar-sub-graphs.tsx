import {
    lockedFigureColors,
    lockedFigureFillStyles,
    PolarMath,
} from "@khanacademy/perseus-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Circle, Line, Point} from "mafs";
import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {MovablePoint} from "../interactive-graphs/graphs/components/movable-point";
import {TextLabel} from "../interactive-graphs/graphs/components/text-label";
import {
    dashedStrokeStyle,
    strokeWeights,
} from "../interactive-graphs/locked-figures/utils";
import useGraphConfig from "../interactive-graphs/reducer/use-graph-config";

import {ClosedPolarCurve} from "./components/closed-polar-curve";
import {PoleAngleArc} from "./components/pole-angle-arc";
import {describeNamedPoint, describePolarPoint} from "./polar-describe";

import type {
    Coord,
    LockedFigureFillType,
    LockedFigureStrokeStyle,
    PerseusPolarGraphType,
    PerseusPolarGraphTypeAngle,
    PerseusPolarGraphTypeLimacon,
    PerseusPolarGraphTypePoint,
    PerseusPolarLockedFigure,
    PolarAngleUnit,
    StrokeWeight,
} from "@khanacademy/perseus-core";

type FigureProps = {
    state: PerseusPolarGraphType;
    settings: PolarMath.PolarGridSettings;
    angleUnit: PolarAngleUnit;
    /** Whether an angle shows its measure. */
    showAngles: boolean;
    /** A locked figure's color; the learner's figure uses the graph color. */
    color?: string;
    strokeStyle?: LockedFigureStrokeStyle;
    weight?: StrokeWeight;
    /** A locked point is a solid dot unless the author opens it. */
    filled?: boolean;
    /** A locked closed figure's fill. */
    fillStyle?: LockedFigureFillType;
};

type SubGraphProps<T extends PerseusPolarGraphType> = {
    state: T;
    settings: PolarMath.PolarGridSettings;
    angleUnit: PolarAngleUnit;
    /**
     * Display settings read from the author's options, not the learner's
     * saved state, so an author's later change applies to every learner.
     */
    showAngles: boolean;
    /** Point labels, used in each handle's name. */
    pointLabels: ReadonlyArray<string>;
    onChange: (next: T) => void;
};

// The angle's arc sits this many circle spacings from the pole, and its
// label this many arc radii out.
const ARC_RADIUS_STEPS = 0.75;
const ARC_LABEL_DISTANCE = 1.9;

/**
 * The drawn figure for any sub-type, with no handles. The learner's figure
 * puts handles on top of it; a locked figure is drawn with it alone.
 */
function PolarFigure({
    state,
    settings,
    angleUnit,
    showAngles,
    color,
    strokeStyle,
    weight = "medium",
    filled = true,
    fillStyle = "none",
}: FigureProps) {
    const {interactiveColor} = useGraphConfig();
    const stroke = color ?? interactiveColor;
    const strokeWidth = strokeWeights[weight];
    // Only a closed figure can go without a stroke.
    const lineStyle = strokeStyle === "none" ? "solid" : strokeStyle;
    const coords = state.coords ?? [];
    if (coords.length === 0) {
        return null;
    }
    // Every drawn shape is decoration: the figure's group carries the label.
    const hidden = {"aria-hidden": true} as const;
    const toEdge = (point: Coord) =>
        PolarMath.fromPolar(
            settings.maxRadius,
            PolarMath.toPolar(point).thetaDegrees,
        );

    switch (state.type) {
        case "point":
            // Drawn as interactive graph draws a locked point.
            return (
                <>
                    {coords.map((point, index) => (
                        <Point
                            key={index}
                            x={point[0]}
                            y={point[1]}
                            svgCircleProps={{
                                ...hidden,
                                style: {
                                    fill: filled
                                        ? stroke
                                        : semanticColor.core.background.base
                                              .default,
                                    stroke,
                                    strokeWidth: spacing.xxxxSmall_2,
                                },
                            }}
                        />
                    ))}
                </>
            );
        case "ray":
            return (
                <Line.Segment
                    point1={[0, 0]}
                    point2={toEdge(coords[0])}
                    color={stroke}
                    style={lineStyle}
                    weight={strokeWidth}
                />
            );
        case "angle": {
            if (coords.length < 2) {
                return null;
            }
            const [initialSide, terminalSide] = coords;
            const measure = PolarMath.getAngleMeasureDegrees([
                initialSide,
                terminalSide,
            ]);
            const startDegrees = PolarMath.toPolar(initialSide).thetaDegrees;
            const arcRadius = settings.radiusStep * ARC_RADIUS_STEPS;
            const labelPosition = PolarMath.fromPolar(
                arcRadius * ARC_LABEL_DISTANCE,
                startDegrees + measure / 2,
            );
            return (
                <>
                    {coords.map((side, index) => (
                        <Line.Segment
                            key={`side-${index}`}
                            point1={[0, 0]}
                            point2={toEdge(side)}
                            color={stroke}
                            style={lineStyle}
                            weight={strokeWidth}
                        />
                    ))}
                    <PoleAngleArc
                        radius={arcRadius}
                        startDegrees={startDegrees}
                        measureDegrees={measure}
                        color={color}
                        strokeStyle={lineStyle}
                        weight={color ? strokeWidth : undefined}
                    />
                    {showAngles && measure > 0 && (
                        <g aria-hidden={true}>
                            <TextLabel
                                x={labelPosition[0]}
                                y={labelPosition[1]}
                            >
                                {PolarMath.formatAngleLabel(measure, angleUnit)}
                            </TextLabel>
                        </g>
                    )}
                </>
            );
        }
        case "circle":
            // Filled the way interactive graph fills a locked ellipse.
            return (
                <Circle
                    center={[0, 0]}
                    radius={PolarMath.toPolar(coords[0]).r}
                    color={stroke}
                    fillOpacity={lockedFigureFillStyles[fillStyle]}
                    strokeStyle={lineStyle}
                    weight={strokeWidth}
                    svgEllipseProps={{
                        ...hidden,
                        style: {
                            fill:
                                fillStyle === "white"
                                    ? semanticColor.core.background.base.default
                                    : stroke,
                            ...(strokeStyle === "none" && {stroke: "none"}),
                        },
                    }}
                />
            );
        case "limacon": {
            if (coords.length < 2) {
                return null;
            }
            const params = PolarMath.getLimaconParams([coords[0], coords[1]]);
            return (
                <ClosedPolarCurve
                    xy={(t) => PolarMath.limaconPoint(params, t)}
                    domain={[0, 360]}
                    color={stroke}
                    strokeStyle={strokeStyle}
                    weight={strokeWidth}
                    fillStyle={fillStyle}
                />
            );
        }
        case "rose": {
            const params = PolarMath.getRoseParams(
                [coords[0]],
                state.k ?? PolarMath.DEFAULT_ROSE_K,
            );
            return (
                <ClosedPolarCurve
                    xy={(t) => PolarMath.rosePoint(params, t)}
                    domain={[0, 360]}
                    color={stroke}
                    strokeStyle={strokeStyle}
                    weight={strokeWidth}
                    fillStyle={fillStyle}
                />
            );
        }
        case "lemniscate": {
            const params = PolarMath.getLemniscateParams([coords[0]]);
            // Each lobe closes at the pole, so each is its own path.
            return (
                <>
                    {([0, 1] as const).map((lobe) => (
                        <ClosedPolarCurve
                            key={`lobe-${lobe}`}
                            xy={(t) =>
                                PolarMath.lemniscatePoint(params, t, lobe)
                            }
                            domain={[-45, 45]}
                            color={stroke}
                            strokeStyle={strokeStyle}
                            weight={strokeWidth}
                            fillStyle={fillStyle}
                        />
                    ))}
                </>
            );
        }
        default:
            throw new UnreachableCaseError(state);
    }
}

/**
 * The author's locked figures, drawn in their own colors with no handles.
 * As on interactive graph, each is an image named by the author's label,
 * and hidden from screen readers when there is none.
 */
export function PolarLockedFigures({
    lockedFigures,
    settings,
    angleUnit,
}: {
    lockedFigures: ReadonlyArray<PerseusPolarLockedFigure>;
    settings: PolarMath.PolarGridSettings;
    angleUnit: PolarAngleUnit;
}) {
    return (
        <>
            {lockedFigures.map((locked, index) => {
                // A figure with nothing to draw gets no image either.
                if ((locked.figure.coords ?? []).length === 0) {
                    return null;
                }
                return (
                    <g
                        key={index}
                        role="img"
                        aria-label={locked.ariaLabel || undefined}
                        aria-hidden={!locked.ariaLabel}
                        // Scales the dash pattern to the weight.
                        style={dashedStrokeStyle(
                            locked.strokeStyle === "dashed",
                            locked.weight,
                        )}
                        data-testid="polar-graph__locked-figure"
                    >
                        <PolarFigure
                            state={locked.figure}
                            settings={settings}
                            angleUnit={angleUnit}
                            showAngles={
                                locked.figure.type === "angle" &&
                                (locked.figure.showAngles ?? false)
                            }
                            color={lockedFigureColors[locked.color]}
                            strokeStyle={locked.strokeStyle}
                            weight={locked.weight}
                            filled={locked.filled}
                            fillStyle={locked.fillStyle}
                        />
                    </g>
                );
            })}
        </>
    );
}

/**
 * The one movable handle shared by the ray, circle, rose, lemniscate and
 * the angle's sides: it snaps to the grid but never lands on the pole,
 * where the figure would lose its direction or size.
 */
function SingleHandle({
    point,
    name,
    settings,
    angleUnit,
    onMove,
}: {
    point: Coord;
    name: string;
    settings: PolarMath.PolarGridSettings;
    angleUnit: PolarAngleUnit;
    onMove: (next: Coord) => void;
}) {
    const i18n = usePerseusI18n();
    return (
        <MovablePoint
            point={point}
            ariaLabel={describeNamedPoint(name, point, angleUnit, i18n)}
            constrain={PolarMath.getPolarKeyboardConstraint(
                point,
                settings,
                settings.radiusStep,
            )}
            onMove={(destination) =>
                onMove(
                    PolarMath.snapToPolarGridOffPole(
                        destination,
                        point,
                        settings,
                    ),
                )
            }
        />
    );
}

function PolarPointGraph({
    state,
    settings,
    angleUnit,
    pointLabels,
    onChange,
}: SubGraphProps<PerseusPolarGraphTypePoint>) {
    const i18n = usePerseusI18n();
    const coords = state.coords ?? [];
    return (
        <>
            {coords.map((point, index) => (
                <MovablePoint
                    key={index}
                    point={point}
                    ariaLabel={describePolarPoint(
                        index,
                        point,
                        angleUnit,
                        i18n,
                        pointLabels[index],
                    )}
                    constrain={PolarMath.getPolarKeyboardConstraint(
                        point,
                        settings,
                    )}
                    onMove={(destination) => {
                        const next = [...coords];
                        next[index] = PolarMath.snapToPolarGridCoord(
                            destination,
                            settings,
                        );
                        onChange({...state, coords: next});
                    }}
                />
            ))}
        </>
    );
}

function PolarLimaconGraph({
    state,
    settings,
    angleUnit,
    showAngles,
    onChange,
}: SubGraphProps<PerseusPolarGraphTypeLimacon>) {
    const i18n = usePerseusI18n();
    const coords = state.coords;
    if (!coords) {
        return null;
    }
    const [farTip, nearPoint] = coords;
    const setCoords = (next: [Coord, Coord]) =>
        onChange({...state, coords: next});
    return (
        <>
            <PolarFigure
                state={state}
                settings={settings}
                angleUnit={angleUnit}
                showAngles={showAngles}
            />
            <SingleHandle
                point={farTip}
                name={i18n.strings.srPolarFarTip}
                settings={settings}
                angleUnit={angleUnit}
                onMove={(nextTip) =>
                    setCoords(
                        PolarMath.moveLimaconTip(
                            nextTip,
                            nearPoint,
                            farTip,
                            settings,
                        ),
                    )
                }
            />
            <MovablePoint
                point={nearPoint}
                ariaLabel={describeNamedPoint(
                    i18n.strings.srPolarNearPoint,
                    nearPoint,
                    angleUnit,
                    i18n,
                )}
                constrain={PolarMath.getLimaconNearKeyboardConstraint(
                    nearPoint,
                    farTip,
                    settings,
                )}
                onMove={(destination) => {
                    const distance = PolarMath.snapLimaconNearDistance(
                        destination,
                        farTip,
                        settings,
                    );
                    setCoords([
                        farTip,
                        PolarMath.limaconNearPoint(farTip, distance),
                    ]);
                }}
            />
        </>
    );
}

function PolarAngleGraph({
    state,
    settings,
    angleUnit,
    showAngles,
    onChange,
}: SubGraphProps<PerseusPolarGraphTypeAngle>) {
    const i18n = usePerseusI18n();
    const coords = state.coords;
    if (!coords) {
        return null;
    }
    const sideNames = [
        i18n.strings.srPolarInitialSide,
        i18n.strings.srPolarTerminalSide,
    ];
    return (
        <>
            <PolarFigure
                state={state}
                settings={settings}
                angleUnit={angleUnit}
                showAngles={showAngles}
            />
            {coords.map((side, index) => (
                <SingleHandle
                    key={`handle-${index}`}
                    point={side}
                    name={sideNames[index]}
                    settings={settings}
                    angleUnit={angleUnit}
                    onMove={(next) => {
                        const sides: [Coord, Coord] = [...coords];
                        sides[index] = next;
                        onChange({...state, coords: sides});
                    }}
                />
            ))}
        </>
    );
}

/**
 * The ray, circle, rose and lemniscate all work the same way: one drawn
 * figure and one handle that sets it.
 */
function PolarSingleHandleGraph<
    T extends PerseusPolarGraphType & {coords?: Coord[]},
>({
    state,
    settings,
    angleUnit,
    showAngles,
    onChange,
    name,
}: SubGraphProps<T> & {name: string}) {
    const handle = state.coords?.[0];
    if (!handle) {
        return null;
    }
    return (
        <>
            <PolarFigure
                state={state}
                settings={settings}
                angleUnit={angleUnit}
                showAngles={showAngles}
            />
            <SingleHandle
                point={handle}
                name={name}
                settings={settings}
                angleUnit={angleUnit}
                onMove={(next) => onChange({...state, coords: [next]})}
            />
        </>
    );
}

export function PolarSubGraph(props: SubGraphProps<PerseusPolarGraphType>) {
    const {state} = props;
    const {strings} = usePerseusI18n();
    switch (state.type) {
        case "point":
            return <PolarPointGraph {...props} state={state} />;
        case "ray":
            return (
                <PolarSingleHandleGraph
                    {...props}
                    state={state}
                    name={strings.srPolarRayPoint}
                />
            );
        case "angle":
            return <PolarAngleGraph {...props} state={state} />;
        case "circle":
            return (
                <PolarSingleHandleGraph
                    {...props}
                    state={state}
                    name={strings.srPolarCirclePoint}
                />
            );
        case "limacon":
            return <PolarLimaconGraph {...props} state={state} />;
        case "rose":
            return (
                <PolarSingleHandleGraph
                    {...props}
                    state={state}
                    name={strings.srPolarPetalTip}
                />
            );
        case "lemniscate":
            return (
                <PolarSingleHandleGraph
                    {...props}
                    state={state}
                    name={strings.srPolarLemniscateTip}
                />
            );
        default:
            throw new UnreachableCaseError(state);
    }
}
