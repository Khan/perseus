import {create} from "storybook/theming";

import themeBase from "./theme-base";

export default create({
    ...themeBase,
    base: "light",

    // Note can't use WonderBlocks semantic colors here.
    appBg: "#f7f8fa", // offWhite
    colorSecondary: "#1865f2", // blue
    textColor: "#21242c", // offBlack
});
