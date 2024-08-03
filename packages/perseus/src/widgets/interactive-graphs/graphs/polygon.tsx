import {Polygon, vec} from "mafs";
import * as React from "react";

import {snap} from "../math";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";
import {TARGET_SIZE} from "../utils";

import {PolygonAngle} from "./components/angle-indicators";
import {StyledMovablePoint} from "./components/movable-point";
import {TextLabel} from "./components/text-label";
import {useDraggable} from "./use-draggable";

import type {MafsGraphProps, PolygonGraphState} from "../types";
import type {CollinearTuple} from "@khanacademy/perseus";

type Props = MafsGraphProps<PolygonGraphState>;

export const PolygonGraph = (props: Props) => {
    const [hovered, setHovered] = React.useState(false);
    // This is more so required for the re-rendering that occurs when state
    // updates; specifically with regard to line weighting and polygon focus.
    const [focusVisible, setFocusVisible] = React.useState(false);

    const {dispatch} = props;
    const {coords, showAngles, showSides, range, snapStep, snapTo} =
        props.graphState;
    const {hintMode} = useGraphConfig();

    // TODO(benchristel): can the default set of points be removed here? I don't
    // think coords can be null.
    const points = coords ?? [[0, 0]];

    const ref = React.useRef<SVGPolygonElement>(null);
    const dragReferencePoint = points[0];
    const snapToValue = snapTo ?? "grid";
    const {dragging} = useDraggable({
        gestureTarget: ref,
        point: dragReferencePoint,
        onMove: (newPoint) => {
            const delta = vec.sub(newPoint, dragReferencePoint);
            dispatch(actions.polygon.moveAll(delta));
        },
        constrain: (p) =>
            ["angles", "sides"].includes(snapToValue) ? p : snap(snapStep, p),
    });

    const lastMoveTime = React.useRef<number>(0);

    const lines = getLines(points);

    return (
        <>
            <Polygon
                points={[...points]}
                color="var(--movable-line-stroke-color)"
                svgPolygonProps={{
                    strokeWidth: focusVisible
                        ? "var(--movable-line-stroke-weight-active)"
                        : "var(--movable-line-stroke-weight)",
                    style: {fill: "transparent"},
                }}
            />
            {points.map((point, i) => {
                const pt1 = points.at(i - 1);
                const pt2 = points[(i + 1) % points.length];
                if (!pt1 || !pt2) {
                    return null;
                }
                return (
                    <PolygonAngle
                        key={"angle-" + i}
                        centerPoint={point}
                        endPoints={[pt1, pt2]}
                        range={range}
                        polygonLines={lines}
                        showAngles={!!showAngles}
                        snapTo={snapToValue}
                    />
                );
            })}
            {showSides &&
                lines.map(([start, end], i) => {
                    const [x, y] = vec.midpoint(start, end);
                    const length = parseFloat(
                        vec
                            .dist(start, end)
                            .toFixed(snapTo === "sides" ? 0 : 1),
                    );
                    return (
                        <TextLabel key={"side-" + i} x={x} y={y}>
                            {!Number.isInteger(length) && "≈ "}
                            {length}
                        </TextLabel>
                    );
                })}
            {/**
             * This transparent svg creates a nice big click/touch target,
             * since the polygon itself can be made smaller than the spec.
             */}
            <Polygon
                points={[...points]}
                color="transparent"
                svgPolygonProps={{
                    ref,
                    tabIndex: hintMode ? -1 : 0,
                    strokeWidth: TARGET_SIZE,
                    style: {
                        cursor: dragging ? "grabbing" : "grab",
                        fill: hovered ? "var(--mafs-blue)" : "transparent",
                    },
                    onMouseEnter: () => setHovered(true),
                    onMouseLeave: () => setHovered(false),
                    // Required to remove line weighting when user clicks away
                    // from the focused polygon
                    onKeyDownCapture: () => {
                        setFocusVisible(hasFocusVisible(ref.current));
                    },
                    // Required for lines to darken on focus
                    onFocus: () =>
                        setFocusVisible(hasFocusVisible(ref.current)),
                    // Required for line weighting to update on blur. Without this,
                    // the user has to hover over the shape for it to update
                    onBlur: () => setFocusVisible(hasFocusVisible(ref.current)),
                    className: "movable-polygon",
                }}
            />
            {points.map((point, i) => (
                <StyledMovablePoint
                    key={"point-" + i}
                    snapTo={snapTo}
                    point={point}
                    onMove={(destination: vec.Vector2) => {
                        const now = Date.now();
                        const targetFPS = 40;
                        const moveThresholdTime = 1000 / targetFPS;

                        if (now - lastMoveTime.current > moveThresholdTime) {
                            dispatch(actions.polygon.movePoint(i, destination));
                            lastMoveTime.current = now;
                        }
                    }}
                />
            ))}
        </>
    );
};

function getLines(points: readonly vec.Vector2[]): CollinearTuple[] {
    return points.map((point, i) => {
        const next = points[(i + 1) % points.length];
        return [point, next];
    });
}

export const hasFocusVisible = (
    element: Element | null | undefined,
): boolean => {
    const matches = (selector: string) => element?.matches(selector) ?? false;
    try {
        return matches(":focus-visible");
    } catch (e) {
        // jsdom doesn't support :focus-visible
        // (see https://github.com/jsdom/jsdom/issues/3426),
        // so the call to matches(":focus-visible") will fail in tests.
        return matches(":focus");
    }
};
