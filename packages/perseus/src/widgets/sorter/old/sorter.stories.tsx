import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import WrappedServerItemRenderer from "../../../server-item-renderer";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {articleDecorator} from "../../__testutils__/story-decorators";
import {simpleTexQuestion, texQuestion} from "../sorter.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Sorter",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to arrange items in a specific order by dragging and dropping.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof WrappedServerItemRenderer>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({question: texQuestion}),
    },
};

export const AnswerlessQuestion1: Story = {
    args: {
        item: generateTestPerseusItem({question: texQuestion}),
    },
};

export const SimpleTexInArticle: Story = {
    decorators: [articleDecorator],
    tags: ["dev"],
    args: {
        item: generateTestPerseusItem({question: simpleTexQuestion}),
    },
};
