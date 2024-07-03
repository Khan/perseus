import {lerp} from "./interpolation";

describe("lerp", () => {
    it.each`
        a    | b    | fraction | expected
        ${3} | ${7} | ${0}     | ${3}
        ${3} | ${7} | ${1}     | ${7}
        ${3} | ${7} | ${0.5}   | ${5} // midpoint of 3 and 7
        ${0} | ${4} | ${0.25}  | ${1} // 25% of the way between 0 and 4
        ${4} | ${0} | ${0.25}  | ${3}
        ${0} | ${4} | ${2}     | ${4} // fraction > 1 is treated as 1
        ${0} | ${4} | ${-1}    | ${0} // fraction < 0 is treated as 0
    `("given $a, $b, $fraction, returns $expected", (params) => {
        const {a, b, fraction, expected} = params;
        expect(lerp(a, b, fraction)).toBe(expected);
    })
})
