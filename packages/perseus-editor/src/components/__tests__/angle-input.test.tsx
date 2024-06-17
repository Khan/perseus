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

    test("displays angle in degrees", () => {
        // Arrange
        render(<AngleInput angle={Math.PI / 4} onChange={() => {}} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const angleInput = screen.getByRole("spinbutton", {
            name: "angle (degrees)",
        });

        // Assert
        expect(angleInput).toHaveValue(45);
    });

    test("calls onChange with new angle in radians", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(<AngleInput angle={0} onChange={onChangeProps} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const angleInput = screen.getByRole("spinbutton", {
            name: "angle (degrees)",
        });
        await userEvent.type(angleInput, "90");

        // Assert
        expect(onChangeProps).toHaveBeenLastCalledWith(Math.PI / 2);
    });

    test("does not call onChange with invalid expression", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(<AngleInput angle={0} onChange={onChangeProps} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const angleInput = screen.getByRole("spinbutton", {
            name: "angle (degrees)",
        });
        await userEvent.type(angleInput, "-");

        // Assert
        expect(onChangeProps).not.toHaveBeenCalled();
    });
});
