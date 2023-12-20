import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import DefinitionEditor from "../definition-editor";

describe("definition-editor", () => {
    beforeEach(() => {
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
        userEvent.type(input, "a");

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({togglePrompt: "a"}),
            undefined,
        );
    });
});
