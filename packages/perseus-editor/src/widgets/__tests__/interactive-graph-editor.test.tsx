import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {waitForInitialGraphieRender} from "../../../../../testing/wait";
import {flags} from "../../__stories__/flags-for-api-options";
import {getDefaultFigureForType} from "../../components/util";
import InteractiveGraphEditor from "../interactive-graph-editor";

import type {PerseusGraphType} from "@khanacademy/perseus";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {UserEvent} from "@testing-library/user-event";

const baseProps = {
    apiOptions: ApiOptions.defaults,
    box: [288, 288] as [number, number],
    gridStep: [1, 1] as [number, number],
    snapStep: [1, 1] as [number, number],
    onChange: () => {},
    graph: undefined,
};

const mafsProps: PropsFor<typeof InteractiveGraphEditor> = {
    ...baseProps,
    apiOptions: {
        ...ApiOptions.defaults,
        flags,
    },
    graph: {type: "segment"} as PerseusGraphType,
};

describe("InteractiveGraphEditor", () => {
    let userEvent: UserEvent;
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
        expect(
            await screen.findByText(
                "Graph the correct answer in the graph below and ensure the equation or point coordinates displayed represent the correct answer.",
            ),
        ).toBeInTheDocument();
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

        const defaultType = await screen.findByText("Linear function");
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

        // Assert
        await waitFor(() =>
            expect(
                screen.queryByText("Linear function"),
            ).not.toBeInTheDocument(),
        );
        expect(screen.getByText("Polygon")).toBeInTheDocument();
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
        expect(
            await screen.findByText("Number of Points:"),
        ).toBeInTheDocument();
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
        expect(await screen.findByText("Number of sides:")).toBeInTheDocument();
        expect(await screen.findByText("Snap to:")).toBeInTheDocument();
        expect(
            await screen.findByText("Show angle measures"),
        ).toBeInTheDocument();
        expect(
            await screen.findByText("Show side measures"),
        ).toBeInTheDocument();
        expect(
            await screen.findByText("Student answer must"),
        ).toBeInTheDocument();
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
        expect(
            await screen.findByText("Number of segments:"),
        ).toBeInTheDocument();
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
        expect(
            await screen.findByText("Student answer must"),
        ).toBeInTheDocument();
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
                graph: {type: "point", numPoints: 5},
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
                graph: {
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
                graph: {
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
                graph: {
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
                graph: {
                    type: "segment",
                    numSegments: 5,
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

    test("changes number of segments when segment prop changes", async () => {
        // Arrange

        // Act
        const {rerender} = render(
            <InteractiveGraphEditor
                {...mafsProps}
                graph={{type: "segment"}}
                correct={{type: "segment"}}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );
        expect(await screen.findAllByTestId("movable-line")).toHaveLength(1);

        // Assert
        rerender(
            <InteractiveGraphEditor
                {...mafsProps}
                graph={{type: "segment"}}
                correct={{type: "segment", numSegments: 4}}
            />,
        );
        expect(await screen.findAllByTestId("movable-line")).toHaveLength(4);
    });

    test("tooltip appears when showTooltips is true and point is clicked", async () => {
        // Arrange

        // Act
        const {rerender} = render(
            <InteractiveGraphEditor {...mafsProps} showTooltips={false} />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert: confirm no tooltip is present when showTooltips false,
        // but tooltip is present when true
        await userEvent.click(screen.getAllByTestId("movable-point")[0]);
        expect(screen.queryByRole("tooltip", {hidden: true})).toBeNull();

        rerender(<InteractiveGraphEditor {...mafsProps} showTooltips={true} />);

        await userEvent.click(screen.getAllByTestId("movable-point")[0]);
        expect(screen.getAllByRole("tooltip")[0]).toBeInTheDocument();
    });

    test("getSaveWarnings returns an error when the graph is invalid", async () => {
        // Arrange
        jest.spyOn(React, "useRef").mockReturnValue({
            current: null,
        });
        const ref = React.useRef<InteractiveGraphEditor>(null);

        // Act
        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "segment"}}
                correct={{type: "segment"}}
                lockedFigures={[
                    {
                        ...getDefaultFigureForType("line"),
                        points: [
                            // Line has length 0
                            getDefaultFigureForType("point"),
                            getDefaultFigureForType("point"),
                        ],
                    },
                ]}
                ref={ref}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );
        await waitForInitialGraphieRender();

        // Assert
        expect(ref.current?.getSaveWarnings()).toEqual([
            "The line cannot have length 0.",
        ]);
    });

    test("getSaveWarnings is empty if there are no errors", async () => {
        // Arrange
        jest.spyOn(React, "useRef").mockReturnValue({
            current: null,
        });
        const ref = React.useRef<InteractiveGraphEditor>(null);

        // Act
        render(
            <InteractiveGraphEditor
                {...baseProps}
                graph={{type: "segment"}}
                correct={{type: "segment"}}
                lockedFigures={[
                    {
                        ...getDefaultFigureForType("line"),
                    },
                ]}
                ref={ref}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );
        await waitForInitialGraphieRender();

        // Assert
        expect(ref.current?.getSaveWarnings()).toEqual([]);
    });

    test("calls changeStartCoords when the startCoords are changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <InteractiveGraphEditor
                {...mafsProps}
                graph={{type: "linear"}}
                correct={{type: "linear"}}
                onChange={onChangeMock}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const xInput = screen.getAllByRole("spinbutton", {name: "x"})[0];
        await userEvent.type(xInput, "1");

        // Assert
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                graph: {
                    type: "linear",
                    startCoords: [
                        [-51, 5],
                        [5, 5],
                    ],
                },
            }),
        );
    });

    // TODO(LEMS-2228): Remove flag-related code once
    // start coords UI is rolled out 100%
    test.each`
        type               | shouldRender
        ${"linear"}        | ${true}
        ${"ray"}           | ${true}
        ${"linear-system"} | ${true}
        ${"segment"}       | ${true}
        ${"circle"}        | ${true}
        ${"quadratic"}     | ${false}
        ${"sinusoid"}      | ${false}
        ${"polygon"}       | ${false}
        ${"angle"}         | ${false}
        ${"point"}         | ${false}
    `(
        "should render for $type graphs if phase1 flag is on: $shouldRender",
        async ({type, shouldRender}) => {
            // Arrange

            // Act
            render(
                <InteractiveGraphEditor
                    {...baseProps}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        flags: {
                            ...flags,
                            mafs: {
                                ...flags.mafs,
                                "start-coords-ui-phase-1": true,
                                "start-coords-ui-phase-2": false,
                                "start-coords-ui-point": false,
                                "start-coords-ui-polygon": false,
                                "start-coords-ui-angle": false,
                            },
                        },
                    }}
                    graph={{type}}
                    correct={{type}}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Assert
            if (shouldRender) {
                expect(
                    await screen.findByRole("button", {
                        name: "Use default start coordinates",
                    }),
                ).toBeInTheDocument();
            } else {
                expect(
                    screen.queryByRole("button", {
                        name: "Use default start coordinates",
                    }),
                ).toBeNull();
            }
        },
    );

    test.each`
        type               | shouldRender
        ${"linear"}        | ${false}
        ${"ray"}           | ${false}
        ${"linear-system"} | ${false}
        ${"segment"}       | ${false}
        ${"circle"}        | ${false}
        ${"quadratic"}     | ${true}
        ${"sinusoid"}      | ${true}
        ${"polygon"}       | ${false}
        ${"angle"}         | ${false}
        ${"point"}         | ${false}
    `(
        "should render for $type graphs if phase2 flag is on: $shouldRender",
        async ({type, shouldRender}) => {
            // Arrange

            // Act
            render(
                <InteractiveGraphEditor
                    {...baseProps}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        flags: {
                            ...flags,
                            mafs: {
                                ...flags.mafs,
                                "start-coords-ui-phase-1": false,
                                "start-coords-ui-phase-2": true,
                                "start-coords-ui-point": false,
                                "start-coords-ui-polygon": false,
                                "start-coords-ui-angle": false,
                            },
                        },
                    }}
                    graph={{type}}
                    correct={{type}}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Assert
            if (shouldRender) {
                expect(
                    await screen.findByRole("button", {
                        name: "Use default start coordinates",
                    }),
                ).toBeInTheDocument();
            } else {
                expect(
                    screen.queryByRole("button", {
                        name: "Use default start coordinates",
                    }),
                ).toBeNull();
            }
        },
    );

    test.each`
        type               | shouldRender
        ${"linear"}        | ${false}
        ${"ray"}           | ${false}
        ${"linear-system"} | ${false}
        ${"segment"}       | ${false}
        ${"circle"}        | ${false}
        ${"quadratic"}     | ${false}
        ${"sinusoid"}      | ${false}
        ${"polygon"}       | ${false}
        ${"angle"}         | ${false}
        ${"point"}         | ${true}
    `(
        "should render for $type graphs if point flag is on: $shouldRender",
        async ({type, shouldRender}) => {
            // Arrange

            // Act
            render(
                <InteractiveGraphEditor
                    {...baseProps}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        flags: {
                            ...flags,
                            mafs: {
                                ...flags.mafs,
                                "start-coords-ui-phase-1": false,
                                "start-coords-ui-phase-2": false,
                                "start-coords-ui-point": true,
                                "start-coords-ui-polygon": false,
                                "start-coords-ui-angle": false,
                            },
                        },
                    }}
                    graph={{type}}
                    correct={{type}}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Assert
            if (shouldRender) {
                expect(
                    await screen.findByRole("button", {
                        name: "Use default start coordinates",
                    }),
                ).toBeInTheDocument();
            } else {
                expect(
                    screen.queryByRole("button", {
                        name: "Use default start coordinates",
                    }),
                ).toBeNull();
            }
        },
    );

    test.each`
        type               | shouldRender
        ${"linear"}        | ${false}
        ${"ray"}           | ${false}
        ${"linear-system"} | ${false}
        ${"segment"}       | ${false}
        ${"circle"}        | ${false}
        ${"quadratic"}     | ${false}
        ${"sinusoid"}      | ${false}
        ${"polygon"}       | ${true}
        ${"angle"}         | ${false}
        ${"point"}         | ${false}
    `(
        "should render for $type graphs if polygon flag is on: $shouldRender",
        async ({type, shouldRender}) => {
            // Arrange

            // Act
            render(
                <InteractiveGraphEditor
                    {...baseProps}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        flags: {
                            ...flags,
                            mafs: {
                                ...flags.mafs,
                                "start-coords-ui-phase-1": false,
                                "start-coords-ui-phase-2": false,
                                "start-coords-ui-point": false,
                                "start-coords-ui-polygon": true,
                                "start-coords-ui-angle": false,
                            },
                        },
                    }}
                    graph={{type}}
                    correct={{type}}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Assert
            if (shouldRender) {
                expect(
                    await screen.findByRole("button", {
                        name: "Use default start coordinates",
                    }),
                ).toBeInTheDocument();
            } else {
                expect(
                    screen.queryByRole("button", {
                        name: "Use default start coordinates",
                    }),
                ).toBeNull();
            }
        },
    );

    test.each`
        type               | shouldRender
        ${"linear"}        | ${false}
        ${"ray"}           | ${false}
        ${"linear-system"} | ${false}
        ${"segment"}       | ${false}
        ${"circle"}        | ${false}
        ${"quadratic"}     | ${false}
        ${"sinusoid"}      | ${false}
        ${"polygon"}       | ${false}
        ${"angle"}         | ${true}
        ${"point"}         | ${false}
    `(
        "should render for $type graphs if angle flag is on: $shouldRender",
        async ({type, shouldRender}) => {
            // Arrange

            // Act
            render(
                <InteractiveGraphEditor
                    {...baseProps}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        flags: {
                            ...flags,
                            mafs: {
                                ...flags.mafs,
                                "start-coords-ui-phase-1": false,
                                "start-coords-ui-phase-2": false,
                                "start-coords-ui-point": false,
                                "start-coords-ui-polygon": false,
                                "start-coords-ui-angle": true,
                            },
                        },
                    }}
                    graph={{type}}
                    correct={{type}}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Assert
            if (shouldRender) {
                expect(
                    await screen.findByRole("button", {
                        name: "Use default start coordinates",
                    }),
                ).toBeInTheDocument();
            } else {
                expect(
                    screen.queryByRole("button", {
                        name: "Use default start coordinates",
                    }),
                ).toBeNull();
            }
        },
    );

    // test("should not render for point graphs with unlimited points", async () => {
    //     // Arrange
    //
    //     // Act
    //     render(
    //         <InteractiveGraphEditor
    //             {...mafsProps}
    //             graph={{type: "point", numPoints: "unlimited"}}
    //             correct={{type: "point", numPoints: "unlimited"}}
    //         />,
    //         {
    //             wrapper: RenderStateRoot,
    //         },
    //     );
    //
    //     // Assert
    //     expect(
    //         screen.queryByRole("button", {
    //             name: "Use default start coordinates",
    //         }),
    //     ).toBeNull();
    // });
    //
    // test("should not render for polygon graphs with unlimited sides", async () => {
    //     // Arrange
    //
    //     // Act
    //     render(
    //         <InteractiveGraphEditor
    //             {...mafsProps}
    //             graph={{type: "polygon", numSides: "unlimited"}}
    //             correct={{type: "polygon", numSides: "unlimited"}}
    //         />,
    //         {
    //             wrapper: RenderStateRoot,
    //         },
    //     );
    //
    //     // Assert
    //     expect(
    //         screen.queryByRole("button", {
    //             name: "Use default start coordinates",
    //         }),
    //     ).toBeNull();
    // });

    test("should not render for polygon graphs with non-grid snapTo (angles)", async () => {
        // Arrange

        // Act
        render(
            <InteractiveGraphEditor
                {...mafsProps}
                graph={{type: "polygon", snapTo: "angles"}}
                correct={{type: "polygon", snapTo: "angles"}}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        expect(
            screen.queryByRole("button", {
                name: "Use default start coordinates",
            }),
        ).toBeNull();
    });

    test("should not render for polygon graphs with non-grid snapTo (sides)", async () => {
        // Arrange

        // Act
        render(
            <InteractiveGraphEditor
                {...mafsProps}
                graph={{type: "polygon", snapTo: "sides"}}
                correct={{type: "polygon", snapTo: "sides"}}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        expect(
            screen.queryByRole("button", {
                name: "Use default start coordinates",
            }),
        ).toBeNull();
    });
});
