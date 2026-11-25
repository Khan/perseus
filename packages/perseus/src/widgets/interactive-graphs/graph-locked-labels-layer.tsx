import * as React from "react";

import {getIntersectionOfRayWithBox} from "./graphs/utils";
import {getAutoLabelPlacements} from "./locked-figures/auto-label-placement";
import LockedLabel from "./locked-figures/locked-label";
import {getArrowheadRadiusPx, strokeWeights} from "./locked-figures/utils";
import useGraphConfig from "./reducer/use-graph-config";

import type {
    LabelPlacementItem,
    LabelSize,
    PointObstacleInput,
    SegmentObstacle,
} from "./locked-figures/auto-label-placement-types";
import type {LockedFigure, LockedLabelType} from "@khanacademy/perseus-core";

/**
 * Size assumed for a label that hasn't been measured yet. Placement runs
 * before the label's text has been typeset, so it starts from this and is
 * recomputed once a real measurement arrives.
 */
const assumedLabelSize: LabelSize = {width: 24, height: 19};

/** Keys joining a label to its measurement and its computed placement. */
const pointLabelKey = (figureIndex: number, labelIndex: number) =>
    `${figureIndex}-label-${labelIndex}`;
const endpointLabelKey = (
    figureIndex: number,
    pointIndex: number,
    labelIndex: number,
) => `${figureIndex}-point-${pointIndex}-label-${labelIndex}`;
const lineLabelKey = (figureIndex: number, labelIndex: number) =>
    `${figureIndex}-line-label-${labelIndex}`;
const vectorLabelKey = (figureIndex: number, labelIndex: number) =>
    `${figureIndex}-vector-label-${labelIndex}`;

/**
 * How long a wait for the labels to be measured has to exceed before they fade
 * in rather than appearing instantly. A warm load settles in a few
 * milliseconds; anything longer means fonts were actually fetched, and the
 * labels would otherwise pop in well after the rest of the graph.
 */
const fadeThresholdMs = 75;

/**
 * Longest the labels stay hidden waiting to be measured. If a measurement
 * never arrives — a TeX implementation that doesn't settle, say — they are
 * revealed at their estimated positions rather than staying invisible. One
 * timer covers the whole batch, so a single slow label delays everything by at
 * most this long rather than by this long each.
 */
const measureTimeoutMs = 1000;

type Props = {
    lockedFigures: ReadonlyArray<LockedFigure>;
};

export default function GraphLockedLabelsLayer(props: Props) {
    const {lockedFigures} = props;

    // Labels are placed against the graph's range and pixel size, and this
    // layer renders inside the graph config provider, so read them from
    // context rather than threading them down from MafsGraph.
    const graphInfo = useGraphConfig();
    const {range, width, height, markings, showAxisTicks, tickStep} = graphInfo;

    // Labels report their rendered size once their text has been typeset.
    // Placement needs every size at once — a label's position depends on where
    // its neighbours ended up — so they're collected here rather than in each
    // label.
    const [labelSizes, setLabelSizes] = React.useState<
        ReadonlyMap<string, LabelSize>
    >(() => new Map());

    const handleMeasure = React.useCallback((key: string, size: LabelSize) => {
        setLabelSizes((currentSizes) => {
            // A label that can't be measured yet reports zero; treating that
            // as a real size would leave it demanding no clearance at all.
            if (size.width <= 0 || size.height <= 0) {
                return currentSizes;
            }

            // Return the same map when nothing changes.
            const existingSize = currentSizes.get(key);
            if (
                existingSize &&
                existingSize.width === size.width &&
                existingSize.height === size.height
            ) {
                return currentSizes;
            }

            const updatedSizes = new Map(currentSizes);
            updatedSizes.set(key, size);
            return updatedSizes;
        });
    }, []);

    // Each label needs a callback with a stable identity, or its measurement
    // effect would re-run on every render of this layer.
    const measureHandlers = React.useRef(
        new Map<string, (size: LabelSize) => void>(),
    );
    const getMeasureHandler = (key: string) => {
        let handler = measureHandlers.current.get(key);
        if (!handler) {
            handler = (size: LabelSize) => handleMeasure(key, size);
            measureHandlers.current.set(key, handler);
        }
        return handler;
    };

    // One memo rather than three: a line label refers to its own segment by
    // reference, so the label and the segment have to come from the same
    // object. Building them separately would break that match.
    const {items, segments, points} = React.useMemo(() => {
        const labelItems: LabelPlacementItem[] = [];
        const segmentObstacles: SegmentObstacle[] = [];
        const pointObstacles: PointObstacleInput[] = [];
        const sized = (key: string) => labelSizes.get(key) ?? assumedLabelSize;

        lockedFigures.forEach((figure, figureIndex) => {
            if (figure.type === "point") {
                const keys = figure.labels.map((label, j) =>
                    pointLabelKey(figureIndex, j),
                );
                pointObstacles.push({coord: figure.coord, ownerKeys: keys});

                figure.labels.forEach((label, j) => {
                    const key = pointLabelKey(figureIndex, j);
                    labelItems.push({
                        key,
                        anchorCoord: figure.coord,
                        size: sized(key),
                    });
                });
            }

            if (figure.type === "line") {
                const [point1, point2] = figure.points;
                const extendsForward =
                    figure.kind === "ray" || figure.kind === "line";
                const drawnFrom =
                    figure.kind === "line"
                        ? getIntersectionOfRayWithBox(
                              point2.coord,
                              point1.coord,
                              range,
                          )
                        : point1.coord;
                const drawnTo = extendsForward
                    ? getIntersectionOfRayWithBox(
                          point1.coord,
                          point2.coord,
                          range,
                      )
                    : point2.coord;
                // The full drawn stroke, not just the span between the two
                // points: a ray and an infinite line carry on past them.
                const segment: SegmentObstacle = {
                    from: drawnFrom,
                    to: drawnTo,
                    strokeWidth: strokeWeights[figure.weight],
                };
                segmentObstacles.push(segment);

                figure.points.forEach((point, pointIndex) => {
                    const isVisible =
                        pointIndex === 0
                            ? figure.showPoint1
                            : figure.showPoint2;
                    const keys = point.labels.map((label, k) =>
                        endpointLabelKey(figureIndex, pointIndex, k),
                    );

                    // Nothing is drawn at a hidden endpoint, so it reserves no
                    // space — its label still radiates from it as usual.
                    if (isVisible) {
                        pointObstacles.push({
                            coord: point.coord,
                            ownerKeys: keys,
                        });
                    }

                    point.labels.forEach((label, k) => {
                        const key = endpointLabelKey(
                            figureIndex,
                            pointIndex,
                            k,
                        );
                        labelItems.push({
                            key,
                            anchorCoord: point.coord,
                            size: sized(key),
                            ownerSegment: segment,
                        });
                    });
                });

                // A line's own labels sit beside the line, anchored at its
                // midpoint. Nothing is drawn there, so no need to add the point
                // to pointObstacles.
                figure.labels.forEach((label, j) => {
                    const key = lineLabelKey(figureIndex, j);
                    labelItems.push({
                        key,
                        anchorCoord: [
                            (point1.coord[0] + point2.coord[0]) / 2,
                            (point1.coord[1] + point2.coord[1]) / 2,
                        ],
                        size: sized(key),
                        ownerSegment: segment,
                        labelsTheLine: true,
                    });
                });
            }

            if (figure.type === "vector") {
                const [tail, tip] = figure.points;
                const strokeWidth = strokeWeights[figure.weight];
                const segment: SegmentObstacle = {
                    from: tail,
                    to: tip,
                    strokeWidth,
                };
                segmentObstacles.push(segment);

                // Nothing is drawn at either end but the stroke itself, so no
                // need to add either point to pointObstacles. However, the
                // arrowhead at the tip does use space, and it is larger than a
                // point.
                pointObstacles.push({
                    coord: tip,
                    radiusPx: getArrowheadRadiusPx(strokeWidth),
                });

                figure.labels.forEach((label, j) => {
                    const key = vectorLabelKey(figureIndex, j);
                    labelItems.push({
                        key,
                        anchorCoord: [
                            (tail[0] + tip[0]) / 2,
                            (tail[1] + tip[1]) / 2,
                        ],
                        size: sized(key),
                        ownerSegment: segment,
                        labelsTheLine: true,
                    });
                });
            }
        });

        return {
            items: labelItems,
            segments: segmentObstacles,
            points: pointObstacles,
        };
    }, [lockedFigures, labelSizes, range]);

    const placements = React.useMemo(
        () =>
            getAutoLabelPlacements(
                items,
                {range, width, height, markings, showAxisTicks, tickStep},
                segments,
                points,
            ),
        [
            items,
            segments,
            points,
            range,
            width,
            height,
            markings,
            showAxisTicks,
            tickStep,
        ],
    );

    // Hold the labels back until they've all been measured, so none is seen
    // at the position it had under an assumed size. Identifies the current set
    // of labels so the gate re-arms when the figures are edited.
    const itemSignature = items.map((item) => item.key).join("|");
    const [revealedSignature, setRevealedSignature] = React.useState<
        string | null
    >(null);
    const [fadeSignature, setFadeSignature] = React.useState<string | null>(
        null,
    );
    const revealed = revealedSignature === itemSignature;

    React.useEffect(() => {
        const startedAt = performance.now();
        const reveal = () => {
            setRevealedSignature(itemSignature);
            if (performance.now() - startedAt > fadeThresholdMs) {
                setFadeSignature(itemSignature);
            }
        };

        // However the measuring turns out, don't leave the labels hidden.
        const timeout = setTimeout(reveal, measureTimeoutMs);

        if (items.every((item) => labelSizes.has(item.key))) {
            reveal();
        }

        return () => clearTimeout(timeout);
    }, [itemSignature, items, labelSizes]);

    const renderLabel = (label: LockedLabelType, key: string) => {
        const placement = placements.get(key);
        return (
            <LockedLabel
                key={key}
                {...label}
                placement={placement}
                hidden={!!placement && !revealed}
                fading={fadeSignature === itemSignature}
                onMeasure={placement ? getMeasureHandler(key) : undefined}
            />
        );
    };

    return lockedFigures.map((figure, figureIndex) => {
        if (figure.type === "label") {
            return <LockedLabel key={`label-${figureIndex}`} {...figure} />;
        }

        return (
            <React.Fragment key={figureIndex}>
                {figure.labels.map((label, j) => {
                    const key =
                        figure.type === "line"
                            ? lineLabelKey(figureIndex, j)
                            : figure.type === "vector"
                              ? vectorLabelKey(figureIndex, j)
                              : pointLabelKey(figureIndex, j);
                    return renderLabel(label, key);
                })}

                {/* A line's endpoints are points in their own right, so their
                    labels are placed like any other point's. */}
                {figure.type === "line" &&
                    figure.points.map((point, pointIndex) =>
                        point.labels.map((label, k) =>
                            renderLabel(
                                label,
                                endpointLabelKey(figureIndex, pointIndex, k),
                            ),
                        ),
                    )}
            </React.Fragment>
        );
    });
}
