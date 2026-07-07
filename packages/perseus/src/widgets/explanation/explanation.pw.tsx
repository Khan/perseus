import {expect, test} from "@playwright/experimental-ct-react";
import * as React from "react";

import {QuestionRenderer} from "../../testing/render-question-with-playwright";

import {ipsumExample} from "./explanation.testdata";

//  NOTE: These regression tests run in a real browser (Playwright) because they
//        validate styling that is applied. React Testing Library / jsdom don't
//        apply the CSS to the elements, so we can't use Jest to verify that
//        these keyboard interactions work properly.

test.describe("Explanation Widget", () => {
    const postContentLinkText = "the system J-25";
    const contentLinkOne = "synchronic distortion";
    const contentLinkTwo = "selective molecular polarization";

    // The widget's toggle button in its initial (collapsed) state.
    const collapsedToggle = "button[aria-expanded='false'][aria-controls]";

    test("prevents interacting with actionable items within content when COLLAPSED (initial state)", async ({
        mount,
        page,
    }) => {
        // Arrange
        await mount(<QuestionRenderer question={ipsumExample} />);
        await page.locator(collapsedToggle).focus();

        // Act - verify tab order (forwards)
        // Verify we are on the widget's button.
        await expect(page.locator(":focus")).toHaveText("Explanation");
        await page.keyboard.press("Tab");
        await expect(page.locator(":focus")).toHaveText(postContentLinkText);

        // Act - verify tab order (backwards)
        await page.keyboard.press("Shift+Tab");
        await expect(page.locator(":focus")).toHaveText("Explanation");
    });

    test("allows interacting with actionable items within content when EXPANDED", async ({
        mount,
        page,
    }) => {
        // NOTE: This test ensures that the CSS that controls keyboard access
        //       doesn't regress. It also ensures that any JavaScript event
        //       handling doesn't interfere with expected keyboard navigation.

        // Arrange
        await mount(<QuestionRenderer question={ipsumExample} />);
        await page.locator(collapsedToggle).focus();
        // Verify we are on the widget's button.
        await expect(page.locator(":focus")).toHaveText("Explanation");
        await page.keyboard.press("Enter"); // Expand content

        // Act - verify tab order (forwards)
        await page.keyboard.press("Tab");
        await expect(page.locator(":focus")).toHaveText(contentLinkOne);
        await page.keyboard.press("Tab");
        await expect(page.locator(":focus")).toHaveText(contentLinkTwo);
        await page.keyboard.press("Tab");
        await expect(page.locator(":focus")).toHaveText(postContentLinkText);

        // Act - verify tab order (backwards)
        await page.keyboard.press("Shift+Tab");
        await expect(page.locator(":focus")).toHaveText(contentLinkTwo);
        await page.keyboard.press("Shift+Tab");
        await expect(page.locator(":focus")).toHaveText(contentLinkOne);
        await page.keyboard.press("Shift+Tab");
        // "Hide" is the new text in the widget's button.
        await expect(page.locator(":focus")).toHaveText("Hide");
    });

    test("prevents interacting with actionable items within content when COLLAPSED (after toggle)", async ({
        mount,
        page,
    }) => {
        // NOTE: This test ensures that interaction with the widget's button
        //       doesn't regress. It is similar to the first "COLLAPSED" test,
        //       but while that one tests the initial state of the widget, this
        //       one verifies that toggling doesn't introduce/remove anything
        //       that would interfere with expected keyboard navigation.

        // Arrange
        await mount(<QuestionRenderer question={ipsumExample} />);
        await page.locator(collapsedToggle).focus();
        // Verify we are on the widget's button.
        await expect(page.locator(":focus")).toHaveText("Explanation");
        await page.keyboard.press("Enter"); // Expand content

        // Act - verify tab order (forwards)
        await page.keyboard.press("Tab");
        await expect(page.locator(":focus")).toHaveText(contentLinkOne);

        // Act - verify tab order (backwards)
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Enter"); // Collapse content

        // Once collapsed, the content is hidden from keyboard users. Wait for
        // the CSS that enforces that to take effect before tabbing onward.
        const hiddenContent = page.locator(":focus + *");
        await expect(hiddenContent).toHaveAttribute("aria-hidden", "true");
        await expect(hiddenContent).toHaveCSS("visibility", "hidden");

        await page.keyboard.press("Tab");
        await expect(page.locator(":focus")).toHaveText(postContentLinkText);
    });
});
