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
            type: "object",
        },
    },
    markings: {
        control: {
            type: "select",
        },
        table: {
            type: {
                summary: '"axes" | "graph" | "grid" | "none"',
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
