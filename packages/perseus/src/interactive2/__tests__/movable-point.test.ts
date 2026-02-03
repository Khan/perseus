// System requires
import _ from "underscore";

// Interactive2 requires
import {Graphie} from "../../util/graphie";
import {MovablePoint} from "../movable-point";

import _createMockMovable from "./movable-mock";

// Create a testable MovablePoint with a mocked out Movable
const createPoint = function (options) {
    const movable = _createMockMovable();
    const point = new MovablePoint(
        new Graphie(document.createElement("div")),
        movable,
        _.extend(options, {
            static: true,
            draw: null,
            showHairlines: () => {},
            hideHairlines: () => {},

            // Mock visibleShape which is only added when a movable point is used
            // with a shape.
            visibleShape: {
                wrapper: {},
            },
        }),
    );
    return {
        movable: movable,
        point: point,

        /**
         * Convenience function to fill in the no-drawing defaults
         * for a modify call
         */
        modify: function (options) {
            point.modify(
                _.extend(
                    {
                        static: true,
                        draw: null,
                    },
                    options,
                ),
            );
        },
    };
};

describe("MovablePoint", function () {
    describe("add", function () {
        it("should snap to the grid when a snap is specified", function () {
            const point = createPoint({
                coord: [1.1, 1.1],
                // @ts-expect-error - TS2339 - Property 'constraints' does not exist on type '(graphie: any, movable: any, options: any) => void'.
                constraints: MovablePoint.constraints.snap([1, 1]),
            }).point;

            expect(point.coord()).toEqual([1, 1]);
        });
    });

    describe("modify", function () {
        it("should reset the point's size", function () {
            const defaultPointSize = createPoint({
                coord: [1, 1], // uses the default pointSize
            }).point.pointSize();

            // verify that 10 was not, in fact, the default, or we should
            // change 10 to something else
            expect(defaultPointSize).not.toEqual(10);

            const handle = createPoint({
                coord: [0, 0],
                pointSize: 10, // arbitrary size larger than the default
            });
            expect(handle.point.pointSize()).toBe(10);

            handle.modify({
                coord: [0, 0], // reset to the default pointSize
            });
            expect(handle.point.pointSize()).toBe(defaultPointSize);
        });

        it("should allow you to change the point's size", function () {
            const handle = createPoint({
                coord: [0, 0],
                pointSize: 5,
            });
            expect(handle.point.pointSize()).toBe(5);

            handle.modify({
                pointSize: 6,
            });
            expect(handle.point.pointSize()).toBe(6);
        });
    });

    describe("onMove", function () {
        it("should be called when movable is moved", function () {
            let movedToCoord;
            const handle = createPoint({
                coord: [1, 2],
                onMove: function (newCoord, prevCoord) {
                    expect(prevCoord).toEqual([1, 2]);
                    movedToCoord = newCoord;
                },
            });
            // move mouse from [2.5, 4] to [3, 4]
            handle.movable.move([2.5, 4], [3, 4]);
            expect(movedToCoord).toEqual([3, 4]);
            expect(handle.point.coord()).toEqual([3, 4]);
        });
    });

    describe("onClick", function () {
        it("should be called if the point didn't move", function () {
            let clickCoord;
            const handle = createPoint({
                coord: [1, 2],
                onClick: function (coord) {
                    clickCoord = coord;
                },
            });
            // move mouse from [1, 2] to [1, 2]
            handle.movable.move([1, 2], [1, 2]);
            expect(clickCoord).toEqual([1, 2]);
            expect(handle.point.coord()).toEqual([1, 2]);
        });

        it("should not be called if the point did move", function () {
            const handle = createPoint({
                coord: [1, 2],
                onClick: function (coord) {
                    expect(false).toBeTruthy();
                },
            });
            // move mouse from [1, 2] to [3, 4]
            handle.movable.move([1, 2], [3, 4]);
            expect(handle.point.coord()).toEqual([3, 4]);
        });
    });
});
