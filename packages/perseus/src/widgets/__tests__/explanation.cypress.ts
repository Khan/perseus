import renderQuestion from "../../../../../testing/render-question-with-cypress";
import {cypressTestDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import * as Perseus from "../../index";
import {ipsumExample} from "../__testdata__/explanation.testdata";

describe("Explanation Widget", () => {
    const postContentLinkText = "the system J-25";
    const contentLinkOne = "synchronic distortion";
    const contentLinkTwo = "selective molecular polarization";
    beforeEach(() => {
        Dependencies.setDependencies(cypressTestDependencies);
        Perseus.init({skipMathJax: true});
    });

    it("prevents interacting with actionable items within content when COLLAPSED", () => {
        // Arrange
        renderQuestion(ipsumExample);
        cy.get('[data-perseus-paragraph-index="0"]')
            .first()
            .invoke("attr", "tabindex", "-1")
            .focus();

        // Act - verify tab order (forwards)
        cy.realPress("Tab");
        cy.focused().should("have.text", "Explanation");
        cy.realPress("Tab");
        cy.focused().should("have.text", postContentLinkText);

        // Act - verify tab order (backwards)
        cy.realPress(["Shift", "Tab"]);
        cy.focused().should("have.text", "Explanation");
    });

    it("allows interacting with actionable items within content when EXPANDED", () => {
        // Arrange
        renderQuestion(ipsumExample);
        cy.get('[data-perseus-paragraph-index="0"]')
            .first()
            .invoke("attr", "tabindex", "-1")
            .focus();
        cy.realPress("Tab");
        cy.focused().should("have.text", "Explanation");
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
        cy.focused().should("have.text", "Hide");

        // Act - confirm collapse
        cy.realPress("Space"); // Collapse content
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
