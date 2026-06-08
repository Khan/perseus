import * as React from "react";

import useGraphConfig from "../../../reducer/use-graph-config";
import {useControlPoint} from "../use-control-point";

import {Line} from "./line";
import {getMovableLineKeyboardConstraint} from "./util";

import type {AriaLive} from "../../../types";
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
    // Temporary property to override the internally-managed aria-live for the line and
    // both endpoints.
    // TODO(LEMS-4189): Remove once every line-like graph emits its move through
    // the WB Announcer and the internal aria-live state machine is deleted.
    ariaLive?: AriaLive;
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
        ariaLive,
        extend,
        onMoveLine = () => {},
        onMovePoint = () => {},
    } = props;

    const {snapStep} = useGraphConfig();

    // Aria live states for (0) point 1, (1) point 2, and (2) grab handle.
    // When moving an element, set its aria live to "polite" and the others
    // to "off". Otherwise, other connected elements that move at the same
    // time might override the currently focused element's aria live.
    const [ariaLives, setAriaLives] = React.useState<Array<AriaLive>>([
        "off",
        "off",
        "off",
    ]);

    // A caller-provided aria-live (e.g. "off" from the linear graph) takes
    // precedence over the internal state machine above for all three elements.
    const point1AriaLive = ariaLive ?? ariaLives[0];
    const point2AriaLive = ariaLive ?? ariaLives[1];
    const lineAriaLive = ariaLive ?? ariaLives[2];

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
            ariaLive: point1AriaLive,
            point: start,
            sequenceNumber: 1,
            onMove: (p) => {
                setAriaLives(["polite", "off", "off"]);
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
            ariaLive: point2AriaLive,
            point: end,
            sequenceNumber: 2,
            onMove: (p) => {
                setAriaLives(["off", "polite", "off"]);
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
            ariaLive={lineAriaLive}
            start={start}
            end={end}
            extend={extend}
            onMove={(newStart) => {
                setAriaLives(["off", "off", "polite"]);
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
