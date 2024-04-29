import * as React from "react";

// import {movePoint} from "../reducer/interactive-graph-action";

// import {StyledMovablePoint} from "./components/movable-point";

import type {CircleGraphState, MafsGraphProps} from "../types";

type CircleGraphProps = MafsGraphProps<CircleGraphState>;

export function CircleGraph(props: CircleGraphProps) {
    // const {dispatch} = props;
    return (
        <>
            <p>Hello circle</p>
        </>
    );
}
