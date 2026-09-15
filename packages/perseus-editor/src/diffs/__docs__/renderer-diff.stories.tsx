import {
    generateRadioWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {registerWidgetsDecorator} from "../../../../perseus/src/widgets/__testutils__/story-decorators";
import {radioRegistration} from "../../../../perseus/src/widgets/radio";
import RendererDiff from "../renderer-diff";

import Wrapper from "./perseus-diff-wrapper";

import "../../styles/perseus-editor.css";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Editors/Diffs/Renderer Diff",
    component: RendererDiff,
    decorators: [
        (StoryComponent) => (
            <Wrapper>
                <StoryComponent />
            </Wrapper>
        ),
        registerWidgetsDecorator([radioRegistration]),
    ],
};

export default meta;

type Story = StoryObj<typeof RendererDiff>;

export const Demo: Story = {
    args: {
        title: "A day in the life of a text diff",
        before: generateTestPerseusRenderer({
            content: "🥱 Hello world!",
            widgets: {},
        }),
        after: generateTestPerseusRenderer({
            content: "😴 Goodbye world!",
            widgets: {},
        }),
    },
};

export const WidgetAdded: Story = {
    args: {
        title: "A day in the life of a text diff",
        before: generateTestPerseusRenderer({
            content: "🥱 Hello world!",
            widgets: {},
        }),
        after: generateTestPerseusRenderer({
            content: "😴 Goodby world! [[☃ radio 1]]",
            widgets: {
                "radio 1": generateRadioWidget(),
            },
        }),
    },
};

export const WidgetRemoved: Story = {
    args: {
        title: "A day in the life of a text diff",
        before: generateTestPerseusRenderer({
            content: "🥱 Hello world! [[☃ radio 1]]",
            widgets: {
                "radio 1": generateRadioWidget(),
            },
        }),
        after: generateTestPerseusRenderer({
            content: "😴 Goodbye world!",
            widgets: {},
        }),
    },
};
