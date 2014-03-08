// System requires
var assert = require("assert");

// Interactive2 global dependencies
global._ = require("underscore");
global.KhanUtil = require("./kmath-shim.js");

// Interactive2 requires
var _createMockMovable = require("./movable-mock.js");
var MovablePoint = require("../movable-point.js");

// Create a testable MovablePoint with a mocked out Movable
var createPoint = function(options) {
    var movable = _createMockMovable();
    var point = new MovablePoint(null, movable, _.extend(options, {
        static: true,
        draw: null
    }));
    return {
        movable: movable,
        point: point
    };
};

describe("MovablePoint", function() {
    describe("onMove", function() {
        it("should be called when movable is moved", function() {
            var movedToCoord;
            var handle = createPoint({
                coord: [1, 2],
                onMove: function(newCoord, prevCoord) {
                    assert.deepEqual(prevCoord, [1, 2]);
                    movedToCoord = newCoord;
                }
            });
            // move mouse from [2.5, 4] to [3, 4]
            handle.movable.move([2.5, 4], [3, 4]);
            assert.deepEqual(movedToCoord, [3, 4]);
            assert.deepEqual(handle.point.coord(), [3, 4]);
        });
    });

    describe("onClick", function() {
        it("should be called if the point didn't move", function() {
            var clickCoord;
            var handle = createPoint({
                coord: [1, 2],
                onClick: function(coord) {
                    clickCoord = coord;
                }
            });
            // move mouse from [1, 2] to [1, 2]
            handle.movable.move([1, 2], [1, 2]);
            assert.deepEqual(clickCoord, [1, 2]);
            assert.deepEqual(handle.point.coord(), [1, 2]);
        });

        it("should not be called if the point did move", function() {
            var handle = createPoint({
                coord: [1, 2],
                onClick: function(coord) {
                    assert(false, "should not call onClick if " +
                            "the point moved");
                }
            });
            // move mouse from [1, 2] to [3, 4]
            handle.movable.move([1, 2], [3, 4]);
            assert.deepEqual(handle.point.coord(), [3, 4]);
        });
    });

});
