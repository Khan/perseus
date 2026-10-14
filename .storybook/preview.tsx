import * as React from "react";
import {DocsContainer} from "@storybook/addon-docs/blocks";
import {
    defaultStringsEn,
    WonderBlocksConfigProvider,
} from "@khanacademy/wonder-blocks-config";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {
    THEME_DATA_ATTRIBUTE,
    ThemeSwitcher,
    ThemeSwitcherContext,
} from "@khanacademy/wonder-blocks-theming";
import type {SupportedThemes} from "@khanacademy/wonder-blocks-theming";

import darkTheme from "./dark-theme";
import lightTheme from "./lightTheme";
import {
    setDependencies,
    DependenciesContext,
} from "../packages/perseus/src/dependencies";
import {
    testDependencies,
    storybookDependenciesV2,
} from "../packages/perseus/src/testing/test-dependencies";
import {TestMathjax} from "../packages/perseus/src/testing/test-mathjax";
import {
    StorybookFeatureFlagsContext,
    defaultFeatureFlags,
} from "../packages/perseus/src/testing/feature-flags-context";
import type {PerseusFeatureFlag} from "../packages/perseus/src/testing/feature-flags-context";
import {StorybookViewOptionsContext} from "../packages/perseus/src/testing/storybook-view-options-context";

import type {Decorator, Preview, StoryContext} from "@storybook/react-vite";
import type {PerseusDependencies} from "../packages/perseus/src/types";

const storybookTestDependencies: PerseusDependencies = {
    ...testDependencies,
    TeX: TestMathjax,
    staticUrl: (str) => str,
};

// This will bring in the shared styles from prod so that the components can
// have the same styles as prod when viewed within Storybook.
import "./styles/shared.css";

// Wonder Blocks components read their built-in strings (e.g. accessible
// labels) from this config. Storybook only renders in English, so we use the
// default English strings that Wonder Blocks ships with.
const wonderBlocksI18n = {strings: defaultStringsEn, locale: "en"};

// IMPORTANT: This code runs ONCE per story file, not per story within that file.
// If you want code to run once per story, see `StorybookWrapper`.

setDependencies(storybookTestDependencies);

const withPerseusDecorator: Decorator = (Story) => {
    return (
        <RenderStateRoot>
            <WonderBlocksConfigProvider i18n={wonderBlocksI18n}>
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
            </WonderBlocksConfigProvider>
        </RenderStateRoot>
    );
};

const withFeatureFlags: Decorator = (Story, context: StoryContext) => {
    const activeFlags: PerseusFeatureFlag[] =
        context.globals.featureFlags ?? [];
    const flags = {
        ...defaultFeatureFlags,
        ...Object.fromEntries(activeFlags.map((f) => [f, true])),
    } as typeof defaultFeatureFlags;

    return (
        <StorybookFeatureFlagsContext.Provider value={flags}>
            <Story />
        </StorybookFeatureFlagsContext.Provider>
    );
};

const withViewOptions: Decorator = (Story, context: StoryContext) => {
    const {mobile, direction} = context.globals;
    const viewOptions = {
        isMobile: mobile === "story" ? undefined : mobile === "on",
        isRtl: direction === "rtl",
    };

    return (
        <StorybookViewOptionsContext.Provider value={viewOptions}>
            <Story />
        </StorybookViewOptionsContext.Provider>
    );
};

const withThemeSwitcher: Decorator = (Story, context: StoryContext) => {
    const theme = context.globals.theme;

    // Set during render, not in an effect: effects run after children
    // already drew, which can leave things like graphie's colors stuck on
    // the wrong theme.
    if (theme) {
        document.body.setAttribute(THEME_DATA_ATTRIBUTE, theme);
    }

    return (
        <ThemeSwitcherContext.Provider value={theme ?? "default"}>
            <ThemeSwitcher theme={theme}>
                <Story />
            </ThemeSwitcher>
        </ThemeSwitcherContext.Provider>
    );
};

// Docs pages (autodocs, MDX) are rendered by Storybook's own DocsContainer,
// which is outside the withThemeSwitcher decorator above and has its own
// Storybook-chrome theme (background, text, code block colors, etc.) that's
// separate from our Perseus/Wonder Blocks component theme. This swaps that
// chrome theme to match whenever syl-dark is selected in the Theme toolbar,
// so the docs page background isn't stuck light while the widget preview
// inside it goes dark.
function DocsContainerWithTheme({
    children,
    context,
    ...props
}: React.ComponentProps<typeof DocsContainer>) {
    // `context.store` isn't part of the public DocsContextProps type, but the
    // concrete DocsContext always carries the preview's StoryStore at
    // runtime, and it's the only way to read the toolbar's current theme
    // global from here (docs pages aren't tied to a single story/decorator).
    // TODO(LEMS-4461): Storybook 10.3.5 has proper type support for this
    // (no cast needed) -- update once we upgrade off 10.3.1.
    const theme = (
        context as unknown as {
            store: {
                userGlobals: {globals: {theme?: SupportedThemes}};
            };
        }
    ).store.userGlobals.globals.theme;

    return (
        <DocsContainer
            context={context}
            {...props}
            theme={theme === "syl-dark" ? darkTheme : lightTheme}
        >
            <ThemeSwitcher theme={theme ?? "default"}>{children}</ThemeSwitcher>
        </DocsContainer>
    );
}

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
                title: "Shape Your Learning (thunderblocks)",
            },
            {
                value: "syl-dark",
                icon: "lightning",
                title: "Shape Your Learning - Dark (syl-dark)",
            },
        ],
        // Change title based on selected value
        dynamicTitle: true,
    },
} satisfies NonNullable<Preview["globalTypes"]>["theme"];

// Hosts set `isMobile` from device detection, not from how wide the window
// is, and it covers tablets as well as phones -- so this is deliberately
// separate from the viewport picker rather than derived from it.
//
// Tri-state because stories pin mobile through their own apiOptions, and
// "story" has to leave those in charge.
const mobileLayout = {
    description:
        "Treat the host as a phone or tablet (Perseus isMobile). Pair " +
        "with a phone Viewport for the full experience.",
    toolbar: {
        title: "Device phone/tablet",
        icon: "mobile",
        items: [
            {value: "story", title: "Story default"},
            {value: "on", title: "Phone/tablet", right: "+ Viewport"},
            {value: "off", title: "Desktop"},
        ],
        dynamicTitle: true,
    },
} satisfies NonNullable<Preview["globalTypes"]>["mobile"];

const textDirection = {
    description: "Text direction for rendered items",
    toolbar: {
        title: "Direction",
        icon: "paragraph",
        items: [
            {value: "ltr", title: "Left to right"},
            {value: "rtl", title: "Right to left"},
        ],
        dynamicTitle: true,
    },
} satisfies NonNullable<Preview["globalTypes"]>["direction"];

const preview: Preview = {
    // These decorators apply to all stories, both inside and outside the
    // fixture framework.
    decorators: [
        withPerseusDecorator,
        withThemeSwitcher,
        withFeatureFlags,
        withViewOptions,
    ],
    initialGlobals: {
        featureFlags: [],
        mobile: "story",
        direction: "ltr",
    },
    globalTypes: {
        // Added theme globalTypes to be consistent with WonderBlocks supported
        // themes, that will allow the user to select a theme from the toolbar.
        theme: supportedThemes,
        mobile: mobileLayout,
        direction: textDirection,
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
        docs: {
            theme: lightTheme,
            container: DocsContainerWithTheme,
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
