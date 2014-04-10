/**
 * A work-in-progress of _ methods for objects.
 * That is, they take an object as a parameter,
 * and return an object instead of an array.
 */

/* Does a pluck on keys inside objects in an object
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
var pluck = exports.pluck = function(table, subKey) {
    return _.object(_.map(table, function(value, key) {
        return [key, value[subKey]];
    }));
};

