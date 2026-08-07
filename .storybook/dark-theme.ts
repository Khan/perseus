import {create} from "storybook/theming";

export default create({
    base: "dark",

    // Brand
    brandTitle: "Perseus",
    brandUrl: "/",
    brandImage: "./perseus-logo.svg",
    brandTarget: "_self",

    // Note can't use WonderBlocks semantic colors here.
    appBg: "#151521", // syl-dark background base subtle
    colorSecondary: "#5753fa", // syl-dark background instructive default

    // Typography
    fontBase: '"Lato", sans-serif',
    fontCode: "Inconsolata",

    // Text colors
    textColor: "#ededee", // syl-dark foreground neutral strong
});
