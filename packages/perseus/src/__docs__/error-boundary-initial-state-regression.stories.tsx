import * as React from "react";

import {themeModes} from "../../../../.storybook/modes";
import ErrorBoundary from "../error-boundary";

import type {Meta, StoryObj} from "@storybook/react-vite";

const ThrowingChild = (): React.ReactNode => {
    throw new Error("Intentional error for visual regression testing");
};

const meta: Meta<typeof ErrorBoundary> = {
    title: "Components/ErrorBoundary/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the ErrorBoundary that do NOT " +
                    "need any interactions to test, which will be used " +
                    "with Chromatic.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const ErrorState: Story = {
    render: () => (
        // The error thrown during render is expected here; the empty
        // onError keeps it out of error reporting.
        <ErrorBoundary onError={() => {}}>
            <ThrowingChild />
        </ErrorBoundary>
    ),
};
