import * as React from "react";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {Dependencies} from "@khanacademy/perseus";

import {DependenciesContext} from "../packages/perseus/src/dependencies";
import {
    storybookTestDependencies,
    storybookDependenciesV2,
} from "../testing/test-dependencies";

import type {Preview} from "@storybook/react";

// IMPORTANT: This code runs ONCE per story file, not per story within that file.
// If you want code to run once per story, see `StorybookWrapper`.

Dependencies.setDependencies(storybookTestDependencies);

const preview: Preview = {
    // These decorators apply to all stories, both inside and outside the
    // fixture framework.
    decorators: [
        (Story) => (
            <RenderStateRoot>
                <DependenciesContext.Provider value={storybookDependenciesV2}>
                    <Story />
                </DependenciesContext.Provider>
            </RenderStateRoot>
        ),
    ],

    // These parameters apply to all stories, both inside and outside the fixture
    // framework.
    parameters: {
        options: {
            storySort: {
                order: ["Perseus", "PerseusEditor", "Math-Input", "*"],
                includeNames: true,
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            // Add WB colors as background options. :)
            values: Object.entries(color).map(([name, value]) => ({
                name,
                value,
            })),
        },
    },

    tags: ["autodocs"]
};

export default preview;
