import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import DropdownEditor from "../dropdown-editor";

describe("dropdown-editor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should be possible to modify placeholder text", async () => {
        const onChangeMock = jest.fn();

        render(<DropdownEditor onChange={onChangeMock} />);

        const input = screen.getByPlaceholderText("Placeholder value");
        userEvent.type(input, "a");

        expect(onChangeMock).toBeCalledWith({placeholder: "a"});
    });

    it("should be possible to delete choice", async () => {
        const onChangeMock = jest.fn();

        render(<DropdownEditor onChange={onChangeMock} />);

        userEvent.click(screen.getByRole("link", {name: "Delete choice"}));

        expect(onChangeMock).toBeCalledWith({choices: []});
    });

    it("should be possible to add choice", async () => {
        const onChangeMock = jest.fn();

        render(<DropdownEditor onChange={onChangeMock} />);

        userEvent.click(screen.getByRole("link", {name: "Add a choice"}));

        expect(onChangeMock).toBeCalledWith(
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
});
