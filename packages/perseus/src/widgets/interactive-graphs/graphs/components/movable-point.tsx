import * as React from "react";

import {useControlPoint} from "./use-control-point";

import type {CSSCursor} from "./css-cursor";
import type {AriaLive} from "../../types";
import type {KeyboardMovementConstraint} from "../use-draggable";
import type {vec} from "mafs";

type Props = {
    point: vec.Vector2;
    ariaDescribedBy?: string;
    ariaLabel?: string;
    ariaLive?: AriaLive;
    color?: string;
    constrain?: KeyboardMovementConstraint;
    cursor?: CSSCursor | undefined;
    /**
     * Represents where this point stands in the overall point sequence.
     * This is used to provide screen readers with context about the point.
     * Example: sequenceNumber={1} ==> "Point 1 at x comma y"
     *
     * Note: This number is 1-indexed, and should restart from 1 for each
     * interactive figure on the graph.
     */
    sequenceNumber?: number;
    onBlur?: (event: React.FocusEvent) => unknown;
    onClick?: () => unknown;
    onFocus?: (event: React.FocusEvent) => unknown;
    onMove?: (newPoint: vec.Vector2) => unknown;
};

export const MovablePoint = React.forwardRef(function MovablePointWithRef(
    props: Props,
    pointRef: React.ForwardedRef<SVGGElement | null>,
) {
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
});
