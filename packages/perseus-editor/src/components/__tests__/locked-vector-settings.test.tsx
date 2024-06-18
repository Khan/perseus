import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedVectorSettings from "../locked-vector-settings";
import {getDefaultFigureForType} from "../util";

import type {Props} from "../locked-vector-settings";
import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    ...getDefaultFigureForType("vector"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
} as Props;

describe("Locked Vector Settings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    test("renders as expected with default values", () => {
        // Act
        render(<LockedVectorSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Vector (0, 0), (2, 2)");
        expect(titleText).toBeInTheDocument();
    });

    describe("Heading interactions", () => {
        test("should show the vector's color by default", () => {
            // Arrange
            render(<LockedVectorSettings {...defaultProps} />, {
                wrapper: RenderStateRoot,
            });

            // Act
            const lineSwatch = screen.getByLabelText("grayH, solid");

            // Assert
            expect(lineSwatch).toBeInTheDocument();
        });

        test("should use the supplied color in the label", () => {
            // Arrange
            render(<LockedVectorSettings {...defaultProps} color="green" />, {
                wrapper: RenderStateRoot,
            });

            // Act
            const lineSwatch = screen.getByLabelText("green, solid");

            // Assert
            expect(lineSwatch).toBeInTheDocument();
        });

        test("calls 'onToggle' when header is clicked", async () => {
            // Arrange
            const onToggle = jest.fn();
            render(
                <LockedVectorSettings {...defaultProps} onToggle={onToggle} />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const header = screen.getByRole("button", {
                name: "Vector (0, 0), (2, 2) grayH, solid",
            });
            await userEvent.click(header);

            // Assert
            expect(onToggle).toHaveBeenCalled();
        });
    });

    describe("Settings interactions", () => {
        test("calls 'onChangeProps' when color is changed", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedVectorSettings
                    {...defaultProps}
                    expanded={true}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            // Change the color
            const colorSwitch = screen.getByLabelText("color");
            await userEvent.click(colorSwitch);
            const colorOption = screen.getByText("green");
            await userEvent.click(colorOption);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({color: "green"});
        });

        test("shows an error when the vector length is zero", () => {
            // Act
            render(
                <LockedVectorSettings
                    {...defaultProps}
                    points={[
                        [0, 0],
                        [0, 0],
                    ]}
                    onChangeProps={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            const errors = screen.getByText("The vector cannot have length 0.");
            // Show error for both points
            expect(errors).toBeInTheDocument();
        });

        test("does NOT show an error when the length is greater than zero", () => {
            // Arrange

            // Act
            render(
                <LockedVectorSettings
                    {...defaultProps}
                    points={[
                        [0, 0],
                        [0, 1],
                    ]}
                    onChangeProps={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            const errors = screen.queryAllByText(
                "The line cannot have length 0.",
            );
            expect(errors).toHaveLength(0);
        });

        test("updates props when changes made to coordinates", async () => {
            // Arrange
            const onChangePropsMock = jest.fn();
            render(
                <LockedVectorSettings
                    {...defaultProps}
                    onChangeProps={onChangePropsMock}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const coordInputs = screen.getAllByRole(
                "spinbutton",
            ) as HTMLInputElement[];
            for (let index = 0; index < coordInputs.length; index++) {
                const input = coordInputs[index];
                const currentValue = parseInt(input.value);
                await userEvent.type(input, `${currentValue + 1}`);
                expect(onChangePropsMock).toHaveBeenCalledTimes(1);
                onChangePropsMock.mockClear();
            }
        });
    });
});
