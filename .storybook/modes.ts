const allModes = {
    // Responsive modes
    small: {
        viewport: "small",
    },
    medium: {
        viewport: "medium",
    },
    large: {
        viewport: "large",
    },
    chromebook: {
        viewport: "chromebook",
    },
    // Theming
    themeDefault: {
        theme: "default",
    },
    themeThunderBlocks: {
        theme: "thunderblocks",
    },
    // Accessibility
    "themeDefault rtl": {
        theme: "default",
        direction: "rtl",
    },
};

export const themeModes = {
    default: allModes.themeDefault,
    thunderblocks: allModes.themeThunderBlocks,
};

export const viewportModes = {
    small: allModes.small,
    medium: allModes.medium,
    large: allModes.large,
    chromebook: allModes.chromebook,
};
