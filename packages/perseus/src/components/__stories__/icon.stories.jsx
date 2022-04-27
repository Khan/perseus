// @flow

import * as React from "react";

import * as IconPaths from "../../icon-paths.js";
import IconComponent from "../icon.jsx";

type StorybookStoryArgs = {|
    options?: $ReadOnlyArray<string>,
    mapping?: {[value: string]: any},
    defaultValue?: string,
    control?: string,
|};

type StoryArgs = {|
    color?: string,
    size?: number,
    title?: string,
    icon?: typeof IconPaths.iconCheck,
|};

type StoryArgTypes = $ObjMap<StoryArgs, () => ?StorybookStoryArgs>;

type Story = {|
    title: string,
    args?: StoryArgs,
    argTypes: StoryArgTypes,
|};

export default ({
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
}: Story);

export const Icon = (args: StoryArgs): React.Node => (
    <IconComponent
        style={{display: "block"}}
        icon={IconPaths.iconCheck}
        {...args}
    />
);
