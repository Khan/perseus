import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedCircleSettings from "../locked-circle-settings";
import {getDefaultFigureForType} from "../util";

import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    ...getDefaultFigureForType("circle"),
    onChangeProps: () => {},
    onRemove: () => {},
};

describe("LockedCircleSettings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });
    test("renders", () => {
        // Arrange

        // Act
        render(<LockedCircleSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Circle (0, 0), radius 1");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects radius", () => {
        // Arrange

        // Act
        render(<LockedCircleSettings {...defaultProps} radius={5} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Circle (0, 0), radius 5");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects center", () => {
        // Arrange

        // Act
        render(<LockedCircleSettings {...defaultProps} center={[3, 5]} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Circle (3, 5), radius 1");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects color", () => {
        // Arrange

        // Act
        render(<LockedCircleSettings {...defaultProps} color="green" />, {
            wrapper: RenderStateRoot,
        });

        const swatch = screen.getByLabelText("green, stroke solid, fill none");

        // Assert
        expect(swatch).toBeInTheDocument();
    });

    test("summary reflects stroke", () => {
        // Arrange

        // Act
        render(
            <LockedCircleSettings
                {...defaultProps}
                color="green"
                strokeStyle="dashed"
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        const swatch = screen.getByLabelText("green, stroke dashed, fill none");

        // Assert
        expect(swatch).toBeInTheDocument();
    });

    test("summary reflects fill", () => {
        // Arrange

        // Act
        render(
            <LockedCircleSettings
                {...defaultProps}
                color="green"
                fillStyle="translucent"
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        const swatch = screen.getByLabelText(
            "green, stroke solid, fill translucent",
        );

        // Assert
        expect(swatch).toBeInTheDocument();
    });

    test("calls onToggle when header is clicked", async () => {
        // Arrange
        const onToggle = jest.fn();
        render(<LockedCircleSettings {...defaultProps} onToggle={onToggle} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const header = screen.getByRole("button", {
            name: "Circle (0, 0), radius 1 grayH, stroke solid, fill none",
        });
        await userEvent.click(header);

        // Assert
        expect(onToggle).toHaveBeenCalled();
    });
});
