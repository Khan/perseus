import * as React from "react";

import RangeInput from "../range-input";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Range Input",
} as Story;

export const EmptyValueArray = (args: StoryArgs): React.ReactElement => {
    return <RangeInput onChange={() => {}} value={[]} />;
};

export const SimpleWithSmallValueRanges = (
    args: StoryArgs,
): React.ReactElement => {
    return <RangeInput onChange={() => {}} value={[-10, 10]} />;
};

export const Placeholders = (args: StoryArgs): React.ReactElement => {
    return (
        <RangeInput onChange={() => {}} placeholder={["?", "!"]} value={[]} />
    );
};
