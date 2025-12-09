import * as React from "react";

import TextDiff from "../text-diff";

import Wrapper from "./perseus-diff-wrapper";

import type {TextDiffProps} from "../text-diff";

import "../../styles/perseus-editor.css";

type StoryArgs = Record<string, TextDiffProps>;

type Story = {
    title: string;
    decorators: ReadonlyArray<
        (StoryComponent: typeof React.Component) => React.ReactElement
    >;
};

export default {
    title: "PerseusEditor/Diffs/Text Diff",
    decorators: [
        (StoryComponent) => (
            <Wrapper>
                <StoryComponent />
            </Wrapper>
        ),
    ],
} as Story;

export const TextExample = (args: StoryArgs): React.ReactElement => {
    return (
        <TextDiff
            title="A day in the life of a text diff"
            before="🥱 Hello world!"
            after="😴 Goodbye world!"
        />
    );
};

export const ImageExample = (args: StoryArgs): React.ReactElement => {
    return (
        <TextDiff
            title="A day in the life of a text diff"
            before="🥱 Hello world! and ![an image](https://cdn.kastatic.org/ka-content-images/4f38f705977774bcac3b5bed9f81b56710abc8b0.png) ![graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ac8f769a7323f55e41c12cfa39e774be08bc138) ![another graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/669d6011774f3c0f6809553d210b4f51b7e3e4fe)"
            after="😴 Goodbye world! and ![graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ac8f769a7323f55e41c12cfa39e774be08bc138) ![another graphie image](web+graphie://ka-perseus-graphie.s3.amazonaws.com/669d6011774f3c0f6809553d210b4f51b7e3e4fe) ![A graph](https://fastly.kastatic.org/ka-perseus-images/9757eb155d1283bb137d0cfdaf9818fd600702ed.png)"
        />
    );
};
