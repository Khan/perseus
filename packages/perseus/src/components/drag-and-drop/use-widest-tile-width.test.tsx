import {act, renderHook} from "@testing-library/react";

import {useWidestTileWidth} from "./use-widest-tile-width";

/** Builds a container whose children report the given widths. */
function generateContainer(widths: number[]): HTMLElement {
    const container = document.createElement("div");
    for (const width of widths) {
        const child = document.createElement("div");
        // eslint-disable-next-line no-restricted-syntax -- The hook reads only width; jsdom has no layout to produce a real DOMRect.
        jest.spyOn(child, "getBoundingClientRect").mockReturnValue({
            width,
        } as DOMRect);
        container.appendChild(child);
    }
    return container;
}

describe("useWidestTileWidth", () => {
    it("reports the widest child's width, rounded up", () => {
        // Arrange
        const {result} = renderHook(() => useWidestTileWidth());

        // Act
        act(() => {
            result.current.containerRef(generateContainer([50, 120.4, 80]));
        });

        expect(result.current.maxWidth).toBe(121);
        expect(result.current.isMeasured).toBe(true);
    });

    it("reports no width for an empty container", () => {
        // Arrange
        const {result} = renderHook(() => useWidestTileWidth());

        // Act
        act(() => {
            result.current.containerRef(generateContainer([]));
        });

        expect(result.current.maxWidth).toBeUndefined();
        expect(result.current.isMeasured).toBe(true);
    });

    it("picks up grown children on remeasure", () => {
        // Arrange — a child grows after mount (TeX render, image load).
        const {result} = renderHook(() => useWidestTileWidth());
        const container = generateContainer([50]);
        act(() => {
            result.current.containerRef(container);
        });
        const child = document.createElement("div");
        // eslint-disable-next-line no-restricted-syntax -- The hook reads only width; jsdom has no layout to produce a real DOMRect.
        jest.spyOn(child, "getBoundingClientRect").mockReturnValue({
            width: 200,
        } as DOMRect);
        container.appendChild(child);

        // Act
        act(() => {
            result.current.remeasure();
        });

        expect(result.current.maxWidth).toBe(200);
    });
});
