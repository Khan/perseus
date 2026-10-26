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

/**
 * jsdom has no layout, so it never fires ResizeObserver callbacks.
 * This fake records each observer so a test can fire one itself.
 */
class FakeResizeObserver implements ResizeObserver {
    disconnected = false;
    constructor(private callback: ResizeObserverCallback) {
        observers.push(this);
    }
    fire() {
        this.callback([], this);
    }
    observe() {}
    unobserve() {}
    disconnect() {
        this.disconnected = true;
    }
}
let observers: FakeResizeObserver[];
const OriginalResizeObserver = window.ResizeObserver;

beforeEach(() => {
    observers = [];
    window.ResizeObserver = FakeResizeObserver;
});

afterEach(() => {
    window.ResizeObserver = OriginalResizeObserver;
});

/** Fires every live observer, as the browser does on a resize. */
function fireResize() {
    act(() => {
        observers
            .filter((observer) => !observer.disconnected)
            .forEach((observer) => observer.fire());
    });
}

describe("useWidestTileWidth", () => {
    it("reports the widest child's width, rounded up", () => {
        // Arrange
        const {result} = renderHook(() => useWidestTileWidth());
        act(() => {
            result.current.containerRef(generateContainer([50, 120.4, 80]));
        });

        // Act
        fireResize();

        expect(result.current.maxWidth).toBe(121);
    });

    it("reports no width for an empty container", () => {
        // Arrange
        const {result} = renderHook(() => useWidestTileWidth());
        act(() => {
            result.current.containerRef(generateContainer([]));
        });

        // Act
        fireResize();

        expect(result.current.maxWidth).toBeUndefined();
    });

    it("reports no width while the container is hidden", () => {
        // Arrange
        const {result} = renderHook(() => useWidestTileWidth());
        act(() => {
            result.current.containerRef(generateContainer([0, 0]));
        });

        // Act
        fireResize();

        expect(result.current.maxWidth).toBeUndefined();
    });

    it("picks up a grown child when the container resizes", () => {
        // Arrange
        const {result} = renderHook(() => useWidestTileWidth());
        const container = generateContainer([50]);
        act(() => {
            result.current.containerRef(container);
        });
        fireResize();
        container.appendChild(generateChild(200));

        // Act
        fireResize();

        expect(result.current.maxWidth).toBe(200);
    });

    it("stops observing when the container unmounts", () => {
        // Arrange
        const {result} = renderHook(() => useWidestTileWidth());
        act(() => {
            result.current.containerRef(generateContainer([50]));
        });

        // Act
        act(() => {
            result.current.containerRef(null);
        });

        expect(observers.every((observer) => observer.disconnected)).toBe(true);
    });
});
