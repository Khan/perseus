import * as React from "react";

import {MovableCircle} from "./components/movable-circle";

import type {CircleGraphState, MafsGraphProps} from "../types";

type CircleGraphProps = MafsGraphProps<CircleGraphState>;

export function CircleGraph(props: CircleGraphProps) {
    const {radius, center} = props.graphState;
    return (
        <>
            <MovableCircle center={center} radius={radius} onMove={() => {}} />
        </>
    );
}
