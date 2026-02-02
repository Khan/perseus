import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import DefinitionEditor from "../definition-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("definition-editor", () => {
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
        render(<DefinitionEditor onChange={() => undefined} />);

        expect(
            await screen.findByText("Definition style guide"),
        ).toBeInTheDocument();
    });

    it("should be possible to change the definition", async () => {
        const onChangeMock = jest.fn();

        render(<DefinitionEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "Word to be defined:",
        });
        await userEvent.type(input, "a");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({togglePrompt: "a"}),
            undefined,
        );
    });
});
