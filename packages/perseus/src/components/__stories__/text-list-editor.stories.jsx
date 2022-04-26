// @flow

import {action} from "@storybook/addon-actions";
import * as React from "react";

import TextListEditor from "../text-list-editor.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Text List Editor",
}: Story);

const defaultObject = {
    onChange: (...args) => {
        action("onChange")(...args);
    },
    options: ["Test option 1", "Test option 2", "Test option 3"],
};

const ClassName = "framework-perseus orderer";

export const SimpleListOfOptions = (args: StoryArgs): React.Element<"div"> => {
    return (
        <div class={ClassName}>
            <TextListEditor {...defaultObject} />
        </div>
    );
};
