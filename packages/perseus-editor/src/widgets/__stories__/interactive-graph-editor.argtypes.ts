import InteractiveGraphSettingsArgTypes from "../../components/__stories__/interactive-graph-settings.argtypes";

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

    lockedFigures: {
        control: {
            type: "object",
        },
        type: {
            name: "Array<LockedFigure>",
            required: false,
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

    // InteractiveGraphEditor includes all the same props as
    // InteractiveGraphSettings, so we can reuse the argtypes.
    ...InteractiveGraphSettingsArgTypes,
};
