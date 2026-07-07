import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {expect, test} from "@playwright/experimental-ct-react";
import * as React from "react";

import {QuestionRenderer} from "../../testing/render-question-with-playwright";

import {
    absoluteValueQuestion,
    exponentialQuestion,
    linearQuestion,
    logarithmQuestion,
    quadraticQuestion,
    sinusoidQuestion,
    multipleAvailableTypesQuestion,
} from "./grapher.testdata";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Page} from "@playwright/test";

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
// Mafs Interactive Graph. The Interactive Graph widget is accessible, so
// these tests are keyboard-driven: we focus a handle and press an arrow key
// to move it one grid unit (every question here uses snapStep [1, 1]). Each
// handle's aria-label encodes its coordinates, so we read the label, compare
// it to the target, and press the appropriate arrow key until they match.
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
// aria-label and pressing one arrow key per step. We adjust y first, then x;
// some graphs skip an extra grid step to avoid landing both points on the
// same x, so we re-read the label after every press rather than assuming a
// fixed step size.
//
// Unlike the Cypress version (which recursed through queued commands), this is
// a plain async loop: Playwright actions are awaitable, so we can read the
// label, decide the next key, press it, and wait for the label to change
// before looping again.
async function movePointTo(
    page: Page,
    index: number,
    target: Coords,
): Promise<void> {
    const handle = page.locator(POINT_HANDLE).nth(index);

    for (let remaining = MAX_PRESSES; remaining > 0; remaining--) {
        const label = (await handle.getAttribute("aria-label")) ?? "";
        const {x, y} = parsePointCoords(label);
        if (x === target.x && y === target.y) {
            return;
        }
        // Focus the handle, then send an OS-level key event so it reliably
        // reaches @use-gesture's keyboard listeners.
        await handle.focus();
        const key =
            y !== target.y
                ? y < target.y
                    ? "ArrowUp"
                    : "ArrowDown"
                : x < target.x
                  ? "ArrowRight"
                  : "ArrowLeft";
        await page.keyboard.press(key);
        // Wait for the move to register (the aria-label reflects the new
        // position) before reading it again.
        await expect(handle).not.toHaveAttribute("aria-label", label);
    }

    throw new Error(`Point ${index} never reached (${target.x}, ${target.y})`);
}

// Moves the asymptote handle to `target`. A horizontal asymptote (exponential)
// moves vertically; a vertical asymptote (logarithm) moves horizontally.
async function moveAsymptoteTo(
    page: Page,
    target: number,
    orientation: "horizontal" | "vertical",
): Promise<void> {
    const handle = page.locator(ASYMPTOTE_HANDLE);

    for (let remaining = MAX_PRESSES; remaining > 0; remaining--) {
        const label = (await handle.getAttribute("aria-label")) ?? "";
        const current = parseAsymptoteValue(label);
        if (current === target) {
            return;
        }
        await handle.focus();
        const key =
            orientation === "horizontal"
                ? current < target
                    ? "ArrowUp"
                    : "ArrowDown"
                : current < target
                  ? "ArrowRight"
                  : "ArrowLeft";
        await page.keyboard.press(key);
        await expect(handle).not.toHaveAttribute("aria-label", label);
    }

    throw new Error(`Asymptote never reached ${target}`);
}

// Waits for the Mafs Interactive Graph to finish rendering before interacting.
async function waitForInteractiveGraph(page: Page): Promise<void> {
    await expect(page.locator(POINT_HANDLE).first()).toBeAttached();
}

// Clicks `node` and drags it to the given absolute (viewport) coordinates,
// replacing the Cypress `dragTo` custom command used for the Graphie graphers.
async function dragTo(
    page: Page,
    locator: ReturnType<Page["locator"]>,
    target: Coords,
): Promise<void> {
    const box = await locator.boundingBox();
    if (!box) {
        throw new Error("Could not find element to drag");
    }
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(target.x, target.y, {steps: 10});
    await page.mouse.up();
}

// Reads the renderer's current user input from the browser and scores it
// against `question` (which carries the correct answer). Runs in the browser
// via the `window.perseusTest` bridge, so `@khanacademy/perseus-score` stays
// out of the Node test process. The returned score is plain JSON.
//
// Mafs updates a handle's aria-label synchronously as it moves, but Perseus's
// user input propagates asynchronously (handleUserInput -> UserInputManager ->
// re-render). So we first wait for the user input to settle — two consecutive
// identical reads — before scoring, otherwise a score taken immediately after
// the final move can miss the last interaction.
async function scoreCurrentInput(page: Page, question: PerseusRenderer) {
    const readInput = () =>
        page.evaluate(() => {
            if (!globalThis.perseusTest) {
                throw new Error("perseusTest bridge is not available");
            }
            return JSON.stringify(globalThis.perseusTest.getUserInputMap());
        });

    let previous = "";
    await expect
        .poll(
            async () => {
                const current = await readInput();
                const settled = current !== "" && current === previous;
                previous = current;
                return settled;
            },
            {timeout: 6000, intervals: [50, 100, 200, 300]},
        )
        .toBe(true);

    return page.evaluate((q) => {
        if (!globalThis.perseusTest) {
            throw new Error("perseusTest bridge is not available");
        }
        return globalThis.perseusTest.score(q);
    }, question);
}

const correctScore = {
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
} as const;

const incorrectScore = {
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
} as const;

test.describe("Grapher widget", () => {
    test.describe("absolute value graph", () => {
        const answerful = generateTestPerseusItem({
            question: absoluteValueQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        test("should not have answerful data in answerless item", () => {
            // Arrange, Act, Assert
            expect(
                answerless.question.widgets["grapher 1"].options,
            ).not.toHaveProperty("correct");
        });

        for (const {name, item} of [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ]) {
            test.describe(name, () => {
                test("should be correctly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    // correct: vertex (8, 1), point on arm (7, 3)
                    await waitForInteractiveGraph(page);
                    await movePointTo(page, 0, {x: 8, y: 1});
                    await movePointTo(page, 1, {x: 7, y: 3});

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(correctScore);
                });

                test("should be incorrectly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    // A valid absolute value, but not the correct answer.
                    await waitForInteractiveGraph(page);
                    await movePointTo(page, 0, {x: 0, y: 2});
                    await movePointTo(page, 1, {x: 1, y: 4});

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(incorrectScore);
                });
            });
        }
    });

    test.describe("exponential graph", () => {
        const answerful = generateTestPerseusItem({
            question: exponentialQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        test("should not have answerful data in answerless item", () => {
            // Arrange, Act, Assert
            expect(
                answerless.question.widgets["grapher 1"].options,
            ).not.toHaveProperty("correct");
        });

        for (const {name, item} of [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ]) {
            test.describe(name, () => {
                test("should be correctly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    // correct: asymptote y = 5, point 1 (0, 3), point 2 (1, -1)
                    await waitForInteractiveGraph(page);
                    await moveAsymptoteTo(page, 5, "horizontal");
                    await movePointTo(page, 0, {x: 0, y: 3});
                    await movePointTo(page, 1, {x: 1, y: -1});

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(correctScore);
                });

                test("should be incorrectly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    // A valid exponential, but with the wrong asymptote (y = 4).
                    await waitForInteractiveGraph(page);
                    await moveAsymptoteTo(page, 4, "horizontal");
                    await movePointTo(page, 0, {x: 0, y: 3});
                    await movePointTo(page, 1, {x: 1, y: -1});

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(incorrectScore);
                });
            });
        }
    });

    test.describe("linear graph", () => {
        const answerful = generateTestPerseusItem({
            question: linearQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        test("should not have answerful data in answerless item", () => {
            // Arrange, Act, Assert
            expect(
                answerless.question.widgets["grapher 1"].options,
            ).not.toHaveProperty("correct");
        });

        for (const {name, item} of [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ]) {
            test.describe(name, () => {
                test("should be correctly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    // correct: (0, 5) and (3, 0)
                    await waitForInteractiveGraph(page);
                    await movePointTo(page, 0, {x: 0, y: 5});
                    await movePointTo(page, 1, {x: 3, y: 0});

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(correctScore);
                });

                test("should be incorrectly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    // A valid line, but not the correct answer.
                    await waitForInteractiveGraph(page);
                    await movePointTo(page, 0, {x: 0, y: 4});
                    await movePointTo(page, 1, {x: 3, y: 1});

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(incorrectScore);
                });
            });
        }
    });

    test.describe("logarithm graph", () => {
        const answerful = generateTestPerseusItem({
            question: logarithmQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        test("should not have answerful data in answerless item", () => {
            // Arrange, Act, Assert
            expect(
                answerless.question.widgets["grapher 1"].options,
            ).not.toHaveProperty("correct");
        });

        for (const {name, item} of [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ]) {
            test.describe(name, () => {
                test("should be correctly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    // correct: vertical asymptote x = -6, point 1 (-4, -3),
                    // point 2 (-5, -7)
                    await waitForInteractiveGraph(page);
                    await moveAsymptoteTo(page, -6, "vertical");
                    await movePointTo(page, 0, {x: -4, y: -3});
                    await movePointTo(page, 1, {x: -5, y: -7});

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(correctScore);
                });

                test("should be incorrectly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    // A valid logarithm, but with the wrong asymptote (x = -5).
                    await waitForInteractiveGraph(page);
                    await moveAsymptoteTo(page, -5, "vertical");
                    await movePointTo(page, 0, {x: -4, y: -3});
                    await movePointTo(page, 1, {x: -5, y: -7});

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(incorrectScore);
                });
            });
        }
    });

    test.describe("quadratic graph", () => {
        const answerful = generateTestPerseusItem({
            question: quadraticQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        test("should not have answerful data in answerless item", () => {
            // Arrange, Act, Assert
            expect(
                answerless.question.widgets["grapher 1"].options,
            ).not.toHaveProperty("correct");
        });

        for (const {name, item} of [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ]) {
            test.describe(name, () => {
                test("should be correctly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    const graphie = page.locator(GRAPHIE);
                    await expect(graphie).toBeAttached();
                    const box = await graphie.boundingBox();
                    if (!box) {
                        throw new Error("Could not find graphie element");
                    }
                    // Move point A
                    await dragTo(page, page.locator(POINTS).nth(0), {
                        x: box.x + 260,
                        y: box.y + 360,
                    });
                    // Move point B
                    await dragTo(page, page.locator(POINTS).nth(1), {
                        x: box.x + 220,
                        y: box.y + 200,
                    });

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(correctScore);
                });

                test("should be incorrectly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    const graphie = page.locator(GRAPHIE);
                    await expect(graphie).toBeAttached();
                    const box = await graphie.boundingBox();
                    if (!box) {
                        throw new Error("Could not find graphie element");
                    }
                    // Move point A
                    await dragTo(page, page.locator(POINTS).nth(0), {
                        x: box.x + 50,
                        y: box.y + 50,
                    });
                    // Move point B
                    await dragTo(page, page.locator(POINTS).nth(1), {
                        x: box.x + 200,
                        y: box.y + 300,
                    });

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(incorrectScore);
                });
            });
        }
    });

    test.describe("sinusoid graph", () => {
        const answerful = generateTestPerseusItem({
            question: sinusoidQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        test("should not have answerful data in answerless item", () => {
            // Arrange, Act, Assert
            expect(
                answerless.question.widgets["grapher 1"].options,
            ).not.toHaveProperty("correct");
        });

        for (const {name, item} of [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ]) {
            test.describe(name, () => {
                test("should be correctly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    // correct: midline intersection (1, 3), extremum (0, -1)
                    await waitForInteractiveGraph(page);
                    await movePointTo(page, 0, {x: 1, y: 3});
                    await movePointTo(page, 1, {x: 0, y: -1});

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(correctScore);
                });

                test("should be incorrectly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    // A valid sinusoid, but not the correct answer.
                    await waitForInteractiveGraph(page);
                    await movePointTo(page, 0, {x: 2, y: 3});
                    await movePointTo(page, 1, {x: 1, y: -1});

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(incorrectScore);
                });
            });
        }
    });

    test.describe("complex graph question", () => {
        const answerful = generateTestPerseusItem({
            question: multipleAvailableTypesQuestion,
        });
        const answerless = splitPerseusItem(answerful);

        test("should not have answerful data in answerless item", () => {
            // Arrange, Act, Assert
            expect(
                answerless.question.widgets["grapher 1"].options,
            ).not.toHaveProperty("correct");
        });

        for (const {name, item} of [
            {name: "answerful", item: answerful},
            {name: "answerless", item: answerless},
        ]) {
            test.describe(name, () => {
                test("should be correctly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    await page.locator("button[title=Absolute_value]").click();

                    const graphie = page.locator(GRAPHIE);
                    await expect(graphie).toBeAttached();
                    const box = await graphie.boundingBox();
                    if (!box) {
                        throw new Error("Could not find graphie element");
                    }
                    await dragTo(page, page.locator(POINTS).nth(0), {
                        x: box.x + 220,
                        y: box.y + 260,
                    });
                    await dragTo(page, page.locator(POINTS).nth(1), {
                        x: box.x + 200,
                        y: box.y + 200,
                    });

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(correctScore);
                });

                test("should be incorrectly answerable", async ({
                    mount,
                    page,
                }) => {
                    // Arrange
                    await mount(<QuestionRenderer question={item.question} />);

                    // Act
                    await page.locator("button[title=Absolute_value]").click();

                    const graphie = page.locator(GRAPHIE);
                    await expect(graphie).toBeAttached();
                    const box = await graphie.boundingBox();
                    if (!box) {
                        throw new Error("Could not find graphie element");
                    }
                    await dragTo(page, page.locator(POINTS).nth(0), {
                        x: box.x + 200,
                        y: box.y + 200,
                    });
                    await dragTo(page, page.locator(POINTS).nth(1), {
                        x: box.x + 100,
                        y: box.y + 100,
                    });

                    // Assert
                    expect(
                        await scoreCurrentInput(page, answerful.question),
                    ).toStrictEqual(incorrectScore);
                });
            });
        }
    });
});
