// System requires
var assert = require("assert");

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
        point: point,

        /**
         * Convenience function to fill in the no-drawing defaults
         * for a modify call
         */
        modify: function(options) {
            point.modify(_.extend({
                static: true,
                draw: null
            }, options));
        }
    };
};

describe("MovablePoint", function() {
    describe("add", function() {
        it("should snap to the grid when a snap is specified", function() {
            var point = createPoint({
                coord: [1.1, 1.1],
                constraints: MovablePoint.constraints.snap([1, 1])
            }).point;

            assert.deepEqual(point.coord(), [1, 1]);
        });
    });

    describe("modify", function() {
        it("should reset the point's size", function() {
            var defaultPointSize = createPoint({
                coord: [1, 1]  // uses the default pointSize
            }).point.pointSize();

            // verify that 10 was not, in fact, the default, or we should
            // change 10 to something else
            assert.notEqual(defaultPointSize, 10);

            var handle = createPoint({
                coord: [0, 0],
                pointSize: 10  // arbitrary size larger than the default
            });
            assert.strictEqual(handle.point.pointSize(), 10);

            handle.modify({
                coord: [0, 0]  // reset to the default pointSize
            });
            assert.strictEqual(handle.point.pointSize(), defaultPointSize);
        });

        it("should allow you to change the point's size", function() {
            var handle = createPoint({
                coord: [0, 0],
                pointSize: 5
            });
            assert.strictEqual(handle.point.pointSize(), 5);

            handle.modify({
                pointSize: 6
            });
            assert.strictEqual(handle.point.pointSize(), 6);
        });
    });

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
