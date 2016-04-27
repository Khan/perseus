const Movable = require("./interactive2/movable.js");
const MovablePoint = require("./interactive2/movable-point.js");
const MovableLine = require("./interactive2/movable-line.js");
const MovablePolygon = require("./interactive2/movable-polygon.js");

const Interactive2 = {
    MovablePoint: MovablePoint,
    addMovablePoint: function(graphie, options) {
        const movable = new Movable(graphie, {});
        return new MovablePoint(graphie, movable, options);
    },
    MovableLine: MovableLine,
    addMovableLine: function(graphie, options) {
        const movable = new Movable(graphie, {});
        return new MovableLine(graphie, movable, options);
    },
    MovablePolygon: MovablePolygon,
    addMovablePolygon: function(graphie, options) {
        const movable = new Movable(graphie, {});
        return new MovablePolygon(graphie, movable, options);
    },
};

module.exports = Interactive2;
