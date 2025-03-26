import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {
    basicDropdown,
    basicDropdownItem,
    dropdownWithEmptyPlaceholder,
    dropdownWithEmptyPlaceholderItem,
    dropdownWithMath,
    dropdownWithMathItem,
    dropdownWithVisibleLabel,
    dropdownWithVisibleLabelItem,
    inlineDropdownWithVisibleLabel,
    inlineDropdownWithVisibleLabelItem,
} from "./dropdown.testdata";

export default {
    title: "Perseus/Widgets/Dropdown",
};

type StoryArgs = Record<any, any>;

export const BasicDropdown = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={basicDropdown} />;
};

export const DropdownWithMath = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={dropdownWithMath} />;
};

export const DropdownWithVisibleLabel = (
    args: StoryArgs,
): React.ReactElement => {
    return <RendererWithDebugUI question={dropdownWithVisibleLabel} />;
};

export const InlineDropdownWithVisibleLabel = (
    args: StoryArgs,
): React.ReactElement => {
    return <RendererWithDebugUI question={inlineDropdownWithVisibleLabel} />;
};

export const DropdownWithEmptyPlaceholder = (
    args: StoryArgs,
): React.ReactElement => {
    return <RendererWithDebugUI question={dropdownWithEmptyPlaceholder} />;
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
