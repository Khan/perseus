import {expect, test} from "@playwright/experimental-ct-react";
import * as React from "react";

import {mockStrings} from "../../../strings";
import {KeypadForTesting} from "../../../testing/render-keypad-with-playwright";

import {getTestDataTabs} from "./test-data-tabs";

test.describe("Keypad v2", () => {
    const tabs = getTestDataTabs(mockStrings);

    for (const tab of tabs) {
        test(`switches to the correct tab: ${tab.name}`, async ({
            mount,
            page,
        }) => {
            // Arrange
            await mount(<KeypadForTesting />);

            // Act
            await page.locator(`[aria-label="${tab.name}"]`).click();

            // Assert
            await expect(
                page.locator(`[aria-label="${tab.label}"]`),
            ).toBeVisible();
        });
    }
});
