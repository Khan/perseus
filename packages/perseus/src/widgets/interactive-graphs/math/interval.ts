import type {Interval} from "mafs";

// Use MIN and MAX to index into arrays that represent intervals.
// e.g. range[MAX]
export const MIN = 0;
export const MAX = 1;

export function size([min, max]: Interval): number {
    return max - min;
}
