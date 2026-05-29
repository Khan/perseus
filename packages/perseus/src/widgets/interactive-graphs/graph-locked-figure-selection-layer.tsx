import {lockedFigureColors} from "@khanacademy/perseus-core";
import * as React from "react";

import {useTransformVectorsToPixels} from "./graphs/use-transform";
import {X, Y} from "./math";
import {TARGET_SIZE} from "./utils";

import type {
    LockedFigure,
    LockedLineType,
    LockedPointType,
} from "@khanacademy/perseus-core";

/**
 * Which channel is asking for an indicator to be drawn. This is *only* a
 * styling token handed to the dumb indicator primitives below — they render
 * the matching appearance without knowing why they're being drawn. The
 * channel semantics (which figure, precedence, when to show) live entirely in
 * `resolveIndicators` and the callers, not in the primitives.
 *
 * - `selection`: the user has selected this figure (widget → host output).
 * - `spotlight`: the host is calling this figure out (host → widget input).
 */
type IndicatorVariant = "selection" | "spotlight";

type IndicatorTarget = {figureIndex: number; variant: IndicatorVariant};

type IndicatorLayerProps = {
    lockedFigures: ReadonlyArray<LockedFigure>;
    selectedFigureIndex: number | null;
    spotlightedFigureIndex?: number | null;
};

type HitTargetLayerProps = {
    lockedFigures: ReadonlyArray<LockedFigure>;
    onToggle: (figureIndex: number) => void;
};

/**
 * Resolve the two channel inputs into the indicators to draw.
 *
 * Cardinality: at most one indicator per channel, so the result holds zero,
 * one, or two targets.
 *
 * Precedence: when the same figure is both selected and spotlighted, selection
 * wins and the spotlight is suppressed — we never stack two indicators on a
 * single figure. (Two different figures can each show their own indicator.)
 */
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

/**
 * Draws the selection and/or spotlight indicators. This layer owns the channel
 * semantics; it picks figures via `resolveIndicators` and dispatches on figure
 * *shape* (point vs. segment) to the appropriate indicator primitive, handing
 * each one the variant for styling.
 */
export function GraphLockedFigureIndicatorLayer(props: IndicatorLayerProps) {
    const {lockedFigures, selectedFigureIndex, spotlightedFigureIndex} = props;

    return (
        <>
            {resolveIndicators(selectedFigureIndex, spotlightedFigureIndex).map(
                ({figureIndex, variant}) => {
                    const figure = lockedFigures[figureIndex];

                    // The index may be stale (figure removed) or name a figure
                    // shape the indicator can't draw yet. Drawability is gated on
                    // *shape*, not on whether the figure is user-selectable: the
                    // host may spotlight any figure.
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
                    return null;
                },
            )}
        </>
    );
}

export function GraphLockedFigureHitTargetLayer(props: HitTargetLayerProps) {
    const {lockedFigures, onToggle} = props;

    // Hit-priority order (§6): line segments are rendered first so points
    // (rendered last) paint on top and win clicks at a shared vertex.
    return (
        <g aria-hidden={true}>
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

function LockedPointIndicator(props: {
    figure: LockedPointType;
    variant: IndicatorVariant;
}) {
    const [[x, y]] = useTransformVectorsToPixels(props.figure.coord);

    return (
        <g aria-hidden={true} style={{pointerEvents: "none"}}>
            <circle
                className={`locked-point-indicator locked-point-indicator--${props.variant}`}
                cx={x}
                cy={y}
                r={TARGET_SIZE / 3}
                style={{fill: lockedFigureColors[props.figure.color]}}
            />
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

    return (
        <g aria-hidden={true} style={{pointerEvents: "none"}}>
            <line
                className={`locked-line-indicator locked-line-indicator--${props.variant}`}
                x1={start[X]}
                y1={start[Y]}
                x2={end[X]}
                y2={end[Y]}
                style={{stroke: lockedFigureColors[color]}}
            />
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
