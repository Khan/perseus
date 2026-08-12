import {create} from "storybook/theming";

import themeBase from "./theme-base";

export default create({
    ...themeBase,
    base: "dark",

    // Note can't use WonderBlocks semantic colors here.
    appBg: "#151521", // syl-dark background base subtle
    colorSecondary: "#5753fa", // syl-dark background instructive default
    textColor: "#ededee", // syl-dark foreground neutral strong
});
