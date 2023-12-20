import {action} from "@storybook/addon-actions";
import * as React from "react";

import MatcherEditor from "../matcher-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Editor/Widgets/Matcher Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <MatcherEditor onChange={action("onChange")} />;
};
