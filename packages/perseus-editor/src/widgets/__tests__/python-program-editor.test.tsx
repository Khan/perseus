import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import PythonProgramEditor, {validateOptions} from "../python-program-editor";

describe("python-program-editor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", async () => {
        render(<PythonProgramEditor onChange={() => undefined} />);

        expect(await screen.findByText(/user program id/i)).toBeInTheDocument();
    });

    it("should be possible to update the User Program ID", async () => {
        const onChangeMock = jest.fn();

        render(<PythonProgramEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "User Program ID:",
        });

        userEvent.type(input, "1");

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({programID: "1", height: 400}),
            undefined,
        );
    });

    it("should be possible to update the height", async () => {
        const onChangeMock = jest.fn();

        render(<PythonProgramEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "Height:",
        });

        userEvent.type(input, "1");

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({programID: "", height: 4001}),
            undefined,
        );
    });

    it("should accept valid options", async () => {
        expect(validateOptions(100, "54321")).toEqual([]);
    });

    it("should require a program ID", async () => {
        expect(validateOptions(100, "")).toEqual([
            "The program ID is required.",
        ]);
    });

    it("should require a positive height", async () => {
        expect(validateOptions(-1, "54321")).toEqual([
            "The height must be a positive integer.",
        ]);
    });

    it("should require an integer for the height", async () => {
        expect(validateOptions(0.5, "54321")).toEqual([
            "The height must be a positive integer.",
        ]);
    });

    it("should require valid values for both options", async () => {
        expect(validateOptions(0.5, "")).toEqual([
            "The program ID is required.",
            "The height must be a positive integer.",
        ]);
    });
});
