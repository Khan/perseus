import * as React from "react";
import {addons, types} from "storybook/manager-api";
import theme from "./theme";

import {FeatureFlagsToolbar} from "./feature-flags-toolbar";

addons.setConfig({
    sidebar: {
        // This will hide the root nodes in the sidebar and show it as folders instead.
        // See docs https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#roots
        showRoots: false,
    },
    theme: theme,
});

addons.add("perseus/feature-flags/tool", {
    type: types.TOOL,
    title: "Feature Flags",
    match: () => true,
    render: () => <FeatureFlagsToolbar />,
});
