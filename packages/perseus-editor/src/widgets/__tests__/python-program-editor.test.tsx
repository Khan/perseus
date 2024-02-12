import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import PythonProgramEditor from "../python-program-editor";

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
            expect.objectContaining({programID: 1, height: 400}),
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
});
