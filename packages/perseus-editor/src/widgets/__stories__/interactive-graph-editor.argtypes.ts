export default {
    apiOptions: {
        control: {
            type: "object",
        },
        type: {
            name: "object",
            required: true,
        },
    },

    labels: {
        control: {
            type: "array",
        },
        type: {
            name: "ReadonlyArray<string>",
            required: false,
        },
    },

    range: {
        control: {
            type: "array",
        },
        type: {
            name: "[Range, Range]",
            required: false,
        },
    },

    step: {
        control: {
            type: "array",
        },
        type: {
            name: "[number, number]",
            required: false,
        },
    },

    gridStep: {
        control: {
            type: "array",
        },
        type: {
            name: "[number, number]",
            required: true,
        },
    },

    snapStep: {
        control: {
            type: "array",
        },
        type: {
            name: "[number, number]",
            required: true,
        },
    },

    box: {
        control: {
            type: "array",
        },
        type: {
            name: "[number, number]",
            required: true,
        },
    },

    valid: {
        control: {
            type: "text",
        },
        type: {
            name: "string",
            required: false,
        },
    },

    backgroundImage: {
        control: {
            type: "object",
        },
        type: {
            name: "PerseusImageBackground",
            required: false,
        },
    },

    markings: {
        control: {
            type: "select",
        },
        table: {
            defaultValue: {summary: "graph"},
            type: {
                summary: '"graph" | "grid" | "none"',
            },
        },
        type: {
            name: "enum",
            value: ["graph", "grid", "none"],
            required: false,
        },
    },

    showProtractor: {
        control: {
            type: "boolean",
        },
        type: {
            name: "boolean",
            required: false,
        },
    },

    showRuler: {
        control: {
            type: "boolean",
        },
        type: {
            name: "boolean",
            required: false,
        },
    },

    rulerLabel: {
        control: {
            type: "text",
        },
        type: {
            name: "string",
            required: false,
        },
    },

    rulerTicks: {
        control: {
            type: "number",
        },
        type: {
            name: "number",
            required: false,
        },
    },

    correct: {
        control: {
            // Non-editable in the controls panel because it
            // breaks the story.
            type: null,
        },
        type: {
            name: "object",
            required: false,
        },
    },

    graph: {
        control: {
            type: "object",
        },
        type: {
            name: "object",
            required: true,
        },
    },

    onChange: {
        control: {
            type: "function",
        },
        type: {
            name: "(props: Partial<Props>) => void",
            required: true,
        },
    },
};
