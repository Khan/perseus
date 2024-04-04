import {convertDotToTimesByLocale, inJest} from "./utils";

describe("utils", () => {
    describe("multiplicationSymbol", () => {
        it("passes through convertDotToTimes in locales that don't override it", () => {
            const result1 = convertDotToTimesByLocale("en", true);
            const result2 = convertDotToTimesByLocale("en", false);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
        });

        it("overrides with false for locales that only use dot", () => {
            const result = convertDotToTimesByLocale("az", true);

            expect(result).toBe(false);
        });

        it("overrides with true for locales that only use x", () => {
            const result = convertDotToTimesByLocale("fr", false);

            expect(result).toBe(true);
        });
    });

    describe("inJest", () => {
        it("returns true", () => {
            expect(inJest).toBe(true);
        });
        it("prevents code from running in Jest", () => {
            let value = 0;
            if (!inJest) {
                value = 1;
            }
            expect(value).toBe(0);
        });
    });
});
