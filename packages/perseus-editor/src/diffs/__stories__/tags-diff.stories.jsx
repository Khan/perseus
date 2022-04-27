// @flow

import * as React from "react";

import TagsDiff from "../tags-diff.jsx";

import Wrapper from "./perseus-diff-wrapper.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
    decorators: $ReadOnlyArray<
        (StoryComponent: typeof React.Component) => React.Node,
    >,
|};

export default ({
    title: "Perseus/Editor/Diffs/Tags Diff",
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
        <TagsDiff
            title="tags"
            beforeOnly={["Math", "Biology", "History"]}
            afterOnly={["World War I"]}
            intersection={["Physics", "Chemistry"]}
        />
    );
};
