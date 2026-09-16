// TODO(LEMS-4463): Remove the hardcoded colors in this file.
import {sizing} from "@khanacademy/wonder-blocks-tokens";

// @boldFontFamily:        "Lato-Bold", "Lato", sans-serif;
export const boldFontFamily = "'Lato-Bold', 'Lato', sans-serif";

export const white = "#FFFFFF";
export const gray76 = "#BABEC2";
export const gray68 = "#888D93";

// @pure-sm-min: 568px;
export const pureSmMin = "568px";
// @pure-md-min: 768px;
export const pureMdMin = "768px";
// @pure-lg-min: 1024px;
export const pureLgMin = "1024px";
// @pure-xl-min: 1280px;
export const pureXlMin = "1280px";
// @pure-xs-max: (@pure-sm-min - 1);
export const pureXsMax = "567px";
// @pure-sm-max: (@pure-md-min - 1);
export const pureSmMax = "767px";
// @pure-md-max: (@pure-lg-min - 1);
export const pureMdMax = "1023px";
// @pure-lg-max: (@pure-xl-min - 1);
export const pureLgMax = "1279px";
// @phoneMargin: 16px;
export const phoneMargin = 16;

export const negativePhoneMargin = -16;
export const hintBorderWidth = sizing.size_040;

export const hintPaddingInlineStart = sizing.size_160;

export const interactiveSizes = {
    defaultBoxSize: 400,
    defaultBoxSizeSmall: 288,
} as const;

export const circleSize = 24;
export const radioMarginWidth = 2;

export const warningColor = "#f86700";
export const warningColorHover = "#df5c00";
export const warningColorActive = "#c75300";

export const articleMaxWidthInPx = 688;
export const articleMaxWidthTableInPx = 512;
