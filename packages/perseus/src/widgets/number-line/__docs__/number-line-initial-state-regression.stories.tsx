import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {testDependenciesV2} from "../../../../../../testing/test-dependencies";
import {ApiOptions} from "../../../perseus-api";
import {ServerItemRenderer} from "../../../server-item-renderer";
import {tickCtrl} from "../number-line.testdata";

import type {
    PerseusItem,
    PerseusNumberLineWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof NumberLineQuestionRenderer>;

/**
 * This is a visual regression story for the number-line widget.
 */

const meta: Meta = {
    title: "Widgets/Number Line/Visual Regression Tests/Initial State",
    component: NumberLineQuestionRenderer,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the number-line widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
};

export default meta;

export const BasicQuestion: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content:
                    "$E=2.5$\n\n**Move the dot to $-E$ on the number line.**\n\n\n[[☃ number-line 1]]",
                correctX: -2.5,
                range: [-4, 4],
                initialX: -3,
            }),
        }),
    },
};

export const TickController: Story = {
    args: {
        item: generateTestPerseusItem({
            question: tickCtrl,
        }),
    },
};

export const Inequality: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content: "[[☃ number-line 1]]",
                correctX: 2,
                range: [-5, 5],
                isInequality: true,
                correctRel: "ge",
                initialX: -4,
            }),
        }),
    },
};

export const StaticDesktop: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content: "The answer is shown below:\n\n[[☃ number-line 1]]",
                correctX: 2,
                range: [-5, 5],
                initialX: 2,
                static: true,
            }),
        }),
    },
};

export const StaticDesktopInequality: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content: "The answer is shown below:\n\n[[☃ number-line 1]]",
                correctX: 1,
                range: [-5, 5],
                initialX: 1,
                isInequality: true,
                correctRel: "ge",
                static: true,
            }),
        }),
    },
};

export const RTL: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content:
                    "حرك النقطة إلى $-2.5$ على خط الأعداد [[☃ number-line 1]]",
                correctX: -2.5,
                range: [-4, 4],
                initialX: -3,
            }),
        }),
        rtl: true,
    },
};

export const StaticMobile: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content: "The answer is shown below:\n\n[[☃ number-line 1]]",
                correctX: 2,
                range: [-5, 5],
                initialX: 2,
                static: true,
            }),
        }),
        isMobile: true,
    },
};

export const StaticMobileInequality: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content: "The answer is shown below:\n\n[[☃ number-line 1]]",
                correctX: 1,
                range: [-5, 5],
                initialX: 1,
                isInequality: true,
                correctRel: "ge",
                static: true,
            }),
        }),
        isMobile: true,
    },
};

// Helper function to create number-line question data
function createNumberLineQuestion(config: {
    content: string;
    correctX: number;
    range: [number, number];
    initialX?: number;
    isInequality?: boolean;
    correctRel?: PerseusNumberLineWidgetOptions["correctRel"];
    static?: boolean;
}): PerseusRenderer {
    return {
        content: config.content,
        images: {},
        widgets: {
            "number-line 1": {
                type: "number-line",
                alignment: "default",
                static: config.static ?? false,
                graded: true,
                options: {
                    static: config.static ?? false,
                    labelRange: [null, null],
                    initialX: config.initialX ?? null,
                    tickStep: 1,
                    labelStyle: "decimal",
                    labelTicks: true,
                    isInequality: config.isInequality ?? false,
                    snapDivisions: 2,
                    range: config.range,
                    correctRel: "ge",
                    numDivisions: null,
                    divisionRange: [1, 10],
                    correctX: config.correctX,
                    isTickCtrl: false,
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    };
}

function NumberLineQuestionRenderer(props: {
    item: PerseusItem;
    rtl?: boolean;
    isMobile?: boolean;
}) {
    const {item, rtl, isMobile} = props;

    const apiOptions = {
        ...ApiOptions.defaults,
        isMobile: isMobile ?? false,
    };

    return (
        <div dir={rtl ? "rtl" : "ltr"}>
            <ServerItemRenderer
                item={item}
                apiOptions={apiOptions}
                dependencies={testDependenciesV2}
            />
        </div>
    );
}
