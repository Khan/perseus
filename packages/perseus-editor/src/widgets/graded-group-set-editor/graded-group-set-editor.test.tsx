import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import GradedGroupSetEditor from "./graded-group-set-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("GradedGroupSetEditor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("adds a group when 'Add group' is clicked", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<GradedGroupSetEditor gradedGroups={[]} onChange={onChange} />);

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Add group"}));

        // Assert
        expect(onChange).toHaveBeenLastCalledWith({
            gradedGroups: [
                {
                    title: "",
                    content: "",
                    widgets: {},
                    images: {},
                    hint: null,
                },
            ],
        });
    });
});
