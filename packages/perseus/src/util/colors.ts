/**
 * Color constants we use throughout Perseus (originally on KhanUtil).
 *
 * DEPRECATED: This palette is retained only for the interaction editor's
 * color swatches and the measurer widget's graphie rendering. Do not add
 * new uses — use Wonder Blocks semanticColor tokens instead.
 *
 * Note that if the color palette changes substantially, it may also need to be
 * updated in khan-exercises and cherry-picked into graphie-to-png's
 * khan-exercises submodule, as graphie-to-png still relies on the palette
 * provided on KhanUtil.
 */
// eslint-disable-next-line no-restricted-imports -- Replace with semanticColor
import {color} from "@khanacademy/wonder-blocks-tokens";

// TODO(WB-2160): Update these to use the new semanticColor tokens, and use the
// new tokenValue() function to get the raw value of the token. This is
// necessary because graphie only supports raw CSS colors.
const KhanColors = {
    BLUE: color.blue,
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
    GRAY_C: "#E3E5E6",
    GRAY_G: "#626569",
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

export default KhanColors;
