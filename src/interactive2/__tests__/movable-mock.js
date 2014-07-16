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
    movable.move = function() {
        var args = _.toArray(arguments);
        var startPoint = _.first(args);
        // TODO(jack): Move these into onMoveStart, onMove, and onMoveEnd
        movable.state.isMouseOver = true;
        movable.state.isHovering = true;
        movable.onMoveStart(startPoint, startPoint);
        _.each(_.rest(args), function(point, i) {
            movable.state.isDragging = true;
            movable.onMove(point, args[i]);
        });
        movable.onMoveEnd(_.last(args), startPoint);
        movable.state.dragging = false;
        movable.state.isMouseOver = false;
        movable.state.isHovering = false;
    };
    return movable;
};

module.exports = createMock;
