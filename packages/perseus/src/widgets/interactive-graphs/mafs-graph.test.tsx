import {screen, render} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import React from "react";

import {MafsGraph, StatefulMafsGraph} from "./mafs-graph";
import {moveLine, movePoint} from "./reducer/interactive-graph-action";
import {interactiveGraphReducer} from "./reducer/interactive-graph-reducer";

import type {Props as MafsGraphProps} from "./mafs-graph";
import type {InteractiveGraphState} from "./types";
import type {UserEvent} from "@testing-library/user-event";
import type {vec} from "mafs";

function getBaseMafsGraphProps(): MafsGraphProps {
    return {
        box: [400, 400],
        step: [1, 1],
        gridStep: [1, 1],
        snapStep: [1, 1],
        markings: "graph",
        range: [
            [-10, 10],
            [-10, 10],
        ],
        graph: {type: "segment"},
        containerSizeClass: "small",
        onChange: () => {},
    };
}

describe("StatefulMafsGraph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders", () => {
        const {container} = render(
            <StatefulMafsGraph {...getBaseMafsGraphProps()} />,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const movablePoints = container.querySelectorAll(
            "circle.movable-point-hitbox",
        );

        expect(movablePoints).not.toBe(0);
    });

    it("calls onChange when using graph", async () => {
        const mockChangeHandler = jest.fn();

        const {container} = render(
            <StatefulMafsGraph
                {...getBaseMafsGraphProps()}
                onChange={mockChangeHandler}
            />,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const movablePoints = container.querySelectorAll(
            "circle.movable-point-hitbox",
        );

        await userEvent.type(movablePoints[1], "{arrowup}");

        expect(mockChangeHandler).toHaveBeenCalled();
    });
});

function map(
    num: number,
    startMin: number,
    startMax: number,
    targetMin: number,
    targetMax: number,
): number {
    return (
        ((num - startMin) / (startMax - startMin)) * (targetMax - targetMin) +
        targetMin
    );
}

function graphToPixel(
    num: number,
    range: vec.Vector2 = [-10, 10],
    fullPixelSpace: number = 400,
) {
    const [rangeMin, rangeMax] = range;
    const halfPixelSpace = fullPixelSpace / 2;
    return map(num, rangeMin, rangeMax, halfPixelSpace * -1, halfPixelSpace);
}

describe("MafsGraph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders", () => {
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [0, 0],
                    [-7, 0.5],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        render(
            <MafsGraph
                state={state}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const line = screen.getByTestId("movable-line__line");

        expect(line).toBeInTheDocument();

        // Map graph coordinates to SVG coordinates
        const expectedX1 = graphToPixel(0);
        const expectedY1 = graphToPixel(0) * -1;
        const expectedX2 = graphToPixel(-7);
        const expectedY2 = graphToPixel(0.5) * -1;
        expect(line.getAttribute("x1")).toBe(expectedX1 + "");
        expect(line.getAttribute("y1")).toBe(expectedY1 + "");
        expect(line.getAttribute("x2")).toBe(expectedX2 + "");
        expect(line.getAttribute("y2")).toBe(expectedY2 + "");
    });

    /**
     * regression LEMS-1885
     * Important parts of this test:
     * - large snap setting (>1)
     * - arrowing with the keyboard moves point
     */
    it("point snap works with large snap gaps", async () => {
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "point",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [2, 2],
            coords: [[2, 2]],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        const {rerender} = render(
            <MafsGraph
                state={state}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const group = screen.getByTestId("movable-point");
        group.focus();
        await userEvent.keyboard("[ArrowRight]");
        const action = movePoint(0, [4, 2]);
        expect(mockDispatch).toHaveBeenCalledWith(action);

        const updatedState = interactiveGraphReducer(state, action);

        rerender(
            <MafsGraph
                state={updatedState}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const point = screen.getByTestId("movable-point__center");

        // Map graph coordinates to SVG coordinates
        const expectedCX = graphToPixel(4);
        const expectedCY = graphToPixel(2) * -1;
        expect(point.getAttribute("cx")).toBe(`${expectedCX}`);
        expect(point.getAttribute("cy")).toBe(`${expectedCY}`);
    });

    /**
     * regression LEMS-1907
     * Important parts of this test:
     * - midpoint of line not on a snap step (snap: 0.5, midpoint: 0.25)
     * - line starts at [-7, 0.5], [0, 0]
     * - arrowing down with the keyboard moves line down
     */
    it("MovableLine not constrained by snap", async () => {
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [-7, 0.5],
                    [0, 0],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        const {rerender} = render(
            <MafsGraph
                state={state}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const group = screen.getByTestId("movable-line");
        group.focus();
        await userEvent.keyboard("[ArrowDown]");
        const action = moveLine(0, [0, -0.4]);
        expect(mockDispatch).toHaveBeenCalledWith(action);

        const updatedState = interactiveGraphReducer(state, action);

        rerender(
            <MafsGraph
                state={updatedState}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const line = screen.getByTestId("movable-line__line");
        expect(line).toBeInTheDocument();

        // Map graph coordinates to SVG coordinates
        const expectedX1 = graphToPixel(-7);
        const expectedY1 = graphToPixel(0) * -1;
        const expectedX2 = graphToPixel(0);
        const expectedY2 = graphToPixel(-0.5) * -1;

        expect(line.getAttribute("x1")).toBe(`${expectedX1}`);
        expect(line.getAttribute("y1")).toBe(`${expectedY1}`);
        expect(line.getAttribute("x2")).toBe(`${expectedX2}`);
        expect(line.getAttribute("y2")).toBe(`${expectedY2}`);
    });
});
