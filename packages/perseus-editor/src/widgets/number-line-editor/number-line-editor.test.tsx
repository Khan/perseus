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

    describe("label range", () => {
        function renderWithLabelRange(
            labelRange: [number | null, number | null],
        ) {
            const onChangeMock = jest.fn();
            render(
                <NumberLineEditor
                    onChange={onChangeMock}
                    // Static mode hides the Position input, whose
                    // placeholder would otherwise match the left label's.
                    static={true}
                    range={[0, 10]}
                    labelRange={labelRange}
                />,
            );
            return onChangeMock;
        }

        async function replaceValue(input: HTMLElement, text: string) {
            await userEvent.clear(input);
            await userEvent.type(input, text);
        }

        it("sets the left label when the right label is unset", async () => {
            // Arrange
            const onChangeMock = renderWithLabelRange([null, null]);

            // Act
            await userEvent.type(screen.getByPlaceholderText("0"), "3");

            // Assert
            expect(onChangeMock).toHaveBeenLastCalledWith(
                expect.objectContaining({labelRange: [3, null]}),
            );
        });

        it("sets the right label when the left label is unset", async () => {
            // Arrange
            const onChangeMock = renderWithLabelRange([null, null]);

            // Act
            await userEvent.type(screen.getByPlaceholderText("10"), "7");

            // Assert
            expect(onChangeMock).toHaveBeenLastCalledWith(
                expect.objectContaining({labelRange: [null, 7]}),
            );
        });

        it("keeps the labels in place when an edit preserves their order", async () => {
            // Arrange
            const onChangeMock = renderWithLabelRange([3, 6]);

            // Act
            await replaceValue(screen.getByDisplayValue("3"), "5");

            // Assert
            expect(onChangeMock).toHaveBeenLastCalledWith(
                expect.objectContaining({labelRange: [5, 6]}),
            );
        });

        it("swaps the labels when the left label is greater than the right", async () => {
            // Arrange
            const onChangeMock = renderWithLabelRange([3, 6]);

            // Act
            await replaceValue(screen.getByDisplayValue("3"), "8");

            // Assert
            expect(onChangeMock).toHaveBeenLastCalledWith(
                expect.objectContaining({labelRange: [6, 8]}),
            );
        });

        it("swaps the labels when the right label is less than the left", async () => {
            // Arrange
            const onChangeMock = renderWithLabelRange([3, 6]);

            // Act
            await replaceValue(screen.getByDisplayValue("6"), "1");

            // Assert
            expect(onChangeMock).toHaveBeenLastCalledWith(
                expect.objectContaining({labelRange: [1, 3]}),
            );
        });
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
