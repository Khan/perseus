/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var Movable = require("./interactive2/movable.js");
var MovablePoint = require("./interactive2/movable-point.jsx");
var MovableLine = require("./interactive2/movable-line.js");
var MovablePolygon = require("./interactive2/movable-polygon.js");

const KhanColors = require("./util/colors.js");

var Interactive2 = {
    MovablePoint: MovablePoint,
    addMovablePoint: function(graphie, options) {
        var movable = new Movable(graphie, {});
        return new MovablePoint(graphie, movable, options);
    },
    MovableLine: MovableLine,
    addMovableLine: function(graphie, options) {
        var movable = new Movable(graphie, {});
        return new MovableLine(graphie, movable, options);
    },
    MovablePolygon: MovablePolygon,
    addMovablePolygon: function(graphie, options) {
        var movable = new Movable(graphie, {});
        return new MovablePolygon(graphie, movable, options);
    },

    addMaybeMobileMovablePoint: function(widget, extraProps) {
        const isMobile = widget.props.apiOptions.isMobile;

        const commonStyle = isMobile ? {
            stroke: "#ffffff",
            "stroke-width": 3,
            fill: KhanColors.INTERACTIVE,
        } : {
            stroke: KhanColors.INTERACTIVE,
            fill: KhanColors.INTERACTIVE,
        };

        const normalStyle = Object.assign(commonStyle, extraProps.normalStyle);

        const highlightStyle = Object.assign(isMobile ? {
            ...commonStyle,
            "stroke-width": 0,
            scale: 0.75,
        } : {}, extraProps.highlightStyle);

        const props = Object.assign({
            normalStyle: normalStyle,
            highlightStyle: highlightStyle,
            shadow: isMobile,
            tooltip: isMobile && widget.props.showTooltips,
            showHairlines: widget.showHairlines,
            hideHairlines: widget.hideHairlines,
        }, isMobile ? {pointSize: 7} : {});

        return Interactive2.addMovablePoint(
            widget.graphie,
            Object.assign(extraProps, props)
        );
    }
};

module.exports = Interactive2;
