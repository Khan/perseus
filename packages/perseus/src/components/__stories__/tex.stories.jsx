// @flow
import * as React from "react";

import TeX from "../tex.jsx";

type StoryArgs = {|
    equation: string,
|};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Tex",
    args: {
        equation: "f(x) = x + 1",
    },
}: Story);

export const BasicOperation = (args: StoryArgs): React.Node => {
    return <TeX setAssetStatus={() => {}} children={args.equation} />;
};
