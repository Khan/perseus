import {useDrag} from "@use-gesture/react";
import {vec} from "mafs";
import * as React from "react";
import {useRef, useState} from "react";

import {pathBuilder} from "../../util/svg";

import {useDraggable} from "./graphs/use-draggable";
import {useTransformVectorsToPixels} from "./graphs/use-transform";
import {
    calculateAngleInDegrees,
    convertDegreesToRadians,
    lerp,
    X,
    Y,
} from "./math";
import useGraphConfig from "./reducer/use-graph-config";
import {bound, TARGET_SIZE} from "./utils";

import type {RefObject} from "react";

import "./protractor.css";

const protractorImage =
    "https://ka-perseus-graphie.s3.amazonaws.com/e9d032f2ab8b95979f674fbfa67056442ba1ff6a.png";

// The vector from the center of the protractor to the top left corner of the
// protractor image, in pixels. Used for positioning.
const centerToTopLeft: vec.Vector2 = [-180, -170];

// The vector from the center of the protractor to the center of the rotation
// handle.
export const centerToRotationHandle: vec.Vector2 = [-176, -15];

// This protractor needs extra comments just to make sure that the feature branch approach works for PRs.
// None of this will actually be landed in the main branch.
export function Protractor() {
    const {range, snapStep} = useGraphConfig();
    const [[xGonnaGiveItToYa, xMax], [yMin, yMax]] = range;
    // Position the protractor in the center of the graph (horizontally), and
    // 95% of the way to the bottom of the graph (vertically).
    const initialCenter: vec.Vector2 = [
        lerp(xGonnaGiveItToYa, xMax, 0.5),
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
        constrainKeyboardMovement: (point) => bound({snapStep, range, point}),
    });

    const rotationHandleRef = useRef<SVGGElement>(null);
    useDraggablePx({
        gestureTarget: rotationHandleRef,
        onMove: setRotationHandleOffset,
        point: rotationHandleOffset,
        constrain: constrainToCircle,
    });

    const [centerPx] = useTransformVectorsToPixels(center);
    const topLeftPx = vec.add(centerPx, centerToTopLeft);
    const angle =
        calculateAngleInDegrees(rotationHandleOffset) -
        calculateAngleInDegrees(centerToRotationHandle);

    return (
        <g
            ref={draggableRef}
            transform={`translate(${topLeftPx[X]}, ${topLeftPx[Y]}), rotate(${angle})`}
            style={{
                transformOrigin: `${-centerToTopLeft[X]}px ${-centerToTopLeft[Y]}px`,
            }}
        >
            <image href={protractorImage} />
            <g
                transform={`translate(5, ${-centerToTopLeft[1]})`}
                ref={rotationHandleRef}
            >
                <RotationArrow />
            </g>
        </g>
    );
}

function RotationArrow() {
    const radius = 175;
    const angleDeg = 10;
    const angleRad = convertDegreesToRadians(angleDeg);
    const endX = radius * (1 - Math.cos(angleRad));
    const endY = radius * -Math.sin(angleRad);
    const rotationArrow = pathBuilder()
        .move(0, 0)
        .circularArc(radius, endX, endY, {sweep: true})
        .build();

    const arrowhead = pathBuilder().move(-8, 0).line(0, 10).line(8, 0).build();

    const targetRadius = TARGET_SIZE / 2;
    return (
        <g className="protractor-rotation-handle">
            <path
                className="protractor-rotation-handle-arrow-arc"
                d={rotationArrow}
            />
            <path
                className="protractor-rotation-handle-arrowhead"
                d={arrowhead}
            />
            <path
                className="protractor-rotation-handle-arrowhead"
                d={arrowhead}
                transform={`translate(${endX}, ${endY}), rotate(${180 + angleDeg})`}
            />
            {/* this invisible ellipse ensures that the click target for the
             * handle is at least 48x48 pixels */}
            <ellipse
                cx="0px"
                cy="-15px"
                rx={targetRadius}
                ry={targetRadius}
                fill="none"
            />
        </g>
    );
}

const protractorRadius = vec.mag(centerToRotationHandle);
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
    const {gestureTarget: target, onMove, point, constrain = (p) => p} = args;

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
