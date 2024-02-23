export default {
    editableSettings: {
        control: {
            type: "array",
            options: ["canvas", "graph", "snap", "image", "measure"],
        },
    },
    box: {
        control: {
            type: "array",
        },
    },
    range: {
        control: {
            type: "object",
        },
    },
    labels: {
        control: {
            type: "object",
        },
    },
    step: {
        control: {
            type: "object",
        },
    },
    gridStep: {
        control: {
            type: "object",
        },
    },
    snapStep: {
        control: {
            type: "object",
        },
    },
    valid: {
        control: {
            type: "text",
        },
    },
    backgroundImage: {
        control: {
            type: "text",
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
    rulerLabel: {
        control: {
            type: "text",
        },
    },
    rulerTicks: {
        control: {
            type: "number",
        },
    },
    showTooltips: {
        control: {
            type: "boolean",
        },
    },
    onChange: {
        control: {
            type: "function",
        },
    },
};
