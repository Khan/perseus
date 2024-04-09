import {render} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import React from "react";

import {StatefulMafsGraph} from "./mafs-graph";

import type {Props as MafsGraphProps} from "./mafs-graph";
import type {UserEvent} from "@testing-library/user-event";

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

describe("MafsGraph", () => {
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
