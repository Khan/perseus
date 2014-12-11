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
var _ = require("underscore");

var MovablePointOptions = require("./movable-point-options.js");
var WrappedEllipse = require("./wrapped-ellipse.js");
var InteractiveUtil = require("./interactive-util.js");
var objective_ = require("./objective_.js");
var assert = InteractiveUtil.assert;
var normalizeOptions = InteractiveUtil.normalizeOptions;

var kpoint = require("kmath").point;

// State parameters that should be converted into an array of
// functions
var FUNCTION_ARRAY_OPTIONS = _.keys(MovablePointOptions);

// Default "props" and "state". Both are added to this.state and
// receive magic getter methods (this.coord() etc).
// However, properties in DEFAULT_PROPS are updated on `modify()`,
// while those in DEFAULT_STATE persist and are not updated.
// Things that the user might want to change should be on "props",
// while things used to render the point should be on "state".
var DEFAULT_PROPS = {
    coord: [0, 0],
    pointSize: 4,
    static: false,
    cursor: "move",
    normalStyle: null,    // turned into an object in this.modify
    highlightStyle: null  // likewise
};
var DEFAULT_STATE = {
    added: false,
    hasMoved: false,
    visibleShape: null,
    mouseTarget: null
};

var MovablePoint = function(graphie, movable, options) {
    _.extend(this, {
        graphie: graphie,
        movable: movable,
        state: {
            // Set here because this must be unique for each instance
            id: _.uniqueId("movablePoint")
        }
    });

    // We only set DEFAULT_STATE once, here
    this.modify(_.extend({}, DEFAULT_STATE, options));
};

_.extend(MovablePoint, MovablePointOptions);
InteractiveUtil.createGettersFor(MovablePoint, _.extend({},
    DEFAULT_PROPS,
    DEFAULT_STATE
));
InteractiveUtil.addMovableHelperMethodsTo(MovablePoint);

_.extend(MovablePoint.prototype, {

    cloneState: function() {
        return _.extend(this.movable.cloneState(), this.state);
    },

    _createDefaultState: function() {
        return _.extend({
            id: this.state.id,
        }, normalizeOptions(
            FUNCTION_ARRAY_OPTIONS,
            // Defaults are copied from MovablePointOptions.*.standard
            // These defaults are set here instead of DEFAULT_PROPS/STATE
            // because they:
            //    - are objects, not primitives (and need a deeper copy)
            //    - they don't need getters created for them
            // TODO(jack): Consider "default" once we es3ify perseus
            objective_.pluck(MovablePointOptions, "standard")

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

        assert(kpoint.is(state.coord));

        // Default things inside the state.normalStyle object, because
        // _.extend is not deep.
        // We use _.extend instead of _.defaults because we don't want
        // to modify the passed-in copy (especially if it's from
        // DEFAULT_PROPS/STATE!)
        var normalColor = (state.static) ? KhanUtil.DYNAMIC
                                         : KhanUtil.INTERACTIVE;
        state.normalStyle = _.extend({
            fill: normalColor,
            stroke: normalColor,
            scale: 1
        }, state.normalStyle);

        state.highlightStyle = _.extend({
            fill: KhanUtil.INTERACTING,
            stroke: KhanUtil.INTERACTING,
            scale: 2
        }, state.highlightStyle);

        if (!state.static) {
            // the invisible shape in front of the point that gets mouse events
            if (!state.mouseTarget) {
                var center = self.state.coord;
                var radii = graphie.unscaleVector(15);
                var options = {
                    mouselayer: true
                };
                state.mouseTarget = new WrappedEllipse(graphie, center, radii,
                    options);
                state.mouseTarget.attr({fill: "#000", opacity: 0.0});
            }
        }

        // The starting coord of any move, sent to onMoveEnd as the previous
        // value
        var startCoord = state.coord;

        // The Movable representing this movablePoint's representation
        // This handles mouse events for us, which we propagate in
        // onMove
        self.movable.modify(_.extend({}, state, {
            add: null,
            modify: null,
            draw: self.draw.bind(self),
            remove: null,
            onMoveStart: function() {
                state.hasMoved = false;
                startCoord = state.coord;
                self._fireEvent(state.onMoveStart, startCoord, startCoord);
                self.draw();
            },
            onMove: self.moveTo.bind(self),
            onMoveEnd: function() {
                if (self.isHovering() && !state.hasMoved) {
                    self._fireEvent(state.onClick, state.coord, startCoord);
                }
                self._fireEvent(state.onMoveEnd, state.coord, startCoord);
                state.hasMoved = false;
                self.draw();
            }
        }));

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

    remove: function() {
        this.state.added = false;
        this._fireEvent(this.state.remove);
        if (this.movable) {
            this.movable.remove();
        }
        // TODO(jack): This should really be moved off of
        // movablePoint.state and only kept on movable.state
        this.state.mouseTarget = null;
    },

    constrain: function() {
        var result = this._applyConstraints(this.coord(), this.coord());
        if (kpoint.is(result)) {
            this.setCoord(result);
        }
        return result !== false;
    },

    setCoord: function(coord) {
        assert(kpoint.is(coord, 2));
        this.state.coord = _.clone(coord);
        this.draw();
    },

    setCoordConstrained: function(coord) {
        assert(kpoint.is(coord, 2));
        var result = this._applyConstraints(coord, this.coord());
        if (result !== false) {
            this.state.coord = _.clone(result);
            this.draw();
        }
    },

    moveTo: function(coord) {
        // The caller has the option of adding an onMove() method to the
        // movablePoint object we return as a sort of event handler
        // By returning false from onMove(), the move can be vetoed,
        // providing custom constraints on where the point can be moved.
        // By returning array [x, y], the move can be overridden

        var state = this.state;
        var result = this._applyConstraints(coord, state.coord);
        if (result === false) {
            return;
        } else if (kpoint.is(result)) {
            coord = result;
        }
        if (!kpoint.equal(coord, state.coord)) {
            var prevCoord = state.coord;
            state.coord = coord;
            state.hasMoved = true;
            this._fireEvent(state.onMove, state.coord, prevCoord);
            this.draw();
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
    },

    grab: function(coord) {
        this.movable.grab(coord);
        this.moveTo(coord);
    }
});

module.exports = MovablePoint;
