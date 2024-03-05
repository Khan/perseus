import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import InteractiveGraphEditor from "../interactive-graph-editor";

const baseProps = {
    apiOptions: ApiOptions.defaults,
    box: [288, 288] as [number, number],
    gridStep: [1, 1] as [number, number],
    snapStep: [1, 1] as [number, number],
    onChange: () => {},
    graph: undefined,
};

describe("InteractiveGraphEditor", () => {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("should render", async () => {
        render(<InteractiveGraphEditor {...baseProps} />);

        expect(await screen.findByText("Correct answer:")).toBeInTheDocument();
    });

    test("changing the graph should call onChange", async () => {
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor {...baseProps} onChange={onChangeMock} />,
        );

        const dropdown = screen.getByRole("button", {name: "Type of Graph:"});
        await userEvent.click(dropdown);
        await userEvent.click(screen.getByRole("option", {name: "Polygon"}));

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                graph: {type: "polygon"},
                correct: expect.objectContaining({type: "polygon"}),
            }),
        );
    });
});
