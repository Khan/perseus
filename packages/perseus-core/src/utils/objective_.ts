/**
 * _ utilities for objects
 */

import _ from "underscore";

/**
 * Does a pluck on keys inside objects in an object
 *
 * Ex:
 * tools = {
 *     translation: {
 *         enabled: true
 *     },
 *     rotation: {
 *         enabled: false
 *     }
 * };
 * pluckObject(tools, "enabled") returns {
 *     translation: true
 *     rotation: false
 * }
 */
export const pluck = function (table: any, subKey: string): any {
    return _.object(
        _.map(table, function (value, key) {
            return [key, value[subKey]];
        }),
    );
};

/**
 * Maps an object to an object
 *
 * > mapObject({a: '1', b: '2'}, (value, key) => {
 *       return value + 1;
 *   });
 * {a: 2, b: 3}
 */
export const mapObject = function <K extends string, V, U>(
    obj: Record<K, V>,
    lambda: (arg1: V, arg2: K) => U,
): Record<K, U> {
    const result: Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
        // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type 'K'.
        result[key] = lambda(obj[key], key);
    });
    return result;
};
