import {extractWidgetIds} from "./extract-widget-ids";

import type {
    PerseusRenderer,
    RadioWidget,
    NumericInputWidget,
    ExpressionWidget,
} from "@khanacademy/perseus-core";

export const radio: RadioWidget = {
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

export const numericInput: NumericInputWidget = {
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

export const expression: ExpressionWidget = {
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

describe("extractWidgetIds", () => {
    it("extracts single widget ID", () => {
        const content = "Here's a radio widget: [[☃ radio 1]]";
        const question: PerseusRenderer = {
            content,
            widgets: {
                "radio 1": radio,
            },
            images: {},
        };
        const result = extractWidgetIds(question);
        expect(result).toEqual(["radio 1"]);
    });

    it("extracts multiple widget IDs in order", () => {
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
        const result = extractWidgetIds(question);
        expect(result).toEqual(["radio 1", "numeric-input 2", "expression 3"]);
    });

    it("handles duplicate widget IDs (deduplication)", () => {
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
        const result = extractWidgetIds(question);
        expect(result).toEqual(["radio 1", "numeric-input 2"]);
    });

    it("handles content with no widgets", () => {
        const content = "This is just plain text with no widgets.";
        const question = {
            content,
            widgets: {},
            images: {},
        };
        const result = extractWidgetIds(question);
        expect(result).toEqual([]);
    });

    it("handles empty content", () => {
        const content = "";
        const question = {
            content,
            widgets: {},
            images: {},
        };
        const result = extractWidgetIds(question);
        expect(result).toEqual([]);
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
        const result = extractWidgetIds(question);
        expect(result).toEqual(["radio 1", "numeric-input 2", "expression 3"]);
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
        const result = extractWidgetIds(question, {inline: true});
        expect(result).toEqual(["radio 1"]);
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
        const result = extractWidgetIds(question);
        // Should maintain order of first occurrence
        expect(result).toEqual(["radio 1", "numeric-input 2", "expression 3"]);
    });
});
