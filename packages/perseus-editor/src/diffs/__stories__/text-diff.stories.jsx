// @flow

import * as React from "react";

import TextDiff from "../text-diff.jsx";

import Wrapper from "./perseus-diff-wrapper.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
    decorators: $ReadOnlyArray<
        (StoryComponent: typeof React.Component) => React.Node,
    >,
|};

export default ({
    title: "Perseus/Editor/Diffs/Text Diff",
    decorators: [
        (StoryComponent) => (
            <Wrapper>
                <StoryComponent />
            </Wrapper>
        ),
    ],
}: Story);

export const Example = (args: StoryArgs): React.Node => {
    return (
        <TextDiff
            title="A day in the life of a text diff"
            before="🥱 Hello world!"
            after="😴 Goodbye world!"
        />
    );
};
