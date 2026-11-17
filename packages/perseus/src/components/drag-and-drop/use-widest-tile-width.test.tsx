import {act, renderHook} from "@testing-library/react";

import {useWidestTileWidth} from "./use-widest-tile-width";

/**
 * jsdom has no layout, so it never fires ResizeObserver callbacks.
 * This fake records each observer so a test can fire one itself.
 */
class FakeResizeObserver implements ResizeObserver {
    disconnected = false;
    constructor(private callback: ResizeObserverCallback) {
        observers.push(this);
    }
    /** Reports the observed element at the given border-box width. */
    fire(inlineSize: number) {
        const entry = {
            borderBoxSize: [{inlineSize, blockSize: 0}],
        };
        // eslint-disable-next-line no-restricted-syntax -- The hook reads only borderBoxSize; jsdom cannot build a real entry.
        this.callback([entry as unknown as ResizeObserverEntry], this);
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
function fireResize(inlineSize: number) {
    act(() => {
        observers
            .filter((observer) => !observer.disconnected)
            .forEach((observer) => observer.fire(inlineSize));
    });
}

/** Renders the hook with its ref attached to a container. */
function renderWithContainer() {
    const hook = renderHook(() => useWidestTileWidth());
    act(() => {
        hook.result.current.containerRef(document.createElement("div"));
    });
    return hook;
}

describe("useWidestTileWidth", () => {
    it("reports the container's width, rounded up", () => {
        // Arrange
        const {result} = renderWithContainer();

        // Act
        fireResize(120.4);

        // Assert
        expect(result.current.maxWidth).toBe(121);
    });

    it("reports no width while the container has zero width", () => {
        // Arrange
        const {result} = renderWithContainer();

        // Act
        fireResize(0);

        // Assert
        expect(result.current.maxWidth).toBeUndefined();
    });

    it("reports the new width when the container resizes", () => {
        // Arrange
        const {result} = renderWithContainer();
        fireResize(50);

        // Act
        fireResize(200);

        // Assert
        expect(result.current.maxWidth).toBe(200);
    });

    it("stops observing when the container unmounts", () => {
        // Arrange
        const {result} = renderWithContainer();

        // Act
        act(() => {
            result.current.containerRef(null);
        });

        // Assert
        expect(observers.every((observer) => observer.disconnected)).toBe(true);
    });
});
