// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module 'flow-to-typescript-codemod' or its corresponding type declarations.
import {Flow} from 'flow-to-typescript-codemod';

import * as React from "react";

import ButtonGroup from '../button-group';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Components/Button Group",
} as Story;

const HarnassedButtonGroup = (
    props: Partial<Flow.Diff<JSX.LibraryManagedAttributes<typeof ButtonGroup, React.ComponentProps<typeof ButtonGroup>>, {
        value: JSX.LibraryManagedAttributes<typeof ButtonGroup, React.ComponentProps<typeof ButtonGroup>>['value'],
        onChange: JSX.LibraryManagedAttributes<typeof ButtonGroup, React.ComponentProps<typeof ButtonGroup>>['onChange']
    }>>,
) => {
    const [value, updateValue] = React.useState((null as string | null | undefined));

    return (
// @ts-expect-error [FEI-5003] - TS2786 - 'ButtonGroup' cannot be used as a JSX component.
        <ButtonGroup
            {...props}
            value={value}
            onChange={(newValue) => {
                updateValue(newValue);
            }}
        />
    );
};

export const ButtonsWithNoTitles: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <HarnassedButtonGroup
            buttons={[
                {value: "One", content: "Item #1"},
                {value: "Two", content: "Item #2"},
                {value: "Three", content: "Item #3"},
            ]}
        />
    );
};

export const ButtonsWithTitles: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <HarnassedButtonGroup
            buttons={[
                {value: "One", content: "Item #1", title: "The first item"},
                {value: "Two", content: "Item #2", title: "The second item"},
                {value: "Three", content: "Item #3", title: "The third item"},
            ]}
        />
    );
};
