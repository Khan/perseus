import {expect, test} from "@internal/playwright";
import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";

import renderQuestion from "../../testing/playwright/render-question";
import {scorePerseusItemTesting} from "../../util/scoring.testutils";

import {
    absoluteValueQuestion,
    exponentialQuestion,
    linearQuestion,
    logarithmQuestion,
    quadraticQuestion,
    sinusoidQuestion,
    multipleAvailableTypesQuestion,
} from "./grapher.testdata";

import type {RenderedQuestion} from "../../testing/playwright/render-question";
import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Locator} from "@playwright/test";

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

type Coords = {x: number; y: number};

// Drags the legacy Graphie point at `index` (DOM order) to `offset`, measured
// from the top-left corner of the graph, by replaying the mouse events
// Graphie listens for.
async function dragPointTo(
    {component, userInputField}: RenderedQuestion,
    index: number,
    offset: Coords,
): Promise<void> {
    const page = component.page();
    const graphBox = await component.locator(GRAPHIE).boundingBox();
    const pointBox = await component.locator(POINTS).nth(index).boundingBox();
    if (!graphBox || !pointBox) {
        throw new Error(`Graph or point ${index} is not visible`);
    }
    const userInput = await userInputField.inputValue();

    await page.mouse.move(
        pointBox.x + pointBox.width / 2,
        pointBox.y + pointBox.height / 2,
    );
    await page.mouse.down();
    await page.mouse.move(graphBox.x + offset.x, graphBox.y + offset.y);
    await page.mouse.up();

    // Graphie reports the drag through handleUserInput, which reaches the
    // user input a render later.
    await expect(userInputField).not.toHaveValue(userInput);
}

// --- Interactive Graph (Mafs) keyboard helpers --------------------------
//
// A grapher with a single non-quadratic available type now renders as a
// Mafs Interactive Graph. The Interactive Graph widget is accessible, so
// these tests are keyboard-driven: we focus a handle and press an arrow key
// to move it one grid unit (every question here uses snapStep [1, 1]). Each
// handle's aria-label encodes its coordinates, so we read the label, compare
// it to the target, and press the appropriate arrow key until they match.
const POINT_HANDLE = "[data-testid=movable-point__focusable-handle]";
const ASYMPTOTE_HANDLE = "[data-testid=movable-asymptote]";

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

// Focuses `handle` and presses the arrow key that `chooseKey` picks from its
// current aria-label, until `chooseKey` returns null (the handle is where we
// want it). We re-read the label after every press rather than assuming a
// fixed step size: some graphs skip an extra grid step to avoid landing both
// points on the same x.
async function pressArrowsUntil(
    handle: Locator,
    userInputField: Locator,
    chooseKey: (ariaLabel: string) => string | null,
    describeTarget: string,
): Promise<void> {
    for (let i = 0; i < MAX_PRESSES; i++) {
        const label = (await handle.getAttribute("aria-label")) ?? "";
        const key = chooseKey(label);
        if (key == null) {
            return;
        }
        const userInput = await userInputField.inputValue();
        await handle.focus();
        await handle.page().keyboard.press(key);
        // Each press moves the handle, so wait for both of the updates it
        // causes. The graph re-renders the handle (and its label) with the
        // new position first, and only then, in an effect, reports the move
        // through handleUserInput, which updates the user input.
        await expect(handle).not.toHaveAttribute("aria-label", label);
        await expect(userInputField).not.toHaveValue(userInput);
    }
    throw new Error(`${describeTarget} never reached its target`);
}

// Moves the point handle at `index` (DOM order) to `target`, adjusting y
// first, then x.
async function movePointTo(
    {component, userInputField}: RenderedQuestion,
    index: number,
    target: Coords,
): Promise<void> {
    await pressArrowsUntil(
        component.locator(POINT_HANDLE).nth(index),
        userInputField,
        (label) => {
            const {x, y} = parsePointCoords(label);
            if (y !== target.y) {
                return y < target.y ? "ArrowUp" : "ArrowDown";
            }
            if (x !== target.x) {
                return x < target.x ? "ArrowRight" : "ArrowLeft";
            }
            return null;
        },
        `Point ${index} (${target.x}, ${target.y})`,
    );
}

// Moves the asymptote handle to `target`. A horizontal asymptote (exponential)
// moves vertically; a vertical asymptote (logarithm) moves horizontally.
async function moveAsymptoteTo(
    {component, userInputField}: RenderedQuestion,
    target: number,
    orientation: "horizontal" | "vertical",
): Promise<void> {
    await pressArrowsUntil(
        component.locator(ASYMPTOTE_HANDLE),
        userInputField,
        (label) => {
            const current = parseAsymptoteValue(label);
            if (current === target) {
                return null;
            }
            if (orientation === "horizontal") {
                return current < target ? "ArrowUp" : "ArrowDown";
            }
            return current < target ? "ArrowRight" : "ArrowLeft";
        },
        `Asymptote (${target})`,
    );
}

// Picks one of the graph types offered by a grapher with more than one
// available type.
async function pickGraphType(
    {component, userInputField}: RenderedQuestion,
    type: string,
): Promise<void> {
    const userInput = await userInputField.inputValue();
    await component.locator(`button[title="${type}"]`).click();
    // Picking a type changes the user input too. Wait for that, so that it
    // can't be mistaken for the update from the next interaction.
    await expect(userInputField).not.toHaveValue(userInput);
}

type GraphCase = {
    name: string;
    question: PerseusRenderer;
    // Moves the graph's controls to a correct answer...
    answerCorrectly: (question: RenderedQuestion) => Promise<void>;
    // ...and to a valid but incorrect one.
    answerIncorrectly: (question: RenderedQuestion) => Promise<void>;
};

const graphCases: ReadonlyArray<GraphCase> = [
    {
        name: "absolute value graph",
        question: absoluteValueQuestion,
        answerCorrectly: async (question) => {
            // correct: vertex (8, 1), point on arm (7, 3)
            await movePointTo(question, 0, {x: 8, y: 1});
            await movePointTo(question, 1, {x: 7, y: 3});
        },
        answerIncorrectly: async (question) => {
            // A valid absolute value, but not the correct answer.
            await movePointTo(question, 0, {x: 0, y: 2});
            await movePointTo(question, 1, {x: 1, y: 4});
        },
    },
    {
        name: "exponential graph",
        question: exponentialQuestion,
        answerCorrectly: async (question) => {
            // correct: asymptote y = 5, point 1 (0, 3), point 2 (1, -1)
            await moveAsymptoteTo(question, 5, "horizontal");
            await movePointTo(question, 0, {x: 0, y: 3});
            await movePointTo(question, 1, {x: 1, y: -1});
        },
        answerIncorrectly: async (question) => {
            // A valid exponential, but with the wrong asymptote (y = 4).
            await moveAsymptoteTo(question, 4, "horizontal");
            await movePointTo(question, 0, {x: 0, y: 3});
            await movePointTo(question, 1, {x: 1, y: -1});
        },
    },
    {
        name: "linear graph",
        question: linearQuestion,
        answerCorrectly: async (question) => {
            // correct: (0, 5) and (3, 0)
            await movePointTo(question, 0, {x: 0, y: 5});
            await movePointTo(question, 1, {x: 3, y: 0});
        },
        answerIncorrectly: async (question) => {
            // A valid line, but not the correct answer.
            await movePointTo(question, 0, {x: 0, y: 4});
            await movePointTo(question, 1, {x: 3, y: 1});
        },
    },
    {
        name: "logarithm graph",
        question: logarithmQuestion,
        answerCorrectly: async (question) => {
            // correct: vertical asymptote x = -6, point 1 (-4, -3),
            // point 2 (-5, -7)
            await moveAsymptoteTo(question, -6, "vertical");
            await movePointTo(question, 0, {x: -4, y: -3});
            await movePointTo(question, 1, {x: -5, y: -7});
        },
        answerIncorrectly: async (question) => {
            // A valid logarithm, but with the wrong asymptote (x = -5).
            await moveAsymptoteTo(question, -5, "vertical");
            await movePointTo(question, 0, {x: -4, y: -3});
            await movePointTo(question, 1, {x: -5, y: -7});
        },
    },
    {
        name: "quadratic graph",
        question: quadraticQuestion,
        answerCorrectly: async (question) => {
            // Move point A
            await dragPointTo(question, 0, {x: 260, y: 360});
            // Move point B
            await dragPointTo(question, 1, {x: 220, y: 200});
        },
        answerIncorrectly: async (question) => {
            // Move point A
            await dragPointTo(question, 0, {x: 50, y: 50});
            // Move point B
            await dragPointTo(question, 1, {x: 200, y: 300});
        },
    },
    {
        name: "sinusoid graph",
        question: sinusoidQuestion,
        answerCorrectly: async (question) => {
            // correct: midline intersection (1, 3), extremum (0, -1)
            await movePointTo(question, 0, {x: 1, y: 3});
            await movePointTo(question, 1, {x: 0, y: -1});
        },
        answerIncorrectly: async (question) => {
            // A valid sinusoid, but not the correct answer.
            await movePointTo(question, 0, {x: 2, y: 3});
            await movePointTo(question, 1, {x: 1, y: -1});
        },
    },
    {
        name: "complex graph question",
        question: multipleAvailableTypesQuestion,
        // The graph is 20px per unit, with the origin at (200, 200).
        answerCorrectly: async (question) => {
            await pickGraphType(question, "Absolute_value");
            // correct: vertex (1, -3), point on arm (0, 0)
            await dragPointTo(question, 0, {x: 220, y: 260});
            await dragPointTo(question, 1, {x: 200, y: 200});
        },
        answerIncorrectly: async (question) => {
            await pickGraphType(question, "Absolute_value");
            // A valid absolute value, but not the correct answer: vertex
            // (2, 2), point on arm (-5, 5).
            await dragPointTo(question, 0, {x: 240, y: 160});
            await dragPointTo(question, 1, {x: 100, y: 100});
        },
    },
];

test.describe("Grapher widget", () => {
    for (const graphCase of graphCases) {
        test.describe(graphCase.name, () => {
            const answerful = generateTestPerseusItem({
                question: graphCase.question,
            });
            const answerless = splitPerseusItem(answerful);

            test("should not have answerful data in answerless item", () => {
                expect(
                    answerless.question.widgets["grapher 1"].options,
                ).not.toHaveProperty("correct");
            });

            const data = [
                {name: "answerful", item: answerful},
                {name: "answerless", item: answerless},
            ];

            for (const {name, item} of data) {
                test.describe(name, () => {
                    test("should be correctly answerable", async ({mount}) => {
                        // Arrange
                        const question = await renderQuestion(
                            mount,
                            item.question,
                        );

                        // Act
                        await graphCase.answerCorrectly(question);

                        // Assert
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            await question.getUserInputMap(),
                        );
                        expect(score).toHaveBeenAnsweredCorrectly();
                    });

                    test("should be incorrectly answerable", async ({
                        mount,
                    }) => {
                        // Arrange
                        const question = await renderQuestion(
                            mount,
                            item.question,
                        );

                        // Act
                        await graphCase.answerIncorrectly(question);

                        // Assert
                        const score = scorePerseusItemTesting(
                            answerful.question,
                            await question.getUserInputMap(),
                        );
                        expect(score).toHaveBeenAnsweredIncorrectly();
                    });
                });
            }
        });
    }
});
