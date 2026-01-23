/**
 * Creates and adds a point to the graph that can be dragged around.
 * It allows constraints on its movement and draws when moves happen.
 *
 * Options can be passed to the constructor to control how the point behaves:
 *   coord: [x, y]
 *     The initial position of the point
 *   pointSize:
 *     changes the size of the point. defaults to 4
 *   static: boolean
 *     draw the point, but don't let it be interactable
 *   cursor: "move", "pointer"
 *     css cursor for this point
 *   add: [function(state)]
 *     called immediately when this movablePoint is added
 *     default: apply any constraints and draw
 *   draw: [function(prevState, currentState)]
 *     drawing functions. default to [basic, highlight]
 *   remove: [function(state)]
 *     called when this movablePoint is removed
 *   onMoveStart: [function(coord)]
 *     called when this point is clicked on
 *   constraints: [function(coord)]
 *     called when this point is dragged
 *     return true or nothing to accept the move
 *     return false to cancel the move
 *     return an [x, y] coordinate to override the move
 *   onMove: [function(coord)]
 *     called after all constraints functions pass and the point
 *     is moved to a new location
 *   onMoveEnd: [function(coord)]
 *     called when the mouse is released from a click or move
 *   onClick: [function(coord)]
 *     called when someone mouses down, doesn't move the point,
 *     and mouses up.
 *   normalStyle:
 *     the raphael/graphie style of the point when not hovering
 *   highlightStyle:
 *     the raphael/graphie style of the point when hovering, if
 *     MovablePoint.draw.highlight is used
 *
 * This creates a MovablePoint object with the following methods:
 *   setCoord: [x, y]
 *     changes the point's coordinate
 *   draw:
 *     redraws the coord
 *   modify: {options}
 *     modifies the original options passed to the point
 *   remove:
 *     removes the point from graphie
 */
import {point as kpoint, vector as kvector} from "@khanacademy/kmath";
import {Errors, PerseusError, pluck} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import InlineIcon from "../components/inline-icon";
import {iconTrash} from "../icon-paths";
import KhanColors from "../util/colors";
import reactRender from "../util/react-render";
import Tex from "../util/tex";

import InteractiveUtil from "./interactive-util";
import MovablePointOptions from "./movable-point-options";
import WrappedEllipse from "./wrapped-ellipse";

import type {Movable} from "./movable";
import type {Constraint, ConstraintCallbacks, Coord} from "./types";
import type {Graphie} from "../util/graphie";

const assert = InteractiveUtil.assert;
const normalizeOptions = InteractiveUtil.normalizeOptions;

const {processMath} = Tex;

// Default "props" and "state". Both are added to this.state and
// receive magic getter methods (this.coord() etc).
// However, properties in DEFAULT_PROPS are updated on `modify()`,
// while those in DEFAULT_STATE persist and are not updated.
// Things that the user might want to change should be on "props",
// while things used to render the point should be on "state".
const DEFAULT_PROPS = {
    coord: [0, 0],
    pointSize: 4,
    static: false,
    cursor: "move",
    normalStyle: null, // turned into an object in this.modify
    highlightStyle: null, // likewise
    shadow: false,
    tooltip: false,
} as const;
const DEFAULT_STATE = {
    added: false,
    hasMoved: false,
    visibleShape: null,
    outOfBounds: false,
    mouseTarget: null,
    touchOffset: null,
} as const;

type State = {
    add: unknown[];
    added: boolean;
    constraints: Constraint[];
    coord: Coord;
    cursor: "move";
    draw: ((state: State, prevState: State) => void)[];
    hasMoved: boolean;
    id: string;
    modify: unknown[];
    onClick: unknown[];
    onMove: ((coord: Coord, prevCoord: Coord) => void)[];
    onMoveEnd: unknown[];
    onMoveStart: unknown[];
    onRemove?: () => void;
    outOfBounds: boolean;
    pointSize: number;
    remove: (() => void)[];
    shadow: boolean;
    static: boolean;
    tooltip: boolean;
    touchOffset: null | Coord;
    mouseTarget: unknown;
    visibleShape: {wrapper: HTMLElement; toBack(): void; toFront(): void};
    normalStyle: Record<string, any>;
    highlightStyle: Record<string, any>;
};
const tooltipResetFunctions: Array<() => void> = [];

export class MovablePoint {
    graphie: Graphie;
    movable: Movable<Record<string, never>>;
    state: State;
    // @ts-expect-error - TS2564: Property 'prevState' has no initializer and is not definitely assigned in the constructor.
    prevState: State;
    _tooltip?: HTMLElement;
    _listenerMap: Record<string, number> = {};

    constructor(
        graphie: Graphie,
        movable: Movable<Record<string, never>>,
        options: Partial<State>,
    ) {
        this.graphie = graphie;
        this.movable = movable;
        // @ts-expect-error - TS2740: Type '{ id: string; }' is missing the following properties from type 'State': add, added, constraints, coord, and 19 more.
        this.state = {
            id: _.uniqueId("movablePoint"),
        };
        this.modify({...DEFAULT_STATE, ...options});
    }

    modify(options) {
        this.update(_.extend(this._createDefaultState(), options));
    }

    _createDefaultState() {
        return {
            id: this.state.id,
            ...normalizeOptions(
                // Defaults are copied from MovablePointOptions.*.standard
                // These defaults are set here instead of DEFAULT_PROPS/STATE
                // because they:
                //    - are objects, not primitives (and need a deeper copy)
                //    - they don't need getters created for them
                pluck(MovablePointOptions, "standard"),
                // We only update props here, because we want things on state to
                // be persistent, and updated appropriately in modify()
            ),
            ...DEFAULT_PROPS,
        };
    }

    cloneState() {
        return {...this.movable.cloneState(), ...this.state};
    }

    update(options: Partial<State>) {
        const self = this;
        const graphie = self.graphie;
        const state = _.extend(self.state, normalizeOptions(options));

        assert(kpoint.is(state.coord));

        // Default things inside the state.normalStyle object, because
        // _.extend is not deep.
        // We use _.extend instead of _.defaults because we don't want
        // to modify the passed-in copy (especially if it's from
        // DEFAULT_PROPS/STATE!)
        const normalColor = state.static
            ? KhanColors.DYNAMIC
            : KhanColors.INTERACTIVE;
        state.normalStyle = _.extend(
            {
                fill: normalColor,
                stroke: normalColor,
                scale: 1,
            },
            state.normalStyle,
        );

        state.highlightStyle = _.extend(
            {
                fill: KhanColors.INTERACTING,
                stroke: KhanColors.INTERACTING,
                scale: 2,
            },
            state.highlightStyle,
        );

        if (!state.static) {
            // the invisible shape in front of the point that gets mouse events
            if (!state.mouseTarget) {
                const center = self.state.coord;
                const radii = graphie.unscaleVector(24);
                const options = {
                    mouselayer: true,
                    padding: 0,
                    interactiveKindForTesting: "movable-point",
                } as const;
                state.mouseTarget = new WrappedEllipse(
                    graphie,
                    center,
                    radii,
                    options,
                );
                state.mouseTarget.attr({fill: "#000", opacity: 0.0});
            }
        }

        const showTrashTooltip = () => {
            this._showTooltip((container) => {
                reactRender(
                    <span style={{fontSize: "2em"}}>
                        <InlineIcon
                            {...iconTrash}
                            style={{
                                position: "static",
                                color: KhanColors.INTERACTIVE,
                                marginLeft: 9,
                                marginRight: 9,
                            }}
                        />
                    </span>,
                    container,
                );
            });
        };

        // The starting coord of any move, sent to onMoveEnd as the previous
        // value
        let startCoord = state.coord;

        // The Movable representing this movablePoint's representation
        // This handles mouse events for us, which we propagate in
        // onMove
        self.movable.modify(
            _.extend({}, state, {
                add: null,
                modify: null,
                draw: self.draw.bind(self),
                remove: null,
                onMoveStart: (startMouseCoord) => {
                    state.hasMoved = false;
                    startCoord = state.coord;

                    // Save the offset between the cursor and the initial coordinate
                    // of the point. This is tracked so as to avoid locking the
                    // moving point to the user's finger on touch devices, which
                    // would obscure it, no matter how large we made the touch
                    // target. Instead, we respect the offset at which the point was
                    // grabbed for the entirety of the gesture, if it's a
                    // touch-based interaction.
                    if (state.touchOffset == null) {
                        const isMouse = !("ontouchstart" in window);
                        state.touchOffset = isMouse
                            ? [0, 0]
                            : kvector.subtract(startCoord, startMouseCoord);
                    }

                    const svgElem = state.visibleShape.wrapper;
                    if (state.shadow) {
                        const filter = "none";
                        svgElem.style.filter = filter;
                    }

                    if (state.showHairlines) {
                        state.showHairlines(state.coord);
                    }

                    tooltipResetFunctions.forEach((f) => f());
                    if (state.tooltip) {
                        if (state.xOnlyTooltip) {
                            this._showTooltip(`${state.coord[0]}`);
                        } else {
                            this._showTooltip(
                                `(${state.coord[0]}, ${state.coord[1]})`,
                            );
                        }

                        if (state.shadow) {
                            const content =
                                svgElem.getElementsByClassName(
                                    "tooltip-content",
                                )[0];
                            const filter =
                                "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))";

                            content.style.filter = filter;
                        }
                    }

                    self._fireEvent(state.onMoveStart, startCoord, startCoord);
                    self.draw();
                },
                onMove: (mouseCoord, prevMouseCoord) => {
                    const transformedCoord = kvector.add(
                        mouseCoord,
                        state.touchOffset,
                    );

                    self.moveTo(transformedCoord);

                    if (state.showHairlines) {
                        if (!this.state.outOfBounds) {
                            state.showHairlines(state.coord);
                        } else {
                            state.hideHairlines();
                        }
                    }

                    if (state.tooltip) {
                        if (!this.state.outOfBounds) {
                            if (state.xOnlyTooltip) {
                                this._showTooltip(`${state.coord[0]}`);
                            } else {
                                this._showTooltip(
                                    `(${state.coord[0]}, ${state.coord[1]})`,
                                );
                            }
                        }
                    }

                    if (state.onRemove && this.state.outOfBounds) {
                        showTrashTooltip();
                    }
                },
                onMoveEnd: () => {
                    if (self.isHovering() && !state.hasMoved) {
                        self._fireEvent(state.onClick, state.coord, startCoord);
                    }

                    const svgElem = state.visibleShape.wrapper;

                    if (state.shadow) {
                        const filter =
                            "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))";
                        svgElem.style.filter = filter;
                    }

                    if (state.hideHairlines) {
                        state.hideHairlines();
                    }

                    if (state.hasMoved) {
                        this._hideTooltip();
                    } else if (state.onRemove) {
                        // If we haven't moved and we should be displaying trash
                        // tooltips.
                        showTrashTooltip();

                        const content =
                            svgElem.getElementsByClassName(
                                "tooltip-content",
                            )[0];

                        content.style.filter = "none";

                        // @ts-expect-error - this._tooltip.firstChild is possibly null
                        this._tooltip.firstChild.addEventListener(
                            "touchstart",
                            (e) => {
                                // Prevent creation of a new point when the event is
                                // propagated up the DOM.
                                e.stopPropagation();
                            },
                            true,
                        );

                        // @ts-expect-error - this._tooltip.firstChild is possibly null
                        this._tooltip.firstChild.addEventListener(
                            "touchend",
                            (e) => {
                                // Remove the point and prevent creation of a
                                // new point.
                                state.onRemove();
                                e.stopPropagation();
                            },
                            true,
                        );
                    } else if (state.tooltip) {
                        this._hideTooltip();
                    }

                    if (state.outOfBounds) {
                        state.onRemove();
                    }

                    self._fireEvent(state.onMoveEnd, state.coord, startCoord);
                    state.hasMoved = false;
                    state.touchOffset = null;
                    self.draw();
                },
            }),
        );

        // Trigger an add event if this hasn't been added before
        if (!state.added) {
            // @ts-expect-error - type {} is missing properties from State
            self.prevState = {};
            self._fireEvent(state.add, self.cloneState(), self.prevState);
            state.added = true;

            // Update the state for `added` and in case the add event
            // changed it
            self.prevState = self.cloneState();
        }

        // Trigger a modify event
        self._fireEvent(state.modify, self.cloneState(), self.prevState);
    }

    draw() {
        const currState = this.cloneState();
        this._fireEvent(this.state.draw, currState, this.prevState);
        this.prevState = currState;
    }

    constrain() {
        const result = this._applyConstraints(this.coord(), this.coord());
        if (kpoint.is(result)) {
            this.setCoord(result);
        }
        return result !== false;
    }

    /**
     * Fire an onSomething type event to all functions in listeners
     */
    _fireEvent<F extends (...args: any[]) => any>(
        listeners: F[],
        ...args: Parameters<F>
    ) {
        for (const listener of listeners) {
            listener.call(this, ...args);
        }
    }

    /**
     * Combine the array of constraints functions
     * Returns either an [x, y] coordinate or false
     */
    _applyConstraints(
        current: Coord,
        previous: Coord,
        extraOptions?: ConstraintCallbacks,
    ): Coord | false {
        let skipRemaining = false;

        return this.state.constraints.reduce(
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

    /**
     * Displays a tooltip above the point, replacing any previous contents. If
     * there is no tooltip initialized, adds the tooltip.
     *
     * If the type of contents is string, the contents will be rendered as TeX
     * Otherwise, the content will be assumed to be a DOM node and will be
     * appended inside the tooltip.
     */
    _showTooltip(contents) {
        if (!this._tooltip) {
            this._tooltip = document.createElement("div");
            this._tooltip.className = "tooltip-content";
            this.state.visibleShape.wrapper.className = "tooltip";
            this.state.visibleShape.wrapper.appendChild(this._tooltip);

            // Only one tooltip should be displayed at a time, so store a list
            // of all the tooltips initialized.
            tooltipResetFunctions.push(() => {
                if (this.state.added) {
                    this._hideTooltip();
                }
            });
        }

        if (this._tooltip.firstChild) {
            this._tooltip.removeChild(this._tooltip.firstChild);
        }

        this.state.visibleShape.wrapper.className = "tooltip visible";
        this._tooltip.appendChild(document.createElement("span"));

        if (typeof contents === "string") {
            // @ts-expect-error - this._tooltip.firstChild is possibly 'null'.
            processMath(this._tooltip.firstChild, contents, false);
        } else if (typeof contents === "function") {
            contents(this._tooltip.firstChild);
        } else {
            // @ts-expect-error - this._tooltip.firstChild is possibly 'null'.
            this._tooltip.firstChild.appendChild(contents);
        }
    }

    _hideTooltip() {
        if (this._tooltip) {
            // Without the visible class, tooltips have display: none set
            this.state.visibleShape.wrapper.className = "tooltip";
        }
    }

    coord(): Coord {
        return this.state.coord;
    }

    setCoord(coord: Coord) {
        assert(kpoint.is(coord, 2));
        this.state.coord = _.clone(coord);
        this.draw();
    }

    setCoordConstrained(coord) {
        assert(kpoint.is(coord, 2));
        const result = this._applyConstraints(coord, this.coord());
        if (result !== false) {
            this.state.coord = _.clone(result);
            this.draw();
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
    unlisten(eventName, id) {
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
            _.each(
                keys,
                (key) => {
                    if (
                        getEventName(key) === eventName &&
                        this._listenerMap[key] > index
                    ) {
                        this._listenerMap[key]--;
                    }
                },
                this,
            );
        }
    }

    grab(coord: Coord) {
        // Provide an explicit touchOffset override, so that we track the user's
        // finger when a point has been grabbed.
        this.state.touchOffset = [0, 0];

        this.movable.grab(coord);
        this.moveTo(coord);
    }

    moveTo(coord: Coord) {
        // The caller has the option of adding an onMove() method to the
        // movablePoint object we return as a sort of event handler
        // By returning false from onMove(), the move can be vetoed,
        // providing custom constraints on where the point can be moved.
        // By returning array [x, y], the move can be overridden

        const state = this.state;

        this.state.outOfBounds = false;
        const result = this._applyConstraints(
            coord,
            state.coord,
            state.onRemove
                ? {
                      onOutOfBounds: () => {
                          this.state.outOfBounds = true;
                      },
                      onSkipRemaining: () => {},
                  }
                : {onSkipRemaining: () => {}},
        );

        if (result === false) {
            return;
        }
        if (kpoint.is(result)) {
            coord = result;
        }
        if (!kpoint.equal(coord, state.coord)) {
            const prevCoord = state.coord;
            state.coord = coord;
            state.hasMoved = true;
            this._fireEvent(state.onMove, state.coord, prevCoord);
            this.draw();
        }
    }

    remove() {
        this.state.added = false;
        this._fireEvent(this.state.remove);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (this.movable) {
            this.movable.remove();
        }
        this.state.mouseTarget = null;
    }

    pointSize(): number {
        return this.state.pointSize;
    }

    static() {
        return this.state.static;
    }

    cursor() {
        return this.state.cursor;
    }

    normalStyle() {
        return this.state.normalStyle;
    }

    highlightStyle() {
        return this.state.highlightStyle;
    }

    shadow() {
        return this.state.shadow;
    }

    tooltip() {
        return this.state.tooltip;
    }

    added() {
        return this.state.added;
    }

    hasMoved() {
        return this.state.hasMoved;
    }

    visibleShape() {
        return this.state.visibleShape;
    }

    outOfBounds() {
        return this.state.outOfBounds;
    }

    mouseTarget() {
        return this.state.mouseTarget;
    }

    touchOffset() {
        return this.state.touchOffset;
    }

    /**
     * Forwarding methods to this.movable:
     */
    isHovering() {
        return this.movable.isHovering();
    }

    isDragging() {
        return this.movable.isDragging();
    }

    // Change z-order to back
    toBack() {
        this.movable.toBack();
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (this.state.visibleShape) {
            this.state.visibleShape.toBack();
        }
    }

    // Change z-order to front
    toFront() {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (this.state.visibleShape) {
            this.state.visibleShape.toFront();
        }
        this.movable.toFront();
    }

    static add = MovablePointOptions.add;
    static modify = MovablePointOptions.modify;
    static draw = MovablePointOptions.draw;
    static remove = MovablePointOptions.remove;
    static onMoveStart = MovablePointOptions.onMoveStart;
    static constraints = MovablePointOptions.constraints;
    static onMove = MovablePointOptions.onMove;
    static onMoveEnd = MovablePointOptions.onMoveEnd;
    static onClick = MovablePointOptions.onClick;
}

function getKey(eventName: string, id: string): string {
    return eventName + ":" + id;
}

function getEventName(key: string): string {
    return key.split(":")[0];
}
