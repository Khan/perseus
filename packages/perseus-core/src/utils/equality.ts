import _ from "underscore";

/**
 * APPROXIMATE equality on numbers and primitives.
 */
export function approximateEqual<T>(x: T, y: T): boolean {
    if (typeof x === "number" && typeof y === "number") {
        return Math.abs(x - y) < 1e-9;
    }
    return x === y;
}

/**
 * Deep APPROXIMATE equality on primitives, numbers, arrays, and objects.
 * Recursive.
 */
export function approximateDeepEqual<T>(x: T, y: T): boolean {
    if (Array.isArray(x) && Array.isArray(y)) {
        if (x.length !== y.length) {
            return false;
        }
        for (let i = 0; i < x.length; i++) {
            if (!approximateDeepEqual(x[i], y[i])) {
                return false;
            }
        }
        return true;
    }
    if (Array.isArray(x) || Array.isArray(y)) {
        return false;
    }
    if (typeof x === "function" && typeof y === "function") {
        return approximateEqual(x, y);
    }
    if (typeof x === "function" || typeof y === "function") {
        return false;
    }
    if (typeof x === "object" && typeof y === "object" && !!x && !!y) {
        return (
            x === y ||
            (_.all(x, function (v, k) {
                // @ts-expect-error - TS2536 - Type 'CollectionKey<T>' cannot be used to index type 'T'.
                return approximateDeepEqual(y[k], v);
            }) &&
                _.all(y, function (v, k) {
                    // @ts-expect-error - TS2536 - Type 'CollectionKey<T>' cannot be used to index type 'T'.
                    return approximateDeepEqual(x[k], v);
                }))
        );
    }
    if ((typeof x === "object" && !!x) || (typeof y === "object" && !!y)) {
        return false;
    }
    return approximateEqual(x, y);
}
