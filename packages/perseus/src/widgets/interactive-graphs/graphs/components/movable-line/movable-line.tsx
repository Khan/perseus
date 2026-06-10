import * as React from "react";

import useGraphConfig from "../../../reducer/use-graph-config";
import {useControlPoint} from "../use-control-point";

import {Line} from "./line";
import {getMovableLineKeyboardConstraint} from "./util";

import type {vec} from "mafs";

export interface MovableLineProps {
    points: Readonly<[vec.Vector2, vec.Vector2]>;
    ariaLabels?: {
        point1AriaLabel?: string;
        point2AriaLabel?: string;
        grabHandleAriaLabel?: string;
    };
    // Extra graph information to be read by screen readers
    ariaDescribedBy?: string;
    /* Extends the line to the edge of the graph with an arrow */
    extend?: {
        start: boolean;
        end: boolean;
    };
    onMovePoint?: (endpointIndex: number, destination: vec.Vector2) => unknown;
    onMoveLine?: (newStart: vec.Vector2) => unknown;
}

export const MovableLine = (props: MovableLineProps) => {
    const {
        points: [start, end],
        ariaLabels,
        ariaDescribedBy,
        extend,
        onMoveLine = () => {},
        onMovePoint = () => {},
    } = props;

    const {snapStep} = useGraphConfig();

    // We use separate focusableHandle elements, instead of letting the movable
    // points themselves be focusable, to allow the tab order of the points to
    // be different from the rendering order. We had to solve for the following
    // constraints:
    // - SVG has no equivalent of z-index, so the order of elements in the
    //   document determines the order in which they're painted. We want the
    //   movable line segment to render behind its endpoints (it looks weird
    //   otherwise) so we have to render the line first.
    // - There isn't a browser-native way to customize tab order, other than
    //   setting tabindex > 0. But that bumps elements to the front of the
    //   tab order for the entire page, which is not what we want.
    const {visiblePoint: visiblePoint1, focusableHandle: focusableHandle1} =
        useControlPoint({
            ariaLabel: ariaLabels?.point1AriaLabel,
            ariaDescribedBy: ariaDescribedBy,
            point: start,
            sequenceNumber: 1,
            onMove: (p) => {
                onMovePoint(0, p);
            },
            constrain: getMovableLineKeyboardConstraint(
                [start, end],
                snapStep,
                0,
            ),
        });
    const {visiblePoint: visiblePoint2, focusableHandle: focusableHandle2} =
        useControlPoint({
            ariaLabel: ariaLabels?.point2AriaLabel,
            ariaDescribedBy: ariaDescribedBy,
            point: end,
            sequenceNumber: 2,
            onMove: (p) => {
                onMovePoint(1, p);
            },
            constrain: getMovableLineKeyboardConstraint(
                [start, end],
                snapStep,
                1,
            ),
        });

    const line = (
        <Line
            ariaLabel={ariaLabels?.grabHandleAriaLabel}
            ariaDescribedBy={ariaDescribedBy}
            start={start}
            end={end}
            extend={extend}
            onMove={(newStart) => {
                onMoveLine(newStart);
            }}
        />
    );

    return (
        <>
            {focusableHandle1}
            {line}
            {focusableHandle2}
            {visiblePoint1}
            {visiblePoint2}
        </>
    );
};
