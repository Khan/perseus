import {
    generateImageWidget,
    generateRadioWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {registerAllWidgetsAndEditorsForTesting} from "../../../util/register-all-widgets-and-editors-for-testing";
import {filterWidgetInfo, getDiffedWidgetIds} from "../diffed-widgets";

describe("getDiffedWidgetIds", () => {
    it("returns only the widgets the content references", () => {
        // Arrange
        const renderer = generateTestPerseusRenderer({
            content: "[[☃ radio 1]]",
            widgets: {
                "radio 1": generateRadioWidget(),
                "radio 2": generateRadioWidget(),
            },
        });

        // Act
        const widgetIds = getDiffedWidgetIds(renderer, renderer);

        // Assert
        expect(widgetIds).toEqual(["radio 1"]);
    });

    it("returns the before widgets first, then widgets only after references", () => {
        // Arrange
        const before = generateTestPerseusRenderer({
            content: "[[☃ radio 1]] [[☃ image 1]]",
            widgets: {
                "radio 1": generateRadioWidget(),
                "image 1": generateImageWidget(),
            },
        });
        const after = generateTestPerseusRenderer({
            content: "[[☃ radio 2]] [[☃ radio 1]]",
            widgets: {
                "radio 2": generateRadioWidget(),
                "radio 1": generateRadioWidget(),
            },
        });

        // Act
        const widgetIds = getDiffedWidgetIds(before, after);

        // Assert
        expect(widgetIds).toEqual(["radio 1", "image 1", "radio 2"]);
    });

    it("does not match a widget whose id is a prefix of the placed one", () => {
        // Arrange
        const renderer = generateTestPerseusRenderer({
            content: "[[☃ radio 10]]",
            widgets: {
                "radio 1": generateRadioWidget(),
                "radio 10": generateRadioWidget(),
            },
        });

        // Act
        const widgetIds = getDiffedWidgetIds(renderer, renderer);

        // Assert
        expect(widgetIds).toEqual(["radio 10"]);
    });

    it("returns no widgets when both sides are missing", () => {
        // Arrange, Act
        const widgetIds = getDiffedWidgetIds(undefined, undefined);

        // Assert
        expect(widgetIds).toEqual([]);
    });
});

describe("filterWidgetInfo", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    it("returns undefined for a missing widget", () => {
        // Arrange, Act
        const filtered = filterWidgetInfo(undefined, true);

        // Assert
        expect(filtered).toBeUndefined();
    });

    it("keeps the options and drops bookkeeping fields", () => {
        // Arrange
        const widget = generateRadioWidget({graded: true});

        // Act
        const filtered = filterWidgetInfo(widget, false);

        // Assert
        expect(filtered).toHaveProperty("options", widget.options);
        expect(filtered).not.toHaveProperty("graded");
        expect(filtered).not.toHaveProperty("version");
        expect(filtered).not.toHaveProperty("type");
    });

    it("keeps the alignment of a widget type with several alignments", () => {
        // Arrange
        const widget = generateImageWidget({alignment: "full-width"});

        // Act
        const filtered = filterWidgetInfo(widget, true);

        // Assert
        expect(filtered).toHaveProperty("alignment", "full-width");
    });

    it("drops the alignment of a widget type with one alignment", () => {
        // Arrange
        const widget = generateRadioWidget({alignment: "block"});

        // Act
        const filtered = filterWidgetInfo(widget, true);

        // Assert
        expect(filtered).not.toHaveProperty("alignment");
    });

    it("drops the alignment when alignment options are not shown", () => {
        // Arrange
        const widget = generateImageWidget({alignment: "full-width"});

        // Act
        const filtered = filterWidgetInfo(widget, false);

        // Assert
        expect(filtered).not.toHaveProperty("alignment");
    });
});
