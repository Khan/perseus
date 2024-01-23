import {DrawingTransform} from "./drawing-transform";
import {GraphBounds} from "./graph-bounds";

import type {Coord} from "../interactive2/types";

describe("DrawingTransform", () => {
    describe("with bounds of -10 to 10, and 5px per unit", () => {
        let transform: DrawingTransform;
        beforeEach(() => {
            const bounds = new GraphBounds([-10, 10], [-10, 10]);
            // Each unit in both dimensions is 5 pixels, so the whole graph
            // is 100px by 100px
            const scale: [number, number] = [5, 5];
            transform = new DrawingTransform({setSize() {}}, scale, bounds);
        });

        const testPoints: [string, Coord, Coord][] = [
            ["lower left corner", [-10, -10], [0, 100]],
            ["upper left corner", [-10, 10], [0, 0]],
            ["lower right corner", [10, -10], [100, 100]],
            ["upper right corner", [10, 10], [100, 0]],
            ["origin", [0, 0], [50, 50]],
        ];

        it.each(testPoints)(
            "transforms the point at the %s from math coords to canvas coords",
            (_, cartesian, canvas) => {
                expect(transform.scalePoint(cartesian)).toEqual(canvas);
            },
        );

        it.each(testPoints)(
            "transforms the point at the %s from canvas coords to math coords",
            (_, cartesian, canvas) => {
                expect(transform.unscalePoint(canvas)).toEqual(cartesian);
            },
        );
    });

    it("updates the size of the Raphael canvas when setScale is called with a number", () => {
        const raphael = {setSize: jest.fn()};
        const scale: Coord = [40, 40];
        const bounds = new GraphBounds([-10, 10], [-10, 10]);
        const transform = new DrawingTransform(raphael, scale, bounds);
        expect(raphael.setSize).toHaveBeenCalledWith(800, 800);

        // Act
        transform.setScale(5);

        // Assert
        expect(raphael.setSize).toHaveBeenCalledWith(100, 100);
    });

    it("updates the size of the Raphael canvas when setScale is called with dimensions", () => {
        const raphael = {setSize: jest.fn()};
        const scale: Coord = [40, 40];
        const bounds = new GraphBounds([-5, 5], [-5, 5]);
        const transform = new DrawingTransform(raphael, scale, bounds);
        expect(raphael.setSize).toHaveBeenCalledWith(400, 400);

        // Act
        transform.setScale([3, 7]);

        // Assert
        expect(raphael.setSize).toHaveBeenCalledWith(30, 70);
    });
});
