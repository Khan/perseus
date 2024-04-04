import {strings} from "../../../../../../testing/mock-strings";
import renderSingleKeypad from "../../../../../../testing/render-keypad-with-cypress";

import {getTestDataTabs} from "./test-data-tabs";

describe("Keypad v2", () => {
    const tabs = getTestDataTabs(strings);
    tabs.forEach((tab) => {
        it(`switches to the correct tab: ${tab.name}`, () => {
            renderSingleKeypad();

            // currently clicking on the bottom left due to button re-rendering
            // after mousedown but before mouseup (only in Cypress)
            cy.get('[aria-label="' + tab.name + '"]').click("bottomLeft");
            cy.get('[aria-label="' + tab.label + '"]').should("exist");
        });
    });
});
