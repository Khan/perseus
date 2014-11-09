/**
 * Creates and adds a polygon to the graph that can be dragged around.
 * It allows constraints on its movement and draws when moves happen.
 */

var MovablePolygonOptions = require("./movable-polygon-options.js");
var InteractiveUtil = require("./interactive-util.js");
var objective_ = require("./objective_.js");
var assert = InteractiveUtil.assert;
var normalizeOptions = InteractiveUtil.normalizeOptions;

var kvector = require("kmath").vector;

// State parameters that should be converted into an array of
// functions
var FUNCTION_ARRAY_OPTIONS = _.keys(MovablePolygonOptions);

// Default "props" and "state". Both are added to this.state and
// receive magic getter methods (this.points() etc).
// However, properties in DEFAULT_PROPS are updated on `modify()`,
// while those in DEFAULT_STATE persist and are not updated.
// Things that the user might want to change should be on "props",
// while things used to render the point should be on "state".
var DEFAULT_PROPS = {
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
    normalStyle: null,    // turned into an object in this.modify
    highlightStyle: null, // likewise
    labelStyle: null      // likewise
};
var DEFAULT_STATE = {
    added: false,
    hasMoved: false,
    visibleShape: null,
    mouseTarget: null
};

var MovablePolygon = function(graphie, movable, options) {
    assert(graphie != null);
    assert(options != null);

    _.extend(this, {
        graphie: graphie,
        movable: movable,
        state: {
            // Set here because this must be unique for each instance
            id: _.uniqueId("movablePolygon")
        }
    });

    // We only set DEFAULT_STATE once, here
    this.modify(_.extend({}, DEFAULT_STATE, options));
};

_.extend(MovablePolygon, MovablePolygonOptions);
InteractiveUtil.createGettersFor(MovablePolygon, _.extend({},
    DEFAULT_PROPS,
    DEFAULT_STATE
));
InteractiveUtil.addMovableHelperMethodsTo(MovablePolygon);

_.extend(MovablePolygon.prototype, {

    cloneState: function() {
        return _.extend(this.movable.cloneState(), this.state);
    },

    _createDefaultState: function() {
        return _.extend({
            id: this.state.id,
        }, normalizeOptions(
            FUNCTION_ARRAY_OPTIONS,
            // Defaults are copied from MovablePolygonOptions.*.standard
            // These defaults are set here instead of DEFAULT_PROPS/STATE
            // because they:
            //    - are objects, not primitives (and need a deeper copy)
            //    - they don't need getters created for them
            // TODO(jack): Consider "default" once we es3ify perseus
            objective_.pluck(MovablePolygonOptions, "standard")

        // We only update props here, because we want things on state to
        // be persistent, and updated appropriately in modify()
        ), DEFAULT_PROPS);
    },

    /**
     * Resets the object to its state as if it were constructed with
     * `options` originally. state not on DEFAULT_PROPS is maintained.
     *
     * Analogous to React.js's replaceProps
     */
    modify: function(options) {
        this.update(_.extend(this._createDefaultState(), options));
    },

    /**
     * Adjusts constructor parameters without changing previous settings
     * for any option not specified
     *
     * Analogous to React.js's setProps
     */
    update: function(options) {
        var self = this;
        var graphie = self.graphie;
        var state = _.extend(
            self.state,
            normalizeOptions(FUNCTION_ARRAY_OPTIONS, options)
        );

        // Default things inside the state.normalStyle object, because
        // _.extend is not deep.
        // We use _.extend instead of _.defaults because we don't want
        // to modify the passed-in copy (especially if it's from
        // DEFAULT_PROPS/STATE!)
        var normalColor = (state.static) ? KhanUtil.DYNAMIC :
                                           KhanUtil.INTERACTIVE;
        state.normalStyle = _.extend({}, state.normalStyle, {
            "stroke-width": 2,
            "fill-opacity": 0,
            "fill": normalColor,
            "stroke": normalColor
        }, options.normalStyle);

        state.highlightStyle = _.extend({}, {
            "stroke": KhanUtil.INTERACTING,
            "stroke-width": 2,
            "fill": KhanUtil.INTERACTING,
            "fill-opacity": 0.05
        }, state.highlightStyle);

        state.labelStyle = _.extend({}, {
            "stroke": KhanUtil.DYNAMIC,
            "stroke-width": 1,
            "color": KhanUtil.DYNAMIC
        }, state.labelStyle);

        if (!state.static) {
            // the invisible shape in front of the point that gets mouse events
            if (!state.mouseTarget) {
                state.mouseTarget = graphie.mouselayer.path(this.path());
                state.mouseTarget.attr({fill: "#000", opacity: 0,
                    cursor: "move"});
            }
        }

        // The Movable representing this MovablePolygon's representation
        // This handles mouse events for us, which we propagate in
        // onMove. The onMoveStart-onMove-onMoveEnd logic is borrowed from
        // movable-line.js.
        self.movable.modify(_.extend({}, state, {
            modify: null,
            draw: self.draw.bind(self),
            remove: null,
            onMoveStart: function() {
                self._initialRefCoord = self.coord(0);
                self._prevRefCoord = self._initialRefCoord;
                self._totalDelta = [0, 0];

                self._fireEvent(self.state.onMoveStart,
                    self.coord(0),
                    self.coord(0)
                );
            },
            onMove: function(mouseCoord, prevMouseCoord) {
                var delta = kvector.subtract(mouseCoord, prevMouseCoord);
                self._totalDelta = kvector.add(self._totalDelta, delta);
                var refCoord = kvector.add(self._initialRefCoord, self._totalDelta);

                refCoord = self._applyConstraints(refCoord, self._prevRefCoord);
                if (refCoord === false) {
                    return;
                }

                self._fireEvent(self.state.onMove, refCoord, self._prevRefCoord);
                self._prevRefCoord = refCoord;
            },
            onMoveEnd: function() {
                self._fireEvent(self.state.onMoveEnd,
                    self._prevRefCoord,
                    self._initialRefCoord
                );
            },
        }));

        // Update the polygon with the points' movement
        _.invoke(state.points, "listen", "onMove", state.id,
            self.draw.bind(self));

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

    path: function(state) {
        var graphie = this.graphie;
        state = state || this.state;

        var coords = _.map(state.points, function(point) {
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
            coords = coords.concat(
                _.clone(coords).reverse()
            );
        }

        return KhanUtil.unscaledSvgPath(coords);
    },

    coords: function() {
        return _.invoke(this.state.points, "coord");
    },

    point: function(index) {
        return this.state.points[index];
    },

    coord: function(index) {
        return this.point(index).coord();
    },

    remove: function() {
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

        // TODO(jack): This should really be moved off of
        // movablePolygon.state and only kept on movable.state
        this.state.mouseTarget = null;
    },

    constrain: function() {
        if (this.points == null || this.points.length === 0) {
            return;
        }

        var prevRefCoord = this.coord(0);
        var refCoord = this._applyConstraints(prevRefCoord, prevRefCoord);
        if (refCoord !== false) {
            this._fireEvent(this.state.onMove, refCoord, prevRefCoord);
        }
    },

    // Clone these for use with raphael, which modifies the input
    // style parameters
    normalStyle: function() {
        return _.clone(this.state.normalStyle);
    },

    highlightStyle: function() {
        return _.clone(this.state.highlightStyle);
    },

    // Change z-order to back
    toBack: function() {
        this.movable.toBack();
        if (this.state.visibleShape) {
            this.state.visibleShape.toBack();
        }
    },

    // Change z-order to front
    toFront: function() {
        if (this.state.visibleShape) {
            this.state.visibleShape.toFront();
        }
        this.movable.toFront();
    },

    /**
     * Forwarding methods to this.movable:
     */
    isHovering: function() {
        return this.movable.isHovering();
    },

    isDragging: function() {
        return this.movable.isDragging();
    },

    mouseTarget: function() {
        return this.movable.mouseTarget();
    }
});

module.exports = MovablePolygon;
