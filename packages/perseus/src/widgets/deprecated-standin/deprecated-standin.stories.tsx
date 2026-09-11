import QuestionRendererForStories from "../__testutils__/question-renderer-for-stories";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Deprecated Standin",
    component: QuestionRendererForStories,
    tags: ["!dev"],
};
export default meta;

type Story = StoryObj<typeof QuestionRendererForStories>;

const question1 = {
    content:
        "$\\overleftrightarrow{MN}$ is the perpendicular bisector of segment $\\overline{JL}$.  \n\n**Perform a reflection that proves $M$ must be equidistant from $J$ and $L$ and select the option which explains the proof.**  \nThe statement must be true for any point $M$ which lies on the perpendicular bisector.  \n\n[[☃ standin 1]]  \n\n",
    images: {
        "https://ka-perseus-images.s3.amazonaws.com/6cf0d9f007084e9d06e3ce0e241416dde920ec9c.png":
            {height: 503, width: 504},
    },
    widgets: {
        "standin 1": {
            graded: true,
            options: {},
            type: "deprecated-standin",
            version: {major: 0, minor: 0},
        },
    },
} as const;

export const Question1: Story = {
    args: {
        // The current widget type map intentionally excludes deprecated-standin.
        // eslint-disable-next-line no-restricted-syntax
        question: question1 as PerseusRenderer,
    },
};
