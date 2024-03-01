export default {
    box: {
        control: {
            type: "array",
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

    showTooltips: {
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
            type: "select",
        },
        table: {
            type: {
                summary: '"mm", "cm", "m", "km", "in", "ft", "yd", "mi"',
            },
        },
        type: {
            name: "enum",
            value: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
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
};
