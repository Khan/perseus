import * as React from "react";

import * as IconPaths from "../../icon-paths";
import IconComponent from "../icon";

type StorybookStoryArgs = {
    options?: ReadonlyArray<string>;
    mapping?: {
        [value: string]: any;
    };
    defaultValue?: string;
    control?: string;
};

type StoryArgs = {
    color?: string;
    size?: number;
    title?: string;
    icon?: typeof IconPaths.iconCheck;
};

type SetValueType<T, V> = {
    [Property in keyof T]: V;
};

type StoryArgTypes = SetValueType<
    StoryArgs,
    StorybookStoryArgs | null | undefined
>;

type Story = {
    title: string;
    args?: StoryArgs;
    argTypes: StoryArgTypes;
};

export default {
    title: "Perseus/Components",
    args: {
        color: "#808",
        size: 25,
        title: "This is a label that screen readers will use, for example",
    },
    argTypes: {
        size: {
            control: "range",
        },
        icon: {
            options: Object.getOwnPropertyNames(IconPaths),
            mapping: IconPaths,
            defaultValue: "iconChevronDown",
            control: "select",
        },
    },
} as Story;

export const Icon = (args: StoryArgs): React.ReactElement => (
    <IconComponent
        style={{display: "block"}}
        icon={IconPaths.iconCheck}
        {...args}
    />
);
