import * as React from "react";

import TagsDiff from "../tags-diff";

import Wrapper from "./perseus-diff-wrapper";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
    decorators: ReadonlyArray<
        (StoryComponent: typeof React.Component) => React.ReactElement
    >;
};

export default {
    title: "PerseusEditor/Diffs/Tags Diff",
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
        <TagsDiff
            title="tags"
            beforeOnly={["Math", "Biology", "History"]}
            afterOnly={["World War I"]}
            intersection={["Physics", "Chemistry"]}
        />
    );
};
