import {addons} from "storybook/manager-api";

// This will hide the root nodes in the sidebar and show it as folders instead.
// See docs https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#roots
addons.setConfig({
    sidebar: {
        showRoots: false,
    },
});
