import {action} from "storybook/actions";

import MathInput from "../math-input";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Perseus/Components/Math Input",
    component: MathInput,
    args: {
        keypadButtonSets: {
            advancedRelations: true,
            basicRelations: true,
            divisionKey: true,
            logarithms: true,
            preAlgebra: true,
            trigonometry: true,
            scientific: true,
        },
        convertDotToTimes: false,
        value: "",
        onChange: action("onChange"),
        analytics: {onAnalyticsEvent: () => Promise.resolve()},
        labelText: "Math input",
    },
    parameters: {
        controls: {exclude: ["onChange", "analytics"]},
    },
};
export default meta;

type Story = StoryObj<typeof MathInput>;

export const DefaultWithBasicButtonSet: Story = {};

export const DefaultWithAriaLabel: Story = {
    args: {ariaLabel: "Sample label"},
};

export const KeypadOpenByDefault: Story = {
    args: {buttonsVisible: "always"},
};

export const KeypadNeverVisible: Story = {
    args: {buttonsVisible: "never"},
};
