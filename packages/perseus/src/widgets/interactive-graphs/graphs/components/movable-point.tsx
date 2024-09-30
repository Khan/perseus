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
    onMove?: (newPoint: vec.Vector2) => unknown;
    onClick?: () => unknown;
    color?: string;
    cursor?: CSSCursor | undefined;
    constrain?: KeyboardMovementConstraint;
    onFocusChange?: (event: React.FocusEvent, isFocused: boolean) => unknown;
};

export const MovablePoint = React.forwardRef(
    (props: Props, pointRef: React.ForwardedRef<SVGGElement | null>) => {
        const {snapStep} = useGraphConfig();
        const elementRef = useRef<SVGGElement | null>(null);
        const {
            point,
            onMove = () => {},
            onFocusChange = () => {},
            onClick = () => {},
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
                ref={(ref) => {
                    pointRef(ref);
                    elementRef.current = ref;
                }}
                point={point}
                color={color}
                dragging={dragging}
                focusBehavior={{
                    type: "uncontrolled",
                    tabIndex: 0,
                    onFocusChange,
                }}
                onClick={() => {
                    onClick && onClick();
                    elementRef.current?.focus();
                }}
                cursor={cursor}
            />
        );
    },
);
