import {vector as kvector} from "@khanacademy/kmath";
import _ from "underscore";

import KhanMath from "../util/math";

import {getClipPoint} from "./get-clip-point";
import WrappedPath from "./wrapped-path";

import type {Coord} from "./types";
import type {Graphie} from "../util/graphie";

export class Arrowhead extends WrappedPath {
    private static scale = 1.4;
    center: Coord;

    constructor(graphie: Graphie, style: any) {
        // Points that define the arrowhead
        const center: Coord = [0.75, 0];

        const points: Coord[] = (
            [
                [-3, 4],
                [-2.75, 2.5],
                [0, 0.25],
                center,
                [0, -0.25],
                [-2.75, -2.5],
                [-3, -4],
            ] satisfies Coord[]
        ).map((point: Coord) => {
            // Scale points by `Arrowhead.scale` around `center`
            const pv = kvector.subtract(point, center);
            const pvScaled = kvector.scale(pv, Arrowhead.scale);
            return kvector.add(center, pvScaled);
        });

        const unscaledPoints = points.map(graphie.unscalePoint);

        super(graphie, unscaledPoints, {
            center: graphie.unscalePoint(center),
            createPath: createCubicPath,
        });

        this.center = center;
        this.attr(
            _.extend(
                {
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round",
                    "stroke-dasharray": "",
                },
                style,
            ),
        );
    }

    toCoordAtAngle(coord: Coord, angle: number) {
        const clipPoint = this.graphie.scalePoint(
            getClipPoint(this.graphie, coord, angle),
        );
        this.transform(
            "translateX(" +
                (clipPoint[0] + Arrowhead.scale * this.center[0]) +
                "px) " +
                "translateY(" +
                (clipPoint[1] + Arrowhead.scale * this.center[1]) +
                "px) " +
                "translateZ(0) " +
                "rotate(" +
                (360 - KhanMath.bound(angle)) +
                "deg)",
        );
    }
}

// We can't just pass in a path to `graph.fixedPath` as we need to modify
// the points in some way, so instead we provide a function for creating
// the path once the points have been transformed
const createCubicPath = function (points: Coord[]): string {
    let path = "M" + points[0][0] + " " + points[0][1];
    for (let i = 1; i < points.length; i += 3) {
        path +=
            "C" +
            points[i][0] +
            " " +
            points[i][1] +
            " " +
            points[i + 1][0] +
            " " +
            points[i + 1][1] +
            " " +
            points[i + 2][0] +
            " " +
            points[i + 2][1];
    }
    return path;
};
