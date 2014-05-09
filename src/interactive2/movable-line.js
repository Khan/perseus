/**
 * MovableLine
 */

var Movable = require("./movable.js");
var MovableLineOptions = require("./movable-line-options.js");
var InteractiveUtil = require("./interactive-util.js");
var objective_ = require("./objective_.js");
var assert = InteractiveUtil.assert;
var normalizeOptions = InteractiveUtil.normalizeOptions;

var knumber = KhanUtil.knumber;
var kvector = KhanUtil.kvector;
var kpoint = KhanUtil.kpoint;

var FUNCTION_ARRAY_OPTIONS = [
    "add",
    "draw",
    "remove",
    "onMoveStart",
    "constraints",
    "onMove",
    "onMoveEnd"
];

// create getters for:
//   points: () => this.state.points
//   static: () => this.state.static
// etc...
var DEFAULT_PROPERTIES = {
    points: [[0, 0], [4, 4]],
    updatePoints: false,
    static: false,
    cursor: "move",
    mouseTarget: null,
    visibleShape: null,
    normalStyle: null,     // turned into an object in this.modify
    highlightStyle: null,  // likewise
    extendLine: false,
    extendRay: false
};

var MovableLine = function(graphie, options) {
    assert(graphie != null);
    assert(options != null);

    _.extend(this, {
        graphie: graphie,
        state: {
            // Set here because this must be unique for each instance
            id: _.uniqueId("movableLine"),
            // Set here because:
            //  - these defaults don't exist at file execution time
            //  - these don't need getters created for them
            add: [
                MovableLine.add.draw,
                MovableLine.add.pointsToFront
            ],
            draw: [
                MovableLine.draw.basic,
                MovableLine.draw.arrows,
                MovableLine.draw.highlight
            ],
            remove: [
                MovableLine.remove.basic,
                MovableLine.remove.arrows
            ],
            onMoveStart: [],
            constraints: [],
            onMove: [],
            onMoveEnd: []
        }
    });

    this.modify(options);
};

_.extend(MovableLine, MovableLineOptions);
InteractiveUtil.createGettersFor(MovableLine, DEFAULT_PROPERTIES);
InteractiveUtil.addMovableHelperMethodsTo(MovableLine);

_.extend(MovableLine.prototype, {

    cloneState: function() {
        return _.extend(this.movable.cloneState(), {
            coords: this.coords(),
        }, this.state);
    },

    _createDefaultState: function() {
        return _.extend({
            id: this.state.id,
        }, normalizeOptions(
            FUNCTION_ARRAY_OPTIONS,
            // Defaults are copied from MovableLineOptions.*.standard
            // These defaults are set here instead of DEFAULT_PROPERTIES
            // because they:
            //    - are objects, not primitives (and need a deeper copy)
            //    - they don't need getters created for them
            // TODO(jack): Consider "default" once we es3ify perseus
            objective_.pluck(MovableLineOptions, "standard")
        ), DEFAULT_PROPERTIES);
    },

    /**
     * Adjusts constructor parameters without changing previous settings
     * for any option not specified
     */
    update: function(options) {
        this.remove();  // Must be called here to modify this.state
                        // *before* we pass this.state into this.modify
                        // Otherwise, we'd end up re-adding the removed
                        // raphael elements :(.
        this.modify(_.extend({}, this.state, options));
    },

    /**
     * Resets the object to its state as if it were constructed with
     * `options` originally. The only state maintained is `state.id`
     */
    modify: function(options) {
        var self = this;
        var graphie = this.graphie;

        this.remove();

        var state = self.state = _.extend(
            self._createDefaultState(),
            normalizeOptions(FUNCTION_ARRAY_OPTIONS, options)
        );

        // Default things inside the state.normalStyle object, because
        // _.extend is not deep.
        // We use _.extend instead of _.defaults because we don't want
        // to modify the passed-in copy (especially if it's from
        // DEFAULT_PROPERTIES!)
        state.normalStyle = _.extend({
            stroke: KhanUtil.BLUE,
            "stroke-width": 2
        }, state.normalStyle);

        state.highlightStyle = _.extend({
            stroke: KhanUtil.ORANGE,
            "stroke-width": 3
        }, state.highlightStyle);

        if (!state.static) {
            // the invisible shape in front of the point that gets mouse events
            if (!state.mouseTarget) {
                state.mouseTarget = graphie.mouselayer.rect(0, -15, 1, 30);
                state.mouseTarget.attr({fill: "#000", "opacity": 0.0});
            }
        }

        if (state.static && state.mouseTarget) {
            // state.static was specified, remove any previously
            // existing mousetarget (from a previous modify)
            state.mouseTarget.remove();
            state.mouseTarget = null;
        }

        var initialRefCoord;
        var prevRefCoord;
        var totalDelta;

        self.movable = new Movable(graphie, _.extend({}, state, {
            mouseTarget: state.mouseTarget,

            add: [],
            draw: self.draw.bind(self),
            remove: [],

            onMoveStart: function() {
                initialRefCoord = self.coord(0);
                prevRefCoord = initialRefCoord;
                totalDelta = [0, 0];

                self._fireEvent(self.state.onMoveStart,
                    self.coord(0),
                    self.coord(0)
                );
            },

            onMove: function(mouseCoord, prevMouseCoord) {
                var delta = kvector.subtract(mouseCoord, prevMouseCoord);
                totalDelta = kvector.add(totalDelta, delta);
                var refCoord = kvector.add(initialRefCoord, totalDelta);

                refCoord = self._applyConstraints(refCoord, prevRefCoord);
                if (refCoord === false) {
                    return;
                }

                var actualDelta = kvector.subtract(refCoord, prevRefCoord);

                if (self.state.updatePoints) {
                    _.each(self.state.points, function(point) {
                        point.setCoord(kvector.add(
                            point.coord(),
                            actualDelta
                        ));
                    });
                }

                self._fireEvent(self.state.onMove, refCoord, prevRefCoord);
                prevRefCoord = refCoord;
            },

            onMoveEnd: function() {
                self._fireEvent(self.state.onMoveEnd,
                    prevRefCoord,
                    initialRefCoord
                );
            },
        }));

        // Update the line with the points' movement
        _.invoke(state.points, "listen", "onMove", state.id,
                self.draw.bind(self));

        self.prevState = self.cloneState();
        self._fireEvent(state.add, self.prevState);
        // Update the state if add() changed it
        self.prevState = self.cloneState();
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
        this._fireEvent(this.state.remove);
        if (this.points) {
            _.invoke(this.points, "unlisten", "onMove", this.state.id);
        }

        if (this.movable) {
            // We need this to be guarded because it is called on the initial
            // constructor/modify call, before this.movable is created
            this.movable.remove();
        }
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

module.exports = MovableLine;
