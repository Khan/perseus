import {themeModes} from "../../../../../../.storybook/modes";
import {mobileDecorator} from "../../__testutils__/story-decorators";

import {sorterRendererDecorator} from "./sorter-renderer-decorator";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusSorterWidgetOptions> = {
    title: "Widgets/Sorter/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    decorators: [sorterRendererDecorator],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Sorter widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Verifies the default horizontal layout: cards arranged in a row with padding
export const DefaultHorizontal: Story = {
    args: {
        correct: ["20 km", "150 km", "500 km", "1200 km"],
        padding: true,
        layout: "horizontal",
    },
};

// Verifies the vertical layout: cards stacked in a column with padding
export const DefaultVertical: Story = {
    args: {
        correct: [
            "Longest option in the list",
            "Medium length option",
            "Short option",
            "Tiny",
        ],
        padding: true,
        layout: "vertical",
    },
};

// Verifies the horizontal layout on mobile: narrower margin between cards (8px vs 5px)
export const MobileHorizontal: Story = {
    decorators: [mobileDecorator],
    parameters: {
        apiOptions: {isMobile: true},
    },
    args: {
        correct: ["20 km", "150 km", "500 km", "1200 km"],
        padding: true,
        layout: "horizontal",
    },
};

// Verifies the vertical layout on mobile
export const MobileVertical: Story = {
    decorators: [mobileDecorator],
    parameters: {
        apiOptions: {isMobile: true},
    },
    args: {
        correct: ["20 km", "150 km", "500 km", "1200 km"],
        padding: true,
        layout: "vertical",
    },
};

// Verifies horizontal layout with padding disabled: cards rendered without inner spacing
export const NoPadding: Story = {
    args: {
        correct: ["Item one", "Item two", "Item three"],
        padding: false,
        layout: "horizontal",
    },
};

export const MathFractions: Story = {
    args: {
        correct: ["$\\frac{1}{2}$", "$\\frac{3}{7}$", "$1$", "$\\frac{8}{5}$"],
        padding: true,
        layout: "horizontal",
    },
};

export const Math: Story = {
    args: {
        correct: ["$5$ apples", "$6$ apples", "$7$ apples"],
        padding: true,
        layout: "horizontal",
    },
};

export const ManyOptions: Story = {
    args: {
        correct: [
            "Choice One",
            "Choice Two",
            "Choice Three",
            "Choice Four",
            "Choice Five",
            "Choice Six",
            "Choice Seven",
            "Choice Eight",
            "Choice Nine",
            "Choice Ten",
            "Choice Eleven",
            "Choice Tweleve",
        ],
        padding: true,
        layout: "horizontal",
    },
};

export const Images: Story = {
    args: {
        correct: [
            "![A fox.](https://ka-perseus-graphie.s3.amazonaws.com/6e68574abb61d2b4a12644d777006fcfa8a73cff.png)",
            "![A ladybug.](https://ka-perseus-graphie.s3.amazonaws.com/5f33edfbe608913a69023101be0af6567645f5a6.png)",
            "![A whale.](https://ka-perseus-graphie.s3.amazonaws.com/4d02ee4a19c4efc6f41d083ff476841784347d36.png)",
        ],
        padding: false,
        layout: "horizontal",
    },
};
