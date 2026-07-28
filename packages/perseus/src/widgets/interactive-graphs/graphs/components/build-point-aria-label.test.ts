import {mockPerseusI18nContext} from "../../../../components/i18n-context";

import {buildPointAriaLabel, resolvePointLabel} from "./build-point-aria-label";

const {strings, locale} = mockPerseusI18nContext;

describe("resolvePointLabel", () => {
    it("returns the 1-indexed default when pointLabels is undefined", () => {
        expect(resolvePointLabel(undefined, 0)).toBe("1");
        expect(resolvePointLabel(undefined, 2)).toBe("3");
    });

    it("returns the 1-indexed default when there is no label at the index", () => {
        expect(resolvePointLabel(["T"], 1)).toBe("2");
    });

    it("returns the 1-indexed default when the label at the index is an empty string", () => {
        expect(resolvePointLabel(["", "B"], 0)).toBe("1");
    });

    it("returns the custom label when set", () => {
        expect(resolvePointLabel(["T"], 0)).toBe("T");
        expect(resolvePointLabel(["A", "B"], 1)).toBe("B");
    });
});

describe("buildPointAriaLabel", () => {
    it("returns undefined when pointLabels is undefined", () => {
        expect(
            buildPointAriaLabel(undefined, 0, [0, 0], strings, locale),
        ).toBeUndefined();
    });

    it("returns undefined when there is no label at the given index", () => {
        expect(
            buildPointAriaLabel(["T"], 1, [3, 5], strings, locale),
        ).toBeUndefined();
    });

    it("returns undefined when the label at the index is an empty string", () => {
        expect(
            buildPointAriaLabel(["", "B"], 0, [3, 5], strings, locale),
        ).toBeUndefined();
    });

    it("returns the formatted aria-label when a custom label is set", () => {
        expect(buildPointAriaLabel(["T"], 0, [0, 0], strings, locale)).toBe(
            "Point T at 0 comma 0.",
        );
    });

    it("uses the label at the matching index for multi-point graphs", () => {
        expect(
            buildPointAriaLabel(["A", "B"], 1, [-1, 2], strings, locale),
        ).toBe("Point B at -1 comma 2.");
    });
});
