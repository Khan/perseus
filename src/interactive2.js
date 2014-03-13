
var Movable = require("./interactive2/movable.js");
var MovablePoint = require("./interactive2/movable-point.js");
var MovableLine = require("./interactive2/movable-line.js");

var Interactive2 = {
    MovablePoint: MovablePoint,
    addMovablePoint: function(graphie, options) {
        var movable = new Movable(graphie, {});
        return new MovablePoint(graphie, movable, options);
    },
    MovableLine: MovableLine,
    addMovableLine: function(graphie, options) {
        return new MovableLine(graphie, options);
    }
};

module.exports = Interactive2;
