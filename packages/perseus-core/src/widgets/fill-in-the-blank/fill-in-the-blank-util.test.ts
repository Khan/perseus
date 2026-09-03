import {generateBlankWidget} from "../../utils/generators/blank-widget-generator";
import {
    generateAnswerTile,
    generateFillInTheBlankOptions,
} from "../../utils/generators/fill-in-the-blank-widget-generator";
import {registerCoreWidgets} from "../core-widget-registry";

import {getFillInTheBlankPublicWidgetOptions} from "./fill-in-the-blank-util";

import type {PerseusFillInTheBlankWidgetOptions} from "../../data-schema";

// The split walks the nested widgets through the core registry, so the blank
// widget's own logic has to be registered for its options to be stripped.
beforeAll(() => {
    registerCoreWidgets();
});

function optionsWithTwoBlanks(): PerseusFillInTheBlankWidgetOptions {
    return generateFillInTheBlankOptions({
        content:
            "The [[\u2603 blank 1]] drum is played with your [[\u2603 blank 2]].",
        widgets: {
            "blank 1": generateBlankWidget({
                options: {displayType: "normal", correctId: "tile-1"},
            }),
            "blank 2": generateBlankWidget({
                options: {displayType: "normal", correctId: "tile-3"},
            }),
        },
        tiles: [
            generateAnswerTile({
                id: "tile-1",
                content: "djembe",
                label: "djembe",
            }),
            generateAnswerTile({
                id: "tile-3",
                content: "hands",
                label: "hands",
            }),
        ],
    });
}

describe("getFillInTheBlankPublicWidgetOptions", () => {
    it("strips the correctId from every nested blank", () => {
        // Arrange, Act
        const publicOptions = getFillInTheBlankPublicWidgetOptions(
            optionsWithTwoBlanks(),
        );

        // Assert
        expect(publicOptions.widgets["blank 1"].options).not.toHaveProperty(
            "correctId",
        );
        expect(publicOptions.widgets["blank 2"].options).not.toHaveProperty(
            "correctId",
        );
    });

    it("keeps the display type of every nested blank", () => {
        // Arrange, Act
        const publicOptions = getFillInTheBlankPublicWidgetOptions(
            optionsWithTwoBlanks(),
        );

        // Assert
        expect(publicOptions.widgets["blank 1"].options).toEqual({
            displayType: "normal",
        });
    });

    it("keeps the choice bank, which the learner has to see", () => {
        // Arrange, Act
        const publicOptions = getFillInTheBlankPublicWidgetOptions(
            optionsWithTwoBlanks(),
        );

        // Assert
        expect(publicOptions.tiles).toEqual([
            {id: "tile-1", content: "djembe", label: "djembe"},
            {id: "tile-3", content: "hands", label: "hands"},
        ]);
        expect(publicOptions.content).toBe(
            "The [[☃ blank 1]] drum is played with your [[☃ blank 2]].",
        );
        expect(publicOptions.tileUsage).toBe("single");
    });

    it("does not mutate the options it was given", () => {
        // Arrange
        const options = optionsWithTwoBlanks();

        // Act
        getFillInTheBlankPublicWidgetOptions(options);

        // Assert
        expect(options.widgets["blank 1"].options).toHaveProperty(
            "correctId",
            "tile-1",
        );
    });
});
