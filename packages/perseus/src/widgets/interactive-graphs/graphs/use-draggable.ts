import {useDrag} from "@use-gesture/react";
import {useTransformContext, vec} from "mafs";
import * as React from "react";
import invariant from "tiny-invariant";

import {X, Y} from "../math";
import useGraphConfig from "../reducer/use-graph-config";

import type {RefObject} from "react";

/**
 * Code in this file is derived from
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

export type Params = {
    gestureTarget: RefObject<Element>;
    onMove: (point: vec.Vector2) => unknown;
    point: vec.Vector2;
    constrain: (point: vec.Vector2) => vec.Vector2;
};

type DragState = {
    dragging: boolean;
};

export function useDraggable(args: Params): DragState {
    const {gestureTarget: target, onMove, point, constrain} = args;
    const [dragging, setDragging] = React.useState(false);
    const {xSpan, ySpan} = useSpanContext();
    const {viewTransform, userTransform} = useTransformContext();

    const inverseViewTransform = vec.matrixInvert(viewTransform);
    invariant(inverseViewTransform, "The view transform must be invertible.");

    const inverseTransform = React.useMemo(
        () => getInverseTransform(userTransform),
        [userTransform],
    );

    const pickup = React.useRef<vec.Vector2>([0, 0]);

    useDrag(
        (state) => {
            const {type, event} = state;
            event?.stopPropagation();

            const isKeyboard = type.includes("key");
            if (isKeyboard) {
                event?.preventDefault();

                // When a key is held down, we see multiple "keydown" events,
                // followed by a single "keyup" event.
                // For a single keypress, we only see a "keydown" event, no
                // "keyup".
                // We never want to process the keyup event as an intent to
                // move so we bail on further processing here.
                if (type === "keyup") {
                    return;
                }

                const {
                    direction: yDownDirection,
                    altKey,
                    metaKey,
                    shiftKey,
                } = state;

                const direction = [
                    yDownDirection[X],
                    -yDownDirection[Y],
                ] as vec.Vector2;
                const span = Math.abs(direction[X]) ? xSpan : ySpan;

                let divisions = 50;
                if (altKey || metaKey) {
                    divisions = 200;
                }
                if (shiftKey) {
                    divisions = 10;
                }

                const min = span / (divisions * 2);
                const tests = range(
                    span / divisions,
                    span / 2,
                    span / divisions,
                );

                for (const dx of tests) {
                    // Transform the test back into the point's coordinate system
                    const testMovement = vec.scale(direction, dx);
                    const testPoint = constrain(
                        vec.transform(
                            vec.add(
                                vec.transform(point, userTransform),
                                testMovement,
                            ),
                            inverseTransform,
                        ),
                    );

                    if (vec.dist(testPoint, point) > min) {
                        onMove(testPoint);
                        break;
                    }
                }
            } else {
                const {last, movement: pixelMovement, first} = state;

                setDragging(!last);

                if (first) {
                    pickup.current = vec.transform(point, userTransform);
                }
                if (vec.mag(pixelMovement) === 0) {
                    return;
                }

                const movement = vec.transform(
                    pixelMovement,
                    inverseViewTransform,
                );
                onMove(
                    constrain(
                        vec.transform(
                            vec.add(pickup.current, movement),
                            inverseTransform,
                        ),
                    ),
                );
            }
        },
        {target, eventOptions: {passive: false}},
    );
    return {dragging};
}

function getInverseTransform(transform: vec.Matrix) {
    const invert = vec.matrixInvert(transform);
    invariant(
        invert !== null,
        "Could not invert transform matrix. A parent transformation matrix might be degenerative (mapping 2D space to a line).",
    );
    return invert;
}

function useSpanContext() {
    const {
        range: [[xMin, xMax], [yMin, yMax]],
    } = useGraphConfig();
    const xSpan = xMax - xMin;
    const ySpan = yMax - yMin;
    return {xSpan, ySpan};
}

function range(min: number, max: number, step = 1): number[] {
    const result: number[] = [];
    for (let i = min; i < max - step / 2; i += step) {
        result.push(i);
    }

    const computedMax = result[result.length - 1] + step;
    if (Math.abs(max - computedMax) < step / 1e-6) {
        result.push(max);
    } else {
        result.push(computedMax);
    }

    return result;
}
