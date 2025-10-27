import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {testDependenciesV2} from "../../../../../../testing/test-dependencies";
import {ApiOptions} from "../../../perseus-api";
import {ServerItemRenderer} from "../../../server-item-renderer";
import {
    basicDropdown,
    dropdownWithEmptyPlaceholder,
    inlineDropdownWithVisibleLabel,
} from "../dropdown.testdata";

import type {PerseusRenderer, PerseusItem} from "@khanacademy/perseus-core";
import type {StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof DropdownQuestionRenderer>;

/**
 * This is a visual regression story for the dropdown widget.
 */

export default {
    title: "Widgets/Dropdown/Visual Regression Tests/Initial State",
    component: DropdownQuestionRenderer,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the dropdown widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export const BasicDropdown: Story = {
    args: {
        item: generateTestPerseusItem({
            question: basicDropdown,
        }),
    },
};

export const DropdownWithEmptyPlaceholder: Story = {
    args: {
        item: generateTestPerseusItem({
            question: dropdownWithEmptyPlaceholder,
        }),
    },
};

export const InlineDropdownWithVisibleLabel: Story = {
    args: {
        item: generateTestPerseusItem({
            question: inlineDropdownWithVisibleLabel,
        }),
    },
};

export const RTL: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createDropdownQuestion({
                content: "هذه قائمة منسدلة: [[☃ dropdown 1]]",
                placeholder: "اختر إجابة",
                choices: [
                    {content: "الخيار 1", correct: false},
                    {content: "الخيار 2", correct: true},
                    {content: "الخيار 3", correct: false},
                ],
            }),
        }),
        rtl: true,
    },
};

// Helper function to create dropdown question data
function createDropdownQuestion(config: {
    content: string;
    placeholder: string;
    choices: Array<{content: string; correct: boolean}>;
}): PerseusRenderer {
    return {
        content: config.content,
        images: {},
        widgets: {
            "dropdown 1": {
                type: "dropdown",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    placeholder: config.placeholder,
                    choices: config.choices,
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    };
}

function DropdownQuestionRenderer(props: {item: PerseusItem; rtl?: boolean}) {
    const {item, rtl} = props;

    return (
        <div dir={rtl ? "rtl" : "ltr"}>
            <ServerItemRenderer
                item={item}
                apiOptions={ApiOptions.defaults}
                dependencies={testDependenciesV2}
            />
        </div>
    );
}
