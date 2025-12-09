import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedLabelSettings from "./locked-label-settings";

import type {Props} from "./locked-label-settings";
import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    ...getDefaultFigureForType("label"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
} as Props;

describe("Locked Label Settings", () => {
    let userEvent: UserEvent;
    const onChangeProps = jest.fn();

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    test("renders as expected with default values", () => {
        // Arrange

        // Act
        render(<LockedLabelSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Label (0, 0)");
        expect(titleText).toBeInTheDocument();
    });

    describe("Header interactions", () => {
        test("should show the correct coords in the header", () => {
            // Arrange
            render(
                <LockedLabelSettings
                    {...defaultProps}
                    coord={[1, 2]}
                    text=""
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const titleText = screen.getByText("Label (1, 2)");

            // Assert
            expect(titleText).toBeInTheDocument();
        });

        test("should show the text in the header", () => {
            // Arrange
            render(
                <LockedLabelSettings
                    {...defaultProps}
                    color="blue"
                    text="something"
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const text = screen.getByText("something");

            // Assert
            expect(text).toBeInTheDocument();
        });

        test("calls 'onToggle' when header is clicked", async () => {
            // Arrange
            const onToggle = jest.fn();
            render(
                <LockedLabelSettings
                    {...defaultProps}
                    text="something"
                    onToggle={onToggle}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const header = screen.getByRole("button", {
                name: "Label (0, 0) something",
            });
            await userEvent.click(header);

            // Assert
            expect(onToggle).toHaveBeenCalled();
        });
    });

    describe("Settings interactions", () => {
        test("calls 'onChangeProps' when coords are changed", async () => {
            // Arrange
            render(
                <LockedLabelSettings
                    {...defaultProps}
                    onChangeProps={onChangeProps}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const xCoordInput = screen.getByRole("spinbutton", {
                name: "x coord",
            });
            const yCoordInput = screen.getByRole("spinbutton", {
                name: "y coord",
            });

            await userEvent.clear(xCoordInput);
            await userEvent.type(xCoordInput, "1");

            await userEvent.clear(yCoordInput);
            await userEvent.type(yCoordInput, "2");

            // Assert
            expect(onChangeProps).toHaveBeenCalledTimes(2);
            // Calls are not being accumulated because they're mocked.
            expect(onChangeProps.mock.calls).toEqual([
                [{coord: [1, 0]}],
                [{coord: [0, 2]}],
            ]);
        });

        test("calls 'onChangeProps' when text is changed", async () => {
            // Arrange
            render(
                <LockedLabelSettings
                    {...defaultProps}
                    text=""
                    onChangeProps={onChangeProps}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const textInput = screen.getByRole("textbox", {
                name: "text",
            });
            await userEvent.type(textInput, "x^2");

            // Assert
            expect(onChangeProps).toHaveBeenCalledTimes(3);
            // NOTE: Since the 'onChangeProps' function is being mocked,
            //   the equation doesn't get updated,
            //   and therefore the keystrokes don't accumulate.
            //   This is reflected in the calls to 'onChangeProps' being
            //   just 1 character at a time.
            expect(onChangeProps.mock.calls).toEqual([
                [{text: "x"}],
                [{text: "^"}],
                [{text: "2"}],
            ]);
        });

        test("calls 'onChangeProps' when color is changed", async () => {
            // Arrange
            render(
                <LockedLabelSettings
                    {...defaultProps}
                    onChangeProps={onChangeProps}
                />,
                {
                    wrapper: RenderStateRoot,
                },
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

        test("calls 'onChangeProps' when size is changed", async () => {
            // Arrange
            render(
                <LockedLabelSettings
                    {...defaultProps}
                    onChangeProps={onChangeProps}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            // Change the color
            const sizeSelect = screen.getByLabelText("size");
            await userEvent.click(sizeSelect);
            const sizeOption = screen.getByText("small");
            await userEvent.click(sizeOption);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({size: "small"});
        });
    });
});
