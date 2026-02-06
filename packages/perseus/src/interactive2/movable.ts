/**
 * Movable
 *
 * A Movable Something, that sends onMove events based on the
 * mouse coordinate (graphie unscaled, non-pixel-value) of the
 * move.
 *
 * Other MovableThings should generally have a Movable field, and
 * let this class handle all of the virtual mouse events, and then
 * take appropriate action in onMoveStart, onMove, onMoveEnd
 */
import {point as kpoint} from "@khanacademy/kmath";
import {Errors, PerseusError} from "@khanacademy/perseus-core";
import $ from "jquery";
import _ from "underscore";

import InteractiveUtil from "./interactive-util";

import type {Constraint, ConstraintCallbacks, Coord} from "./types";
import type {Graphie} from "../util/graphie";

const normalizeOptions = InteractiveUtil.normalizeOptions;

const assert = InteractiveUtil.assert;

// Default "props" and "state". Both are added to this.state.
// However, properties in DEFAULT_PROPS are updated on `modify()`,
// while those in DEFAULT_STATE persist and are not updated.
// Things that the user might want to change should be on "props",
// while things used to render the movable should be on "state".
const DEFAULT_PROPS = {
    cursor: null,
} as const;
const DEFAULT_STATE = {
    added: false,
    isHovering: false,
    isMouseOver: false,
    isDragging: false,
    mouseTarget: null,
} as const;

interface State {
    added?: boolean;
    isHovering?: boolean;
    isMouseOver?: boolean;
    isDragging?: boolean;
    mouseTarget?: {
        toFront(): void;
        toBack(): void;
        remove(): void;
        getMouseTarget(): Element;
    } | null;
    cursor?: null;
    id: string;
    add?: (() => void)[];
    modify?: ((state: State, prevState?: State) => void)[];
    draw?: ((state: State, prevState?: State) => void)[];
    remove?: (() => void)[];
    onMoveStart?: ((position: Coord, positionAgain: Coord) => void)[];
    onMove?: ((end: Coord, start: Coord) => void)[];
    onMoveEnd?: ((end: Coord, start: Coord) => void)[];
    onClick?: ((position: Coord, start: Coord) => void)[];
    constraints?: Constraint[];
}

export class Movable<Options extends Record<string, any>> {
    graphie: Graphie;
    state: State;
    prevState: State | undefined;
    _listenerMap: Record<string, number> = {};

    constructor(graphie: Graphie, options: Options) {
        this.graphie = graphie;
        this.state = {
            id: _.uniqueId("movable"),
        };
        this.modify({...DEFAULT_STATE, ...options});
    }

    modify(options: Options) {
        this.update({...this._createDefaultState(), ...options});
    }

    _createDefaultState() {
        return {
            id: this.state.id,
            add: [],
            modify: [],
            draw: [],
            remove: [],
            onMoveStart: [],
            onMove: [],
            onMoveEnd: [],
            onClick: [],

            // We only update props here, because we want things on state to
            // be persistent, and updated appropriately in modify()
            ...DEFAULT_PROPS,
        };
    }

    update(options: Options) {
        const graphie = this.graphie;

        const prevState = this.cloneState();
        const state = Object.assign(this.state, normalizeOptions(options));

        // the invisible shape in front of the point that gets mouse events
        if (state.mouseTarget && !prevState.mouseTarget) {
            let $mouseTarget;
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (state.mouseTarget.getMouseTarget) {
                $mouseTarget = $(state.mouseTarget.getMouseTarget());
            } else {
                $mouseTarget = $(state.mouseTarget[0]);
            }

            const isMouse = !("ontouchstart" in window);

            if (isMouse) {
                $mouseTarget.on("vmouseover", () => {
                    state.isMouseOver = true;
                    if (!graphie.isDragging) {
                        state.isHovering = true;
                    }
                    if (this.state.added) {
                        // Avoid drawing if the point has been removed
                        this.draw();
                    }
                });

                $mouseTarget.on("vmouseout", () => {
                    state.isMouseOver = false;
                    if (!state.isDragging) {
                        state.isHovering = false;
                    }
                    if (this.state.added) {
                        // Avoid drawing if the point has been removed
                        this.draw();
                    }
                });
            }

            // Prevent the page from scrolling when we grab and drag the
            // movable object on a mobile device.
            $mouseTarget[0].addEventListener(
                "touchstart",
                function (event) {
                    event.preventDefault();
                },
                {passive: false},
            );

            $mouseTarget.on("vmousedown", (e) => {
                if (e.which !== 0 && e.which !== 1) {
                    return;
                }
                e.preventDefault();

                const mouseCoord = graphie.getMouseCoord(e);
                this.grab(mouseCoord);
            });
        }

        if (state.mouseTarget && state.cursor !== undefined) {
            let $mouseTarget;
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (state.mouseTarget.getMouseTarget) {
                $mouseTarget = $(state.mouseTarget.getMouseTarget());
            } else {
                $mouseTarget = $(state.mouseTarget[0]);
            }

            // "" removes the css cursor if state.cursor is null
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            $mouseTarget.css("cursor", state.cursor || "");
        }

        // Trigger an add event if this hasn't been added before
        if (!state.added) {
            // @ts-expect-error - TS2345: Argument of type '{}' is not assignable to parameter of type 'State'.
            this._fireEvent(state.modify, this.cloneState(), {});
            state.added = true;

            // Update the state for `added` and in case the add event
            // changed it
            this.prevState = this.cloneState();
        }

        // Trigger a modify event
        this._fireEvent(state.modify, this.cloneState(), this.prevState);
    }

    cloneState(): State {
        return {...this.state};
    }

    /**
     * Fire an onSomething type event to all functions in listeners
     */
    _fireEvent<F extends (...args: any[]) => any>(
        listeners: F[] | undefined,
        ...args: Parameters<F>
    ) {
        if (listeners == null) {
            return;
        }
        for (const listener of listeners) {
            listener.call(this, ...args);
        }
    }

    /**
     * Call all draw functions, and update our prevState for the next
     * draw function
     */
    draw() {
        const currState = this.cloneState();
        this._fireEvent(this.state.draw, currState, this.prevState);
        this.prevState = currState;
    }

    /**
     * Simulates a mouse grab event on the movable object.
     */
    grab(coord: Coord) {
        assert(kpoint.is(coord));
        const graphie = this.graphie;
        const state: State = this.state;

        state.isHovering = true;
        state.isDragging = true;
        graphie.isDragging = true;

        const startMouseCoord = coord;
        let prevMouseCoord = startMouseCoord;
        this._fireEvent(state.onMoveStart, startMouseCoord, startMouseCoord);

        const moveHandler = (
            e: Readonly<{
                pageX?: number;
                pageY?: number;
                preventDefault(): void;
            }>,
        ) => {
            e.preventDefault();

            const mouseCoord = graphie.getMouseCoord(e);
            this._fireEvent(state.onMove, mouseCoord, prevMouseCoord);
            this.draw();
            prevMouseCoord = mouseCoord;
        };

        const upHandler = () => {
            $(document).unbind("vmousemove", moveHandler);
            $(document).unbind("vmouseup", upHandler);
            if (state.isHovering) {
                this._fireEvent(state.onClick, prevMouseCoord, startMouseCoord);
            }
            state.isHovering = this.state.isMouseOver;
            state.isDragging = false;
            graphie.isDragging = false;
            this._fireEvent(state.onMoveEnd, prevMouseCoord, startMouseCoord);
            this.draw();
        };

        $(document).bind("vmousemove", moveHandler);
        $(document).bind("vmouseup", upHandler);
    }

    _applyConstraints(
        current: Coord,
        previous: Coord,
        extraOptions?: ConstraintCallbacks,
    ) {
        let skipRemaining = false;

        return (this.state.constraints ?? []).reduce(
            (memo: Coord | false, constraint) => {
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
        );
    }

    // Change z-order to back
    toBack() {
        if (this.state.mouseTarget) {
            this.state.mouseTarget.toBack();
        }
    }

    // Change z-order to front
    toFront() {
        if (this.state.mouseTarget) {
            this.state.mouseTarget.toFront();
        }
    }

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
    listen(eventName: string, id: string, func: () => unknown) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        this._listenerMap = this._listenerMap || {};

        // If there's an existing handler, replace it by using its index in
        // `this.state[eventName]`; otherwise, add this handler to the end
        const key = getKey(eventName, id);
        const index = (this._listenerMap[key] =
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            this._listenerMap[key] || this.state[eventName].length);
        this.state[eventName][index] = func;
    }

    /**
     * Remove a previously added listener, by the id specified in the
     * corresponding listen() call
     *
     * If the given id has not been registered already, this is a no-op
     */
    unlisten(eventName: string, id: string) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        this._listenerMap = this._listenerMap || {};

        const key = getKey(eventName, id);
        const index = this._listenerMap[key];
        if (index !== undefined) {
            // Remove handler from list of event handlers and listenerMap
            this.state[eventName].splice(index, 1);
            delete this._listenerMap[key];

            // Re-index existing events: if they occur after `index`, decrement
            const keys = _.keys(this._listenerMap);
            keys.forEach((key) => {
                if (
                    getEventName(key) === eventName &&
                    this._listenerMap[key] > index
                ) {
                    this._listenerMap[key]--;
                }
            });
        }
    }

    remove() {
        this.state.added = false;
        this._fireEvent(this.state.remove);
        if (this.state.mouseTarget) {
            $(this.state.mouseTarget).off();
            this.state.mouseTarget.remove();
            this.state.mouseTarget = null;
        }
    }

    cursor() {
        return this.state.cursor;
    }

    added() {
        return this.state.added;
    }

    isHovering() {
        return this.state.isHovering;
    }

    isMouseOver() {
        return this.state.isMouseOver;
    }

    isDragging() {
        return this.state.isDragging;
    }

    mouseTarget() {
        return this.state.mouseTarget;
    }
}

function getKey(eventName: string, id: string): string {
    return eventName + ":" + id;
}

function getEventName(key: string): string {
    return key.split(":")[0];
}
