import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {grapherLogic} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import GrapherEditor from "../grapher-editor";

import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    ...grapherLogic.defaultWidgetOptions,
    apiOptions: ApiOptions.defaults,
    onChange: () => {},
};

describe("grapher-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", async () => {
        render(<GrapherEditor {...defaultProps} />);

        expect(
            await screen.findByText("Available functions:"),
        ).toBeInTheDocument();
    });

    it("preserves existing graph properties when GraphSettings onChange is called", async () => {
        const onChangeMock = jest.fn();
        const graph = {
            ...grapherLogic.defaultWidgetOptions.graph,
            box: [400, 400],
            gridStep: [1, 1],
            snapStep: [0.5, 0.5],
        };

        render(
            <GrapherEditor
                {...defaultProps}
                graph={graph}
                onChange={onChangeMock}
            />,
        );

        // Act - change the markings setting via GraphSettings
        const button = screen.getByRole("button", {name: "Grid"});
        await userEvent.click(button);

        // Assert - the onChange call should include the new markings
        // AND preserve existing graph properties like box
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                graph: expect.objectContaining({
                    box: [400, 400],
                    markings: "grid",
                }),
            }),
        );
    });
});
