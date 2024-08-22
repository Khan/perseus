import {calculateAngleInDegrees} from "./angles";

describe("calculateAngleInDegrees", () => {
    it.each`
        x     | y     | expected | note
        ${0}  | ${0}  | ${0}     | ${": zero vector has an angle of zero"}
        ${1}  | ${0}  | ${0}     | ${""}
        ${1}  | ${-0} | ${-0}    | ${": a y-coord of -0 produces -0deg"}
        ${0}  | ${1}  | ${90}    | ${""}
        ${-1} | ${0}  | ${180}   | ${""}
        ${-1} | ${-0} | ${-180}  | ${": a y-coord of -0 produces -180deg"}
        ${0}  | ${-1} | ${-90}   | ${""}
    `("returns $expected degrees given [$x, $y]$note", (params) => {
        const {expected, x, y} = params;
        expect(calculateAngleInDegrees([x, y])).toBe(expected);
    });
});
