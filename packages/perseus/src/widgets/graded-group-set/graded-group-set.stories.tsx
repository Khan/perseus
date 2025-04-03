import {storybookDependenciesV2} from "../../../../../testing/test-dependencies";
import ArticleRenderer from "../../article-renderer";

import {article1} from "./graded-group-set.testdata";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Widgets/Graded Group Set",
    component: ArticleRenderer,
    args: {
        dependencies: storybookDependenciesV2,
    },
};
export default meta;

type Story = StoryObj<typeof ArticleRenderer>;

export const Article1: Story = {
    args: {
        json: article1,
    },
};
