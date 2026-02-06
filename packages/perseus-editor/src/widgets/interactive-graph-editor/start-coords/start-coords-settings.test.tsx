import {Dependencies} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {clone} from "../../../testing/object-utils";
import {testDependencies} from "../../../testing/test-dependencies";

import StartCoordsSettings from "./start-coords-settings";

import type {CollinearTuple, Coord, Range} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    range: [
        [-10, 10],
        [-10, 10],
    ] satisfies [Range, Range],
    step: [1, 1] satisfies [number, number],
};
describe("StartCoordSettings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("clicking the heading toggles the settings", async () => {
        // Arrange

        // Act
        render(
            <StartCoordsSettings
                {...defaultProps}
                type="linear"
                onChange={() => {}}
            />,
        );

        const heading = screen.getByText("Start coordinates");

        // Assert
        expect(
            screen.getByRole("button", {name: "Use default start coordinates"}),
        ).toBeInTheDocument();

        await userEvent.click(heading);

        expect(
            screen.queryByRole("button", {
                name: "Use default start coordinates",
            }),
        ).not.toBeInTheDocument();

        await userEvent.click(heading);

        expect(
            screen.getByRole("button", {name: "Use default start coordinates"}),
        ).toBeInTheDocument();
    });

    test("clicking the reset button resets the start coordinates", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <StartCoordsSettings
                {...defaultProps}
                type="linear"
                onChange={onChangeMock}
            />,
        );

        // Act
        const resetButton = screen.getByRole("button", {
            name: "Use default start coordinates",
        });
        await userEvent.click(resetButton);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith([
            [-5, 5],
            [5, 5],
        ]);
    });

    describe.each`
        type
        ${"linear"}
        ${"ray"}
    `("graphs with CollinearTuple startCoords ($type graph)", ({type}) => {
        test(`shows the start coordinates UI for ${type}`, () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type={type}
                    onChange={() => {}}
                />,
            );

            const resetButton = screen.getByRole("button", {
                name: "Use default start coordinates",
            });

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Point 1:")).toBeInTheDocument();
            expect(screen.getByText("Point 2:")).toBeInTheDocument();
            expect(resetButton).toBeInTheDocument();
        });

        test.each`
            lineIndex | coord
            ${0}      | ${"x"}
            ${0}      | ${"y"}
            ${1}      | ${"x"}
            ${1}      | ${"y"}
        `(
            `calls onChange when $coord coord is changed (line $lineIndex) for ${type} graph`,
            async ({lineIndex, coord}) => {
                // Arrange
                const onChangeMock = jest.fn();

                // Act
                render(
                    <StartCoordsSettings
                        {...defaultProps}
                        type={type}
                        onChange={onChangeMock}
                    />,
                );

                // Assert
                const input = screen.getAllByRole("spinbutton", {
                    name: `${coord}`,
                })[lineIndex];
                await userEvent.clear(input);
                await userEvent.type(input, "101");

                const expectedCoords = [
                    [-5, 5],
                    [5, 5],
                ];
                expectedCoords[lineIndex][coord === "x" ? 0 : 1] = 101;

                expect(onChangeMock).toHaveBeenLastCalledWith(expectedCoords);
            },
        );
    });

    // startCoords with type CollinearTuple[]
    describe("segment graph", () => {
        test("shows the start coordinates UI for a singular segment", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="segment"
                    numSegments={1}
                    onChange={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Segment 1")).toBeInTheDocument();
            expect(screen.getByText("Point 1:")).toBeInTheDocument();
            expect(screen.getByText("Point 2:")).toBeInTheDocument();
        });

        test("shows the start coordinates UI for 2 segments", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="segment"
                    numSegments={2}
                    onChange={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Segment 1")).toBeInTheDocument();
            expect(screen.getByText("Segment 2")).toBeInTheDocument();
            expect(screen.getAllByText("Point 1:")).toHaveLength(2);
            expect(screen.getAllByText("Point 2:")).toHaveLength(2);
        });

        test.each`
            segmentIndex | pointIndex | coordIndex | coord
            ${0}         | ${0}       | ${0}       | ${"x"}
            ${0}         | ${0}       | ${1}       | ${"y"}
            ${0}         | ${1}       | ${0}       | ${"x"}
            ${0}         | ${1}       | ${1}       | ${"y"}
            ${1}         | ${0}       | ${0}       | ${"x"}
            ${1}         | ${0}       | ${1}       | ${"y"}
            ${1}         | ${1}       | ${0}       | ${"x"}
            ${1}         | ${1}       | ${1}       | ${"y"}
        `(
            `calls onChange when $coord coord is changed (segment $segmentIndex)`,
            async ({segmentIndex, pointIndex, coordIndex, coord}) => {
                // Arrange
                const onChangeMock = jest.fn();

                const coords = [
                    [
                        [1, 1],
                        [2, 2],
                    ],
                    [
                        [3, 3],
                        [4, 4],
                    ],
                ] satisfies CollinearTuple[];

                // Act
                render(
                    <StartCoordsSettings
                        {...defaultProps}
                        type="segment"
                        numSegments={2}
                        startCoords={coords}
                        onChange={onChangeMock}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Assert
                const input = screen.getAllByRole("spinbutton", {
                    name: coord,
                })[segmentIndex * 2 + pointIndex];
                await userEvent.clear(input);
                await userEvent.type(input, "101");

                const expectedCoords = clone(coords);
                expectedCoords[segmentIndex][pointIndex][coordIndex] = 101;

                expect(onChangeMock).toHaveBeenLastCalledWith(expectedCoords);
            },
        );
    });

    // startCoords with type CollinearTuple[]
    describe("linear-system graph", () => {
        test("shows the start coordinates UI", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="linear-system"
                    onChange={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Line 1")).toBeInTheDocument();
            expect(screen.getByText("Line 2")).toBeInTheDocument();
            expect(screen.getAllByText("Point 1:")).toHaveLength(2);
            expect(screen.getAllByText("Point 2:")).toHaveLength(2);
        });

        test.each`
            lineIndex | pointIndex | coordIndex | coord
            ${0}      | ${0}       | ${0}       | ${"x"}
            ${0}      | ${0}       | ${1}       | ${"y"}
            ${0}      | ${1}       | ${0}       | ${"x"}
            ${0}      | ${1}       | ${1}       | ${"y"}
            ${1}      | ${0}       | ${0}       | ${"x"}
            ${1}      | ${0}       | ${1}       | ${"y"}
            ${1}      | ${1}       | ${0}       | ${"x"}
            ${1}      | ${1}       | ${1}       | ${"y"}
        `(
            `calls onChange when $coord coord is changed (line $lineIndex)`,
            async ({lineIndex, pointIndex, coordIndex, coord}) => {
                // Arrange
                const onChangeMock = jest.fn();

                const coords = [
                    [
                        [1, 1],
                        [2, 2],
                    ],
                    [
                        [3, 3],
                        [4, 4],
                    ],
                ] satisfies CollinearTuple[];

                // Act
                render(
                    <StartCoordsSettings
                        {...defaultProps}
                        type="linear-system"
                        startCoords={coords}
                        onChange={onChangeMock}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Assert
                const input = screen.getAllByRole("spinbutton", {
                    name: coord,
                })[lineIndex * 2 + pointIndex];
                await userEvent.clear(input);
                await userEvent.type(input, "101");

                const expectedCoords = clone(coords);
                expectedCoords[lineIndex][pointIndex][coordIndex] = 101;

                expect(onChangeMock).toHaveBeenLastCalledWith(expectedCoords);
            },
        );
    });

    describe("circle graph", () => {
        test("shows the start coordinates UI", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="circle"
                    onChange={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Center:")).toBeInTheDocument();
            expect(screen.getByText("x")).toBeInTheDocument();
            expect(screen.getByText("y")).toBeInTheDocument();
        });

        test.each`
            coordIndex | coord
            ${0}       | ${"x"}
            ${1}       | ${"y"}
        `(
            `calls onChange when $coord coord is changed`,
            async ({coordIndex, coord}) => {
                // Arrange
                const onChangeMock = jest.fn();

                const start = {center: [2, 2], radius: 5} satisfies {
                    center: Coord;
                    radius: number;
                };

                // Act
                render(
                    <StartCoordsSettings
                        {...defaultProps}
                        type="circle"
                        startCoords={start}
                        onChange={onChangeMock}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Assert
                const input = screen.getByRole("spinbutton", {
                    name: coord,
                });
                await userEvent.clear(input);
                await userEvent.type(input, "101");

                const expectedCoords = clone(start);
                expectedCoords.center[coordIndex] = 101;

                expect(onChangeMock).toHaveBeenLastCalledWith(expectedCoords);
            },
        );

        test("does not call onChange when the radius is not a number", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="circle"
                    onChange={onChangeMock}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const input = screen.getByRole("spinbutton", {
                name: "Radius:",
            });
            await userEvent.type(input, "-");

            // Assert
            expect(onChangeMock).not.toHaveBeenCalled();
        });

        test("does not call onChange when the radius is empty", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="circle"
                    onChange={onChangeMock}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const input = screen.getByRole("spinbutton", {
                name: "Radius:",
            });
            await userEvent.clear(input);

            // Assert
            expect(onChangeMock).not.toHaveBeenCalled();
        });

        test("allows the user to type a decimal radius", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="circle"
                    onChange={onChangeMock}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            const input = screen.getByRole("spinbutton", {
                name: "Radius:",
            });
            await userEvent.clear(input);
            await userEvent.type(input, "0.5");

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith({
                center: [0, 0],
                radius: 0.5,
            });
        });
    });

    describe("sinusoid graph", () => {
        test("shows the start coordinates UI", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="sinusoid"
                    onChange={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Starting equation:")).toBeInTheDocument();
            expect(
                // Equation for default start coords
                screen.getByText("y = 2.000sin(0.524x - 0.000) + 0.000"),
            ).toBeInTheDocument();
            expect(screen.getByText("Point 1:")).toBeInTheDocument();
            expect(screen.getByText("Point 2:")).toBeInTheDocument();
        });

        test.each`
            pointIndex | coord
            ${0}       | ${"x"}
            ${0}       | ${"y"}
            ${1}       | ${"x"}
            ${1}       | ${"y"}
        `(
            "calls onChange when $coord coord is changed (line $pointIndex)",
            async ({pointIndex, coord}) => {
                // Arrange
                const onChangeMock = jest.fn();

                // Act
                render(
                    <StartCoordsSettings
                        {...defaultProps}
                        type="sinusoid"
                        onChange={onChangeMock}
                    />,
                );

                // Assert
                const input = screen.getAllByRole("spinbutton", {
                    name: `${coord}`,
                })[pointIndex];
                await userEvent.clear(input);
                await userEvent.type(input, "101");

                const expectedCoords = [
                    [0, 0],
                    [3, 2],
                ];
                expectedCoords[pointIndex][coord === "x" ? 0 : 1] = 101;

                expect(onChangeMock).toHaveBeenLastCalledWith(expectedCoords);
            },
        );
    });

    describe("quadratic graph", () => {
        test("shows the start coordinates UI", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="quadratic"
                    onChange={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Starting equation:")).toBeInTheDocument();
            expect(
                // Equation for default start coords
                screen.getByText("y = 0.400x^2 + 0.000x + -5.000"),
            ).toBeInTheDocument();
            expect(screen.getByText("Point 1:")).toBeInTheDocument();
            expect(screen.getByText("Point 2:")).toBeInTheDocument();
            expect(screen.getByText("Point 3:")).toBeInTheDocument();
        });

        test.each`
            pointIndex | coord
            ${0}       | ${"x"}
            ${0}       | ${"y"}
            ${1}       | ${"x"}
            ${1}       | ${"y"}
            ${2}       | ${"x"}
            ${2}       | ${"y"}
        `(
            "calls onChange when $coord coord is changed (line $pointIndex)",
            async ({pointIndex, coord}) => {
                // Arrange
                const onChangeMock = jest.fn();

                // Act
                render(
                    <StartCoordsSettings
                        {...defaultProps}
                        type="quadratic"
                        onChange={onChangeMock}
                    />,
                );

                // Assert
                const input = screen.getAllByRole("spinbutton", {
                    name: `${coord}`,
                })[pointIndex];
                await userEvent.clear(input);
                await userEvent.type(input, "101");

                const expectedCoords = [
                    [-5, 5],
                    [0, -5],
                    [5, 5],
                ];
                expectedCoords[pointIndex][coord === "x" ? 0 : 1] = 101;

                expect(onChangeMock).toHaveBeenLastCalledWith(expectedCoords);
            },
        );
    });

    describe("point graph", () => {
        test("shows the start coordinates UI: 1 point (default)", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="point"
                    onChange={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Point 1:")).toBeInTheDocument();
        });

        test("shows the start coordinates UI: 6 points", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="point"
                    numPoints={6}
                    onChange={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Point 1:")).toBeInTheDocument();
            expect(screen.getByText("Point 2:")).toBeInTheDocument();
            expect(screen.getByText("Point 3:")).toBeInTheDocument();
            expect(screen.getByText("Point 4:")).toBeInTheDocument();
            expect(screen.getByText("Point 5:")).toBeInTheDocument();
            expect(screen.getByText("Point 6:")).toBeInTheDocument();
        });

        test.each`
            pointIndex | coord
            ${0}       | ${"x"}
            ${0}       | ${"y"}
            ${1}       | ${"x"}
            ${1}       | ${"y"}
        `(
            "calls onChange when $coord coord is changed (line $pointIndex)",
            async ({pointIndex, coord}) => {
                // Arrange
                const onChangeMock = jest.fn();

                // Act
                render(
                    <StartCoordsSettings
                        {...defaultProps}
                        type="point"
                        numPoints={2}
                        onChange={onChangeMock}
                    />,
                );

                // Assert
                const input = screen.getAllByRole("spinbutton", {
                    name: `${coord}`,
                })[pointIndex];
                await userEvent.clear(input);
                await userEvent.type(input, "101");

                const expectedCoords = [
                    [-5, 0],
                    [5, 0],
                ];
                expectedCoords[pointIndex][coord === "x" ? 0 : 1] = 101;

                expect(onChangeMock).toHaveBeenLastCalledWith(expectedCoords);
            },
        );
    });

    describe("polygon graph", () => {
        test("shows the start coordinates UI: 3 sides (default)", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="polygon"
                    onChange={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Point 1:")).toBeInTheDocument();
            expect(screen.getByText("Point 2:")).toBeInTheDocument();
            expect(screen.getByText("Point 3:")).toBeInTheDocument();
        });

        test("shows the start coordinates UI: 6 sides", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="polygon"
                    numSides={6}
                    onChange={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Point 1:")).toBeInTheDocument();
            expect(screen.getByText("Point 2:")).toBeInTheDocument();
            expect(screen.getByText("Point 3:")).toBeInTheDocument();
            expect(screen.getByText("Point 4:")).toBeInTheDocument();
            expect(screen.getByText("Point 5:")).toBeInTheDocument();
            expect(screen.getByText("Point 6:")).toBeInTheDocument();
        });

        test.each`
            pointIndex | coord
            ${0}       | ${"x"}
            ${0}       | ${"y"}
            ${1}       | ${"x"}
            ${1}       | ${"y"}
            ${2}       | ${"x"}
            ${2}       | ${"y"}
        `(
            "calls onChange when $coord coord is changed (line $pointIndex)",
            async ({pointIndex, coord}) => {
                // Arrange
                const onChangeMock = jest.fn();
                render(
                    <StartCoordsSettings
                        {...defaultProps}
                        type="polygon"
                        onChange={onChangeMock}
                    />,
                );

                // Act
                const input = screen.getAllByRole("spinbutton", {
                    name: `${coord}`,
                })[pointIndex];
                await userEvent.clear(input);
                await userEvent.type(input, "101");

                // Assert
                const expectedCoords = [
                    [3, -2],
                    [0, 4],
                    [-3, -2],
                ];
                expectedCoords[pointIndex][coord === "x" ? 0 : 1] = 101;

                expect(onChangeMock).toHaveBeenLastCalledWith(expectedCoords);
            },
        );
    });

    describe("angle graph", () => {
        test("shows the start coordinates UI (default)", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="angle"
                    onChange={() => {}}
                />,
                {wrapper: RenderStateRoot},
            );

            const xInputs = screen.getAllByRole("spinbutton", {name: "x"});
            const yInputs = screen.getAllByRole("spinbutton", {name: "y"});

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            // Default angle on initialization
            expect(screen.getByText("20° angle at (0, 0)")).toBeInTheDocument();
            expect(screen.getByText("Vertex:")).toBeInTheDocument();
            expect(screen.getByText("Point 1:")).toBeInTheDocument();
            expect(screen.getByText("Point 2:")).toBeInTheDocument();
            expect(xInputs).toHaveLength(3);
            expect(yInputs).toHaveLength(3);
            expect(xInputs[0]).toHaveValue(7);
            expect(yInputs[0]).toHaveValue(0);
            expect(xInputs[1]).toHaveValue(0);
            expect(yInputs[1]).toHaveValue(0);
            expect(xInputs[2]).toHaveValue(6.5778483455013586);
            expect(yInputs[2]).toHaveValue(2.394141003279681);
        });

        test("shows the start coords UI (specified coords)", () => {
            // Arrange

            // Act
            render(
                <StartCoordsSettings
                    {...defaultProps}
                    type="angle"
                    onChange={() => {}}
                    startCoords={[
                        [7, 1],
                        [1, 1],
                        [1, 7],
                    ]}
                />,
                {wrapper: RenderStateRoot},
            );

            const xInputs = screen.getAllByRole("spinbutton", {name: "x"});
            const yInputs = screen.getAllByRole("spinbutton", {name: "y"});

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            // Default angle on initialization
            expect(screen.getByText("90° angle at (1, 1)")).toBeInTheDocument();
            expect(screen.getByText("Vertex:")).toBeInTheDocument();
            expect(screen.getByText("Point 1:")).toBeInTheDocument();
            expect(screen.getByText("Point 2:")).toBeInTheDocument();
            expect(xInputs).toHaveLength(3);
            expect(yInputs).toHaveLength(3);
            expect(xInputs[0]).toHaveValue(7);
            expect(yInputs[0]).toHaveValue(1);
            expect(xInputs[1]).toHaveValue(1);
            expect(yInputs[1]).toHaveValue(1);
            expect(xInputs[2]).toHaveValue(1);
            expect(yInputs[2]).toHaveValue(7);
        });

        test.each`
            pointIndex | coord
            ${0}       | ${"x"}
            ${0}       | ${"y"}
            ${1}       | ${"x"}
            ${1}       | ${"y"}
            ${2}       | ${"x"}
            ${2}       | ${"y"}
        `(
            "calls onChange when $coord coord is changed (line $pointIndex)",
            async ({pointIndex, coord}) => {
                // Arrange
                const onChangeMock = jest.fn();

                // Act
                render(
                    <StartCoordsSettings
                        {...defaultProps}
                        type="angle"
                        onChange={onChangeMock}
                    />,
                );

                // Assert
                const input = screen.getAllByRole("spinbutton", {
                    name: `${coord}`,
                })[pointIndex];
                await userEvent.clear(input);
                await userEvent.type(input, "101");

                const expectedCoords = [
                    [7, 0],
                    [0, 0],
                    [6.5778483455013586, 2.394141003279681],
                ];
                expectedCoords[pointIndex][coord === "x" ? 0 : 1] = 101;

                expect(onChangeMock).toHaveBeenLastCalledWith(expectedCoords);
            },
        );
    });
});
