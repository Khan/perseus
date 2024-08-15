import * as React from "react";

import {actions} from "../reducer/interactive-graph-action";

import {MovablePoint} from "./components/movable-point";

import type {PointGraphState, MafsGraphProps} from "../types";

type PointGraphProps = MafsGraphProps<PointGraphState>;

/*
TODO:
- Need To prevent propogation during on Move event
- Need a way to delete points after they've been adeded
- How do points get added via the keyboard?
*/

export function PointGraph(props: PointGraphProps) {
    const {dispatch} = props;
    return (
        <>
            {props.graphState.coords.map((point, i) => (
                <MovablePoint
                    key={i}
                    point={point}
                    onMove={(destination) =>
                        dispatch(actions.pointGraph.movePoint(i, destination))
                    }
                />
            ))}
        </>
    );
}
