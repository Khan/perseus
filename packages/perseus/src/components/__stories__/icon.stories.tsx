// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module 'flow-to-typescript-codemod' or its corresponding type declarations.
import {Flow} from 'flow-to-typescript-codemod';

import * as React from "react";

import * as IconPaths from '../../icon-paths';
import IconComponent from '../icon';

type StorybookStoryArgs = {
    options?: ReadonlyArray<string>,
    mapping?: {
        [value: string]: any
    },
    defaultValue?: string,
    control?: string
};

type StoryArgs = {
    color?: string,
    size?: number,
    title?: string,
    icon?: typeof IconPaths.iconCheck
};

type StoryArgTypes = Flow.ObjMap<StoryArgs, () => StorybookStoryArgs | null | undefined>;

type Story = {
    title: string,
    args?: StoryArgs,
    argTypes: StoryArgTypes
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

export const Icon: React.FC<StoryArgs> = (args): React.ReactElement => <IconComponent
    style={{display: "block"}}
    icon={IconPaths.iconCheck}
    {...args}
/>;
