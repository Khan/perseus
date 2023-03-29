import {action} from "@storybook/addon-actions";
import * as React from "react";

import TextListEditor from '../text-list-editor';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Components/Text List Editor",
} as Story;

const defaultObject = {
    onChange: (...args) => {
        action("onChange")(...args);
    },
    options: ["Test option 1", "Test option 2", "Test option 3"],
} as const;

const ClassName = "framework-perseus orderer";

export const SimpleListOfOptions: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <div class={ClassName}>
            <TextListEditor {...defaultObject} />
        </div>
    );
};
