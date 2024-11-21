import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {question1} from "./dropdown.testdata";

import type {Meta} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Widgets/Dropdown",
};
export default meta;

export const Question1 = {
    render: () => <RendererWithDebugUI question={question1} />,
    parameters: {
        chromatic: {
            // Visual snapshot testing for this widget.
            disableSnapshot: false,
        },
    },
};
