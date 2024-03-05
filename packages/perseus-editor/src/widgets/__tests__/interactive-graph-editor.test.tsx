import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import InteractiveGraphEditor from "../interactive-graph-editor";

const baseProps = {
    apiOptions: ApiOptions.defaults,
    box: [288, 288] as [number, number],
    gridStep: [1, 1] as [number, number],
    snapStep: [1, 1] as [number, number],
    onChange: () => {},
    graph: undefined,
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
        render(<InteractiveGraphEditor {...baseProps} />);

        // Assert
        expect(await screen.findByText("Correct answer:")).toBeInTheDocument();
    });

    test("changing the graph should call onChange", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor {...baseProps} onChange={onChangeMock} />,
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
        );

        // Assert
        expect(
            await screen.findByText("This is an error message"),
        ).toBeInTheDocument();
    });

    test("uses default graph type if one is not provided", async () => {
        // Arrange

        // Act
        render(<InteractiveGraphEditor {...baseProps} />);

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
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Number of Points:",
        });
        input.click();
        const pointsSelection = screen.getByText("5 points");
        pointsSelection.click();

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
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Number of sides:",
        });
        input.click();
        const sidesSelection = screen.getByText("5 sides");
        sidesSelection.click();

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
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Snap to:",
        });
        input.click();
        const snapToSelection = screen.getByText("interior angles");
        snapToSelection.click();

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
        );

        // Act
        const input = screen.getByRole("checkbox", {
            name: "Show angle measures",
        });
        input.click();

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
        );

        // Act
        const input = screen.getByRole("checkbox", {
            name: "Show side measures",
        });
        input.click();

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
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Number of segments:",
        });
        input.click();
        const segmentsSelection = screen.getByText("5 segments");
        segmentsSelection.click();

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
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Student answer must",
        });
        input.click();
        const answerMustSelection = screen.getByText("be similar");
        answerMustSelection.click();

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
        );

        // Act
        const input = screen.getByRole("button", {
            name: "Student answer must",
        });
        input.click();
        const answerMustSelection = screen.getByText("be congruent");
        answerMustSelection.click();

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
});
