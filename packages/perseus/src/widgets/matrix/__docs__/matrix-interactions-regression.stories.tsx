import {themeModes} from "../../../../../../.storybook/modes";
import {matrixRendererDecorator} from "../../__testutils__/matrix-renderer-decorator";

import type {MatrixPublicWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<MatrixPublicWidgetOptions> = {
    title: "Widgets/Matrix/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    decorators: [matrixRendererDecorator],
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
    args: {
        matrixBoardSize: [3, 3],
    },
    play: async ({canvas}) => {
        const inputs = canvas.getAllByRole("textbox");
        // Cell (row=2, col=2) is at index 8 in a 3×3 row-major grid
        inputs[8].focus();
    },
};
