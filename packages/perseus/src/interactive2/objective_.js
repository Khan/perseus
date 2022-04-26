// @flow
/**
 * A work-in-progress of _ methods for objects.
 * That is, they take an object as a parameter,
 * and return an object instead of an array.
 *
 * TODO(aria): Move this out of interactive2
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
const pluck = function (table: $FlowFixMe, subKey: string): $FlowFixMe {
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
const mapObject = function <K: string, V, U>(
    obj: {|[K]: V|},
    lambda: (V, K) => U,
): {|[K]: U|} {
    const result = {};
    _.each(_.keys(obj), function (key) {
        result[key] = lambda(obj[key], key);
    });
    return result;
};

/**
 * Maps an array to an object
 *
 * > mapObjectFromArray(['a', 'b'], function(elem) {
 *       return elem + elem;
 *   });
 * {a: 'aa', b: 'bb'}
 */
const mapObjectFromArray = function <K: string, V>(
    arr: $ReadOnlyArray<K>,
    lambda: (K) => V,
): {|[K]: V|} {
    const result = {};
    _.each(arr, function (elem) {
        result[elem] = lambda(elem);
    });
    return result;
};

export default {
    pluck: pluck,
    mapObject: mapObject,
    mapObjectFromArray: mapObjectFromArray,
};
