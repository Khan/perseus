import * as React from "react";

import * as IconPaths from "../../icon-paths";
import IconComponent from "../icon";

import type {StoryObj, Meta} from "@storybook/react";

type StoryArgs = StoryObj<IconComponent>;

type Story = Meta<IconComponent>;

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
