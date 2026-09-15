import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";
import {registerWidgetsDecorator} from "../__testutils__/story-decorators";
import {dropdownRegistration} from "../dropdown";
import {expressionRegistration} from "../expression";
import {imageRegistration} from "../image";
import {numericInputRegistration} from "../numeric-input";
import {radioRegistration} from "../radio";

import {getFullGroupTestItem, question1} from "./group.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

import {groupRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/Group",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    decorators: [
        registerWidgetsDecorator([
            groupRegistration,
            dropdownRegistration,
            expressionRegistration,
            imageRegistration,
            numericInputRegistration,
            radioRegistration,
        ]),
    ],
    parameters: {
        docs: {
            description: {
                component:
                    "A container widget that allows for logical grouping of multiple widgets,\
                    enabling organized layout and shared context for related interactive elements.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const Answerful: Story = {
    args: {
        item: getFullGroupTestItem(),
    },
};

export const Answerless: Story = {
    args: {
        item: getFullGroupTestItem(),
    },
};
