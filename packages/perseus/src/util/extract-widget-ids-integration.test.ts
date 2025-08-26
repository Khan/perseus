import {renderQuestion} from "../widgets/__testutils__/renderQuestion";

import {extractWidgetIds} from "./extract-widget-ids";

// Integration test to compare our extracted function against the actual renderer behavior
describe("extractWidgetIds integration", () => {
    it("matches renderer for single widget", () => {
        const {renderer} = renderQuestion({
            content: "Here's a widget: [[☃ radio 1]]",
            widgets: {
                "radio 1": {
                    type: "radio",
                    graded: true,
                    options: {
                        choices: [
                            {content: "Option A", correct: true, id: "a"},
                            {content: "Option B", correct: false, id: "b"},
                        ],
                        randomize: false,
                    },
                },
            },
            images: {},
        });

        const utilityIds = extractWidgetIds(renderer);
        const rendererIds = renderer.getWidgetIds();

        expect(utilityIds).toEqual(rendererIds);
        expect(utilityIds).toEqual(["radio 1"]);
    });

    it("matches renderer for multiple widgets", () => {
        const content =
            "[[☃ radio 1]]\n[[☃ numeric-input 2]]\n[[☃ expression 3]]";

        const {renderer} = renderQuestion({
            content,
            widgets: {
                "radio 1": {
                    type: "radio",
                    graded: true,
                    options: {
                        choices: [
                            {content: "Option A", correct: true, id: "a"},
                            {content: "Option B", correct: false, id: "b"},
                        ],
                        randomize: false,
                    },
                },
                "numeric-input 2": {
                    type: "numeric-input",
                    graded: true,
                    options: {
                        answers: [
                            {
                                value: 42,
                                status: "correct",
                                message: "",
                                strict: false,
                                simplify: "optional",
                            },
                        ],
                        size: "normal",
                        coefficient: false,
                        static: false,
                    },
                },
                "expression 3": {
                    type: "expression",
                    graded: true,
                    options: {
                        answerForms: [
                            {
                                value: "x+1",
                                form: false,
                                simplify: false,
                                considered: "ungraded",
                            },
                        ],
                        buttonSets: ["basic"],
                        functions: ["sqrt", "pi", "abs", "factorial"],
                        times: false,
                    },
                },
            },
            images: {},
        });

        const utilityIds = extractWidgetIds(renderer);
        const rendererIds = renderer.getWidgetIds();

        expect(utilityIds).toEqual(rendererIds);
        expect(utilityIds).toEqual([
            "radio 1",
            "numeric-input 2",
            "expression 3",
        ]);
    });

    it("matches renderer with duplicate widget IDs (deduplication)", () => {
        const content =
            "[[☃ radio 1]]\n[[☃ radio 1]]\n[[☃ numeric-input 2]]";

        const {renderer} = renderQuestion({
            content,
            widgets: {
                "radio 1": {
                    type: "radio",
                    graded: true,
                    options: {
                        choices: [
                            {content: "Option A", correct: true, id: "a"},
                            {content: "Option B", correct: false, id: "b"},
                        ],
                        randomize: false,
                    },
                },
                "numeric-input 2": {
                    type: "numeric-input",
                    graded: true,
                    options: {
                        answers: [
                            {
                                value: 42,
                                status: "correct",
                                message: "",
                                strict: false,
                                simplify: "optional",
                            },
                        ],
                        size: "normal",
                        coefficient: false,
                        static: false,
                    },
                },
            },
            images: {},
        });

        const utilityIds = extractWidgetIds(renderer);
        const rendererIds = renderer.getWidgetIds();

        expect(utilityIds).toEqual(rendererIds);
        expect(utilityIds).toEqual(["radio 1", "numeric-input 2"]);
    });

    it("matches renderer for content with no widgets", () => {
        const content = "Just some plain text with no widgets.";

        const {renderer} = renderQuestion({
            content,
            widgets: {},
            images: {},
        });

        const utilityIds = extractWidgetIds(renderer);
        const rendererIds = renderer.getWidgetIds();

        expect(utilityIds).toEqual(rendererIds);
        expect(utilityIds).toEqual([]);
    });
});
