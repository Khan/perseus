import {Polygon, useMovable, vec} from "mafs";
import * as React from "react";

import {moveAll, moveControlPoint} from "../reducer/interactive-graph-action";
import {TARGET_SIZE} from "../utils";

import {StyledMovablePoint} from "./components/movable-point";

import type {MafsGraphProps, PolygonGraphState} from "../types";

type Props = MafsGraphProps<PolygonGraphState>;

export const PolygonGraph = (props: Props) => {
    const [focused, setFocused] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);

    const {dispatch} = props;
    const {coords, type} = props.graphState;

    const points = coords ?? [[0, 0]];

    const pointsSum = points.reduce(
        (acc, point) => vec.add(acc, point),
        [0, 0],
    );
    const midpoint =
        pointsSum && vec.scale(pointsSum, 1 / (points.length ?? 1));

    const ref = React.useRef<SVGPolygonElement>(null);
    const {dragging} = useMovable({
        gestureTarget: ref,
        point: midpoint,
        onMove: (newPoint) => {
            const delta = vec.sub(newPoint, midpoint);
            dispatch(moveAll(delta));
        },
        constrain: (p) => p,
    });

    const active = hovered || focused || dragging;

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
                    key={i}
                    point={point}
                    onMove={(destination: vec.Vector2) =>
                        dispatch(moveControlPoint(i, destination))
                    }
                    data-testid={type + i}
                />
            ))}
        </>
    );
};
