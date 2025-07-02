import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedEllipseSettings from "./locked-ellipse-settings";
import {
    getDefaultFigureForType,
    mockedGenerateSpokenMathDetailsForTests,
    mockedJoinLabelsAsSpokenMathForTests,
} from "./util";

import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    ...getDefaultFigureForType("ellipse"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

const defaultLabel = getDefaultFigureForType("label");

// Mock the async functions
jest.mock("./util", () => ({
    ...jest.requireActual("./util"),
    generateSpokenMathDetails: (input) =>
        mockedGenerateSpokenMathDetailsForTests(input),
    joinLabelsAsSpokenMath: (input) =>
        mockedJoinLabelsAsSpokenMathForTests(input),
}));

describe("LockedEllipseSettings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });
    test("renders", () => {
        // Arrange

        // Act
        render(<LockedEllipseSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Ellipse (0, 0), radius 1, 1");
        expect(titleText).toBeInTheDocument();
    });

    test("calls onChange when the weight is changed", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <LockedEllipseSettings
                {...defaultProps}
                onChangeProps={onChangeSpy}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        // Change the weight
        const weightSelect = screen.getByRole("combobox", {name: "weight"});
        await userEvent.click(weightSelect);
        const weightOption = screen.getByRole("option", {name: "thick"});
        await userEvent.click(weightOption);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({weight: "thick"});
    });

    test("summary reflects radius", () => {
        // Arrange

        // Act
        render(<LockedEllipseSettings {...defaultProps} radius={[5, 5]} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Ellipse (0, 0), radius 5, 5");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects center", () => {
        // Arrange

        // Act
        render(<LockedEllipseSettings {...defaultProps} center={[3, 5]} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Ellipse (3, 5), radius 1, 1");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects color", () => {
        // Arrange

        // Act
        render(<LockedEllipseSettings {...defaultProps} color="green" />, {
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
            <LockedEllipseSettings
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
            <LockedEllipseSettings
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
        render(
            <LockedEllipseSettings {...defaultProps} onToggle={onToggle} />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const header = screen.getByRole("button", {
            name: "Ellipse (0, 0), radius 1, 1 grayH, stroke solid, fill none",
        });
        await userEvent.click(header);

        // Assert
        expect(onToggle).toHaveBeenCalled();
    });

    describe("Labels", () => {
        test("Updates the label coords when the ellipse center change", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    center={[1, 1]}
                    labels={[
                        {
                            ...defaultLabel,
                            coord: [1, 1],
                        },
                    ]}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const point1XInput = screen.getAllByLabelText("x coord")[0];
            // Change the x coord of the second point to 20
            await userEvent.type(point1XInput, "0");

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                center: [10, 1],
                labels: [
                    {
                        ...defaultLabel,
                        coord: [10, 1],
                    },
                ],
            });
        });

        test("Updates the label color when the ellipse color changes", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    color="green"
                    labels={[
                        {
                            ...defaultLabel,
                            color: "green",
                        },
                    ]}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const colorSelect = screen.getAllByLabelText("color")[0];
            await userEvent.click(colorSelect);
            const colorOption = screen.getByText("pink");
            await userEvent.click(colorOption);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                color: "pink",
                labels: [
                    {
                        ...defaultLabel,
                        color: "pink",
                    },
                ],
            });
        });

        test("Updates the label when the label text changes", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    labels={[
                        {
                            ...defaultLabel,
                            text: "label text",
                        },
                    ]}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const labelText = screen.getByLabelText("text");
            await userEvent.type(labelText, "!");

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                labels: [{...defaultLabel, text: "label text!"}],
            });
        });

        test("Removes label when delete button is clicked", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    labels={[
                        {
                            ...defaultLabel,
                            text: "label text",
                        },
                    ]}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const deleteButton = screen.getByRole("button", {
                name: "Delete locked label",
            });
            await userEvent.click(deleteButton);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                labels: [],
            });
        });

        test("Adds a new label when the add label button is clicked", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    labels={[
                        {
                            ...defaultLabel,
                            text: "label text",
                        },
                    ]}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const addLabelButton = screen.getByRole("button", {
                name: "Add visible label",
            });
            await userEvent.click(addLabelButton);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                labels: [
                    {
                        ...defaultLabel,
                        text: "label text",
                    },
                    {
                        ...defaultLabel,
                        // One unit down vertically from the first label.
                        coord: [0, -1],
                    },
                ],
            });
        });
    });

    describe("Aria label", () => {
        test("Renders with aria label", () => {
            // Arrange

            // Act
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    ariaLabel="Ellipse at (x, y)"
                />,
                {wrapper: RenderStateRoot},
            );

            const input = screen.getByRole("textbox", {name: "Aria label"});

            // Assert
            expect(input).toHaveValue("Ellipse at (x, y)");
        });

        test("calls onChangeProps when the aria label is updated", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    ariaLabel={undefined}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const input = screen.getByRole("textbox", {name: "Aria label"});
            await userEvent.clear(input);
            await userEvent.type(input, "A");

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                ariaLabel: "A",
            });
        });

        test("aria label autogenerates saying circle when the radii are equal", async () => {
            // Arrange
            const onChangeProps = jest.fn();

            // Act
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    radius={[2, 2]}
                    ariaLabel={undefined}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            const autoGenButton = screen.getByRole("button", {
                name: "Auto-generate",
            });
            await userEvent.click(autoGenButton);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                ariaLabel:
                    "Circle with radius 2, centered at spoken $0$ comma spoken $0$. Appearance solid gray border, with no fill.",
            });
        });

        test("aria label auto-generates without rotation when ellipse is a circle", async () => {
            // Arrange
            const onChangeProps = jest.fn();

            // Act
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    radius={[2, 2]}
                    ariaLabel={undefined}
                    onChangeProps={onChangeProps}
                    angle={Math.PI}
                />,
                {wrapper: RenderStateRoot},
            );

            const autoGenButton = screen.getByRole("button", {
                name: "Auto-generate",
            });
            await userEvent.click(autoGenButton);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                ariaLabel:
                    "Circle with radius 2, centered at spoken $0$ comma spoken $0$. Appearance solid gray border, with no fill.",
            });
        });

        test("aria label auto-generates saying ellipse when the radii are different", async () => {
            // Arrange
            const onChangeProps = jest.fn();

            // Act
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    radius={[2, 3]}
                    ariaLabel={undefined}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            const autoGenButton = screen.getByRole("button", {
                name: "Auto-generate",
            });
            await userEvent.click(autoGenButton);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                ariaLabel:
                    "Ellipse with x radius 2 and y radius 3, centered at spoken $0$ comma spoken $0$. Appearance solid gray border, with no fill.",
            });
        });

        test("aria label auto-generates with rotation when ellipse is rotated", async () => {
            // Arrange
            const onChangeProps = jest.fn();

            // Act
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    radius={[2, 3]}
                    ariaLabel={undefined}
                    onChangeProps={onChangeProps}
                    angle={Math.PI / 2}
                />,
                {wrapper: RenderStateRoot},
            );

            const autoGenButton = screen.getByRole("button", {
                name: "Auto-generate",
            });
            await userEvent.click(autoGenButton);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                ariaLabel:
                    "Ellipse with x radius 2 and y radius 3, centered at spoken $0$ comma spoken $0$, rotated by spoken $90$ degrees. Appearance solid gray border, with no fill.",
            });
        });

        test("aria label auto-generates with one label", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    radius={[2, 2]}
                    ariaLabel={undefined}
                    onChangeProps={onChangeProps}
                    labels={[
                        {
                            ...defaultLabel,
                            text: "A",
                        },
                    ]}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const autoGenButton = screen.getByRole("button", {
                name: "Auto-generate",
            });
            await userEvent.click(autoGenButton);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                ariaLabel:
                    "Circle spoken A with radius 2, centered at spoken $0$ comma spoken $0$. Appearance solid gray border, with no fill.",
            });
        });

        test("aria label auto-generates with multiple labels", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedEllipseSettings
                    {...defaultProps}
                    radius={[2, 2]}
                    ariaLabel={undefined}
                    onChangeProps={onChangeProps}
                    labels={[
                        {
                            ...defaultLabel,
                            text: "A",
                        },
                        {
                            ...defaultLabel,
                            text: "B",
                        },
                    ]}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const autoGenButton = screen.getByRole("button", {
                name: "Auto-generate",
            });
            await userEvent.click(autoGenButton);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                ariaLabel:
                    "Circle spoken A, spoken B with radius 2, centered at spoken $0$ comma spoken $0$. Appearance solid gray border, with no fill.",
            });
        });
    });
});
