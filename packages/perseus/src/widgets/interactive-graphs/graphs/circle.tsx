import {color} from "@khanacademy/wonder-blocks-tokens";
import {Circle} from "mafs";
import * as React from "react";

import {moveCenter, moveRadiusPoint} from "../reducer/interactive-graph-action";
import {getRadius} from "../reducer/interactive-graph-state";

import {StyledMovablePoint} from "./components/movable-point";

import type {CircleGraphState, MafsGraphProps} from "../types";

type CircleGraphProps = MafsGraphProps<CircleGraphState>;

export function CircleGraph(props: CircleGraphProps) {
    const {dispatch, graphState} = props;
    const {center, radiusPoint} = graphState;

    return (
        <>
            <Circle
                center={center}
                radius={getRadius(graphState)}
                fillOpacity={0}
                color={color.blue}
            />
            <StyledMovablePoint
                point={center}
                onMove={(newCenter) => {
                    dispatch(moveCenter(newCenter));
                }}
            />
            <StyledMovablePoint
                point={radiusPoint}
                onMove={(newRadiusPoint) => {
                    dispatch(moveRadiusPoint(newRadiusPoint));
                }}
            />
        </>
    );
}
