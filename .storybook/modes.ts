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

/**
 * Captures a story at the given viewport in both
 * default and thunderblocks themes.
 */
export const viewportThemeModes = (viewport: keyof typeof viewportModes) => ({
    // Turn off the theme-only modes inherited from the file's meta.
    default: {disable: true},
    thunderblocks: {disable: true},
    // Snapshot at the requested width in each theme.
    [`${viewport} default`]: {viewport, theme: "default"},
    [`${viewport} thunderblocks`]: {viewport, theme: "thunderblocks"},
});
