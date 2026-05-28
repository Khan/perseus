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

type SelectionLayerProps = {
    lockedFigures: ReadonlyArray<LockedFigure>;
    selectedFigureIndex: number | null;
};

type HitTargetLayerProps = {
    lockedFigures: ReadonlyArray<LockedFigure>;
    onToggle: (figureIndex: number) => void;
};

export function GraphLockedFigureSelectionLayer(props: SelectionLayerProps) {
    const {lockedFigures, selectedFigureIndex} = props;

    if (selectedFigureIndex == null) {
        return null;
    }

    const selectedFigure = lockedFigures[selectedFigureIndex];

    if (selectedFigure == null || !isSelectableFigure(selectedFigure)) {
        return null;
    }

    if (selectedFigure.type === "point") {
        return <LockedPointSelectionHalo figure={selectedFigure} />;
    }
    return <LockedLineSegmentSelectionHalo figure={selectedFigure} />;
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

function isSelectableFigure(
    figure: LockedFigure,
): figure is LockedPointType | LockedLineType {
    if (figure.type === "point") {
        return !!figure.selectable;
    }
    if (figure.type === "line") {
        return figure.kind === "segment" && !!figure.selectable;
    }
    return false;
}

function LockedPointSelectionHalo(props: {figure: LockedPointType}) {
    const [[x, y]] = useTransformVectorsToPixels(props.figure.coord);

    return (
        <g aria-hidden={true} style={{pointerEvents: "none"}}>
            <circle
                className="locked-point-selection-halo"
                cx={x}
                cy={y}
                r={TARGET_SIZE / 3}
                style={{fill: lockedFigureColors[props.figure.color]}}
            />
        </g>
    );
}

function LockedLineSegmentSelectionHalo(props: {figure: LockedLineType}) {
    const {points, color} = props.figure;
    const [start, end] = useTransformVectorsToPixels(
        points[0].coord,
        points[1].coord,
    );

    return (
        <g aria-hidden={true} style={{pointerEvents: "none"}}>
            <line
                className="locked-line-selection-halo"
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
