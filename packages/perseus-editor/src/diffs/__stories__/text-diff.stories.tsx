import * as React from "react";

import TextDiff from "../text-diff";

import Wrapper from "./perseus-diff-wrapper";

type StoryArgs = Record<any, any>;

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

export const Example = (args: StoryArgs): React.ReactElement => {
    return (
        <TextDiff
            title="A day in the life of a text diff"
            before="🥱 Hello world!"
            after="😴 Goodbye world!"
        />
    );
};
