import * as React from "react";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";

import {
    setDependencies,
    DependenciesContext,
} from "../packages/perseus/src/dependencies";
import {
    storybookTestDependencies,
    storybookDependenciesV2,
} from "../testing/test-dependencies";

import "./global.css";
import "./reset.css";

// Import the Wonder Blocks CSS variables
import "@khanacademy/wonder-blocks-tokens/styles.css";

import type {Preview} from "@storybook/react-vite";

// IMPORTANT: This code runs ONCE per story file, not per story within that file.
// If you want code to run once per story, see `StorybookWrapper`.

setDependencies(storybookTestDependencies);

const preview: Preview = {
    // These decorators apply to all stories, both inside and outside the
    // fixture framework.
    decorators: [
        (Story) => (
            <RenderStateRoot>
                <DependenciesContext.Provider value={storybookDependenciesV2}>
                    {/* Most of our components have an expectation to be
                        rendered inside of a .framework-perseus container.
                        We want to make sure we can include it here, since it
                        can also affect the styling.

                        Include box-sizing-border-box-reset to reflect
                        the global styles from prod.
                    */}
                    <div className="framework-perseus box-sizing-border-box-reset">
                        <Story />
                    </div>
                </DependenciesContext.Provider>
            </RenderStateRoot>
        ),
    ],
    // These parameters apply to all stories, both inside and outside the fixture
    // framework.
    parameters: {
        // Disables Chromatic's snapshotting on a global level
        // We disable snapshotting globally because we have enabled
        // turbosnaps for `-regression.stories.tsx` files. If we have
        // snapshots enabled globally, we pay for turbosnaps even for
        // skipped stories/tests (which is all of them).
        // We then enable snapshots for `-regression.stories.tsx` files in
        // each of those files (unfortunately, this is how we have to do
        // it).
        chromatic: {disableSnapshot: true},

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
        docs: {
            toc: true,
        },
    },
    tags: [
        //👇 Enables auto-generated documentation for all stories
        "autodocs",
    ],
};

export default preview;
