import * as React from "react";
import {addons, types} from "storybook/manager-api";
import darkTheme from "./dark-theme";
import lightTheme from "./lightTheme";

import {FeatureFlagsToolbar} from "./feature-flags-toolbar";

addons.setConfig({
    sidebar: {
        // This will hide the root nodes in the sidebar and show it as folders instead.
        // See docs https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#roots
        showRoots: false,
    },
    theme: lightTheme,
});

// Keep the Storybook manager UI (sidebar, top toolbar) in sync with the
// "Theme" toolbar picker -- otherwise it stays light even when syl-dark is
// selected, since the manager runs separately from the preview iframe and
// has no visibility into its globals unless we listen for updates here.
addons.register("theme", (api) => {
    api.on("globalsUpdated", ({globals}) => {
        addons.setConfig({
            theme: globals.theme === "syl-dark" ? darkTheme : lightTheme,
        });
    });
});

addons.add("perseus/feature-flags/tool", {
    type: types.TOOL,
    title: "Feature Flags",
    match: () => true,
    render: () => <FeatureFlagsToolbar />,
});
