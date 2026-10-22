import {act, renderHook} from "@testing-library/react";

import {useWidestTileWidth} from "./use-widest-tile-width";

/** Builds a child element that reports the given width. */
function generateChild(width: number): HTMLElement {
    const child = document.createElement("div");
    // eslint-disable-next-line no-restricted-syntax -- The hook reads only width; jsdom has no layout to produce a real DOMRect.
    jest.spyOn(child, "getBoundingClientRect").mockReturnValue({
        width,
    } as DOMRect);
    return child;
}

/** Builds a container whose children report the given widths. */
function generateContainer(widths: number[]): HTMLElement {
    const container = document.createElement("div");
    container.append(...widths.map(generateChild));
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
    });

    it("reports no width for an empty container", () => {
        // Arrange
        const {result} = renderHook(() => useWidestTileWidth());

        // Act
        act(() => {
            result.current.containerRef(generateContainer([]));
        });

        expect(result.current.maxWidth).toBeUndefined();
    });

    it("picks up grown children on remeasure", () => {
        // Arrange
        const {result} = renderHook(() => useWidestTileWidth());
        const container = generateContainer([50]);
        act(() => {
            result.current.containerRef(container);
        });
        container.appendChild(generateChild(200));

        // Act
        act(() => {
            result.current.remeasure();
        });

        expect(result.current.maxWidth).toBe(200);
    });
});
