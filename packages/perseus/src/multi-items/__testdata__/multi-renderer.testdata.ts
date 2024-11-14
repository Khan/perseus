import shapes from "../shapes";

import type {Item} from "../item-types";
import type {Shape} from "../shape-types";

export const simpleQuestionShape: Shape = shapes.shape({
    blurb: shapes.content,
    question: shapes.content,
    hints: shapes.hints,
});

// Shape: simpleQuestionShape
export const question1: Item = {
    _multi: {
        blurb: {
            __type: "content",
            content: "",
            images: {},
            widgets: {},
        },
        hints: [
            {
                __type: "hint",
                content:
                    "If two triangles are congruent, then they have the same side lengths and angle measures.",
                images: {},
                replace: false,
                widgets: {},
            },
            {
                __type: "hint",
                content:
                    "A triangle congruent to triangle $ABC$ must also have side lengths of $12$, $14$ and $20$.",
                images: {},
                replace: false,
                widgets: {},
            },
            {
                __type: "hint",
                content:
                    "The following triangle is congruent to triangle $ABC$:\n\n* A triangle with side lengths of $12$, $14$, and $20$",
                images: {},
                replace: false,
                widgets: {},
            },
        ],
        question: {
            __type: "content",
            content:
                "Triangle $ABC$ has side lengths of $12$, $14$, and $20$. Which of the following triangles is congruent to triangle $ABC$ ?\n\n[[☃ radio 1]]\n\nEnter the number 3 into this field: [[☃ numeric-input 1]]",
            widgets: {
                "radio 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        choices: [
                            {
                                clue: "Congruent triangles have the same side lengths.",
                                content:
                                    "A triangle with side lengths of $3$, $4$, and $5$",
                                correct: false,
                            },
                            {
                                clue: "Congruent triangles have the same side lengths.\n\nThis choice is similar to triangle $ABC$.",
                                content:
                                    "A triangle with side lengths of $6$, $7$, and $10$",
                                correct: false,
                            },
                            {
                                clue: "Congruent triangles have the same side lengths.",
                                content:
                                    "A triangle with side lengths of $10$, $12$, and $18$",
                                correct: false,
                                isNoneOfTheAbove: false,
                            },
                            {
                                clue: "Congruent triangles have the same side lengths.",
                                content:
                                    "A triangle with side lengths of $12$, $14$, and $20$",
                                correct: true,
                                isNoneOfTheAbove: false,
                            },
                            {
                                clue: "Congruent triangles have the same side lengths.\n\nThis choice is similar to triangle $ABC$.",
                                content:
                                    "A triangle with side lengths of $24$, $28$, and $40$",
                                correct: false,
                                isNoneOfTheAbove: false,
                            },
                        ],
                        countChoices: false,
                        deselectEnabled: false,
                        displayCount: null,
                        hasNoneOfTheAbove: false,
                        multipleSelect: false,
                        randomize: false,
                    },
                    static: false,
                    type: "radio",
                    version: {
                        major: 1,
                        minor: 0,
                    },
                },
                "numeric-input 1": {
                    type: "numeric-input",
                    graded: true,
                    options: {
                        static: false,
                        answers: [
                            {
                                value: -42,
                                status: "correct",
                                message: "",
                                simplify: "required",
                                strict: true,
                                maxError: 0.1,
                            },
                        ],
                        size: "normal",
                        coefficient: false,
                        labelText: "",
                        rightAlign: false,
                    },
                },
            },
        },
    },
};

const definitionWidgetConfig = {
    graded: true,
    version: {major: 0, minor: 0},
    static: false,
    type: "definition",
    options: {
        togglePrompt: "word",
        definition: "",
        static: false,
    },
    alignment: "default",
} as const;

// Shape: simpleQuestionShape
export const definitionQuestion1: Item = {
    _multi: {
        blurb: {
            __type: "content",
            content: "Here's a blurb [[☃ definition 1]]",
            images: {},
            widgets: {
                "definition 1": definitionWidgetConfig,
            },
        },
        hints: [
            {
                __type: "hint",
                content: "Hint #1 [[☃ definition 2]]",
                images: {},
                replace: false,
                widgets: {
                    "definition 2": definitionWidgetConfig,
                },
            },
            {
                __type: "hint",
                content: "Hint #1 [[☃ definition 3]]",
                images: {},
                replace: false,
                widgets: {
                    "definition 3": definitionWidgetConfig,
                },
            },
        ],
        question: {
            __type: "content",
            content:
                "What is the answer to this?\n\n[[☃ definition 4]]\n\n[[☃ definition 5]]",
            widgets: {
                "definition 4": definitionWidgetConfig,
                "definition 5": definitionWidgetConfig,
            },
        },
    },
};
