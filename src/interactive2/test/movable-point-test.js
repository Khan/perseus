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
            handle.movable.onMove([3, 4], [2.5, 4]);
            assert.deepEqual(movedToCoord, [3, 4]);
        });
    });

});
