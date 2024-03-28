import * as React from "react";

import {moveControlPoint} from "../../reducer-v2/interactive-graph-action-v2";

import {SegmentView} from "./segment";

import type {ActionV2} from "../../reducer-v2/interactive-graph-action-v2";
import type {GraphObject} from "../../reducer-v2/types";
import type {vec} from "mafs";

type Props = {
    object: GraphObject;
    dispatch: (action: ActionV2) => unknown;
    index: number;
};

export function GraphObjectView(props: Props) {
    const {object, dispatch, index} = props;
    if (object.type === "segment") {
        return (
            <SegmentView
                collinearPair={object.points}
                onMoveLine={(delta: vec.Vector2) => {
                    // FIXME
                    // dispatch(moveLine(i, delta));
                }}
                onMovePoint={(
                    endpointIndex: number,
                    destination: vec.Vector2,
                ) =>
                    dispatch(
                        moveControlPoint(endpointIndex, destination, index),
                    )
                }
            />
        );
    }

    return null;
}
