import renderQuestionWithCypress from "../../../../../testing/render-question-with-cypress";
import {cypressTestDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import * as Perseus from "../../index";

import {questionWithZoom} from "./image.testdata";

//  NOTE: The regression tests in this file use Cypress because they are intended to validate styling that is applied.
//        Since React Testing Library isn't applying the CSS to the elements,
//          we can't use Jest to verify that some keyboard interactions work properly.

describe("Image Widget", () => {
    beforeEach(() => {
        Dependencies.setDependencies(cypressTestDependencies);
        Perseus.init();
        window.innerWidth = 1024;
    });

    afterEach(() => {
        // remove classes that are added to the body
        cy.get("body").invoke("removeClass", "zoom-overlay-open");
        // Only remove the zoom image if it exists
        cy.get("body").then(($body) => {
            if ($body.find("img.zoom-img").length > 0) {
                cy.get("img.zoom-img").invoke("remove");
            }
        });
    });

    it("opens and closes zoomable images on click", () => {
        // Arrange
        renderQuestionWithCypress(questionWithZoom);

        // Act - click on zoom button associated with the image
        cy.get("img.image-loader-img").should("be.visible");
        cy.get("button[aria-label='Zoom image.']").click();

        // Assert
        // The zoomed image should be visible and the zoomable image should be hidden
        cy.get("img.zoom-img").should("be.visible");
        cy.get("img.image-loader-img").should("not.be.visible");

        // Act - click on the zoomed image
        cy.get("img.zoom-img").click();

        // Assert - the zoomed image should be removed from the DOM
        cy.get("img.zoom-img").should("not.exist");
        cy.get("img.image-loader-img").should("be.visible");
    });

    it("opens and closes on keyboard interaction", () => {
        // Arrange
        renderQuestionWithCypress(questionWithZoom);

        // Act - focus on the zoomable image and press enter
        cy.get("img.image-loader-img").should("be.visible");
        cy.get("button[aria-label='Zoom image.']").focus().type("{enter}");

        // Assert
        // The zoomed image should be visible and the zoomable image should be hidden
        cy.get("img.zoom-img").should("be.visible");
        cy.get("img.image-loader-img").should("not.be.visible");

        // Act - focus on the zoomed image and press escape
        cy.get("img.zoom-img").focus().type("{esc}");

        // Assert - the zoomed image should be removed from the DOM
        cy.get("img.zoom-img").should("not.exist");
        cy.get("img.image-loader-img").should("be.visible");
    });
});
