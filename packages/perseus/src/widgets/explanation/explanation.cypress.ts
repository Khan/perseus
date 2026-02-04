import renderQuestion from "../../testing/render-question-with-cypress";
import {cypressTestDependencies} from "../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import * as Perseus from "../../index";

import {ipsumExample} from "./explanation.testdata";

//  NOTE: The regression tests in this file use Cypress because they are intended to validate styling that is applied.
//        Since React Testing Library isn't applying the CSS to the elements,
//          we can't use Jest to verify that some keyboard interactions work properly.

describe("Explanation Widget", () => {
    const postContentLinkText = "the system J-25";
    const contentLinkOne = "synchronic distortion";
    const contentLinkTwo = "selective molecular polarization";

    beforeEach(() => {
        Dependencies.setDependencies(cypressTestDependencies);
        Perseus.init();
    });

    it("prevents interacting with actionable items within content when COLLAPSED (initial state)", () => {
        // Arrange
        renderQuestion(ipsumExample);
        cy.get("button[aria-expanded='false'][aria-controls]").focus();

        // Act - verify tab order (forwards)
        cy.focused().should("have.text", "Explanation"); // Verify we are on the widget's button.
        cy.realPress("Tab");
        cy.focused().should("have.text", postContentLinkText);

        // Act - verify tab order (backwards)
        cy.realPress(["Shift", "Tab"]);
        cy.focused().should("have.text", "Explanation");
    });

    it("allows interacting with actionable items within content when EXPANDED", () => {
        // NOTE: This test ensures that the CSS that controls keyboard access doesn't regress.
        //       It also ensures that any JavaScript event handling doesn't interfere with expected keyboard navigation.

        // Arrange
        renderQuestion(ipsumExample);
        cy.get("button[aria-expanded='false'][aria-controls]").focus();
        cy.focused().should("have.text", "Explanation"); // Verify we are on the widget's button.
        cy.realPress("Enter"); // Expand content

        // Act - verify tab order (forwards)
        cy.realPress("Tab");
        cy.focused().should("have.text", contentLinkOne);
        cy.realPress("Tab");
        cy.focused().should("have.text", contentLinkTwo);
        cy.realPress("Tab");
        cy.focused().should("have.text", postContentLinkText);

        // Act - verify tab order (backwards)
        cy.realPress(["Shift", "Tab"]);
        cy.focused().should("have.text", contentLinkTwo);
        cy.realPress(["Shift", "Tab"]);
        cy.focused().should("have.text", contentLinkOne);
        cy.realPress(["Shift", "Tab"]);
        cy.focused().should("have.text", "Hide"); // "Hide" is the new text in the widget's button.
    });

    it("prevents interacting with actionable items within content when COLLAPSED (after toggle)", () => {
        // NOTE: This test ensures that interaction with the widget's button doesn't regress.
        //       The test is similar to the first "COLLAPSED" test,
        //          but while that one tests the initial state of the widget,
        //          this one verifies that toggling doesn't introduce/remove anything that would interfere with
        //          expected keyboard navigation.

        // Arrange
        renderQuestion(ipsumExample);
        cy.get("button[aria-expanded='false'][aria-controls]").focus();
        cy.focused().should("have.text", "Explanation"); // Verify we are on the widget's button.
        cy.realPress("Enter"); // Expand content

        // Act - verify tab order (forwards)
        cy.realPress("Tab");
        cy.focused().should("have.text", contentLinkOne);

        // Act - verify tab order (backwards)
        cy.realPress(["Shift", "Tab"]);
        cy.realPress("Enter"); // Collapse content
        cy.waitUntil(() =>
            cy
                .focused()
                .siblings()
                .first()
                .should("have.attr", "aria-hidden", "true")
                .should("have.css", "visibility", "hidden"),
        );
        cy.realPress("Tab");
        cy.focused().should("have.text", postContentLinkText);
    });
});
