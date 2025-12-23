export default {
    box: {
        control: {
            type: "object" as const,
        },
    },

    labels: {
        control: {
            type: "object" as const,
        },
    },

    range: {
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
            type: "text" as const,
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

    rulerLabel: {
        control: {
            type: "select" as const,
        },
        options: ["", "mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    },

    rulerTicks: {
        control: {
            type: "number" as const,
        },
    },

    onChange: {
        control: false as const,
    },
};
