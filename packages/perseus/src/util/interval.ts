// type Interval represents a closed interval.
// (see: https://en.wikipedia.org/wiki/Interval_(mathematics))

// We define Interval as an opaque type to avoid confusion with 2D points
// and vectors, which are also [number, number].

declare const UniqueTag: unique symbol;
export type Interval = [number, number] & typeof UniqueTag

export function createInterval(min: number, max: number): Interval {
    // TODO(benchristel): throw if max < min?
    return [min, max] as Interval;
}

export function size(interval: Interval): number {
    return interval[1] - interval[0];
}
