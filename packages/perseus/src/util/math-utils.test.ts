import {isPiMultiple} from "./math-utils";

describe("isPiMultiple", () => {
    test.each`
        case      | number
        ${"π"}    | ${Math.PI}
        ${"2π"}   | ${Math.PI * 2}
        ${"3π"}   | ${Math.PI * 3}
        ${"-π"}   | ${Math.PI * -1}
        ${"-2π"}  | ${Math.PI * -2}
        ${"π/2"}  | ${Math.PI / 2}
        ${"π/3"}  | ${Math.PI / 3}
        ${"π/4"}  | ${Math.PI / 4}
        ${"π/6"}  | ${Math.PI / 6}
        ${"2π/3"} | ${(Math.PI * 2) / 3}
    `("should return true for $case", ({number}) => {
        expect(isPiMultiple(number)).toBe(true);
    });

    test.each`
        case         | number
        ${"0"}       | ${0}
        ${"1"}       | ${1}
        ${"-1"}      | ${-1}
        ${"3.14"}    | ${3.14}
        ${"3.14159"} | ${3.14159}
        ${"2.5"}     | ${2.5}
        ${"-1.5"}    | ${-1.5}
    `("should return false for $case", ({number}) => {
        expect(isPiMultiple(number)).toBe(false);
    });
});
