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

var MovablePointOptions = require("./movable-point-options.js");
var InteractiveUtil = require("./interactive-util.js");
var assert = InteractiveUtil.assert;
var normalizeOptions = InteractiveUtil.normalizeOptions;

var knumber = KhanUtil.knumber;
var kpoint = KhanUtil.kpoint;

// state parameters that should be converted into an array of
// functions
var FUNCTION_ARRAY_OPTIONS = _.keys(MovablePointOptions);

// default state. these properties are added to this.state and
// receive magic getter methods (this.coord() etc)
var DEFAULT_PROPERTIES = {
    coord: [0, 0],
    pointSize: 4,
    hasMoved: false,
    static: false,
    cursor: "move",
    mouseTarget: null,
    visibleShape: null,
    normalStyle: {},
    highlightStyle: {}
};

var MovablePoint = function(graphie, movable, options) {
    _.extend(this, {
        graphie: graphie,
        movable: movable,
        state: _.extend({
            // Set here because this must be unique for each instance
            id: _.uniqueId("movablePoint")
        }, normalizeOptions(
            // These defaults are set here instead of DEFAULT_PROPERTIES
            // they don't need getters created for them
            // TODO(jack) We really ough to normalize once, in this.modify()
            // TODO(jack): Consider "default" once we es3ify perseus
            FUNCTION_ARRAY_OPTIONS,
            InteractiveUtil.pluck(MovablePointOptions, "standard")
        ), DEFAULT_PROPERTIES)
    });

    this.modify(options);
};

_.extend(MovablePoint, MovablePointOptions);
InteractiveUtil.createGettersFor(MovablePoint, DEFAULT_PROPERTIES);
InteractiveUtil.addMovableHelperMethodsTo(MovablePoint);

_.extend(MovablePoint.prototype, {

    cloneState: function() {
        return _.extend(this.movable.cloneState(), this.state);
    },

    modify: function(options) {
        this.remove();
        var self = this;
        var graphie = this.graphie;
        var state = _.extend(self.state,
                normalizeOptions(FUNCTION_ARRAY_OPTIONS, options));

        // Default things inside the state.normalStyle object, because
        // _.extend is not deep
        state.normalStyle = _.extend({
            fill: KhanUtil.ORANGE,
            stroke: KhanUtil.ORANGE,
            scale: 1
        }, state.normalStyle);

        // Default things inside the state.highlightStyle object, because
        // _.extend is not deep
        state.highlightStyle = _.extend({
            fill: KhanUtil.ORANGE,
            stroke: KhanUtil.ORANGE,
            scale: 2
        }, state.highlightStyle);

        if (!state.static) {
            // the invisible shape in front of the point that gets mouse events
            if (!state.mouseTarget) {
                state.mouseTarget = graphie.mouselayer.circle(
                    graphie.scalePoint(self.state.coord)[0],
                    graphie.scalePoint(self.state.coord)[1],
                    15
                );
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
            add: [],
            draw: _.bind(self.draw, self),
            remove: [],
            onMoveStart: function() {
                state.hasMoved = false;
                startCoord = state.coord;
                self._fireEvent(state.onMoveStart, startCoord, startCoord);
                self.draw();
            },
            onMove: function(coord) {
                // The caller has the option of adding an onMove() method to the
                // movablePoint object we return as a sort of event handler
                // By returning false from onMove(), the move can be vetoed,
                // providing custom constraints on where the point can be moved.
                // By returning array [x, y], the move can be overridden

                var result = self._applyConstraints(coord, state.coord);
                if (result === false) {
                    return;
                } else if (kpoint.is(result)) {
                    coord = result;
                }
                if (!kpoint.equal(coord, state.coord)) {
                    var prevCoord = state.coord;
                    state.coord = coord;
                    state.hasMoved = true;
                    self._fireEvent(state.onMove, state.coord, prevCoord);
                    self.draw();
                }
            },
            onMoveEnd: function() {
                if (self.isHovering() && !state.hasMoved) {
                    self._fireEvent(state.onClick, state.coord, startCoord);
                }
                self._fireEvent(state.onMoveEnd, state.coord, startCoord);
                state.hasMoved = false;
                self.draw();
            }
        }));

        self.prevState = self.cloneState();
        self._fireEvent(state.add, self.prevState);
        // Update the state if add() changed it
        self.prevState = self.cloneState();
    },

    remove: function() {
        this._fireEvent(this.state.remove);
        if (this.movable) {
            this.movable.remove();
        }
        // TODO(jack): This should really be moved off of
        // movablePoint.state and only kept on movable.state
        this.state.mouseTarget = null;
    },

    setCoord: function(coord) {
        assert(kpoint.is(coord, 2));
        this.state.coord = _.clone(coord);
        this.draw();
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

module.exports = MovablePoint;
