/**
 * A library of options to pass to add/draw/remove/constraints
 */
var _ = require("underscore");
var WrappedLine = require("./wrapped-line.js");
var WrappedPath = require("./wrapped-path.js");
var kvector = require("kmath").vector;
var kpoint = require("kmath").point;

/**
 * Helper functions
 */
var getScaledAngle = function(line) {
    var scaledA = line.graphie.scalePoint(line.coord(0));
    var scaledZ = line.graphie.scalePoint(line.coord(1));
    return kvector.polarDegFromCart(
        kvector.subtract(
            scaledZ,
            scaledA
        )
    )[1];
};

// Given `coord` and `angle`, find the point where a line extended
// from `coord` in the direction of `angle` would be clipped by the
// edge of the graphie canvas. Then draw an arrowhead at that point
// pointing in the direction of `angle`.
var getClipPoint = function(graph, coord, angle) {
    // Actually put the arrowheads 4px from the edge so they have
    // a bit of room
    var xExtent = graph.range[0][1] - graph.range[0][0];
    var yExtent = graph.range[1][1] - graph.range[1][0];

    // shoot a point off into the distance ...
    var distance = xExtent + yExtent;
    // we need to scale the point according to the scale of the axes
    var angleVec = graph.unscaleVector(
        kvector.cartFromPolarDeg([1, angle])
    );
    var distVec = kvector.scale(
        kvector.normalize(angleVec),
        distance
    );
    var farCoord = kvector.add(coord, distVec);
    var scaledAngle = kvector.polarDegFromCart(angleVec)[1];
    // ... and then bring it back
    var clipPoint = graph.constrainToBoundsOnAngle(farCoord, 4,
                                  scaledAngle * Math.PI / 180);
    return clipPoint;
};

// Given `coord` and `angle`, find the point where a line extended
// from `coord` in the direction of `angle` would be clipped by the
// edge of the graphie canvas. Then draw an arrowhead at that point
// pointing in the direction of `angle`.
var createArrow = function(graph, style) {
    // Points that define the arrowhead
    var center = [0.75, 0];
    var points = [
        [-3, 4],
        [-2.75, 2.5],
        [0, 0.25],
        center,
        [0, -0.25],
        [-2.75, -2.5],
        [-3, -4]
    ];

    // Scale points by 1.4 around (0.75, 0)
    var scale = 1.4;
    points = _.map(points, function(point) {
        var pv = kvector.subtract(point, center);
        var pvScaled = kvector.scale(pv, scale);
        return kvector.add(center, pvScaled);
    });

    // We can't just pass in a path to `graph.fixedPath` as we need to modify
    // the points in some way, so instead we provide a function for creating
    // the path once the points have been transformed
    var createCubicPath = function(points) {
        var path = "M" + points[0][0] + " " + points[0][1];
        for (var i = 1; i < points.length; i += 3) {
            path += "C" + points[i][0] + " " + points[i][1] + " " +
                          points[i + 1][0] + " " + points[i + 1][1] + " " +
                          points[i + 2][0] + " " + points[i + 2][1];
        }
        return path;
    };

    // Create arrowhead
    var unscaledPoints = _.map(points, graph.unscalePoint);
    var options = {
        center: graph.unscalePoint(center),
        createPath: createCubicPath
    };
    var arrowHead = new WrappedPath(graph, unscaledPoints, options);
    arrowHead.attr(_.extend({
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
        "stroke-dasharray": ""
    }, style));

    // Add custom function for transforming arrowheads that accounts for
    // center, scaling, etc.
    arrowHead.toCoordAtAngle = function(coord, angle) {
        var clipPoint = graph.scalePoint(getClipPoint(graph, coord, angle));
        arrowHead.transform(
            "translateX(" + (clipPoint[0] + scale * center[0]) + "px) " +
            "translateY(" + (clipPoint[1] + scale * center[1]) + "px) " +
            "translateZ(0) " +
            "rotate(" + (360 - KhanUtil.bound(angle)) + "deg)");
    };

    return arrowHead;
};


/**
 * MovableLine option functions
 */
var add = {
    // We do this in add as well as in standard so that we can call
    // pointsToFront after the first draw (which adds `this.visibleShape`)
    draw: function() {
        this.draw();
    },

    pointsToFront: function(state) {
        _.invoke(state.points, "toFront");
    }
};

add.standard = [add.draw, add.pointsToFront];

var modify = {
    draw: function() {
        this.draw();
    }
};

modify.standard = [modify.draw];

var draw = {
    basic: function(state) {
        var graphie = this.graphie;
        var start = this.coord(0);
        var end = this.coord(1);

        if (!this.state.visibleShape) {
            var options = {
                thickness: 10
            };
            this.state.visibleShape = new WrappedLine(graphie, start, end,
                options);
            this.state.visibleShape.attr(this.normalStyle());
            this.state.visibleShape.toFront();

            if (this.mouseTarget()) {
                this.mouseTarget().toFront();
            }
        }

        // Compute angle
        var angle = getScaledAngle(this);

        // Extend start, end if necessary (i.e., if not a line segment)
        if (state.extendLine) {
            start = getClipPoint(graphie, start, 360 - angle);
            end = getClipPoint(graphie, end, (540 - angle) % 360);
        } else if (state.extendRay) {
            end = getClipPoint(graphie, end, 360 - angle);
        }

        // Move elements
        var elements = [this.state.visibleShape];

        if (this.mouseTarget()) {
            elements.push(this.mouseTarget());
        }
        _.each(elements, function(element) {
            element.moveTo(start, end);
        });
    },

    arrows: function(state) {
        // Create arrows, if not yet created
        if (this._arrows == null) {
            this._arrows = [];
            if (state.extendLine) {
                this._arrows.push(createArrow(
                    this.graphie, this.normalStyle()));
                this._arrows.push(createArrow(
                    this.graphie, this.normalStyle()));
            } else if (state.extendRay) {
                this._arrows.push(createArrow(
                    this.graphie, this.normalStyle()));
            }
        }

        // Transform arrows
        var angle = getScaledAngle(this);
        var angleForArrow = [360 - angle, (540 - angle) % 360];
        _.each(this._arrows, function(arrow, i) {
            arrow.toCoordAtAngle(this.coord(i), angleForArrow[i]);
        }, this);
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
};

draw.standard = [draw.basic, draw.arrows, draw.highlight];


var remove = {
    basic: function() {
        if (this.state.visibleShape) {
            this.state.visibleShape.remove();
        }
    },

    arrows: function() {
        if (this._arrows != null) {
            _.invoke(this._arrows, "remove");
        }
        this._arrows = null;
    }
};

remove.standard = [remove.basic, remove.arrows];


var constraints = {
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
};

constraints.standard = null;


var onMove = {
    updatePoints: function(coord, prevCoord) {
        var actualDelta = kvector.subtract(coord, prevCoord);
        _.each(this.state.points, function(point) {
            point.setCoord(kvector.add(
                point.coord(),
                actualDelta
            ));
        });
    }
};

onMove.standard = null;


module.exports = {
    add: add,
    modify: modify,
    draw: draw,
    remove: remove,

    onMoveStart: {standard: null},
    constraints: constraints,
    onMove: onMove,
    onMoveEnd: {standard: null},
};
