import {renderQuestion} from "../widgets/__testutils__/renderQuestion";

import {extractWidgetIds} from "./extract-widget-ids";
import {radio, numericInput, expression} from "./extract-widget-ids.test";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

/**
 * Contract test helper that verifies widget ID extraction implementations
 * produce identical results. Tests both the Renderer component method and
 * the standalone utility function against the same scenarios to ensure
 * behavioral consistency.
 */
function testWidgetIdExtraction(
    name: string,
    runExtractor: (r: PerseusRenderer) => readonly string[],
) {
    describe(`extracting widget IDs with ${name}`, () => {
        it("returns the ID of a single widget", () => {
            const question: PerseusRenderer = {
                content: "Here's a widget: [[☃ radio 1]]",
                widgets: {
                    "radio 1": radio,
                },
                images: {},
            };

            const widgetIds = runExtractor(question);
            expect(widgetIds).toEqual(["radio 1"]);
        });

        it("returns multiple widget IDs in order", () => {
            const content =
                "[[☃ radio 1]]\n[[☃ numeric-input 2]]\n[[☃ expression 3]]";

            const question: PerseusRenderer = {
                content,
                widgets: {
                    "radio 1": radio,
                    "numeric-input 2": numericInput,
                    "expression 3": expression,
                },
                images: {},
            };

            const widgetIds = runExtractor(question);
            expect(widgetIds).toEqual([
                "radio 1",
                "numeric-input 2",
                "expression 3",
            ]);
        });

        it("deduplicates repeated widget IDs", () => {
            const content =
                "[[☃ radio 1]]\n[[☃ radio 1]]\n[[☃ numeric-input 2]]";

            const question: PerseusRenderer = {
                content,
                widgets: {
                    "radio 1": radio,
                    "numeric-input 2": numericInput,
                },
                images: {},
            };

            const widgetIds = runExtractor(question);
            expect(widgetIds).toEqual(["radio 1", "numeric-input 2"]);
        });

        it("returns empty array for content with no widgets", () => {
            const content = "Just some plain text with no widgets.";

            const question: PerseusRenderer = {
                content,
                widgets: {},
                images: {},
            };

            const widgetIds = runExtractor(question);
            expect(widgetIds).toEqual([]);
        });
    });
}

testWidgetIdExtraction(
    "the Renderer component",
    (question: PerseusRenderer) => {
        const {renderer} = renderQuestion(question);
        return renderer.getWidgetIds();
    },
);

testWidgetIdExtraction(
    "the extractWidgetIds function",
    (question: PerseusRenderer) => {
        return extractWidgetIds(question);
    },
);
