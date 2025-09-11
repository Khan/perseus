import * as React from "react";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {ThemeSwitcher} from "@khanacademy/wonder-blocks-theming";

import {
    setDependencies,
    DependenciesContext,
} from "../packages/perseus/src/dependencies";
import {
    storybookTestDependencies,
    storybookDependenciesV2,
} from "../testing/test-dependencies";

// This will bring in the shared styles from prod so that the components can
// have the same styles as prod when viewed within Storybook.
import "./styles/shared.css";

import type {Decorator, Preview} from "@storybook/react-vite";

// IMPORTANT: This code runs ONCE per story file, not per story within that file.
// If you want code to run once per story, see `StorybookWrapper`.

setDependencies(storybookTestDependencies);

const withPerseusDecorator: Decorator = (Story) => {
    return (
        <RenderStateRoot>
            <DependenciesContext.Provider value={storybookDependenciesV2}>
                {/* Most of our components have an expectation to be rendered
                    inside of a .framework-perseus container. We want to make sure
                    we can include it here, since it can also affect the styling.

                    Include box-sizing-border-box-reset to reflect the global styles
                    from prod.
                */}
                <div className="framework-perseus box-sizing-border-box-reset">
                    <Story />
                </div>
            </DependenciesContext.Provider>
        </RenderStateRoot>
    );
};

const withThemeSwitcher: Decorator = (Story, context) => {
    const theme = context.globals.theme;

    return (
        <ThemeSwitcher theme={theme}>
            <Story />
        </ThemeSwitcher>
    );
};

const supportedThemes = {
    description: "Global theme for components",
    toolbar: {
        // The label to show for this toolbar item
        title: "Theme",
        icon: "switchalt",
        // Array of plain string values or MenuItem shape (see below)
        items: [
            {
                value: "default",
                icon: "circlehollow",
                title: "Wonder Blocks (default)",
            },
            {
                value: "thunderblocks",
                icon: "lightning",
                title: "Shape Your Learning (Thunder Blocks)",
            },
        ],
        // Change title based on selected value
        dynamicTitle: true,
    },
};

const preview: Preview = {
    // These decorators apply to all stories, both inside and outside the
    // fixture framework.
    decorators: [withPerseusDecorator, withThemeSwitcher],
    globalTypes: {
        // Added theme globalTypes to be consistent with WonderBlocks supported
        // themes, that will allow the user to select a theme from the toolbar.
        theme: supportedThemes,
    },
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
            storySort: (story1, story2) =>
                globalThis["storybook-multilevel-sort:storySort"](
                    story1,
                    story2,
                ),
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
            toc: {
                // Useful for MDX pages
                headingSelector: "h2, h3",
                // Prevents including generic headings like "Stories" and "Usage".
                ignoreSelector:
                    ".docs-story h2, .docs-story h3, .sbdocs #stories, .sbdocs #usage, .sbdocs-subtitle, .sbdocs h2:first-of-type, .sbdocs .sb-anchor[id='stories'] + h2, .sbdocs .sb-anchor[id='usage'] + h2",
            },
        },
    },
    tags: [
        //👇 Enables auto-generated documentation for all stories
        "autodocs",
    ],
};

export default preview;
