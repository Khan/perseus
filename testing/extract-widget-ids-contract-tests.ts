import type {
    ExpressionWidget,
    NumericInputWidget,
    PerseusRenderer,
    RadioWidget,
} from "@khanacademy/perseus-core";

const radio: RadioWidget = {
    type: "radio",
    graded: true,
    options: {
        choices: [
            {content: "Option A", correct: true, id: "a"},
            {content: "Option B", correct: false, id: "b"},
        ],
        randomize: false,
    },
};

const numericInput: NumericInputWidget = {
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
};

const expression: ExpressionWidget = {
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
};

/**
 * Contract test helper that verifies widget ID extraction implementations
 * produce identical results. Tests both the Renderer component method and
 * the standalone utility function against the same scenarios to ensure
 * behavioral consistency.
 */
export function testWidgetIdExtraction(
    name: string,
    runExtractor: (
        r: PerseusRenderer,
        options?: {inline?: boolean},
    ) => readonly string[],
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

        it("handles empty content", () => {
            const content = "";
            const question = {
                content,
                widgets: {},
                images: {},
            };
            const widgetIds = runExtractor(question);
            expect(widgetIds).toEqual([]);
        });

        it("handles widgets mixed with other markdown", () => {
            const content = `
# Heading

Some text with **bold** and *italic*.

[[☃ radio 1]]

More text and a list:
- Item 1
- Item 2

[[☃ numeric-input 2]]

Some math: $x + y = z$

[[☃ expression 3]]
        `;
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

        it("handles inline parsing option", () => {
            const content = "Inline widget: [[☃ radio 1]]";
            const question: PerseusRenderer = {
                content,
                widgets: {
                    "radio 1": radio,
                },
                images: {},
            };
            const widgetIds = runExtractor(question, {inline: false});
            expect(widgetIds).toEqual(["radio 1"]);
        });

        it("preserves order even with duplicates", () => {
            const content =
                "[[☃ radio 1]]\n[[☃ numeric-input 2]]\n[[☃ radio 1]]\n[[☃ expression 3]]\n[[☃ numeric-input 2]]";
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
            // Should maintain order of first occurrence
            expect(widgetIds).toEqual([
                "radio 1",
                "numeric-input 2",
                "expression 3",
            ]);
        });
    });
}
