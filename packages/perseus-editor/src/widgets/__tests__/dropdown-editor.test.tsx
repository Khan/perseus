import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import DropdownEditor from "../dropdown-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("dropdown-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should be possible to modify placeholder text", async () => {
        const onChangeMock = jest.fn();

        render(<DropdownEditor onChange={onChangeMock} />);

        const input = screen.getByPlaceholderText("Placeholder value");
        await userEvent.type(input, "a");

        expect(onChangeMock).toHaveBeenCalledWith({placeholder: "a"});
    });

    it("should be possible to delete choice", async () => {
        const onChangeMock = jest.fn();

        render(<DropdownEditor onChange={onChangeMock} />);

        await userEvent.click(
            screen.getByRole("button", {name: "Delete choice"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith({choices: []});
    });

    it("should be possible to add choice", async () => {
        const onChangeMock = jest.fn();

        render(<DropdownEditor onChange={onChangeMock} />);

        await userEvent.click(
            screen.getByRole("button", {name: "Add a choice"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith(
            {
                choices: [
                    {content: "", correct: false},
                    {content: "", correct: false},
                ],
            },
            // there's some anonymous function that's also passed
            expect.anything(),
        );
    });
    it("should disable add and delete choice buttons when editingDisabled is true", () => {
        render(
            <DropdownEditor
                apiOptions={{editingDisabled: true}}
                onChange={() => {}}
            />,
        );

        // Wonder Blocks buttons use aria-disabled instead of the disabled attribute
        expect(
            screen.getByRole("button", {name: "Add a choice"}),
        ).toHaveAttribute("aria-disabled", "true");
        expect(
            screen.getByRole("button", {name: "Delete choice"}),
        ).toHaveAttribute("aria-disabled", "true");
    });
});
