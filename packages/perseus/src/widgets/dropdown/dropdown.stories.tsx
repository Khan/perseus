import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {
    basicDropdown,
    dropdownWithEmptyPlaceholder,
    dropdownWithMath,
    dropdownWithVisibleLabel,
    inlineDropdownWithVisibleLabel,
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
