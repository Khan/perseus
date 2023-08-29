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
import * as React from "react";
import _ from "underscore";

import InlineIcon from "../components/inline-icon";
import {iconTrash} from "../icon-paths";
import KhanColors from "../util/colors";
import reactRender from "../util/react-render";
import Tex from "../util/tex";

import InteractiveUtil from "./interactive-util";
import MovablePointOptions from "./movable-point-options";
import objective_ from "./objective_";
import WrappedEllipse from "./wrapped-ellipse";

const assert = InteractiveUtil.assert;
const normalizeOptions = InteractiveUtil.normalizeOptions;

const {processMath} = Tex;

// State parameters that should be converted into an array of
// functions
const FUNCTION_ARRAY_OPTIONS = _.keys(MovablePointOptions);

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

const tooltipResetFunctions: Array<() => void> = [];

const MovablePoint = function (graphie: any, movable: any, options: any) {
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    _.extend(this, {
        graphie,
        movable,
        state: {
            // Set here because this must be unique for each instance
            id: _.uniqueId("movablePoint"),
        },
    });

    // We only set DEFAULT_STATE once, here
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.modify(_.extend({}, DEFAULT_STATE, options));
};

_.extend(MovablePoint, MovablePointOptions);
InteractiveUtil.createGettersFor(
    MovablePoint,
    _.extend({}, DEFAULT_PROPS, DEFAULT_STATE),
);
InteractiveUtil.addMovableHelperMethodsTo(MovablePoint);

_.extend(MovablePoint.prototype, {
    cloneState: function () {
        return _.extend(this.movable.cloneState(), this.state);
    },

    _createDefaultState: function () {
        return _.extend(
            {
                id: this.state.id,
            },
            normalizeOptions(
                FUNCTION_ARRAY_OPTIONS,
                // Defaults are copied from MovablePointOptions.*.standard
                // These defaults are set here instead of DEFAULT_PROPS/STATE
                // because they:
                //    - are objects, not primitives (and need a deeper copy)
                //    - they don't need getters created for them
                // TODO(jack): Consider "default" once we es3ify perseus
                objective_.pluck(MovablePointOptions, "standard"),

                // We only update props here, because we want things on state to
                // be persistent, and updated appropriately in modify()
            ),
            DEFAULT_PROPS,
        );
    },

    /**
     * Resets the object to its state as if it were constructed with
     * `options` originally. state not on DEFAULT_PROPS is maintained.
     *
     * Analogous to React.js's replaceProps
     */
    modify: function (options) {
        this.update(_.extend(this._createDefaultState(), options));
    },

    /**
     * Displays a tooltip above the point, replacing any previous contents. If
     * there is no tooltip initialized, adds the tooltip.
     *
     * If the type of contents is string, the contents will be rendered with
     * KaTeX. Otherwise, the content will be assumed to be a DOM node and will
     * be appended inside the tooltip.
     */
    _showTooltip: function (contents) {
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
            processMath(this._tooltip.firstChild, contents, false);
        } else if (typeof contents === "function") {
            contents(this._tooltip.firstChild);
        } else {
            this._tooltip.firstChild.appendChild(contents);
        }
    },

    _hideTooltip: function () {
        if (this._tooltip) {
            // Without the visible class, tooltips have display: none set
            this.state.visibleShape.wrapper.className = "tooltip";
        }
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
        const state = _.extend(
            self.state,
            normalizeOptions(FUNCTION_ARRAY_OPTIONS, options),
        );

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

                        this._tooltip.firstChild.addEventListener(
                            "touchstart",
                            (e) => {
                                // Prevent creation of a new point when the event is
                                // propagated up the DOM.
                                e.stopPropagation();
                            },
                            true,
                        );

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
            self.prevState = {};
            self._fireEvent(state.add, self.cloneState(), self.prevState);
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
        if (this.movable) {
            this.movable.remove();
        }
        // TODO(jack): This should really be moved off of
        // movablePoint.state and only kept on movable.state
        this.state.mouseTarget = null;
    },

    constrain: function () {
        const result = this._applyConstraints(this.coord(), this.coord());
        if (kpoint.is(result)) {
            this.setCoord(result);
        }
        return result !== false;
    },

    setCoord: function (coord) {
        assert(kpoint.is(coord, 2));
        this.state.coord = _.clone(coord);
        this.draw();
    },

    setCoordConstrained: function (coord) {
        assert(kpoint.is(coord, 2));
        const result = this._applyConstraints(coord, this.coord());
        if (result !== false) {
            this.state.coord = _.clone(result);
            this.draw();
        }
    },

    moveTo: function (coord) {
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
                  }
                : {},
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
    },

    // Clone these for use with raphael, which modifies the input
    // style parameters
    normalStyle: function () {
        return _.clone(this.state.normalStyle);
    },

    highlightStyle: function () {
        return _.clone(this.state.highlightStyle);
    },

    // Change z-order to back
    toBack: function () {
        this.movable.toBack();
        if (this.state.visibleShape) {
            this.state.visibleShape.toBack();
        }
    },

    // Change z-order to front
    toFront: function () {
        if (this.state.visibleShape) {
            this.state.visibleShape.toFront();
        }
        this.movable.toFront();
    },

    /**
     * Forwarding methods to this.movable:
     */
    isHovering: function () {
        return this.movable.isHovering();
    },

    isDragging: function () {
        return this.movable.isDragging();
    },

    mouseTarget: function () {
        return this.movable.mouseTarget();
    },

    grab: function (coord) {
        // Provide an explicit touchOffset override, so that we track the user's
        // finger when a point has been grabbed.
        this.state.touchOffset = [0, 0];

        this.movable.grab(coord);
        this.moveTo(coord);
    },
});

export default MovablePoint;
