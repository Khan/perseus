export default {
    editableSettings: {
        control: {
            type: "multi-select" as const,
            options: ["canvas", "graph", "snap", "image", "measure"],
        },
    },
    box: {
        control: {
            type: "object" as const,
        },
    },
    range: {
        control: {
            type: "object" as const,
        },
    },
    labels: {
        control: {
            type: "object" as const,
        },
    },
    step: {
        control: {
            type: "object" as const,
        },
    },
    gridStep: {
        control: {
            type: "object" as const,
        },
    },
    snapStep: {
        control: {
            type: "object" as const,
        },
    },
    valid: {
        control: {
            type: "boolean" as const,
        },
    },
    backgroundImage: {
        control: {
            type: "object" as const,
        },
    },
    markings: {
        control: {
            type: "select" as const,
        },
        options: ["axes", "graph", "grid", "none"],
    },
    rulerLabel: {
        control: {
            type: "text" as const,
        },
    },
    rulerTicks: {
        control: {
            type: "number" as const,
        },
    },
    showProtractor: {
        control: {
            type: "boolean" as const,
        },
    },
    showRuler: {
        control: {
            type: "boolean" as const,
        },
    },
    showTooltips: {
        control: {
            type: "boolean" as const,
        },
    },
    onChange: {
        control: false as const,
    },
};
