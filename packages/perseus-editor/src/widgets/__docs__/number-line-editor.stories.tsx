import {action} from "storybook/actions";

import NumberLineEditor from "../number-line-editor";

import type {StoryObj} from "@storybook/react-vite";

const meta = {
    title: "Widgets/Number Line/Editor Demo",
    component: NumberLineEditor,
    tags: ["!dev"],
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        labelRange: [0, 0],
        initialX: 0,
        tickStep: 1,
        labelStyle: "decimal",
        labelTicks: true,
        snapDivisions: 2,
        range: [-4, 4],
        static: false,
        correctRel: "eq",
        numDivisions: 5,
        divisionRange: [1, 12],
        correctX: -2.5,
        showTooltips: false,
        onChange: action("onChange"),
    },
};
