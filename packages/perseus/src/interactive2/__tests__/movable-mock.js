// @flow
/**
 * Create a Mocked Movable
 */

import _ from "underscore";

import Movable from "../movable.js";

const createMock = function (): $FlowFixMe {
    // $FlowFixMe[invalid-constructor]
    const movable = new Movable(null, {
        mouseTarget: null,
    });
    // $FlowFixMe[prop-missing]
    movable.modify = function (options) {
        // $FlowFixMe[prop-missing]
        Movable.prototype.modify.call(movable, _.omit(options, "mouseTarget"));
    };
    _.each(
        ["onMoveStart", "onMove", "onMoveEnd", "onClick"],
        function (eventName) {
            movable[eventName] = function (coord, prevCoord) {
                this._fireEvent(this.state[eventName], coord, prevCoord);
            };
        },
    );
    // $FlowFixMe[prop-missing]
    movable.move = function () {
        const args = _.toArray(arguments);
        const startPoint = _.first(args);
        // TODO(jack): Move these into onMoveStart, onMove, and onMoveEnd
        movable.state.isMouseOver = true;
        movable.state.isHovering = true;
        movable.onMoveStart(startPoint, startPoint);
        _.each(_.rest(args), function (point, i) {
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

export default createMock;
