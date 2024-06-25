import {useTransformContext, vec} from "mafs";
import * as React from "react";
import {RefObject, useRef, useState} from "react";

import {useDraggable} from "../graphs/use-draggable";
import {centerToRotationHandle, Protractor} from "./protractor";
import useGraphConfig from "../reducer/use-graph-config";
import {bound} from "../utils";
import {useDrag} from "@use-gesture/react";

export function StatefulProtractor() {
    const {range, snapStep} = useGraphConfig();
    const [[xMin, xMax], [yMin, yMax]] = range;
    // Position the protractor in the center of the graph (horizontally), and
    // 95% of the way to the bottom of the graph (vertically).
    const initialCenter: vec.Vector2 = [
        lerp(xMin, xMax, 0.5),
        lerp(yMin, yMax, 0.05),
    ];
    const [center, setCenter] = useState<vec.Vector2>(initialCenter);
    const [rotationHandleOffset, setRotationHandleOffset] =
        useState<vec.Vector2>(centerToRotationHandle);

    const draggableRef = useRef<SVGGElement>(null);
    useDraggable({
        gestureTarget: draggableRef,
        onMove: setCenter,
        point: center,
        constrain: (point) => bound({snapStep, range, point}),
    });

    const rotationHandleRef = useRef<SVGGElement>(null);
    useDraggablePx({
        gestureTarget: rotationHandleRef,
        onMove: (pointPx) => setRotationHandleOffset(pointPx),
        point: rotationHandleOffset,
        constrain: constrainToCircle,
    });

    return (
        <g ref={draggableRef}>
            <Protractor
                rotationHandleRef={rotationHandleRef}
                rotationHandleOffset={rotationHandleOffset}
                center={center}
            />
        </g>
    );
}

const protractorRadius = vec.mag(centerToRotationHandle)
function constrainToCircle(edgePoint: vec.Vector2) {
    return vec.withMag(edgePoint, protractorRadius);
}

/* The implementation of useDraggablePx is derived from
 * https://github.com/stevenpetryk/mafs/blob/4520319379a2cc2df8148d8baaef1f85db117103/src/interaction/useMovable.tsx#L20-L83
 * and copied here under the terms of the MIT license.
 *
 * Copyright 2021 Steven Petryk
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */
function useDraggablePx(args: {
    gestureTarget: RefObject<Element>;
    onMove?: (point: vec.Vector2) => unknown;
    point: vec.Vector2;
    constrain?: (point: vec.Vector2) => vec.Vector2;
}): void {
    const {
        gestureTarget: target,
        onMove,
        point,
        constrain = (p) => p,
    } = args;

    const pickupPx = React.useRef<vec.Vector2>([0, 0]);

    useDrag(
        (state) => {
            const {event, first, movement: pixelMovement} = state;
            event?.stopPropagation();

            if (first) {
                pickupPx.current = point;
            }
            if (vec.mag(pixelMovement) === 0) {
                return;
            }

            onMove?.(constrain(vec.add(pickupPx.current, pixelMovement)));
        },
        {target, eventOptions: {passive: false}},
    );
}

// [L]inear Int[erp]olation: gets the weighted average of two values `a` and
// `b`, with the given `fraction` specifying how much weight `a` and `b` get:
// - if `fraction` is 0, `lerp` returns `a`.
// - if `fraction` is 0.5, `lerp` returns the average of `a` and `b`.
// - if `fraction` is 1, `lerp` returns `b`.
function lerp(a: number, b: number, fraction: number): number {
    return (b - a) * fraction + a;
}
