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
    tags: [
        //👇 Enables auto-generated documentation for all stories
        "autodocs",
    ],
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
        // TODO(somewhatabstract): This actions configuration does not appear to be
        // working as expected. That's probably OK since the new framework I'm
        // putting in place doesn't need it as we'll have an explicit log call that
        // ties into the actions API; however, the non-framework stories need it to
        // work so we might want to look more into that. I tried a bunch of things
        // to get this working, but nothing seems to do the trick. I suspect we
        // need to specify this in a different place or the name of the field has
        // changed (RANT: just another reason I hate export-based APIs).
        actions: {argTypesRegex: "^on[A-Z].*"},
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
};

export default preview;
