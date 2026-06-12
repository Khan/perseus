import {renderHook, waitFor} from "@testing-library/react";
import * as React from "react";

import {
    mockPerseusI18nContext,
    PerseusI18nContextProvider,
} from "../../../../components/i18n-context";

import {
    buildPointAriaLabel,
    resolvePointLabel,
    usePointAriaLabel,
} from "./build-point-aria-label";

import type {PropsWithChildren} from "react";

const {strings, locale} = mockPerseusI18nContext;

// Wrapper that provides the i18n context `usePointAriaLabel` reads. Built with
// `createElement` (not JSX) so this stays a `.ts` test file.
function I18nWrapper({children}: PropsWithChildren) {
    return React.createElement(
        PerseusI18nContextProvider,
        {strings, locale},
        children,
    );
}

describe("resolvePointLabel", () => {
    it("returns the 1-indexed default when pointLabels is undefined", () => {
        expect(resolvePointLabel(undefined, 0)).toBe(1);
        expect(resolvePointLabel(undefined, 2)).toBe(3);
    });

    it("returns the 1-indexed default when there is no label at the index", () => {
        expect(resolvePointLabel(["T"], 1)).toBe(2);
    });

    it("returns the 1-indexed default when the label at the index is an empty string", () => {
        expect(resolvePointLabel(["", "B"], 0)).toBe(1);
    });

    it("returns the custom label when set", () => {
        expect(resolvePointLabel(["T"], 0)).toBe("T");
        expect(resolvePointLabel(["A", "B"], 1)).toBe("B");
    });

    it("returns the 1-indexed default for non-string entries (defensive against malformed JSON)", () => {
        // eslint-disable-next-line no-restricted-syntax -- cast simulates malformed JSON the parser would reject
        const labels = [
            null,
            undefined,
            42,
        ] as unknown as ReadonlyArray<string>;
        expect(resolvePointLabel(labels, 0)).toBe(1);
        expect(resolvePointLabel(labels, 1)).toBe(2);
        expect(resolvePointLabel(labels, 2)).toBe(3);
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

describe("usePointAriaLabel", () => {
    it("builds the aria-label from a plain-text label synchronously", () => {
        // Arrange, Act
        const {result} = renderHook(() => usePointAriaLabel(["T"]), {
            wrapper: I18nWrapper,
        });

        // Assert
        expect(result.current(0, [0, 0])).toBe("Point T at 0 comma 0.");
    });

    it("returns undefined for a point without a custom label", () => {
        // Arrange, Act
        const {result} = renderHook(() => usePointAriaLabel(["T"]), {
            wrapper: I18nWrapper,
        });

        // Assert — no label at index 1, falls back to the numeric default
        expect(result.current(1, [3, 5])).toBeUndefined();
    });

    it("reads the numeric default during the window, then the spoken math once resolved", async () => {
        // Arrange, Act
        const {result} = renderHook(
            () => usePointAriaLabel(["$\\frac{1}{2}$"]),
            {wrapper: I18nWrapper},
        );

        // Assert — before the async conversion resolves, the TeX slot is
        // blanked so the aria-label falls back to the default rather than
        // announcing the literal TeX.
        expect(result.current(0, [2, 3])).toBeUndefined();

        // Assert — once the spoken form resolves, the aria-label uses it.
        await waitFor(() => {
            expect(result.current(0, [2, 3])).toBe(
                "Point one half at 2 comma 3.",
            );
        });
    });
});
