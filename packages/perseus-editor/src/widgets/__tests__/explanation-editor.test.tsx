import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import ExplanationEditor from "../explanation-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("explanation-editor", () => {
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
        render(<ExplanationEditor onChange={() => undefined} />);

        expect(
            await screen.findByText("Prompt to show explanation:"),
        ).toBeInTheDocument();
    });

    it("should be possible to change prompt to show explanation", async () => {
        const onChangeMock = jest.fn();

        render(<ExplanationEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "Prompt to show explanation:",
        });
        await userEvent.type(input, "a");

        expect(onChangeMock).toHaveBeenCalledWith(
            // The dropdown initalizes with "Explain"
            expect.objectContaining({showPrompt: "Explaina"}),
            undefined,
        );
    });

    it("should be possible to change prompt to hide explanation", async () => {
        const onChangeMock = jest.fn();

        render(<ExplanationEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "Prompt to hide explanation:",
        });
        await userEvent.type(input, "a");

        expect(onChangeMock).toHaveBeenCalledWith(
            // The dropdown initalizes with "Hide explain"
            expect.objectContaining({hidePrompt: "Hide explanationa"}),
            undefined,
        );
    });
});
