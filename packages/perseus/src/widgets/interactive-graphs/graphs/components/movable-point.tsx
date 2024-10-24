import * as React from "react";

import {useControlPoint} from "./use-control-point";

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
        const {visiblePoint, focusableHandle} = useControlPoint({
            ...props,
            forwardedRef: pointRef,
        });
        return (
            <>
                {focusableHandle}
                {visiblePoint}
            </>
        );
    },
);
