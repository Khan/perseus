import {Dependencies} from "@khanacademy/perseus";
import {gradedGroupLogic} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import GradedGroupSetEditor from "./graded-group-set-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("GradedGroupSetEditor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("appends a copy of the default graded group when Add group is clicked", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<GradedGroupSetEditor gradedGroups={[]} onChange={onChange} />);

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Add group"}));

        // Assert
        const [newGroup] = onChange.mock.calls[0][0].gradedGroups;
        expect(newGroup).toEqual(gradedGroupLogic.defaultWidgetOptions);
        expect(newGroup).not.toBe(gradedGroupLogic.defaultWidgetOptions);
    });
});
