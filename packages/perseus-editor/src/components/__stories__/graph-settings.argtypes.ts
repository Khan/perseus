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
            type: "boolean",
        },
    },
    backgroundImage: {
        control: {
            type: "string",
        },
    },
    markings: {
        control: {
            type: "object",
        },
    },
    rulerLabel: {
        control: {
            type: "string",
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
