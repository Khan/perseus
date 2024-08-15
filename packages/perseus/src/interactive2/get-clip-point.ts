import {vector as kvector} from "@khanacademy/kmath";

import type {Coord} from "./types";

// Given `coord` and `angle`, find the point where a line extended
// from `coord` in the direction of `angle` would be clipped by the
// edge of the graphie canvas.
export const getClipPoint = function (graph, coord: Coord, angle: number) {
    // Actually put the arrowheads 4px from the edge so they have
    // a bit of room
    const xExtent = graph.range[0][1] - graph.range[0][0];
    const yExtent = graph.range[1][1] - graph.range[1][0];

    // shoot a point off into the distance ...
    const distance = xExtent + yExtent;
    // we need to scale the point according to the scale of the axes
    const angleVec = graph.unscaleVector(kvector.cartFromPolarDeg(1, angle));
    const distVec = kvector.scale(kvector.normalize(angleVec), distance);
    const farCoord = kvector.add(coord, distVec);
    const scaledAngle = kvector.polarDegFromCart(angleVec)[1];
    // ... and then bring it back
    const clipPoint = graph.constrainToBoundsOnAngle(
        farCoord,
        4,
        (scaledAngle * Math.PI) / 180,
    );
    return clipPoint;
};
