import {intersectIntervals} from "./interval";

describe("intersectIntervals", () => {
    const Inf = Infinity;

    test.each`
        a              | b              | expected
        ${[0, 0]}      | ${[0, 0]}      | ${[0, 0]}
        ${[Inf, Inf]}  | ${[Inf, Inf]}  | ${[Inf, Inf]}
        ${[-Inf, Inf]} | ${[-Inf, Inf]} | ${[-Inf, Inf]}
        ${[0, 1]}      | ${[-2, -1]}    | ${null}
        ${[0, 1]}      | ${[-2, 0]}     | ${[0, 0]}
        ${[0, 1]}      | ${[1, 2]}      | ${[1, 1]}
        ${[0, 10]}     | ${[5, 15]}     | ${[5, 10]}
        ${[0, 10]}     | ${[-5, 5]}     | ${[0, 5]}
        ${[0, 10]}     | ${[3, 7]}      | ${[3, 7]}
        ${[0, 10]}     | ${[-1, 11]}    | ${[0, 10]}
    `("given $a and $b, returns $expected", ({a, b, expected}) => {
        expect(intersectIntervals(a, b)).toEqual(expected);
    });
});
