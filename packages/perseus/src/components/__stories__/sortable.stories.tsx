import * as React from "react";

import Sortable from "../sortable";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

const defaultOptions = ["Option 1", "Option 2", "Option 3"];

export default {
    title: "Perseus/Components/Sortable",
} as Story;

export const SortableHorizontalExample = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <Sortable
            layout={"horizontal"}
            options={["a", "b", "c"]}
            waitForTexRendererToLoad={false}
        />
    );
};

export const SortableVerticalExample = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <Sortable
            layout={"vertical"}
            options={["a", "b", "c"]}
            waitForTexRendererToLoad={false}
        />
    );
};

export const BasicSortableOptionsTest = (
    args: StoryArgs,
): React.ReactElement => {
    return <Sortable options={defaultOptions} />;
};

export const BasicSortableOptionsTestWithNoPadding = (
    args: StoryArgs,
): React.ReactElement => {
    return <Sortable options={defaultOptions} padding={false} />;
};

export const BasicSortableOptionsTestWithLargeMargin = (
    args: StoryArgs,
): React.ReactElement => {
    return <Sortable options={defaultOptions} margin={64} />;
};

export const BasicSortableOptionsTestDisabled = (
    args: StoryArgs,
): React.ReactElement => {
    return <Sortable options={defaultOptions} disabled={true} />;
};

export const BasicSortableOptionsTestWithWidthAndHeightConstraints = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <Sortable
            options={defaultOptions}
            constraints={{
                height: 128,
                width: 256,
            }}
        />
    );
};
