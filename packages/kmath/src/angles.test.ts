import {
    calculateAngleInDegrees,
    convertDegreesToRadians,
    convertRadiansToDegrees,
} from "./angles";

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

describe("convertDegreesToRadians", () => {
    test.each`
        degrees | radians
        ${0}    | ${0}
        ${45}   | ${Math.PI / 4}
        ${90}   | ${Math.PI / 2}
        ${180}  | ${Math.PI}
        ${270}  | ${Math.PI * 1.5}
        ${360}  | ${Math.PI * 2}
        ${-45}  | ${-Math.PI / 4}
        ${-90}  | ${-Math.PI / 2}
    `(
        "should convert $degrees degrees to $radians radians",
        ({degrees, radians}) => {
            expect(convertDegreesToRadians(degrees)).toBe(radians);
        },
    );
});

describe("convertRadiansToDegrees", () => {
    test.each`
        radians          | degrees
        ${0}             | ${0}
        ${Math.PI / 4}   | ${45}
        ${Math.PI / 2}   | ${90}
        ${Math.PI}       | ${180}
        ${Math.PI * 1.5} | ${270}
        ${Math.PI * 2}   | ${360}
        ${-Math.PI / 4}  | ${-45}
        ${-Math.PI / 2}  | ${-90}
    `(
        "should convert $radians radians to $degrees degrees",
        ({radians, degrees}) => {
            expect(convertRadiansToDegrees(radians)).toBe(degrees);
        },
    );
});
