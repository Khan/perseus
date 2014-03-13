/**
 * MovableLine
 */

var Movable = require("./movable.js");
var InteractiveUtil = require("./interactive-util.js");
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
    normalStyle: {},
    highlightStyle: {},
    extendLine: false,
    extendRay: false
};

// Given `coord` and `angle`, find the point where a line extended
// from `coord` in the direction of `angle` would be clipped by the
// edge of the graphie canvas. Then draw an arrowhead at that point
// pointing in the direction of `angle`.
var drawArrowAtClipPoint = function(graph, coord, angle, style) {
    // Actually put the arrowheads 4px from the edge so they have
    // a bit of room
    var xExtent = graph.range[0][1] - graph.range[0][0];
    var yExtent = graph.range[1][1] - graph.range[1][0];

    // shoot a point off into the distance ...
    var distance = xExtent + yExtent;
    // we need to scale the point according to the scale of the axes
    var xDist = distance * Math.cos(angle * Math.PI / 180) *
                    xExtent / yExtent;
    var yDist = distance * Math.sin(angle * Math.PI / 180);
    var farCoord = [coord[0] + xDist, coord[1] + yDist];
    var scaledAngle = KhanUtil.findAngle(farCoord, coord);
    // ... and then bring it back
    var clipPoint = graph.constrainToBoundsOnAngle(farCoord, 4,
                                  scaledAngle * Math.PI / 180);
    clipPoint = graph.scalePoint(clipPoint);

    var arrowHead = graph.raphael.path("M-3 4 C-2.75 2.5 0 0.25 0.75 0C0 -0.25 -2.75 -2.5 -3 -4");
    arrowHead.rotate(360 - angle, 0.75, 0)
        .scale(1.4, 1.4, 0.75, 0)
        .translate(clipPoint[0], clipPoint[1])
        .attr(style)
        .attr({ "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-dasharray": "" });

    return arrowHead;
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

InteractiveUtil.createGettersFor(MovableLine, DEFAULT_PROPERTIES);
InteractiveUtil.addMovableHelperMethodsTo(MovableLine);

_.extend(MovableLine.prototype, {

    cloneState: function() {
        return _.extend(this.movable.cloneState(), {
            coords: this.coords(),
        }, this.state);
    },

    modify: function(options) {
        var self = this;
        var graphie = this.graphie;

        this.remove();

        var state = _.extend(self.state, DEFAULT_PROPERTIES,
            normalizeOptions(FUNCTION_ARRAY_OPTIONS, options));

        _.defaults(state.normalStyle, {
            stroke: KhanUtil.BLUE,
            "stroke-width": 2
        });

        _.defaults(state.highlightStyle, {
            stroke: KhanUtil.ORANGE,
            "stroke-width": 3
        });

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
            draw: _.bind(self.draw, self),
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
                _.bind(self.draw, self));

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

var getScaledPolarDiff = function(line) {
    var scaledA = line.graphie.scalePoint(line.coord(0));
    var scaledZ = line.graphie.scalePoint(line.coord(1));
    var polarDiff = kvector.polarDegFromCart(
        kvector.subtract(
            scaledZ,
            scaledA
        )
    );
    return polarDiff;
};

_.extend(MovableLine, {
    add: {
        draw: function() {
            this.draw();
        },

        pointsToFront: function(state) {
            _.invoke(state.points, "toFront");
        }
    },

    draw: {
        basic: function(state) {
            var graphie = this.graphie;
            if (!this.state.visibleShape) {
                this.state.visibleShape = graphie.path(
                    [[0, 0]],
                    this.normalStyle()
                );
                this.state.visibleShape.attr({
                    path: KhanUtil.unscaledSvgPath([[0, 0], [1, 0]])
                });
            }


            // Clip the line 5px from the edge of the graphie to allow for
            // arrowheads
            if (state.extendLine || state.extendRay) {
                this.state.visibleShape.attr({
                    "clip-rect": "5 5 " + (graphie.dimensions[0] - 10) + " " +
                        (graphie.dimensions[1] - 10)
                });
            }

            var scaledA = graphie.scalePoint(this.coord(0));
            var scaledZ = graphie.scalePoint(this.coord(1));
            var polarDiff = getScaledPolarDiff(this);
            var lineLength = polarDiff[0];
            var angle = polarDiff[1];

            var elements = [this.state.visibleShape];
            if (this.mouseTarget()) {
                elements.push(this.mouseTarget());
            }
            _.each(elements, function(element) {
                element.translate(scaledA[0] - element.attr("translation").x,
                        scaledA[1] - element.attr("translation").y);
                element.rotate(angle, scaledA[0], scaledA[1]);
                if (state.extendLine) {
                    element.translate(-0.5, 0);
                    lineLength = graphie.dimensions[0] + graphie.dimensions[1];
                    lineLength = 2 * lineLength;
                } else if (state.extendRay) {
                    lineLength = graphie.dimensions[0] + graphie.dimensions[1];
                }
                element.scale(lineLength, 1, scaledA[0], scaledA[1]);
            });
        },

        arrows: function(state) {
            if (this._arrows != null) {
                _.invoke(this._arrows, "remove");
            }
            this._arrows = [];

            var polarDiff = getScaledPolarDiff(this);
            var angle = polarDiff[1];

            if (state.extendLine) {
                this._arrows.push(drawArrowAtClipPoint(
                    this.graphie, this.state.points[0].coord(), 360 - angle,
                    this.normalStyle()));
                this._arrows.push(drawArrowAtClipPoint(
                    this.graphie, this.state.points[1].coord(),
                    (540 - angle) % 360,
                    this.normalStyle()));
            } else if (state.extendRay) {
                this._arrows.push(drawArrowAtClipPoint(
                    this.graphie, this.state.points[0].coord(), 360 - angle,
                    this.normalStyle()));
            }
        },

        highlight: function(state, prevState) {
            // TODO(jack): Figure out a way to highlight the points attached to
            // the line. Maybe this means an additional isHovering: []
            // function to state of movable/movablepoint to define [additional?]
            // times it should be highlighted
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
        },
        arrows: function() {
            if (this._arrows != null) {
                _.invoke(this._arrows, "remove");
            }
        }
    },

    constraints: {
        fixed: function() {
            return function() { return false; };
        },

        snap: function(snap) {
            return function(coord, prevCoord) {
                if (snap === null) {
                    return true;
                }
                var delta = kvector.subtract(coord, prevCoord);
                snap = snap || this.graphie.snap;
                delta = kpoint.roundTo(delta, snap);
                return kvector.add(prevCoord, delta);
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
            return function(coord, prevCoord) {
                var graphie = this.graphie;
                var delta = kvector.subtract(coord, prevCoord);
                var range = range || graphie.range;
                // A null snap means no snap; an undefined snap means
                // default to graphie's
                if (snap === undefined) {
                    snap = graphie.snap;
                }

                // Calculate the bounds for both points
                var absoluteLower = graphie.unscalePoint([
                    paddingPx,
                    graphie.ypixels - paddingPx
                ]);
                var absoluteUpper = graphie.unscalePoint([
                    graphie.xpixels - paddingPx,
                    paddingPx
                ]);
                if (snap) {
                    absoluteLower = kpoint.ceilTo(absoluteLower, snap);
                    absoluteUpper = kpoint.floorTo(absoluteUpper, snap);
                }

                // Calculate the bounds for the delta.
                var deltaBounds = _.map(this.coords(), function(coord, i) {
                    var max = kvector.subtract(absoluteUpper, coord);
                    var min = kvector.subtract(absoluteLower, coord);
                    return [min, max];
                });

                // bound the delta by the calculated bounds
                var boundedDelta = _.reduce(deltaBounds,
                        function(delta, bound) {
                    var lower = bound[0];
                    var upper = bound[1];
                    var deltaX = Math.max(lower[0], Math.min(upper[0], delta[0]));
                    var deltaY = Math.max(lower[1], Math.min(upper[1], delta[1]));
                    return [deltaX, deltaY];
                }, delta);

                return kvector.add(prevCoord, boundedDelta);
            };
        }
    }
});

module.exports = MovableLine;
