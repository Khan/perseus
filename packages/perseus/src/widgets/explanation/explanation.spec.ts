import {expect, test} from "@internal/playwright";

import renderQuestion from "../../testing/playwright/render-question";

import {ipsumExample} from "./explanation.testdata";

//  NOTE: The regression tests in this file use Playwright because they are intended to validate styling that is applied.
//        Since React Testing Library isn't applying the CSS to the elements,
//          we can't use Jest to verify that some keyboard interactions work properly.

test.describe("Explanation Widget", () => {
    const postContentLinkText = "the system J-25";
    const contentLinkOne = "synchronic distortion";
    const contentLinkTwo = "selective molecular polarization";

    test("prevents interacting with actionable items within content when COLLAPSED (initial state)", async ({
        mount,
        page,
    }) => {
        // Arrange
        await renderQuestion(mount, ipsumExample);
        const toggle = page.getByRole("button", {
            name: "Explanation",
            expanded: false,
        });
        await toggle.focus();

        // Act - verify tab order (forwards)
        await expect(toggle).toBeFocused(); // Verify we are on the widget's button.
        await page.keyboard.press("Tab");
        await expect(
            page.getByRole("link", {name: postContentLinkText}),
        ).toBeFocused();

        // Act - verify tab order (backwards)
        await page.keyboard.press("Shift+Tab");
        await expect(toggle).toBeFocused();
    });

    test("allows interacting with actionable items within content when EXPANDED", async ({
        mount,
        page,
    }) => {
        // NOTE: This test ensures that the CSS that controls keyboard access doesn't regress.
        //       It also ensures that any JavaScript event handling doesn't interfere with expected keyboard navigation.

        // Arrange
        await renderQuestion(mount, ipsumExample);
        const toggle = page.getByRole("button", {
            name: "Explanation",
            expanded: false,
        });
        await toggle.focus();
        await expect(toggle).toBeFocused(); // Verify we are on the widget's button.
        await page.keyboard.press("Enter"); // Expand content

        // Act - verify tab order (forwards)
        await page.keyboard.press("Tab");
        await expect(
            page.getByRole("link", {name: contentLinkOne}),
        ).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(
            page.getByRole("link", {name: contentLinkTwo}),
        ).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(
            page.getByRole("link", {name: postContentLinkText}),
        ).toBeFocused();

        // Act - verify tab order (backwards)
        await page.keyboard.press("Shift+Tab");
        await expect(
            page.getByRole("link", {name: contentLinkTwo}),
        ).toBeFocused();
        await page.keyboard.press("Shift+Tab");
        await expect(
            page.getByRole("link", {name: contentLinkOne}),
        ).toBeFocused();
        await page.keyboard.press("Shift+Tab");
        // "Hide" is the new text in the widget's button.
        await expect(page.getByRole("button", {name: "Hide"})).toBeFocused();
    });

    test("prevents interacting with actionable items within content when COLLAPSED (after toggle)", async ({
        mount,
        page,
    }) => {
        // NOTE: This test ensures that interaction with the widget's button doesn't regress.
        //       The test is similar to the first "COLLAPSED" test,
        //          but while that one tests the initial state of the widget,
        //          this one verifies that toggling doesn't introduce/remove anything that would interfere with
        //          expected keyboard navigation.

        // Arrange
        await renderQuestion(mount, ipsumExample);
        const toggle = page.getByRole("button", {
            name: "Explanation",
            expanded: false,
        });
        await toggle.focus();
        await expect(toggle).toBeFocused(); // Verify we are on the widget's button.
        const contentId = await toggle.getAttribute("aria-controls");
        await page.keyboard.press("Enter"); // Expand content

        // Act - verify tab order (forwards)
        await page.keyboard.press("Tab");
        await expect(
            page.getByRole("link", {name: contentLinkOne}),
        ).toBeFocused();

        // Act - verify tab order (backwards)
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Enter"); // Collapse content
        const content = page.locator(`[id="${contentId}"]`);
        await expect(content).toHaveAttribute("aria-hidden", "true");
        await expect(content).toHaveCSS("visibility", "hidden");
        await page.keyboard.press("Tab");
        await expect(
            page.getByRole("link", {name: postContentLinkText}),
        ).toBeFocused();
    });
});
