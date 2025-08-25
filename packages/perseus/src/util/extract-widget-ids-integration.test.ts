import {renderQuestion} from "../widgets/__testutils__/renderQuestion";
import {extractWidgetIds} from "./extract-widget-ids";

// Integration test to compare our extracted function against the actual renderer behavior
describe("extractWidgetIds integration", () => {
    // Common widget configurations to avoid duplication
    const commonWidgets = {
        "radio 1": {
            type: "radio" as const,
            graded: true,
            options: {
                choices: [
                    {content: "Option A", correct: true, id: "a"},
                    {content: "Option B", correct: false},
                ],
                randomize: false,
            },
        },
        "numeric-input 2": {
            type: "numeric-input" as const,
            graded: true,
            options: {
                answers: [{value: 42, status: "correct" as const, message: ""}],
            },
        },
        "expression 3": {
            type: "expression" as const,
            graded: true,
            options: {
                answerForms: [
                    {value: "x+1", status: "correct" as const, message: ""},
                ],
            },
        },
    };

    // Helper function to test widget extraction and avoid repetition
    const testWidgetExtraction = (
        content: string,
        expectedIds: string[],
        widgets = {},
    ) => {
        const utilityIds = extractWidgetIds(content);
        const {renderer} = renderQuestion({
            content,
            widgets,
            images: {},
        });
        const rendererIds = renderer.getWidgetIds();

        expect(utilityIds).toEqual(rendererIds);
        expect(utilityIds).toEqual(expectedIds);
    };

    it("matches renderer for single widget", () => {
        testWidgetExtraction("Here's a widget: [[☃ radio 1]]", ["radio 1"], {
            "radio 1": commonWidgets["radio 1"],
        });
    });

    it("matches renderer for multiple widgets", () => {
        testWidgetExtraction(
            "[[☃ radio 1]]\n[[☃ numeric-input 2]]\n[[☃ expression 3]]",
            ["radio 1", "numeric-input 2", "expression 3"],
            commonWidgets,
        );
    });

    it("matches renderer with duplicate widget IDs (deduplication)", () => {
        testWidgetExtraction(
            "[[☃ radio 1]]\n[[☃ radio 1]]\n[[☃ numeric-input 2]]",
            ["radio 1", "numeric-input 2"],
            {
                "radio 1": commonWidgets["radio 1"],
                "numeric-input 2": commonWidgets["numeric-input 2"],
            },
        );
    });

    it("matches renderer for content with no widgets", () => {
        testWidgetExtraction("Just some plain text with no widgets.", []);
    });
});
