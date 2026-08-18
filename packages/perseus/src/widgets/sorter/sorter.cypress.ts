import * as Perseus from "../../index";
import renderQuestionWithCypress from "../../testing/render-question-with-cypress";
import {cypressTestDependencies} from "../../testing/test-dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";

import {twoCardVerticalQuestion} from "./sorter.testdata";

// NOTE: These tests use Cypress because
// - Sortable is currently inaccessible
// - Drag-and-drop is tricky to test
// so we're using Cypress to reinforce RTL tests

const CARDS = "li.perseus-sortable-draggable";
const DRAGGED_CARD = 'li.perseus-sortable-draggable[style*="absolute"]';

// The gap Sorter puts between cards on desktop.
const CARD_MARGIN = 5;

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

/**
 * Drags the card at `index` (DOM order) downwards past the card below it and
 * releases it.
 *
 * Sortable hand-rolls its dragging with jQuery rather than using a drag-and-drop
 * library, which constrains how the events have to be sent:
 *
 * - `mousedown` must carry button 0, and it defers the Static -> Dragging
 *   transition into a requestAnimationFrame. Until that frame runs, the move
 *   handler bails out, so a `mousemove` sent immediately after `mousedown` is
 *   silently dropped. We wait for the card to become absolutely positioned,
 *   which is proof the drag has started.
 * - `mousemove`/`mouseup` are bound to `document` (not to the card) once the
 *   drag begins, so we dispatch them on `body` and let them bubble.
 * - Positions are read from `pageX`/`pageY` (see Util.extractPointerLocation),
 *   not `clientX`/`clientY`.
 */
function dragCardBelowTheNextOne(index: number): void {
    cy.get(CARDS).then(($cards) => {
        const rect = $cards[index].getBoundingClientRect();
        const pageX = rect.left + rect.width / 2 + window.scrollX;
        const startY = rect.top + rect.height / 2 + window.scrollY;
        // Sortable reorders once the dragged card's top edge passes the
        // midpoint of the card below it, so a full card height clears the
        // threshold comfortably. Measured rather than hard-coded so this
        // doesn't break if the card padding changes.
        const dy = rect.height + CARD_MARGIN;

        cy.get(CARDS).eq(index).trigger("mousedown", {which: 1, button: 0});
        cy.get(DRAGGED_CARD).should("exist");

        // Two steps rather than one jump: each move is throttled through a
        // requestAnimationFrame, so the reorder needs a frame to land before
        // we let go.
        // `force` because we don't care where on the page these land — the
        // handlers read the coordinates off the event, not off the target.
        const move = (pageY: number) =>
            cy.get("body").trigger("mousemove", {force: true, pageX, pageY});
        move(startY + dy / 2);
        move(startY + dy);
        cy.get("body").trigger("mouseup", {
            force: true,
            pageX,
            pageY: startY + dy,
        });

        // The card animates back into the flow after release, and `onChange`
        // (and so `handleUserInput`) fires a frame after mouseup. Waiting for
        // the card to go static means both have finished.
        cy.get(DRAGGED_CARD).should("not.exist");
    });
}

describe("Sorter widget", () => {
    beforeEach(() => {
        Perseus.init();
        Perseus.Dependencies.setDependencies(cypressTestDependencies);
    });

    it("reorders the cards when one is dragged past the other", () => {
        // Arrange
        renderQuestionWithCypress(twoCardVerticalQuestion);
        // shuffleSorter always displaces the first card, so two cards always
        // start out reversed.
        cy.get(CARDS).should("have.length", 2);
        cy.get(CARDS).eq(0).should("have.text", "Banana");

        // Act
        dragCardBelowTheNextOne(0);

        // Assert
        cy.get(CARDS).eq(0).should("have.text", "Apple");
        cy.get(CARDS).eq(1).should("have.text", "Banana");
    });

    it("scores as correct after the cards are dragged into the right order", () => {
        // Arrange
        const getRenderer = renderQuestionWithCypress(twoCardVerticalQuestion);
        cy.get(CARDS).should("have.length", 2);

        // Act
        dragCardBelowTheNextOne(0);

        // Assert
        cy.then(() => {
            const score = scorePerseusItemTesting(
                twoCardVerticalQuestion,
                getRenderer().getUserInputMap(),
            );
            expect(score).toStrictEqual(EXPECTED_CORRECT_SCORE);
        });
    });
});
