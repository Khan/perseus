/**
 * A system for tracking gesture velocity in a single dimension.
 *
 * Velocity is computed by smoothing linearly over the gestures that have
 * occurred in the last 100 milliseconds.
 */

const now = require("performance-now");

class VelocityTracker {
    constructor(options) {
        this.options = {
            velocityTimeout: 100,
            ...options,
        };
        this._events = [];
    }

    /**
     * Pushes an event with the given displacement onto the event buffer,
     * associating it with a timestamp. Note that, as this method computes the
     * timestamp for the event at calltime, it should be called immediately
     * after the event occurs.
     *
     * @param {number} x - the cumulative displacement of the event
     */
    push(x) {
        this._events.push({
            x,
            t: now(),
        });
    }

    /**
     * Compute the velocity with respect to the events that have been tracked
     * by the system. Velocity is computed by smoothing linearly over recent
     * displacement values.
     *
     * Note that, for performance reasons, a call to `getVelocity` will clear
     * out the event buffer. As such, repeated calls will not return the same
     * value (in particular, a second call in quick succession will return 0).
     *
     * @returns {number} the velocity associated with the tracker
     */
    getVelocity() {
        const events = this._getEvents();

        if (events.length < 2) {
            return 0;
        } else {
            const current = events[events.length - 1];
            const first = events[0];
            const dt = current.t - first.t;
            return (current.x - first.x) / dt;
        }
    }

    /**
     * Filter the tracked events to exclude any events that occurred too far in
     * the past, and reset the event buffer.
     *
     * @returns {number[]} an array of displacements corresponding to events
     *                     that occurred in the past `velocityTimeout`
     *                     milliseconds
     */
    _getEvents() {
        const threshold = now() - this.options.velocityTimeout;
        const recentEvents = this._events.filter((event) => {
            return event.t > threshold;
        });
        this._events = [];
        return recentEvents;
    }
}

module.exports = VelocityTracker;
