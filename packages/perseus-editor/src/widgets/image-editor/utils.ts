import {sizing} from "@khanacademy/wonder-blocks-tokens";

// TODO(LEMS-3686): Use CSS modules after Wonder Blocks styles
// are moved to a different layer.
export const wbFieldStyles = {
    root: {
        marginBlockEnd: sizing.size_080,
    },
    label: {
        paddingBlockEnd: sizing.size_040,
    },
};

export const wbFieldStylesWithDescription = {
    ...wbFieldStyles,
    label: {
        ...wbFieldStyles.label,
        paddingBlockEnd: 0,
    },
    description: {
        paddingBlockStart: 0,
        paddingBlockEnd: sizing.size_040,
    },
};

/**
 * Given a known aspect ratio, and a new side length,
 * return the other side length that maintains the aspect ratio.
 *
 * Ratio math: x/y = x'/y'
 *    newWidth/newHeight = width/height
 * => newWidth = (newHeight * width) / height
 * or
 *    newHeight/newWidth = height/width
 * => newHeight = (newWidth * height) / width
 */
export function getOtherSideLengthWithPreservedAspectRatio(
    sideLength: number,
    otherSideLength: number,
    newSideLength: number,
): number {
    // Don't allow dividing by zero.
    if (sideLength === 0) {
        return NaN;
    }

    // Disallow setting image dimensions to zero in order to avoid
    // the image dimensions no longer being preserved.
    // (If one side gets changed to 0, so does the other one, and then
    // we don't know what the original aspect ratio was anymore.)
    if (newSideLength === 0 || otherSideLength === 0) {
        return NaN;
    }

    return (newSideLength * otherSideLength) / sideLength;
}
