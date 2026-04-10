import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {numericInputRendererDecorator} from "../../__testutils__/numeric-input-renderer-decorator";

import type {PerseusNumericInputWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const NumericInputWidget = getWidget("numeric-input")!;

const meta: Meta<typeof NumericInputWidget> = {
    title: "Widgets/Numeric Input/Visual Regression Tests/Initial State",
    component: NumericInputWidget,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Numeric Input widget that do NOT " +
                    "need any interactions to test, which will be used with " +
                    "Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof NumericInputWidget>;

// Verifies the default normal-size input (8rem width) with a pre-filled value
export const SizeNormal: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "5"}},
    },
    args: {
        size: "normal",
    } satisfies Partial<PerseusNumericInputWidgetOptions>,
};

// Verifies the small-size input (4rem width) variant with a pre-filled value
export const SizeSmall: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "5"}},
    },
    args: {
        size: "small",
    } satisfies Partial<PerseusNumericInputWidgetOptions>,
};

// Verifies the right-aligned text input variant with a pre-filled value — the "5" should appear on the right
export const RightAligned: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "5"}},
    },
    args: {
        size: "normal",
        rightAlign: true,
    } satisfies Partial<PerseusNumericInputWidgetOptions>,
};
