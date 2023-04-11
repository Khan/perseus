import {action} from "@storybook/addon-actions";
import * as React from "react";

import TextListEditor from "../text-list-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
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

export const SimpleListOfOptions = (args: StoryArgs): React.ReactElement => {
    return (
        // @ts-expect-error [FEI-5003] - TS2322 - Type '{ children: Element; class: string; }' is not assignable to type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'.
        <div class={ClassName}>
            <TextListEditor {...defaultObject} />
        </div>
    );
};
