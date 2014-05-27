/**
 * A library of options to pass to add/draw/remove/constraints
 */

var knumber = KhanUtil.knumber;
var kpoint = KhanUtil.kpoint;

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
            this.state.visibleShape = graphie.ellipse(
                this.coord(),
                [
                    this.pointSize() / graphie.scale[0],
                    this.pointSize() / graphie.scale[1]
                ],
                _.omit(this.normalStyle(), "scale")
            );
        }
        if (state.normalStyle !== prevState.normalStyle &&
                !_.isEqual(state.normalStyle, prevState.normalStyle)) {
            this.state.visibleShape.attr(this.normalStyle());
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
    add: {standard: null},
    modify: modify,
    draw: draw,
    remove: remove,

    onMoveStart: {standard: null},
    constraints: constraints,
    onMove: {standard: null},
    onMoveEnd: {standard: null},
    onClick: {standard: null}
};
