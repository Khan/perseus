import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedFunctionSettings from "../graph-locked-figures/locked-function-settings";
import {getDefaultFigureForType} from "../util";

import type {Props} from "../graph-locked-figures/locked-function-settings";
import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    ...getDefaultFigureForType("function"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
} as Props;

describe("Locked Function Settings", () => {
    let userEvent: UserEvent;
    const onChangeProps = jest.fn();

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    test("renders as expected with default values", () => {
        // Act
        render(<LockedFunctionSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Function (y=x^2)");
        expect(titleText).toBeInTheDocument();
    });

    describe("Header interactions", () => {
        test("should show the function's color and stroke by default", () => {
            // Arrange
            render(<LockedFunctionSettings {...defaultProps} />, {
                wrapper: RenderStateRoot,
            });

            // Act
            const lineSwatch = screen.getByLabelText("grayH, solid");

            // Assert
            expect(lineSwatch).toBeInTheDocument();
        });

        test("should use the supplied color in the label", () => {
            // Arrange
            render(<LockedFunctionSettings {...defaultProps} color="green" />, {
                wrapper: RenderStateRoot,
            });

            // Act
            const lineSwatch = screen.getByLabelText("green, solid");

            // Assert
            expect(lineSwatch).toBeInTheDocument();
        });

        test("should use the supplied stroke style in the label", () => {
            // Arrange
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    strokeStyle="dashed"
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const lineSwatch = screen.getByLabelText("grayH, dashed");

            // Assert
            expect(lineSwatch).toBeInTheDocument();
        });

        test("should use the supplied equation in the label", () => {
            // Arrange
            render(
                <LockedFunctionSettings {...defaultProps} equation="sin(x)" />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const header = screen.getByRole("button", {
                name: "Function (y=sin(x)) grayH, solid",
            });

            // Assert
            expect(header).toBeInTheDocument();
        });

        test("should use the appropriate axis reference in the label", () => {
            // Arrange
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    directionalAxis="y"
                    equation="cos(y)"
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const header = screen.getByRole("button", {
                name: "Function (x=cos(y)) grayH, solid",
            });

            // Assert
            expect(header).toBeInTheDocument();
        });

        test("calls 'onToggle' when header is clicked", async () => {
            // Arrange
            const onToggle = jest.fn();
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    onToggle={onToggle}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const header = screen.getByRole("button", {
                name: "Function (y=x^2) grayH, solid",
            });
            await userEvent.click(header);

            // Assert
            expect(onToggle).toHaveBeenCalled();
        });
    });

    describe("Settings interactions", () => {
        test("calls 'onChangeProps' when color is changed", async () => {
            // Arrange
            render(
                <LockedFunctionSettings
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

        test("calls 'onChangeProps' when stroke style is changed", async () => {
            // Arrange
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    expanded={true}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            // Change the stroke
            const strokeSwitch = screen.getByLabelText("stroke");
            await userEvent.click(strokeSwitch);
            const strokeOption = screen.getByText("dashed");
            await userEvent.click(strokeOption);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({strokeStyle: "dashed"});
        });

        test("calls 'onChangeProps' when equation is changed (as keys are pressed)", async () => {
            // Arrange
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    expanded={true}
                    onChangeProps={onChangeProps}
                    equation=""
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            // Change the equation
            const equationField = screen.getByLabelText("equation");
            await userEvent.type(equationField, "zot");

            // Assert
            expect(onChangeProps).toHaveBeenCalledTimes(3);
            // NOTE: Since the 'onChangeProps' function is being mocked,
            //           the equation doesn't get updated,
            //           and therefore the keystrokes don't accumulate.
            //       This is reflected in the calls to 'onChangeProps' being just 1 character at a time.
            expect(onChangeProps).toHaveBeenNthCalledWith(1, {equation: "z"});
            expect(onChangeProps).toHaveBeenNthCalledWith(2, {equation: "o"});
            expect(onChangeProps).toHaveBeenNthCalledWith(3, {equation: "t"});
        });

        test("calls 'onChangeProps' when directional axis is changed", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    expanded={true}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            // Change the axis direction
            const directionalAxisSwitch =
                screen.getByLabelText("equation prefix");
            await userEvent.click(directionalAxisSwitch);
            const axisOption = screen.getByText("x =");
            await userEvent.click(axisOption);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({directionalAxis: "y"});
        });

        describe("Domain interactions", () => {
            test("valid entries update component properties", async () => {
                // Arrange
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        expanded={true}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const domainMinField = screen.getByLabelText("domain min");
                await userEvent.type(domainMinField, "1");
                const domainMaxField = screen.getByLabelText("domain max");
                await userEvent.type(domainMaxField, "5");

                // Assert
                expect(onChangeProps).toHaveBeenCalledTimes(2);
                expect(onChangeProps).toHaveBeenNthCalledWith(1, {
                    domain: [1, Infinity],
                });
                expect(onChangeProps).toHaveBeenNthCalledWith(2, {
                    domain: [-Infinity, 5],
                });
            });

            test("negative entries are handled appropriately", async () => {
                // Arrange
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        expanded={true}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const domainMinField = screen.getByLabelText("domain min");
                await userEvent.type(domainMinField, "-5");
                await userEvent.type(domainMinField, "[Backspace/]4");
                await userEvent.type(
                    domainMinField,
                    "[Backspace/][Backspace/]-3",
                );
                const domainMaxField = screen.getByLabelText("domain max");
                await userEvent.type(domainMaxField, "-2");

                // Assert
                expect(onChangeProps).toHaveBeenNthCalledWith(1, {
                    domain: [-5, Infinity],
                });
                expect(onChangeProps).toHaveBeenNthCalledWith(3, {
                    domain: [-4, Infinity],
                });
                expect(onChangeProps).toHaveBeenNthCalledWith(5, {
                    domain: [-3, Infinity],
                });
                expect(onChangeProps).toHaveBeenNthCalledWith(6, {
                    domain: [-Infinity, -2],
                });
            });

            test("invalid entries don't update component properties", async () => {
                // Arrange
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        expanded={true}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                // Try different invalid entries (not numbers)
                const domainMinField = screen.getByLabelText("domain min");
                await userEvent.type(domainMinField, " ");
                await userEvent.type(domainMinField, "e");

                // Assert
                expect(onChangeProps).toHaveBeenCalledTimes(0);
            });

            test("deleted values are replaced with +/- Infinity", async () => {
                // Arrange
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        domain={[3, 5]}
                        expanded={true}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const domainMinField = screen.getByLabelText("domain min");
                await userEvent.type(
                    domainMinField,
                    "[ArrowRight/][Backspace/]", // ensure that the cursor is on the right side of the digit before deleting it
                );
                const domainMaxField = screen.getByLabelText("domain max");
                await userEvent.type(
                    domainMaxField,
                    "[ArrowRight/][Backspace/]",
                );

                // Assert
                expect(onChangeProps).toHaveBeenCalledTimes(2);
                expect(onChangeProps).toHaveBeenNthCalledWith(1, {
                    domain: [-Infinity, 5],
                });
                expect(onChangeProps).toHaveBeenNthCalledWith(2, {
                    domain: [3, Infinity],
                });
            });
        });
    });
});
