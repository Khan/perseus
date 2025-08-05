import {addons} from "storybook/manager-api";

addons.setConfig({
    sidebar: {
        // This will hide the root nodes in the sidebar and show it as folders instead.
        // See docs https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#roots
        showRoots: false,
    },
    theme: {
        base: "light",

        // Brand
        brandTitle: "Perseus",
        brandUrl: "/",
        brandImage: "./perseus-logo.svg",
        brandTarget: "_self",

        // Colors
        colorPrimary: "#1865f2", // blue
        colorSecondary: "#1865f2", // blue

        // UI
        appBg: "#f7f8fa", // offWhite
        appContentBg: "#ffffff",
        appBorderColor: "#e0e0e0",
        appBorderRadius: 4,

        // Typography
        fontBase: '"Lato", sans-serif',
        fontCode: "Inconsolata",

        // Text colors
        textColor: "#21242c", // offBlack
        textInverseColor: "#ffffff",
        textMutedColor: "#757575",

        // Toolbar
        barTextColor: "#2e3438",
        barSelectedColor: "#1865f2",
        barBg: "#ffffff",

        // Form
        inputBg: "#ffffff",
        inputBorder: "#e0e0e0",
        inputTextColor: "#2e3438",
        inputBorderRadius: 4,

        // Additional required properties
        appPreviewBg: "#ffffff",
        barHoverColor: "#f0f0f0",
        buttonBg: "#ffffff",
        buttonBorder: "#e0e0e0",
        booleanBg: "#f7f8fa",
        booleanSelectedBg: "#1865f2",
    },
});
