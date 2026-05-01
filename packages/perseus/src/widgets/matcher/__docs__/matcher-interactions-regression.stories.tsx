import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {matcherRendererDecorator} from "../../__testutils__/matcher-renderer-decorator";

import type {PerseusMatcherWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";

const MatcherWidget = getWidget("matcher")!;

const meta: Meta<typeof MatcherWidget> = {
    title: "Widgets/Matcher/Visual Regression Tests/Interactions",
    component: MatcherWidget,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

const sharedArgs = {
    labels: ["Concepts", "Definitions"],
    left: ["Photosynthesis", "Respiration", "Transpiration"],
    right: [
        "Process by which plants convert light to energy",
        "Process by which organisms convert glucose to energy",
        "Process by which water evaporates from plants",
    ],
    padding: true,
    orderMatters: false,
} satisfies Partial<PerseusMatcherWidgetOptions>;

// Verifies the graded state visual appearance after clicking "Check answer":
// captures any color changes applied to the widget and its borders in the
// graded/scored state.
export const GradedState = {
    decorators: [matcherRendererDecorator],
    args: sharedArgs,
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const checkButton = canvas.getByRole("button", {name: "Check answer"});
        await userEvent.click(checkButton);
        await userEvent.click(checkButton);
    },
};
