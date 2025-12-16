import * as React from "react";

import TextDiff from "../text-diff";

import Wrapper from "./perseus-diff-wrapper";

import "../../styles/perseus-editor.css";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Editors/Diffs/Text Diff",
    component: TextDiff,
    decorators: [
        (StoryComponent) => (
            <Wrapper>
                <StoryComponent />
            </Wrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof TextDiff>;

export const TextExample: Story = {
    args: {
        title: "A day in the life of a text diff",
        before: "🥱 Hello world!",
        after: "😴 Goodbye world!",
    },
};

export const ImageExample: Story = {
    args: {
        title: "A day in the life of a text diff",
        before: "🥱 Hello world! and ![an image](https://cdn.kastatic.org/ka-content-images/4f38f705977774bcac3b5bed9f81b56710abc8b0.png) ![graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ac8f769a7323f55e41c12cfa39e774be08bc138) ![another graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/669d6011774f3c0f6809553d210b4f51b7e3e4fe)",
        after: "😴 Goodbye world! and ![graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ac8f769a7323f55e41c12cfa39e774be08bc138) ![another graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/669d6011774f3c0f6809553d210b4f51b7e3e4fe) ![A graph](https://fastly.kastatic.org/ka-perseus-images/9757eb155d1283bb137d0cfdaf9818fd600702ed.png)",
    },
};
