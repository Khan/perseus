import {Renderer} from "@khanacademy/perseus";
// eslint-disable-next-line monorepo/no-internal-import
import {mockStrings} from "@khanacademy/perseus/strings";

import IFrameRenderer from "../iframe-renderer";

import type {PerseusRenderer} from "@khanacademy/perseus";
import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof IFrameRenderer> = {
    title: "PerseusEditor/IFrameRenderer",
    component: IFrameRenderer,
};

export default meta;
type Story = StoryObj<typeof IFrameRenderer>;

const question: PerseusRenderer = {
    content:
        "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    images: {},
    widgets: {
        "radio 1": {
            graded: true,
            version: {
                major: 1,
                minor: 0,
            },
            static: false,
            type: "radio",
            options: {
                displayCount: null,
                onePerLine: false,
                choices: [
                    {
                        content: "$-8$ and $8$",
                        correct: false,
                        clue: "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
                    },
                    {
                        content: "$-8$",
                        correct: false,
                        clue: "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
                    },
                    {
                        content: "$8$",
                        correct: true,
                        isNoneOfTheAbove: false,
                        clue: "$8$ is the positive square root of $64$.",
                    },
                    {
                        content: "No value of $x$ satisfies the equation.",
                        correct: false,
                        isNoneOfTheAbove: false,
                        clue: "$8$ satisfies the equation.",
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        },
    },
};

export const Primary: Story = {
    args: {
        style: {width: "100%", height: "500px"},
        styleSelector: 'link, style[type="text/css"]',
        children: (
            <Renderer strings={mockStrings} apiOptions={{}} {...question} />
        ),
    },
};
