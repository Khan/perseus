import * as React from "react";

import TagsDiff from '../tags-diff';

// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module './perseus-diff-wrapper' or its corresponding type declarations.
import Wrapper from './perseus-diff-wrapper';

type StoryArgs = Record<any, any>;

type Story = {
    title: string,
    decorators: ReadonlyArray<(StoryComponent: typeof React.Component) => React.ReactElement>
};

export default {
    title: "Perseus/Editor/Diffs/Tags Diff",
    decorators: [
        (StoryComponent) => (
            <Wrapper>
                <StoryComponent />
            </Wrapper>
        ),
    ],
} as Story;

export const Example: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <TagsDiff
            title="tags"
            beforeOnly={["Math", "Biology", "History"]}
            afterOnly={["World War I"]}
            intersection={["Physics", "Chemistry"]}
        />
    );
};
