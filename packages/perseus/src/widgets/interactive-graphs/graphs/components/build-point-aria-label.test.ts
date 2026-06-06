import {renderHook} from "@testing-library/react";

import {resolvePointLabel, usePointAriaLabel} from "./build-point-aria-label";

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

describe("usePointAriaLabel", () => {
    const renderBuildLabel = (pointLabels?: ReadonlyArray<string>) =>
        renderHook(() => usePointAriaLabel(pointLabels)).result.current;

    it("returns undefined when pointLabels is undefined", () => {
        const buildLabel = renderBuildLabel(undefined);
        expect(buildLabel(0, [0, 0])).toBeUndefined();
    });

    it("returns undefined when there is no label at the given index", () => {
        const buildLabel = renderBuildLabel(["T"]);
        expect(buildLabel(1, [3, 5])).toBeUndefined();
    });

    it("returns undefined when the label at the index is an empty string", () => {
        const buildLabel = renderBuildLabel(["", "B"]);
        expect(buildLabel(0, [3, 5])).toBeUndefined();
    });

    it("returns the formatted aria-label when a custom label is set", () => {
        const buildLabel = renderBuildLabel(["T"]);
        expect(buildLabel(0, [0, 0])).toBe("Point T at 0 comma 0.");
    });

    it("uses the label at the matching index for multi-point graphs", () => {
        const buildLabel = renderBuildLabel(["A", "B"]);
        expect(buildLabel(1, [-1, 2])).toBe("Point B at -1 comma 2.");
    });

    it("returns undefined for non-string entries (null, undefined, number) — defensive against malformed hand-authored JSON bypassing the parser", () => {
        // eslint-disable-next-line no-restricted-syntax -- cast simulates malformed JSON the parser would reject
        const labels = [
            null,
            undefined,
            42,
        ] as unknown as ReadonlyArray<string>;
        const buildLabel = renderBuildLabel(labels);
        expect(buildLabel(0, [0, 0])).toBeUndefined();
        expect(buildLabel(1, [0, 0])).toBeUndefined();
        expect(buildLabel(2, [0, 0])).toBeUndefined();
    });
});
