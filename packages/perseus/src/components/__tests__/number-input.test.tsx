import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import NumberInput from "../number-input";

import type {UserEvent} from "@testing-library/user-event";

const STARTING_VALUE = 1;

describe("NumberInput", function () {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    const testInputResult = async function (
        input: string,
        result: number,
        extraProps?: {placeholder: number},
    ) {
        const onChange = jest.fn();

        render(
            <NumberInput
                value={STARTING_VALUE}
                onChange={onChange}
                {...extraProps}
            />,
        );

        await userEvent.clear(screen.getByRole("textbox"));
        await userEvent.paste(input);

        expect(onChange).toHaveBeenCalledWith(result);
    };

    it("basic input", async function () {
        await testInputResult("42", 42);
    });

    it("invalid input does not change", async function () {
        await testInputResult("asdf", STARTING_VALUE);
    });

    it("should use placeholder value if blank and has placeholder", async function () {
        await testInputResult("", 15, {placeholder: 15});
    });

    it("should let you increment with the arrow keys", async function () {
        const onChange = jest.fn();
        render(
            <NumberInput value={0} onChange={onChange} useArrowKeys={true} />,
        );

        await userEvent.type(screen.getByRole("textbox"), "{arrowup}");

        expect(onChange).toHaveBeenCalledWith(1);
    });

    it("should let you decrement with the arrow keys", async function () {
        const onChange = jest.fn();
        render(
            <NumberInput value={0} onChange={onChange} useArrowKeys={true} />,
        );

        await userEvent.type(screen.getByRole("textbox"), "{arrowdown}");

        expect(onChange).toHaveBeenCalledWith(-1);
    });

    it("does not increment non-integers", async function () {
        const onChange = jest.fn();
        render(
            <NumberInput
                value={1 / 2}
                onChange={onChange}
                useArrowKeys={true}
            />,
        );

        await userEvent.type(screen.getByRole("textbox"), "{arrowdown}");

        expect(onChange).not.toHaveBeenCalled();
    });

    it("does not decrement non-integers", async function () {
        const onChange = jest.fn();
        render(
            <NumberInput
                value={1 / 2}
                onChange={onChange}
                useArrowKeys={true}
            />,
        );

        await userEvent.type(screen.getByRole("textbox"), "{arrow}");

        expect(onChange).not.toHaveBeenCalled();
    });

    it("shouldn't increment when the arrow keys are disabled", async function () {
        const onChange = jest.fn();
        render(
            <NumberInput value={0} onChange={onChange} useArrowKeys={false} />,
        );

        await userEvent.type(screen.getByRole("textbox"), "{arrowdown}");

        expect(onChange).not.toHaveBeenCalled();
    });

    it.each`
        value            | expected
        ${Math.PI}       | ${"π"}
        ${Math.PI * 2}   | ${"2π"}
        ${Math.PI * 0.5} | ${"π/2"}
    `(
        "allowPiTruncation: loads $value as $expected on mount",
        async function ({value, expected}) {
            // Arrange

            // Act
            render(
                <NumberInput
                    value={value}
                    onChange={jest.fn()}
                    allowPiTruncation={true}
                />,
            );
            const input = screen.getByRole("textbox");

            // Assert
            expect(input).toHaveValue(expected);
        },
    );

    it("does not auto-convert number to pi format when allowPiTruncation is false", async function () {
        // Arrange

        // Act
        render(
            <NumberInput
                value={Math.PI}
                onChange={jest.fn()}
                allowPiTruncation={false}
            />,
        );
        const input = screen.getByRole("textbox");

        // Assert
        expect(input).not.toHaveValue("π");
        expect(input).toHaveValue(Math.PI.toString());
    });
});
