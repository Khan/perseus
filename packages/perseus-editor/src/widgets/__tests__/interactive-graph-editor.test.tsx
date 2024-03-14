import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import InteractiveGraphEditor from "../interactive-graph-editor";

import type {PerseusGraphType} from "@khanacademy/perseus";

const baseProps = {
    apiOptions: ApiOptions.defaults,
    box: [288, 288] as [number, number],
    gridStep: [1, 1] as [number, number],
    snapStep: [1, 1] as [number, number],
    onChange: () => {},
    graph: undefined,
};

const mafsProps = {
    ...baseProps,
    apiOptions: {
        ...ApiOptions.defaults,
        flags: {
            mafs: {
                segment: true,
            },
        },
    },
    graph: {type: "segment"} as PerseusGraphType,
};

describe("InteractiveGraphEditor", () => {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("should render", async () => {
        // Arrange

        // Act
        render(<InteractiveGraphEditor {...baseProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        expect(await screen.findByText("Correct answer:")).toBeInTheDocument();
    });

    test("changing the graph should call onChange", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor {...baseProps} onChange={onChangeMock} />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const dropdown = screen.getByRole("button", {name: "Type of Graph:"});
        await userEvent.click(dropdown);
        await userEvent.click(screen.getByRole("option", {name: "Polygon"}));

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                graph: {type: "polygon"},
                correct: expect.objectContaining({type: "polygon"}),
            }),
        );
    });

    test("displays error message when `valid` prop is a string", async () => {
        // Arrange

        // Act
        render(
            <InteractiveGraphEditor
                {...baseProps}
                valid="This is an error message"
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        expect(
            await screen.findByText("This is an error message"),
        ).toBeInTheDocument();
    });

    test("uses default graph type if one is not provided", async () => {
        // Arrange

        // Act
        render(<InteractiveGraphEditor {...baseProps} />, {
            wrapper: RenderStateRoot,
        });

        const defaultType = screen.getByText("Linear function");
        const otherType = screen.queryByText("Polygon");

        // Assert
        expect(defaultType).toBeInTheDocument();
        expect(otherType).not.toBeInTheDocument();
    });

    test("uses provided graph type if one is provided", async () => {
        // Arrange

        // Act
        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "polygon"}}
                correct={{type: "polygon"}}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        const defaultType = screen.queryByText("Linear function");
        const otherType = screen.getByText("Polygon");

        // Assert
        expect(defaultType).not.toBeInTheDocument();
        expect(otherType).toBeInTheDocument();
    });

    test("Includes point-specific settings when graph type is 'point'", async () => {
        // Arrange

        // Act
        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "point"}}
                correct={{type: "point"}}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        expect(screen.getByText("Number of Points:")).toBeInTheDocument();
    });

    test("Includes polygon-specific settings when graph type is 'polygon'", async () => {
        // Arrange

        // Act
        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "polygon"}}
                correct={{type: "polygon"}}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        expect(screen.getByText("Number of sides:")).toBeInTheDocument();
        expect(screen.getByText("Snap to:")).toBeInTheDocument();
        expect(screen.getByText("Show angle measures")).toBeInTheDocument();
        expect(screen.getByText("Show side measures")).toBeInTheDocument();
        expect(screen.getByText("Student answer must")).toBeInTheDocument();
    });

    test("Includes segment-specific settings when graph type is 'segment'", async () => {
        // Arrange

        // Act
        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "segment"}}
                correct={{type: "segment"}}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        expect(screen.getByText("Number of segments:")).toBeInTheDocument();
    });

    test("Includes angle-specific settings when graph type is 'angle'", async () => {
        // Arrange

        // Act
        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "angle"}}
                correct={{type: "angle"}}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        expect(screen.getByText("Student answer must")).toBeInTheDocument();
    });

    test("Calls onChange when the number of points is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "point"}}
                correct={{type: "point"}}
                onChange={onChangeMock}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Number of Points:",
        });
        await userEvent.click(input);
        const pointsSelection = screen.getByText("5 points");
        await userEvent.click(pointsSelection);

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                correct: {type: "point", numPoints: 5},
            }),
        );
    });

    test("Calls onChange when the number of sides is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "polygon"}}
                correct={{type: "polygon"}}
                onChange={onChangeMock}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Number of sides:",
        });
        await userEvent.click(input);
        const sidesSelection = screen.getByText("5 sides");
        await userEvent.click(sidesSelection);

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                correct: {
                    type: "polygon",
                    numSides: 5,
                    coords: null,
                    snapTo: "grid",
                },
            }),
        );
    });

    test("Calls onChange when 'Snap to' is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "polygon"}}
                correct={{
                    type: "polygon",
                }}
                onChange={onChangeMock}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Snap to:",
        });
        await userEvent.click(input);
        const snapToSelection = screen.getByText("interior angles");
        await userEvent.click(snapToSelection);

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                correct: {
                    coords: null,
                    type: "polygon",
                    snapTo: "angles",
                },
            }),
        );
    });

    test("Calls onChange when 'Show angle measures' is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "polygon"}}
                correct={{
                    type: "polygon",
                }}
                onChange={onChangeMock}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const input = screen.getByRole("checkbox", {
            name: "Show angle measures",
        });
        await userEvent.click(input);

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                correct: {
                    type: "polygon",
                    showAngles: true,
                },
            }),
        );
    });

    test("Calls onChange when 'Show side measures' is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "polygon"}}
                correct={{
                    type: "polygon",
                }}
                onChange={onChangeMock}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const input = screen.getByRole("checkbox", {
            name: "Show side measures",
        });
        await userEvent.click(input);

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                correct: {
                    type: "polygon",
                    showSides: true,
                },
            }),
        );
    });

    test("Calls onChange when 'Number of segments' is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "segment"}}
                correct={{
                    type: "segment",
                }}
                onChange={onChangeMock}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Number of segments:",
        });
        await userEvent.click(input);
        const segmentsSelection = screen.getByText("5 segments");
        await userEvent.click(segmentsSelection);

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                correct: {
                    type: "segment",
                    numSegments: 5,
                    coords: null,
                },
            }),
        );
    });

    test("Calls onChange when 'Student answer must' for polygon is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "polygon"}}
                correct={{
                    type: "polygon",
                }}
                onChange={onChangeMock}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Student answer must",
        });
        await userEvent.click(input);
        const answerMustSelection = screen.getByText("be similar");
        await userEvent.click(answerMustSelection);

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                correct: {
                    type: "polygon",
                    match: "similar",
                },
            }),
        );
    });

    test("Calls onChange when 'Student answer must' for angle is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "angle"}}
                correct={{
                    type: "angle",
                }}
                onChange={onChangeMock}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Student answer must",
        });
        await userEvent.click(input);
        const answerMustSelection = screen.getByText("be congruent");
        await userEvent.click(answerMustSelection);

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                correct: {
                    type: "angle",
                    match: "congruent",
                },
            }),
        );
    });

    test("Calls onChange when a locked figure is added", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor {...mafsProps} onChange={onChangeMock} />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const addLockedFigureButton = screen.getByRole("button", {
            name: "Add element",
        });
        await userEvent.click(addLockedFigureButton);
        const addPointButton = screen.getByText("Point");
        await userEvent.click(addPointButton);

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                lockedFigures: [
                    expect.objectContaining({
                        type: "point",
                        coord: [0, 0],
                    }),
                ],
            }),
        );
    });

    test("Calls onChange when a locked figure is removed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor
                {...mafsProps}
                onChange={onChangeMock}
                lockedFigures={[{type: "point", coord: [0, 0]}]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const deleteButton = screen.getByRole("button", {
            name: "Delete locked point at 0, 0",
        });
        await userEvent.click(deleteButton);

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                lockedFigures: [],
            }),
        );
    });

    test("Calls onChange when a locked figure's coordinates are changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor
                {...mafsProps}
                onChange={onChangeMock}
                lockedFigures={[{type: "point", coord: [0, 0]}]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const xCoordInput = screen.getByLabelText("x Coordinate");
        await userEvent.clear(xCoordInput);
        await userEvent.type(xCoordInput, "1");
        await userEvent.tab();

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                lockedFigures: [
                    expect.objectContaining({
                        type: "point",
                        coord: [1, 0],
                    }),
                ],
            }),
        );
    });

    test("Shows the locked figure settings when a locked figure is passed in", async () => {
        // Arrange

        // Act
        render(
            <InteractiveGraphEditor
                {...mafsProps}
                onChange={() => {}}
                lockedFigures={[{type: "point", coord: [0, 0]}]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        expect(screen.getByText("Point")).toBeInTheDocument();
        expect(screen.getByText("x Coordinate")).toBeInTheDocument();
        expect(screen.getByText("y Coordinate")).toBeInTheDocument();
        expect(
            screen.getByRole("button", {
                name: "Delete locked point at 0, 0",
            }),
        ).toBeInTheDocument();
    });
});
