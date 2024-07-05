import type {vec} from "mafs";

// This file contains helper functions for working with angles.
export function polar(r: number | vec.Vector2, th: number): vec.Vector2 {
    if (typeof r === "number") {
        r = [r, r];
    }
    th = (th * Math.PI) / 180;
    return [r[0] * Math.cos(th), r[1] * Math.sin(th)];
}

export const findAngle = (
    point1: vec.Vector2,
    point2: vec.Vector2,
    vertex?: vec.Vector2,
): number => {
    if (vertex === undefined) {
        const x = point1[0] - point2[0];
        const y = point1[1] - point2[1];
        if (!x && !y) {
            return 0;
        }
        return (180 + (Math.atan2(-y, -x) * 180) / Math.PI + 360) % 360;
    }
    return findAngle(point1, vertex) - findAngle(point2, vertex);
};
