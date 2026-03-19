import {useTimeout} from "@khanacademy/wonder-blocks-timing";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";
import {getCSSZoomFactor} from "../utils";

import {MovablePoint} from "./components/movable-point";
import {srFormatNumber} from "./screenreader-text";
import {useTransformVectorsToPixels, pixelsToVectors} from "./use-transform";

import type {I18nContextType} from "../../../components/i18n-context";
import type {PerseusStrings} from "../../../strings";
import type {GraphConfig} from "../reducer/use-graph-config";
import type {
    PointGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";

export function renderPointGraph(
    state: PointGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
    pointNames?: string[],
): InteractiveGraphElementSuite {
    return {
        graph: (
            <PointGraph
                graphState={state}
                dispatch={dispatch}
                pointNames={pointNames}
            />
        ),
        interactiveElementsDescription: getPointGraphDescription(
            state,
            i18n,
            pointNames,
        ),
    };
}

type Props = MafsGraphProps<PointGraphState> & {
    pointNames?: string[];
};
type StatefulProps = Props & {
    graphConfig: GraphConfig;
    pointsRef: React.MutableRefObject<(SVGElement | null)[]>;
    top: number;
    left: number;
};

function PointGraph(props: Props) {
    const {numPoints} = props.graphState;
    const graphConfig = useGraphConfig();
    const pointsRef = React.useRef<Array<SVGElement | null>>([]);

    // Dimensions to build the graph overlay for Unlimited Point.
    const {
        range: [x, y],
    } = graphConfig;
    const [[left, top]] = useTransformVectorsToPixels([x[0], y[1]]);

    // This useEffect is to handle the focus snapping for Unlimited Point.
    React.useEffect(() => {
        const focusedIndex = props.graphState.focusedPointIndex;
        if (focusedIndex != null) {
            pointsRef.current[focusedIndex]?.focus();
        }
    }, [
        props.graphState.focusedPointIndex,
        // Ensure that we re-focus if a point is deleted.
        props.graphState.coords.length,
        pointsRef,
    ]);

    const statefulProps = {
        ...props,
        graphConfig,
        pointsRef,
        top,
        left,
    };

    if (numPoints === "unlimited") {
        return UnlimitedPointGraph(statefulProps);
    }

    return LimitedPointGraph(statefulProps);
}

function LimitedPointGraph(statefulProps: StatefulProps) {
    const {dispatch, pointNames} = statefulProps;
    const {strings, locale} = usePerseusI18n();

    return (
        <>
            {statefulProps.graphState.coords.map((point, i) => {
                const customName = pointNames?.[i];
                const ariaLabel = customName
                    ? strings.srPointAtCoordinates({
                          num: customName,
                          x: srFormatNumber(point[0], locale),
                          y: srFormatNumber(point[1], locale),
                      })
                    : undefined;
                return (
                    <MovablePoint
                        key={i}
                        point={point}
                        sequenceNumber={i + 1}
                        ariaLabel={ariaLabel}
                        onMove={(destination) =>
                            dispatch(
                                actions.pointGraph.movePoint(i, destination),
                            )
                        }
                    />
                );
            })}
        </>
    );
}

function UnlimitedPointGraph(statefulProps: StatefulProps) {
    const {dispatch, graphConfig, pointsRef, top, left, pointNames} =
        statefulProps;
    const {coords} = statefulProps.graphState;
    const {strings, locale} = usePerseusI18n();

    // When users drag a point on iOS Safari, the browser fires a click event after the mouseup
    // at the original click location, which would add an unwanted new point. We track drag
    // state and delay clearing it to block these phantom clicks (LEMS-2873)
    const [isCurrentlyDragging, setIsCurrentlyDragging] = React.useState(false);
    const dragEndCallbackTimer = useTimeout(
        () => setIsCurrentlyDragging(false),
        400, // Safari Webkit has up to a 350ms delay before a click event is fired
    );

    const {graphDimensionsInPixels} = graphConfig;

    const widthPx = graphDimensionsInPixels[0];
    const heightPx = graphDimensionsInPixels[1];

    return (
        <>
            {/* This rect is here to grab clicks so that new points can be added */}
            {/* It's important because it stops mouse events from propogating
                when dragging a points around */}
            <rect
                style={{
                    fill: "rgba(0,0,0,0)",
                    cursor: "crosshair",
                }}
                width={widthPx}
                height={heightPx}
                x={left}
                y={top}
                onClick={(event) => {
                    // Prevent adding points during drag operations (iOS phantom click fix)
                    if (isCurrentlyDragging) {
                        return;
                    }

                    const elementRect =
                        event.currentTarget.getBoundingClientRect();
                    const zoomFactor = getCSSZoomFactor(event.currentTarget);

                    // Compensate for CSS zoom applied by mobile font scaling
                    const x = (event.clientX - elementRect.x) / zoomFactor;
                    const y = (event.clientY - elementRect.y) / zoomFactor;

                    const graphCoordinates = pixelsToVectors(
                        [[x, y]],
                        graphConfig,
                    );
                    dispatch(actions.pointGraph.addPoint(graphCoordinates[0]));
                }}
            />
            {coords.map((point, i) => {
                const customName = pointNames?.[i];
                const ariaLabel = customName
                    ? strings.srPointAtCoordinates({
                          num: customName,
                          x: srFormatNumber(point[0], locale),
                          y: srFormatNumber(point[1], locale),
                      })
                    : undefined;
                return (
                    <MovablePoint
                        key={i}
                        point={point}
                        sequenceNumber={i + 1}
                        ariaLabel={ariaLabel}
                        onDragStart={() => {
                            dragEndCallbackTimer.clear();
                            setIsCurrentlyDragging(true);
                        }}
                        onMove={(destination) => {
                            dispatch(
                                actions.pointGraph.movePoint(i, destination),
                            );
                        }}
                        onDragEnd={() => {
                            // Start timer to reset drag state after delay
                            dragEndCallbackTimer.set();
                        }}
                        ref={(ref) => {
                            pointsRef.current[i] = ref;
                        }}
                        onFocus={() => {
                            dispatch(actions.pointGraph.focusPoint(i));
                        }}
                        onClick={() => {
                            dispatch(actions.pointGraph.clickPoint(i));
                        }}
                    />
                );
            })}
        </>
    );
}

// Exported for testing
export function getPointGraphDescription(
    state: PointGraphState,
    i18n: {strings: PerseusStrings; locale: string},
    pointNames?: string[],
): string {
    const {strings, locale} = i18n;

    if (state.coords.length === 0) {
        return strings.srNoInteractiveElements;
    }

    const pointDescriptions = state.coords.map(([x, y], index) =>
        strings.srPointAtCoordinates({
            num: pointNames?.[index] || index + 1,
            x: srFormatNumber(x, locale),
            y: srFormatNumber(y, locale),
        }),
    );

    return strings.srInteractiveElements({
        elements: pointDescriptions.join(" "),
    });
}
