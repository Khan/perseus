import {
    getOtherSideLengthWithPreservedAspectRatio,
    isInvalidDimension,
} from "./utils";

describe("getOtherSideLengthWithPreservedAspectRatio", () => {
    it.each`
        sideLength | otherSideLength | newSideLength | expectedResult
        ${100}     | ${200}          | ${300}        | ${600}
        ${200}     | ${100}          | ${300}        | ${150}
        ${200}     | ${100}          | ${400}        | ${200}
        ${-100}    | ${200}          | ${300}        | ${-600}
        ${-100}    | ${200}          | ${-300}       | ${600}
        ${-100}    | ${-200}         | ${-300}       | ${-600}
        ${1.5}     | ${3}            | ${300}        | ${600}
        ${1.5}     | ${3}            | ${4.5}        | ${9}
        ${0}       | ${0}            | ${0}          | ${NaN}
        ${0}       | ${200}          | ${300}        | ${NaN}
        ${200}     | ${0}            | ${300}        | ${NaN}
        ${100}     | ${200}          | ${0}          | ${NaN}
    `(
        "should return the other side length with preserved aspect ratio",
        ({sideLength, otherSideLength, newSideLength, expectedResult}) => {
            const result = getOtherSideLengthWithPreservedAspectRatio(
                sideLength,
                otherSideLength,
                newSideLength,
            );
            expect(result).toEqual(expectedResult);
        },
    );
});

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
