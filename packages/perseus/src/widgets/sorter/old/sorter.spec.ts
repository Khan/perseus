import {expect, test} from "@internal/playwright";

import renderQuestion from "../../../testing/playwright/render-question";
import {scorePerseusItemTesting} from "../../../util/scoring.testutils";
import {twoCardVerticalQuestion} from "../sorter.testdata";

import type {Locator} from "@playwright/test";

// NOTE: These tests use Playwright because
// - Sortable is currently inaccessible
// - Drag-and-drop is tricky to test
// so we're using Playwright to reinforce RTL tests

const CARDS = "li.perseus-sortable-draggable";
const DRAGGED_CARD = 'li.perseus-sortable-draggable[style*="absolute"]';

// The gap Sorter puts between cards on desktop.
const CARD_MARGIN = 5;

const EXPECTED_CORRECT_SCORE = {
    type: "points",
    earned: 1,
    total: 1,
    message: null,
    widgetScores: {
        "sorter 1": {
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        },
    },
} as const;

/**
 * Drags the card at `index` (DOM order) downwards past the card below it and
 * releases it.
 *
 * Sortable hand-rolls its dragging with jQuery rather than using a drag-and-drop
 * library, which constrains how the events have to be sent:
 *
 * - `mousedown` defers the Static -> Dragging transition into a
 *   requestAnimationFrame. We wait for the card to become absolutely
 *   positioned, which confirms the drag has started.
 * - `mousemove` and `mouseup` are bound to `document` once the drag begins.
 *   Playwright's mouse sends real input events, so they reach it wherever
 *   the pointer is.
 */
async function dragCardBelowTheNextOne(
    cards: Locator,
    index: number,
): Promise<void> {
    const page = cards.page();
    const rect = await cards.nth(index).boundingBox();
    if (!rect) {
        throw new Error(`Card ${index} is not visible`);
    }
    const x = rect.x + rect.width / 2;
    const startY = rect.y + rect.height / 2;
    // Sortable reorders once the dragged card's top edge passes the
    // midpoint of the card below it, so a full card height clears the
    // threshold comfortably. Measured rather than hard-coded so this
    // doesn't break if the card padding changes.
    const dy = rect.height + CARD_MARGIN;

    await page.mouse.move(x, startY);
    await page.mouse.down();
    await expect(page.locator(DRAGGED_CARD)).toHaveCount(1);

    // Two steps rather than one jump: each move is throttled through a
    // requestAnimationFrame, so the reorder needs a frame to land before
    // we let go.
    await page.mouse.move(x, startY + dy / 2);
    await page.mouse.move(x, startY + dy);
    await page.mouse.up();

    // The card animates back into the flow after release, and `onChange`
    // (and so `handleUserInput`) fires a frame after mouseup. Waiting for
    // the card to go static means both have finished.
    await expect(page.locator(DRAGGED_CARD)).toHaveCount(0);
}

test.describe("Sorter widget", () => {
    test("reorders the cards when one is dragged past the other", async ({
        mount,
        page,
    }) => {
        // Arrange
        await renderQuestion(mount, twoCardVerticalQuestion);
        const cards = page.locator(CARDS);
        // shuffleSorter always displaces the first card, so two cards always
        // start out reversed.
        await expect(cards).toHaveText(["Banana", "Apple"]);

        // Act
        await dragCardBelowTheNextOne(cards, 0);

        // Assert
        await expect(cards).toHaveText(["Apple", "Banana"]);
    });

    test("scores as correct after the cards are dragged into the right order", async ({
        mount,
        page,
    }) => {
        // Arrange
        const {getUserInputMap} = await renderQuestion(
            mount,
            twoCardVerticalQuestion,
        );
        const cards = page.locator(CARDS);
        await expect(cards).toHaveCount(2);

        // Act
        await dragCardBelowTheNextOne(cards, 0);

        // Assert
        // `toPass` retries while the asynchronous user-input update finishes
        // after the mouse release.
        await expect(async () => {
            const score = scorePerseusItemTesting(
                twoCardVerticalQuestion,
                await getUserInputMap(),
            );
            expect(score).toEqual(EXPECTED_CORRECT_SCORE);
        }).toPass();
    });
});
