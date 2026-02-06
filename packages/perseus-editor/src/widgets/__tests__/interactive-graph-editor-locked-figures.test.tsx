import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import InteractiveGraphEditor from "../interactive-graph-editor/interactive-graph-editor";

import type {PerseusGraphType} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const defaultPoint = getDefaultFigureForType("point");
const defaultLine = getDefaultFigureForType("line");
const defaultPolygon = getDefaultFigureForType("polygon");

const baseProps = {
    apiOptions: ApiOptions.defaults,
    box: [288, 288] as [number, number],
    gridStep: [1, 1] as [number, number],
    snapStep: [1, 1] as [number, number],
    onChange: () => {},
    graph: undefined,
    lockedFigures: [],
};

const segmentProps = {
    ...baseProps,
    graph: {type: "segment"} as PerseusGraphType,
};

// Breaking this out into its own function, because the RenderStateRoot
// wrapper was making it take up a lot of space.
const renderEditor = (props) => {
    render(<InteractiveGraphEditor {...segmentProps} {...props} />, {
        wrapper: RenderStateRoot,
    });
};

describe("InteractiveGraphEditor locked figures", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    const assertAndCloseStartCoordsSection = async () => {
        // Confirm the "Start coordinates" section is open.
        const resetCoordsButton = screen.getByRole("button", {
            name: "Use default start coordinates",
        });
        expect(resetCoordsButton).toBeInTheDocument();

        // Close the "Start coordinates" section first to remove
        // other inputs from the DOM.
        const startCoordinatesHeading = screen.getByRole("button", {
            name: "Start coordinates",
        });

        await userEvent.click(startCoordinatesHeading);
    };

    // Basic functionality
    describe.each`
        figureType    | figureName
        ${"point"}    | ${"Point"}
        ${"line"}     | ${"Line"}
        ${"vector"}   | ${"Vector"}
        ${"ellipse"}  | ${"Ellipse"}
        ${"polygon"}  | ${"Polygon"}
        ${"function"} | ${"Function"}
    `(`$figureType basics`, ({figureType, figureName}) => {
        test("Calls onChange when a locked $figureType is added", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({onChange: onChangeMock});

            // Act
            const addLockedFigureButton = screen.getByRole("button", {
                name: "Add locked figure",
            });
            await userEvent.click(addLockedFigureButton);
            const addFigureButton = await screen.findByText(figureType);
            await userEvent.click(addFigureButton);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith({
                lockedFigures: [getDefaultFigureForType(figureType)],
            });
        });

        test("Calls onChange when a locked $figureType is removed", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            const confirmSpy = jest.spyOn(window, "confirm").mockImplementation(
                // Confirm button clicked
                () => true,
            );

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [getDefaultFigureForType(figureType)],
            });

            // Act
            const deleteButton = screen.getByRole("button", {
                name: `Delete locked ${figureType}`,
            });
            await userEvent.click(deleteButton);

            // Assert
            expect(confirmSpy).toHaveBeenCalled();
            expect(onChangeMock).toHaveBeenCalledWith(
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

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [getDefaultFigureForType(figureType)],
            });

            // Act
            const deleteButton = screen.getByRole("button", {
                name: `Delete locked ${figureType}`,
            });
            await userEvent.click(deleteButton);

            // Assert
            expect(confirmSpy).toHaveBeenCalled();
            expect(onChangeMock).not.toHaveBeenCalled();
        });

        describe("movement", () => {
            const first = {
                ...getDefaultFigureForType(figureType),
                color: "blue",
            };
            const second = {
                ...getDefaultFigureForType(figureType),
                color: "green",
            };
            const third = {
                ...getDefaultFigureForType(figureType),
                color: "red",
            };

            test(`Calls onChange when a locked ${figureType} is moved back`, async () => {
                // Arrange
                const onChangeMock = jest.fn();

                renderEditor({
                    onChange: onChangeMock,
                    lockedFigures: [first, second, third],
                });

                // Act
                const moveButton = screen.getAllByRole("button", {
                    name: `Move locked ${figureType} to the back`,
                });
                await userEvent.click(moveButton[2]);

                // Assert
                expect(onChangeMock).toHaveBeenCalledWith(
                    expect.objectContaining({
                        lockedFigures: [third, first, second],
                    }),
                );
            });

            test(`Calls onChange when a locked ${figureType} is moved backward`, async () => {
                // Arrange
                const onChangeMock = jest.fn();

                renderEditor({
                    onChange: onChangeMock,
                    lockedFigures: [first, second, third],
                });

                // Act
                const moveButton = screen.getAllByRole("button", {
                    name: `Move locked ${figureType} backward`,
                });
                await userEvent.click(moveButton[2]);

                // Assert
                expect(onChangeMock).toHaveBeenCalledWith(
                    expect.objectContaining({
                        lockedFigures: [first, third, second],
                    }),
                );
            });

            test(`Calls onChange when a locked ${figureType} is moved forward`, async () => {
                // Arrange
                const onChangeMock = jest.fn();

                renderEditor({
                    onChange: onChangeMock,
                    lockedFigures: [first, second, third],
                });

                // Act
                const moveButton = screen.getAllByRole("button", {
                    name: `Move locked ${figureType} forward`,
                });
                await userEvent.click(moveButton[0]);

                // Assert
                expect(onChangeMock).toHaveBeenCalledWith(
                    expect.objectContaining({
                        lockedFigures: [second, first, third],
                    }),
                );
            });

            test(`Calls onChange when a locked ${figureType} is moved front`, async () => {
                // Arrange
                const onChangeMock = jest.fn();

                renderEditor({
                    onChange: onChangeMock,
                    lockedFigures: [first, second, third],
                });

                // Act
                const moveButton = screen.getAllByRole("button", {
                    name: `Move locked ${figureType} to the front`,
                });
                await userEvent.click(moveButton[0]);

                // Assert
                expect(onChangeMock).toHaveBeenCalledWith(
                    expect.objectContaining({
                        lockedFigures: [second, third, first],
                    }),
                );
            });

            test(`Does not call onChange when a locked ${figureType} is moved to the back and is already in the back`, async () => {
                // Arrange
                const onChangeMock = jest.fn();

                renderEditor({
                    onChange: onChangeMock,
                    lockedFigures: [first, second, third],
                });

                // Act
                const moveButton = screen.getAllByRole("button", {
                    name: `Move locked ${figureType} to the back`,
                });
                await userEvent.click(moveButton[0]);

                // Assert
                expect(onChangeMock).not.toHaveBeenCalled();
            });

            test(`Does not call onChange when a locked ${figureType} is moved backward and is already in the back`, async () => {
                // Arrange
                const onChangeMock = jest.fn();

                renderEditor({
                    onChange: onChangeMock,
                    lockedFigures: [first, second, third],
                });

                // Act
                const moveButton = screen.getAllByRole("button", {
                    name: `Move locked ${figureType} backward`,
                });
                await userEvent.click(moveButton[0]);

                // Assert
                expect(onChangeMock).not.toHaveBeenCalled();
            });

            test(`Does not call onChange when a locked ${figureType} is moved forward and is already in the front`, async () => {
                // Arrange
                const onChangeMock = jest.fn();

                renderEditor({
                    onChange: onChangeMock,
                    lockedFigures: [first, second, third],
                });

                // Act
                const moveButton = screen.getAllByRole("button", {
                    name: `Move locked ${figureType} forward`,
                });
                await userEvent.click(moveButton[2]);

                // Assert
                expect(onChangeMock).not.toHaveBeenCalled();
            });

            test(`Does not call onChange when a locked ${figureType} is moved to the front and is already in the front`, async () => {
                // Arrange
                const onChangeMock = jest.fn();

                renderEditor({
                    onChange: onChangeMock,
                    lockedFigures: [first, second, third],
                });

                // Act
                const moveButton = screen.getAllByRole("button", {
                    name: `Move locked ${figureType} to the front`,
                });
                await userEvent.click(moveButton[2]);

                // Assert
                expect(onChangeMock).not.toHaveBeenCalled();
            });
        });

        test("Shows settings accordion when a locked $figureType is passed in", async () => {
            // Arrange
            renderEditor({
                lockedFigures: [getDefaultFigureForType(figureType)],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            // There may be accordions within the settings, such as the
            // defining point accordions within the line settings.
            const accordionHeading = screen.getAllByRole("heading", {
                level: 2,
            })[0];

            // Assert
            expect(accordionHeading).toBeInTheDocument();
            expect(accordionHeading).toHaveTextContent(figureName);
        });

        test("Calls onChange when a locked $figureType's color is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [getDefaultFigureForType(figureType)],
            });

            // Act
            const colorInput = await screen.findByLabelText("color");
            await userEvent.click(colorInput);
            const colorSelection = screen.getByText("purple");
            await userEvent.click(colorSelection);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: figureType,
                            color: "purple",
                        }),
                    ],
                }),
            );
        });
    });

    describe("points", () => {
        test("Calls onChange when a locked point's x coordinate is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultPoint],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const xCoordInput = screen.getByLabelText("x coord");
            await userEvent.clear(xCoordInput);
            await userEvent.type(xCoordInput, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
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

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultPoint],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const xCoordInput = screen.getByLabelText("y coord");
            await userEvent.clear(xCoordInput);
            await userEvent.type(xCoordInput, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            coord: [0, 1],
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked point's `filled` is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultPoint],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const fillInput = screen.getByRole("switch", {
                name: "open point",
            });
            await userEvent.click(fillInput);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
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

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultPoint],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const xCoordInput = screen.getByLabelText("x coord");
            await userEvent.clear(xCoordInput);
            await userEvent.tab();

            // Assert
            expect(onChangeMock).not.toHaveBeenCalled();
        });

        test("Does not call onChange when y coord is cleared", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultPoint],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const yCoordInput = screen.getByLabelText("y coord");
            await userEvent.clear(yCoordInput);
            await userEvent.tab();

            // Assert
            expect(onChangeMock).not.toHaveBeenCalled();
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

                renderEditor({
                    onChange: onChangeMock,
                    lockedFigures: [defaultPoint],
                });

                await assertAndCloseStartCoordsSection();

                // Act
                const coordInput = screen.getByLabelText(`${coord} coord`);
                await userEvent.clear(coordInput);
                await userEvent.type(coordInput, value);
                await userEvent.tab();

                // Assert
                expect(onChangeMock).not.toHaveBeenCalled();
            },
        );
    });

    describe("lines", () => {
        test("Calls onChange when a locked line's style is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultLine],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const styleInput = await screen.findByLabelText("stroke");
            await userEvent.click(styleInput);
            const styleSelection = screen.getByText("dashed");
            await userEvent.click(styleSelection);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
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

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultLine],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const point1Input = screen.getAllByLabelText("x coord")[0];
            await userEvent.click(point1Input);
            await userEvent.clear(point1Input);
            await userEvent.type(point1Input, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
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

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultLine],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const point2Input = screen.getAllByLabelText("y coord")[0];
            await userEvent.click(point2Input);
            await userEvent.clear(point2Input);
            await userEvent.type(point2Input, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
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

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultLine],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const point1Input = screen.getAllByLabelText("x coord")[1];
            await userEvent.click(point1Input);
            await userEvent.clear(point1Input);
            await userEvent.type(point1Input, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
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

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultLine],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const point1Input = screen.getAllByLabelText("y coord")[1];
            await userEvent.click(point1Input);
            await userEvent.clear(point1Input);
            await userEvent.type(point1Input, "1");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
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

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultLine],
            });

            // Act
            const kindInput = await screen.findByLabelText("kind");
            await userEvent.click(kindInput);
            const kindSelection = screen.getByText("segment");
            await userEvent.click(kindSelection);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
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

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultLine],
            });

            // Act
            const toggle = screen.getAllByLabelText("show point on graph")[0];
            await userEvent.click(toggle);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
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

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultLine],
            });

            // Act
            const toggle = screen.getAllByLabelText("show point on graph")[1];
            await userEvent.click(toggle);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
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

    describe("ellipses", () => {
        test("Calls onChange when a locked ellipse's center x is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [getDefaultFigureForType("ellipse")],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const xCoordInput = screen.getByLabelText("x coord");
            await userEvent.clear(xCoordInput);
            await userEvent.type(xCoordInput, "5");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "ellipse",
                            center: [5, 0],
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked ellipse's center y is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [getDefaultFigureForType("ellipse")],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const yCoordInput = screen.getByLabelText("y coord");
            await userEvent.clear(yCoordInput);
            await userEvent.type(yCoordInput, "5");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "ellipse",
                            center: [0, 5],
                        }),
                    ],
                }),
            );
        });

        // Test both x and y radius changes
        test.each`
            coord
            ${"x"}
            ${"y"}
        `(
            "Calls onChange when a locked ellipse's $coord radius is changed",
            async ({coord}) => {
                // Arrange
                const onChangeMock = jest.fn();

                renderEditor({
                    onChange: onChangeMock,
                    lockedFigures: [getDefaultFigureForType("ellipse")],
                });

                // Act
                const radiusInput = screen.getByLabelText(`${coord} radius`);
                await userEvent.clear(radiusInput);
                await userEvent.type(radiusInput, "5");
                await userEvent.tab();

                // Assert
                expect(onChangeMock).toHaveBeenCalledWith(
                    expect.objectContaining({
                        lockedFigures: [
                            expect.objectContaining({
                                type: "ellipse",
                                radius: coord === "x" ? [5, 1] : [1, 5],
                            }),
                        ],
                    }),
                );
            },
        );

        test("Calls onChange when a locked ellipse's angle is changed (radians)", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [getDefaultFigureForType("ellipse")],
            });

            // Act
            const angleInput = screen.getByRole("spinbutton", {
                name: "angle (degrees)",
            });
            await userEvent.clear(angleInput);
            await userEvent.type(angleInput, "30");
            await userEvent.tab();

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "ellipse",
                            angle: Math.PI / 6,
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when locked ellipse's stroke style is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [getDefaultFigureForType("ellipse")],
            });

            // Act
            const strokeInput = await screen.findByLabelText("stroke");
            await userEvent.click(strokeInput);
            const strokeSelection = screen.getByText("dashed");
            await userEvent.click(strokeSelection);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "ellipse",
                            strokeStyle: "dashed",
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a locked ellipse's fill style is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [getDefaultFigureForType("ellipse")],
            });

            // Act
            const fillInput = await screen.findByLabelText("fill");
            await userEvent.click(fillInput);
            const fillSelection = screen.getByText("translucent");
            await userEvent.click(fillSelection);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "ellipse",
                            fillStyle: "translucent",
                        }),
                    ],
                }),
            );
        });
    });

    describe("polygons", () => {
        test("Calls onChange when fill is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultPolygon],
            });

            // Act
            const fillInput = await screen.findByLabelText("fill");
            await userEvent.click(fillInput);
            const fillSelection = screen.getByText("translucent");
            await userEvent.click(fillSelection);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "polygon",
                            fillStyle: "translucent",
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when stroke is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultPolygon],
            });

            // Act
            const strokeInput = await screen.findByLabelText("stroke");
            await userEvent.click(strokeInput);
            const strokeSelection = screen.getByText("dashed");
            await userEvent.click(strokeSelection);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "polygon",
                            strokeStyle: "dashed",
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when show vertices is toggled", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultPolygon],
            });

            // Act
            const toggle = screen.getByLabelText("show vertices");
            await userEvent.click(toggle);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "polygon",
                            showVertices: true,
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a point is added", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultPolygon],
            });

            // Act
            const addPointButton = screen.getByRole("button", {
                name: "Add point",
            });
            await userEvent.click(addPointButton);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "polygon",
                            points: [...defaultPolygon.points, [0, 0]],
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a point is removed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            const squarePolygonPoints = [
                [-9, 4],
                [-6, 4],
                [-6, 1],
                [-9, 1],
            ];

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [
                    {
                        ...defaultPolygon,
                        points: squarePolygonPoints,
                    },
                ],
            });

            // Act
            const deleteButton = screen.getByLabelText(
                "Delete polygon point A",
            );
            await userEvent.click(deleteButton);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "polygon",
                            points: squarePolygonPoints.slice(1),
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a point's x coordinate is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultPolygon],
            });

            // Act
            await assertAndCloseStartCoordsSection();

            const xCoordInput = screen.getAllByLabelText("x")[0];
            await userEvent.clear(xCoordInput);
            await userEvent.type(xCoordInput, "7");

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "polygon",
                            points: [
                                [7, 2],
                                [-1, 0],
                                [1, 0],
                            ],
                        }),
                    ],
                }),
            );
        });

        test("Calls onChange when a point's y coordinate is changed", async () => {
            // Arrange
            const onChangeMock = jest.fn();

            renderEditor({
                onChange: onChangeMock,
                lockedFigures: [defaultPolygon],
            });

            await assertAndCloseStartCoordsSection();

            // Act
            const yCoordInput = screen.getAllByLabelText("y")[0];
            await userEvent.clear(yCoordInput);
            await userEvent.type(yCoordInput, "7");

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    lockedFigures: [
                        expect.objectContaining({
                            type: "polygon",
                            points: [
                                [0, 7],
                                [-1, 0],
                                [1, 0],
                            ],
                        }),
                    ],
                }),
            );
        });
    });

    describe("accordion states", () => {
        test("should show expand all button if figure is deleted and others are collapsed", async () => {
            // Arrange
            jest.spyOn(window, "confirm").mockImplementation(
                // Confirm button clicked
                () => true,
            );

            renderEditor({
                onChange: () => {},
                lockedFigures: [defaultPoint, defaultLine],
            });

            // Act
            // Open the accordion to delete the figure
            const lineHeader = screen.getByRole("button", {
                name: "Line (0, 0), (2, 2) grayH, solid",
            });
            await userEvent.click(lineHeader);

            // Delete the figure
            const deleteButton = screen.getByRole("button", {
                name: "Delete locked line",
            });
            await userEvent.click(deleteButton);

            // Assert
            expect(
                screen.getByRole("button", {name: "Expand all"}),
            ).toBeInTheDocument();
        });
    });
});
