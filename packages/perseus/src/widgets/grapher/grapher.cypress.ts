import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";

import renderQuestionWithCypress from "../../../../../testing/render-question-with-cypress";
import {cypressTestDependencies} from "../../../../../testing/test-dependencies";
import * as Perseus from "../../index";
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
const GRAPHIE =
    ".perseus-widget-grapher > .graphie-container > .graphie-container > .graphie";
const POINTS =
    "[data-interactive-kind-for-testing=movable-point] > svg > ellipse";
const LINES = "[data-interactive-kind-for-testing=movable-line] > svg > path";

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
                    cy.get(GRAPHIE)
                        .should("exist")
                        .then((node) => {
                            const {left, top} = node[0].getBoundingClientRect();
                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 360, y: top + 180});
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 340, y: top + 140});
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
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
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
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
                    cy.get(GRAPHIE)
                        .should("exist")
                        .then((node) => {
                            const {left, top} = node[0].getBoundingClientRect();
                            cy.get(LINES)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 200, y: top + 75});
                            // [0, 3],
                            // [1, -1],
                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 200, y: top + 120});
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 225, y: top + 225});
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
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
                            cy.get(LINES)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 200, y: top + 200});
                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 25, y: top + 25});
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 200, y: top + 200});
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
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
                    cy.get(GRAPHIE)
                        .should("exist")
                        .then((node) => {
                            const {left, top} = node[0].getBoundingClientRect();
                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 200, y: top + 100});
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 260, y: top + 200});
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
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
                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 100, y: top + 100});
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 300, y: top + 300});
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
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
                    cy.get(GRAPHIE)
                        .should("exist")
                        .then((node) => {
                            const {left, top} = node[0].getBoundingClientRect();
                            // Move the Asymptote to x=-6
                            cy.get(LINES)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({
                                    x: left + 50,
                                    y: top + 200, // It's a vertical line, so this doesn't matter much
                                });
                            // Move point A
                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({
                                    x: left + 100,
                                    y: top + 275,
                                });
                            // Move point B
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({
                                    x: left + 75,
                                    y: top + 375,
                                });
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
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
                            // Move the Asymptote to x=-6
                            cy.get(LINES)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({
                                    x: left + 50,
                                    y: top + 200, // It's a vertical line, so this doesn't matter much
                                });
                            // Move point A
                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({
                                    x: left + 225,
                                    y: top + 125,
                                });
                            // Move point B
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({
                                    x: left + 100,
                                    y: top + 300,
                                });
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
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
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
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
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
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
                    cy.get(GRAPHIE)
                        .should("exist")
                        .then((node) => {
                            const {left, top} = node[0].getBoundingClientRect();

                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 220, y: top + 140});
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 200, y: top + 220});
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
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

                            cy.get(POINTS)
                                .eq(0)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 100, y: top + 140});
                            cy.get(POINTS)
                                .eq(1)
                                .should("exist")
                                // @ts-expect-error - TS2339 - Property 'dragTo' does not exist on type 'Chainable<JQuery<HTMLElement>>'.
                                .dragTo({x: left + 200, y: top + 220});
                        });

                    // Assert
                    cy.then(() => {
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
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
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 1,
                            total: 1,
                            message: null,
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
                        const userInput = getRenderer().getUserInput();
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            userInput,
                        );
                        expect(score).toStrictEqual({
                            type: "points",
                            earned: 0,
                            total: 1,
                            message: null,
                        });
                    });
                });
            });
        });
    });
});
