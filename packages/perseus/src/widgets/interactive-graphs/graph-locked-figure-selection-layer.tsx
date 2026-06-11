import {lockedFigureColors} from "@khanacademy/perseus-core";
import * as React from "react";

import {useTransformVectorsToPixels} from "./graphs/use-transform";
import {X, Y} from "./math";
import {TARGET_SIZE} from "./utils";

import type {
    Coord,
    LockedFigure,
    LockedLineType,
    LockedPointType,
    LockedPolygonType,
} from "@khanacademy/perseus-core";

// Styling token for an indicator: user selection vs. host spotlight.
type IndicatorVariant = "selection" | "spotlight";

type IndicatorTarget = {figureIndex: number; variant: IndicatorVariant};

type IndicatorLayerProps = {
    lockedFigures: ReadonlyArray<LockedFigure>;
    selectedFigureIndex: number | null;
    spotlightedFigureIndex?: number | null;
};

type HitTargetLayerProps = {
    enabled: boolean;
    lockedFigures: ReadonlyArray<LockedFigure>;
    onToggle: (figureIndex: number) => void;
};

// At most one indicator per channel; selection wins when a figure is both.
export function resolveIndicators(
    selectedFigureIndex: number | null,
    spotlightedFigureIndex: number | null | undefined,
): ReadonlyArray<IndicatorTarget> {
    const targets: IndicatorTarget[] = [];

    if (selectedFigureIndex != null) {
        targets.push({figureIndex: selectedFigureIndex, variant: "selection"});
    }

    if (
        spotlightedFigureIndex != null &&
        spotlightedFigureIndex !== selectedFigureIndex
    ) {
        targets.push({
            figureIndex: spotlightedFigureIndex,
            variant: "spotlight",
        });
    }

    return targets;
}

// Draws the selection and/or spotlight indicators, dispatching on figure shape.
export function GraphLockedFigureIndicatorLayer(props: IndicatorLayerProps) {
    const {lockedFigures, selectedFigureIndex, spotlightedFigureIndex} = props;

    return (
        <>
            {resolveIndicators(selectedFigureIndex, spotlightedFigureIndex).map(
                ({figureIndex, variant}) => {
                    const figure = lockedFigures[figureIndex];

                    // May be stale, or a shape with no indicator.
                    if (figure == null) {
                        return null;
                    }
                    if (figure.type === "point") {
                        return (
                            <LockedPointIndicator
                                key={`locked-figure-indicator-${figureIndex}`}
                                figure={figure}
                                variant={variant}
                            />
                        );
                    }
                    if (figure.type === "line" && figure.kind === "segment") {
                        return (
                            <LockedLineSegmentIndicator
                                key={`locked-figure-indicator-${figureIndex}`}
                                figure={figure}
                                variant={variant}
                            />
                        );
                    }
                    if (figure.type === "polygon") {
                        return (
                            <LockedPolygonIndicator
                                key={`locked-figure-indicator-${figureIndex}`}
                                figure={figure}
                                variant={variant}
                            />
                        );
                    }
                    return null;
                },
            )}
        </>
    );
}

// Whether a figure gets a selection hit target.
function isSelectableHitTarget(figure: LockedFigure): boolean {
    switch (figure.type) {
        case "point":
        case "polygon":
            return Boolean(figure.selectable);
        case "line":
            return figure.kind === "segment" && Boolean(figure.selectable);
        default:
            return false;
    }
}

export function GraphLockedFigureHitTargetLayer(props: HitTargetLayerProps) {
    const {enabled, lockedFigures, onToggle} = props;

    // Nothing to hit: render no DOM.
    if (!enabled || !lockedFigures.some(isSelectableHitTarget)) {
        return null;
    }

    // Paint polygons, then segments, then points, so smaller targets win
    // clicks at a shared spot.
    return (
        <g aria-hidden={true}>
            {lockedFigures.map((figure, index) => {
                if (figure.type !== "polygon" || !figure.selectable) {
                    return null;
                }

                return (
                    <LockedPolygonHitTarget
                        key={`locked-polygon-hit-target-${index}`}
                        figure={figure}
                        figureIndex={index}
                        onToggle={onToggle}
                    />
                );
            })}
            {lockedFigures.map((figure, index) => {
                if (
                    figure.type !== "line" ||
                    figure.kind !== "segment" ||
                    !figure.selectable
                ) {
                    return null;
                }

                return (
                    <LockedLineSegmentHitTarget
                        key={`locked-line-hit-target-${index}`}
                        figure={figure}
                        figureIndex={index}
                        onToggle={onToggle}
                    />
                );
            })}
            {lockedFigures.map((figure, index) => {
                if (figure.type !== "point" || !figure.selectable) {
                    return null;
                }

                return (
                    <LockedPointHitTarget
                        key={`locked-point-hit-target-${index}`}
                        figure={figure}
                        figureIndex={index}
                        onToggle={onToggle}
                    />
                );
            })}
        </g>
    );
}

// Phosphor "pencil-bold" glyph (viewBox 0 0 256 256); writing tip at ~(28, 228).
const PENCIL_PATH =
    "M230.14,70.54,185.46,25.85a20,20,0,0,0-28.29,0L33.86,149.17A19.85,19.85,0,0,0,28,163.31V208a20,20,0,0,0,20,20H92.69a19.86,19.86,0,0,0,14.14-5.86L230.14,98.82a20,20,0,0,0,0-28.28ZM93,180l71-71,11,11-71,71ZM76,163,65,152l71-71,11,11ZM52,173l15.51,15.51h0L83,204H52ZM192,103,153,64l18.34-18.34,39,39Z";
const PENCIL_TIP_X = 28;
const PENCIL_TIP_Y = 228;
const PENCIL_SCALE = 0.12; // 256 * 0.12 ≈ 31px tall
const PENCIL_GAP = 8; // px gap between tip and target
// Khanmigo brand color, backed by a Wonder Blocks token.
const PENCIL_COLOR = lockedFigureColors.blurple;

// The Khanmigo pencil, tip pointing just off (x, y) in pixel space.
function SpotlightPencil(props: {x: number; y: number}) {
    return (
        <g
            transform={`translate(${props.x + PENCIL_GAP}, ${props.y - PENCIL_GAP}) scale(${PENCIL_SCALE}) translate(${-PENCIL_TIP_X}, ${-PENCIL_TIP_Y})`}
            style={{fill: PENCIL_COLOR}}
        >
            <path d={PENCIL_PATH} />
        </g>
    );
}

function LockedPointIndicator(props: {
    figure: LockedPointType;
    variant: IndicatorVariant;
}) {
    const [[x, y]] = useTransformVectorsToPixels(props.figure.coord);
    const isSpotlight = props.variant === "spotlight";
    // Spotlight uses the fixed brand color; selection uses the figure's color.
    const markColor = isSpotlight
        ? PENCIL_COLOR
        : lockedFigureColors[props.figure.color];

    return (
        <g aria-hidden={true} style={{pointerEvents: "none"}}>
            <circle
                className={`locked-point-indicator locked-point-indicator--${props.variant}`}
                cx={x}
                cy={y}
                r={TARGET_SIZE / 3}
                style={{fill: markColor}}
            />
            {isSpotlight && <SpotlightPencil x={x} y={y} />}
        </g>
    );
}

function LockedLineSegmentIndicator(props: {
    figure: LockedLineType;
    variant: IndicatorVariant;
}) {
    const {points, color} = props.figure;
    const [start, end] = useTransformVectorsToPixels(
        points[0].coord,
        points[1].coord,
    );
    const isSpotlight = props.variant === "spotlight";
    const markColor = isSpotlight ? PENCIL_COLOR : lockedFigureColors[color];
    // Point the pencil at the segment's midpoint.
    const midX = (start[X] + end[X]) / 2;
    const midY = (start[Y] + end[Y]) / 2;

    return (
        <g aria-hidden={true} style={{pointerEvents: "none"}}>
            <line
                className={`locked-line-indicator locked-line-indicator--${props.variant}`}
                x1={start[X]}
                y1={start[Y]}
                x2={end[X]}
                y2={end[Y]}
                style={{stroke: markColor}}
            />
            {isSpotlight && <SpotlightPencil x={midX} y={midY} />}
        </g>
    );
}

// Edges of a closed polygon (last wraps to first).
function polygonEdges(
    points: ReadonlyArray<Coord>,
): ReadonlyArray<[Coord, Coord]> {
    return points.map((start, index) => [
        start,
        points[(index + 1) % points.length],
    ]);
}

// Topmost vertex, rightmost on ties.
function pencilAnchorVertex(points: ReadonlyArray<Coord>): Coord {
    return points.reduce((best, point) => {
        if (point[Y] < best[Y]) {
            return point;
        }
        if (point[Y] === best[Y] && point[X] > best[X]) {
            return point;
        }
        return best;
    });
}

function LockedPolygonIndicator(props: {
    figure: LockedPolygonType;
    variant: IndicatorVariant;
}) {
    const {points, color} = props.figure;
    const pixelPoints = useTransformVectorsToPixels(...points);
    const isSpotlight = props.variant === "spotlight";
    const markColor = isSpotlight ? PENCIL_COLOR : lockedFigureColors[color];
    const anchor = pencilAnchorVertex(pixelPoints);

    return (
        <g aria-hidden={true} style={{pointerEvents: "none"}}>
            {polygonEdges(pixelPoints).map(([start, end], index) => (
                // One <line> per side.
                <line
                    key={`locked-polygon-indicator-side-${index}`}
                    className={`locked-line-indicator locked-line-indicator--${props.variant}`}
                    x1={start[X]}
                    y1={start[Y]}
                    x2={end[X]}
                    y2={end[Y]}
                    style={{stroke: markColor}}
                />
            ))}
            {isSpotlight && <SpotlightPencil x={anchor[X]} y={anchor[Y]} />}
        </g>
    );
}

function LockedPointHitTarget(props: {
    figure: LockedPointType;
    figureIndex: number;
    onToggle: (figureIndex: number) => void;
}) {
    const [[x, y]] = useTransformVectorsToPixels(props.figure.coord);

    return (
        <circle
            aria-hidden={true}
            className="locked-point-hit-target"
            cx={x}
            cy={y}
            r={TARGET_SIZE / 2}
            onClick={(event) => {
                event.stopPropagation();
                props.onToggle(props.figureIndex);
            }}
            style={{
                cursor: "pointer",
                fill: "transparent",
                pointerEvents: "all",
            }}
        />
    );
}

function LockedLineSegmentHitTarget(props: {
    figure: LockedLineType;
    figureIndex: number;
    onToggle: (figureIndex: number) => void;
}) {
    const {points} = props.figure;
    const [start, end] = useTransformVectorsToPixels(
        points[0].coord,
        points[1].coord,
    );

    return (
        <line
            aria-hidden={true}
            className="locked-line-hit-target"
            x1={start[X]}
            y1={start[Y]}
            x2={end[X]}
            y2={end[Y]}
            onClick={(event) => {
                event.stopPropagation();
                props.onToggle(props.figureIndex);
            }}
            style={{
                cursor: "pointer",
                stroke: "transparent",
                strokeWidth: TARGET_SIZE,
                strokeLinecap: "round",
                pointerEvents: "all",
            }}
        />
    );
}

function LockedPolygonHitTarget(props: {
    figure: LockedPolygonType;
    figureIndex: number;
    onToggle: (figureIndex: number) => void;
}) {
    const {points} = props.figure;
    const pixelPoints = useTransformVectorsToPixels(...points);

    // The whole interior is the hit target.
    const pointsAttr = pixelPoints
        .map((point) => `${point[X]},${point[Y]}`)
        .join(" ");

    return (
        <polygon
            aria-hidden={true}
            className="locked-polygon-hit-target"
            points={pointsAttr}
            onClick={(event) => {
                event.stopPropagation();
                props.onToggle(props.figureIndex);
            }}
            style={{
                cursor: "pointer",
                fill: "transparent",
                pointerEvents: "all",
            }}
        />
    );
}
