import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import CoordinatePairInput from "./coordinate-pair-input";

import type {UserEvent} from "@testing-library/user-event";

describe("CoordinatePairInput", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders the coordinate values in the fields", () => {
        // Arrange, Act
        render(<CoordinatePairInput coord={[-1.57, 2]} onChange={() => {}} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const [x, y] = screen.getAllByRole("spinbutton");
        expect(x).toHaveValue(-1.57);
        expect(y).toHaveValue(2);
    });

    it("calls onChange with the parsed number when a value is typed", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<CoordinatePairInput coord={[0, 0]} onChange={onChange} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const [x] = screen.getAllByRole("spinbutton");
        await userEvent.clear(x);
        await userEvent.type(x, "3");

        // Assert
        expect(onChange).toHaveBeenLastCalledWith([3, 0]);
    });
});
