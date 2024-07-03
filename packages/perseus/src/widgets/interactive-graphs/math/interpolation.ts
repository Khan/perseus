// [L]inear Int[erp]olation: gets the weighted average of two values `a` and
// `b`, with the given `fraction` specifying how much weight `a` and `b` get:
// - if `fraction` is 0, `lerp` returns `a`.
// - if `fraction` is 0.5, `lerp` returns the average of `a` and `b`.
// - if `fraction` is 1, `lerp` returns `b`.
export function lerp(a: number, b: number, fraction: number): number {
    return (b - a) * fraction + a;
}
