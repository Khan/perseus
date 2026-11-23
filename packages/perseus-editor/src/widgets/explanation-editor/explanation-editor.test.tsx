import {Dependencies} from "@khanacademy/perseus";
import {generateExplanationOptions} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import ExplanationEditor from "./explanation-editor";

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
        render(
            <ExplanationEditor
                onChange={() => undefined}
                {...generateExplanationOptions()}
            />,
        );

        expect(
            await screen.findByText("Prompt to show explanation:"),
        ).toBeInTheDocument();
    });

    it("should be possible to change prompt to show explanation", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExplanationEditor
                onChange={onChangeMock}
                {...generateExplanationOptions({showPrompt: "Explain"})}
            />,
        );

        const input = screen.getByRole("textbox", {
            name: "Prompt to show explanation:",
        });
        await userEvent.type(input, "a");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({showPrompt: "Explaina"}),
        );
    });

    it("should be possible to change prompt to hide explanation", async () => {
        const onChangeMock = jest.fn();

        render(
            <ExplanationEditor
                onChange={onChangeMock}
                {...generateExplanationOptions({
                    hidePrompt: "Hide explanation",
                })}
            />,
        );

        const input = screen.getByRole("textbox", {
            name: "Prompt to hide explanation:",
        });
        await userEvent.type(input, "a");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({hidePrompt: "Hide explanationa"}),
        );
    });
});
