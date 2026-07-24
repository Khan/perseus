import {themeModes} from "../../../../../../.storybook/modes";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import {matrixRendererDecorator} from "./matrix-renderer-decorator";

import type {MatrixPublicWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<MatrixPublicWidgetOptions> = {
    title: "Widgets/Matrix/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Matrix widget that DO need " +
                    "some sort of interaction to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Verifies that focusing a cell that is initially outside the active area
// (gray, #f3f3f3) expands the highlighted region so all cells in the 3×3
// grid become active (white, #fff). Focuses the bottom-right cell (row 2,
// col 2), which is index 8 in row-major order.
export const FocusedOutsideCell: Story = {
    decorators: [matrixRendererDecorator],
    args: {
        matrixBoardSize: [3, 3],
    },
    play: async ({canvas}) => {
        const inputs = canvas.getAllByRole("textbox");
        // Cell (row=2, col=2) is at index 8 in a 3×3 row-major grid
        inputs[8].focus();
    },
};

// Verifies that typing into the cells fills the grid: the typed values appear
// in each cell and the active (highlighted) area — bounded by the brackets —
// expands to cover the whole 3×3 grid once every cell has a value.
export const TypeIntoCells: Story = {
    decorators: [matrixRendererDecorator],
    args: {
        matrixBoardSize: [3, 3],
    },
    play: async ({canvas, userEvent}) => {
        const inputs = canvas.getAllByRole("textbox");
        // Fill every cell in row-major order so the brackets grow to enclose
        // the full grid as it fills.
        for (let i = 0; i < inputs.length; i++) {
            await userEvent.type(inputs[i], String(i + 1));
        }
    },
};

// Verifies that the matrix stays left-to-right on an RTL page. Matrices always
// render LTR, even in RTL languages, so this story should look identical to
// the FocusedOutsideCell story but right-aligned within the page.
export const FocusedOutsideCellRTL: Story = {
    decorators: [matrixRendererDecorator, rtlDecorator],
    args: {
        matrixBoardSize: [3, 3],
    },
    play: async ({canvas}) => {
        const inputs = canvas.getAllByRole("textbox");
        // Cell (row=2, col=2) is at index 8 in a 3×3 row-major grid
        inputs[8].focus();
    },
};
