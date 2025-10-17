import {ApiOptions} from "@khanacademy/perseus";
import {action} from "storybook/actions";

import PlotterEditor from "../plotter-editor";

import type {StoryObj} from "@storybook/react-vite";

// This helps ensure the styles are loaded correctly and timely in storybook preview
import "../../styles/perseus-editor.css";

const meta = {
    title: "Widgets/Plotter/Editor Demo",
    component: PlotterEditor,
    tags: ["!dev"],
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
        apiOptions: ApiOptions.defaults,
        categories: ["0", "1", "2"],
        plotDimensions: [300, 300],
        correct: [0, 1, 2],
        labels: ["Horizontal", "Vertical"],
        maxY: 2,
        scaleY: 1,
        snapsPerLine: 1,
        starting: [0, 0, 0],
        type: "bar",
        picSize: 400,
        picBoxHeight: 400,
        picUrl: "",
        labelInterval: 1,
        static: false,
    },
};
