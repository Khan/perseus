/**
 * Color constants we use throughout Perseus (originally on KhanUtil).
 *
 * Note that if the color palette changes substantially, it may also need to be
 * updated in khan-exercises and cherry-picked into graphie-to-png's
 * khan-exercises submodule, as graphie-to-png still relies on the palette
 * provided on KhanUtil.
 */

// eslint-disable-next-line no-restricted-imports -- Replace color with semanticColor
import {color, semanticColor} from "@khanacademy/wonder-blocks-tokens";

// TODO(WB-2160): Update these to use the new semanticColor tokens, and use the
// new tokenValue() function to get the raw value of the token. This is
// necessary because graphie only supports raw CSS colors.
const KhanColors = {
    BLUE: color.blue,
    ORANGE: "#FFA500",
    PINK: "#FF00AF",
    GREEN: color.green,
    PURPLE: "#9D38BD",
    RED: "#DF0030",
    GRAY: "gray",
    BLACK: "black",
    LIGHT_BLUE: "#9AB8ED",
    LIGHT_ORANGE: "#EDD19B",
    LIGHT_PINK: "#ED9BD3",
    LIGHT_GREEN: "#9BEDCE",
    LIGHT_PURPLE: "#DA9BED",
    LIGHT_RED: "#ED9AAC",
    LIGHT_GRAY: "#ED9B9B",
    LIGHT_BLACK: "#ED9B9B",
    GRAY10: "#D6D6D6",
    GRAY20: "#CDCDCD",
    GRAY30: "#B3B3B3",
    GRAY40: "#9A9A9A",
    GRAY50: "#808080",
    GRAY60: "#666666",
    GRAY70: "#4D4D4D",
    GRAY80: "#333333",
    GRAY90: "#1A1A1A",
    BLUE_A: "#CCFAFF",
    BLUE_B: "#80F6FF",
    BLUE_C: "#63D9EA",
    BLUE_D: "#11ACCD",
    BLUE_E: "#0C7F99",
    TEAL_A: "#94FFF5",
    TEAL_B: "#26EDD5",
    TEAL_C: "#01D1C1",
    TEAL_D: "#01A995",
    TEAL_E: "#208170",
    GREEN_A: "#B6FFB0",
    GREEN_B: "#8AF281",
    GREEN_C: "#74CF70",
    GREEN_D: "#1FAB54",
    GREEN_E: "#0D923F",
    GOLD_A: "#FFD0A9",
    GOLD_B: "#FFBB71",
    GOLD_C: "#FF9C39",
    GOLD_D: "#E07D10",
    GOLD_E: "#A75A05",
    RED_A: "#FCA9A9",
    RED_B: "#FF8482",
    RED_C: "#F9685D",
    RED_D: "#E84D39",
    RED_E: "#BC2612",
    MAROON_A: "#FFBDE0",
    MAROON_B: "#FF92C6",
    MAROON_C: "#ED5FA6",
    MAROON_D: "#CA337C",
    MAROON_E: "#9E034E",
    PURPLE_A: "#DDD7FF",
    PURPLE_B: "#C6B9FC",
    PURPLE_C: "#AA87FF",
    PURPLE_D: "#7854AB",
    PURPLE_E: "#543B78",
    MINT_A: "#F5F9E8",
    MINT_B: "#EDF2DF",
    MINT_C: "#E0E5CC",
    GRAY_A: "#F6F7F7",
    GRAY_B: "#F0F1F2",
    GRAY_C: "#E3E5E6",
    GRAY_D: "#D6D8DA",
    GRAY_E: "#BABEC2",
    GRAY_F: "#888D93",
    GRAY_G: "#626569",
    GRAY_H: "#3B3E40",
    GRAY_I: "#21242C",
    KA_BLUE: "#314453",
    KA_GREEN: "#71B307",
    // Don't actually use _BACKGROUND! Make things transparent instead. The
    // background color used in exercises is subject to change at the whim
    // of any redesigns.
    _BACKGROUND: "#FDFDFD",
    INTERACTING: color.green,
    INTERACTIVE: color.green,
    DYNAMIC: color.blue,
} as const;

/**
 * Traverses the DOM ancestry of the given element until it finds an element with a
 * non-transparent background color, returning that color. If no such element is found,
 * returns the default background color.
 *
 * @param elementToInspect the HTMLElement to start inspecting.
 * @returns a string representing the background color, or a CSS variable for the default background color.
 */
export const getBackgroundColor = (elementToInspect: HTMLElement): string => {
    const backgroundColor =
        window.getComputedStyle(elementToInspect).backgroundColor;
    if (
        backgroundColor !== "rgba(0, 0, 0, 0)" &&
        backgroundColor !== "transparent"
    ) {
        return backgroundColor;
    }
    const parentElement = elementToInspect.parentElement;
    if (parentElement?.tagName.toLowerCase() === "html" || !parentElement) {
        return "var(--wb-semanticColor-core-background-base-default)";
    }
    return getBackgroundColor(parentElement);
};

interface RGB {
    r: number;
    g: number;
    b: number;
}

// Tested via Storybook, since JSDOM doesn't implement the canvas API.
/**
 * Resolves a CSS color into its red, green, and blue components.
 * @param color - can be hex, a name like `"black"`, or e.g. `rgb(0, 0, 0)`.
 */
export function resolveColor(color: string): RGB {
    if (color[0] === "#") {
        return parseHexColor(color);
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return {r: 0, g: 0, b: 0};
    }
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return {r, g, b};
}

const lightModeHexForMathColor = {
    [semanticColor.learning.math.foreground.blue]: "#3D7586",
    [semanticColor.learning.math.foreground.gold]: "#946700",
    [semanticColor.learning.math.foreground.green]: "#447A53",
    [semanticColor.learning.math.foreground.gray]: "#5D5F66",
    [semanticColor.learning.math.foreground.grayH]: "#3B3D45",
    [semanticColor.learning.math.foreground.grayI]: "#21242C",
    [semanticColor.learning.math.foreground.purple]: "#594094",
    [semanticColor.learning.math.foreground.purpleD]: "#8351E8",
    [semanticColor.learning.math.foreground.pink]: "#B25071",
    [semanticColor.learning.math.foreground.red]: "#D92916",
};

export function toClosestMathColor(target: string): string {
    const targetRGB = resolveColor(target);
    let closestRGB = {r: 0, g: 0, b: 0};
    let closestCSSVar = semanticColor.core.foreground.neutral.strong;
    for (const [cssVar, hex] of Object.entries(lightModeHexForMathColor)) {
        const candidate = resolveColor(hex);
        if (
            diffColors(targetRGB, candidate) < diffColors(targetRGB, closestRGB)
        ) {
            closestRGB = candidate;
            closestCSSVar = cssVar;
        }
    }
    return closestCSSVar;
}

export function parseHexColor(hex: string): RGB {
    // This case also parses four-digit hex like #1234, but discards the alpha
    // channel.
    const threeDigitMatch = hex.match(
        /^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])?$/,
    );
    if (threeDigitMatch) {
        return {
            r: parseInt(threeDigitMatch[1], 16) * 17,
            g: parseInt(threeDigitMatch[2], 16) * 17,
            b: parseInt(threeDigitMatch[3], 16) * 17,
        };
    }

    // This case also parses eight-digit hex like #11223344, but discards the
    // alpha channel.
    const sixDigitMatch = hex.match(
        /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/,
    );
    if (sixDigitMatch) {
        return {
            r: parseInt(sixDigitMatch[1], 16),
            g: parseInt(sixDigitMatch[2], 16),
            b: parseInt(sixDigitMatch[3], 16),
        };
    }
    return {r: 0, g: 0, b: 0};
}

/**
 * Uses a variant of the "redmean" algorithm to determine how similar two
 * colors are. In contrast to redmean, we skip taking the square root of the
 * result, which means this function gives you a relative difference, not an
 * absolute difference.
 * See: https://en.wikipedia.org/wiki/Color_difference
 */
export function diffColors(a: RGB, b: RGB): number {
    const redMean = (a.r + b.r) / 2;
    const redWeight = 2 + redMean / 256;
    const blueWeight = 2 + (255 - redMean) / 256;
    const greenWeight = 4;
    const dr = a.r - b.r;
    const dg = a.g - b.g;
    const db = a.b - b.b;
    return redWeight * dr * dr + greenWeight * dg * dg + blueWeight * db * db;
}

export default KhanColors;
