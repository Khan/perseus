import {act, render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";

import {TileWidthMeasurer} from "./tile-width-measurer";

import type {PerseusAnswerTile} from "@khanacademy/perseus-core";

/**
 * jsdom has no layout, so it never fires ResizeObserver callbacks.
 * This fake records each observer and what it observes, so a test can
 * fire one itself.
 */
class FakeResizeObserver implements ResizeObserver {
    disconnected = false;
    observed: Element[] = [];
    constructor(private callback: ResizeObserverCallback) {
        observers.push(this);
    }
    /** Reports the observed element at the given border-box width. */
    fire(inlineSize: number) {
        const entry = {
            borderBoxSize: [{inlineSize, blockSize: 0}],
        };
        // eslint-disable-next-line no-restricted-syntax -- The measurer reads only borderBoxSize; jsdom cannot build a real entry.
        this.callback([entry as unknown as ResizeObserverEntry], this);
    }
    observe(target: Element) {
        this.observed.push(target);
    }
    unobserve() {}
    disconnect() {
        this.disconnected = true;
    }
}
let observers: FakeResizeObserver[];
const OriginalResizeObserver = window.ResizeObserver;

/**
 * The measurer's live observers. dnd-kit also creates ResizeObservers, so
 * this keeps only those watching the measurer's inert column.
 */
function measurerObservers(): FakeResizeObserver[] {
    return observers.filter(
        (observer) =>
            !observer.disconnected &&
            observer.observed.some((el) => el.hasAttribute("inert")),
    );
}

/** Fires the measurer's observers, as the browser does on a resize. */
function fireResize(inlineSize: number) {
    act(() => {
        measurerObservers().forEach((observer) => observer.fire(inlineSize));
    });
}

const tiles: Array<PerseusAnswerTile> = [
    {id: "tile-1", content: "Banana", label: "Banana"},
    {id: "tile-2", content: "Kiwi", label: "Kiwi"},
];

describe("TileWidthMeasurer", () => {
    beforeEach(() => {
        observers = [];
        window.ResizeObserver = FakeResizeObserver;
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue(
            testDependenciesV2,
        );
    });

    afterEach(() => {
        window.ResizeObserver = OriginalResizeObserver;
    });

    it("reports the column's width, rounded up", () => {
        // Arrange
        const onWidthChange = jest.fn();
        render(
            <TileWidthMeasurer tiles={tiles} onWidthChange={onWidthChange} />,
        );

        // Act
        fireResize(120.4);

        // Assert
        expect(onWidthChange).toHaveBeenLastCalledWith(121);
    });

    it("reports no width while the column has zero width", () => {
        // Arrange
        const onWidthChange = jest.fn();
        render(
            <TileWidthMeasurer tiles={tiles} onWidthChange={onWidthChange} />,
        );

        // Act
        fireResize(0);

        // Assert
        expect(onWidthChange).toHaveBeenLastCalledWith(undefined);
    });

    it("reports the new width when the column resizes", () => {
        // Arrange
        const onWidthChange = jest.fn();
        render(
            <TileWidthMeasurer tiles={tiles} onWidthChange={onWidthChange} />,
        );
        fireResize(50);

        // Act
        fireResize(200);

        // Assert
        expect(onWidthChange).toHaveBeenLastCalledWith(200);
    });

    it("reports to the latest callback after a re-render", () => {
        // Arrange
        const firstCallback = jest.fn();
        const latestCallback = jest.fn();
        const {rerender} = render(
            <TileWidthMeasurer tiles={tiles} onWidthChange={firstCallback} />,
        );
        rerender(
            <TileWidthMeasurer tiles={tiles} onWidthChange={latestCallback} />,
        );

        // Act
        fireResize(80);

        // Assert
        expect(latestCallback).toHaveBeenCalledWith(80);
        expect(firstCallback).not.toHaveBeenCalled();
    });

    it("stops observing when it unmounts", () => {
        // Arrange
        const {unmount} = render(
            <TileWidthMeasurer tiles={tiles} onWidthChange={jest.fn()} />,
        );

        // Act
        unmount();

        // Assert
        expect(measurerObservers()).toHaveLength(0);
    });

    it("hides the tile copies' menu buttons from assistive tech", () => {
        // Arrange, Act
        render(<TileWidthMeasurer tiles={tiles} onWidthChange={jest.fn()} />);

        // Assert
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
});
