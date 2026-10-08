import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import NumberLineEditor from "./number-line-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("number-line-editor", () => {
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
        render(<NumberLineEditor onChange={() => undefined} />);

        expect(await screen.findByText("Correct x")).toBeInTheDocument();
    });

    const relationships = [
        ["lt", "Less than"],
        ["gt", "Greater than"],
        ["le", "Less than or equal"],
        ["ge", "Greater than or equal"],
        ["eq", "Equal"],
    ];
    relationships.forEach(([rel, name]) => {
        it(`should be possible to set relationship to: ${rel}`, async () => {
            const onChangeMock = jest.fn();

            // Ensure a different option is selected initially; onChange
            // doesn't fire if you re-select the option that's already selected.
            const selected = name === "Equal" ? "lt" : "eq";
            render(
                <NumberLineEditor
                    onChange={onChangeMock}
                    correctRel={selected}
                />,
            );

            await userEvent.click(
                screen.getByRole("combobox", {
                    name: "Select relationship",
                }),
            );
            await userEvent.click(screen.getByRole("option", {name}));

            expect(onChangeMock).toHaveBeenLastCalledWith(
                expect.objectContaining({correctRel: rel}),
            );
        });
    });

    it("should be possible to update the answer", async () => {
        const onChangeMock = jest.fn();

        render(<NumberLineEditor onChange={onChangeMock} />);

        const input = screen.getByPlaceholderText("answer");
        await userEvent.type(input, "1");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({correctX: 1}),
        );
    });

    it("should be possible to update position", async () => {
        const onChangeMock = jest.fn();

        render(<NumberLineEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {name: "Position: ∈"});
        await userEvent.type(input, "1");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({initialX: 1}),
        );
    });

    it("should be possible to update style", async () => {
        const onChangeMock = jest.fn();

        render(<NumberLineEditor onChange={onChangeMock} />);

        await userEvent.click(screen.getByTitle("Improper fractions"));

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({labelStyle: "improper"}),
        );
    });

    it("should be possible to change show tick controller", async () => {
        const onChangeMock = jest.fn();

        render(<NumberLineEditor onChange={onChangeMock} />);

        await userEvent.click(
            screen.getByRole("checkbox", {name: "Show tick controller"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({isTickCtrl: true}),
        );
    });

    it("should be possible to change show label tickets", async () => {
        const onChangeMock = jest.fn();

        render(<NumberLineEditor onChange={onChangeMock} />);

        await userEvent.click(
            screen.getByRole("checkbox", {name: "Show label ticks"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({labelTicks: false}),
        );
    });

    it("should be possible to change show tooltips", async () => {
        const onChangeMock = jest.fn();

        render(<NumberLineEditor onChange={onChangeMock} />);

        await userEvent.click(
            screen.getByRole("checkbox", {name: "Show tooltips"}),
        );

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({showTooltips: true}),
        );
    });

    it("should be possible to update tick steps", async () => {
        const onChangeMock = jest.fn();

        render(<NumberLineEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "or tick step:",
        });
        await userEvent.type(input, "6");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                numDivisions: null,
                tickStep: 6,
            }),
        );
    });

    it("should be possible to update snap divisions", async () => {
        const onChangeMock = jest.fn();

        render(<NumberLineEditor onChange={onChangeMock} />);

        const input = screen.getByRole("textbox", {
            name: "Snap increments per tick:",
        });
        await userEvent.type(input, "6");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({snapDivisions: 26}),
        );
    });
});
