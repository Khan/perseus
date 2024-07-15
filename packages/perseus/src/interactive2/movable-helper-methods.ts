/* eslint-disable @babel/no-invalid-this */
/**
 * MovableThing convenience methods
 *
 * Usually added to a Movable* class through
 * InteractiveUtils.addMovableHelperMethodsTo(), but these implementations
 * are simply for convenience.
 */

import {point as kpoint} from "@khanacademy/kmath";
import {PerseusError, Errors} from "@khanacademy/perseus-core";
import _ from "underscore";

/* Local helper methods. */

function getKey(eventName: any, id: any) {
    return eventName + ":" + id;
}

function getEventName(key) {
    return key.split(":")[0];
}

const MovableHelperMethods: any = {
    /**
     * Fire an onSomething type event to all functions in listeners
     */
    _fireEvent: function <F extends (...args: any[]) => any>(
        listeners: F[],
        ...args: Parameters<F>
    ) {
        for (const listener of listeners) {
            listener.call(this, ...args);
        }
    },

    /**
     * Combine the array of constraints functions
     * Returns either an [x, y] coordinate or false
     */
    _applyConstraints: function (current, previous, extraOptions) {
        let skipRemaining = false;

        return _.reduce(
            this.state.constraints,
            (memo, constraint) => {
                // A move that has been cancelled won't be propagated to later
                // constraints calls
                if (memo === false) {
                    return false;
                }

                if (skipRemaining) {
                    return memo;
                }

                const result = constraint.call(this, memo, previous, {
                    onSkipRemaining: () => {
                        skipRemaining = true;
                    },
                    ...extraOptions,
                });

                if (result === false) {
                    // Returning false cancels the move
                    return false;
                }
                if (kpoint.is(result, 2)) {
                    // Returning a coord from constraints overrides the move
                    return result;
                }
                if (result === true || result == null) {
                    // Returning true or undefined allow the move to occur
                    return memo;
                }
                // Anything else is an error
                throw new PerseusError(
                    "Constraint returned invalid result: " + result,
                    Errors.Internal,
                );
            },
            current,
            this,
        );
    },

    /**
     * Call all draw functions, and update our prevState for the next
     * draw function
     */
    draw: function () {
        const currState = this.cloneState();
        MovableHelperMethods._fireEvent.call(
            this,
            this.state.draw,
            currState,
            this.prevState,
        );
        this.prevState = currState;
    },

    /**
     * Add a listener to any event: startMove, constraints, onMove, onMoveEnd,
     * etc. If a listener is already bound to the given eventName and id, then
     * it is overwritten by func.
     *
     * eventName: the string name of the event to listen to. one of:
     *   "onMoveStart", "onMove", "onMoveEnd", "draw", "remove"
     *
     * id: a string id that can be used to remove this event at a later time
     *   note: adding multiple listeners with the same id is undefined behavior
     *
     * func: the function to call when the event happens, which is called
     *   with the event's standard parameters [usually (coord, prevCoord) or
     *   (state, prevState)]
     */
    listen: function (eventName, id, func) {
        this._listenerMap = this._listenerMap || {};

        // If there's an existing handler, replace it by using its index in
        // `this.state[eventName]`; otherwise, add this handler to the end
        const key = getKey(eventName, id);
        const index = (this._listenerMap[key] =
            this._listenerMap[key] || this.state[eventName].length);
        this.state[eventName][index] = func;
    },

    /**
     * Remove a previously added listener, by the id specified in the
     * corresponding listen() call
     *
     * If the given id has not been registered already, this is a no-op
     */
    unlisten: function (eventName, id) {
        this._listenerMap = this._listenerMap || {};

        const key = getKey(eventName, id);
        const index = this._listenerMap[key];
        if (index !== undefined) {
            // Remove handler from list of event handlers and listenerMap
            this.state[eventName].splice(index, 1);
            delete this._listenerMap[key];

            // Re-index existing events: if they occur after `index`, decrement
            const keys = _.keys(this._listenerMap);
            _.each(
                keys,
                function (key) {
                    if (
                        getEventName(key) === eventName &&
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        this._listenerMap[key] > index
                    ) {
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        this._listenerMap[key]--;
                    }
                },
                this,
            );
        }
    },
};

export default MovableHelperMethods;
