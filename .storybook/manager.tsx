import * as React from "react";
import {addons, types} from "storybook/manager-api";
import theme from "./theme";

addons.setConfig({
    sidebar: {
        // This will hide the root nodes in the sidebar and show it as folders instead.
        // See docs https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#roots
        showRoots: false,
    },
    theme: theme,
});

addons.register("api-docs-link", () => {
    addons.add("api-docs-link/tool", {
        type: types.TOOL,
        title: "API Docs",
        render: () => (
            <a
                href="/api-docs/index.html"
            >
                API Docs
            </a>
        ),
    });
});
