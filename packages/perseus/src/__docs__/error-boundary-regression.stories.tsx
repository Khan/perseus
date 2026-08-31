import * as React from "react";

import {themeModes} from "../../../../.storybook/modes";
import ErrorBoundary from "../error-boundary";

import type {Meta, StoryObj} from "@storybook/react-vite";

const ThrowingChild = (): React.ReactNode => {
    throw new Error("Intentional error for visual regression testing");
};

const meta: Meta<typeof ErrorBoundary> = {
    title: "Perseus/Visual Regression Tests/ErrorBoundary",
    component: ErrorBoundary,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression test for the error icon ErrorBoundary " +
                    "renders when a child throws, which will be used with " +
                    "Chromatic.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const ErrorState: Story = {
    args: {
        // Errors thrown during render are expected here; keep the console
        // and error reporting quiet in the story.
        onError: () => {},
        children: <ThrowingChild />,
    },
};
