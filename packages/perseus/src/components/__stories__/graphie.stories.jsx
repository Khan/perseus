// @flow
import * as React from "react";

import Graphie from "../graphie.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

const size = 200;

export default ({
    title: "Perseus/Components/Graphie",
}: Story);

export const SquareBoxSizeAndOtherwiseEmpty = (args: StoryArgs): React.Node => {
    return (
        <Graphie
            box={[size, size]}
            setDrawingAreaAvailable={() => {}}
            setup={() => {}}
        />
    );
};

//TODO(scottgrant): Add a wider range of stories here
