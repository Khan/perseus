import * as React from "react";

import TeX from "../tex";

type StoryArgs = {
    equation: string;
};

type Story = {
    title: string;
    args: StoryArgs;
};

export default {
    title: "Perseus/Components/Tex",
    args: {
        equation: "f(x) = x + 1",
    },
} as Story;

export const BasicOperation = (args: StoryArgs): React.ReactElement => {
    return <TeX setAssetStatus={() => {}} children={args.equation} />;
};
