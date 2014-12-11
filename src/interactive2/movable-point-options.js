/**
 * A library of options to pass to add/draw/remove/constraints
 */
var _ = require("underscore");

var WrappedEllipse = require("./wrapped-ellipse.js");
var kpoint = require("kmath").point;

var add = {
    constrain: function() {
        this.constrain();
    }
};

add.standard = [add.constrain];


var modify = {
    draw: function() {
        this.draw();
    }
};

modify.standard = [modify.draw];


var draw = {
    basic: function(state, prevState) {
        var graphie = this.graphie;
        if (!this.state.visibleShape) {
            var radii = [
                this.pointSize() / graphie.scale[0],
                this.pointSize() / graphie.scale[1]
            ];
            var options = {
                maxScale: Math.max(
                    this.highlightStyle().scale, this.normalStyle().scale)
            };
            this.state.visibleShape = new WrappedEllipse(graphie, this.coord(),
                radii, options);
            this.state.visibleShape.attr(_.omit(this.normalStyle(), "scale"));
            this.state.visibleShape.toFront();

            // Keep mouseTarget in front of visible shape
            if (this.mouseTarget()) {
                this.mouseTarget().toFront();
            }
        }
        if (state.normalStyle !== prevState.normalStyle &&
                !_.isEqual(state.normalStyle, prevState.normalStyle)) {
            this.state.visibleShape.attr(this.normalStyle());
        }

        this.state.visibleShape.moveTo(this.coord());
        if (this.mouseTarget()) {
            this.mouseTarget().moveTo(this.coord());
        }
    },

    highlight: function(state, prevState) {
        if (state.isHovering && !prevState.isHovering) {
            state.visibleShape.animate(
                this.highlightStyle(),
                50
            );
        } else if (!state.isHovering && prevState.isHovering) {
            state.visibleShape.animate(
                this.normalStyle(),
                50
            );
        }
    }
};

draw.standard = [draw.basic, draw.highlight];


var remove = {
    basic: function() {
        if (this.state.visibleShape) {
            this.state.visibleShape.remove();
            this.state.visibleShape = null;
        }
    }
};

remove.standard = remove.basic;


var constraints = {
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
    onClick: {standard: null}
};
