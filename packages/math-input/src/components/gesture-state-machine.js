/**
 * The state machine that backs our gesture system. In particular, this state
 * machine manages the interplay between focuses, touch ups, and swiping.
 * It is entirely ignorant of the existence of popovers and the positions of
 * DOM nodes, operating solely on IDs. The state machine does accommodate for
 * multi-touch interactions, tracking gesture state on a per-touch basis.
 */

const defaults = {
    longPressWaitTimeMs: 50,
    swipeThresholdPx: 20,
    holdIntervalMs: 250,
};

class GestureStateMachine {
    constructor(handlers, options, swipeDisabledNodeIds, multiPressableKeys) {
        this.handlers = handlers;
        this.options = {
            ...defaults,
            ...options,
        };
        this.swipeDisabledNodeIds = swipeDisabledNodeIds || [];
        this.multiPressableKeys = multiPressableKeys || [];

        // TODO(charlie): Flow-type this file. It's not great that we're now
        // passing around these opaque state objects.
        this.touchState = {};
        this.swipeState = null;
    }

    _maybeCancelLongPressForTouch(touchId) {
        const {longPressTimeoutId} = this.touchState[touchId];
        if (longPressTimeoutId) {
            clearTimeout(longPressTimeoutId);
            this.touchState[touchId] = {
                ...this.touchState[touchId],
                longPressTimeoutId: null,
            };
        }
    }

    _maybeCancelPressAndHoldForTouch(touchId) {
        const {pressAndHoldIntervalId} = this.touchState[touchId];
        if (pressAndHoldIntervalId) {
            // If there was an interval set to detect holds, clear it out.
            clearInterval(pressAndHoldIntervalId);
            this.touchState[touchId] = {
                ...this.touchState[touchId],
                pressAndHoldIntervalId: null,
            };
        }
    }

    _cleanupTouchEvent(touchId) {
        this._maybeCancelLongPressForTouch(touchId);
        this._maybeCancelPressAndHoldForTouch(touchId);
        delete this.touchState[touchId];
    }

    /**
     * Handle a focus event on the node with the given identifier, which may be
     * `null` to indicate that the user has dragged their finger off of any
     * registered nodes, but is still in the middle of a gesture.
     *
     * @param {string|null} id - the identifier of the newly focused node, or
     *                           `null` if no node is focused
     * @param {number} touchId - a unique identifier associated with the touch
     */
    _onFocus(id, touchId) {
        // If we're in the middle of a long-press, cancel it.
        this._maybeCancelLongPressForTouch(touchId);

        // Reset any existing hold-detecting interval.
        this._maybeCancelPressAndHoldForTouch(touchId);

        // Set the focused node ID and handle the focus event.
        // Note: we can call `onFocus` with `null` IDs. The semantics of an
        // `onFocus` with a `null` ID differs from that of `onBlur`. The former
        // indicates that a gesture that can focus future nodes is still in
        // progress, but that no node is currently focused. The latter
        // indicates that the gesture has ended and nothing will be focused.
        this.touchState[touchId] = {
            ...this.touchState[touchId],
            activeNodeId: id,
        };
        this.handlers.onFocus(id);

        if (id) {
            // Handle logic for repeating button presses.
            if (this.multiPressableKeys.includes(id)) {
                // Start by triggering a click, iOS style.
                this.handlers.onTrigger(id);

                // Set up a new hold detector for the current button.
                this.touchState[touchId] = {
                    ...this.touchState[touchId],
                    pressAndHoldIntervalId: setInterval(() => {
                        // On every cycle, trigger the click handler.
                        this.handlers.onTrigger(id);
                    }, this.options.holdIntervalMs),
                };
            } else {
                // Set up a new hold detector for the current button.
                this.touchState[touchId] = {
                    ...this.touchState[touchId],
                    longPressTimeoutId: setTimeout(() => {
                        this.handlers.onLongPress(id);
                        this.touchState[touchId] = {
                            ...this.touchState[touchId],
                            longPressTimeoutId: null,
                        };
                    }, this.options.longPressWaitTimeMs),
                };
            }
        }
    }

    /**
     * Clear out all active gesture information.
     */
    _onSwipeStart() {
        for (const activeTouchId of Object.keys(this.touchState)) {
            this._maybeCancelLongPressForTouch(activeTouchId);
            this._maybeCancelPressAndHoldForTouch(activeTouchId);
        }
        this.touchState = {};
        this.handlers.onBlur();
    }

    /**
     * A function that returns the identifier of the node over which the touch
     * event occurred. This is provided as a piece of lazy computation, as
     * computing the DOM node for a given point is expensive, and the state
     * machine won't always need that information. For example, if the user is
     * swiping, then `onTouchMove` needs to be performant and doesn't care about
     * the node over which the touch occurred.
     *
     * @typedef idComputation
     * @returns {DOMNode} - the identifier of the node over which the touch
     *                      occurred
     */

    /**
     * Handle a touch-start event on the node with the given identifer.
     *
     * @param {idComputation} getId - a function that returns identifier of the
     *                                node over which the start event occurred
     * @param {number} touchId - a unique identifier associated with the touch
     */
    onTouchStart(getId, touchId, pageX) {
        // Ignore any touch events that start mid-swipe.
        if (this.swipeState) {
            return;
        }

        if (this.touchState[touchId]) {
            // It turns out we can get multiple touch starts with no
            // intervening move, end, or cancel events in Android WebViews.
            // TODO(benkomalo): it's not entirely clear why this happens, but
            // it seems to happen with the backspace button. It may be related
            // to FastClick (https://github.com/ftlabs/fastclick/issues/71)
            // though I haven't verified, and it's probably good to be robust
            // here anyways.
            return;
        }

        const startingNodeId = getId();
        this.touchState[touchId] = {
            swipeLocked: this.swipeDisabledNodeIds.includes(startingNodeId),
            startX: pageX,
        };

        this._onFocus(startingNodeId, touchId);
    }

    /**
     * Handle a touch-move event on the node with the given identifer.
     *
     * @param {idComputation} getId - a function that returns identifier of the
     *                                node over which the move event occurred
     * @param {number} touchId - a unique identifier associated with the touch
     * @param {number} pageX - the x coordinate of the touch
     * @param {boolean} swipeEnabled - whether the system should allow for
     *                                 transitions into a swiping state
     */
    onTouchMove(getId, touchId, pageX, swipeEnabled) {
        if (this.swipeState) {
            // Only respect the finger that started a swipe. Any other lingering
            // gestures are ignored.
            if (this.swipeState.touchId === touchId) {
                this.handlers.onSwipeChange(pageX - this.swipeState.startX);
            }
        } else if (this.touchState[touchId]) {
            // It could be touch events started outside the keypad and
            // moved into it; ignore them.
            const {activeNodeId, startX, swipeLocked} = this.touchState[
                touchId
            ];

            const dx = pageX - startX;
            const shouldBeginSwiping =
                swipeEnabled &&
                !swipeLocked &&
                Math.abs(dx) > this.options.swipeThresholdPx;

            if (shouldBeginSwiping) {
                this._onSwipeStart();

                // Trigger the swipe.
                this.swipeState = {
                    touchId,
                    startX,
                };
                this.handlers.onSwipeChange(pageX - this.swipeState.startX);
            } else {
                const id = getId();
                if (id !== activeNodeId) {
                    this._onFocus(id, touchId);
                }
            }
        }
    }

    /**
     * Handle a touch-end event on the node with the given identifer.
     *
     * @param {idComputation} getId - a function that returns identifier of the
     *                                node over which the end event occurred
     * @param {number} touchId - a unique identifier associated with the touch
     * @param {number} pageX - the x coordinate of the touch
     */
    onTouchEnd(getId, touchId, pageX) {
        if (this.swipeState) {
            // Only respect the finger that started a swipe. Any other lingering
            // gestures are ignored.
            if (this.swipeState.touchId === touchId) {
                this.handlers.onSwipeEnd(pageX - this.swipeState.startX);
                this.swipeState = null;
            }
        } else if (this.touchState[touchId]) {
            // It could be touch events started outside the keypad and
            // moved into it; ignore them.
            const {activeNodeId, pressAndHoldIntervalId} = this.touchState[
                touchId
            ];

            this._cleanupTouchEvent(touchId);

            const didPressAndHold = !!pressAndHoldIntervalId;
            if (didPressAndHold) {
                // We don't trigger a touch end if there was a press and hold,
                // because the key has been triggered at least once and calling
                // the onTouchEnd handler would add an extra trigger.
                this.handlers.onBlur();
            } else {
                // Trigger a touch-end. There's no need to notify clients of a
                // blur as clients are responsible for handling any cleanup in
                // their touch-end handlers.
                this.handlers.onTouchEnd(activeNodeId);
            }
        }
    }

    /**
     * Handle a touch-cancel event.
     */
    onTouchCancel(touchId) {
        // If a touch is cancelled and we're swiping, end the swipe with no
        // displacement.
        if (this.swipeState) {
            if (this.swipeState.touchId === touchId) {
                this.handlers.onSwipeEnd(0);
                this.swipeState = null;
            }
        } else if (this.touchState[touchId]) {
            // Otherwise, trigger a full blur. We don't want to trigger a
            // touch-up, since the cancellation means that the user probably
            // didn't release over a key intentionally.
            this._cleanupTouchEvent(touchId);
            this.handlers.onBlur();
        }
    }
}

module.exports = GestureStateMachine;
