import type {Interval} from "mafs";

// Use MIN and MAX to index into arrays that represent intervals.
// e.g. range[MAX]
export const MIN = 0;
export const MAX = 1;

export function size([min, max]: Interval): number {
    return max - min;
}

// Removes an equal amount from each end of the interval.
//
// If the given amount cannot be removed (because the interval is too small),
// half the interval's size is removed from each end instead, so the interval
// ends up with size = 0, and both MAX and MIN equal to its former midpoint.
//
// If `amount` is negative, the interval is expanded instead.
export function trim(amount: number, interval: Interval): Interval {
    if (amount * 2 > size(interval)) {
        const middle = average(...interval);
        return [middle, middle];
    }
    return [interval[MIN] + amount, interval[MAX] - amount];
}

function average(a: number, b: number): number {
    return (a + b) / 2;
}
