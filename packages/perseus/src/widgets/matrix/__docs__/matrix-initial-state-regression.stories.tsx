import {themeModes} from "../../../../../../.storybook/modes";
import {
    mobileDecorator,
    rtlDecorator,
} from "../../__testutils__/story-decorators";

import {matrixRendererDecorator} from "./matrix-renderer-decorator";

import type {MatrixPublicWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<MatrixPublicWidgetOptions> = {
    title: "Widgets/Matrix/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Matrix widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Verifies the default empty state: the only inner cell (0,0) has a medium
// border; all other cells (outside the active area) have a thin border.
export const DefaultEmptyMatrix: Story = {
    decorators: [matrixRendererDecorator],
    args: {
        matrixBoardSize: [3, 3],
    },
};

export const SingleRowMatrix: Story = {
    decorators: [matrixRendererDecorator],
    args: {
        matrixBoardSize: [1, 4],
    },
};

export const SingleColumnMatrix: Story = {
    decorators: [matrixRendererDecorator],
    args: {
        matrixBoardSize: [4, 1],
    },
};

// Verifies the mobile keypad rendering: with `customKeypad` enabled, the cells
// render as the larger keypad-style inputs (SimpleKeypadInput) instead of the
// normal text inputs.
export const Mobile: Story = {
    decorators: [matrixRendererDecorator, mobileDecorator],
    parameters: {
        apiOptions: {customKeypad: true},
    },
    args: {
        matrixBoardSize: [3, 3],
    },
};

// Verifies the disabled/read-only state
export const DisabledMatrix: Story = {
    decorators: [matrixRendererDecorator],
    parameters: {
        apiOptions: {readOnly: true},
        initialUserInput: {
            "matrix 1": {
                answers: [
                    ["1", "2", "3"],
                    ["4", "5", "6"],
                    ["7", "8", "9"],
                ],
            },
        },
    },
    args: {
        matrixBoardSize: [3, 3],
    },
};

// Verifies the matrix renders correctly inside a markdown table cell — the
// most common way it appears in Test Everything content.
export const InMarkdownTable: Story = {
    decorators: [matrixRendererDecorator],
    parameters: {
        content:
            "| Matrix | Description |\n" +
            "| --- | --- |\n" +
            "| [[☃ matrix 1]] | A $2 \\times 2$ matrix |",
    },
    args: {
        matrixBoardSize: [2, 2],
    },
};

// Verifies the partially-filled state: the top-left 2×2 block inputs
// have medium borders; the remaining cells (outside the active area)
// have a thin border.
export const PartiallyFilledMatrix: Story = {
    decorators: [matrixRendererDecorator],
    parameters: {
        initialUserInput: {
            "matrix 1": {
                answers: [
                    ["1", "2"],
                    ["3", "4"],
                ],
            },
        },
    },
    args: {
        matrixBoardSize: [4, 4],
    },
};

// Verifies the fully-answered state: all cells have a medium border.
export const FullyAnsweredMatrix: Story = {
    decorators: [matrixRendererDecorator],
    parameters: {
        initialUserInput: {
            "matrix 1": {
                answers: [
                    ["1", "2", "3"],
                    ["4", "5", "6"],
                    ["7", "8", "9"],
                ],
            },
        },
    },
    args: {
        matrixBoardSize: [3, 3],
    },
};

// Verifies that a TeX prefix and suffix render correctly around the matrix grid.
export const WithPrefixAndSuffix: Story = {
    decorators: [matrixRendererDecorator],
    args: {
        matrixBoardSize: [2, 2],
        prefix: "Prefix $A =$",
        suffix: "($2 \\times 2$ suffix)",
    },
};

// Verifies that the matrix and its prefix/suffix stay left-to-right when the
// page direction is right-to-left, matching the WithPrefixAndSuffix story
// but right-aligned within the page.
export const WithPrefixAndSuffixRightToLeft: Story = {
    decorators: [matrixRendererDecorator, rtlDecorator],
    args: {
        matrixBoardSize: [2, 2],
        prefix: "Prefix $A =$",
        suffix: "($2 \\times 2$ suffix)",
    },
};

// Verifies that the matrix stays left-to-right on an RTL page. Matrices always
// render LTR, even in RTL languages, so this story should look identical to
// the DefaultEmptyMatrix story but right-aligned within the page.
export const EmptyMatrixRTL: Story = {
    decorators: [matrixRendererDecorator, rtlDecorator],
    args: {
        matrixBoardSize: [3, 3],
    },
};
