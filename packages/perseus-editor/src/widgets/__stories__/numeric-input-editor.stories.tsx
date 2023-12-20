import {action} from "@storybook/addon-actions";
import * as React from "react";

import NumericInputEditor from "../numeric-input-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Editor/Widgets/NumericInput Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <NumericInputEditor onChange={action("onChange")} />;
};
