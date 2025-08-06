import {create} from "storybook/theming";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

export default create({
    base: "light",

    // Brand
    brandTitle: "Perseus",
    brandUrl: "/",
    brandImage: "./perseus-logo.svg",
    brandTarget: "_self",

    appBg: semanticColor.surface.secondary,
    colorSecondary: semanticColor.core.background.instructive.default,

    // Typography
    fontBase: '"Lato", sans-serif',
    fontCode: "Inconsolata",

    // Text colors
    textColor: semanticColor.core.background.neutral.strong,
});
