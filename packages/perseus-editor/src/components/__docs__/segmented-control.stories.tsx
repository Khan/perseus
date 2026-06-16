import * as React from "react";

import {SegmentedControl, ToggleButtonGroup} from "../segmented-control";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof SegmentedControl> = {
    component: SegmentedControl,
    title: "Editors/Components/Segmented Control",
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const statusOptions = [
    {value: "correct", label: "Correct"},
    {value: "incorrect", label: "Incorrect"},
];

const formatOptions = [
    {value: "integer", label: "integer"},
    {value: "proper", label: "proper fraction"},
    {value: "improper", label: "improper fraction"},
    {value: "mixed", label: "mixed number"},
    {value: "decimal", label: "decimal"},
];

/** Single-select segmented control (role="radiogroup"). */
export const SingleSelect: Story = {
    render: function Render() {
        const [value, setValue] = React.useState<string>("correct");
        return (
            <SegmentedControl
                aria-label="Choice status"
                options={statusOptions}
                selectedValue={value}
                onChange={setValue}
            />
        );
    },
};

/** Disabled single-select (e.g. when the whole editor is disabled). */
export const Disabled: Story = {
    render: () => (
        <SegmentedControl
            aria-label="Choice status"
            options={statusOptions}
            selectedValue="correct"
            onChange={() => {}}
            disabled={true}
        />
    ),
};

/** Multi-select group (role="group", checkboxes) that wraps onto rows. */
export const MultiSelect: Story = {
    render: function Render() {
        const [values, setValues] = React.useState<ReadonlyArray<string>>([
            "integer",
            "decimal",
        ]);
        return (
            <ToggleButtonGroup
                aria-label="Answer formats"
                options={formatOptions}
                selectedValues={values}
                onToggle={(value) =>
                    setValues((prev) =>
                        prev.includes(value)
                            ? prev.filter((v) => v !== value)
                            : [...prev, value],
                    )
                }
            />
        );
    },
};
