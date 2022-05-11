import * as React from "react";
import Color from "@khanacademy/wonder-blocks-color";
import {
    setupFixtures,
    fixtureAdapters,
} from "@khanacademy/wonder-blocks-testing";
import {Dependencies} from "../packages/perseus";
import {testDependencies} from "../testing/test-dependencies";
// import StorybookWrapper from "../javascript/testing/sandbox/storybook-wrapper.jsx";

// IMPORTANT: This code runs ONCE per story file, not per story within that file.
// If you want code to run once per story, see `StorybookWrapper`.

Dependencies.setDependencies(testDependencies);

/**
 * This configures the Wonder Blocks Testing fixtures framework to output
 * as stories. This happens here so it is loaded as part of the story.
 */
setupFixtures({
    adapter: fixtureAdapters.storybook(),

    /**
     * Default options for all fixtures can be provided for all fixtures here,
     * if we so choose, without affecting non-fixture framework stories.
     * Supported configuration:
     *
     * ```js
     * decorators?: Array<
     *     (
     *         story: React.ComponentType<any>,
     *         context: StoryContext,
     *     ) => React.Node,
     * >,
     * parameters?: $ReadOnly<any>,
     * ```
     */
    defaultAdapterOptions: {},
});

// These decorators apply to all stories, both inside and outside the fixture
// framework.
export const decorators = [
    // We need to wrap each story to ensure that things look like AppShell and
    // have the basics such as a router and GraphQL mocking.
    // This also ensures that page display changes and route changes
    // get logged instead of actually doing work.
    // (Story, context) => <StorybookWrapper story={Story} />,
];

// These parameters apply to all stories, both inside and outside the fixture
// framework.
export const parameters = {
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
        values: Object.entries(Color).map(([name, value]) => ({name, value})),
    },
};
