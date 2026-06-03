import {render} from "@testing-library/react";
import {Mafs} from "mafs";
import React from "react";

import * as UseDraggableModule from "../use-draggable";

import {
    getMovableLineKeyboardConstraint,
    insetTipAlongRay,
    MovableLine,
    trimRange,
} from "./movable-line";

import type {Interval, vec} from "mafs";

describe("trimRange", () => {
    it("does not trim ranges below a size of 0", () => {
        const graphDimensionsInPixels: vec.Vector2 = [1, 1];
        const range: [Interval, Interval] = [
            [0, 1],
            [0, 1],
        ];

        const trimmed = trimRange(range, graphDimensionsInPixels);

        expect(trimmed).toEqual([
            [0.5, 0.5],
            [0.5, 0.5],
        ]);
    });

    it("trims 4 units from each edge when a unit is one pixel", () => {
        const graphDimensionsInPixels: vec.Vector2 = [20, 20];
        const range: [Interval, Interval] = [
            [-10, 10],
            [-10, 10],
        ];

        const trimmed = trimRange(range, graphDimensionsInPixels);

        expect(trimmed).toEqual([
            [-6, 6],
            [-6, 6],
        ]);
    });

    it("trims 0.4 units from each edge when a unit is ten pixels", () => {
        const graphDimensionsInPixels: vec.Vector2 = [200, 200];
        const range: [Interval, Interval] = [
            [-10, 10],
            [-10, 10],
        ];

        const trimmed = trimRange(range, graphDimensionsInPixels);

        expect(trimmed).toEqual([
            [-9.6, 9.6],
            [-9.6, 9.6],
        ]);
    });

    it("doesn't mix up x and y", () => {
        const graphDimensionsInPixels: vec.Vector2 = [200, 400];
        const range: [Interval, Interval] = [
            [-10, 10],
            [-1, 1],
        ];

        const trimmed = trimRange(range, graphDimensionsInPixels);

        expect(trimmed).toEqual([
            [-9.6, 9.6],
            [-0.98, 0.98],
        ]);
    });
});

describe("insetTipAlongRay", () => {
    const range400: [Interval, Interval] = [
        [-10, 10],
        [-10, 10],
    ];
    const dims400: vec.Vector2 = [400, 400];

    it("pulls tip 4px back toward tail along a horizontal ray", () => {
        // Arrange, Act: 1 graph unit = 20 px, so 4 px ≈ 0.2 graph units
        const result = insetTipAlongRay([5, 3], [10, 3], range400, dims400);

        // Assert
        expect(result[0]).toBeCloseTo(9.8);
        expect(result[1]).toBeCloseTo(3);
    });

    it("keeps a horizontal extension straight when tail sits on an edge (LEMS-4203)", () => {
        const result = insetTipAlongRay([5, -10], [10, -10], range400, dims400);

        // Assert
        expect(result[0]).toBeCloseTo(9.8);
        expect(result[1]).toBe(-10);
    });

    it("returns tip unchanged when tail and tip coincide", () => {
        // Arrange, Act
        const result = insetTipAlongRay([2, 2], [2, 2], range400, dims400);

        // Assert
        expect(result).toEqual([2, 2]);
    });

    it("measures inset distance in pixel space when axes have different scales", () => {
        // Arrange: x-axis is 10 px/unit, y-axis is 100 px/unit
        const range: [Interval, Interval] = [
            [-10, 10],
            [-1, 1],
        ];
        const dims: vec.Vector2 = [200, 200];

        // Act: diagonal ray of equal graph-unit components — but in pixel
        // space the y-component is 10x longer, so the inset is dominated
        // by the y direction.
        const result = insetTipAlongRay([0, 0], [1, 1], range, dims);

        // Assert: pixel-space length = √(10² + 100²) ≈ 100.5, so 4 px
        // back ≈ 0.0398 of the way toward tail.
        expect(result[0]).toBeCloseTo(0.9602, 3);
        expect(result[1]).toBeCloseTo(0.9602, 3);
    });
});

describe("Rendering", () => {
    let useDraggable: jest.SpyInstance;

    beforeEach(() => {
        useDraggable = jest
            .spyOn(UseDraggableModule, "useDraggable")
            .mockReturnValue({dragging: false});
    });

    it("Does NOT render extensions of line when option is not provided", () => {
        const {container} = render(
            <Mafs width={200} height={200}>
                <MovableLine
                    points={[
                        [-1, -1],
                        [1, 1],
                    ]}
                />
            </Mafs>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Does NOT render extensions of line when option is disabled", () => {
        const {container} = render(
            <Mafs width={200} height={200}>
                <MovableLine
                    points={[
                        [-1, -1],
                        [1, 1],
                    ]}
                    extend={{
                        start: false,
                        end: false,
                    }}
                />
            </Mafs>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Does render extensions of line when option is enabled", () => {
        const {container} = render(
            <Mafs width={200} height={200}>
                <MovableLine
                    points={[
                        [-1, -1],
                        [1, 1],
                    ]}
                    extend={{
                        start: true,
                        end: true,
                    }}
                />
            </Mafs>,
        );
        expect(container).toMatchSnapshot();
    });

    it("Adds styling when the line is being dragged", () => {
        // Verify normal non-dragging state
        let container = render(
            <Mafs width={200} height={200}>
                <MovableLine
                    points={[
                        [-1, -1],
                        [1, 1],
                    ]}
                />
            </Mafs>,
        ).container;
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access, no-restricted-syntax
        let line = container.querySelector(
            ".movable-line",
        ) as HTMLElement | null;
        expect(line?.getAttribute("style")).toContain("cursor: grab;");
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        line = container.querySelector("[data-testid='movable-line__line']");
        expect(line?.classList).not.toContain("movable-dragging");

        // Verify dragging state
        useDraggable.mockReturnValue({dragging: true});
        container = render(
            <Mafs width={200} height={200}>
                <MovableLine
                    points={[
                        [-1, -1],
                        [1, 1],
                    ]}
                />
            </Mafs>,
        ).container;
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access, no-restricted-syntax
        line = container.querySelector(".movable-line") as HTMLElement | null;
        expect(line?.getAttribute("style")).toContain("cursor: grabbing;");
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        line = container.querySelector("[data-testid='movable-line__line']");
        expect(line?.classList).toContain("movable-dragging");
    });
});
describe("getMovableLineKeyboardConstraint", () => {
    it("should snap to the snapStep and avoid putting points on a vertical line", () => {
        const line: [vec.Vector2, vec.Vector2] = [
            [0, 0],
            [1, 0],
        ];
        const snapStep: vec.Vector2 = [1, 1];

        // We're moving the first point
        const constraint = getMovableLineKeyboardConstraint(line, snapStep, 0);

        expect(constraint).toEqual({
            up: [0, 1],
            down: [0, -1],
            left: [-1, 0],
            right: [2, 0], // Avoids overlapping the points
        });
    });
});
