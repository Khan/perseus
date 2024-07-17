import {Dependencies} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import StartCoordSettings from "../start-coord-settings";

import type {CollinearTuple, Range} from "@khanacademy/perseus";

const defaultProps = {
    range: [
        [-10, 10],
        [-10, 10],
    ] satisfies [Range, Range],
    step: [1, 1] satisfies [number, number],
};
describe("StartCoordSettings", () => {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("clicking the heading toggles the settings", async () => {
        // Arrange

        // Act
        render(
            <StartCoordSettings
                {...defaultProps}
                type="linear"
                onChange={() => {}}
            />,
        );

        const heading = screen.getByText("Start coordinates");

        // Assert
        expect(
            screen.getByRole("button", {name: "Use default start coords"}),
        ).toBeInTheDocument();

        await userEvent.click(heading);

        expect(
            screen.queryByRole("button", {name: "Use default start coords"}),
        ).not.toBeInTheDocument();

        await userEvent.click(heading);

        expect(
            screen.getByRole("button", {name: "Use default start coords"}),
        ).toBeInTheDocument();
    });

    describe.each`
        type
        ${"linear"}
        ${"ray"}
    `(`graphs with CollinearTuple startCoords`, ({type}) => {
        it(`shows the start coordinates UI for ${type}`, () => {
            // Arrange

            // Act
            render(
                <StartCoordSettings
                    {...defaultProps}
                    type={type}
                    onChange={() => {}}
                />,
            );

            const resetButton = screen.getByRole("button", {
                name: "Use default start coords",
            });

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Point 1")).toBeInTheDocument();
            expect(screen.getByText("Point 2")).toBeInTheDocument();
            expect(resetButton).toBeInTheDocument();
        });

        it.each`
            segmentIndex | coord
            ${0}         | ${"x"}
            ${0}         | ${"y"}
            ${1}         | ${"x"}
            ${1}         | ${"y"}
        `(
            `calls onChange when $coord coord is changed (segment $segmentIndex) for type ${type}`,
            async ({segmentIndex, coord}) => {
                // Arrange
                const onChangeMock = jest.fn();

                // Act
                render(
                    <StartCoordSettings
                        {...defaultProps}
                        type={type}
                        onChange={onChangeMock}
                    />,
                );

                // Assert
                const input = screen.getAllByRole("spinbutton", {
                    name: `${coord} coord`,
                })[segmentIndex];
                await userEvent.clear(input);
                await userEvent.type(input, "101");

                const expectedCoords = [
                    [-5, 5],
                    [5, 5],
                ];
                expectedCoords[segmentIndex][coord === "x" ? 0 : 1] = 101;

                expect(onChangeMock).toHaveBeenLastCalledWith(expectedCoords);
            },
        );

        it(`calls onChange when reset button is clicked for type ${type}`, async () => {
            // Arrange
            const onChangeMock = jest.fn();

            // Act
            render(
                <StartCoordSettings
                    {...defaultProps}
                    startCoords={[
                        [-15, 15],
                        [15, 15],
                    ]}
                    type={type}
                    onChange={onChangeMock}
                />,
            );

            // Assert
            const resetButton = screen.getByRole("button", {
                name: "Use default start coords",
            });
            await userEvent.click(resetButton);

            expect(onChangeMock).toHaveBeenLastCalledWith([
                [-5, 5],
                [5, 5],
            ]);
        });
    });

    // Outside the describe.each block to test the singular segment case,
    // separate from the linear-system and 2 segment cases
    it("shows the start coordinates UI for a singular segment", () => {
        // Arrange

        // Act
        render(
            <StartCoordSettings
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
        expect(screen.getByText("Point 1")).toBeInTheDocument();
        expect(screen.getByText("Point 2")).toBeInTheDocument();
    });

    describe.each`
        type
        ${"linear-system"}
        ${"segment"}
    `(`graphs with CollinearTuple[] startCoords`, ({type}) => {
        const multilineProps = {
            ...defaultProps,
            type,
            onChange: () => {},
        };
        const segmentProps = {
            ...multilineProps,
            numSegments: 2,
        };
        it("shows the start coordinates UI for 2 segments", () => {
            // Arrange

            // Act
            render(
                <StartCoordSettings
                    {...(type === "linear-system"
                        ? multilineProps
                        : segmentProps)}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByText("Start coordinates")).toBeInTheDocument();
            expect(screen.getByText("Segment 1")).toBeInTheDocument();
            expect(screen.getByText("Segment 2")).toBeInTheDocument();
            expect(screen.getAllByText("Point 1")).toHaveLength(2);
            expect(screen.getAllByText("Point 2")).toHaveLength(2);
        });

        it.each`
            segmentIndex | pointIndex | coordIndex
            ${0}         | ${0}       | ${0}
            ${0}         | ${0}       | ${1}
            ${0}         | ${1}       | ${0}
            ${0}         | ${1}       | ${1}
            ${1}         | ${0}       | ${0}
            ${1}         | ${0}       | ${1}
            ${1}         | ${1}       | ${0}
            ${1}         | ${1}       | ${1}
        `(
            `calls onChange when $coord coord is changed (segment $segmentIndex)`,
            async ({segmentIndex, pointIndex, coordIndex}) => {
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
                    <StartCoordSettings
                        {...(type === "linear-system"
                            ? multilineProps
                            : segmentProps)}
                        onChange={onChangeMock}
                        startCoords={coords}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Assert
                const input = screen.getAllByRole("spinbutton", {
                    name: /coord/,
                })[segmentIndex * 4 + pointIndex * 2 + coordIndex];
                await userEvent.clear(input);
                await userEvent.type(input, "101");

                const expectedCoords = coords;
                expectedCoords[segmentIndex][pointIndex][coordIndex] = 101;

                expect(onChangeMock).toHaveBeenLastCalledWith(expectedCoords);
            },
        );

        it(`calls onChange when reset button is clicked`, async () => {
            // Arrange
            const onChangeMock = jest.fn();

            // Act
            render(
                <StartCoordSettings
                    {...(type === "linear-system"
                        ? multilineProps
                        : segmentProps)}
                    startCoords={[
                        [
                            [-15, 15],
                            [15, 15],
                        ],
                        [
                            [-15, -15],
                            [15, -15],
                        ],
                    ]}
                    onChange={onChangeMock}
                />,
                {wrapper: RenderStateRoot},
            );

            // Assert
            const resetButton = screen.getByRole("button", {
                name: "Use default start coords",
            });
            await userEvent.click(resetButton);

            expect(onChangeMock).toHaveBeenLastCalledWith([
                [
                    [-5, 5],
                    [5, 5],
                ],
                [
                    [-5, -5],
                    [5, -5],
                ],
            ]);
        });
    });
});
