
var Movable = require("./interactive2/movable.js");
var MovablePoint = require("./interactive2/movable-point.js");

var Interactive2 = {
    MovablePoint: MovablePoint,
    addMovablePoint: function(graphie, options) {
        var movable = new Movable(graphie, {});
        return new MovablePoint(graphie, movable, options);
    }
};

module.exports = Interactive2;
