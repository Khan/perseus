import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {
    dropdownWithEmptyPlaceholder,
    dropdownWithVisibleLabel,
    inlineDropdownWithVisibleLabel,
    question1,
} from "./dropdown.testdata";

export default {
    title: "Perseus/Widgets/Dropdown",
};

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
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
