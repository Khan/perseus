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
