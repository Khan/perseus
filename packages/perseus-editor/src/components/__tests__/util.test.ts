import {degreeToRadian, radianToDegree} from "../util";

describe("degreeToRadian", () => {
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
            expect(degreeToRadian(degrees)).toBe(radians);
        },
    );
});

describe("radianToDegree", () => {
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
            expect(radianToDegree(radians)).toBe(degrees);
        },
    );
});
