import * as React from "react";

import StubTagEditor from "../stub-tag-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/name",
} as Story;

const defaultValues = ["Test value 1", "Test value 2", "Test value 3"];

export const ShowingTitle = (args: StoryArgs): React.ReactElement => {
    return <StubTagEditor onChange={() => {}} showTitle={true} />;
};

export const NotShowingTitle = (args: StoryArgs): React.ReactElement => {
    return <StubTagEditor onChange={() => {}} showTitle={false} />;
};

export const ShowingTitleWithValue = (args: StoryArgs): React.ReactElement => {
    return (
        <StubTagEditor
            onChange={() => {}}
            showTitle={true}
            value={defaultValues}
        />
    );
};

export const NotShowingTitleWithValue = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <StubTagEditor
            onChange={() => {}}
            showTitle={false}
            value={defaultValues}
        />
    );
};
