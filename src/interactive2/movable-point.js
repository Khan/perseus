/**
 * Add a point to the graph that can be dragged around.
 * It allows constraints on its movement and draws when moves happen
 *
 * Options can be set to control how the point behaves:
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
 * returned is a nice MovablePoint object with some useful functions:
 *   setCoord: [x, y]
 *     changes the point's coordinate
 *   draw:
 *     redraws the coord
 *   modify: {options}
 *     modifies the original options passed to the point
 *   remove:
 *     removes the point from graphie
 */

var Movable = require("./movable.js");
var InteractiveUtil = require("./interactive-util.js");
var assert = InteractiveUtil.assert;
var normalizeOptions = InteractiveUtil.normalizeOptions;

var knumber = KhanUtil.knumber;
var kpoint = KhanUtil.kpoint;

// state parameters that should be converted into an array of
// functions
var FUNCTION_ARRAY_OPTIONS = [
    "add",
    "draw",
    "remove",
    "onMoveStart",
    "constraints",
    "onMove",
    "onMoveEnd",
    "onClick"
];

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

var MovablePoint = function(graphie, options) {
    _.extend(this, {
        graphie: graphie,
        state: {
            // Set here because this must be unique for each instance
            id: _.uniqueId("movablePoint"),
            // Set here because:
            //  - these defaults don't exist at file execution time
            //  - these don't need getters created for them
            add: [
                MovablePoint.add.draw,
                MovablePoint.add.constrain
            ],
            draw: [
                MovablePoint.draw.basic,
                MovablePoint.draw.highlight
            ],
            remove: [
                MovablePoint.remove.basic
            ],
            onMoveStart: [],
            constraints: [],
            onMove: [],
            onMoveEnd: [],
            onClick: []
        }
    });

    this.modify(options);
};

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
        var state = _.extend(self.state, DEFAULT_PROPERTIES,
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
        self.movable = new Movable(graphie, _.extend({}, state, {
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

/**
 * Library of options to pass to add/draw/remove/constraints
 */
_.extend(MovablePoint, {
    add: {
        constrain: function() {
            var result = this._applyConstraints(this.coord(), this.coord());
            if (kpoint.is(result)) {
                this.setCoord(result);
            }
        },

        draw: function() {
            this.draw();
        }
    },

    draw: {
        basic: function() {
            var graphie = this.graphie;
            if (!this.state.visibleShape) {
                this.state.visibleShape = graphie.ellipse(
                    this.coord(),
                    [
                        this.pointSize() / graphie.scale[0],
                        this.pointSize() / graphie.scale[1]
                    ],
                    _.omit(this.normalStyle(), "scale")
                );
            }
            var scaledPoint = graphie.scalePoint(this.coord());
            this.state.visibleShape.attr({cx: scaledPoint[0]});
            this.state.visibleShape.attr({cy: scaledPoint[1]});
            if (this.mouseTarget()) {
                this.mouseTarget().attr({ cx: scaledPoint[0] });
                this.mouseTarget().attr({ cy: scaledPoint[1] });
            }
        },

        highlight: function(state, prevState) {
            if (state.isHovering && !prevState.isHovering) {
                state.visibleShape.animate(
                    state.highlightStyle,
                    50
                );
            } else if (!state.isHovering && prevState.isHovering) {
                state.visibleShape.animate(
                    state.normalStyle,
                    50
                );
            }
        }
    },

    remove: {
        basic: function() {
            if (this.state.visibleShape) {
                this.state.visibleShape.remove();
            }
        }
    },

    constraints: {
        fixed: function() {
            return function() { return false; };
        },

        snap: function(snap) {
            return function(coord) {
                if (snap === null) {
                    return true;
                }
                snap = snap || this.graphie.snap;
                return kpoint.roundTo(coord, snap);
            };
        },

        bound: function(range, snap, paddingPx) {
            if (paddingPx === undefined) {
                if (range === undefined) {
                    paddingPx = 10;
                } else {
                    paddingPx = 0;
                }
            }
            return function(coord) {
                var graphie = this.graphie;
                range = range || graphie.range;
                if (snap === undefined) {
                    snap = graphie.snap;
                }

                var lower = graphie.unscalePoint([
                    paddingPx,
                    graphie.ypixels - paddingPx
                ]);
                var upper = graphie.unscalePoint([
                    graphie.xpixels - paddingPx,
                    paddingPx
                ]);
                if (snap) {
                    lower = kpoint.ceilTo(lower, snap);
                    upper = kpoint.floorTo(upper, snap);
                }
                var coordX = Math.max(lower[0], Math.min(upper[0], coord[0]));
                var coordY = Math.max(lower[1], Math.min(upper[1], coord[1]));
                return [coordX, coordY];
            };
        }
    }
});

module.exports = MovablePoint;
