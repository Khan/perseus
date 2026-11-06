import {Dependencies} from "@khanacademy/perseus";
import {
    generatePolarGraphAngleGraph,
    generatePolarGraphCircleGraph,
    generatePolarGraphLimaconGraph,
    generatePolarGraphLockedFigure,
    generatePolarGraphOptions,
    generatePolarGraphPointGraph,
    generatePolarGraphRayGraph,
    generatePolarGraphRoseGraph,
    getPolarGraphStartState,
    PolarMath,
    polarGraphLogic,
} from "@khanacademy/perseus-core";
import {render, screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import PolarGraphEditor from "./polar-graph-editor";

import type {PerseusPolarGraphWidgetOptions} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

// The editor is controlled by its parent, so this harness plays the parent:
// it stores each change and renders the editor with it.
function Harness(props: {
    initial: PerseusPolarGraphWidgetOptions;
    onChange: (options: PerseusPolarGraphWidgetOptions) => void;
}) {
    const [options, setOptions] = React.useState(props.initial);
    return (
        <PolarGraphEditor
            {...options}
            onChange={(next) => {
                setOptions(next);
                props.onChange(next);
            }}
        />
    );
}

/** A gray locked circle of radius 3, the plainest locked figure. */
function lockedCircle(
    overrides?: Parameters<typeof generatePolarGraphLockedFigure>[1],
) {
    return generatePolarGraphLockedFigure(
        generatePolarGraphCircleGraph({coords: [[3, 0]]}),
        overrides,
    );
}

/** Opens the first locked figure's accordion; they start closed. */
async function openFirstLockedFigure(userEvent: UserEvent) {
    await userEvent.click(screen.getByRole("button", {name: /^Circle/}));
}

/** Picks an item from the "Add locked figure" menu. */
async function addLocked(userEvent: UserEvent, item: string) {
    await userEvent.click(
        screen.getByRole("button", {name: "Add locked figure"}),
    );
    await userEvent.click(screen.getByRole("menuitem", {name: item}));
}

describe("polar-graph-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("changes the largest radius and keeps the other options", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions()}
                onChange={onChange}
            />,
        );

        // Act
        const input = screen.getByLabelText("Largest radius");
        await userEvent.clear(input);
        await userEvent.type(input, "8");

        // Assert
        expect(onChange).toHaveBeenLastCalledWith(
            expect.objectContaining({maxRadius: 8, radiusStep: 1}),
        );
    });

    it("gives an answer with no coordinates the start layout", async () => {
        // Arrange: hand-written content with an answer type but no handles.
        const onChange = jest.fn();

        // Act
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    correct: generatePolarGraphPointGraph({numPoints: 1}),
                })}
                onChange={onChange}
            />,
        );

        // Assert: the same thing interactive graph's answer graph does on
        // its first render, so a saved widget can always be scored.
        await waitFor(() => {
            expect(onChange).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    correct: expect.objectContaining({
                        type: "point",
                        coords: [[1, 0]],
                    }),
                }),
            );
        });
    });

    it("snaps the answer to the grid on leaving a grid field", async () => {
        // Arrange: a circle of radius 4 on a graph that will shrink to 2.
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    graph: generatePolarGraphCircleGraph(),
                    correct: generatePolarGraphCircleGraph({coords: [[4, 0]]}),
                })}
                onChange={onChange}
            />,
        );

        // Act
        const input = screen.getByLabelText("Largest radius");
        await userEvent.clear(input);
        await userEvent.type(input, "2");
        await userEvent.tab();

        // Assert
        expect(onChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                maxRadius: 2,
                correct: {type: "circle", coords: [[2, 0]]},
            }),
        );
    });

    it("snaps a locked figure to the grid with the answer", async () => {
        // Arrange: a locked circle of radius 4 on a graph that will shrink
        // to 2.
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    lockedFigures: [
                        generatePolarGraphLockedFigure(
                            generatePolarGraphCircleGraph({coords: [[4, 0]]}),
                        ),
                    ],
                })}
                onChange={onChange}
            />,
        );

        // Act
        const input = screen.getByLabelText("Largest radius");
        await userEvent.clear(input);
        await userEvent.type(input, "2");
        await userEvent.tab();

        // Assert
        expect(onChange.mock.calls.at(-1)?.[0].lockedFigures[0]).toMatchObject({
            figure: {type: "circle", coords: [[2, 0]]},
        });
    });

    it("snaps the answer to new spokes on a spoke spacing change", async () => {
        // Arrange: a ray at 20° on a 10° grid, about to become a 30° grid.
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    angleStepDegrees: 10,
                    graph: generatePolarGraphRayGraph(),
                    correct: generatePolarGraphRayGraph({
                        coords: [PolarMath.fromPolar(4, 20)],
                    }),
                })}
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.click(screen.getByLabelText("Spoke spacing"));
        await userEvent.click(screen.getByRole("option", {name: "30°"}));

        // Assert
        const lastCall = onChange.mock.calls.at(-1)?.[0];
        expect(
            PolarMath.toPolar(lastCall.correct.coords[0]).thetaDegrees,
        ).toBeCloseTo(30);
    });

    it("stores the default layout as the start positions", async () => {
        // Arrange
        const onChange = jest.fn();
        const initial = generatePolarGraphOptions({
            graph: generatePolarGraphAngleGraph(),
            correct: generatePolarGraphAngleGraph({
                coords: [
                    [3, 0],
                    [0, -3],
                ],
            }),
        });
        render(<Harness initial={initial} onChange={onChange} />);
        const toggle = screen.getByRole("checkbox", {
            name: "Choose where the handles start",
        });

        // Act
        await userEvent.click(toggle);

        // Assert: the stored start is the default layout, shown on a graph.
        expect(onChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                graph: {
                    type: "angle",
                    startCoords: getPolarGraphStartState(initial).coords,
                },
            }),
        );
        expect(screen.getAllByRole("figure")).toHaveLength(2);

        // Act: back to the default layout.
        await userEvent.click(toggle);

        // Assert
        expect(onChange).toHaveBeenLastCalledWith(
            expect.objectContaining({
                graph: {type: "angle", startCoords: undefined},
            }),
        );
    });

    it("warns when the handles start in the correct position", () => {
        // Arrange, Act: a fresh widget, whose answer is the default layout.
        render(
            <Harness
                initial={generatePolarGraphOptions()}
                onChange={jest.fn()}
            />,
        );

        // Assert
        expect(
            screen.getByText(/start in the correct position/),
        ).toBeInTheDocument();
    });

    it("grows the answer to match a larger point count", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    graph: generatePolarGraphPointGraph({numPoints: 1}),
                    correct: generatePolarGraphPointGraph({
                        numPoints: 1,
                        coords: [[3, 0]],
                    }),
                })}
                onChange={onChange}
            />,
        );

        // Act
        const input = screen.getByLabelText("Number of points");
        await userEvent.clear(input);
        await userEvent.type(input, "2");

        // Assert: the existing answer point stays, a second gets a default.
        const lastCall = onChange.mock.calls.at(-1)?.[0];
        expect(lastCall.graph.numPoints).toBe(2);
        expect(lastCall.correct.coords).toHaveLength(2);
        expect(lastCall.correct.coords[0]).toEqual([3, 0]);
    });

    it("switches the answer type and resets the answer", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions()}
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.click(screen.getByLabelText("Answer type"));
        await userEvent.click(screen.getByRole("option", {name: "Rose"}));

        // Assert
        const lastCall = onChange.mock.calls.at(-1)?.[0];
        expect(lastCall.graph).toEqual({type: "rose", k: 3});
        expect(lastCall.correct).toMatchObject({type: "rose", k: 3});
        expect(lastCall.correct.coords).toHaveLength(1);
    });

    it("changes the starting k and leaves the answer alone", async () => {
        // Arrange: the learner starts at k = 2 from a chosen spot; the
        // answer is k = 5.
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    graph: generatePolarGraphRoseGraph({
                        k: 2,
                        startCoords: [[2, 0]],
                    }),
                    correct: generatePolarGraphRoseGraph({
                        k: 5,
                        coords: [[3, 0]],
                    }),
                })}
                onChange={onChange}
            />,
        );

        // Act
        const input = screen.getByLabelText("Starting k");
        await userEvent.clear(input);
        await userEvent.type(input, "4");

        // Assert
        const lastCall = onChange.mock.calls.at(-1)?.[0];
        expect(lastCall.graph).toEqual({
            type: "rose",
            k: 4,
            startCoords: [[2, 0]],
        });
        expect(lastCall.correct).toEqual({
            type: "rose",
            k: 5,
            coords: [[3, 0]],
        });
    });

    it("sets a fixed k on both the graph and the answer", async () => {
        // Arrange: the learner starts at k = 2; the answer is k = 3.
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    graph: generatePolarGraphRoseGraph({k: 2}),
                    correct: generatePolarGraphRoseGraph({
                        k: 3,
                        coords: [[4, 0]],
                    }),
                })}
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.click(screen.getByLabelText("Fixed k"));

        // Assert: the learner gets the answer's k, and the answer preview
        // loses its k buttons.
        expect(onChange.mock.calls.at(-1)?.[0].graph).toEqual({
            type: "rose",
            k: 3,
            fixedK: true,
        });
        expect(
            screen.queryByRole("button", {name: "Increase k"}),
        ).not.toBeInTheDocument();

        // Act: the field now sets k for both.
        const input = screen.getByLabelText("k");
        await userEvent.clear(input);
        await userEvent.type(input, "4");

        // Assert
        const lastCall = onChange.mock.calls.at(-1)?.[0];
        expect(lastCall.graph).toEqual({type: "rose", k: 4, fixedK: true});
        expect(lastCall.correct).toEqual({
            type: "rose",
            k: 4,
            coords: [[4, 0]],
        });
    });

    it("stores angle scoring on the answer, as interactive graph", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    graph: generatePolarGraphAngleGraph(),
                    correct: generatePolarGraphAngleGraph({
                        coords: [
                            [3, 0],
                            [0, 3],
                        ],
                    }),
                })}
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.click(screen.getByLabelText("Show angle measures"));
        await userEvent.click(screen.getByLabelText("Student answer must"));
        await userEvent.click(
            screen.getByRole("option", {name: "be congruent"}),
        );

        // Assert: as on interactive graph, the scorer reads `match` from
        // the answer.
        const lastCall = onChange.mock.calls.at(-1)?.[0];
        expect(lastCall.graph).toEqual({type: "angle", showAngles: true});
        expect(lastCall.correct).toEqual({
            type: "angle",
            match: "congruent",
            coords: [
                [3, 0],
                [0, 3],
            ],
        });
    });

    it("shows the answer's equation under the graph", () => {
        // Arrange, Act: a cardioid reaching (4, 0°).
        render(
            <PolarGraphEditor
                {...generatePolarGraphOptions({
                    graph: generatePolarGraphLimaconGraph(),
                    correct: generatePolarGraphLimaconGraph({
                        coords: [
                            [4, 0],
                            [0, 0],
                        ],
                    }),
                })}
                onChange={jest.fn()}
            />,
        );

        // Assert
        expect(screen.getByText(/r = 2 \+ 2 cos θ/)).toBeInTheDocument();
    });

    it("adds an open gray locked circle the author can delete", async () => {
        // Arrange
        const onChange = jest.fn();
        const confirmSpy = jest
            .spyOn(window, "confirm")
            .mockImplementation(() => true);
        render(
            <Harness
                initial={generatePolarGraphOptions()}
                onChange={onChange}
            />,
        );

        // Act
        await addLocked(userEvent, "Circle");

        // Assert: a circle at its default start, with its settings open.
        expect(onChange.mock.calls.at(-1)?.[0].lockedFigures).toEqual([
            lockedCircle(),
        ]);
        expect(screen.getByRole("button", {name: /^Circle/})).toHaveAttribute(
            "aria-expanded",
            "true",
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Delete locked circle"}),
        );

        // Assert: the author confirmed, the figure is gone and focus stayed
        // in the section.
        expect(confirmSpy).toHaveBeenCalled();
        expect(onChange.mock.calls.at(-1)?.[0].lockedFigures).toEqual([]);
        expect(
            screen.getByRole("button", {name: "Add locked figure"}),
        ).toHaveFocus();
    });

    it("changes a locked figure's type and aria label", async () => {
        // Arrange: existing figures start collapsed, as on interactive graph.
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    lockedFigures: [lockedCircle()],
                })}
                onChange={onChange}
            />,
        );
        await openFirstLockedFigure(userEvent);

        // Act
        await userEvent.click(screen.getByLabelText("Figure"));
        await userEvent.click(screen.getByRole("option", {name: "Ray"}));
        await userEvent.type(
            screen.getByLabelText("Aria label"),
            "The ray θ = 0",
        );

        // Assert
        const locked = onChange.mock.calls.at(-1)?.[0].lockedFigures[0];
        expect(locked.figure.type).toBe("ray");
        expect(locked.ariaLabel).toBe("The ray θ = 0");
    });

    it("swaps stroke controls for an open point switch on points", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    lockedFigures: [lockedCircle()],
                })}
                onChange={onChange}
            />,
        );
        await openFirstLockedFigure(userEvent);

        // Act
        await userEvent.click(screen.getByLabelText("Figure"));
        await userEvent.click(screen.getByRole("option", {name: "Point"}));
        await userEvent.click(screen.getByLabelText("open point"));

        // Assert
        expect(screen.queryByLabelText("stroke")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("weight")).not.toBeInTheDocument();
        expect(onChange.mock.calls.at(-1)?.[0].lockedFigures[0]).toMatchObject({
            figure: {type: "point"},
            filled: false,
        });
    });

    it("generates an aria label from measurements and appearance", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    lockedFigures: [
                        lockedCircle({
                            color: "purple",
                            strokeStyle: "dashed",
                            weight: "thick",
                        }),
                    ],
                })}
                onChange={onChange}
            />,
        );
        await openFirstLockedFigure(userEvent);

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Auto-generate"}),
        );

        // Assert: the pattern interactive graph uses, with no handle names.
        await waitFor(() => {
            expect(
                onChange.mock.calls.at(-1)?.[0].lockedFigures[0].ariaLabel,
            ).toBe(
                "Circle with radius 3. Appearance thick dashed purple " +
                    "border, with no fill.",
            );
        });
    });

    it("offers a fill and a stroke-free border on closed figures", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    lockedFigures: [lockedCircle()],
                })}
                onChange={onChange}
            />,
        );
        await openFirstLockedFigure(userEvent);

        // Act
        await userEvent.click(screen.getByLabelText("fill"));
        await userEvent.click(
            screen.getByRole("option", {name: "translucent"}),
        );
        await userEvent.click(screen.getByLabelText("stroke"));
        await userEvent.click(screen.getByRole("option", {name: "none"}));

        // Assert
        expect(onChange.mock.calls.at(-1)?.[0].lockedFigures[0]).toMatchObject({
            fillStyle: "translucent",
            strokeStyle: "none",
        });
    });

    it("offers no fill and no stroke-free border on a locked ray", async () => {
        // Arrange
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    lockedFigures: [
                        generatePolarGraphLockedFigure(
                            generatePolarGraphRayGraph({coords: [[0, 3]]}),
                        ),
                    ],
                })}
                onChange={jest.fn()}
            />,
        );
        await userEvent.click(screen.getByRole("button", {name: /^Ray/}));

        // Act
        await userEvent.click(screen.getByLabelText("stroke"));

        // Assert
        expect(screen.queryByLabelText("fill")).not.toBeInTheDocument();
        expect(
            screen.queryByRole("option", {name: "none"}),
        ).not.toBeInTheDocument();
    });

    it("adds a visible label in the figure's color", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    lockedFigures: [lockedCircle({color: "purple"})],
                })}
                onChange={onChange}
            />,
        );
        await openFirstLockedFigure(userEvent);

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Add visible label"}),
        );

        // Assert: beside the circle's handle, in purple.
        expect(onChange.mock.calls.at(-1)?.[0].lockedFigures[0].labels).toEqual(
            [
                {
                    type: "label",
                    coord: [3.5, 0],
                    text: "label",
                    color: "purple",
                    size: "medium",
                },
            ],
        );
    });

    it("adds a free label and places it by radius and angle", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions()}
                onChange={onChange}
            />,
        );

        // Act: a new label opens ready to edit.
        await addLocked(userEvent, "Label");
        const radius = screen.getByLabelText("radius");
        await userEvent.clear(radius);
        await userEvent.type(radius, "3");
        const angle = screen.getByLabelText("angle (°)");
        await userEvent.clear(angle);
        await userEvent.type(angle, "90");
        await userEvent.type(screen.getByLabelText("text"), "!");

        // Assert: (3, 90°) is straight up.
        const label = onChange.mock.calls.at(-1)?.[0].lockedLabels[0];
        expect(label.coord[0]).toBeCloseTo(0);
        expect(label.coord[1]).toBeCloseTo(3);
        expect(label.text).toBe("label!");
    });

    it("moves a locked figure forward in the drawing order", async () => {
        // Arrange: the circle is drawn first, so it sits behind the ray.
        const onChange = jest.fn();
        const circle = lockedCircle();
        const ray = generatePolarGraphLockedFigure(
            generatePolarGraphRayGraph({coords: [[0, 3]]}),
            {color: "red"},
        );
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    lockedFigures: [circle, ray],
                })}
                onChange={onChange}
            />,
        );
        await openFirstLockedFigure(userEvent);

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Move locked circle forward"}),
        );

        // Assert
        expect(onChange.mock.calls.at(-1)?.[0].lockedFigures).toEqual([
            ray,
            circle,
        ]);
    });

    it("enables the point-label switch once a point has a label", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    graph: generatePolarGraphPointGraph({numPoints: 1}),
                })}
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.type(screen.getByLabelText("Label for point 1"), "P");

        // Assert: the label lands on the graph settings and unlocks the
        // switch.
        expect(onChange.mock.calls.at(-1)?.[0].graph.pointLabels).toEqual([
            "P",
        ]);
        expect(screen.getByLabelText("Show point labels")).toHaveAttribute(
            "aria-disabled",
            "false",
        );
    });

    it("disables the point-label switch while no point has a label", () => {
        // Arrange, Act
        render(
            <Harness
                initial={generatePolarGraphOptions({
                    graph: generatePolarGraphPointGraph({numPoints: 1}),
                })}
                onChange={jest.fn()}
            />,
        );

        // Assert: the Wonder Blocks switch reports this through aria.
        expect(screen.getByLabelText("Show point labels")).toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("shows one draggable point per answer point", () => {
        // Arrange, Act
        render(
            <PolarGraphEditor
                {...generatePolarGraphOptions({
                    graph: generatePolarGraphPointGraph({numPoints: 2}),
                    correct: generatePolarGraphPointGraph({
                        numPoints: 2,
                        coords: [
                            [3, 0],
                            [0, 2],
                        ],
                    }),
                })}
                onChange={jest.fn()}
            />,
        );

        // Assert
        expect(
            screen.getAllByRole("button", {name: /^Point \d+ at radius/}),
        ).toHaveLength(2);
    });

    // The editor page reads the default options off the component itself to
    // seed a newly inserted polar graph, so they're part of its public
    // surface, not implementation detail.
    it("exposes the default options a new polar graph starts with", () => {
        // Arrange, Act, Assert
        expect(PolarGraphEditor.defaultProps).toEqual(
            polarGraphLogic.defaultWidgetOptions,
        );
    });
});
