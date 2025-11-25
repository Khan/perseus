/**
 * Color constants we use throughout Perseus (originally on KhanUtil).
 *
 * Note that if the color palette changes substantially, it may also need to be
 * updated in khan-exercises and cherry-picked into graphie-to-png's
 * khan-exercises submodule, as graphie-to-png still relies on the palette
 * provided on KhanUtil.
 */
import {color} from "@khanacademy/wonder-blocks-tokens";

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
    _BACKGROUND: "#FDFDFD", // TODO(eater): Get rid of this altogether.
    INTERACTING: color.blue,
    INTERACTIVE: color.blue,
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

export default KhanColors;
