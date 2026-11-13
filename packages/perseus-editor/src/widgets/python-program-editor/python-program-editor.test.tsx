import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import PythonProgramEditor from "./python-program-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("python-program-editor", () => {
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
        render(<PythonProgramEditor onChange={() => undefined} />);

        expect(await screen.findByText(/user program id/i)).toBeInTheDocument();
    });

    it("should be possible to update the User Program ID", async () => {
        const onChangeMock = jest.fn();

        render(<PythonProgramEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "User Program ID:",
        });

        await userEvent.type(input, "1");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({programID: "1", height: 400}),
        );
    });

    it("should be possible to update the height", async () => {
        const onChangeMock = jest.fn();

        render(<PythonProgramEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "Height:",
        });

        await userEvent.type(input, "1");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({programID: "", height: 4001}),
        );
    });
});
