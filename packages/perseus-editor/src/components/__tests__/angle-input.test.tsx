import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import AngleInput from "../angle-input";

import type {UserEvent} from "@testing-library/user-event";

describe("AngleInput", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    test("calls onChange with new angle (radians)", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(<AngleInput angle={0} onChange={onChangeProps} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const angleInput = screen.getByLabelText("angle");
        await userEvent.type(angleInput, "2pi");

        // Assert
        expect(onChangeProps).toHaveBeenLastCalledWith(2 * Math.PI);
        // Called with "2" and "2pi", not with "2p".
        expect(onChangeProps).toHaveBeenCalledTimes(2);
    });

    test("calls onChange with new angle (degrees)", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(<AngleInput angle={0} onChange={onChangeProps} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const angleSwitch = screen.getByRole("switch");
        await userEvent.click(angleSwitch);
        const angleInput = screen.getByLabelText("angle");
        await userEvent.type(angleInput, "180");

        // Assert
        expect(onChangeProps).toHaveBeenLastCalledWith(Math.PI);
        // Called with the switch, then with "1", "18", and "180".
        expect(onChangeProps).toHaveBeenCalledTimes(4);
    });

    test("does not call onChange with invalid expression", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(<AngleInput angle={0} onChange={onChangeProps} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const angleInput = screen.getByLabelText("angle");
        await userEvent.type(angleInput, "2pi +");

        // Assert
        // Called with "2", "2pi", and "2pi ", but
        // not with "2p" or "2pi +".
        expect(onChangeProps).toHaveBeenCalledTimes(3);
        expect(onChangeProps).toHaveBeenLastCalledWith(2 * Math.PI);
    });

    test("calls onChange in radians when switched to degrees", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(<AngleInput angle={0} onChange={onChangeProps} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const angleInput = screen.getByLabelText("angle");
        await userEvent.type(angleInput, "180");
        const angleSwitch = screen.getByRole("switch");
        await userEvent.click(angleSwitch);

        // Assert
        expect(onChangeProps).toHaveBeenLastCalledWith(Math.PI);
    });

    test("calls onChange in radians when switched to from degrees to radians", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(<AngleInput angle={0} onChange={onChangeProps} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const angleInput = screen.getByLabelText("angle");
        await userEvent.type(angleInput, "360");
        const angleSwitch = screen.getByRole("switch");
        await userEvent.click(angleSwitch);

        // Assert
        expect(onChangeProps).toHaveBeenLastCalledWith(2 * Math.PI);
    });
});
