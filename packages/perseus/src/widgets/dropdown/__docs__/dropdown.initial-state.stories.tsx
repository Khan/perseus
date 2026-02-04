import {
    generateDropdownOptions,
    generateDropdownWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {testDependenciesV2} from "../../../testing/test-dependencies";
import {ApiOptions} from "../../../perseus-api";
import {ServerItemRenderer} from "../../../server-item-renderer";
import {
    basicDropdown,
    dropdownWithEmptyPlaceholder,
    inlineDropdownWithVisibleLabel,
} from "../dropdown.testdata";

import type {PerseusItem} from "@khanacademy/perseus-core";
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
            question: generateTestPerseusRenderer({
                content: "هذه قائمة منسدلة: [[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": generateDropdownWidget({
                        options: generateDropdownOptions({
                            placeholder: "اختر إجابة",
                            choices: [
                                {content: "الخيار 1", correct: false},
                                {content: "الخيار 2", correct: true},
                                {content: "الخيار 3", correct: false},
                            ],
                        }),
                    }),
                },
            }),
        }),
        rtl: true,
    },
};

export const StaticBasicDropdown: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content:
                    "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
                widgets: {
                    "dropdown 1": generateDropdownWidget({
                        static: true,
                        options: generateDropdownOptions({
                            placeholder: "greater/less than or equal to",
                            choices: [
                                {
                                    content: "greater than or equal to",
                                    correct: false,
                                },
                                {
                                    content: "less than or equal to",
                                    correct: true,
                                },
                            ],
                        }),
                    }),
                },
            }),
        }),
    },
};

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
