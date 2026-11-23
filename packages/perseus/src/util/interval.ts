// type Interval represents a closed interval.
// (see: https://en.wikipedia.org/wiki/Interval_(mathematics))

import invariant from "tiny-invariant";

export type Interval = [min: number, max: number];

export function intervalSize([min, max]: Interval): number {
    invariant(min <= max, "Invalid interval");
    return max - min;
}

/**
 * Expands the given interval by a positive `amount` on both ends.
 */
export function expand([min, max]: Interval, amount: number): Interval {
    invariant(min <= max, "Invalid interval");
    invariant(amount >= 0, "expand: amount must not be negative");
    return [min - amount, max + amount];
}
