import {getPiMultiple, srFormatNumber} from "./screenreader-text";

describe("srFormatNumber", () => {
    it("trivially converts small integers to strings", () => {
        expect(srFormatNumber(3, "en")).toBe("3");
    });

    it("does not use thousands separators", () => {
        expect(srFormatNumber(1234567, "en")).toBe("1234567");
    });

    it("does not use scientific notation", () => {
        expect(srFormatNumber(1e27, "en")).toBe("1000000000000000000000000000");
    });

    it("displays at most 3 decimal places", () => {
        expect(srFormatNumber(0.123456, "en")).toBe("0.123");
    });

    it("rounds to 3 decimal places", () => {
        expect(srFormatNumber(1.2345, "en")).toBe("1.235");
    });

    it("never displays a negative sign on zero", () => {
        expect(srFormatNumber(-0, "en")).toBe("0");
    });

    it("uses a locale-appropriate decimal separator", () => {
        expect(srFormatNumber(1.5, "de")).toBe("1,5");
    });

    it("uses pi format when the number is a multiple of pi", () => {
        expect(srFormatNumber(Math.PI, "en")).toBe("1π");
    });
});

describe("getPiMultiple", () => {
    test.each`
        num
        ${0}
        ${1e12}
        ${1e27}
        ${3.14}
        ${3.14159265}
        ${2 * 3.14159265}
        ${1}
        ${-1}
        ${-3.14}
        ${Math.PI / 7}
        ${Math.PI / 8}
        ${3.6 * Math.PI}
        ${-3.51 * Math.PI}
    `(
        "returns null for non-pi-based numbers or non-approved divisors: $num",
        ({num}) => {
            expect(getPiMultiple(num)).toBe(null);
        },
    );

    test.each`
        num                   | expectedString
        ${Math.PI}            | ${"1π"}
        ${-Math.PI}           | ${"-1π"}
        ${2 * Math.PI}        | ${"2π"}
        ${-2 * Math.PI}       | ${"-2π"}
        ${10 * Math.PI}       | ${"10π"}
        ${-10 * Math.PI}      | ${"-10π"}
        ${Math.PI / 2}        | ${"1π/2"}
        ${Math.PI / 3}        | ${"1π/3"}
        ${Math.PI / 4}        | ${"1π/4"}
        ${Math.PI / 6}        | ${"1π/6"}
        ${Math.PI / -2}       | ${"-1π/2"}
        ${Math.PI / -3}       | ${"-1π/3"}
        ${Math.PI / -4}       | ${"-1π/4"}
        ${Math.PI / -6}       | ${"-1π/6"}
        ${(7 * Math.PI) / 2}  | ${"7π/2"}
        ${3.5 * Math.PI}      | ${"7π/2"}
        ${(2 * Math.PI) / 3}  | ${"2π/3"}
        ${(3 * Math.PI) / 4}  | ${"3π/4"}
        ${(5 * Math.PI) / 6}  | ${"5π/6"}
        ${(-7 * Math.PI) / 2} | ${"-7π/2"}
        ${(-2 * Math.PI) / 3} | ${"-2π/3"}
        ${(-3 * Math.PI) / 4} | ${"-3π/4"}
        ${(-5 * Math.PI) / 6} | ${"-5π/6"}
    `(
        "returns a string showing the number as a multiple of pi: $expectedString",
        ({num, expectedString}) => {
            expect(getPiMultiple(num)).toBe(expectedString);
        },
    );
});
