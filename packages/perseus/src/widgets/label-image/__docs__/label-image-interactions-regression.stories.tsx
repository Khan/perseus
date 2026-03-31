import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {textQuestion} from "../__tests__/label-image.testdata";

import type {Meta} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Label Image/Visual Regression Tests/Interactions",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

// Verifies the marker open/selected state: clicking a marker button opens the
// answer choices dropdown and shows the active marker styling.
export const MarkerOpened = {
    args: {
        item: generateTestPerseusItem({question: textQuestion}),
    },
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const marker = canvas.getByLabelText("The fourth unlabeled bar line.");
        await userEvent.click(marker);
    },
};
