import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";

import {describeHints, INITIAL_HINTS_REVEAL, revealHints} from "./hints-state";

import type {HintsReveal} from "./hints-state";
import type {Hint} from "@khanacademy/perseus-core";

function hint(replace = false): Hint {
    return {...generateTestPerseusRenderer({content: "A hint"}), replace};
}

function revealed(hintsVisible: number, isFinalHelpPage = false): HintsReveal {
    return {hintsVisible, isFinalHelpPage, renderKey: 0};
}

describe("revealHints", () => {
    it("reveals the next hint when no count is given", () => {
        // Arrange, Act
        const reveal = revealHints(revealed(1), undefined, 3);

        // Assert
        expect(reveal).toEqual(revealed(2));
    });

    it("stops at the last hint", () => {
        // Arrange, Act
        const reveal = revealHints(revealed(3), undefined, 3);

        // Assert
        expect(reveal.hintsVisible).toBe(3);
    });

    it("reveals every hint for -1", () => {
        // Arrange, Act
        const reveal = revealHints(revealed(2), -1, 3);

        // Assert
        expect(reveal.hintsVisible).toBe(3);
    });

    it("enters final-help-page mode when more than one hint is revealed at once", () => {
        // Arrange, Act
        const reveal = revealHints(INITIAL_HINTS_REVEAL, 3, 3);

        // Assert
        expect(reveal).toEqual(revealed(3, true));
    });

    it("stays in final-help-page mode as more hints are revealed", () => {
        // Arrange, Act
        const reveal = revealHints(revealed(2, true), undefined, 4);

        // Assert
        expect(reveal.isFinalHelpPage).toBe(true);
    });

    it("asks for a remount, out of final-help-page mode, when hints are hidden", () => {
        // Arrange, Act
        const reveal = revealHints(revealed(3, true), 1, 3);

        // Assert
        expect(reveal).toEqual({
            hintsVisible: 1,
            isFinalHelpPage: false,
            renderKey: 1,
        });
    });

    it("reveals nothing when the item has no hints", () => {
        // Arrange, Act
        const reveal = revealHints(INITIAL_HINTS_REVEAL, undefined, 0);

        // Assert
        expect(reveal).toEqual(INITIAL_HINTS_REVEAL);
    });
});

describe("describeHints", () => {
    it("counts a replacing hint in place of the one before it", () => {
        // Arrange
        const hints = [hint(), hint(true), hint()];

        // Act
        const state = describeHints(hints, revealed(2));

        // Assert
        expect(state).toEqual({
            hintsVisible: 2,
            total: 3,
            visibleCount: 1,
            isFinalHelpPage: false,
        });
    });

    it("counts every revealed hint on the final help page", () => {
        // Arrange
        const hints = [hint(), hint(true), hint()];

        // Act
        const state = describeHints(hints, revealed(3, true));

        // Assert
        expect(state.visibleCount).toBe(3);
    });

    it("counts a replacing first hint, which has nothing to replace", () => {
        // Arrange
        const hints = [hint(true), hint()];

        // Act
        const state = describeHints(hints, revealed(1));

        // Assert
        expect(state.visibleCount).toBe(1);
    });

    it("limits the revealed hints to the ones the item still has", () => {
        // Arrange
        const hints = [hint()];

        // Act
        const state = describeHints(hints, revealed(3));

        // Assert
        expect(state).toMatchObject({hintsVisible: 1, visibleCount: 1});
    });
});
