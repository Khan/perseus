import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {matrixRendererDecorator} from "../../__testutils__/matrix-renderer-decorator";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import type {MatrixPublicWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const MatrixWidget = getWidget("matrix")!;

const meta: Meta<typeof MatrixWidget> = {
    title: "Widgets/Matrix/Visual Regression Tests/Initial State",
    component: MatrixWidget,
    tags: ["!autodocs"],
    decorators: [matrixRendererDecorator],
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

type Story = StoryObj<typeof MatrixWidget>;

// Verifies the default empty state: the only inner cell (0,0) has a medium
// border; all other cells (outside the active area) have a thin border.
export const DefaultEmptyMatrix: Story = {
    args: {
        matrixBoardSize: [3, 3],
    } satisfies Partial<MatrixPublicWidgetOptions>,
};

// Verifies the partially-filled state: the top-left 2×2 block inputs
// have medium borders; the remaining cells (outside the active area)
// have a thin border.
export const PartiallyFilledMatrix: Story = {
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
    } satisfies Partial<MatrixPublicWidgetOptions>,
};

// Verifies the fully-answered state: all cells have a medium border.
export const FullyAnsweredMatrix: Story = {
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
    } satisfies Partial<MatrixPublicWidgetOptions>,
};

// Verifies that a TeX prefix and suffix render correctly around the matrix grid.
export const WithPrefixAndSuffix: Story = {
    args: {
        matrixBoardSize: [2, 2],
        prefix: "Given $A =$",
        suffix: "($2 \\times 2$ matrix)",
    } satisfies Partial<MatrixPublicWidgetOptions>,
};

// Verifies that the RTL layout renders the matrix and its prefix/suffix
// correctly when the page direction is right-to-left.
export const WithPrefixAndSuffixRightToLeft: Story = {
    decorators: [matrixRendererDecorator, rtlDecorator],
    args: {
        matrixBoardSize: [2, 2],
        prefix: "Given $A =$",
        suffix: "($2 \\times 2$ matrix)",
    } satisfies Partial<MatrixPublicWidgetOptions>,
};
