import * as React from "react";

import {themeModes} from "../../../../../../../.storybook/modes";
import ArticleRenderer from "../../../../article-renderer";
import {storybookDependenciesV2} from "../../../../testing/test-dependencies";
import {useStorybookApiOptions} from "../../../../testing/use-storybook-api-options";
import {simpleTexQuestion} from "../../sorter.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

function SorterArticle() {
    const apiOptions = useStorybookApiOptions();
    return (
        <ArticleRenderer
            json={simpleTexQuestion}
            seed={0}
            dependencies={storybookDependenciesV2}
            apiOptions={apiOptions}
        />
    );
}

const meta: Meta = {
    title: "Widgets/Sorter/Visual Regression Tests/Article Initial State",
    tags: ["!autodocs", "!manifest"],
    render: () => <SorterArticle />,
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for Sorter cards rendered in an " +
                    "article, where block-math styles add extra spacing.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const TexCards: Story = {};

export const DragAndDropTexCards: Story = {
    globals: {featureFlags: ["dnd-widget-sorter"]},
};
