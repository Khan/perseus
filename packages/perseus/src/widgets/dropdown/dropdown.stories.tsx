import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {
    basicDropdownItem,
    dropdownWithEmptyPlaceholderItem,
    dropdownWithMathItem,
    dropdownWithVisibleLabelItem,
    inlineDropdownWithVisibleLabelItem,
} from "./dropdown.testdata";

export default {
    title: "Perseus/Widgets/Dropdown",
};

type StoryArgs = Record<any, any>;

export const BasicDropdown = (args: StoryArgs): React.ReactElement => {
    return <ServerItemRendererWithDebugUI item={basicDropdownItem} />;
};

export const DropdownWithMath = (args: StoryArgs): React.ReactElement => {
    return <ServerItemRendererWithDebugUI item={dropdownWithMathItem} />;
};

export const DropdownWithVisibleLabel = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI item={dropdownWithVisibleLabelItem} />
    );
};

export const InlineDropdownWithVisibleLabel = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={inlineDropdownWithVisibleLabelItem}
        />
    );
};

export const DropdownWithEmptyPlaceholder = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={dropdownWithEmptyPlaceholderItem}
        />
    );
};

export const AnswerlessBasicDropdown = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={basicDropdownItem}
            startAnswerless={true}
        />
    );
};

export const AnswerlessDropdownWithMath = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={dropdownWithMathItem}
            startAnswerless={true}
        />
    );
};

export const AnswerlessDropdownWithVisibleLabel = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={dropdownWithVisibleLabelItem}
            startAnswerless={true}
        />
    );
};

export const AnswerlessInlineDropdownWithVisibleLabel = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={inlineDropdownWithVisibleLabelItem}
            startAnswerless={true}
        />
    );
};

export const AnswerlessDropdownWithEmptyPlaceholder = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={dropdownWithEmptyPlaceholderItem}
            startAnswerless={true}
        />
    );
};
