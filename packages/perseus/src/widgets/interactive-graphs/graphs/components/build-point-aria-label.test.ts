import {mockPerseusI18nContext} from "../../../../components/i18n-context";

import {buildPointAriaLabel} from "./build-point-aria-label";

const {strings, locale} = mockPerseusI18nContext;

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

    it("returns undefined for non-string entries (null, undefined, number) — defensive against malformed hand-authored JSON bypassing the parser", () => {
        // eslint-disable-next-line no-restricted-syntax -- cast simulates malformed JSON the parser would reject
        const labels = [
            null,
            undefined,
            42,
        ] as unknown as ReadonlyArray<string>;
        expect(
            buildPointAriaLabel(labels, 0, [0, 0], strings, locale),
        ).toBeUndefined();
        expect(
            buildPointAriaLabel(labels, 1, [0, 0], strings, locale),
        ).toBeUndefined();
        expect(
            buildPointAriaLabel(labels, 2, [0, 0], strings, locale),
        ).toBeUndefined();
    });
});
