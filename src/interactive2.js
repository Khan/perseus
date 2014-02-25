
var MovablePoint = require("./interactive2/movable-point.js");

var Interactive2 = {
    MovablePoint: MovablePoint,
    addMovablePoint: function(graphie, options) {
        return new MovablePoint(graphie, options);
    }
};

module.exports = Interactive2;
