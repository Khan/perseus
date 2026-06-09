import {isInvalidDimension} from "./utils";

describe("isInvalidDimension", () => {
    it.each`
        dimension    | expectedResult
        ${NaN}       | ${true}
        ${0}         | ${true}
        ${-1}        | ${true}
        ${Infinity}  | ${true}
        ${-Infinity} | ${true}
        ${undefined} | ${true}
        ${null}      | ${true}
        ${1}         | ${false}
        ${100}       | ${false}
        ${1.5}       | ${false}
    `(
        "should return $expectedResult for dimension $dimension",
        ({dimension, expectedResult}) => {
            expect(isInvalidDimension(dimension)).toEqual(expectedResult);
        },
    );
});
