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
 * Checks if a dimension is invalid. A dimension is valid if it's
 * a positive, non-infinite number.
 * @param dimension - The dimension (height or width) to check.
 * @returns True if the dimension is invalid, false otherwise.
 */
export function isInvalidDimension(dimension: number): boolean {
    return isNaN(dimension) || dimension <= 0 || dimension === Infinity;
}
