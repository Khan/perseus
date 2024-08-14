import {getAngleSideConstraint} from "./angle";

import type {vec} from "mafs";

function closeTo(x: number) {
    return expect.closeTo(x, 6);
}

describe("getAngleSideConstraint", () => {
    it("prevents vertical movement given a vertical side of an angle", () => {
        const side: vec.Vector2 = [0, 5];
        const vertex: vec.Vector2 = [0, 0];
        const snapDegrees = 45;

        const constraint = getAngleSideConstraint(side, vertex, snapDegrees);

        expect(constraint).toEqual({
            up: side,
            down: side,
            left: [closeTo(-5), 5],
            right: [closeTo(5), 5],
        });
    });

    it("prevents horizontal movement given a horizontal side of an angle", () => {
        const side: vec.Vector2 = [5, 0];
        const vertex: vec.Vector2 = [0, 0];
        const snapDegrees = 45;

        const constraint = getAngleSideConstraint(side, vertex, snapDegrees);

        expect(constraint).toEqual({
            up: [5, closeTo(5)],
            down: [5, closeTo(-5)],
            left: side,
            right: side,
        });
    });

    it("assigns the correct points to 'left' and 'right' when the side is pointing down", () => {
        const side: vec.Vector2 = [0, -5];
        const vertex: vec.Vector2 = [0, 0];
        const snapDegrees = 45;

        const constraint = getAngleSideConstraint(side, vertex, snapDegrees);

        expect(constraint).toEqual({
            up: side,
            down: side,
            left: [closeTo(-5), -5],
            right: [closeTo(5), -5],
        });
    });

    it("assigns the correct points to 'up' and 'down' when the side is pointing left", () => {
        const side: vec.Vector2 = [-5, 0];
        const vertex: vec.Vector2 = [0, 0];
        const snapDegrees = 45;

        const constraint = getAngleSideConstraint(side, vertex, snapDegrees);

        expect(constraint).toEqual({
            up: [-5, closeTo(5)],
            down: [-5, closeTo(-5)],
            left: side,
            right: side,
        });
    });
});
