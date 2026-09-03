import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import CoordinatePairInput from "./coordinate-pair-input";

import type {Coord} from "@khanacademy/perseus";
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

    it("renders an empty field instead of crashing when a coordinate is null", () => {
        // Item data that skipped validation can carry null coordinate
        // values (LEMS-4564).
        // eslint-disable-next-line no-restricted-syntax
        const corruptedCoord = [null, 0.8] as unknown as Coord;

        // Arrange, Act
        render(
            <CoordinatePairInput coord={corruptedCoord} onChange={() => {}} />,
            {wrapper: RenderStateRoot},
        );

        // Assert
        const [x, y] = screen.getAllByRole("spinbutton");
        expect(x).toHaveValue(null);
        expect(y).toHaveValue(0.8);
    });

    it("does not call onChange when the typed value is not finite", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<CoordinatePairInput coord={[0, 0]} onChange={onChange} />, {
            wrapper: RenderStateRoot,
        });

        // Act: 1e999 overflows to Infinity, which JSON.stringify would
        // turn into null in the saved item data (LEMS-4564).
        const [x] = screen.getAllByRole("spinbutton");
        await userEvent.clear(x);
        await userEvent.type(x, "1e999");

        // Assert
        expect(onChange).not.toHaveBeenCalledWith([Infinity, 0]);
    });
});
