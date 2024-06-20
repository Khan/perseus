import {render} from "@testing-library/react";
import {Mafs} from "mafs";
import React from "react";

import * as UseDraggableModule from "../use-draggable";

import {MovableLine, trimRange} from "./movable-line";

import type {Interval, vec} from "mafs";

describe("trimRange", () => {
    it("does not trim smaller than [[0, 0], [0, 0]]", () => {
        const graphDimensionsInPixels: vec.Vector2 = [1, 1];
        const range: [Interval, Interval] = [
            [0, 1],
            [0, 1],
        ];

        const trimmed = trimRange(range, graphDimensionsInPixels);

        expect(trimmed).toEqual([
            [0, 0],
            [0, 0],
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
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
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
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        line = container.querySelector(".movable-line") as HTMLElement | null;
        expect(line?.getAttribute("style")).toContain("cursor: grabbing;");
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        line = container.querySelector("[data-testid='movable-line__line']");
        expect(line?.classList).toContain("movable-dragging");
    });
});
