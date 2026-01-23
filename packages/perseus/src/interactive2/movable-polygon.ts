/**
 * Creates and adds a polygon to the graph that can be dragged around.
 * It allows constraints on its movement and draws when moves happen.
 */
import {vector as kvector} from "@khanacademy/kmath";
import {pluck} from "@khanacademy/perseus-core";
import _ from "underscore";

import KhanColors from "../util/colors";
import GraphUtils from "../util/graph-utils";

import InteractiveUtil from "./interactive-util";
import MovablePolygonOptions from "./movable-polygon-options";

const assert = InteractiveUtil.assert;
const normalizeOptions = InteractiveUtil.normalizeOptions;

// Default "props" and "state". Both are added to this.state and
// receive magic getter methods (this.points() etc).
// However, properties in DEFAULT_PROPS are updated on `modify()`,
// while those in DEFAULT_STATE persist and are not updated.
// Things that the user might want to change should be on "props",
// while things used to render the point should be on "state".
const DEFAULT_PROPS = {
    points: null,
    angleLabels: [],
    showRightAngleMarkers: [],
    sideLabels: [],
    vertexLabels: [],
    numArcs: [],
    numArrows: [],
    numTicks: [],
    closed: true,
    static: false,
    cursor: "move",
    normalStyle: null, // turned into an object in this.modify
    highlightStyle: null, // likewise
    labelStyle: null, // likewise
} as const;
const DEFAULT_STATE = {
    added: false,
    hasMoved: false,
    visibleShape: null,
    mouseTarget: null,
} as const;

const MovablePolygon = function (
    graphie: any,
    movable: any,
    options: any,
): void {
    assert(graphie != null);
    assert(options != null);

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    _.extend(this, {
        graphie: graphie,
        movable: movable,
        state: {
            // Set here because this must be unique for each instance
            id: _.uniqueId("movablePolygon"),
        },
    });

    // We only set DEFAULT_STATE once, here
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.modify(_.extend({}, DEFAULT_STATE, options));
};

_.extend(MovablePolygon, MovablePolygonOptions);
InteractiveUtil.createGettersFor(
    MovablePolygon,
    _.extend({}, DEFAULT_PROPS, DEFAULT_STATE),
);
InteractiveUtil.addMovableHelperMethodsTo(MovablePolygon);

_.extend(MovablePolygon.prototype, {
    cloneState: function () {
        return _.extend(this.movable.cloneState(), this.state);
    },

    _createDefaultState: function () {
        return _.extend(
            {
                id: this.state.id,
            },
            normalizeOptions(
                // Defaults are copied from MovablePolygonOptions.*.standard
                // These defaults are set here instead of DEFAULT_PROPS/STATE
                // because they:
                //    - are objects, not primitives (and need a deeper copy)
                //    - they don't need getters created for them
                pluck(MovablePolygonOptions, "standard"),

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
     * Adjusts constructor parameters without changing previous settings
     * for any option not specified
     *
     * Analogous to React.js's setProps
     */
    update: function (options) {
        const self = this;
        const graphie = self.graphie;
        const state = _.extend(self.state, normalizeOptions(options));

        // Default things inside the state.normalStyle object, because
        // _.extend is not deep.
        // We use _.extend instead of _.defaults because we don't want
        // to modify the passed-in copy (especially if it's from
        // DEFAULT_PROPS/STATE!)
        const normalColor = state.static
            ? KhanColors.DYNAMIC
            : KhanColors.INTERACTIVE;
        state.normalStyle = _.extend(
            {},
            state.normalStyle,
            {
                "stroke-width": 2,
                "fill-opacity": 0,
                fill: normalColor,
                stroke: normalColor,
            },
            options.normalStyle,
        );

        state.highlightStyle = _.extend(
            {},
            {
                stroke: KhanColors.INTERACTING,
                "stroke-width": 2,
                fill: KhanColors.INTERACTING,
                "fill-opacity": 0.05,
            },
            state.highlightStyle,
        );

        state.labelStyle = _.extend(
            {},
            {
                stroke: KhanColors.DYNAMIC,
                "stroke-width": 1,
                color: KhanColors.DYNAMIC,
            },
            state.labelStyle,
        );

        if (!state.static) {
            // the invisible shape in front of the point that gets mouse events
            if (!state.mouseTarget) {
                state.mouseTarget = graphie.mouselayer.path(this.path());
                state.mouseTarget.attr({
                    fill: "#000",
                    opacity: 0,
                    cursor: "move",
                });
            }
        }

        // The Movable representing this MovablePolygon's representation
        // This handles mouse events for us, which we propagate in
        // onMove. The onMoveStart-onMove-onMoveEnd logic is borrowed from
        // movable-line.js.
        self.movable.modify(
            _.extend({}, state, {
                modify: null,
                draw: self.draw.bind(self),
                remove: null,
                onMoveStart: function () {
                    self._initialRefCoord = self.coord(0);
                    self._prevRefCoord = self._initialRefCoord;
                    self._totalDelta = [0, 0];

                    self._fireEvent(
                        self.state.onMoveStart,
                        self.coord(0),
                        self.coord(0),
                    );
                },
                onMove: function (mouseCoord, prevMouseCoord) {
                    const delta = kvector.subtract(mouseCoord, prevMouseCoord);
                    self._totalDelta = kvector.add(self._totalDelta, delta);
                    let refCoord = kvector.add(
                        self._initialRefCoord,
                        self._totalDelta,
                    );

                    refCoord = self._applyConstraints(
                        refCoord,
                        self._prevRefCoord,
                    );
                    if (refCoord === false) {
                        return;
                    }

                    self._fireEvent(
                        self.state.onMove,
                        refCoord,
                        self._prevRefCoord,
                    );
                    self._prevRefCoord = refCoord;
                },
                onMoveEnd: function () {
                    self._fireEvent(
                        self.state.onMoveEnd,
                        self._prevRefCoord,
                        self._initialRefCoord,
                    );
                },
            }),
        );

        // Update the polygon with the points' movement
        _.invoke(
            state.points,
            "listen",
            "onMove",
            state.id,
            self.draw.bind(self),
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

    path: function (state) {
        const graphie = this.graphie;
        state = state || this.state;

        let coords = _.map(state.points, function (point) {
            return graphie.scalePoint(point.coord());
        });

        // Create path
        if (state.closed) {
            coords.push(true);
        } else {
            // For open polygons, concatenate a reverse of the path,
            // to remove the inside area of the path, which would
            // otherwise be clickable (even if the closing line segment
            // wasn't drawn
            coords = coords.concat(_.clone(coords).reverse());
        }

        return GraphUtils.unscaledSvgPath(coords);
    },

    coords: function () {
        return _.invoke(this.state.points, "coord");
    },

    point: function (index) {
        return this.state.points[index];
    },

    coord: function (index) {
        return this.point(index).coord();
    },

    remove: function () {
        this.state.added = false;
        this._fireEvent(this.state.remove);
        if (this.state.points) {
            _.invoke(this.state.points, "unlisten", "onMove", this.state.id);
        }

        if (this.movable) {
            // We need this to be guarded because it is called on the initial
            // constructor/modify call, before this.movable is created
            this.movable.remove();
        }

        this.state.mouseTarget = null;
    },

    constrain: function () {
        if (this.points == null || this.points.length === 0) {
            return;
        }

        const prevRefCoord = this.coord(0);
        const refCoord = this._applyConstraints(prevRefCoord, prevRefCoord);
        if (refCoord !== false) {
            this._fireEvent(this.state.onMove, refCoord, prevRefCoord);
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
});

export default MovablePolygon;
