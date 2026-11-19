// type Interval represents a closed interval.
// (see: https://en.wikipedia.org/wiki/Interval_(mathematics))

import invariant from "tiny-invariant";

export type Interval = [min: number, max: number];

const MIN = 0;
const MAX = 1;

/**
 * Finds the intersection of two intervals (sets of numbers defined by a min
 * and a max). The endpoints of both intervals are included. Returns null if
 * the intervals do not overlap.
 */
export function intersectIntervals(a: Interval, b: Interval): Interval | null {
    invariant(a[MIN] <= a[MAX], "Invalid interval");
    invariant(b[MIN] <= b[MAX], "Invalid interval");
    if (a[MAX] < b[MIN] || a[MIN] > b[MAX]) {
        return null;
    }

    const min = Math.max(a[MIN], b[MIN]);
    const max = Math.min(a[MAX], b[MAX]);
    return [min, max];
}

export function intervalSize([min, max]: Interval): number {
    invariant(min <= max, "Invalid interval");
    return max - min;
}

/**
 * Expands the given interval by `amount` on both ends.
 */
export function expand([min, max]: Interval, amount: number): Interval {
    invariant(min <= max, "Invalid interval");
    return [min - amount, max + amount];
}
