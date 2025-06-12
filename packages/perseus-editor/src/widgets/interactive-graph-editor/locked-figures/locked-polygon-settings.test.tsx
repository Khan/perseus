import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedPolygonSettings from "./locked-polygon-settings";
import {
    getDefaultFigureForType,
    mockedGenerateSpokenMathDetailsForTests,
    mockedJoinLabelsAsSpokenMathForTests,
} from "./util";

import type {Coord} from "@khanacademy/perseus";
import type {LockedLabelType} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    ...getDefaultFigureForType("polygon"),
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

describe("LockedPolygonSettings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });
    test("renders", () => {
        // Arrange

        // Act
        render(<LockedPolygonSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Polygon, 3 sides");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects number of sides", () => {
        // Arrange

        // Act
        render(
            <LockedPolygonSettings
                {...defaultProps}
                points={[
                    [0, 0],
                    [1, 1],
                    [2, 2],
                    [1, -1],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        const titleText = screen.getByText("Polygon, 4 sides");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects color", () => {
        // Arrange

        // Act
        render(<LockedPolygonSettings {...defaultProps} color="blue" />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByLabelText(
            "blue, stroke solid, fill none",
        );
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects stroke style", () => {
        // Arrange

        // Act
        render(
            <LockedPolygonSettings {...defaultProps} strokeStyle="dashed" />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        const titleText = screen.getByLabelText(
            "grayH, stroke dashed, fill none",
        );
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects fill style", () => {
        // Arrange

        // Act
        render(<LockedPolygonSettings {...defaultProps} fillStyle="solid" />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByLabelText(
            "grayH, stroke solid, fill solid",
        );
        expect(titleText).toBeInTheDocument();
    });

    test("shows delete buttons when there are more than 3 points", () => {
        // Arrange

        // Act
        render(
            <LockedPolygonSettings
                {...defaultProps}
                points={[
                    [0, 0],
                    [1, 1],
                    [2, 2],
                    [1, -1],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        const deleteButtons = screen.getAllByLabelText(/Delete polygon point/);
        expect(deleteButtons).toHaveLength(4);
    });

    test("does not show delete buttons when there are 3 points", () => {
        // Arrange

        // Act
        render(<LockedPolygonSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const deleteButtons =
            screen.queryAllByLabelText(/Delete polygon point/);
        expect(deleteButtons).toHaveLength(0);
    });

    test("calls onToggle when header is clicked", async () => {
        // Arrange
        const onToggle = jest.fn();
        render(
            <LockedPolygonSettings {...defaultProps} onToggle={onToggle} />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const header = screen.getByRole("button", {
            name: "Polygon, 3 sides grayH, stroke solid, fill none",
        });
        await userEvent.click(header);

        // Assert
        expect(onToggle).toHaveBeenCalled();
    });

    test("calls onChange when the whole polygon is moved up", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        const initialLabel: LockedLabelType = {
            type: "label",
            coord: [0, 0],
            text: "",
            color: "red",
            size: "small",
        };
        render(
            <LockedPolygonSettings
                {...defaultProps}
                labels={[initialLabel]}
                onChangeProps={onChangeSpy}
                points={[
                    [1, 1],
                    [2, 1],
                    [2, 2],
                    [1, 2],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const moveUpButton = screen.getByLabelText("Move polygon up");
        await userEvent.click(moveUpButton);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({
            labels: [{...initialLabel, coord: [0, 1]}],
            points: [
                [1, 2],
                [2, 2],
                [2, 3],
                [1, 3],
            ],
        });
    });

    test("calls onChange when the whole polygon is moved down", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        const initialLabel: LockedLabelType = {
            type: "label",
            coord: [0, 0],
            text: "",
            color: "red",
            size: "small",
        };
        render(
            <LockedPolygonSettings
                {...defaultProps}
                labels={[initialLabel]}
                onChangeProps={onChangeSpy}
                points={[
                    [1, 1],
                    [2, 1],
                    [2, 2],
                    [1, 2],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const moveDownButton = screen.getByLabelText("Move polygon down");
        await userEvent.click(moveDownButton);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({
            labels: [{...initialLabel, coord: [0, -1]}],
            points: [
                [1, 0],
                [2, 0],
                [2, 1],
                [1, 1],
            ],
        });
    });

    test("calls onChange when the whole polygon is moved left", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        const initialLabel: LockedLabelType = {
            type: "label",
            coord: [0, 0],
            text: "",
            color: "red",
            size: "small",
        };
        render(
            <LockedPolygonSettings
                {...defaultProps}
                onChangeProps={onChangeSpy}
                labels={[initialLabel]}
                points={[
                    [1, 1],
                    [2, 1],
                    [2, 2],
                    [1, 2],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const moveLeftButton = screen.getByLabelText("Move polygon left");
        await userEvent.click(moveLeftButton);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({
            labels: [{...initialLabel, coord: [-1, 0]}],
            points: [
                [0, 1],
                [1, 1],
                [1, 2],
                [0, 2],
            ],
        });
    });

    test("calls onChange when the whole polygon is moved right", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        const initialLabel: LockedLabelType = {
            type: "label",
            coord: [0, 0],
            text: "",
            color: "red",
            size: "small",
        };
        render(
            <LockedPolygonSettings
                {...defaultProps}
                onChangeProps={onChangeSpy}
                labels={[initialLabel]}
                points={[
                    [1, 1],
                    [2, 1],
                    [2, 2],
                    [1, 2],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const moveRightButton = screen.getByLabelText("Move polygon right");
        await userEvent.click(moveRightButton);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({
            labels: [{...initialLabel, coord: [1, 0]}],
            points: [
                [2, 1],
                [3, 1],
                [3, 2],
                [2, 2],
            ],
        });
    });

    test("calls onChange when the weight is changed", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <LockedPolygonSettings
                {...defaultProps}
                onChangeProps={onChangeSpy}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const weightSelect = screen.getByRole("combobox", {name: "weight"});
        await userEvent.click(weightSelect);
        const weightOption = screen.getByRole("option", {name: "thick"});
        await userEvent.click(weightOption);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({weight: "thick"});
    });

    test("default weight is medium", () => {
        // Arrange

        // Act - render with undefined weight
        render(<LockedPolygonSettings {...defaultProps} weight={undefined} />, {
            wrapper: RenderStateRoot,
        });

        // Assert - defaults to medium
        const weightSelect = screen.getByRole("combobox", {name: "weight"});
        expect(weightSelect).toHaveTextContent("medium");
    });

    describe("Labels", () => {
        test("Renders a label when a label is provided", () => {
            // Arrange

            // Act
            render(
                <LockedPolygonSettings
                    {...defaultProps}
                    labels={[
                        {
                            ...defaultLabel,
                            text: "label text",
                        },
                    ]}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            const inputField = screen.getByRole("textbox", {name: "text"});
            expect(inputField).toHaveValue("label text");
        });

        test.each`
            movement   | label                   | coord | updatedBy
            ${"up"}    | ${"Move polygon up"}    | ${1}  | ${1}
            ${"down"}  | ${"Move polygon down"}  | ${1}  | ${-1}
            ${"left"}  | ${"Move polygon left"}  | ${0}  | ${-1}
            ${"right"} | ${"Move polygon right"} | ${0}  | ${1}
        `(
            "Updates the label position when $movement movement button is clicked",
            async ({label, coord, updatedBy}) => {
                // Arrange
                const startingCoords = [
                    [0, 0],
                    [1, 0],
                    [1, 1],
                ] satisfies Coord[];

                const onChangeProps = jest.fn();
                render(
                    <LockedPolygonSettings
                        {...defaultProps}
                        points={startingCoords}
                        labels={[
                            {
                                ...defaultLabel,
                                coord: [0, 0],
                            },
                        ]}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const movementButton = screen.getByLabelText(label);
                await userEvent.click(movementButton);

                const expectedCoords = startingCoords.map((point) => {
                    point[coord] += updatedBy;
                    return point;
                });

                const expectedLabelCoord = [0, 0];
                expectedLabelCoord[coord] += updatedBy;

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    points: expectedCoords,
                    labels: [
                        {
                            ...defaultLabel,
                            coord: expectedLabelCoord,
                        },
                    ],
                });
            },
        );

        test("Updates the label color when the polygon color changes", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedPolygonSettings
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
                <LockedPolygonSettings
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
                <LockedPolygonSettings
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
                <LockedPolygonSettings
                    {...defaultProps}
                    points={[
                        [0, 0],
                        [1, 0],
                        [1, 1],
                    ]}
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
                <LockedPolygonSettings
                    {...defaultProps}
                    ariaLabel="Polygon at (x, y)"
                />,
                {wrapper: RenderStateRoot},
            );

            const input = screen.getByRole("textbox", {name: "Aria label"});

            // Assert
            expect(input).toHaveValue("Polygon at (x, y)");
        });

        test("calls onChangeProps when the aria label is updated", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedPolygonSettings
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

        test("aria label auto-generates (no labels)", async () => {
            // Arrange
            const onChangeProps = jest.fn();

            // Act
            render(
                <LockedPolygonSettings
                    {...defaultProps}
                    points={[
                        [0, 0],
                        [0, 1],
                        [1, 1],
                    ]}
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
                    "Polygon with 3 sides, vertices at spoken $0$ comma spoken $0$, spoken $0$ comma spoken $1$, spoken $1$ comma spoken $1$. Appearance solid gray border, with no fill.",
            });
        });

        test("aria label auto-generates (one label)", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedPolygonSettings
                    {...defaultProps}
                    points={[
                        [0, 0],
                        [0, 1],
                        [1, 1],
                    ]}
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
                    "Polygon spoken A with 3 sides, vertices at spoken $0$ comma spoken $0$, spoken $0$ comma spoken $1$, spoken $1$ comma spoken $1$. Appearance solid gray border, with no fill.",
            });
        });

        test("aria label auto-generates (multiple labels)", async () => {
            // Arrange
            const onChangeProps = jest.fn();
            render(
                <LockedPolygonSettings
                    {...defaultProps}
                    points={[
                        [0, 0],
                        [0, 1],
                        [1, 1],
                    ]}
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
                    "Polygon spoken A, spoken B with 3 sides, vertices at spoken $0$ comma spoken $0$, spoken $0$ comma spoken $1$, spoken $1$ comma spoken $1$. Appearance solid gray border, with no fill.",
            });
        });
    });
});
