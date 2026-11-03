import {generateRadioChoice} from "@khanacademy/perseus-core";
import * as React from "react";

import CrossOutContext from "../cross-out-context";

import {radioRendererDecoratorWithDebugUI} from "./radio-renderer-decorator";

import type {PerseusRadioWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator, Meta, StoryObj} from "@storybook/react-vite";

// Listed after the renderer decorator so it wraps it: the renderer decorator
// renders the question itself rather than the story.
const crossOutDecorator: Decorator = (Story) => (
    <CrossOutContext.Provider value={{enabled: true}}>
        <Story />
    </CrossOutContext.Provider>
);

const meta: Meta<PerseusRadioWidgetOptions> = {
    title: "Widgets/Radio/Cross-out",
    tags: ["!autodocs"],
    decorators: [radioRendererDecoratorWithDebugUI, crossOutDecorator],
    parameters: {
        docs: {
            description: {
                component:
                    "The cross-out tool, turned on by wrapping the renderer in `CrossOutContext.Provider`. Turn on the Cross out answers toggle to show a cross-out button on each choice.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<PerseusRadioWidgetOptions>;

const choices = [
    generateRadioChoice("Apple", {correct: true}),
    generateRadioChoice("Brick"),
    generateRadioChoice("Chair"),
    generateRadioChoice("Door"),
];

export const SingleSelect: Story = {
    args: {choices},
};

export const MultipleSelect: Story = {
    args: {
        multipleSelect: true,
        countChoices: true,
        numCorrect: 2,
        choices: [
            generateRadioChoice("Apple", {correct: true}),
            generateRadioChoice("Banana", {correct: true}),
            generateRadioChoice("Brick"),
            generateRadioChoice("Chair"),
        ],
    },
};

export const ScrollingAnswers: Story = {
    args: {
        choices: [
            generateRadioChoice(
                "$x = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14 + 15 + 16 + 17 + 18 + 19 + 20 + 21 + 22 + 23 + 24 + 25 + 26 + 27 + 28 + 29 + 30$",
                {correct: true},
            ),
            generateRadioChoice("$x = 1$"),
            generateRadioChoice("$x = 2$"),
        ],
    },
};
