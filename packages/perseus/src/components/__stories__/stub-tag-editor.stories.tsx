import * as React from "react";

import StubTagEditor from '../stub-tag-editor';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Components/name",
} as Story;

const defaultValues = ["Test value 1", "Test value 2", "Test value 3"];

export const ShowingTitle: React.FC<StoryArgs> = (args): React.ReactElement => {
// @ts-expect-error [FEI-5003] - TS2786 - 'StubTagEditor' cannot be used as a JSX component.
    return <StubTagEditor onChange={() => {}} showTitle={true} />;
};

export const NotShowingTitle: React.FC<StoryArgs> = (args): React.ReactElement => {
// @ts-expect-error [FEI-5003] - TS2786 - 'StubTagEditor' cannot be used as a JSX component.
    return <StubTagEditor onChange={() => {}} showTitle={false} />;
};

export const ShowingTitleWithValue: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
// @ts-expect-error [FEI-5003] - TS2786 - 'StubTagEditor' cannot be used as a JSX component.
        <StubTagEditor
            onChange={() => {}}
            showTitle={true}
            value={defaultValues}
        />
    );
};

export const NotShowingTitleWithValue: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
// @ts-expect-error [FEI-5003] - TS2786 - 'StubTagEditor' cannot be used as a JSX component.
        <StubTagEditor
            onChange={() => {}}
            showTitle={false}
            value={defaultValues}
        />
    );
};
