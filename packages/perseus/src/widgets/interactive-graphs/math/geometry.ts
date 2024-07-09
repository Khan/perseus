import type {vec} from "mafs";

export type Segment = [vec.Vector2, vec.Vector2];

// https://stackoverflow.com/a/24392281/7347484
export const segmentsIntersect = (
    [[a, b], [c, d]]: Segment,
    [[p, q], [r, s]]: Segment,
) => {
    const determinant = (c - a) * (s - q) - (r - p) * (d - b);
    if (determinant === 0) {
        return false;
    } else {
        const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / determinant;
        const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / determinant;
        return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
    }
};
