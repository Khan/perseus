import {color} from "@khanacademy/wonder-blocks-tokens";
import {Circle} from "mafs";
import * as React from "react";

import {moveCenter} from "../reducer/interactive-graph-action";

import {StyledMovablePoint} from "./components/movable-point";

import type {CircleGraphState, MafsGraphProps} from "../types";

type CircleGraphProps = MafsGraphProps<CircleGraphState>;

export function CircleGraph(props: CircleGraphProps) {
    const {dispatch, graphState} = props;
    const {center, radius} = graphState;

    return (
        <>
            <Circle
                center={center}
                radius={radius}
                fillOpacity={0}
                color={color.blue}
            />
            <StyledMovablePoint
                point={center}
                onMove={(newCenter) => {
                    dispatch(moveCenter(newCenter));
                }}
            />
        </>
    );
}
