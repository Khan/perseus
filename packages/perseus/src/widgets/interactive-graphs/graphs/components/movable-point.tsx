import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";
import {useRef} from "react";

import {snap} from "../../math";
import useGraphConfig from "../../reducer/use-graph-config";
import {useDraggable} from "../use-draggable";

import {MovablePointView} from "./movable-point-view";

import type {CSSCursor} from "./css-cursor";
import type {KeyboardMovementConstraint} from "../use-draggable";
import type {vec} from "mafs";

type Props = {
    point: vec.Vector2;
    onMove: (newPoint: vec.Vector2) => unknown;
    color?: string;
    cursor?: CSSCursor | undefined;
    constrain?: KeyboardMovementConstraint;
};

export const MovablePoint = (props: Props) => {
    const {snapStep} = useGraphConfig();
    const elementRef = useRef<SVGGElement>(null);
    const {
        point,
        onMove,
        cursor,
        color = WBColor.blue,
        constrain = (p) => snap(snapStep, p),
    } = props;
    const {dragging} = useDraggable({
        gestureTarget: elementRef,
        point,
        onMove,
        constrainKeyboardMovement: constrain,
    });

    return (
        <MovablePointView
            ref={elementRef}
            point={point}
            color={color}
            dragging={dragging}
            focusBehavior={{type: "uncontrolled", tabIndex: 0}}
            cursor={cursor}
        />
    );
};
