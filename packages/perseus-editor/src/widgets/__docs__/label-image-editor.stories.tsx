import {action} from "storybook/actions";

import LabelImageEditor from "../label-image-editor/label-image-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Label Image/Editor Demo",
    component: LabelImageEditor,
    tags: ["!dev"],
} satisfies Meta<typeof LabelImageEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
        imageAlt: "Map of Europe",
        choices: [
            "Lamborghini",
            "BMW",
            "Volkswagen",
            "Fiat",
            "Porsche",
            "Ferrari",
        ],
        imageUrl:
            "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",
        imageWidth: 1280,
        imageHeight: 1024,
        markers: [
            {
                answers: ["BMW", "Volkswagen", "Porsche"],
                label: "Germany",
                x: 37.3,
                y: 53.6,
            },
            {
                answers: [],
                label: "",
                x: 21,
                y: 46,
            },
            {
                answers: ["Lamborghini", "Fiat", "Ferrari"],
                label: "Italy",
                x: 41.4,
                y: 78.8,
            },
        ],
    },
};
