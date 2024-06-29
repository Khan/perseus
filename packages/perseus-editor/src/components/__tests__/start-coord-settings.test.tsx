import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import StartCoordSettings from "../start-coord-settings";

import type {Range} from "@khanacademy/perseus";

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

    test("clicking the heading toggles the settings", async () => {
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
        expect(screen.getByText("Point 1")).toBeInTheDocument();
        expect(screen.getByText("Point 2")).toBeInTheDocument();

        await userEvent.click(heading);

        expect(screen.queryByText("Point 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Point 2")).not.toBeInTheDocument();

        await userEvent.click(heading);

        expect(screen.getByText("Point 1")).toBeInTheDocument();
        expect(screen.getByText("Point 2")).toBeInTheDocument();
    });

    describe.each`
        type
        ${"linear"}
        ${"ray"}
    `(`graphs with CollinearTuple startCoords`, ({type}) => {
        test(`shows the start coordinates UI for ${type}`, () => {
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

        test.each`
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

        test(`calls onChange when reset button is clicked for type ${type}`, async () => {
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
});
