/**
 * Create a Mocked Movable
 */

var Movable = require("../movable.js");

var createMock = function() {
    var movable = new Movable(null, {
        mouseTarget: null
    });
    movable.modify = function(options) {
        Movable.prototype.modify.call(movable, _.omit(options, 'mouseTarget'));
    };
    _.each(["onMoveStart", "onMove", "onMoveEnd", "onClick"],
            function(eventName) {
        movable[eventName] = function(coord, prevCoord) {
            this._fireEvent(this.state[eventName], coord, prevCoord);
        };
    });
    return movable;
};

module.exports = createMock;
