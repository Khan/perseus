import {action} from "@storybook/addon-actions";
import * as React from "react";

import PhetSimEditor from "../phet-sim-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/PhET Simulation Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <PhetSimEditor onChange={action("onChange")} />;
};
