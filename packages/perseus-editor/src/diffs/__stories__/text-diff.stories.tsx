import * as React from "react";

import TextDiff from '../text-diff';

// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module './perseus-diff-wrapper' or its corresponding type declarations.
import Wrapper from './perseus-diff-wrapper';

type StoryArgs = Record<any, any>;

type Story = {
    title: string,
    decorators: ReadonlyArray<(StoryComponent: typeof React.Component) => React.ReactElement>
};

export default {
    title: "Perseus/Editor/Diffs/Text Diff",
    decorators: [
        (StoryComponent) => (
            <Wrapper>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'StoryComponent' cannot be used as a JSX component. */}
                <StoryComponent />
            </Wrapper>
        ),
    ],
} as Story;

export const Example: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
// @ts-expect-error [FEI-5003] - TS2786 - 'TextDiff' cannot be used as a JSX component.
        <TextDiff
            title="A day in the life of a text diff"
            before="🥱 Hello world!"
            after="😴 Goodbye world!"
        />
    );
};
