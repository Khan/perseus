// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module 'flow-to-typescript-codemod' or its corresponding type declarations.
import {Flow} from "flow-to-typescript-codemod";

import * as React from "react";

import MultiButtonGroup from "../multi-button-group";

type StoryArgs = {
    allowEmpty: boolean;
};

type Story = {
    title: string;
    args: StoryArgs;
};

export default {
    title: "Perseus/Components/Muli-Button Group",
    args: {
        allowEmpty: true,
    },
} as Story;

const HarnassedButtonGroup = (
    props: Partial<
        Flow.Diff<
            JSX.LibraryManagedAttributes<
                typeof MultiButtonGroup,
                React.ComponentProps<typeof MultiButtonGroup>
            >,
            {
                values: JSX.LibraryManagedAttributes<
                    typeof MultiButtonGroup,
                    React.ComponentProps<typeof MultiButtonGroup>
                >["values"];
                onChange: JSX.LibraryManagedAttributes<
                    typeof MultiButtonGroup,
                    React.ComponentProps<typeof MultiButtonGroup>
                >["onChange"];
            }
        >
    >,
) => {
    const [values, updateValues] = React.useState(
        null as ReadonlyArray<string> | null | undefined,
    );

    return (
        <MultiButtonGroup
            {...props}
            values={values}
            onChange={(newValues) => {
                updateValues(newValues);
            }}
        />
    );
};

export const ButtonsWithNoTitles: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return (
        <HarnassedButtonGroup
            {...args}
            buttons={[
                {value: "One", content: "Item #1"},
                {value: "Two", content: "Item #2"},
                {value: "Three", content: "Item #3"},
            ]}
        />
    );
};

export const ButtonsWithTitles: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return (
        <HarnassedButtonGroup
            {...args}
            buttons={[
                {value: "One", content: "Item #1", title: "The first item"},
                {value: "Two", content: "Item #2", title: "The second item"},
                {value: "Three", content: "Item #3", title: "The third item"},
            ]}
        />
    );
};
