import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {flags} from "../../__stories__/flags-for-api-options";
import {getDefaultFigureForType} from "../../components/util";
import InteractiveGraphEditor from "../interactive-graph-editor";

import type {PerseusGraphType} from "@khanacademy/perseus";

const defaultPoint = getDefaultFigureForType("point");
const defaultLine = getDefaultFigureForType("line");

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
        flags,
    },
    graph: {type: "segment"} as PerseusGraphType,
};

describe("InteractiveGraphEditor locked figures", () => {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });
    describe("points", () => {
        test("Calls onChange when a locked point is added", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const addLockedFigureButton = screen.getByRole("button", {
                name: "Add locked figure",
            });
            await userEvent.click(addLockedFigureButton);
            const addPointButton = screen.getByText("Point");
            await userEvent.click(addPointButton);

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [defaultPoint],
                }),
            );
        });

        test("Calls onChange when a locked point is removed", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            const confirmSpy = jest.spyOn(window, "confirm").mockImplementation(
                // Confirm button clicked
                () => true,
            );

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultPoint]}
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
            expect(confirmSpy).toBeCalled();
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [],
                }),
            );
        });

        test("Does not call onChange when the delete is canceled", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            const confirmSpy = jest.spyOn(window, "confirm").mockImplementation(
                // Cancel button clicked
                () => false,
            );

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultPoint]}
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
            expect(confirmSpy).toBeCalled();
            expect(onChangeMock).not.toBeCalled();
        });

        test("Calls onChange when a locked point's x coordinate is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultPoint]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const xCoordInput = screen.getByLabelText("x coord");
            await userEvent.clear(xCoordInput);
            await userEvent.type(xCoordInput, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            coord: [1, 0],
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked point's y coordinate is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultPoint]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const xCoordInput = screen.getByLabelText("y coord");
            await userEvent.clear(xCoordInput);
            await userEvent.type(xCoordInput, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            coord: [0, 1],
                        }),
                    ],
                }),
            );
        });

        test("Shows the locked point settings when a locked point is passed in", async () => {
            // Arrange

            // Act
            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={() => {}}
                    lockedFigures={[defaultPoint]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Assert
            expect(screen.getByText("Point (0, 0)")).toBeInTheDocument();
            expect(screen.getByText("x coord")).toBeInTheDocument();
            expect(screen.getByText("y coord")).toBeInTheDocument();
            expect(
                screen.getByRole("button", {
                    name: "Delete locked point at 0, 0",
                }),
            ).toBeInTheDocument();
            expect(screen.getByText("color")).toBeInTheDocument();
        });

        test("Calls onChange when a locked point's color is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultPoint]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const colorInput = screen.getByRole("button", {
                name: "color",
            });
            await userEvent.click(colorInput);
            const colorSelection = screen.getByText("purple");
            await userEvent.click(colorSelection);

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            color: "purple",
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked point's `filled` is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultPoint]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const fillInput = screen.getByRole("switch", {
                name: "open point",
            });
            await userEvent.click(fillInput);

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            filled: false,
                        }),
                    ],
                }),
            );
        });

        test("Does not call onChange when x coord is cleared", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultPoint]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const xCoordInput = screen.getByLabelText("x coord");
            await userEvent.clear(xCoordInput);
            await userEvent.tab();

            // Assert
            expect(onChangeMock).not.toBeCalled();
        });

        test("Does not call onChange when y coord is cleared", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultPoint]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const yCoordInput = screen.getByLabelText("y coord");
            await userEvent.clear(yCoordInput);
            await userEvent.tab();

            // Assert
            expect(onChangeMock).not.toBeCalled();
        });

        test.each`
            coord  | value
            ${"x"} | ${"."}
            ${"x"} | ${"-"}
            ${"y"} | ${"."}
            ${"y"} | ${"-"}
        `(
            "Does not call onChange when $coord coord is set to $value",
            async ({coord, value}) => {
                // Arrange
                const onChangeMock = jest.fn();

                render(
                    <InteractiveGraphEditor
                        {...mafsProps}
                        onChange={onChangeMock}
                        lockedFigures={[defaultPoint]}
                    />,
                    {
                        wrapper: RenderStateRoot,
                    },
                );

                // Act
                const coordInput = screen.getByLabelText(`${coord} coord`);
                await userEvent.clear(coordInput);
                await userEvent.type(coordInput, value);
                await userEvent.tab();

                // Assert
                expect(onChangeMock).not.toBeCalled();
            },
        );
    });

    describe("lines", () => {
        test("Calls onChange when a locked line is added", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const addLockedFigureButton = screen.getByRole("button", {
                name: "Add locked figure",
            });
            await userEvent.click(addLockedFigureButton);
            const addLineButton = screen.getByText("Line");
            await userEvent.click(addLineButton);

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            ...defaultLine,
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked line is removed", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            const confirmSpy = jest.spyOn(window, "confirm").mockImplementation(
                // Confirm button clicked
                () => true,
            );

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const deleteButton = screen.getByRole("button", {
                name: "Delete locked line defined by 0, 0 and 2, 2.",
            });
            await userEvent.click(deleteButton);

            // Assert
            expect(confirmSpy).toBeCalled();
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [],
                }),
            );
        });

        test("Does not call onChange when the delete is canceled", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            const confirmSpy = jest.spyOn(window, "confirm").mockImplementation(
                // Cancel button clicked
                () => false,
            );

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const deleteButton = screen.getByRole("button", {
                name: "Delete locked line defined by 0, 0 and 2, 2.",
            });
            await userEvent.click(deleteButton);

            // Assert
            expect(confirmSpy).toBeCalled();
            expect(onChangeMock).not.toBeCalled();
        });

        test("Shows the locked line settings when a locked line is passed in", async () => {
            // Arrange

            // Act
            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={() => {}}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Assert
            expect(screen.getByText("Line (0, 0), (2, 2)")).toBeInTheDocument();
            expect(screen.getByText("kind")).toBeInTheDocument();
            expect(screen.getByText("color")).toBeInTheDocument();
            expect(screen.getByText("style")).toBeInTheDocument();
            expect(screen.getByText("Point 1 (0, 0)")).toBeInTheDocument();
            expect(screen.getByText("Point 2 (2, 2)")).toBeInTheDocument();
        });

        test("Calls onChange when a locked line's color is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const colorInput = screen.getByRole("button", {
                name: "color",
            });
            await userEvent.click(colorInput);
            const colorSelection = screen.getByText("purple");
            await userEvent.click(colorSelection);

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            ...defaultLine,
                            color: "purple",
                            points: [
                                expect.objectContaining({color: "purple"}),
                                expect.objectContaining({color: "purple"}),
                            ],
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked line's style is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const styleInput = screen.getByRole("button", {
                name: "style",
            });
            await userEvent.click(styleInput);
            const styleSelection = screen.getByText("dashed");
            await userEvent.click(styleSelection);

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            ...defaultLine,
                            lineStyle: "dashed",
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked line's point1 x is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const point1Input = screen.getAllByLabelText("x coord")[0];
            await userEvent.click(point1Input);
            await userEvent.clear(point1Input);
            await userEvent.type(point1Input, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            ...defaultLine,
                            points: [
                                expect.objectContaining({coord: [1, 0]}),
                                expect.objectContaining({coord: [2, 2]}),
                            ],
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked line's point1 y is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const point2Input = screen.getAllByLabelText("y coord")[0];
            await userEvent.click(point2Input);
            await userEvent.clear(point2Input);
            await userEvent.type(point2Input, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            ...defaultLine,
                            points: [
                                expect.objectContaining({coord: [0, 1]}),
                                expect.objectContaining({coord: [2, 2]}),
                            ],
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked line's point2 x is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const point1Input = screen.getAllByLabelText("x coord")[1];
            await userEvent.click(point1Input);
            await userEvent.clear(point1Input);
            await userEvent.type(point1Input, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            ...defaultLine,
                            points: [
                                expect.objectContaining({coord: [0, 0]}),
                                expect.objectContaining({coord: [1, 2]}),
                            ],
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked line's point2 y is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const point1Input = screen.getAllByLabelText("y coord")[1];
            await userEvent.click(point1Input);
            await userEvent.clear(point1Input);
            await userEvent.type(point1Input, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            ...defaultLine,
                            points: [
                                expect.objectContaining({coord: [0, 0]}),
                                expect.objectContaining({coord: [2, 1]}),
                            ],
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked line's kind is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const kindInput = screen.getByRole("button", {
                name: "kind",
            });
            await userEvent.click(kindInput);
            const kindSelection = screen.getByText("segment");
            await userEvent.click(kindSelection);

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            ...defaultLine,
                            kind: "segment",
                        }),
                    ],
                }),
            );
        });

        test("Call onChange when point1 is toggled", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const toggle = screen.getAllByLabelText("show point on graph")[0];
            await userEvent.click(toggle);

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            ...defaultLine,
                            showPoint1: true,
                        }),
                    ],
                }),
            );
        });

        test("Call onChange when point2 is toggled", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    onChange={onChangeMock}
                    lockedFigures={[defaultLine]}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const toggle = screen.getAllByLabelText("show point on graph")[1];
            await userEvent.click(toggle);

            // Assert
            expect(onChangeMock).toBeCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            ...defaultLine,
                            showPoint2: true,
                        }),
                    ],
                }),
            );
        });
    });
});
