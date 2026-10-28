import {expect, test} from "@playwright/test";

import {getFeatureFlags} from "../../../testing/feature-flags-util";
import renderQuestion from "../../../testing/render-question-with-playwright";
import {scorePerseusItemTesting} from "../../../util/scoring.testutils";
import {twoCardVerticalQuestion} from "../sorter.testdata";

import type {Locator} from "@playwright/test";

const BLANKS = '[data-blank="true"]';
const BANK_TILES = "ul li";

const apiOptions = {flags: getFeatureFlags({"dnd-widget-sorter": true})};

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

async function center(locator: Locator): Promise<{x: number; y: number}> {
    const box = await locator.boundingBox();
    if (!box) {
        throw new Error(`${locator} is not visible`);
    }
    return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

// dnd-kit marks the tile being dragged with this attribute.
const DRAGGING_TILE = "[data-dnd-dragging]";

async function dragTileToBlank(
    tile: Locator,
    blank: Locator,
    tileText: string,
): Promise<void> {
    const page = tile.page();
    const from = await center(tile);

    // dnd-kit ignores a new pointerdown until it has finished cleaning up
    // after the previous drop, which happens a render or two after the
    // dropped tile shows up in its blank. Nothing in the DOM says when that
    // cleanup is done, so we check that the drag actually started and try
    // again if it didn't.
    await expect(async () => {
        await page.mouse.move(from.x, from.y);
        await page.mouse.down();
        // Nudge the pointer so dnd-kit's PointerSensor starts the drag.
        await page.mouse.move(from.x + 20, from.y + 20);
        try {
            await expect(page.locator(DRAGGING_TILE)).not.toHaveCount(0, {
                timeout: 500,
            });
        } catch (e) {
            await page.mouse.up();
            throw e;
        }
    }).toPass();

    const to = await center(blank);
    await page.mouse.move(to.x, to.y);
    await page.mouse.up();
    await expect(blank).toContainText(tileText);
}

test.describe("Sorter widget (drag-and-drop)", () => {
    test.use({reducedMotion: "reduce"});

    test("places a card in a blank when it is dragged onto the blank", async ({
        mount,
        page,
    }) => {
        // Arrange
        await renderQuestion(mount, twoCardVerticalQuestion, apiOptions);
        const blanks = page.locator(BLANKS);
        const apple = page.locator(BANK_TILES, {hasText: "Apple"});
        await expect(blanks).toHaveCount(2);

        // Act
        await dragTileToBlank(apple, blanks.nth(0), "Apple");

        // Assert
        await expect(blanks.nth(0)).toContainText("Apple");
        await expect(apple).toHaveCount(0);
    });

    test("scores as correct after the cards are dragged into the right order", async ({
        mount,
        page,
    }) => {
        // Arrange
        const {getUserInputMap} = await renderQuestion(
            mount,
            twoCardVerticalQuestion,
            apiOptions,
        );
        const blanks = page.locator(BLANKS);
        const tile = (text: string) =>
            page.locator(BANK_TILES, {hasText: text});
        await expect(blanks).toHaveCount(2);

        // Act
        await dragTileToBlank(tile("Apple"), blanks.nth(0), "Apple");
        await dragTileToBlank(tile("Banana"), blanks.nth(1), "Banana");

        // Assert
        const score = scorePerseusItemTesting(
            twoCardVerticalQuestion,
            await getUserInputMap(),
        );
        expect(score).toEqual(EXPECTED_CORRECT_SCORE);
    });
});
