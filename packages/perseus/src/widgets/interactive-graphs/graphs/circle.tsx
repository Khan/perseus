import * as React from "react";

import {MovableCircle} from "./components/movable-circle";

import type {CircleGraphState, MafsGraphProps} from "../types";

type CircleGraphProps = MafsGraphProps<CircleGraphState>;

export function CircleGraph(props: CircleGraphProps) {
    return (
        <>
            <MovableCircle center={[0, 0]} radius={5} onMove={() => {}} />
        </>
    );
}
