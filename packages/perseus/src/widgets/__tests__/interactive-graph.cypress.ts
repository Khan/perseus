import renderQuestion from "../../../../../testing/render-question-with-cypress";
import {cypressTestDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import * as Perseus from "../../index";
import {
    questionsAndAnswers,
    angleQuestion,
    circleQuestion,
    linearQuestion,
    linearSystemQuestion,
    pointQuestion,
    rayQuestion,
    segmentQuestion,
    sinusoidQuestion,
} from "../__testdata__/interactive-graph.testdata";

// NOTE(jeremy): Careful. This selector _excludes_ other `.graphie` elements
// (which might be rendered by the SvgImage component if the image is itself a
// graphie image). This can lead to there being two `.graphie` matches in the
// DOM. If we use the wrong one, all of our click and drag coordinates are
// wrong.
const GRAPHIE =
    ".perseus-widget-interactive-graph > .graphie-container > .graphie";
const POINTS =
    "[data-interactive-kind-for-testing=movable-point] > svg > ellipse";
const CIRCLES = "svg > circle";

describe("Interactive graph", () => {
    beforeEach(() => {
        Dependencies.setDependencies(cypressTestDependencies);
        Perseus.init({skipMathJax: true});
    });

    describe("angle graph", () => {
        it("should be correctly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(angleQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    // Move vertex to "A"
                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: left + 160, y: top + 240});

                    // Move first ray to point B
                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: left + 300, y: top + 100});

                    // Move second ray to top-left dot
                    cy.get(POINTS)
                        .eq(2)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: left + 70, y: top + 35});
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                });
            });
        });

        it("should be incorrectly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(angleQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    // Move vertex to "A"
                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: left + 0, y: top + 240});

                    // Move first ray to top-left black dot
                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: left + 300, y: top + 120});

                    // Move second ray to point through B
                    cy.get(POINTS)
                        .eq(2)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: left + 70, y: top + 0});
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 0,
                    total: 1,
                    message: null,
                });
            });
        });
    });

    describe("circle graph", () => {
        it("should be correctly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(circleQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    // Move the center point
                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: left + 160, y: top + 280});

                    // Resize the circle
                    cy.get(CIRCLES)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: left + 160, y: top + 320});
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                });
            });
        });

        it("should be incorrectly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(circleQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    // Move the center point
                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: left + 160, y: top + 280});

                    // Resize the circle
                    cy.get(CIRCLES)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: left + 160, y: top + 390});
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 0,
                    total: 1,
                    message: null,
                });
            });
        });
    });

    describe("linear graph", () => {
        const grid = 20;
        const topOffset = 0;

        it("should be correctly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(linearQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (-1 + 10) * grid,
                            y: top + topOffset + Math.abs(1 + 10 - 20) * grid,
                        });
                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (0 + 10) * grid,
                            y: top + topOffset + Math.abs(-2 + 10 - 20) * grid,
                        });
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                });
            });
        });

        it("should be incorrectly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(linearQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + grid * 1,
                            y: top + topOffset + grid * 1,
                        });
                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + grid * 1,
                            y: top + topOffset + grid * 19,
                        });
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 0,
                    total: 1,
                    message: null,
                });
            });
        });
    });

    describe("linear-system graph", () => {
        const grid = 20;

        it("should be correctly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(linearSystemQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    // Move the to point A
                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (-7 + 10) * grid,
                            y: top + Math.abs(7 + 10 - 20) * grid,
                        });

                    // Move the to point B
                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (0 + 10) * grid,
                            y: top + Math.abs(-2 + 10 - 20) * grid,
                        });

                    // // Move the to point C
                    cy.get(POINTS)
                        .eq(2)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (-3 + 10) * grid,
                            y: top + Math.abs(-7 + 10 - 20) * grid,
                        });

                    // // Move the to point D
                    cy.get(POINTS)
                        .eq(3)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (7 + 10) * grid,
                            y: top + Math.abs(-3 + 10 - 20) * grid,
                        });
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                });
            });
        });

        it("should be incorrectly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(linearSystemQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    // Move the to point A
                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (-9 + 10) * grid,
                            y: top + Math.abs(9 + 10 - 20) * grid,
                        });

                    // Move the to point B
                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (9 + 10) * grid,
                            y: top + Math.abs(9 + 10 - 20) * grid,
                        });

                    // // Move the to point C
                    cy.get(POINTS)
                        .eq(2)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (-9 + 10) * grid,
                            y: top + Math.abs(-9 + 10 - 20) * grid,
                        });

                    // // Move the to point D
                    cy.get(POINTS)
                        .eq(3)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (9 + 10) * grid,
                            y: top + Math.abs(-9 + 10 - 20) * grid,
                        });
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 0,
                    total: 1,
                    message: null,
                });
            });
        });
    });

    describe("point graph", () => {
        const grid = 50;

        it("should be correctly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(pointQuestion);

            // Act
            cy.get(".graphie > svg > rect")
                .first()
                .should("exist")
                .click((0 + 4) * grid, 4 * grid)
                .click((-2.5 + 4) * grid, 4 * grid)
                .click((-1 + 4) * grid, 4 * grid);

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                });
            });
        });

        it("should be incorrectly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(pointQuestion);

            // Act
            cy.get(GRAPHIE).then((node) => {
                cy.get(".graphie > svg > rect")
                    .first()
                    .should("exist")
                    .click((-3 + 4) * grid, Math.abs(-3 + 4 - 8) * grid)
                    .click((0 + 4) * grid, Math.abs(0 + 4 - 8) * grid)
                    .click((3 + 4) * grid, Math.abs(3 + 4 - 8) * grid);
            });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 0,
                    total: 1,
                    message: null,
                });
            });
        });
    });

    describe("polygon graph", () => {
        const grid = 55;

        it("should be correctly answerable", () => {
            /** Arrange */
            const question = questionsAndAnswers[0][0];
            const getRenderer = renderQuestion(question);

            /** Act */
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    // We're dragging the three points to form a 3/4/5 triangle
                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: 92, y: 126});
                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: 92, y: 298});
                    cy.get(POINTS)
                        .eq(2)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: 320, y: 298});
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                });
            });
        });

        it("should be incorrectly answerable", () => {
            /** Arrange */
            const question = questionsAndAnswers[0][0];
            const getRenderer = renderQuestion(question);

            /** Act */
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    // const {left, top} = node.position();
                    const {left, top} = node[0].getBoundingClientRect();
                    const x = left + 20;
                    const y = top + 20;
                    // If one point is off, it won't work
                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: x + grid * 2, y: y});

                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: x, y: y + grid * 3});

                    cy.get(POINTS)
                        .eq(2)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({x: x + grid * 4, y: y + grid * 3});
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 0,
                    total: 1,
                    message: null,
                });
            });
        });
    });

    describe("ray graph", () => {
        const grid = 20;

        it("should be correctly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(rayQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (5 + 10) * grid,
                            y: top + Math.abs(3 + 10 - 20) * grid,
                        });

                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (-5 + 10) * grid,
                            y: top + Math.abs(-5 + 10 - 20) * grid,
                        });
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                });
            });
        });

        it("should be incorrectly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(rayQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    // Reversed direction
                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (7 + 10) * grid,
                            y: top + Math.abs(-7 + 10 - 20) * grid,
                        });

                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (3 + 10) * grid,
                            y: top + Math.abs(3 + 10 - 20) * grid,
                        });
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 0,
                    total: 1,
                    message: null,
                });
            });
        });
    });

    describe("segment graph", () => {
        const grid = 20;

        it("should be correctly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(segmentQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (-7 + 10) * grid,
                            y: top + Math.abs(7 + 10 - 20) * grid,
                        });

                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (2 + 10) * grid,
                            y: top + Math.abs(5 + 10 - 20) * grid,
                        });
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                });
            });
        });

        it("should be incorrectly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(segmentQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (8 + 10) * grid,
                            y: top + Math.abs(2 + 10 - 20) * grid,
                        });

                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (8 + 10) * grid,
                            y: top + Math.abs(-8 + 10 - 20) * grid,
                        });
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 0,
                    total: 1,
                    message: null,
                });
            });
        });
    });

    describe("sinusoid graph", () => {
        const grid = 20;

        it("should be correctly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(sinusoidQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (1 + 10) * grid,
                            y: top + Math.abs(2 + 10 - 20) * grid,
                        });

                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (1.5 + 10) * grid,
                            y: top + Math.abs(5 + 10 - 20) * grid,
                        });
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 1,
                    total: 1,
                    message: null,
                });
            });
        });

        it("should be incorrectly answerable", () => {
            // Arrange
            const getRenderer = renderQuestion(sinusoidQuestion);

            // Act
            cy.get(GRAPHIE)
                .should("exist")
                .then((node) => {
                    const {left, top} = node[0].getBoundingClientRect();

                    cy.get(POINTS)
                        .eq(0)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (0 + 10) * grid,
                            y: top + Math.abs(0 + 10 - 20) * grid,
                        });

                    cy.get(POINTS)
                        .eq(1)
                        .should("exist")
                        // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                        .dragTo({
                            x: left + (5 + 10) * grid,
                            y: top + Math.abs(9 + 10 - 20) * grid,
                        });
                });

            // Assert
            cy.then(() => {
                const state = getRenderer().guessAndScore();
                expect(state[1]).toStrictEqual({
                    type: "points",
                    earned: 0,
                    total: 1,
                    message: null,
                });
            });
        });
    });
});
