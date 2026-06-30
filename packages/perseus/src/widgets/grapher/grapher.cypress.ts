import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";

import * as Perseus from "../../index";
import renderQuestionWithCypress from "../../testing/render-question-with-cypress";
import {cypressTestDependencies} from "../../testing/test-dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";

import {
    absoluteValueQuestion,
    exponentialQuestion,
    linearQuestion,
    logarithmQuestion,
    quadraticQuestion,
    sinusoidQuestion,
    multipleAvailableTypesQuestion,
} from "./grapher.testdata";

// NOTE(jeremy): Careful. This selector _excludes_ other `.graphie` elements
// (which might be rendered by the SvgImage component if the image is itself a
// graphie image). This can lead to there being two `.graphie` matches in the
// DOM. If we use the wrong one, all of our click and drag coordinates are
// wrong.
//
// These legacy selectors are only used by the quadratic and complex graph
// blocks, which still render the old Graphie grapher. Graphers with a single
// non-quadratic available type render as a Mafs Interactive Graph instead and
// are driven by the keyboard helpers below.
const GRAPHIE =
    ".perseus-widget-grapher > .graphie-container > .graphie-container > .graphie";
const POINTS =
    "[data-interactive-kind-for-testing=movable-point] > svg > ellipse";

// --- Interactive Graph (Mafs) keyboard helpers --------------------------
//
// A grapher with a single non-quadratic available type now renders as a
// Mafs Interactive Graph. Its handles are keyboard-driven: focus a handle and
// press an arrow key to move it one grid unit (every question here uses
// snapStep [1, 1]). Each handle's aria-label encodes its live coordinates, so
// we read the label, compare it to the target, and press the appropriate arrow
// key until they match. Driving movement in grid units (rather than pixels)
// keeps these tests deterministic.
const POINT_HANDLE = "[data-testid=movable-point__focusable-handle]";
const ASYMPTOTE_HANDLE = "[data-testid=movable-asymptote]";

type Coords = {x: number; y: number};

// Pulls the "... at X comma Y." coordinates out of a point handle's aria-label
// (e.g. "Vertex point at 8 comma 1." or "Point 1 at -5 comma 5.").
function parsePointCoords(ariaLabel: string): Coords {
    const match = ariaLabel.match(
        /at (-?\d+(?:\.\d+)?) comma (-?\d+(?:\.\d+)?)/,
    );
    if (!match) {
        throw new Error(`Could not parse coordinates from "${ariaLabel}"`);
    }
    return {x: Number(match[1]), y: Number(match[2])};
}

// Pulls the "... equals N" value out of an asymptote handle's aria-label
// (e.g. "Horizontal asymptote at y equals 5").
function parseAsymptoteValue(ariaLabel: string): number {
    const match = ariaLabel.match(/equals (-?\d+(?:\.\d+)?)/);
    if (!match) {
        throw new Error(`Could not parse asymptote from "${ariaLabel}"`);
    }
    return Number(match[1]);
}

// A safety bound on arrow presses so a move that fails to converge fails the
// test quickly instead of looping forever.
const MAX_PRESSES = 80;

// Moves the point handle at `index` (DOM order) to `target` by reading its
// live aria-label and pressing one arrow key per step. We adjust y first, then
// x; some graphs skip an extra grid step to avoid landing both points on the
// same x, so we re-read the label after every press rather than assuming a
// fixed step size.
function movePointTo(index: number, target: Coords): void {
    const handle = () => cy.get(POINT_HANDLE).eq(index);

    function step(remaining: number): void {
        if (remaining <= 0) {
            throw new Error(
                `Point ${index} never reached (${target.x}, ${target.y})`,
            );
        }
        handle().then(($el) => {
            const {x, y} = parsePointCoords($el.attr("aria-label") ?? "");
            if (x === target.x && y === target.y) {
                return;
            }
            // Directly focus the SVG handle (Cypress's .focus() rejects SVG
            // elements), then send an OS-level key event via cypress-real-events
            // so it reliably reaches @use-gesture's keyboard listeners.
            $el[0].focus();
            const key =
                y !== target.y
                    ? y < target.y
                        ? "ArrowUp"
                        : "ArrowDown"
                    : x < target.x
                      ? "ArrowRight"
                      : "ArrowLeft";
            cy.realPress(key);
            step(remaining - 1);
        });
    }

    step(MAX_PRESSES);
}

// Moves the asymptote handle to `target`. A horizontal asymptote (exponential)
// moves vertically; a vertical asymptote (logarithm) moves horizontally.
function moveAsymptoteTo(
    target: number,
    orientation: "horizontal" | "vertical",
): void {
    const handle = () => cy.get(ASYMPTOTE_HANDLE);

    function step(remaining: number): void {
        if (remaining <= 0) {
            throw new Error(`Asymptote never reached ${target}`);
        }
        handle().then(($el) => {
            const current = parseAsymptoteValue($el.attr("aria-label") ?? "");
            if (current === target) {
                return;
            }
            $el[0].focus();
            const key =
                orientation === "horizontal"
                    ? current < target
                        ? "ArrowUp"
                        : "ArrowDown"
                    : current < target
                      ? "ArrowRight"
                      : "ArrowLeft";
            cy.realPress(key);
            step(remaining - 1);
        });
    }

    step(MAX_PRESSES);
}

// Waits for the Mafs Interactive Graph to finish rendering before interacting.
function waitForInteractiveGraph(): void {
    cy.get(POINT_HANDLE).should("exist");
}

describe("Grapher widget", () => {
    beforeEach(() => {
        Perseus.init();
        Perseus.Dependencies.setDependencies(cypressTestDependencies);
    });

    describe("absolute value graph", () => {
        const answerful = generateTestPerseusItem({
            question: absoluteValueQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        it("should not have answerful data in answerless item", () => {
            cy.wrap(answerless.question.widgets["grapher 1"].options).should(
                "not.have.property",
                "correct",
            );
        });

        const data = [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ];

        data.forEach((d) => {
            const {name, item} = d;

            describe(name, () => {
                it("should be correctly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    // correct: vertex (8, 1), point on arm (7, 3)
                    waitForInteractiveGraph();
                    movePointTo(0, {x: 8, y: 1});
                    movePointTo(1, {x: 7, y: 3});

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 1,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });

                it("should be incorrectly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    // A valid absolute value, but not the correct answer.
                    waitForInteractiveGraph();
                    movePointTo(0, {x: 0, y: 2});
                    movePointTo(1, {x: 1, y: 4});

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 0,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });
            });
        });
    });

    describe("exponential graph", () => {
        const answerful = generateTestPerseusItem({
            question: exponentialQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        it("should not have answerful data in answerless item", () => {
            cy.wrap(answerless.question.widgets["grapher 1"].options).should(
                "not.have.property",
                "correct",
            );
        });

        const data = [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ];

        data.forEach((d) => {
            const {name, item} = d;

            describe(name, () => {
                it("should be correctly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    // correct: asymptote y = 5, point 1 (0, 3), point 2 (1, -1)
                    waitForInteractiveGraph();
                    moveAsymptoteTo(5, "horizontal");
                    movePointTo(0, {x: 0, y: 3});
                    movePointTo(1, {x: 1, y: -1});

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 1,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });

                it("should be incorrectly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    // A valid exponential, but with the wrong asymptote (y = 4).
                    waitForInteractiveGraph();
                    moveAsymptoteTo(4, "horizontal");
                    movePointTo(0, {x: 0, y: 3});
                    movePointTo(1, {x: 1, y: -1});

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 0,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });
            });
        });
    });

    describe("linear graph", () => {
        const answerful = generateTestPerseusItem({
            question: linearQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        it("should not have answerful data in answerless item", () => {
            cy.wrap(answerless.question.widgets["grapher 1"].options).should(
                "not.have.property",
                "correct",
            );
        });

        const data = [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ];

        data.forEach((d) => {
            const {name, item} = d;

            describe(name, () => {
                it("should be correctly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    // correct: (0, 5) and (3, 0)
                    waitForInteractiveGraph();
                    movePointTo(0, {x: 0, y: 5});
                    movePointTo(1, {x: 3, y: 0});

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 1,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });

                it("should be incorrectly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    // A valid line, but not the correct answer.
                    waitForInteractiveGraph();
                    movePointTo(0, {x: 0, y: 4});
                    movePointTo(1, {x: 3, y: 1});

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 0,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });
            });
        });
    });

    describe("logarithm graph", () => {
        const answerful = generateTestPerseusItem({
            question: logarithmQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        it("should not have answerful data in answerless item", () => {
            cy.wrap(answerless.question.widgets["grapher 1"].options).should(
                "not.have.property",
                "correct",
            );
        });

        const data = [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ];

        data.forEach((d) => {
            const {name, item} = d;

            describe(name, () => {
                it("should be correctly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    // correct: vertical asymptote x = -6, point 1 (-4, -3),
                    // point 2 (-5, -7)
                    waitForInteractiveGraph();
                    moveAsymptoteTo(-6, "vertical");
                    movePointTo(0, {x: -4, y: -3});
                    movePointTo(1, {x: -5, y: -7});

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 1,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });

                it("should be incorrectly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    // A valid logarithm, but with the wrong asymptote (x = -5).
                    waitForInteractiveGraph();
                    moveAsymptoteTo(-5, "vertical");
                    movePointTo(0, {x: -4, y: -3});
                    movePointTo(1, {x: -5, y: -7});

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 0,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });
            });
        });
    });

    describe("quadratic graph", () => {
        const answerful = generateTestPerseusItem({
            question: quadraticQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        it("should not have answerful data in answerless item", () => {
            cy.wrap(answerless.question.widgets["grapher 1"].options).should(
                "not.have.property",
                "correct",
            );
        });

        const data = [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ];

        data.forEach((d) => {
            const {name, item} = d;

            describe(name, () => {
                it("should be correctly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    cy.get(GRAPHIE)
                        .should("exist")
                        .then((node) => {
                            const {left, top} = node[0].getBoundingClientRect();
                            // Move point A
                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 260, y: top + 360});
                            // Move point B
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 220, y: top + 200});
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 1,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });

                it("should be incorrectly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    cy.get(GRAPHIE)
                        .should("exist")
                        .then((node) => {
                            const {left, top} = node[0].getBoundingClientRect();
                            // Move point A
                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 50, y: top + 50});
                            // Move point B
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 200, y: top + 300});
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 0,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });
            });
        });
    });

    describe("sinusoid graph", () => {
        const answerful = generateTestPerseusItem({
            question: sinusoidQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        it("should not have answerful data in answerless item", () => {
            cy.wrap(answerless.question.widgets["grapher 1"].options).should(
                "not.have.property",
                "correct",
            );
        });

        const data = [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ];

        data.forEach((d) => {
            const {name, item} = d;

            describe(name, () => {
                it("should be correctly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    // correct: midline intersection (1, 3), extremum (0, -1)
                    waitForInteractiveGraph();
                    movePointTo(0, {x: 1, y: 3});
                    movePointTo(1, {x: 0, y: -1});

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 1,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });

                it("should be incorrectly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    // A valid sinusoid, but not the correct answer.
                    waitForInteractiveGraph();
                    movePointTo(0, {x: 2, y: 3});
                    movePointTo(1, {x: 1, y: -1});

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 0,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });
            });
        });
    });

    describe("complex graph question", () => {
        const answerful = generateTestPerseusItem({
            question: multipleAvailableTypesQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        it("should not have answerful data in answerless item", () => {
            cy.wrap(answerless.question.widgets["grapher 1"].options).should(
                "not.have.property",
                "correct",
            );
        });

        const data = [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ];

        data.forEach((d) => {
            const {name, item} = d;

            describe(name, () => {
                it("should be correctly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    cy.get("button[title=Absolute_value]").click();

                    cy.get(GRAPHIE)
                        .should("exist")
                        .then((node) => {
                            const rect = node[0].getBoundingClientRect();
                            const left = rect.left + window.scrollX;
                            const top = rect.top + window.scrollY;

                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 220, y: top + 260});
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 200, y: top + 200});
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 1,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });

                it("should be incorrectly answerable", () => {
                    // Arrange
                    const getRenderer = renderQuestionWithCypress(
                        item.question,
                    );

                    // Act
                    cy.get("button[title=Absolute_value]").click();

                    cy.get(GRAPHIE)
                        .should("exist")
                        .then((node) => {
                            const rect = node[0].getBoundingClientRect();
                            const left = rect.left + window.scrollX;
                            const top = rect.top + window.scrollY;

                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 200, y: top + 200});
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 100, y: top + 100});
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInputMap();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
                            widgetScores: {
                                "grapher 1": {
                                    type: "points",
                                    earned: 0,
                                    total: 1,
                                    message: null,
                                },
                            },
                        });
                    });
                });
            });
        });
    });
});
