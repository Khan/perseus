import {
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
} from "@khanacademy/perseus-core";
import * as React from "react";

import CrossOutContext from "../../radio/cross-out-context";

import {gradedGroupRendererDecorator} from "./graded-group-renderer-decorator";

import type {PerseusGradedGroupWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator, Meta, StoryObj} from "@storybook/react-vite";

// Listed after the renderer decorator so it wraps it: the renderer decorator
// renders the article itself rather than the story.
const crossOutDecorator: Decorator = (Story) => (
    <CrossOutContext.Provider value={{enabled: true}}>
        <Story />
    </CrossOutContext.Provider>
);

const meta: Meta<PerseusGradedGroupWidgetOptions> = {
    title: "Widgets/Graded Group/Cross-out",
    tags: ["!autodocs"],
    decorators: [gradedGroupRendererDecorator, crossOutDecorator],
    parameters: {
        docs: {
            description: {
                component:
                    "The Radio cross-out tool inside a graded group in an article, turned on by wrapping the renderer in `CrossOutContext.Provider`. Each Check in the group clears its cross-outs.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithRadio: Story = {
    args: {
        title: "Check your understanding!",
        content: "Which of these is a fruit?\n\n[[☃ radio 1]]",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    choices: [
                        generateRadioChoice("Apple", {correct: true}),
                        generateRadioChoice("Brick"),
                        generateRadioChoice("Chair"),
                        generateRadioChoice("Door"),
                    ],
                }),
            }),
        },
    },
};
