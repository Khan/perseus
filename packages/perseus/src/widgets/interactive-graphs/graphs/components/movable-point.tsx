import * as React from "react";

import {useControlPoint} from "./use-control-point";

import type {CSSCursor} from "./css-cursor";
import type {KeyboardMovementConstraint} from "../use-draggable";
import type {vec} from "mafs";

type Props = {
    point: vec.Vector2;
    /**
     * Represents where this point stands in the overall point order.
     * This is used to provide screen readers with context about the point.
     */
    currentPointOrder: number;
    onMove?: (newPoint: vec.Vector2) => unknown;
    onClick?: () => unknown;
    color?: string;
    cursor?: CSSCursor | undefined;
    constrain?: KeyboardMovementConstraint;
    onFocus?: ((event: React.FocusEvent) => unknown) | undefined;
    onBlur?: ((event: React.FocusEvent) => unknown) | undefined;
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
