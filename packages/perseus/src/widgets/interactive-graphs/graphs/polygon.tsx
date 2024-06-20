import {Polygon, vec} from "mafs";
import * as React from "react";

import {moveAll, movePoint} from "../reducer/interactive-graph-action";
import {TARGET_SIZE, snap} from "../utils";

import {Angle} from "./components/angle";
import {StyledMovablePoint} from "./components/movable-point";
import {TextLabel} from "./components/text-label";
import {useDraggable} from "./use-draggable";
import {getLines} from "./utils";

import type {MafsGraphProps, PolygonGraphState} from "../types";

type Props = MafsGraphProps<PolygonGraphState>;

export const PolygonGraph = (props: Props) => {
    const [focused, setFocused] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);

    const {dispatch} = props;
    const {coords, showAngles, showSides, range, snapStep, snapTo} =
        props.graphState;

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
            dispatch(moveAll(delta));
        },
        constrain: (p) =>
            ["angles", "sides"].includes(snapToValue) ? p : snap(snapStep, p),
    });

    const active = hovered || focused || dragging;

    const lines = getLines(points);

    return (
        <>
            <Polygon
                points={[...points]}
                color="var(--movable-line-stroke-color)"
                svgPolygonProps={{
                    strokeWidth: active
                        ? "var(--movable-line-stroke-weight-active)"
                        : "var(--movable-line-stroke-weight)",
                }}
            />
            {points.map((point, i) => {
                const pt1 = points.at(i - 1);
                const pt2 = points[(i + 1) % points.length];
                if (!pt1 || !pt2) {
                    return null;
                }
                return (
                    <Angle
                        key={"angle-" + i}
                        centerPoint={point}
                        endPoints={[pt1, pt2]}
                        active={active}
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
                    tabIndex: 0,
                    strokeWidth: TARGET_SIZE,
                    style: {
                        cursor: dragging ? "grabbing" : "grab",
                    },
                    onFocus: () => setFocused(true),
                    onBlur: () => setFocused(false),
                    onMouseEnter: () => setHovered(true),
                    onMouseLeave: () => setHovered(false),
                    className: "movable-polygon",
                }}
            />
            {points.map((point, i) => (
                <StyledMovablePoint
                    key={"point-" + i}
                    snapTo={snapTo}
                    point={point}
                    onMove={(destination: vec.Vector2) =>
                        dispatch(movePoint(i, destination))
                    }
                />
            ))}
        </>
    );
};
