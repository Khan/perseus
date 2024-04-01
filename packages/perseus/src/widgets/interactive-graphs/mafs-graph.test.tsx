import {render} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import React from "react";

import {MafsGraph} from "./mafs-graph";

import type {MafsWrapperProps} from "./mafs-graph";
import type {UserEvent} from "@testing-library/user-event";

function getBaseMafsGraphProps(): MafsWrapperProps {
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

    // const widgetBaseProps: InteractiveGraphProps = {
    //     ...mafsGraphBaseProps,
    //     alignment: null,
    //     apiOptions: {
    //         ...ApiOptions.defaults,
    //     },
    //     containerSizeClass: "small",
    //     findWidgets: () => [],
    //     isLastUsedWidget: false,
    //     onBlur: () => {},
    //     onChange: () => {},
    //     onFocus: () => {},
    //     problemNum: 1,
    //     reviewModeRubric: {
    //         ...mafsGraphBaseProps,
    //     },
    //     static: true,
    //     trackInteraction: () => {},
    //     widgetId: "mafs-graph",
    //     linterContext: {} as any,
    // };
}

describe("MafsGraph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders", () => {
        const {container} = render(<MafsGraph {...getBaseMafsGraphProps()} />);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const movablePoints = container.querySelectorAll(
            "circle.movable-point-hitbox",
        );

        expect(movablePoints).not.toBe(0);
    });

    it("calls onChange when using graph", async () => {
        const mockChangeHandler = jest.fn();

        const {container} = render(
            <MafsGraph
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
