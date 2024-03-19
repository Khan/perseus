import {Polygon} from "mafs";
import * as React from "react";

import {moveControlPoint} from "../reducer/interactive-graph-action";

import {StyledMovablePoint} from "./components/movable-point";

import type {MafsGraphProps, PolygonGraphState} from "../types";
import type {vec} from "mafs";

type Props = MafsGraphProps<PolygonGraphState>;

export const PolygonGraph = (props: Props) => {
    const {dispatch} = props;
    const {coords: points, type} = props.graphState;

    if (!points) {
        return null;
    }

    return (
        <>
            <Polygon points={[...points]} />
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
