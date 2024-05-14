import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import {useMovable} from "mafs";
import * as React from "react";
import {useRef} from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {snap} from "../../utils";

import {MovablePointView} from "./movable-point-view";

import type {vec} from "mafs";

type Props = {
    point: vec.Vector2;
    onMove: (newPoint: vec.Vector2) => unknown;
    color?: string;
};

export const StyledMovablePoint = (props: Props) => {
    const {snapStep} = useGraphConfig();
    const elementRef = useRef<SVGGElement>(null);
    const {point, onMove, color = WBColor.blue} = props;

    const {dragging} = useMovable({
        gestureTarget: elementRef,
        point,
        onMove,
        constrain: (p) => snap(snapStep, p),
    });

    return (
        <MovablePointView
            ref={elementRef}
            point={point}
            color={color}
            dragging={dragging}
            focusBehavior={{type: "uncontrolled", tabIndex: 0}}
        />
    );
};
