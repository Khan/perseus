import {getCoordQuadrant} from "./coord-quadrant";

describe("getCoordQuadrant", () => {
    test.each`
        coord       | expected
        ${[0, 0]}   | ${"origin"}
        ${[3, 0]}   | ${"x-axis"}
        ${[0, 3]}   | ${"y-axis"}
        ${[2, 4]}   | ${1}
        ${[-2, 4]}  | ${2}
        ${[-2, -4]} | ${3}
        ${[2, -4]}  | ${4}
    `("returns $expected for coord $coord", ({coord, expected}) => {
        expect(getCoordQuadrant(coord)).toBe(expected);
    });
});
