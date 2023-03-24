import * as React from "react";

import TeX from '../tex';

type StoryArgs = {
    equation: string
};

type Story = {
    title: string,
    args: StoryArgs
};

export default {
    title: "Perseus/Components/Tex",
    args: {
        equation: "f(x) = x + 1",
    },
} as Story;

export const BasicOperation: React.FC<StoryArgs> = (args): React.ReactElement => {
// @ts-expect-error [FEI-5003] - TS2786 - 'TeX' cannot be used as a JSX component.
    return <TeX setAssetStatus={() => {}} children={args.equation} />;
};
