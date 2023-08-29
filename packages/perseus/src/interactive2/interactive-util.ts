/**
 * Utility functions for writing Interactive2 movablethings
 */

import _ from "underscore";

import {Errors} from "../logging/log";
import {PerseusError} from "../perseus-error";

import MovableHelperMethods from "./movable-helper-methods";

/**
 * Compute the correct vendor-prefixed `transform`.
 */
let prefixedTransform = null;
function computePrefixedTransform(): string | null | undefined {
    // Temporary element for testing prefix validity
    const el = document.createElement("div");

    const prefixes = [
        "transform",
        "msTransform",
        "MozTransform",
        "WebkitTransform",
        "OTransform",
    ];
    let correctPrefix = null;
    _.each(prefixes, function (prefix) {
        if (typeof el.style[prefix] !== "undefined") {
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'null'.
            correctPrefix = prefix;
        }
    });

    return correctPrefix;
}

/**
 * Compute whether the browser can use 3d transforms by trying to use the
 * translateZ transformation.
 */
let canUse3dTransform = null;
function computeCanUse3dTransform(): boolean {
    const el = document.createElement("div");

    const prefix = InteractiveUtil.getPrefixedTransform();

    // Prefix could be null.
    // @ts-expect-error - TS2538 - Type 'null' cannot be used as an index type. | TS2538 - Type 'undefined' cannot be used as an index type.
    el.style[prefix] = "translateZ(0px)";
    // @ts-expect-error - TS2538 - Type 'null' cannot be used as an index type. | TS2538 - Type 'undefined' cannot be used as an index type.
    return !!el.style[prefix];
}

const InteractiveUtil = {
    assert: function (isTrue: boolean, message?: string) {
        if (!isTrue) {
            throw new PerseusError(
                "Assertion Error" + (message ? ": " + message : ""),
                Errors.Internal,
            );
        }
    },

    /**
     * Create getters for this.state, based on the default state, `defaults`
     */
    createGettersFor: function (Class: any, defaults: Record<any, any>) {
        _.each(_.keys(defaults), function (key) {
            if (Class.prototype[key] === undefined) {
                Class.prototype[key] = function () {
                    return this.state[key];
                };
            }
        });
    },

    /**
     * Add MovableHelperMethods methods to a MovableThing class
     */
    addMovableHelperMethodsTo: function (Class: any) {
        _.each(MovableHelperMethods, function (methodFunc, methodName) {
            if (Class.prototype[methodName] === undefined) {
                Class.prototype[methodName] = methodFunc;
            }
        });
    },

    /**
     * Turn a function or an array of functions into an array of functions
     */
    arrayify: function (
        funcOrArray:
            | ((...args: ReadonlyArray<unknown>) => unknown)
            | ReadonlyArray<unknown>,
    ): ReadonlyArray<unknown> {
        if (funcOrArray == null) {
            return [];
        }
        if (_.isArray(funcOrArray)) {
            return _.filter(_.flatten(funcOrArray), _.identity);
        }
        return [funcOrArray];
    },

    /**
     * Convert all function-or-array arguments to arrays of functions
     */
    normalizeOptions: function (
        arrayOptionNames: ReadonlyArray<string>,
        options: Record<any, any>,
    ): Record<any, any> {
        // TODO(jack): Having to clone here is annoying; this
        // function should really just modify this.state in place
        // (and maybe be a function on MovableHelperMethods to get access
        // to this.state), which would also be nicer because we could
        // normalizeOptions once in this.modify
        const result = _.clone(options);
        _.each(arrayOptionNames, function (eventName) {
            const funcOrArray = options[eventName];
            // Only propagate values which were set; not present values
            // shouldn't be added to options because we'd like them to
            // fall through to defaults
            if (funcOrArray !== undefined) {
                const funcArray = InteractiveUtil.arrayify(funcOrArray);
                result[eventName] = funcArray;
            }
        });
        return result;
    },

    /**
     * Get the correct vendor-prefixed `transform`.
     */
    getPrefixedTransform: function (): string | null | undefined {
        // Cache result to avoid re-computation
        // @ts-expect-error - TS2322 - Type 'string | null | undefined' is not assignable to type 'null'.
        prefixedTransform = prefixedTransform || computePrefixedTransform();
        return prefixedTransform;
    },

    /**
     * Get whether the browser can use 3d transforms.
     */
    getCanUse3dTransform: function (): boolean {
        if (canUse3dTransform == null) {
            // @ts-expect-error - TS2322 - Type 'boolean' is not assignable to type 'null'.
            canUse3dTransform = computeCanUse3dTransform();
        }
        // @ts-expect-error - TS2322 - Type 'null' is not assignable to type 'boolean'.
        return canUse3dTransform;
    },
} as const;

export default InteractiveUtil;
