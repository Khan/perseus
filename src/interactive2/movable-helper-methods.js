/**
 * MovableThing convenience methods
 *
 * Usually added to a Movable* class through
 * InteractiveUtils.addMovableHelperMethodsTo(), but these implementations
 * are simply for convenience.
 */

var _ = require("underscore");
var kpoint = require("kmath").point;

/* Local helper methods. */

function getKey(eventName, id) {
    return eventName + ":" + id;
}

function getEventName(key) {
    return key.split(":")[0];
}

var MovableHelperMethods = {
    /**
     * Fire an onSomething type event to all functions in listeners
     */
    _fireEvent: function(listeners, currentValue, previousValue) {
        _.invoke(listeners, "call", this, currentValue, previousValue);
    },

    /**
     * Combine the array of constraints functions
     * Returns either an [x, y] coordinate or false
     */
    _applyConstraints: function(current, previous) {
        return _.reduce(this.state.constraints, function(memo, constraint) {
            // A move that has been cancelled won't be propagated to later
            // constraints calls
            if (memo === false) {
                return false;
            }

            var result = constraint.call(this, memo, previous);
            if (result === false) {
                // Returning false cancels the move
                return false;

            } else if (kpoint.is(result, 2)) {
                // Returning a coord from constraints overrides the move
                return result;

            } else if (result === true || result == null) {
                // Returning true or undefined allow the move to occur
                return memo;

            } else {
                // Anything else is an error
                throw new Error("Constraint returned invalid result: " +
                        result);
            }
        }, current, this);
    },

    /**
     * Call all draw functions, and update our prevState for the next
     * draw function
     */
    draw: function() {
        var currState = this.cloneState();
        MovableHelperMethods._fireEvent.call(this,
            this.state.draw,
            currState,
            this.prevState
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
    listen: function(eventName, id, func) {
        this._listenerMap = this._listenerMap || {};

        // If there's an existing handler, replace it by using its index in
        // `this.state[eventName]`; otherwise, add this handler to the end
        var key = getKey(eventName, id);
        var index = this._listenerMap[key] =
                this._listenerMap[key] || this.state[eventName].length;
        this.state[eventName][index] = func;
    },

    /**
     * Remove a previously added listener, by the id specified in the
     * corresponding listen() call
     *
     * If the given id has not been registered already, this is a no-op
     */
    unlisten: function(eventName, id) {
        this._listenerMap = this._listenerMap || {};

        var key = getKey(eventName, id);
        var index = this._listenerMap[key];
        if (index !== undefined) {
            // Remove handler from list of event handlers and listenerMap
            this.state[eventName].splice(index, 1);
            delete this._listenerMap[key];

            // Re-index existing events: if they occur after `index`, decrement
            var keys = _.keys(this._listenerMap);
            _.each(keys, function(key) {
                if (getEventName(key) === eventName &&
                        this._listenerMap[key] > index) {
                    this._listenerMap[key]--;
                }
            }, this);
        }
    }
};

module.exports = MovableHelperMethods;
