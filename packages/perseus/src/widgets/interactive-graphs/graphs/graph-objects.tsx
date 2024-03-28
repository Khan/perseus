import * as React from "react";

import {GraphObjectView} from "./components/graph-object";

import type {InteractiveGraphStateV2} from "../reducer-v2/types";
import type {MafsGraphProps} from "../types";

type SegmentProps = MafsGraphProps<InteractiveGraphStateV2>;

export const GraphObjects = (props: SegmentProps) => {
    const {dispatch} = props;
    const {objects} = props.graphState;

    return (
        <>
            {objects.map((object, i) => (
                <GraphObjectView
                    object={object}
                    index={i}
                    dispatch={dispatch}
                />
            ))}
        </>
    );
};
