import {
    generatePolarGraphCircleGraph,
    generatePolarGraphLockedFigure,
    generatePolarGraphPointGraph,
    generatePolarGraphQuestion,
    generatePolarGraphRoseGraph,
    getPolarGraphStartState,
    lockedFigureColors,
} from "@khanacademy/perseus-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../__testutils__/render-question";
import {scorePerseusItemTesting} from "../../util/scoring.testutils";

import {
    angleCongruent,
    angleStandardPosition,
    cardioid,
    circleRadiusThree,
    labeledPoints,
    lemniscate,
    readFromCurve,
    rayRadians,
    singlePointDegrees,
    threePetalRose,
    twoPointsRadians,
    ungradedRose,
} from "./polar-graph.testdata";

import type {UserEvent} from "@testing-library/user-event";

function pointHandles() {
    return screen.getAllByRole("button", {name: /^Point \d+ at radius/});
}

// Drives a pointer drag on a handle's hitbox. The drag is handled by
// @use-gesture, which only responds to fireEvent mouse events with explicit
// coordinates, not to userEvent.
function dragBy(hitbox: Element, dx: number, dy: number) {
    /* eslint-disable testing-library/prefer-user-event */
    fireEvent.mouseDown(hitbox, {
        pointerId: 1,
        buttons: 1,
        clientX: 0,
        clientY: 0,
    });
    fireEvent.mouseMove(hitbox, {
        pointerId: 1,
        buttons: 1,
        clientX: dx,
        clientY: dy,
    });
    fireEvent.mouseUp(hitbox, {pointerId: 1});
    /* eslint-enable testing-library/prefer-user-event */
}

describe("Polar graph widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders one focusable point per point in the answer", () => {
        // Arrange, Act
        renderQuestion(twoPointsRadians);

        // Assert
        expect(pointHandles()).toHaveLength(2);
    });

    it("names each point by radius and angle in degrees", () => {
        // Arrange, Act
        renderQuestion(singlePointDegrees);

        // Assert
        expect(pointHandles()[0]).toHaveAccessibleName(
            "Point 1 at radius 1, angle 0 degrees.",
        );
    });

    it("names angles as fractions of π when the author picks radians", () => {
        // Arrange, Act
        renderQuestion(twoPointsRadians);

        // Assert: the second start point sits half way round the circle.
        expect(pointHandles()[1]).toHaveAccessibleName(
            "Point 2 at radius 1, angle π radians.",
        );
    });

    it("describes the whole graph with instructions first", () => {
        // Arrange, Act
        renderQuestion(singlePointDegrees);

        // Assert
        const figure = screen.getByRole("figure", {
            name: "A polar graph with circles one unit apart.",
        });
        expect(figure).toHaveAccessibleDescription(
            /^Use the Tab key to move between the handles/,
        );
        expect(figure).toHaveAccessibleDescription(
            /Interactive elements: Point 1 at radius 1, angle 0 degrees\.$/,
        );
    });

    it("moves a point one circle outward on the up arrow", async () => {
        // Arrange
        const {renderer} = renderQuestion(singlePointDegrees);
        pointHandles()[0].focus();

        // Act
        await userEvent.keyboard("{arrowup}");

        // Assert
        expect(renderer.getUserInputMap()["polar-graph 1"]).toEqual({
            type: "point",
            numPoints: 1,
            coords: [[2, 0]],
        });
    });

    it("turns a point counterclockwise with the left arrow", async () => {
        // Arrange
        renderQuestion(singlePointDegrees);
        pointHandles()[0].focus();

        // Act
        await userEvent.keyboard("{arrowleft}");

        // Assert
        expect(pointHandles()[0]).toHaveAccessibleName(
            "Point 1 at radius 1, angle 15 degrees.",
        );
    });

    it("does not move a point past the outer circle", async () => {
        // Arrange
        const question = generatePolarGraphQuestion({
            maxRadius: 2,
            correct: generatePolarGraphPointGraph({coords: [[2, 0]]}),
        });
        const {renderer} = renderQuestion(question);
        pointHandles()[0].focus();

        // Act
        await userEvent.keyboard("{arrowup}{arrowup}{arrowup}");

        // Assert
        expect(renderer.getUserInputMap()["polar-graph 1"]).toEqual({
            type: "point",
            numPoints: 1,
            coords: [[2, 0]],
        });
    });

    it("scores the plotted point against the answer", async () => {
        // Arrange: the answer is (3, 45°); the point starts at (1, 0°).
        const {renderer} = renderQuestion(singlePointDegrees);
        pointHandles()[0].focus();

        // Act: two circles out, three spokes counterclockwise.
        await userEvent.keyboard(
            "{arrowup}{arrowup}{arrowleft}{arrowleft}{arrowleft}",
        );

        // Assert
        await waitFor(() => {
            const score = scorePerseusItemTesting(
                singlePointDegrees,
                renderer.getUserInputMap(),
            );
            expect(score).toHaveBeenAnsweredCorrectly();
        });
    });

    it("marks a point on the wrong spoke incorrect", async () => {
        // Arrange
        const {renderer} = renderQuestion(singlePointDegrees);
        pointHandles()[0].focus();

        // Act
        await userEvent.keyboard("{arrowup}{arrowup}");

        // Assert
        const score = scorePerseusItemTesting(
            singlePointDegrees,
            renderer.getUserInputMap(),
        );
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("takes the points out of the tab order when read-only", () => {
        // Arrange, Act
        renderQuestion(singlePointDegrees, {apiOptions: {readOnly: true}});

        // Assert
        const handle = pointHandles()[0];
        expect(handle).toHaveAttribute("tabindex", "-1");
        expect(handle).toHaveAttribute("aria-disabled", "true");
    });
});

describe("Polar graph sub-types", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("turns a ray with the left arrow and scores its direction", async () => {
        // Arrange: the answer is θ = 150°, the handle starts at 0° on a
        // 30° grid.
        const {renderer} = renderQuestion(rayRadians);
        const handle = screen.getByRole("button", {name: /^Point on the ray/});
        handle.focus();

        // Act
        await userEvent.keyboard("{arrowleft}".repeat(5));

        // Assert
        expect(handle).toHaveAccessibleName(
            "Point on the ray at radius 3, angle 5π/6 radians.",
        );
        expect(
            scorePerseusItemTesting(rayRadians, renderer.getUserInputMap()),
        ).toHaveBeenAnsweredCorrectly();
    });

    it("grows a circle with the up arrow and reads its radius", async () => {
        // Arrange: the handle starts half way out, at radius 3 of 5.
        const {renderer} = renderQuestion(circleRadiusThree);
        const handle = screen.getByRole("button", {
            name: /^Point on the circle/,
        });
        handle.focus();

        // Act
        await userEvent.keyboard("{arrowdown}");

        // Assert
        expect(screen.getByRole("figure")).toHaveAccessibleDescription(
            /Circle of radius 2\./,
        );
        expect(
            scorePerseusItemTesting(
                circleRadiusThree,
                renderer.getUserInputMap(),
            ),
        ).toHaveBeenAnsweredIncorrectly();
    });

    it("shapes a limaçon with two handles on one axis", async () => {
        // Arrange: the default cardioid reaches (2, 0°) with its near point
        // at the pole; the answer reaches (4, 0°).
        const {renderer} = renderQuestion(cardioid);
        const farTip = screen.getByRole("button", {name: /^Far tip/});
        const nearPoint = screen.getByRole("button", {name: /^Near point/});

        // Act: stretch the tip out two circles, then nudge the near point
        // off the pole and back.
        farTip.focus();
        await userEvent.keyboard("{arrowup}{arrowup}");
        nearPoint.focus();
        await userEvent.keyboard("{arrowdown}{arrowup}");

        // Assert
        expect(farTip).toHaveAccessibleName(
            "Far tip of the lima\u00e7on at radius 4, angle 0 degrees.",
        );
        expect(
            scorePerseusItemTesting(cardioid, renderer.getUserInputMap()),
        ).toHaveBeenAnsweredCorrectly();
    });

    it("turns the limaçon clockwise with the right arrow", async () => {
        // Arrange
        renderQuestion(cardioid);
        const farTip = screen.getByRole("button", {name: /^Far tip/});
        farTip.focus();

        // Act
        await userEvent.keyboard("{arrowright}");

        // Assert
        expect(farTip).toHaveAccessibleName(
            "Far tip of the lima\u00e7on at radius 2, angle 345 degrees.",
        );
    });

    it("changes k with the buttons and scores the rose", async () => {
        // Arrange: the learner starts with k = 2 and a tip at (3, 0°).
        const {renderer} = renderQuestion(threePetalRose);
        expect(screen.getByRole("figure")).toHaveAccessibleDescription(
            /Petal tip of the rose at radius 3, angle 0 degrees\./,
        );

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Increase k"}));
        screen.getByRole("button", {name: /^Petal tip/}).focus();
        await userEvent.keyboard("{arrowup}");

        // Assert
        expect(renderer.getUserInputMap()["polar-graph 1"]).toMatchObject({
            type: "rose",
            k: 3,
            coords: [[4, 0]],
        });
        expect(
            scorePerseusItemTesting(threePetalRose, renderer.getUserInputMap()),
        ).toHaveBeenAnsweredCorrectly();
    });

    it("shows k with no way to change it when k is fixed", async () => {
        // Arrange: a four-petal rose the learner only resizes and turns.
        const fixedRose = generatePolarGraphQuestion({
            graph: generatePolarGraphRoseGraph({k: 4, fixedK: true}),
            correct: generatePolarGraphRoseGraph({k: 4, coords: [[4, 0]]}),
        });
        const {renderer} = renderQuestion(fixedRose);

        // Assert: no buttons, no sentence about them, k still named.
        expect(
            screen.queryByRole("button", {name: /crease k$/}),
        ).not.toBeInTheDocument();
        expect(screen.getByRole("figure")).not.toHaveAccessibleDescription(
            /buttons under the graph/,
        );
        expect(
            screen.getByRole("group", {name: /k equal to 4/}),
        ).toBeInTheDocument();

        // Act: the tip moves out one circle to radius 4.
        screen.getByRole("button", {name: /^Petal tip/}).focus();
        await userEvent.keyboard("{arrowup}");

        // Assert
        expect(
            scorePerseusItemTesting(fixedRose, renderer.getUserInputMap()),
        ).toHaveBeenAnsweredCorrectly();
    });
});

describe("Polar graph angle and lemniscate", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("opens the angle counterclockwise and names its measure", async () => {
        // Arrange: the terminal side starts at π/2 on a 30° grid.
        const {renderer} = renderQuestion(angleStandardPosition);
        const terminal = screen.getByRole("button", {name: /^Terminal side/});
        terminal.focus();

        // Act: two spokes further counterclockwise, to 5π/6.
        await userEvent.keyboard("{arrowleft}{arrowleft}");

        // Assert
        expect(
            screen.getByRole("group", {
                name: "An angle at the pole measuring 5π/6 radians.",
            }),
        ).toBeInTheDocument();
        expect(screen.getByTestId("polar-angle__arc")).toBeInTheDocument();
        expect(
            scorePerseusItemTesting(
                angleStandardPosition,
                renderer.getUserInputMap(),
            ),
        ).toHaveBeenAnsweredCorrectly();
    });

    it("rejects a correct measure on the wrong sides when exact", async () => {
        // Arrange
        const {renderer} = renderQuestion(angleStandardPosition);

        // Act: turn both sides one spoke, keeping the 5π/6 opening.
        screen.getByRole("button", {name: /^Initial side/}).focus();
        await userEvent.keyboard("{arrowleft}");
        screen.getByRole("button", {name: /^Terminal side/}).focus();
        await userEvent.keyboard("{arrowleft}{arrowleft}{arrowleft}");

        // Assert
        expect(
            scorePerseusItemTesting(
                angleStandardPosition,
                renderer.getUserInputMap(),
            ),
        ).toHaveBeenAnsweredIncorrectly();
    });

    it("accepts any 120 degree angle when scoring by measure", async () => {
        // Arrange: the sides start at 0° and 90°.
        const {renderer} = renderQuestion(angleCongruent);

        // Act: initial side to 30°, terminal side to 150°.
        screen.getByRole("button", {name: /^Initial side/}).focus();
        await userEvent.keyboard("{arrowleft}");
        screen.getByRole("button", {name: /^Terminal side/}).focus();
        await userEvent.keyboard("{arrowleft}{arrowleft}");

        // Assert
        expect(
            screen.getByRole("group", {
                name: "An angle at the pole measuring 120 degrees.",
            }),
        ).toBeInTheDocument();
        expect(
            scorePerseusItemTesting(angleCongruent, renderer.getUserInputMap()),
        ).toHaveBeenAnsweredCorrectly();
    });

    it("scores a lemniscate by its tip, on either lobe", async () => {
        // Arrange: the tip starts at (3, 0°), which is already the answer,
        // so turn it half way round to the other lobe's tip.
        const {renderer} = renderQuestion(lemniscate);
        const tip = screen.getByRole("button", {
            name: /^Tip of the lemniscate/,
        });
        tip.focus();

        // Act
        await userEvent.keyboard("{arrowleft}".repeat(12));

        // Assert
        expect(tip).toHaveAccessibleName(
            "Tip of the lemniscate at radius 3, angle 180 degrees.",
        );
        expect(
            scorePerseusItemTesting(lemniscate, renderer.getUserInputMap()),
        ).toHaveBeenAnsweredCorrectly();
    });
});

describe("Polar graph static mode and dragging", () => {
    it("shows the correct answer, not the start position, when static", () => {
        // Arrange, Act
        renderQuestion(
            generatePolarGraphQuestion({
                isStatic: true,
                correct: generatePolarGraphPointGraph({coords: [[3, 0]]}),
            }),
        );

        // Assert
        const handle = pointHandles()[0];
        expect(handle).toHaveAccessibleName(
            "Point 1 at radius 3, angle 0 degrees.",
        );
        expect(handle).toHaveAttribute("tabindex", "-1");
    });

    it("snaps a dragged point to the nearest circle and spoke", () => {
        // Arrange: the 400px graph spans about 12 units, so 40px is a bit
        // over one unit. The point starts at (1, 0°).
        const {renderer} = renderQuestion(singlePointDegrees);

        // Act
        dragBy(screen.getByTestId("movable-point__hitbox"), 40, 0);

        // Assert
        expect(renderer.getUserInputMap()["polar-graph 1"]).toEqual({
            type: "point",
            numPoints: 1,
            coords: [[2, 0]],
        });
    });
});

describe("getStartState", () => {
    it("fills in handles the author's start coordinates leave out", () => {
        // Arrange
        const options = generatePolarGraphQuestion({
            correct: generatePolarGraphPointGraph({
                numPoints: 2,
                coords: [
                    [3, 0],
                    [0, 3],
                ],
            }),
        }).widgets["polar-graph 1"].options;

        // Act
        const state = getPolarGraphStartState({
            ...options,
            graph: {type: "point", numPoints: 2, startCoords: [[0, 2]]},
        });

        // Assert: the given start point is kept and a second is added.
        expect(state.coords).toHaveLength(2);
        expect(state.coords?.[0]).toEqual([0, 2]);
    });
});

describe("Polar graph grading, locked figures and labels", () => {
    it("tells the learner an ungraded graph does not count", () => {
        // Arrange, Act
        renderQuestion(ungradedRose);

        // Assert: the note is on the page and read first with the figure.
        const note = screen.getByText(
            "Use this graph to check your thinking, but it does not count " +
                "as your answer.",
        );
        expect(note).toBeInTheDocument();
        expect(screen.getByRole("figure")).toHaveAccessibleDescription(
            /^Use this graph to check your thinking/,
        );
    });

    it("does not reveal the answer when static and ungraded", () => {
        // Arrange, Act: the answer is at radius 3; the start is radius 1.
        renderQuestion(
            generatePolarGraphQuestion({
                isStatic: true,
                graded: false,
                correct: generatePolarGraphPointGraph({coords: [[3, 0]]}),
            }),
        );

        // Assert
        expect(pointHandles()[0]).toHaveAccessibleName(
            "Point 1 at radius 1, angle 0 degrees.",
        );
    });

    it("puts the graph in the tab order so its instructions are read", () => {
        // Arrange, Act
        renderQuestion(singlePointDegrees);

        // Assert: the same tab stop interactive graph's figure has.
        expect(screen.getByRole("figure")).toHaveAttribute("tabindex", "0");
    });

    it("gives the point sub-type no group name, like interactive graph", () => {
        // Arrange, Act
        renderQuestion(singlePointDegrees);

        // Assert
        expect(screen.queryByRole("group")).not.toBeInTheDocument();
    });

    it("does not draw point labels on a static graph", () => {
        // Arrange, Act: a static graph showing labeled points A and B.
        renderQuestion(
            generatePolarGraphQuestion({
                isStatic: true,
                correct: generatePolarGraphPointGraph({
                    numPoints: 2,
                    pointLabels: ["A", "B"],
                    showPointLabels: true,
                    coords: [
                        [3, 0],
                        [0, 2],
                    ],
                }),
            }),
        );

        // Assert
        expect(screen.queryByText("B")).not.toBeInTheDocument();
    });

    it("draws a locked figure with its own label and no handles", () => {
        // Arrange, Act
        renderQuestion(readFromCurve);

        // Assert
        expect(
            screen.getByRole("img", {name: "The cardioid r = 2(1 + cos θ)"}),
        ).toBeInTheDocument();
        expect(screen.getAllByRole("button")).toHaveLength(1);
    });

    it("shows TeX labels over the graph, from figures and on their own", () => {
        // Arrange, Act: the cardioid carries its equation; a free label
        // names the polar axis.
        renderQuestion({
            ...readFromCurve,
            widgets: {
                ...readFromCurve.widgets,
                "polar-graph 1": {
                    ...readFromCurve.widgets["polar-graph 1"],
                    options: {
                        ...readFromCurve.widgets["polar-graph 1"].options,
                        lockedLabels: [
                            {
                                type: "label",
                                coord: [5.2, 0],
                                text: "symmetry axis",
                                color: "grayH",
                                size: "small",
                            },
                        ],
                    },
                },
            },
        });

        // Assert
        expect(
            screen.getByText(/r = 2\(1 \+ \\cos\\theta\)/),
        ).toBeInTheDocument();
        expect(screen.getByText(/symmetry axis/)).toBeInTheDocument();
    });

    it("names labeled points by their labels and shows them", () => {
        // Arrange, Act
        renderQuestion(labeledPoints);

        // Assert
        expect(
            screen.getByRole("button", {name: /^Point A/}),
        ).toHaveAccessibleName("Point A at radius 1, angle 0 degrees.");
        expect(screen.getByText("B")).toBeInTheDocument();
    });
});

describe("Polar graph required state and label details", () => {
    it("says the graph is required and shows no ungraded note", () => {
        // Arrange, Act: the renderer only marks widgets scorable when told.
        renderQuestion(singlePointDegrees, {
            extraProps: {isScorable: true, reviewMode: false},
        });

        // Assert
        expect(
            screen.queryByText(/does not count as your answer/),
        ).not.toBeInTheDocument();
        expect(screen.getByRole("figure")).toHaveAccessibleDescription(
            /Required/,
        );
    });

    it("does not say an ungraded graph is required", () => {
        // Arrange, Act
        renderQuestion(ungradedRose, {
            extraProps: {isScorable: true, reviewMode: false},
        });

        // Assert
        expect(screen.getByRole("figure")).not.toHaveAccessibleDescription(
            /Required/,
        );
    });

    it("hides an unlabeled locked figure from screen readers", () => {
        // Arrange, Act
        renderQuestion(
            generatePolarGraphQuestion({
                lockedFigures: [
                    generatePolarGraphLockedFigure(
                        generatePolarGraphCircleGraph({coords: [[3, 0]]}),
                    ),
                    generatePolarGraphLockedFigure(
                        generatePolarGraphPointGraph({coords: [[0, 2]]}),
                        {ariaLabel: "The point P"},
                    ),
                ],
                correct: generatePolarGraphPointGraph({coords: [[1, 0]]}),
            }),
        );

        // Assert
        const figures = screen.getAllByTestId("polar-graph__locked-figure");
        expect(figures[0]).toHaveAttribute("aria-hidden", "true");
        expect(
            screen.getByRole("img", {name: "The point P"}),
        ).toBeInTheDocument();
    });

    it("fills a locked curve and circle like a locked ellipse", () => {
        // Arrange, Act: a translucent rose and a white-filled circle with
        // no stroke.
        renderQuestion(
            generatePolarGraphQuestion({
                lockedFigures: [
                    generatePolarGraphLockedFigure(
                        generatePolarGraphRoseGraph({k: 3, coords: [[4, 0]]}),
                        {color: "purple", fillStyle: "translucent"},
                    ),
                    generatePolarGraphLockedFigure(
                        generatePolarGraphCircleGraph({coords: [[2, 0]]}),
                        {fillStyle: "white", strokeStyle: "none"},
                    ),
                ],
                correct: generatePolarGraphPointGraph({coords: [[1, 0]]}),
            }),
        );

        // Assert
        const [rose, circle] = screen.getAllByTestId(
            "polar-graph__locked-figure",
        );
        // SVG shapes have no role or label, so this reaches them directly.
        /* eslint-disable testing-library/no-node-access */
        const petals = rose.querySelector("path")?.getAttribute("style");
        const ring = circle.querySelector("ellipse")?.getAttribute("style");
        /* eslint-enable testing-library/no-node-access */
        expect(petals).toContain("fill-opacity: 0.4");
        expect(ring).toContain("stroke: none");
    });

    it("draws a locked curve from the pole, not from the graph's corner", () => {
        // Arrange, Act: a cardioid whose far tip sits on the polar axis.
        renderQuestion(readFromCurve);
        const path = screen
            .getByTestId("polar-graph__locked-figure")
            // eslint-disable-next-line testing-library/no-node-access
            .querySelector("path");
        const [, x, y] =
            /^M (\S+) (\S+)/.exec(path?.getAttribute("d") ?? "") ?? [];

        // Assert: the path starts at the tip, right of the pole on the axis.
        // Mafs puts the pole at (0, 0) inside its SVG, so y is 0 there.
        expect(Number(x)).toBeGreaterThan(0);
        expect(Number(y)).toBeCloseTo(0);
    });

    it("draws an open locked point with a white center", () => {
        // Arrange, Act
        renderQuestion(
            generatePolarGraphQuestion({
                lockedFigures: [
                    generatePolarGraphLockedFigure(
                        generatePolarGraphPointGraph({coords: [[0, 2]]}),
                        {color: "green", filled: false},
                    ),
                    generatePolarGraphLockedFigure(
                        generatePolarGraphPointGraph({coords: [[2, 0]]}),
                        {color: "green"},
                    ),
                ],
                correct: generatePolarGraphPointGraph({coords: [[1, 0]]}),
            }),
        );

        // Assert: the open point's fill differs from the filled one's.
        const [open, filled] = screen
            .getAllByTestId("polar-graph__locked-figure")
            // eslint-disable-next-line testing-library/no-node-access
            .map((figure) => figure.querySelector("circle"));
        expect(open?.getAttribute("style")).toContain(
            `fill: ${semanticColor.core.background.base.default}`,
        );
        expect(filled?.getAttribute("style")).toContain(
            `fill: ${lockedFigureColors.green}`,
        );
    });

    it("draws nothing for a locked figure with no coordinates", () => {
        // Arrange, Act: hand-written content can leave the coords out.
        renderQuestion(
            generatePolarGraphQuestion({
                lockedFigures: [
                    generatePolarGraphLockedFigure(
                        generatePolarGraphPointGraph(),
                    ),
                ],
                correct: generatePolarGraphPointGraph({coords: [[1, 0]]}),
            }),
        );

        // Assert: no image with an empty name reaches the learner.
        expect(
            screen.queryByTestId("polar-graph__locked-figure"),
        ).not.toBeInTheDocument();
    });

    it("keeps labels in the names but off the graph when not shown", () => {
        // Arrange, Act
        renderQuestion(
            generatePolarGraphQuestion({
                correct: generatePolarGraphPointGraph({
                    numPoints: 2,
                    pointLabels: ["A", ""],
                    showPointLabels: false,
                    coords: [
                        [3, 0],
                        [0, 2],
                    ],
                }),
            }),
        );

        // Assert: an empty label falls back to the point's number.
        expect(
            screen.getByRole("button", {name: /^Point A/}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: /^Point 2/}),
        ).toBeInTheDocument();
        expect(screen.queryByText("A")).not.toBeInTheDocument();
    });

    it("takes labels from the author's settings, not the saved answer", () => {
        // Arrange, Act: a saved answer with no labels in it.
        renderQuestion(labeledPoints, {
            initialUserInput: {
                "polar-graph 1": {
                    type: "point",
                    numPoints: 2,
                    coords: [
                        [3, 0],
                        [0, 2],
                    ],
                },
            },
        });

        // Assert
        expect(
            screen.getByRole("button", {name: /^Point A at radius 3/}),
        ).toBeInTheDocument();
    });
});
