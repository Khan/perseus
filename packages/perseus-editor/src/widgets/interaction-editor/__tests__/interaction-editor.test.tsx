import {Dependencies} from "@khanacademy/perseus";
import {interactionLogic} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../testing/test-dependencies";
import InteractionEditor from "../interaction-editor";

import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    ...interactionLogic.defaultWidgetOptions,
    onChange: () => {},
};

describe("interaction-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        Dependencies.setDependencies(testDependencies);
    });

    it("should render", async () => {
        render(<InteractionEditor {...defaultProps} />);

        expect(await screen.findByText("Grid settings")).toBeInTheDocument();
    });

    it("preserves existing graph properties when GraphSettings onChange is called", async () => {
        const onChangeMock = jest.fn();
        const graph = {
            ...interactionLogic.defaultWidgetOptions.graph,
            markings: "graph" as const,
        };

        render(
            <InteractionEditor
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
