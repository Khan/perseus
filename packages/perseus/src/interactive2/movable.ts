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
import $ from "jquery";
import _ from "underscore";

import InteractiveUtil from "./interactive-util";

const normalizeOptions = InteractiveUtil.normalizeOptions;

const assert = InteractiveUtil.assert;

// state parameters that should be converted into an array of
// functions
const FUNCTION_ARRAY_OPTIONS = [
    "add",
    "modify",
    "draw",
    "remove",
    "onMoveStart",
    "onMove",
    "onMoveEnd",
    "onClick",
];

// Default "props" and "state". Both are added to this.state and
// receive magic getter methods (this.isHovering() etc).
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

const Movable = function (graphie: any, options: any): void {
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    _.extend(this, {
        graphie: graphie,
        state: {
            // Set here because this must be unique for each instance
            id: _.uniqueId("movable"),
        },
    });

    // We only set DEFAULT_STATE once, here
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.modify(_.extend({}, DEFAULT_STATE, options));
};

InteractiveUtil.createGettersFor(
    Movable,
    _.extend({}, DEFAULT_PROPS, DEFAULT_STATE),
);
InteractiveUtil.addMovableHelperMethodsTo(Movable);

_.extend(Movable.prototype, {
    cloneState: function () {
        return _.clone(this.state);
    },

    _createDefaultState: function () {
        return _.extend(
            {
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
            },
            DEFAULT_PROPS,
        );
    },

    /**
     * Resets the object to its state as if it were constructed with
     * `options` originally. The only state maintained is `state.id`
     *
     * Analogous to React.js's replaceProps
     */
    modify: function (options) {
        this.update(_.extend({}, this._createDefaultState(), options));
    },

    /**
     * Simulates a mouse grab event on the movable object.
     */
    grab: function (coord) {
        assert(kpoint.is(coord));
        const self = this;
        const graphie = self.graphie;
        const state = self.state;

        state.isHovering = true;
        state.isDragging = true;
        graphie.isDragging = true;

        const startMouseCoord = coord;
        let prevMouseCoord = startMouseCoord;
        self._fireEvent(state.onMoveStart, startMouseCoord, startMouseCoord);

        const moveHandler = function (e: any) {
            e.preventDefault();

            const mouseCoord = graphie.getMouseCoord(e);
            self._fireEvent(state.onMove, mouseCoord, prevMouseCoord);
            self.draw();
            prevMouseCoord = mouseCoord;
        };

        const upHandler = function (e: any) {
            $(document).unbind("vmousemove", moveHandler);
            $(document).unbind("vmouseup", upHandler);
            if (state.isHovering) {
                self._fireEvent(state.onClick, prevMouseCoord, startMouseCoord);
            }
            state.isHovering = self.state.isMouseOver;
            state.isDragging = false;
            graphie.isDragging = false;
            self._fireEvent(state.onMoveEnd, prevMouseCoord, startMouseCoord);
            self.draw();
        };

        $(document).bind("vmousemove", moveHandler);
        $(document).bind("vmouseup", upHandler);
    },

    /**
     * Adjusts constructor parameters without changing previous settings
     * for any option not specified
     *
     * Analogous to React.js's setProps
     */
    update: function (options) {
        const self = this;
        const graphie = self.graphie;

        const prevState = self.cloneState();
        const state = _.extend(
            self.state,
            normalizeOptions(FUNCTION_ARRAY_OPTIONS, options),
        );

        // the invisible shape in front of the point that gets mouse events
        if (state.mouseTarget && !prevState.mouseTarget) {
            let $mouseTarget;
            if (state.mouseTarget.getMouseTarget) {
                $mouseTarget = $(state.mouseTarget.getMouseTarget());
            } else {
                $mouseTarget = $(state.mouseTarget[0]);
            }

            const isMouse = !("ontouchstart" in window);

            if (isMouse) {
                $mouseTarget.on("vmouseover", function () {
                    state.isMouseOver = true;
                    if (!graphie.isDragging) {
                        state.isHovering = true;
                    }
                    if (self.state.added) {
                        // Avoid drawing if the point has been removed
                        self.draw();
                    }
                });

                $mouseTarget.on("vmouseout", function () {
                    state.isMouseOver = false;
                    if (!state.isDragging) {
                        state.isHovering = false;
                    }
                    if (self.state.added) {
                        // Avoid drawing if the point has been removed
                        self.draw();
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

            $mouseTarget.on("vmousedown", function (e) {
                if (e.which !== 0 && e.which !== 1) {
                    return;
                }
                e.preventDefault();

                const mouseCoord = graphie.getMouseCoord(e);
                self.grab(mouseCoord);
            });
        }

        if (state.mouseTarget && state.cursor !== undefined) {
            let $mouseTarget;
            if (state.mouseTarget.getMouseTarget) {
                $mouseTarget = $(state.mouseTarget.getMouseTarget());
            } else {
                $mouseTarget = $(state.mouseTarget[0]);
            }

            // "" removes the css cursor if state.cursor is null
            $mouseTarget.css("cursor", state.cursor || "");
        }

        // Trigger an add event if this hasn't been added before
        if (!state.added) {
            self._fireEvent(state.modify, self.cloneState(), {});
            state.added = true;

            // Update the state for `added` and in case the add event
            // changed it
            self.prevState = self.cloneState();
        }

        // Trigger a modify event
        self._fireEvent(state.modify, self.cloneState(), self.prevState);
    },

    remove: function () {
        this.state.added = false;
        this._fireEvent(this.state.remove);
        if (this.state.mouseTarget) {
            $(this.state.mouseTarget).off();
            this.state.mouseTarget.remove();
            this.state.mouseTarget = null;
        }
    },

    // Change z-order to back
    toBack: function () {
        if (this.state.mouseTarget) {
            this.state.mouseTarget.toBack();
        }
    },

    // Change z-order to front
    toFront: function () {
        if (this.state.mouseTarget) {
            this.state.mouseTarget.toFront();
        }
    },
});

export default Movable;
