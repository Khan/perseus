import {useTimeout} from "@khanacademy/wonder-blocks-timing";
import * as React from "react";

import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

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
): InteractiveGraphElementSuite {
    return {
        graph: <PointGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getPointGraphDescription(state, i18n),
    };
}

type Props = MafsGraphProps<PointGraphState>;
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
    const {dispatch} = statefulProps;

    return (
        <>
            {statefulProps.graphState.coords.map((point, i) => (
                <MovablePoint
                    key={i}
                    point={point}
                    sequenceNumber={i + 1}
                    onMove={(destination) =>
                        dispatch(actions.pointGraph.movePoint(i, destination))
                    }
                />
            ))}
        </>
    );
}

function UnlimitedPointGraph(statefulProps: StatefulProps) {
    const {dispatch, graphConfig, pointsRef, top, left} = statefulProps;
    const {coords} = statefulProps.graphState;

    // When users drag a point on iOS Safari, the browser fires a click event after the mouseup
    // at the original click location, which would add an unwanted new point. We track drag
    // state and delay clearing it to block these phantom clicks (LEMS-2873)
    const [isCurrentlyDragging, setIsCurrentlyDragging] = React.useState(false);
    const dragEndCallbackTimer = useTimeout(
        () => setIsCurrentlyDragging(false),
        400, // Safari Webkit has up to a 350ms delay before a click event is fired
    );

    // Debug state to display diagnostic info on mobile
    const [debugInfo, setDebugInfo] = React.useState<string>("");

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

                    const svg = event.currentTarget.ownerSVGElement;
                    const ctm = event.currentTarget.getScreenCTM();
                    if (!svg || !ctm) {
                        return;
                    }

                    const pt = svg.createSVGPoint();
                    pt.x = event.clientX;
                    pt.y = event.clientY;
                    const svgPoint = pt.matrixTransform(ctm.inverse());

                    // Subtract left/top to get position relative to rect
                    const x = svgPoint.x - left;
                    const y = svgPoint.y - top;

                    // Use actual rendered dimensions
                    const elementRect =
                        event.currentTarget.getBoundingClientRect();
                    const actualDimensions = {
                        range: graphConfig.range,
                        width: elementRect.width,
                        height: elementRect.height,
                    };

                    // Capture diagnostic info for mobile debugging
                    const graphCoords = pixelsToVectors(
                        [[x, y]],
                        actualDimensions,
                    );

                    // Get all possible diagnostic values
                    const scaleX = Math.sqrt(ctm.a * ctm.a + ctm.b * ctm.b);
                    const scaleY = Math.sqrt(ctm.c * ctm.c + ctm.d * ctm.d);
                    const visualViewportScale =
                        window.visualViewport?.scale ?? 1;
                    const devicePixelRatio = window.devicePixelRatio ?? 1;
                    const parentSvg = svg.getBoundingClientRect();

                    const info = `Click: ${event.clientX.toFixed(0)}, ${event.clientY.toFixed(0)}
SVG: ${svgPoint.x.toFixed(1)}, ${svgPoint.y.toFixed(1)}
CTM: a=${ctm.a.toFixed(2)} d=${ctm.d.toFixed(2)}
CTM Scale: ${scaleX.toFixed(3)}, ${scaleY.toFixed(3)}
VVP Scale: ${visualViewportScale.toFixed(3)}
DPR: ${devicePixelRatio.toFixed(3)}
Left/Top: ${left.toFixed(1)}, ${top.toFixed(1)}
Relative: ${x.toFixed(1)}, ${y.toFixed(1)}
Expected: ${widthPx}x${heightPx}
Actual: ${elementRect.width.toFixed(0)}x${elementRect.height.toFixed(0)}
Parent SVG: ${parentSvg.width.toFixed(0)}x${parentSvg.height.toFixed(0)}
Range: [${graphConfig.range[0][0]},${graphConfig.range[0][1]}],[${graphConfig.range[1][0]},${graphConfig.range[1][1]}]
Result: [${graphCoords[0][0].toFixed(1)}, ${graphCoords[0][1].toFixed(1)}]`;
                    setDebugInfo(info);

                    const graphCoordinates = pixelsToVectors(
                        [[x, y]],
                        actualDimensions,
                    );
                    dispatch(actions.pointGraph.addPoint(graphCoordinates[0]));
                }}
            />
            {/* Debug text for mobile - displays click diagnostic info */}
            {debugInfo && (
                <text
                    x={left + 10}
                    y={top + 30}
                    fill="red"
                    fontSize="16"
                    fontFamily="monospace"
                    style={{pointerEvents: "none"}}
                >
                    {debugInfo.split("\n").map((line, i) => (
                        <tspan key={i} x={left + 10} dy={i === 0 ? 0 : 18}>
                            {line}
                        </tspan>
                    ))}
                </text>
            )}
            {coords.map((point, i) => (
                <MovablePoint
                    key={i}
                    point={point}
                    sequenceNumber={i + 1}
                    onMove={(destination) => {
                        setIsCurrentlyDragging(true);
                        dispatch(actions.pointGraph.movePoint(i, destination));
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
            ))}
        </>
    );
}

// Exported for testing
export function getPointGraphDescription(
    state: PointGraphState,
    i18n: {strings: PerseusStrings; locale: string},
): string {
    const {strings, locale} = i18n;

    if (state.coords.length === 0) {
        return strings.srNoInteractiveElements;
    }

    const pointDescriptions = state.coords.map(([x, y], index) =>
        strings.srPointAtCoordinates({
            num: index + 1,
            x: srFormatNumber(x, locale),
            y: srFormatNumber(y, locale),
        }),
    );

    return strings.srInteractiveElements({
        elements: pointDescriptions.join(" "),
    });
}
