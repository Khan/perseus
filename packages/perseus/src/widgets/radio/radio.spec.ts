import {expect, test} from "@internal/playwright";

import renderQuestion from "../../testing/playwright/render-question";

import {question} from "./__tests__/radio.testdata";

// NOTE: These tests run in a real browser because they check where focus
// lands after a mouse click, and that Tab continues from there. jsdom
// doesn't implement focus navigation.

test.describe("Radio Widget", () => {
    test("focuses a choice's button when its content is clicked", async ({
        mount,
        page,
    }) => {
        await renderQuestion(mount, question);
        const choiceD = page.getByRole("button", {name: /^Choice D/});

        await page.getByText("No value of").click();

        await expect(choiceD).toHaveAttribute("aria-pressed", "true");
        await expect(choiceD).toBeFocused();
    });

    test("continues keyboard navigation from a choice whose content was clicked", async ({
        mount,
        page,
    }) => {
        await renderQuestion(mount, question);

        await page.getByText("No value of").click();
        await expect(
            page.getByRole("button", {name: /^Choice D/}),
        ).toBeFocused();
        await page.keyboard.press("Shift+Tab");

        await expect(
            page.getByRole("button", {name: /^Choice C/}),
        ).toBeFocused();
    });
});
