import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";

import {sorterRendererDecorator} from "./sorter-renderer-decorator";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";

const SorterWidget = getWidget("sorter")!;

const meta: Meta<typeof SorterWidget> = {
    title: "Widgets/Sorter/Visual Regression Tests/Interactions",
    component: SorterWidget,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

const defaultArgs = {
    correct: ["20,000 micrograms", "15 grams", "0.05 kilograms", "100 grams"],
    padding: true,
    layout: "horizontal",
} satisfies Partial<PerseusSorterWidgetOptions>;

// Verifies the dragging state: after pressing and holding a card, the card
// renders with a warm yellow background (#ffedcd) indicating it is being
// dragged.
export const DraggingCard = {
    decorators: [sorterRendererDecorator],
    args: defaultArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const cards = canvas.getAllByRole("listitem");
        await userEvent.pointer({
            target: cards[0],
            keys: "[MouseLeft>]",
        });
        // Wait one animation frame for the drag state to be applied.
        await new Promise((resolve) => requestAnimationFrame(resolve));
    },
};
