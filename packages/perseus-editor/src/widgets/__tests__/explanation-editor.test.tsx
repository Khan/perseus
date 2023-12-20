import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import ExplanationEditor from "../explanation-editor";

describe("explanation-editor", () => {
    beforeEach(() => {
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
        userEvent.type(input, "a");

        expect(onChangeMock).toBeCalledWith(
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
        userEvent.type(input, "a");

        expect(onChangeMock).toBeCalledWith(
            // The dropdown initalizes with "Hide explain"
            expect.objectContaining({hidePrompt: "Hide explanationa"}),
            undefined,
        );
    });
});
