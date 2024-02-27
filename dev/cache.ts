// Returns a cached version of the given function. This makes many simplifying
// assumptions:
// - The given function should take a single argument
// - Only one value is cached - the return value of the most recent call
// - The cache is used if the argument is identical (===) to the argument from
//   the previous call.
export function cache<A, O>(f: (arg: A) => O): (arg: A) => O {
    let cache: undefined | {arg: A; result: O};
    return (arg) => {
        if (cache == null || arg !== cache.arg) {
            cache = {arg, result: f(arg)};
        }
        return cache.result;
    };
}
