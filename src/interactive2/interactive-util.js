/**
 * Utility functions for writing Interactive2 movablethings
 */

var MovableHelperMethods = require("./movable-helper-methods.js");

var InteractiveUtil = {
    assert: function(isTrue, message) {
        if (!isTrue) {
            throw new Error("Assertion Error" +
                    (message ? ": " + message : ""));
        }
    },

    /**
     * Create getters for this.state, based on the default state, `defaults`
     */
    createGettersFor: function(Class, defaults) {
        _.each(_.keys(defaults), function(key) {
            if (Class.prototype[key] === undefined) {
                Class.prototype[key] = function() {
                    return this.state[key];
                };
            }
        });
    },

    /**
     * Add MovableHelperMethods methods to a MovableThing class
     */
    addMovableHelperMethodsTo: function(Class) {
        _.each(MovableHelperMethods, function(methodFunc, methodName) {
            if (Class.prototype[methodName] === undefined) {
                Class.prototype[methodName] = methodFunc;
            }
        });
    },

    /**
     * Turn a function or an array of functions into an array of functions
     */
    arrayify: function(funcOrArray) {
        if (!funcOrArray) {
            return undefined;
        } else if (_.isArray(funcOrArray)) {
            return _.filter(_.flatten(funcOrArray), _.identity);
        } else {
            return [funcOrArray];
        }
    },

    /**
     * Convert all function-or-array arguments to arrays of functions
     */
    normalizeOptions: function(arrayOptionNames, options) {
        var result = _.clone(options);
        _.each(arrayOptionNames, function(eventName) {
            var funcArray = InteractiveUtil.arrayify(options[eventName]);
            if (funcArray) {
                result[eventName] = funcArray;
            }
        });
        return result;
    }
};

module.exports = InteractiveUtil;
