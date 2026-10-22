import * as Perseus from "../../../index";
import {getFeatureFlags} from "../../../testing/feature-flags-util";
import renderQuestionWithCypress from "../../../testing/render-question-with-cypress";
import {cypressTestDependencies} from "../../../testing/test-dependencies";
import {scorePerseusItemTesting} from "../../../util/test-utils";
import {twoCardVerticalQuestion} from "../sorter.testdata";

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

function dragTileToBlank(tile: string, blankIndex: number): void {
    cy.contains(BANK_TILES, tile).realMouseDown({position: "center"});
    cy.contains(BANK_TILES, tile).realMouseMove(20, 20, {position: "center"});
    cy.get(BLANKS).eq(blankIndex).realMouseMove(0, 0, {position: "center"});
    cy.get(BLANKS).eq(blankIndex).realMouseUp({position: "center"});
    cy.get(BLANKS).eq(blankIndex).should("contain.text", tile);
}

describe("Sorter widget (drag-and-drop)", () => {
    beforeEach(() => {
        Perseus.init();
        Perseus.Dependencies.setDependencies(cypressTestDependencies);
        cy.wrap(
            Cypress.automation("remote:debugger:protocol", {
                command: "Emulation.setEmulatedMedia",
                params: {
                    features: [
                        {name: "prefers-reduced-motion", value: "reduce"},
                    ],
                },
            }),
        );
    });

    it("places a card in a blank when it is dragged onto the blank", () => {
        // Arrange
        renderQuestionWithCypress(twoCardVerticalQuestion, apiOptions);
        cy.get(BLANKS).should("have.length", 2);

        // Act
        dragTileToBlank("Apple", 0);

        // Assert
        cy.get(BLANKS).eq(0).should("contain.text", "Apple");
        cy.contains(BANK_TILES, "Apple").should("not.exist");
    });

    it("scores as correct after the cards are dragged into the right order", () => {
        // Arrange
        const getRenderer = renderQuestionWithCypress(
            twoCardVerticalQuestion,
            apiOptions,
        );
        cy.get(BLANKS).should("have.length", 2);

        // Act
        dragTileToBlank("Apple", 0);
        dragTileToBlank("Banana", 1);

        // Assert
        cy.then(() => {
            const score = scorePerseusItemTesting(
                twoCardVerticalQuestion,
                getRenderer().getUserInputMap(),
            );
            expect(score).to.deep.equal(EXPECTED_CORRECT_SCORE);
        });
    });
});
