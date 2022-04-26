// @flow
import * as React from "react";

import RangeInput from "../range-input.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Range Input",
}: Story);

export const EmptyValueArray = (args: StoryArgs): React.Node => {
    return <RangeInput onChange={() => {}} value={[]} />;
};

export const SimpleWithSmallValueRanges = (args: StoryArgs): React.Node => {
    return <RangeInput onChange={() => {}} value={[-10, 10]} />;
};

export const Placeholders = (args: StoryArgs): React.Node => {
    return (
        <RangeInput onChange={() => {}} placeholder={["?", "!"]} value={[]} />
    );
};
