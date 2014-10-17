/**
 * A library of options to pass to add/draw/remove/constraints
 */

var knumber = require("kmath").number;
var kvector = require("kmath").vector;
var kpoint = require("kmath").point;

/**
 * Helper functions
 */
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
    clipPoint = graph.scalePoint(clipPoint);

    var arrowHead = graph.raphael.path("M-3 4 C-2.75 2.5 0 0.25 0.75 0C0 -0.25 -2.75 -2.5 -3 -4");
    arrowHead.rotate(360 - angle, 0.75, 0)
        .scale(1.4, 1.4, 0.75, 0)
        .translate(clipPoint[0], clipPoint[1])
        .attr(style)
        .attr({ "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-dasharray": "" });

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


module.exports = {
    add: add,
    modify: modify,
    draw: draw,
    remove: remove,

    onMoveStart: {standard: null},
    constraints: constraints,
    onMove: {standard: null},
    onMoveEnd: {standard: null},
};
