import * as wbi18n from "@khanacademy/wonder-blocks-i18n";

import {convertDotToTimesByLocale} from "./utils";

describe("utils", () => {
    describe("multiplicationSymbol", () => {
        it("passes through convertDotToTimes in locales that don't override it", () => {
            jest.spyOn(wbi18n, "getLocale").mockReturnValue("en");

            const result1 = convertDotToTimesByLocale(true);
            const result2 = convertDotToTimesByLocale(false);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
        });

        it("overrides with false for locales that only use dot", () => {
            jest.spyOn(wbi18n, "getLocale").mockReturnValue("az");

            const result = convertDotToTimesByLocale(true);

            expect(result).toBe(false);
        });

        it("overrides with true for locales that only use x", () => {
            jest.spyOn(wbi18n, "getLocale").mockReturnValue("fr");

            const result = convertDotToTimesByLocale(false);

            expect(result).toBe(true);
        });
    });
});
