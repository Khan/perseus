import renderQuestion from "../../../../../testing/render-question-with-cypress";
import {cypressTestDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import * as Perseus from "../../index";

import {question} from "./free-response.testdata";

describe("FreeResponse Widget", () => {
    beforeEach(() => {
        Dependencies.setDependencies(cypressTestDependencies);
        Perseus.init();
    });

    it("allows text input", () => {
        // Arrange
        renderQuestion(question);

        // Act - type some text
        cy.get("textarea").focus().type("my answer");

        // Assert
        cy.focused().should("have.text", "my answer");
    });
});
