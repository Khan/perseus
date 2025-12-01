import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {testDependenciesV2} from "../../../../../../testing/test-dependencies";
import {ApiOptions} from "../../../perseus-api";
import {ServerItemRenderer} from "../../../server-item-renderer";

import type {
    PerseusItem,
    PerseusNumberLineWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof NumberLineQuestionRenderer>;

// TODO: Add test coverage for hover states on movable points (both closed and open circles).

const meta: Meta = {
    title: "Widgets/Number Line/Visual Regression Tests/Interactions",
    component: NumberLineQuestionRenderer,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for number-line widget interactions. Tests inequality control buttons' behavior which is controlled by Perseus.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
};

export default meta;

/**
 * Tests clicking the "Switch direction" button on an inequality.
 * Starts with x ≥ (ray pointing right), then switches to x ≤ (ray pointing left).
 * This tests the Perseus-controlled button behavior and ray direction rendering.
 */
export const InequalitySwitchDirection: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content:
                    "Show all values on the number line.\n\n[[☃ number-line 1]]",
                correctX: 0,
                range: [-5, 5],
                initialX: 0,
                isInequality: true,
            }),
        }),
    },
    play: async ({canvas, userEvent}) => {
        // @ts-expect-error - error TS2339: Property 'getByRole' does not exist on type 'Canvas'
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const switchButton = canvas.getByRole("button", {
            name: "Switch direction",
        });
        await userEvent.click(switchButton);
    },
};

/**
 * Tests clicking the "Make circle open" button on an inequality.
 * Starts with x ≥ (closed circle), then toggles to x > (open circle).
 * This tests the Perseus-controlled button behavior and circle
 rendering.
 */
export const InequalityMakeCircleOpen: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content:
                    "Show all values on the number line.\n\n[[☃ number-line 1]]",
                correctX: 1,
                range: [-5, 5],
                initialX: 1,
                isInequality: true,
            }),
        }),
    },
    play: async ({canvas, userEvent}) => {
        // @ts-expect-error - error TS2339: Property 'getByRole' does not exist on type 'Canvas'
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const toggleButton = canvas.getByRole("button", {
            name: "Make circle open",
        });
        await userEvent.click(toggleButton);
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
