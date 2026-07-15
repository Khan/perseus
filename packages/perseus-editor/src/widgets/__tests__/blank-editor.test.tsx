import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import BlankEditor from "../blank-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("blank editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders", async () => {
        // Act
        render(<BlankEditor onChange={() => {}} />);

        // Assert
        expect(screen.getByLabelText("Some field's label")).toBeInTheDocument();
        expect(
            screen.getByText("Some text visible in the editor"),
        ).toBeInTheDocument();
    });

    it("should be possible to [do some kind of change]", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(<BlankEditor onChange={onChangeMock} />);
        /**
         * Some kind of user event here -- click, type, etc.
         */
        await userEvent.type(screen.getByLabelText("URL"), "h");
        await userEvent.click(screen.getByRole("checkbox", {name: "Padding:"}));

        // Assert
        expect(onChangeMock).toBeCalledWith(/* updated partial props */);
    });
});
