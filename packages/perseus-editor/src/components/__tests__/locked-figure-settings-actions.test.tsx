import {screen, render} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedFigureSettingsActions from "../../widgets/interactive-graph-editor/locked-figures/locked-figure-settings-actions";

import type {UserEvent} from "@testing-library/user-event";

describe("LockedFigureSettingsActions", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    test("renders with all buttons", () => {
        // Arrange
        const onMove = jest.fn();
        const onRemove = jest.fn();

        // Act
        render(
            <LockedFigureSettingsActions
                figureType="point"
                onMove={onMove}
                onRemove={onRemove}
            />,
        );

        // Assert
        const deleteButton = screen.getByRole("button", {
            name: "Delete locked point",
        });
        const topButton = screen.queryByRole("button", {
            name: "Move locked point to the back",
        });
        const upButton = screen.queryByRole("button", {
            name: "Move locked point backward",
        });
        const downButton = screen.queryByRole("button", {
            name: "Move locked point forward",
        });
        const bottomButton = screen.queryByRole("button", {
            name: "Move locked point to the front",
        });

        expect(topButton).toBeInTheDocument();
        expect(upButton).toBeInTheDocument();
        expect(downButton).toBeInTheDocument();
        expect(bottomButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    test("renders without movement buttons", () => {
        // Arrange
        const onRemove = jest.fn();

        // Act
        render(
            <LockedFigureSettingsActions
                figureType="point"
                onRemove={onRemove}
            />,
        );

        // Assert
        const deleteButton = screen.getByRole("button", {
            name: "Delete locked point",
        });
        const topButton = screen.queryByRole("button", {
            name: "Move locked point to the back",
        });
        const upButton = screen.queryByRole("button", {
            name: "Move locked point backward",
        });
        const downButton = screen.queryByRole("button", {
            name: "Move locked point forward",
        });
        const bottomButton = screen.queryByRole("button", {
            name: "Move locked point to the front",
        });

        expect(deleteButton).toBeInTheDocument();
        expect(topButton).not.toBeInTheDocument();
        expect(upButton).not.toBeInTheDocument();
        expect(downButton).not.toBeInTheDocument();
        expect(bottomButton).not.toBeInTheDocument();
    });

    test("clicking delete button calls onRemove", async () => {
        // Arrange
        const onRemove = jest.fn();
        render(
            <LockedFigureSettingsActions
                figureType="point"
                onRemove={onRemove}
            />,
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Delete locked point"}),
        );

        // Assert
        expect(onRemove).toHaveBeenCalled();
    });

    test.each`
        movement      | ariaLabel
        ${"back"}     | ${"Move locked point to the back"}
        ${"backward"} | ${"Move locked point backward"}
        ${"forward"}  | ${"Move locked point forward"}
        ${"front"}    | ${"Move locked point to the front"}
    `(
        "clicking $movement button calls onMove",
        async ({movement, ariaLabel}) => {
            // Arrange
            const onMove = jest.fn();
            render(
                <LockedFigureSettingsActions
                    figureType="point"
                    onMove={onMove}
                    onRemove={jest.fn()}
                />,
            );

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: ariaLabel}),
            );

            // Assert
            expect(onMove).toHaveBeenCalledWith(movement);
        },
    );
});
