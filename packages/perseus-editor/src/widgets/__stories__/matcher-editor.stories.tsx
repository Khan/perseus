import * as React from "react";
import {action} from "storybook/actions";

import MatcherEditor from "../matcher-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/Matcher Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <MatcherEditor onChange={action("onChange")} />;
};
